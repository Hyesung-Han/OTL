import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "./layouts";
import Main from "./pages/Main";
import ConnectWallet from "./pages/ConnectWallet";
import CreateProfile from "./pages/CreateProfile";
import Items from "./pages/Items";
import ItemPurchase from "./pages/ItemPurchase";
import SearchResult from "./pages/SearchResult";
import ItemDetail from "./pages/ItemDetail";
import RegisterItem from "./pages/RegisterItem";
import RegisterSale from "./pages/RegisterSale";
import NotFound from "./pages/Page404";
import WhosArt from "./pages/WhosArt";
import ItemRegistration from "./pages/ItemRegistration";
import SaleRegistration from "./pages/SaleRegistration";
import TeamUs from"./pages/TeamUs";
import Policy from"./pages/Policy";

// 순서대로 (메인, MM연동, 프로필생성, 판매리스트, 검색리스트, 아이템상세, 작품등록, 판매등록, 밑에 주석 아닌 2개는 잔챙이임)
export default function Router() {
  return useRoutes([
    {
      path: "/main",
      element: <MainLayout />,
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
        { path: "buy/:tokenId", element: <ItemPurchase /> },
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
        { path: ":item_id", element: <RegisterSale /> },
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
    {
      path: "/TeamUs",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/TeamUs" replace /> },
        { path: "", element: <TeamUs/> },
      ],
    },
    {
      path: "/Policy",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/Policy" replace /> },
        { path: "", element: <Policy/> },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },

    // {
    //   path: "/whosart",
    //   element: <MainLayout />,
    //   children: [
    //     { element: <Navigate to="/whosart" replace /> },
    //     { path: "", element: <WhosArt /> },
    //     { path: ":address", element: <WhosArt /> },
    //   ],
    // },

    // {
    //   path: "/register",
    //   element: <MainLayout />,
    //   children: [
    //     { element: <Navigate to="/register" replace /> },
    //     { path: "", element: <ItemRegistration /> },
    //     { path: "sale/:tokenId", element: <SaleRegistration /> },
    //   ],
    // },
  ]);
}
