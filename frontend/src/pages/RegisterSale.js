import { Link as RouterLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Typography,
  Divider,
  InputBase,
  Paper,
  Grid,
  NativeSelect,
  FormControl,
  FormLabel,
  FormHelperText,
  TextField,
} from "@mui/material";
import Page from "../components/Page";
import Axios from "axios";

import InputAdornment from "@mui/material/InputAdornment";

import { CommonContext } from "../context/CommonContext";
import { useState, useRef, useEffect, useContext } from "react";
import { useSelector } from "react-redux";

import Swal from "sweetalert2";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import DateRangeIcon from "@mui/icons-material/DateRange";
import logo from "../image/logo.png";

/**
 * HSH | 2022.03.29 | UPDATE
 * @name RegisterSale
 * @api 이제 할겁니다~
 * @des NFT화 된 작품을 판매 등록함
 */

// 가격 유효성 검사 (숫자만, 100자까지)
const regPr = /^[0-9]{1,100}$/;

function RegisterSale() {
  const RootStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const BodyStyle = {
    width: 1000,
  };

  const ContentStyle = {
    display: "flex",
    alignItems: "left",
    flexDirection: "column",
    padding: "0 50px",
  };

  const ButtonStyle = styled(Button)((theme) => ({
    margin: "10px 10px",
    width: "100px",
    font: "1em Fira Sans",
    fontWeight: "bold",
    border: "2px solid #ababab",
    borderRadius: "10px",
    color: "#404040",
    "&:hover": {
      color: "#00AB55",
    },
  }));

  // url parameter로 받아옴 (작품 상세보기에서)
  const { token_id } = useParams();

  const navigate = useNavigate();
  const { serverUrlBase } = useContext(CommonContext);
  const user = useSelector((state) => state.User.user);

  const [uploadImg, setUploadImg] = useState("");
  const [uploadImgURL, setUploadImgURL] = useState("");

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [disabled, setDisabled] = useState(true);

  const inputTexts = [
    {
      name: "Author",
      data: author,
      rows: 1,
      placeholder: "작가 이름 오고",
      multiline: false,
    },
    {
      name: "Title",
      data: title,
      rows: 1,
      placeholder: "작품 제목 오고",
      multiline: false,
    },
    {
      name: "Description",
      data: description,
      rows: 4,
      placeholder: "설명 오고",
      multiline: true,
    },
    {
      name: "Category",
      data: category,
      rows: 1,
      placeholder: "카테고리 오고",
      multiline: false,
    },
  ];

  const onClickCreate = async () => {
    /**
     * HACK
     * Merge 전에 임시 코드 입니다 [onClikcCreate]
     */
    console.log(category);

    const formData = new FormData();
    formData.append("items", uploadImg);
    formData.append("user_address", user.user_address);
    formData.append("author_name", author);
    formData.append("item_title", title);
    formData.append("item_description", description);
    /**
     * HACK
     * 카테고리 연결 되면 이후에 추가
     */
    formData.append("category_code", "bed");

    await Axios.post(serverUrlBase + `/items`, formData)
      .then(async (data) => {
        console.log(data);
        if (data.status === 201) {
          await Swal.fire({
            icon: "success",
            title: "작품 등록은 성공적",
          });
          await navigate("/main");
        } else if (data.status === 200) {
          Swal.fire({
            icon: "warning",
            title: data.data.msg,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "작품 등록 실패?",
          });
        }
      })
      .catch(function (error) {
        console.log("아이템 등록 오류 : " + error);

        Swal.fire({
          icon: "error",
          title: "아이템 등록 오류",
        });
      });
  };

  const inputTextList = inputTexts.map((item, index) => (
    <FormControl
      key={index}
      sx={{ mb: 2 }}
      required
      component="fieldset"
      variant="standard"
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {item.name}
        </Typography>
      </Box>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          p: "2px 4px",
          width: 500,
          border: "2px solid #cbcbcb",
        }}
      >
        <InputBase
          value={item.data}
          multiline={item.multiline}
          rows={item.rows}
          sx={{ width: "95%" }}
          placeholder={item.placeholder}
        />
      </Paper>
    </FormControl>
  ));

  const curDate = new Date();
  const [price, setPrice] = useState("");
  const [endDate, setendDate] = useState(curDate);
  const [priceError, setPriceError] = useState(false);

  function onChangePrice(e) {
    const value = e.target.value;
    setPrice(value);
  }

  useEffect(() => {
    if (price.length === 0) {
      setPriceError(false);
    } else {
      if (!regPr.test(price)) {
        setPriceError(true);
      } else {
        setPriceError(false);
      }
    }

    if (price !== "" && priceError === false) {
      setDisabled(false);
    }

    if (price === "" || priceError === true) {
      setDisabled(true);
    }
    console.log(endDate);
  }, [price, priceError, endDate]);

  return (
    <div style={RootStyle}>
      <div style={BodyStyle}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Sale Your Item
        </Typography>
        <Divider />
        <Box m={5} display="flex" flexDirection="row">
          <Box display="flex" flexDirection="column">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                p: 10,
                width: 400,
                height: 400,
                border: "dashed #ababab",
                borderRadius: 2,
                mb: 3,
              }}
            >
              <Box
                component="img"
                src={uploadImgURL}
                sx={{ maxWidth: "400px", maxHeight: "400px" }}
              />
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={7}>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  Price
                </Typography>
                <TextField
                  required
                  error={priceError}
                  fullWidth
                  label="Enter purchase price"
                  onChange={onChangePrice}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">SSF</InputAdornment>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  End Date
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    value={endDate}
                    minDate={curDate}
                    onChange={(newValue) => {
                      setendDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Box>
          </Box>
          <div style={ContentStyle}>
            {inputTextList}
            <Box mt={3} display="flex" justifyContent="right">
              <ButtonStyle disabled={disabled} onClick={onClickCreate}>
                CREATE
              </ButtonStyle>
              <ButtonStyle to="/main" component={RouterLink}>
                CANCEL
              </ButtonStyle>
            </Box>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default RegisterSale;
