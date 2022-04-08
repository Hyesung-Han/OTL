import { Outlet } from "react-router-dom";
import DashboardNavbar from "./header/DashboardNavbar";

const FullPageLayout = () => {
  return (
    <div>
      <DashboardNavbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default FullPageLayout;
