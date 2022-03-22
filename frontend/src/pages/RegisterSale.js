import { Link as RouterLink } from "react-router-dom";
import { Grid, Box, Button, Typography, Divider } from "@mui/material";
import Page from "../components/Page";
import logo from "../image/logo.png";

function RegisterSale() {
  /**
   * HSH | 2022.03.22 | v1.0
   * @name ItemDetailGridStyle
   * @des 이미지, author, title, description이 들어가는 영역
   */
  const ItemDetailGridStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  };

  /**
   * HSH | 2022.03.22 | v1.0
   * @name ItemSaleGridStyle
   * @des buy now, make offer, end date가 들어가는 영역
   */
  const ItemSaleGridStyle = {};

  /**
   * HSH | 2022.03.22 | v1.0
   * @name DetailImgGridStyle
   * @des ItemDetailGridStyle안에서 Image가 들어가는 영역 css
   */
  const DetailImgGridStyle = {
    margin: 5,
    width: "300px",
    height: "300px",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    border: "solid #ababab",
    borderRadius: "20px",
  };

  /**
   * HSH | 2022.03.22 | v1.0
   * @name DetailGridStyle
   * @des ItemDetailGridStyle안에서 Author, title, description이 들어가는 영역
   */
  const DetailGridStyle = {
    margin: 5,
  };

  return (
    <Page display="flex" justifyContent="center" title="SSAFY NFT">
      <Grid
        display="flex"
        flexDirection="column"
        justifyContent="center"
        sx={{ width: 1000, mb: 10 }}
      >
        <Typography variant="h4">Sales Registration</Typography>
        <Divider />
        <Grid sx={ItemDetailGridStyle}>
          {/**
           * HACK
           * 이미지 임시로 logo 이미지로 넣어둠
           */}
          <Grid sx={DetailImgGridStyle}>
            <Box
              component="img"
              sx={{ maxWidth: "300px", maxHeight: "300px" }}
              src={logo}
            />
          </Grid>
          <Grid sx={DetailGridStyle}></Grid>
        </Grid>
        <Grid sx={ItemSaleGridStyle}></Grid>
      </Grid>
    </Page>
  );
}

export default RegisterSale;
