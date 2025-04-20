import React from "react";
import SalesTrackingChart from "../../components/ui/Home/SalesTrackingChart";
import RunningOrdersTable from "../../components/ui/Home/RunningOrdersTable";
import rentMeLogo from "../../assets/navLogo.png";
import UserEngagement from "../../components/ui/Home/UserEngagement";
import GeneralStateSection from "../../components/ui/Home/GeneralStateSection";
import Professionals from "../../components/ui/Home/Professionals";
import TotalRevenue from "../../components/ui/Home/TotalRevenue";
import TotalUserChart from "../../components/ui/Home/TotalUserChart";

const Home = () => {
  const orderSummary = {
    doneByProfessionals: 65,
    doneByFreelancers: 35,
  };

  const isLoading = false;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={rentMeLogo} alt="" />
      </div>
    );
  }

  return (
    <div>
      <GeneralStateSection />
      <div>
        <TotalRevenue />
      </div>
      <div className="flex items-center justify-center gap-3 mt-3">
        <div className="w-[50%]">
          <TotalUserChart />
        </div>
        <div className="w-[50%]">
          <UserEngagement />
        </div>
      </div>
    </div>
  );
};

export default Home;
