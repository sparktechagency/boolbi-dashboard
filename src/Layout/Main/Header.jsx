import logo from "../../assets/logo.png";
import { useFetchAdminProfileQuery } from "../../redux/apiSlices/authSlice";
import { imageUrl } from "../../redux/api/baseApi";
import { Link } from "react-router-dom";
import { Badge } from "antd";
import { FaRegBell } from "react-icons/fa6";
import { useNotificationQuery } from "../../redux/apiSlices/notificationSlice";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Header = () => {
  const { data: userData, isLoading: isLoadingUser } =
    useFetchAdminProfileQuery();
  const { data: notification, isLoading: isLoadingNotification } =
    useNotificationQuery();
  const [notificationCount, setNotificationCount] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://10.10.7.28:3000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("new_notification", (data) => {
        console.log("New notification received:", data);

        if (data && !data.isRead) {
          setNotificationCount((prev) => prev + 1);
        }
      });

      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });
    }

    return () => {
      if (socket) {
        socket.off("new_notification");
        socket.off("connect_error");
      }
    };
  }, [socket]);

  useEffect(() => {
    if (notification?.data?.data) {
      const unreadCount = notification.data.data.filter(
        (item) => !item.isRead
      ).length;
      setNotificationCount(unreadCount);
    }
  }, [notification]);

  if (isLoadingUser || isLoadingNotification) {
    return (
      <div className="flex justify-center items-center my-20 text-lg text-secondary">
        Loading...
      </div>
    );
  }
  const adminData = userData?.data;

  // console.log(adminData);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="ml-28">
        <img src={logo} alt="logo" className="w-20 h-20" />
      </div>

      <div className="flex items-center gap-5">
        <Link to="/notification" className="mt-2 rounded-lg p-2">
          <Badge count={notificationCount}>
            <FaRegBell color="#4E4E4E" size={24} />
          </Badge>
        </Link>
        <div className="flex gap-2 items-center justify-center">
          <img
            src={
              adminData?.profileImage
                ? adminData?.profileImage?.startsWith("http")
                  ? adminData?.profileImage
                  : `${imageUrl}${adminData?.profileImage}`
                : logo
            }
            alt="person-male--v2"
            className="w-12 h-12 rounded-lg"
          />
          <div className="flex pr-2 flex-col">
            <p className="text-xl">{adminData?.fullName || "SUPER ADMIN"}</p>
            <p className="text-sm text-gray-500">{userData?.data?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
