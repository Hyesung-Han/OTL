import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import Page from "../components/Page";
import Axios from "axios";

import { CommonContext } from "../context/CommonContext";
import { useState, useRef, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Web3 from 'web3';
import COMMON_ABI from '../common/ABI';
import { Web3Client } from "../common/web3Client";
import COMMON_HEADER from '../common/HeaderType';
import sendTransaction from "../utils/TxSender";
import BackupIcon from "@mui/icons-material/Backup";
import logo from "../image/logo.png";
import useWeb3Manager from "web3-react/dist/manager";

/**
 * HSH | 2022.03.29 | UPDATE
 * @name RegisterItem
 * @api {post} HOST/items
 * @api {patch} HOST/items/:item_id
 * @des 작품 등록 -> DB저장 -> NFT 등록 -> DB저장
 * @des Web3만 해결되면 일사천리~ (아직 하는중)
 */
function RegisterItem() {
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

  const ImageStyle = styled(Button)((props) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "10px",
    width: "400px",
    height: "400px",
    border: "dashed #ababab",
    borderRadius: "20px",
  }));

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
  const { serverUrlBase } = useContext(CommonContext);
  const user = useSelector((state) => state.User.user);

  const [uploadImg, setUploadImg] = useState("");
  const [uploadImgURL, setUploadImgURL] = useState("");
  const imgRef = useRef();

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const [imgError, setImgError] = useState(true);
  const [authorError, setauthorError] = useState(true);
  const [titleError, setTitleError] = useState(true);
  const [desError, setDesError] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const onChangeAutor = (e) => {
    const value = e.target.value;
    setAuthor(e.target.value);

    if (!value) {
      setauthorError(true);
    } else {
      setauthorError(false);
    }
  };

  const onChangeTitle = (e) => {
    const value = e.target.value;
    setTitle(e.target.value);

    if (!value) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
  };

  const onChangedes = (e) => {
    const value = e.target.value;
    setDescription(e.target.value);

    if (!value) {
      setDesError(true);
    } else {
      setDesError(false);
    }
  };

  const onChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const inputTexts = [
    {
      name: "Author",
      data: author,
      set: onChangeAutor,
      rows: 1,
      placeholder: "Please enter the author's name",
      multiline: false,
      error: authorError,
    },
    {
      name: "Title",
      data: title,
      set: onChangeTitle,
      rows: 1,
      placeholder: "Please enter the item's name",
      multiline: false,
      error: titleError,
    },
    {
      name: "Description",
      data: description,
      set: onChangedes,
      rows: 4,
      placeholder: "Write down the description of the item",
      multiline: true,
      error: desError,
    },
  ];

  function getCategoryList() {
    Axios.get(serverUrlBase + `/items/category`)
      .then((data) => {
        setCategory(data.data.data[0].category_code);
        setCategoryList(data.data.data);
      })
      .catch(function (error) {
        console.log("get category error:" + error);

        Swal.fire({
          icon: "error",
          title: "서버와 연동이 끊겼습니다. 다시 시도해주세요",
        });
        navigate("/main");
      });
  }

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    if (!imgError && !authorError && !titleError && !desError) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [imgError, authorError, titleError, desError]);

  // nft contract
  const NFT_CA = process.env.REACT_APP_NFT_CA;
  const nftInstance = new Web3Client.eth.Contract(
    COMMON_ABI.CONTRACT_ABI.NFT_ABI, 
    NFT_CA
  );

  const onClickImg = () => {
    imgRef.current.click();
  };

  const onChangeImg = async (event) => {
    if (!event.target.files[0]) return;

    setUploadImg(event.target.files[0]);
    setUploadImgURL(URL.createObjectURL(event.target.files[0]));

    setImgError(false);
  };

  const onClickCreate = async () => {
    console.log(category);

    const formData = new FormData();
    formData.append("items", uploadImg);
    formData.append("user_address", user.user_address);
    formData.append("author_name", author);
    formData.append("item_title", title);
    formData.append("item_description", description);
    formData.append("category_code", category);

    try{
      const data = await Axios.post(serverUrlBase + `/items`, formData);
      console.log(data);
      if (data.status === 200) {
        Swal.fire({
          icon: "warning",
          title: data.data.msg,
        });
      } else if (data.status === 201) {
        /**
         * TODO
         * NFT 생성하기
         */
        const nftMint = await nftInstance.methods.create(user.user_address, data.data.data.item_image).send({from:user.user_address});
        const token = nftMint.events.Transfer.returnValues.tokenId;
        console.log(token);
        const nftURL = await nftInstance.methods.tokenURI(token).call();
        console.log(nftURL);

        Swal.fire({
          icon: "success",
          title: "글이 성공적으로 등록되었습니다.",
        });
        navigate("/main");
      } else  {
        Swal.fire({
          icon: "error",
          title: "아이템 등록 오류",
        });
      }
    }catch(error){
      console.log("Item register error:" + error);

      Swal.fire({
        icon: "error",
        title: "아이템이 정상적으로 등록되지 않았습니다",
      });
    }
  };

  const inputTextList = inputTexts.map((item, index) => (
    <FormControl
      key={index}
      sx={{ mb: 2 }}
      required
      error={item.error}
      component="fieldset"
      variant="standard"
    >
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {item.name}
        </Typography>
        <FormLabel component="legend"></FormLabel>
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
          onChange={item.set}
          value={item.data}
          multiline={item.multiline}
          rows={item.rows}
          sx={{ width: "95%" }}
          placeholder={item.placeholder}
        />
      </Paper>
    </FormControl>
  ));

  return (
    <div style={RootStyle}>
      <div style={BodyStyle}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Create New Item
        </Typography>
        <Divider />
        <Box m={5} display="flex" flexDirection="row">
          <Box display="flex" flexDirection="column">
            {uploadImgURL && (
              <Typography color="primary" sx={{ mb: 1 }}>
                *required
              </Typography>
            )}
            {!uploadImgURL && (
              <Typography color="#ff0000" sx={{ mb: 1 }}>
                *required
              </Typography>
            )}
            <ImageStyle onClick={onClickImg}>
              {uploadImgURL && (
                <Box
                  component="img"
                  src={uploadImgURL}
                  sx={{ maxWidth: "400px", maxHeight: "400px" }}
                />
              )}
              {!uploadImgURL && (
                <div>
                  <BackupIcon sx={{ fontSize: "50px", color: "#ababab" }} />
                  <Typography
                    sx={{
                      fontSize: "20px",
                      color: "#ababab",
                      fontWeight: "bold",
                    }}
                  >
                    Upload Img
                  </Typography>
                </div>
              )}
            </ImageStyle>
            <input
              ref={imgRef}
              type="file"
              accept="image/*"
              onChange={onChangeImg}
              hidden
            />
          </Box>
          <div style={ContentStyle}>
            {inputTextList}
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="h5">Category</Typography>
            </Box>
            <Box m={0.5}>
              <FormControl fullWidth>
                <NativeSelect onChange={onChangeCategory}>
                  {categoryList &&
                    categoryList.map((item, index) => (
                      <option key={index}>{item.category_code}</option>
                    ))}
                </NativeSelect>
              </FormControl>
            </Box>
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
export default RegisterItem;
