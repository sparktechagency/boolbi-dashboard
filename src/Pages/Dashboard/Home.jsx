import React from "react";
import SalesTrackingChart from "../../components/ui/Home/SalesTrackingChart";
import RunningOrdersTable from "../../components/ui/Home/RunningOrdersTable";
import rentMeLogo from "../../assets/navLogo.png";
import UserEngagement from "../../components/ui/Home/UserEngagement";
import GeneralStateSection from "../../components/ui/Home/GeneralStateSection";
import Professionals from "../../components/ui/Home/Professionals";
import TotalRevenue from "../../components/ui/Home/TotalRevenue";
import TotalUserChart from "../../components/ui/Home/TotalUserChart";
import { useDashboardOverviewQuery } from "../../redux/apiSlices/dashboardSlice";
import { Spin } from "antd";

const Home = () => {
  const { data: dashboardOverview, isLoading } = useDashboardOverviewQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  const generalState = dashboardOverview?.data || [];
  const yearlyRevenueData = generalState?.yearlyRevenueData || [];
  const userJoined = generalState?.userJoined || [];

  return (
    <div>
      <GeneralStateSection generalState={generalState} />
      <div>
        <TotalRevenue yearlyRevenueData={yearlyRevenueData} />
      </div>
      <div className="flex items-center justify-center gap-3 mt-3">
        <div className="w-[50%]">
          <TotalUserChart userJoined={userJoined} />
        </div>
        <div className="w-[50%]">
          <UserEngagement />
        </div>
      </div>
    </div>
  );
};

export default Home;
