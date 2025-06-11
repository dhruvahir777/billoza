import { FiMonitor, FiBell, FiLock, FiSettings, FiDatabase, FiShield } from "react-icons/fi";

// User Information
export const USER_INFO = {
  name: "Admin User",
  email: "admin@billoza.com"
};

// Theme Configuration
export const THEME_KEY = "billoza_theme";

// Application Information
export const APP_INFO = {
  name: "Billoza",
  version: "1.0.0",
  build: "2025.06.11",
  license: "Commercial",
  support: "support@billoza.com"
};

export const SETTING_TABS = [
  { id: "appearance", label: "Appearance", icon: FiMonitor },
  { id: "notifications", label: "Notifications", icon: FiBell },
  { id: "privacy", label: "Privacy & Security", icon: FiLock },
  { id: "system", label: "System", icon: FiSettings },
  { id: "backup", label: "Backup & Sync", icon: FiDatabase },
  { id: "about", label: "About", icon: FiShield }
];