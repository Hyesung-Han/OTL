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

import COMMON_ABI from "../common/ABI";
import { Web3Client } from "../common/web3Client";

/**
 * HSH | 2022.03.30 | v2.0
 * @name RegisterSale
 * @api [post] /sales : NFT 판매 등록 후, DB로 저장
 * @des 클릭 : 해당 NFT에 대한 Smart Contract 생성 -> 관련 정보 DB 저장(api) -> 성공 후, 계약 권한 부여 및 소유권 변경
 */

// 가격 유효성 검사 (숫자만, 100자까지)
const regPr = /^[0-9]{1,100}$/;

function RegisterSale() {
  // nft contract
  const NFT_CA = process.env.REACT_APP_NFT_CA;
  const nftInstance = new Web3Client.eth.Contract(
    COMMON_ABI.CONTRACT_ABI.NFT_ABI,
    NFT_CA
  );

  // saleFactory contract
  const SALE_FACTORY_CA = process.env.REACT_APP_SALE_FACTORY_CA;
  const saleFactoryInstance = new Web3Client.eth.Contract(
    COMMON_ABI.CONTRACT_ABI.SALE_FACTORY_ABI,
    SALE_FACTORY_CA
  );

  const { serverUrlBase } = useContext(CommonContext);
  const { token_id } = useParams();

  const [imgURL, setImgURL] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const getItemDetail = async () => {
    await Axios.get(serverUrlBase + "/items/" + token_id)
      .then(async (data) => {
        if (data.data.result === "success") {
          console.log(data.data.data);

          const nftURL = await nftInstance.methods.tokenURI(token_id).call();
          console.log(nftURL);
          setImgURL(nftURL);

          const res = data.data.data;
          setAuthor(res.author_name);
          setTitle(res.item_title);
          setDescription(res.item_description);
          setCategory(res.category_code);
        } else {
          console.log("불러오기 실패");
        }
      })
      .catch(function (error) {
        console.log("아이템 불러오기 오류 : " + error);
      });
  };

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

  const navigate = useNavigate();
  const user = useSelector((state) => state.User.user);
  const [disabled, setDisabled] = useState(true);

  const inputTexts = [
    {
      name: "Author",
      data: author,
      rows: 1,
      multiline: false,
    },
    {
      name: "Title",
      data: title,
      rows: 1,
      multiline: false,
    },
    {
      name: "Description",
      data: description,
      rows: 4,
      multiline: true,
    },
    {
      name: "Category",
      data: category,
      rows: 1,
      multiline: false,
    },
  ];

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
  }, [price, priceError]);

  useEffect(() => {
    getItemDetail();
    console.log(endDate);
  }, []);

  const onClickCreate = async () => {

   const date = new Date(endDate);
   const endSeconds = Math.floor(date.getTime() / 1000);
   const ERC20 = process.env.REACT_APP_ERC20_CA;
   const NFTAddress = process.env.REACT_APP_NFT_CA;

   const saleContractData = {
      token_id : token_id,
      price : price,
      startDate: Math.floor(Date.now() / 1000),
      endDate: endSeconds,
      ERC20 : ERC20,
      NFTAddress : NFTAddress
   }

   saleSuccess(saleContractData)
      .then(async(data) => {

         // 반환 값에서 주소 찾기필요
         console.log(data);
         const returnAddress = data.events.NewSale.returnValues._saleContract;

         //MetaMask 서명 순차 실행
         nftInstance.methods
            .setApprovalForAll(returnAddress, true)
            .send({ from: user.user_address });

         const sendNFT = nftInstance.methods
            .transferFrom(user.user_address, returnAddress, token_id)
            .send({ from: user.user_address });

         // transferFrom confirm 클릭시 실행
         sendNFT.on('confirmation', function(confirmationNumber, receipt){

         if (confirmationNumber > 0) {
            sendNFT.off('confirmation');
            throw new Error("ConfirmCompletedException");
         }

         const realEndDate = endDate.toISOString().split("T");
         const rrealEndDate = realEndDate[0] + " " + realEndDate[1].split(".")[0];
   
         Axios.post(serverUrlBase + `/sales`, {
            token_id: token_id,
            seller_address: user.user_address,
            completed_at: rrealEndDate,
            sale_contract_address: returnAddress,
         })
         .then(async (data) => {
            console.log(data);
            if (data.status === 201) {
            
               // 소유자가 sale contract에게 권한 부여 및 소유권 변경
               await Swal.fire({
               icon: "success",
               title: "판매 등록 완료",
               });
      
               await navigate("/main");
   
            } else {
               Swal.fire({
               icon: "error",
               title: "판매 등록 실패",
               });
            }
         })
         .catch(function (error) {
            console.log("판매 등록 오류 : " + error);
   
            Swal.fire({
               icon: "error",
               title: "판매 등록 오류",
            });
         });
      });
   });
};

// saleContract 생성 부분
async function saleSuccess(data) {
   const saleInstance =  await saleFactoryInstance.methods
      .createSale(data.token_id, 1, data.price, data.startDate, data.endDate, data.ERC20, data.NFTAddress)
      .send({ from: user.user_address });

   return saleInstance;
}

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
          readOnly
        />
      </Paper>
    </FormControl>
  ));

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
                src={imgURL}
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
