import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import DashboardNavbar from "./header/DashboardNavbar";
import Footer from "./footer/Footer";

const MainLayout = () => {
  const APP_BAR_MOBILE = 64;
  const APP_BAR_DESKTOP = 92;

  const RootStyle = styled("div")({
    display: "flex",
    minHeight: "100%",
    overflow: "hidden",
    flexDirection: "column",
  });

  const MainStyle = styled("div")(({ theme }) => ({
    flexGrow: 1,
    overflow: "auto",
    minHeight: "100%",
    paddingTop: APP_BAR_MOBILE + 24,
    [theme.breakpoints.up("lg")]: {
      paddingTop: APP_BAR_DESKTOP + 24,
    },
  }));

  return (
    <RootStyle>
      <DashboardNavbar />
      <MainStyle>
        <Outlet />
      </MainStyle>
      <Footer />
    </RootStyle>
  );
};

export default MainLayout;
