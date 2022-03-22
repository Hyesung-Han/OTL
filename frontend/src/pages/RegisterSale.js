import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Grid,
  Box,
  Button,
  Typography,
  Divider,
  Paper,
  InputBase,
} from "@mui/material";
import Page from "../components/Page";
import { useState } from "react";

import logo from "../image/logo.png";

/**
 * HSH | 2022.03.22 | ADD
 * @name RegisterSale
 * @des Register Sale 페이지. 판매 등록
 */
function RegisterSale() {
  const { item_id } = useParams();
  // console.log(item_id);

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [buyNow, setBuyNow] = useState("");
  const [makeOffer, setMakeOffer] = useState("");
  const [endDate, setendDate] = useState("");

  const itemSize = "320px";

  const ItemDetailGridStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const ItemSaleGridStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const DetailImgGridStyle = {
    width: itemSize,
    height: itemSize,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    border: "solid #ababab",
    borderRadius: "20px",
  };

  const DetailGridStyle = {
    margin: 3,
  };

  const itemDetailList = [
    {
      name: "Author",
      value: author,
      rows: 1,
    },
    {
      name: "Title",
      value: title,
      rows: 1,
    },
    {
      name: "Description",
      value: description,
      rows: 4,
    },
  ];

  const saleData = [
    {
      name: "Buy Now",
      unit: "ETH",
      value: buyNow,
      func: onChangeBuyNow,
    },
    {
      name: "Make Offer",
      unit: "ETH",
      value: makeOffer,
      func: onChangeMakeOffer,
    },
    {
      name: "Duration",
      unit: "DAY",
      value: endDate,
      func: onChangeEndDate,
    },
  ];

  /**
   * HSH | 2022.03.22 | v1.0
   * @name onChangeBuyNow
   * @des buy now 값 변경 시 실행
   */
  function onChangeBuyNow(e) {
    setBuyNow(e.target.value);
  }

  /**
   * HSH | 2022.03.22 | v1.0
   * @name onChangeMakeOffer
   * @des make offer 값 변경 시 실행
   */
  function onChangeMakeOffer(e) {
    setMakeOffer(e.target.value);
  }

  /**
   * HSH | 2022.03.22 | v1.0
   * @name onChangeEndDate
   * @des end date 값 변경 시 실행
   */
  function onChangeEndDate(e) {
    setendDate(e.target.value);
  }

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
              sx={{ maxWidth: itemSize, maxHeight: itemSize }}
              src={logo}
            />
          </Grid>
          <Grid sx={DetailGridStyle}>
            {itemDetailList.map((item, index) => (
              <Box key={index} mb={3}>
                <Typography variant="h5">{item.name}</Typography>
                <Paper
                  sx={{
                    display: "flex",
                    justifyContent: "center",

                    p: "2px 4px",
                    width: 500,
                    border: "2px solid #cbcbcb",
                    backgroundColor: "#dfdfdf",
                  }}
                >
                  <InputBase
                    value={item.value}
                    multiline={item.rows === 1 ? false : true}
                    rows={item.rows}
                    sx={{ width: "95%" }}
                    readOnly
                  />
                </Paper>
              </Box>
            ))}
          </Grid>
        </Grid>
        <Grid sx={ItemSaleGridStyle}>
          {saleData.map((item, index) => (
            <Box key={index} mb={3}>
              <Typography variant="h5">{item.name}</Typography>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  p: "2px 5px",
                  border: "2px solid #cbcbcb",
                  width: 900,
                }}
              >
                <InputBase
                  onChange={item.func}
                  value={item.value}
                  sx={{ width: "95%" }}
                />
                <Typography>{item.unit}</Typography>
              </Paper>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Page>
  );
}

export default RegisterSale;
