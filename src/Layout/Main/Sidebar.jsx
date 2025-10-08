import { Menu } from "antd";
import { useEffect, useState } from "react";
import {
  MdAdminPanelSettings,
  MdOutlinePrivacyTip,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbExchange, TbUserScreen, TbWorld } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { PiUserPlus } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";
import Cookies from "js-cookie";
import { ImPacman } from "react-icons/im";
import { FaClipboardList, FaMoneyBillTransfer, FaUser } from "react-icons/fa6";
import { ChartBarStacked, ChartColumnStacked } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("boolbieToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("boolbieToken");
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
      key: "/payment-history",
      icon: <FaMoneyBillTransfer size={24} />,
      label: <Link to="/payment-history">Payment History</Link>,
    },

    {
      key: "/category",
      icon: <ChartBarStacked size={18} />,
      label: (
        <Link to="/category" className="text-white hover:text-white">
          Category
        </Link>
      ),
    },
    {
      key: "/sub-category",
      icon: <ChartColumnStacked size={18} />,
      label: (
        <Link to="/sub-category" className="text-white hover:text-white">
          Sub Category
        </Link>
      ),
    },

    // {
    //   key: "/job-category",
    //   icon: <FaShoppingBag size={24} />,
    //   label: <Link to="/job-category">Job Category</Link>,
    // },

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
        <Link to="/terms-and-condition" className="text-white hover:text-white">
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
    <div className="bg-white min-h-[calc(100vh-124px)] mx-1 p-4 border rounded-2xl shadow-xl">
      <div className="px-10 border rounded-xl border-primary mb-3 py-3 flex gap-3 items-center justify-center">
        <ImPacman className="w-5 h-5 text-primary" />
        <h1 className="text-lg text-primary font-semibold">Dashboard</h1>
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
