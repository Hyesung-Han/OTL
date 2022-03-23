import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Box,
  Button,
  Typography,
  Divider,
  Paper,
  InputBase,
  TextField,
} from "@mui/material";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

import Page from "../components/Page";
import { useState } from "react";

import DateRangeIcon from '@mui/icons-material/DateRange';
import logo from "../image/logo.png";

/**
 * HSH | 2022.03.22 | ADD
 * @name RegisterSale
 * @des Register Sale 페이지. 판매 등록
 */
function RegisterSale() {
  const { item_id } = useParams();
  // console.log(item_id);

  const curDate=new Date();

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [buyNow, setBuyNow] = useState("");
  const [makeOffer, setMakeOffer] = useState("");
  const [endDate, setendDate] = useState(curDate);

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

  const ButtonGridStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  const ButtonStyle = styled(Button)((theme) => ({
    margin: "10px 10px",
    width: "100px",
    font: "1em Fira Sans",

    border: "2px solid #ababab",
    borderRadius: "10px",
    color: "#404040",

    "&:hover": {
      /**
       * HACK
       * 테마 적용하고 싶은데 에러나서 그냥 테마 값 가져다 씀
       */
      color: "#00AB55",
    },
  }));

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
      unit: "SSF",
      value: buyNow,
      func: onChangeBuyNow,
    },
    {
      name: "Make Offer",
      unit: "SSF",
      value: makeOffer,
      func: onChangeMakeOffer,
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

  /**
   * HSH | 2022.03.22 | v1.0
   * @name onClickCreate
   * @des create 버튼 클릭 시 실행
   */
  const onClickCreate = () => {
    console.log("onClickCreate");
  };

  /**
   * HSH | 2022.03.22 | v1.0
   * @name onClickCancel
   * @des cancel 버튼 클릭 시 실행
   */
  const onClickCancel = () => {
    console.log("onClickCancel");
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
          <Box mb={3}>
            <Typography variant="h5">End Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                value={endDate}
                minDate={curDate}
                onChange={(newValue) => {
                  setendDate(newValue);
                }}
                renderInput={(params) => <TextField sx={{width: 900}} {...params}/>}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
        <Box mt={3} display="flex" justifyContent="right">
          <ButtonStyle onClick={onClickCreate}>CREATE</ButtonStyle>
          <ButtonStyle onClick={onClickCancel}>CANCEL</ButtonStyle>
        </Box>
      </Grid>
    </Page>
  );
}

export default RegisterSale;
