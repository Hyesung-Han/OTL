import { Navigate, useRoutes } from "react-router-dom";
import FullPageLayout from "./fullpageLayouts";
import MainLayout from "./layouts";
import Main from "./pages/Main";
import ConnectWallet from "./pages/ConnectWallet";
import CreateProfile from "./pages/CreateProfile";
import Items from "./pages/Items";
import SearchResult from "./pages/SearchResult";
import ItemDetail from "./pages/ItemDetail";
import RegisterItem from "./pages/RegisterItem";
import RegisterSale from "./pages/RegisterSale";
import MyHome from "./pages/MyHome";
import UserHome from "./pages/UserHome";
import AboutUs from "./pages/AboutUs";
import Policy from "./pages/Policy";
import NotFound from "./pages/Page404";

export default function Router() {
  return useRoutes([
    {
      path: "/main",
      element: <FullPageLayout />,
      children: [
        { element: <Navigate to="/main" replace /> },
        { path: "", element: <Main /> },
      ],
    },

    {
      path: "/connectwallet",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/connectwallet" replace /> },
        { path: "", element: <ConnectWallet /> },
      ],
    },

    {
      path: "/createprofile",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/createprofile" replace /> },
        { path: "", element: <CreateProfile /> },
      ],
    },

    {
      path: "/items",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/items" replace /> },
        { path: "", element: <Items /> },
        { path: ":category_code", element: <Items /> },
      ],
    },

    {
      path: "/search",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/search" replace /> },
        { path: "", element: <SearchResult /> },
        { path: ":search_value", element: <SearchResult /> },
      ],
    },

    {
      path: "/itemdetail",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/itemdetail" replace /> },
        { path: ":token_id", element: <ItemDetail /> },
      ],
    },

    {
      path: "/registerItem",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/registerItem" replace /> },
        { path: "", element: <RegisterItem /> },
      ],
    },

    {
      path: "/registerSale",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/registerSale" replace /> },
        { path: "", element: <RegisterSale /> },
        { path: ":token_id", element: <RegisterSale /> },
      ],
    },

    {
      path: "/AboutUs",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/AboutUs" replace /> },
        { path: "", element: <AboutUs /> },
      ],
    },
    {
      path: "/Policy",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/Policy" replace /> },
        { path: "", element: <Policy /> },
      ],
    },

    {
      path: "/myhome",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/myhome" replace /> },
        { path: "", element: <MyHome /> },
      ],
    },

    {
      path: "/home",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/home" replace /> },
        { path: ":user_address", element: <UserHome /> },
      ],
    },

    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/main" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
