import { useState, useEffect } from "react";
import { ConfigProvider, Pagination, Spin, message } from "antd";

import {
  useNotificationQuery,
  useReadNotificationsMutation,
} from "../../redux/apiSlices/notificationSlice";
import { format } from "date-fns";

const Notifications = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data: notifications, isLoading, refetch } = useNotificationQuery();

  // Refetch notifications when the component mounts
  useEffect(() => {
    refetch();
    console.log("Refetching notifications on page load");
  }, [refetch]);
  const [readNotifications] = useReadNotificationsMutation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  const notificationData = notifications?.data?.data || [];
  const total = notifications?.data?.total || 0;
  const totalPages = notifications?.data?.totalPages || 1;

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMM dd, yyyy 'at' h:mm a");
    } catch (error) {
      return dateString;
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleReadAll = () => {
    // TODO: Implement read all functionality
    console.log("Mark all as read");
  };

  const handleReadNotification = async (notificationId) => {
    try {
      // Only mark as read if it's not already read
      const notification = notificationData.find(
        (n) => n._id === notificationId
      );
      if (notification && !notification.isRead) {
        await readNotifications({
          notifications: [notificationId],
        }).unwrap();

        // Refetch to update the UI
        refetch();
        message.success("Notification marked as read");
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
      message.error("Failed to mark notification as read");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {notificationData.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No notifications found
        </div>
      ) : (
        <div className="space-y-4">
          {notificationData.map((notification) => (
            <div
              key={notification._id}
              className={`p-4 border rounded-lg flex items-start ${
                notification.isRead
                  ? "bg-gray-50"
                  : "bg-blue-50 border-blue-100"
              } ${!notification.isRead ? "cursor-pointer" : ""}`}
              onClick={() => handleReadNotification(notification._id)}
            >
              <div
                className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 bg-blue-500"
                style={{
                  visibility: notification.isRead ? "hidden" : "visible",
                }}
              />
              <div className="flex-1">
                <p className="text-gray-800 mb-1">{notification.content}</p>
                <p className="text-xs text-gray-500">
                  {formatDate(notification.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {total > pageSize && (
        <div className="mt-6 flex justify-center">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#4A4F61",
              },
            }}
          >
            <Pagination
              current={page}
              pageSize={pageSize}
              total={total}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </ConfigProvider>
        </div>
      )}
    </div>
  );
};

export default Notifications;
