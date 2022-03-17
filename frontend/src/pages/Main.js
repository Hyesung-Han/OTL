import {
  Grid,
  Box,
  Button,
  Card,
  Container,
  Link,
  Divider,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Web3 from "web3";
import COMMON_ABI from "../common/ABI";
import COMMON_HEADER from "../common/HeaderType";
import COMMON_CONTRACT from "../common/SaleInfoGetter";
import { onResponse } from "../common/ErrorMessage";
import { Link as RouterLink } from "react-router-dom";

//Icons
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import notion from "../image/notion.png";

import { style } from "@mui/system";

const Main = () => {
  // Web3
  // const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  /**
   * HSH | 2022.03.16 | v1.0
   * @name RootStyle
   * @des Main root
   */
  const RootStyle = styled(Grid)(({ theme }) => ({
    // backgroundColor: alpha(theme.palette.background.default, 0.72),

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }));

  /**
   * HSH | 2022.03.16 | v1.0
   * @name MainTopStyle
   * @des Main top grid
   */
  const MainTopStyle = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    height: windowHeight - 100,
    paddingBottom: 100,
  }));

  /**
   * HSH | 2022.03.16 | v1.0
   * @name MainStyle
   * @des Main category grid
   */
  const CategoryStyle = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    padding: "30px 0px",
  }));

  /**
   * HSH | 2022.03.16 | v1.0
   * @name MainStyle
   * @des Main Footer grid
   */
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
   * @des Footer에 들어가는 findus, call us, mail us 정보
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

  /**
   * HSH | 2022.03.16 | v1.0
   * @name infoList
   * @des info 내용 컴포넌트로 만듦
   */
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

  /**
   * HSH | 2022.03.16 | v1.0
   * @name FooterLinkStyle
   * @des Main Footer grid
   */
  const FooterLinkStyle = styled(Link)(() => ({
    color: "#999999",
    fontSize: "20px",
    padding: "10px 0px",
  }));

  /**
   * HSH | 2022.03.16 | v1.0
   * @name IconRoundStyle
   * @des Icon을 덮는 원 테두리
   */
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
      img:"#ffcdd2",
      name: "chair",
      link:"#",
    },
    {
      img:"#f47fb1",
      name: "table",
      link:"#",
    },
    {
      img:"#99cccc",
      name: "wallpaper",
      link:"#",
    },
    {
      img:"#3366cc",
      name: "floor",
      link:"#",
    },
    {
      img:"#66cc00",
      name: "wall hanging",
      link:"#",
    },
    {
      img:"#ff1744",
      name: "prop",
      link:"#",
    },
  ];

  const CategoryCard=styled(Grid)(()=>({
      margin: "20px",
      borderRadius: "10px",
      width:"220px",
      height:"200px",

      display:"flex",
      flexDirection:"column",
      justifyContent:"end",
      alignItems:"center",
  }));

  /**
   * HSH | 2022.03.16 | v1.0
   * @name categoryItemList
   * @des 카테고리 바로가기 카드
   */
  const categoryItemList = categoryItem.map((item, index) => (
    <CategoryCard item key={index} to={item.link} lg={3} sx={{ backgroundColor:item.img, textDecoration: "none" }} component={RouterLink}>
      <Grid display="flex" justifyContent="center" alignItems="center" sx={{height:"50px", width:"100%", backgroundColor:"#ffffff", opacity:"0.8" }}>
        <Box sx={{color: "#303030", font: '1.2em', fontWeight: 600}}>{item.name}</Box>
      </Grid>
    </CategoryCard>
  ));

  return (
    <RootStyle>
      <MainTopStyle>
        <Typography variant="h1">OTL</Typography>
        <Typography>One can Take Limited</Typography>
      </MainTopStyle>
      <Divider />
      <CategoryStyle>
        <Grid
          sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}
        >
          <Typography variant="h4">Browse by category</Typography>
          <Grid container justifyContent={"center"} sx={{ margin:"30px 0"}} >{categoryItemList}</Grid>
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
                  <FooterLinkStyle href="#" underline="hover">
                    log in
                  </FooterLinkStyle>
                  <FooterLinkStyle href="#" underline="hover">
                    my home
                  </FooterLinkStyle>
                  <FooterLinkStyle href="#" underline="hover">
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
                  <FooterLinkStyle href="#" underline="hover">
                    create item
                  </FooterLinkStyle>
                  <FooterLinkStyle href="#" underline="hover">
                    sell item
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
