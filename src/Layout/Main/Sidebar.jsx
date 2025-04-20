import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import {
  MdAdminPanelSettings,
  MdCancelPresentation,
  MdCategory,
  MdFeaturedPlayList,
  MdMiscellaneousServices,
  MdOutlinePrivacyTip,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { TbExchange, TbUserScreen, TbWorld } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

import { PiUserPlus } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";
import Cookies from "js-cookie";
import logo from "../../assets/logo.png";
import { DiGoogleAnalytics } from "react-icons/di";
import { BiSolidCategoryAlt } from "react-icons/bi";
import {
  FaClipboardList,
  FaMoneyBillTransfer,
  FaScissors,
  FaUser,
} from "react-icons/fa6";
import { FaBorderStyle, FaShoppingBag } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("refreshToken");
    Cookies.remove("refreshToken");
    navigate("/auth/login");
  };

  const menuItems = [
    {
      key: "/",
      icon: <LuLayoutDashboard size={24} />,
      label: (
        <Link to="/" className="">
          Dashboard
        </Link>
      ),
    },
    {
      key: "/customers",
      icon: <TbUserScreen size={24} />,
      label: <Link to="/customers">Customers</Link>,
    },
    {
      key: "/service-provider",
      icon: <PiUserPlus size={24} />,
      label: <Link to="/service-provider">Service Provider</Link>,
    },

    {
      key: "/order-request",
      icon: <FaBorderStyle size={24} />,
      label: <Link to="/order-request">Order Request</Link>,
    },
    {
      key: "/payment-history",
      icon: <FaMoneyBillTransfer size={24} />,
      label: <Link to="/payment-history">Payment History</Link>,
    },
    {
      key: "/job-category",
      icon: <FaShoppingBag size={24} />,
      label: <Link to="/job-category">Job Category</Link>,
    },

    {
      key: "subMenuSetting",
      icon: <IoSettingsOutline size={24} />,
      label: "Settings",
      children: [
        {
          key: "/personal-information",
          icon: <FaUser size={18} />,
          label: (
            <Link
              to="/personal-information"
              className="text-white hover:text-white"
            >
              Personal Information
            </Link>
          ),
        },
        {
          key: "/change-password",
          icon: <TbExchange size={18} />,
          label: (
            <Link to="/change-password" className="text-white hover:text-white">
              Change Password
            </Link>
          ),
        },
        {
          key: "/language",
          icon: <TbWorld size={18} />,
          label: (
            <Link to="/language" className="text-white hover:text-white">
              Language
            </Link>
          ),
        },
        {
          key: "/privacy-policy",
          icon: <MdOutlinePrivacyTip size={18} />,
          label: (
            <Link to="/privacy-policy" className="text-white hover:text-white">
              Privacy Policy
            </Link>
          ),
        },
        {
          key: "/terms-and-condition",
          icon: <FaClipboardList size={18} />,
          label: (
            <Link
              to="/terms-and-condition"
              className="text-white hover:text-white"
            >
              Terms And Condition
            </Link>
          ),
        },
        {
          key: "/support-request",
          icon: <MdOutlineSupportAgent size={18} />,
          label: (
            <Link to="/support-request" className="text-white hover:text-white">
              Support Request
            </Link>
          ),
        },
        {
          key: "/make-admin",
          icon: <MdAdminPanelSettings size={18} />,
          label: (
            <Link to="/make-admin" className="text-white hover:text-white">
              Make Admin
            </Link>
          ),
        },
      ],
    },
    {
      key: "/logout",
      icon: <IoIosLogOut size={24} />,
      label: <p onClick={handleLogout}>Logout</p>,
    },
  ];

  useEffect(() => {
    const selectedItem = menuItems.find(
      (item) =>
        item.key === path || item.children?.some((sub) => sub.key === path)
    );

    if (selectedItem) {
      setSelectedKey(path);

      if (selectedItem.children) {
        setOpenKeys([selectedItem.key]);
      } else {
        const parentItem = menuItems.find((item) =>
          item.children?.some((sub) => sub.key === path)
        );
        if (parentItem) {
          setOpenKeys([parentItem.key]);
        }
      }
    }
  }, [path]);

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <div className="mt-5 overflow-y-scroll">
      <div className="px-10">
        <Link
          to={"/"}
          className="mb-3 flex items-center flex-col gap-2 justify-center py-4"
        >
          <img src={logo} alt="" className="w-32 h-32" />
        </Link>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        style={{ borderRightColor: "transparent", background: "transparent" }}
        items={menuItems}
      />
    </div>
  );
};

export default Sidebar;
