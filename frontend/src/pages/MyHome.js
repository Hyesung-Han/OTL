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

import BackupIcon from "@mui/icons-material/Backup";
import logo from "../image/logo.png";

import MyItemList from "../components/myhome/MyItemList";
import MyProfile from "../components/myhome/MyProfile";
import MyRoom from "../components/myhome/MyRoom";
import HorizonLine from "../components/HorizonLine";

function MyHome() {
  const user = useSelector((state) => state.User.user);
  const { serverUrlBase } = useContext(CommonContext);

  const [img, setImg] = useState("");
  const [uploadImg, setUploadImg] = useState("");
  const imgRef = useRef();
  let navigate = useNavigate();

  const [imgError, setImgError] = useState(true);

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!imgError ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [imgError]);

  /**
   * HSH | 2022.03.21 | v1.0
   * @name onClickImg
   * @des 이미지 클릭 시 실행되는 함수
   */
  const onClickImg = () => {
    imgRef.current.click();
  };

  /**
   * HSH | 2022.03.21 | v1.0
   * @name onClickCancel
   * @des cancel 버튼 클릭 시 실행
   */
  const onClickCancel = () => {
    console.log("onClickCancel");
    navigate("/main");
  };

  /**
   * HSH | 2022.03.21 | v1.0
   * @name onImgChange
   * @des 파일 선택장에서 파일 선택 시 실행
   */
  const onImgChange = async (event) => {
    if (!event.target.files[0]) return;

    setImg(event.target.files[0]);
    setUploadImg(URL.createObjectURL(event.target.files[0]));

    setImgError(false);
  };

  const RootStyle = {
    width: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const BodyStyle = {
    width: 1000,
    marginBottom: "100px",
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

  return (
    <div style={RootStyle}>
      <div style={BodyStyle}>
        <Typography variant="h4">MyHome</Typography>
        <Divider />
        <Box display="flex" flexDirection="row">
          <Box
            sx={{
              width: 300,
              height: 450,
            }}
          >
          <MyProfile sx={{ mt: 1 }} />
          </Box>
          <Box
            sx={{
              width: 700,
              height: 450,
              bgcolor: '#000000',
              '&:hover': {
                backgroundColor: 'primary.dark',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
          <MyRoom sx={{ mt: 1 }} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="row">
          <Box
            sx={{
              width: '100%',
              height: 300,
              bgcolor: '#eeeeee',
              '&:hover': {
                backgroundColor: 'primary.dark',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <HorizonLine text="my items" />
            <MyItemList sx={{ mt: 1 }} />
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default MyHome;