import { Link as RouterLink } from "react-router-dom";
import { Grid, Button, Typography, Container } from "@mui/material";
import Page from "../components/Page";

function RegisterSale() {
  const ItemDetailGridStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",

    backgroundColor: "#444444",
  };

  const ItemSaleGridStyle = {
      height:"500px",
    backgroundColor: "#333333",
  };

  const DetailImgGridStyle = {
    padding: 10,
    width: "300px",
    height: "300px",
    backgroundColor: "#222222",
  };

  const DetailGridStyle = {
    padding: 10,
    width: "400px",
    height: "300px",
    backgroundColor: "#111111",
  };

  return (
    <Page display="flex" justifyContent="center" title="SSAFY NFT">
      <Grid
        display="flex"
        flexDirection="column"
        justifyContent="center"
        sx={{ width: 1000, mb:10 }}
      >
        <Grid sx={ItemDetailGridStyle}>
          <Grid sx={DetailImgGridStyle}></Grid>
          <Grid sx={DetailGridStyle}></Grid>
        </Grid>
        <Grid sx={ItemSaleGridStyle}></Grid>
      </Grid>
    </Page>
  );
}

export default RegisterSale;
