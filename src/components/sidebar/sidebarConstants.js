// /components/Sidebar/sidebarConstants.js
import { MdMoreVert } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import { BsBarChartFill } from "react-icons/bs";
import { BiSolidUserPin } from "react-icons/bi";
import { MdHistory } from "react-icons/md"; // Add new icons
import { GiKnifeFork } from "react-icons/gi"; // Import new icon

export const TEXTS = {
  brandFull: "FoodX",
  brandShort: "FDX",
  overview: "Navigations",
  profile: "Profile",
  settings: "Settings",
  userInitials: "JD",
  userName: "John Doe",
};

export const MENU_ITEMS = [
  { icon: FaRegListAlt, label: "Order", to: "/order" }, // Dashboard -> Order
  { icon: MdHistory, label: "History", to: "/customers" }, // Customers -> History
  { icon: GiKnifeFork, label: "Manu", to: "/menu" }, // Route fixed to /menu
  { icon: BsBarChartFill, label: "Reports", to: "/reports" }, // Reports (as is)
  { icon: LuSettings2, label: "Settings", to: "/settings" }, // Added Settings tab
];

export const PROFILE_ICONS = {
  settings: LuSettings2,
  profile: BiSolidUserPin,
  more: MdMoreVert,
};
