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

//Icons
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

const Main = () => {
  // Web3
  // const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));

  const [windowHeight, setWindowHeight] = useState("900");

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

    width: 1000,
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

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

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
      description: "010-2030-6995",
    },
    {
      icon: <EmailIcon sx={{ fontSize: "45px" }} color="secondary" />,
      title: "Mail us",
      description: "xoem00@gmail.com",
    },
  ];

  /**
   * HSH | 2022.03.16 | v1.0
   * @name infoList
   * @des info 내용 컴포넌트로 만듦
   */
  const infoList = info.map((item, index) => (
    <Grid sx={{ padding: "20px", display: "flex", flexDirection: "row"  }}>
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

  return (
    <RootStyle>
      <MainTopStyle>
        <Typography variant="h1">OTL</Typography>
        <Typography>One can Take Limited</Typography>
      </MainTopStyle>
      <Divider />
      <CategoryStyle>
        <Grid
          sx={{ display: "flex", flexDirection: "row", alignItems: "left" }}
        >
          <Typography variant="h4">Browse by category</Typography>
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
          <Grid sx={{padding:"0px 30px"}}>
            <h1>Logo</h1>
          </Grid>
          <Grid sx={{padding:"0px 30px"}}>
            <h1>Useful Links</h1>
          </Grid>
          <Grid sx={{padding:"0px 30px"}}>
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
