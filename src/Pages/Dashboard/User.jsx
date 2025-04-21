import React from "react";
import { useParams } from "react-router-dom";
const User = () => {
  const { id } = useParams();

  // Sample user data
  const user = {
    name: "John Doe",
    id: "#5568164",
    email: "johndoe@example.com",
    address: {
      street: "123 Main St",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA",
    },
    phone: "+1 (555) 123-4567",
    imgUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  };

  const imgUrl =
    user?.imgUrl ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmtj40PvvTQ1g64pgKZ2oKEk-tqT9rA4CXSA&s";

  return (
    <div>
      <div className="">
        <div className="flex gap-3 items-center ">
          <img
            className="rounded-full w-16 h-16"
            src={
              imgUrl?.startsWith("http")
                ? imgUrl
                : `${import.meta.env.VITE_BASE_URL}${imgUrl}`
            }
            alt="img"
          />
          <div>
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-sm text-gray-400">User ID: {user.id} </p>
          </div>
        </div>
        <div className="grid my-5 grid-cols-2 gap-5 w-[70%]">
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Name
            </h1>
            <p className="text-lg my-2">{user?.name}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Email
            </h1>
            <p className="text-lg my-2">{user?.email}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Phone
            </h1>
            <p className="text-lg my-2">{user?.phone}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Address
            </h1>
            <p className="text-lg my-2">
              {user?.address ? (
                <>
                  {user?.address?.street}, {user?.address?.state},{" "}
                  {user?.address?.city}, {user?.address?.country}
                </>
              ) : (
                "N/A"
              )}
            </p>
          </div>
        </div>
      </div>
      <div>
        <RunningOrderTable
          filterProps={
            user?.vendor?.name || user?.admin?.name || user?.customer?.name
          }
        />
      </div>
    </div>
  );
};

export default User;
