import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f1f1f1] p-3">
      {/* header */}
      <div className="h-[80px] flex items-center justify-end px-3 bg-white rounded-xl mb-3">
        <Header />
      </div>

      {/* sidebar and content container */}
      <div className="grid grid-cols-12 gap-3 h-[calc(100vh-124px)]">
        {/* side bar */}
        <div className="col-span-2 rounded-xl px-3">
          <Sidebar />
        </div>

        {/* main content */}
        <div className="col-span-10 rounded-xl overflow-y-auto">
          <div className="h-full overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
