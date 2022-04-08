import { styled } from "@mui/material/styles";
import { Grid, Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";

import YT from "../image/오윤택.PNG";
import DJ from "../image/이동준.PNG";
import JA from "../image/이정아.PNG";
import SW from "../image/최소원.PNG";
import HS from "../image/한혜성.PNG";
import SH from "../image/황소현.PNG";
import OTL from "../image/OTL.png";
import design1 from "../image/design1.jpg";
import homepage1 from "../image/homepage1.jpg";

/**
 * HSH | 2022.03.26 | v1.0
 * @name TeamUs
 * @des Team 소개
 */
const TeamUs = () => {
  const Wrapper = styled(Grid)(() => ({
    width: "100%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    paddingBottom: "100px",
  }));

  const GridWrapper = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    width: "1000px",
    margin: "30px 0",
  }));

  const teamList = [
    {
      img: YT,
      name: "오윤택",
      description: "팀장, Block-chain",
    },
    {
      img: HS,
      name: "한혜성",
      description: "Block-chain 리더",
    },
    {
      img: JA,
      name: "이정아",
      description: "Back-end, Front-end",
    },
    {
      img: SH,
      name: "황소현",
      description: "Front-end 리더",
    },
    {
      img: DJ,
      name: "이동준",
      description: "Front-end, Jira",
    },
    {
      img: SW,
      name: "최소원",
      description: "Front-end, UCC",
    },
  ];

  const coreFunctionList = [
    {
      index: "01",
      title: "Purchase of NFT",
      description:
        "OTL allows you to search for the NFT work you want. The detailed view of the work provides information on the work, transaction history, sales price, etc., and offers prices to sellers through price suggestions, and purchases NFT immediately.",
    },
    {
      index: "02",
      title: "Selling nft",
      description:
        "You can sell your own NFT. Please set the selling price and the selling period and put your work on the selling list. Then, if other users see the product and like it, they can offer a price offer or trade immediately to buy the product, and you can make a profit.",
    },
    {
      index: "03",
      title: "Decorating home",
      description:
        "On My Home page, you can show your information through your profile. Also, you can decorate your own homepage using your own NFT. Visit your friends' website or decorate your own unique My Home and show it off to your friends.",
    },
  ];

  return (
    <Wrapper container spacing={2}>
      <GridWrapper item>
        <Grid
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography sx={{ m: "20px" }} variant="h1">
            About the site
          </Typography>
          <AirplanemodeActiveIcon sx={{ fontSize: "100px" }} />
        </Grid>
        <Typography sx={{ m: "20px", fontSize: "30px", width: "600px" }}>
          Unique mini homepage service decorated with your own items OTL
        </Typography>
        <Grid mt={2} container spacing={2}>
          <Grid item xs={4.5}>
            <Grid
              container
              display="flex"
              flexDirection="column"
              alignItems="end"
              spacing={2}
            >
              <Grid
                item
                sx={{ height: "300px" }}
                component="img"
                src={homepage1}
              />
            </Grid>
          </Grid>
          <Grid item xs={7.5} component="img" src={design1}></Grid>
        </Grid>
        <Grid container mt={10} display="flex" flexDirection="row">
          <Grid
            sx={{ position: "relative" }}
            item
            mt={2}
            xs={4}
            display="flex"
            flexDirection="column"
          >
            <Typography variant="h5">WHAT TO DO</Typography>
            <Grid
              item
              mt={4}
              sx={{ width: "230px", height: "150px" }}
              component="img"
              src={OTL}
            />
            <CloseIcon
              sx={{
                position: "absolute",
                bottom: "40px",
                right: "60px",
                color: "#ff0000",
                fontSize: "100px",
              }}
            />
          </Grid>
          <Grid
            item
            xs={8}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-around"
          >
            <Typography variant="h3">
              OTL (One can Take Limited item)
            </Typography>
            <Grid
              m={4}
              container
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
            >
              <Grid item sx={{ width: "300px" }} display="flex">
                <Typography>
                  OTL is a mini homepage service developed in consideration of
                  the characteristics of the MZ generation that meets the needs
                  of the MZ generation and forms a network in the online
                  environment.
                </Typography>
              </Grid>
              <Grid item sx={{ width: "300px" }} display="flex">
                <Typography>
                  In OTL, you can create a space where you can show your
                  personality through the one and only items in the world, and
                  make a profit by selling your items through NFT transactions.
                </Typography>
              </Grid>
            </Grid>
            <Button
              sx={{ fontSize: "20px" }}
              to="/connectwallet"
              component={RouterLink}
            >
              <KeyboardArrowRightIcon />
              START OUR SERVICE
            </Button>
          </Grid>
        </Grid>
      </GridWrapper>

      <GridWrapper sx={{ margin: "50px 0" }} item>
        <Typography sx={{ m: "20px" }} variant="h1">
          Core function
        </Typography>
        <Grid mt={1} container spacing={3}>
          {coreFunctionList.map((item, index) => (
            <Grid xs={4} item key={index}>
              <Typography sx={{ fontSize: "60px" }} color="#ff7f00">
                {item.index}.
              </Typography>
              <Typography sx={{ fontSize: "30px" }}>{item.title}</Typography>
              <Typography sx={{ mt: "10px" }}>{item.description}</Typography>
            </Grid>
          ))}
        </Grid>
      </GridWrapper>

      <GridWrapper item>
        <Typography sx={{ m: "20px" }} variant="h1">
          Team member
        </Typography>
        <Grid mt={3} container spacing={1}>
          {teamList.map((item, index) => (
            <Grid
              item
              display="flex"
              flexDirection="column"
              alignItems="center"
              xs={4}
              key={index}
            >
              <Box
                component="img"
                sx={{ height: "150px", width: "150px" }}
                src={item.img}
              ></Box>
              <Typography variant="h4">{item.name}</Typography>
              <Typography>{item.description}</Typography>
            </Grid>
          ))}
        </Grid>
      </GridWrapper>
    </Wrapper>
  );
};

export default TeamUs;
