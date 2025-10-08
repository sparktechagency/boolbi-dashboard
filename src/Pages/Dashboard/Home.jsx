import React, { useState, useEffect } from "react";
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
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => currentYear - 10 + i);
  
  const [userJoinedYear, setUserJoinedYear] = useState(currentYear.toString());
  const [revenueYear, setRevenueYear] = useState(currentYear.toString());

  const { data: dashboardOverview, isLoading, refetch } = useDashboardOverviewQuery({
    userJoinedYear,
    revenueYear,
  });

  // Refetch data when years change
  useEffect(() => {
    refetch();
  }, [userJoinedYear, revenueYear, refetch]);

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
        <TotalRevenue
          yearlyRevenueData={yearlyRevenueData}
          years={years}
          selectedYear={revenueYear}
          setSelectedYear={setRevenueYear}
        />
      </div>
      <div className="flex items-center justify-center gap-3 mt-3">
        <div className="w-[50%]">
          <TotalUserChart
            userJoined={userJoined}
            years={years}
            selectedYear={userJoinedYear}
            setSelectedYear={setUserJoinedYear}
          />
        </div>
        <div className="w-[50%]">
          <UserEngagement />
        </div>
      </div>
    </div>
  );
};

export default Home;
