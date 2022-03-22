import { Navigate, useRoutes } from 'react-router-dom';
import MainLayout from './layouts';
import NotFound from './pages/Page404';
import Main from './pages/Main';
import ConnectWallet from "./pages/ConnectWallet";
import Items from './pages/Items';
import ItemRegistration from './pages/ItemRegistration';
import SaleRegistration from './pages/SaleRegistration';
import WhosArt from './pages/WhosArt';
import ItemPurchase from './pages/ItemPurchase';
import SearchResult from './pages/SearchResult';
import RegisterItem from './pages/RegisterItem';

// 화면 라우팅 테이블
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
    /**
     * LDJ | 2022.03.14 | ADD
     * HACK
     * 페이지 확인을 위한 임시 경로 설정
     */
    {
      path: "/connectwallet",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/connectwallet" replace /> },
        { path: "", element: <ConnectWallet /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/main" /> },
        { path: "*", element: <Navigate to="/404" /> },
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
      path: "/register",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/register" replace /> },
        { path: "", element: <ItemRegistration /> },
        { path: "sale/:tokenId", element: <SaleRegistration /> },
      ],
    },
    {
      path: "/whosart",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/whosart" replace /> },
        { path: "", element: <WhosArt /> },
        { path: ":address", element: <WhosArt /> },
      ],
    },
    // /**
    //  * CSW | 2022.03.17 | ADD
    //  * HACK
    //  * 페이지 확인을 위한 임시 경로 설정
    //  */
     {
      path: "/search",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/search" replace /> },
        { path: "", element: <SearchResult /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
    // /**
    //  * HSH | 2022.03.21 | v1.0
    //  * RegisterItem 이동
    //  */
    {
      path: "/registerItem",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/registerItem" replace /> },
        { path: "", element: <RegisterItem /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
