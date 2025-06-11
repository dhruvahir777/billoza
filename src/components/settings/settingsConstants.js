import { FiMonitor, FiBell, FiLock, FiSettings, FiDatabase, FiShield } from "react-icons/fi";

export const SETTING_TABS = [
  { id: "appearance", label: "Appearance", icon: FiMonitor },
  { id: "notifications", label: "Notifications", icon: FiBell },
  { id: "privacy", label: "Privacy & Security", icon: FiLock },
  { id: "system", label: "System", icon: FiSettings },
  { id: "backup", label: "Backup & Sync", icon: FiDatabase },
  { id: "about", label: "About", icon: FiShield }
];

export const USER_INFO = {
  name: "Restaurant Admin",
  email: "admin@restaurant.com",
  avatar: null
};

export const APP_INFO = {
  name: "Restaurant Management System",
  version: "1.2.0",
  build: "20250605",
  license: "Commercial",
  support: "support@restaurant.com"
};

export const THEME_KEY = "foodx_theme";