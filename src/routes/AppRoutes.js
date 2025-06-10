import { Routes, Route } from "react-router-dom";
import Main from "../pages/main";
import AddCustomer from "../components/history/historydisplay";
import Customer from "../pages/history/history";
import Order from "../pages/order/order";
import Menu from "../pages/menu/menu";
import Reports from "../pages/reports/reports";
import Settings from "../pages/settings/settings";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Main />}>
      <Route path="order" element={<Order />} />
      <Route path="customers" element={<Customer />} />
      <Route path="add-customer" element={<AddCustomer />} />
      <Route path="menu" element={<Menu />} />
      <Route path="reports" element={<Reports />} />
      <Route path="settings" element={<Settings />} />
    </Route>
  </Routes>
);

export default AppRoutes;
