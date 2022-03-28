import {
  Grid,
  Box,
  Button,
  Card,
  Container,
  Link,
  Divider,
  Typography,
  Slide,
  Tab,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { css, keyframes } from "@emotion/react";

//Icons
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import notion from "../image/notion.png";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import emoStyled from "@emotion/styled";

//Image
import Chair from "../image/chair.PNG";
import Bed from "../image/bed.PNG";
import Floor from "../image/floor.PNG";
import Table from "../image/table.PNG";
import Wallhanging from "../image/wallhanging.PNG";
import Wallpaper from "../image/wallpaper.PNG";


/**
 * HSH | 2022.03.23 | Add
 * @name Main
 * @des Main page
 */
const Main = () => {
  // Web3
  // const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const RootStyle = styled(Grid)(({ theme }) => ({
    // backgroundColor: alpha(theme.palette.background.default, 0.72),

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }));

  const MainTopStyle = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",

    height: windowHeight - 100,
    paddingBottom: 100,
  }));

  const CategoryStyle = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    padding: "50px 0px",
  }));

  const MainFooterStyle = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",

    padding: "30px 0px",

    backgroundColor: "#444444",
    height: "400px",
  }));

  useEffect(() => {}, []);

  /**
   * HSH | 2022.03.16 | v1.0
   * @name info
   * @des 푸터에 들어가는 팀 정보 리스트
   */
  const info = [
    {
      icon: <FmdGoodIcon sx={{ fontSize: "45px" }} color="secondary" />,
      title: "Find us",
      description: "212 ,Teheran-ro Gangnam-gu Seoul",
    },
    {
      icon: <CallIcon sx={{ fontSize: "45px" }} color="secondary" />,
      title: "Call us",
      description: "02-3429-5100",
    },
    {
      icon: <EmailIcon sx={{ fontSize: "45px" }} color="secondary" />,
      title: "Mail us",
      description: "jeanstest6@gmail.com",
    },
  ];

  const infoList = info.map((item, index) => (
    <Grid
      key={item.title}
      sx={{ padding: "20px", display: "flex", flexDirection: "row" }}
    >
      <Grid sx={{ paddingRight: "10px" }}>{item.icon}</Grid>
      <Grid sx={{ display: "flex", flexDirection: "column" }}>
        <Typography fontSize="20px" color="#ffffff">
          {item.title}
        </Typography>
        <Typography fontSize="16px" color="#888888">
          {item.description}
        </Typography>
      </Grid>
    </Grid>
  ));

  const FooterLinkStyle = styled(Link)(() => ({
    color: "#999999",
    fontSize: "20px",
    padding: "10px 0px",
  }));

  const IconRoundStyle = styled(Link)(() => ({
    border: "1px solid white",
    borderRadius: "50%",

    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    margin: "0px 20px",
  }));

  /**
   * HACK
   * 카테고리 연동해서 받아오기 전 까지는 더미데이터 만들어서 사용
   */
  const categoryItem = [
    {
      img: Chair,
      name: "chair",
      link: "/items/chair",
    },
    {
      img: Table,
      name: "table",
      link: "/items/table",
    },
    {
      img: Bed,
      name: "bed",
      link: "/items/bed",
    },
    {
      img: Wallpaper,
      name: "wallpaper",
      link: "/items/wallpaper",
    },
    {
      img: Floor,
      name: "floor",
      link: "/items/floor",
    },
    {
      img: Wallhanging,
      name: "wall hanging",
      link: "/items/wall hanging",
    },
  ];

  const CategoryCard = styled(Grid)(() => ({
    margin: "20px",
    borderRadius: "10px",
    width: "220px",
    height: "200px",
  }));

  const CategoryImg=emoStyled.div`
    width:100%;
    height:100%;

    border-radius: 10px;

    background: url(${(props) => props.img});
    background-size: cover;
    background-position: center;

    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
  `
  const categoryItemList = categoryItem.map((item, index) => (
    <CategoryCard
      item
      key={index}
      lg={3}
      sx={{ textDecoration: "none" }}
      to={item.link}
      component={RouterLink}
    >
      <CategoryImg img={item.img}>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: "50px",
          width: "100%",
          backgroundColor: "#ffffff",
          opacity: "0.8",
        }}
      >
        <Box sx={{ color: "#303030", font: "1.2em", fontWeight: 600 }}>
          {item.name}
        </Box>
      </Grid>
      </CategoryImg>
    </CategoryCard>
  ));

  const HowToUseStyle = styled(Grid)(() => ({
    padding: "50px",
    width: "100%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }));

  const HowToUseCard = styled(Grid)(() => ({
    border: "1px solid #afafaf",
    borderRadius: "10px",

    width: "300px",
    height: "300px",

    margin: "30px",
    padding:"10px",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }));

  const howToUseList=[
    {
      icon:<AccountBalanceWalletIcon sx={{ fontSize: "45px" }} color="#000000" />,
      title:"Set up your wallet",
      content:"NFT를 거래하기 위해서는 지갑이 필요합니다. Metamask 지갑을 생성하고 LOGIN에서 지갑을 연동해 주세요."
    },
    {
      icon:<HomeIcon sx={{ fontSize: "45px" }} color="#000000" />,
      title:"Create your home",
      content:"소유하고 있는 NFT를 이용해 마이홈을 구성할 수 있습니다. 나만의 아이템으로 개성있는 나만의 페이지를 만드세요."
    },
    {
      icon:<ShoppingCartIcon sx={{ fontSize: "45px" }} color="#000000" />,
      title:"Buy and sell NFT",
      content:"원하는 NFT 작품을 살 수 있고, 당신이 소유하고 있는 NFT를 팔아 수익을 창출할 수 있습니다."
    },
  ]

  /**
   * HSH | 2022.03.17 | v1.0
   * @name floating
   * @des 메인 Top에 있는 Typography 애니메이션
   */
  const floating = keyframes`
    0% {
        opacity: 0;
        transform: translateY(50px);    
    }
    100%{
        transform: translateY(0px);
    }
  `;

  const colorChange = keyframes`
    0% {
    }
    100%{
      color:#ff3300;
    }
  `;

  /**
   * HSH | 2022.03.17 | v1.0
   * @name NonChangeTextStyle
   * @des 메인 Top에 있는 Typography. 글자 색 바뀌지 않는 부분
   */
  const NonChangeTextStyle = emoStyled.p`
    font-size: 50px;
    font-weight: bold;
    color:"#000000";

    animation-fill-mode: forwards;
    animation-name: ${floating};
    animation-delay: 0s;
    animation-duration: ${(props) => props.time}s;
  `;

  /**
   * HSH | 2022.03.17 | v1.0
   * @name ChangeTextStyle
   * @des 메인 Top에 있는 Typography CSS. 글자 색 바뀌는 부분
   */
  const ChangeTextStyle = emoStyled.p`
   font-size: 50px;
   font-weight: bold;
   color:"#000000";

   animation-fill-mode: forwards;
   animation-name: ${floating}, ${colorChange};
   animation-delay: 0s, 1s;
   animation-duration: ${(props) => props.time}s, 1s;
 `;

  const MainTitle = "One can Take Limited item";

  /**
   * HSH | 2022.03.17 | v1.0
   * @name TypograpyStr
   * @des 메인 Top에 있는 Typography를 알파벳 하나하나 스타일 설정
   */
  const TypograpyStr = (prop) => {
    const str = prop.str;

    const arr = [];
    for (let i = 0; i < str.length; i++) {
      if (str[i] >= "A" && str[i] <= "Z") {
        arr.push(
        <ChangeTextStyle key={i} time={i / 10}>
          {str[i]}
        </ChangeTextStyle>
        );
      } else if (str[i] == " ") {
        arr.push(
          <NonChangeTextStyle key={i} time={i / 10}>
            &nbsp;
          </NonChangeTextStyle>
        );
      } else {
        arr.push(
          <NonChangeTextStyle key={i} time={i / 10}>
            {str[i]}
          </NonChangeTextStyle>
        );
      }
    }
    return arr;
  };

  return (
    <RootStyle>
      <MainTopStyle>
        <Grid display="flex" flexDirection="row" alignItems="center">
          <TypograpyStr str={MainTitle} />
        </Grid>
      </MainTopStyle>
      <Divider />
      <HowToUseStyle>
        <Typography variant="h4">How to use</Typography>
        <Grid display="flex" flexDirection="row" alignItems="center">
          {howToUseList.map((item,index)=>(
            <HowToUseCard key={index}>
              {item.icon}
              <Typography>{item.title}</Typography>
              <Typography>{item.content}</Typography>
            </HowToUseCard>
          ))}
        </Grid>
      </HowToUseStyle>
      <Divider />
      <CategoryStyle>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Browse by category</Typography>
          <Grid container justifyContent={"center"} sx={{ margin: "30px 0" }}>
            {categoryItemList}
          </Grid>
        </Grid>
      </CategoryStyle>
      <MainFooterStyle>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid sx={{ padding: "0px 30px" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "left",
                width: "400px",
              }}
            >
              <Typography sx={{ color: "#ffffff", fontSize: "60px" }}>
                OTL
              </Typography>
              <Typography sx={{ color: "#aaa", width: "300px" }}>
                {" "}
                Our mission is to enable people to find their own items and show
                their individuality.{" "}
              </Typography>

              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "left",
                  padding: "30px 0",
                }}
              >
                <IconRoundStyle href="https://lab.ssafy.com/s06-blockchain-nft-sub2/S06P22A405">
                  <GitHubIcon sx={{ fontSize: "30px", color: "#ffffff" }} />
                </IconRoundStyle>
                <IconRoundStyle href="https://www.notion.so/TL-8fc2391a556b447d9ca4a70cf1fd194a">
                  <Box
                    component="img"
                    src={notion}
                    sx={{ width: "30px", height: "30px" }}
                  />
                </IconRoundStyle>
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{ padding: "0px 30px" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              <Typography sx={{ fontSize: "30px", color: "white" }}>
                Useful Link
              </Typography>
              <Grid
                sx={{
                  width: "70px",
                  height: "5px",
                  backgroundColor: "#ff6a00",
                  margin: "0 10px",
                }}
              ></Grid>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "20px 10px",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "200px",
                  }}
                >
                  <FooterLinkStyle  to="/connectwallet" component={RouterLink} underline="hover">
                    log in
                  </FooterLinkStyle>
                  <FooterLinkStyle  to="/myHome" component={RouterLink} underline="hover">
                    my home
                  </FooterLinkStyle>
                  <FooterLinkStyle  to="/items" component={RouterLink} underline="hover">
                    item list
                  </FooterLinkStyle>
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "200px",
                  }}
                >
                  <FooterLinkStyle  to="/registerItem" component={RouterLink} underline="hover">
                    create item
                  </FooterLinkStyle>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{ padding: "0px 30px" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              {infoList}
            </Grid>
          </Grid>
        </Grid>
      </MainFooterStyle>
    </RootStyle>
  );
};

export default Main;
