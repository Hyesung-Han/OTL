import { useState, useRef, useEffect, useContext } from "react";
import Page from "../components/Page";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import HorizonLine from "../components/HorizonLine";

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/UserReducer";

import { CommonContext } from "../context/CommonContext";

import Axios from "axios";
import Swal from "sweetalert2";

const regNm = /^[a-z0-9]{4,}$/;
const regEma =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

/**
 * LDJ | 2022.03.28 | v2.0
 * @name CreateProfile
 * @api {post} HOST/user/login : 프로필 생성 요청 (성공/실패 여부만 반환 받음)
 * @api {get} HOST/user/checkNick?user_nickname={닉네임} : 닉네임 중복 확인 요청
 * @api {get} HOST/user/profile?user_address={내지갑주소} : DB에 저장된 Profile 관련 정보 가져오기 (헤더에 반영)
 * @des 로그인 된 유저가 자신의 프로필을 생성하는 곳! (유효성 검사 + 중복 검사 + 내용 입력/저장 + 헤더의 프로필 적용을 위해서 Get Profile까지)
 */

function CreateProfile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.User.user);
  const dispatch = useDispatch();

  const [uploadImg, setUploadImg] = useState("");
  const [uploadImgURL, setUploadImgURL] = useState("");
  const imgRef = useRef();

  const onClickImg = () => {
    imgRef.current.click();
  };

  const onChangeImg = async (event) => {
    if (!event.target.files[0]) return;

    setUploadImg(event.target.files[0]);
    setUploadImgURL(URL.createObjectURL(event.target.files[0]));
  };

  const onClickDelImg = () => {
    setUploadImg("");
    setUploadImgURL("");
  };

  const { serverUrlBase } = useContext(CommonContext);

  const [disabled, setDisabled] = useState(true);

  const [profileData, setProfileData] = useState({
    address: user.user_address,
    nickname: "",
    email: "",
    bio: "",
    link: "",
  });

  const OnChangeHandler = (name) => (e) => {
    setProfileData({ ...profileData, [name]: e.target.value });
  };

  const [nincknameErr, setNicknameErr] = useState(false);
  const [nincknameErrMsg, setNicknameErrMsg] = useState();
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState();

  const onCreateHandler = async () => {
    var { address, nickname, email, bio, link } = profileData;

    const formData = new FormData();
    formData.append("profile", uploadImg);
    formData.append("user_address", address);
    formData.append("user_nickname", nickname);
    formData.append("user_email", email);
    formData.append("user_link", link);
    formData.append("user_bio", bio);

    await Axios.post(serverUrlBase + `/user/profile`, formData)
      .then(async (data) => {
        const create_result = data.data.result;
        if (create_result == "success") {
          await Axios.get(
            serverUrlBase + `/user/profile?user_address=` + profileData.address
          )
            .then((data) => {
              const connect_user = data.data.data;
              dispatch(setUser(connect_user));
            })
            .catch(function (error) {
              console.log("프로필 정보 불러오기 오류 : " + error);
              Swal.fire({
                icon: "error",
                title: "프로필 정보 불러오기 오류",
              });
            });
          await Swal.fire({
            icon: "success",
            title: "프로필 생성 성공",
          });
          await navigate("/main");
        } else {
          Swal.fire({
            icon: "error",
            title: "프로필 생성 실패",
          });
        }
      })
      .catch(function (error) {
        console.log("프로필 생성 오류 : " + error);
        Swal.fire({
          icon: "error",
          title: "프로필 생성 오류",
        });
      });
  };

  useEffect(() => {
    if (profileData.nickname.length === 0) {
      setNicknameErr(false);
      setNicknameErrMsg();
    } else {
      if (!regNm.test(profileData.nickname)) {
        setNicknameErr(true);
        setNicknameErrMsg(
          "Please enter lowercase letters + numbers and at least 4 characters!"
        );
      } else {
        Axios.get(
          serverUrlBase +
            `/user/checkNick/?user_nickname=` +
            profileData.nickname
        )
          .then((data) => {
            if (data.data.data === false) {
              setNicknameErr(true);
              setNicknameErrMsg("It's a registered ID that already exists!");
            } else {
              setNicknameErr(false);
              setNicknameErrMsg();
            }
          })
          .catch(function (error) {
            console.log("닉네임 중복 오류 : " + error);
            Swal.fire({
              icon: "error",
              title: "닉네임 중복 오류 오류",
            });
          });
      }
    }

    if (profileData.email.length === 0) {
      setEmailErr(false);
      setEmailErrMsg();
    } else {
      if (!regEma.test(profileData.email)) {
        setEmailErr(true);
        setEmailErrMsg("Please enter it in the form of an e-mail!");
      } else {
        setEmailErr(false);
        setEmailErrMsg();
      }
    }

    if (
      profileData.nickname !== "" &&
      profileData.email !== "" &&
      nincknameErr === false &&
      emailErr === false
    ) {
      setDisabled(false);
    }

    if (
      profileData.nickname === "" ||
      profileData.email === "" ||
      nincknameErr === true ||
      emailErr === true
    ) {
      setDisabled(true);
    }
  }, [profileData.nickname, profileData.email, nincknameErr, emailErr]);

  return (
    <Page
      title="OTL"
      maxWidth="100%"
      minHeight="60vh"
      alignItems="center"
      justifyContent="center"
      display="flex"
    >
      <Grid
        sx={{ width: 1 / 3 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography variant="h2">Create a profile!</Typography>
        <HorizonLine></HorizonLine>
        <Typography variant="h3" sx={{ py: 2 }}>
          Profile Image
        </Typography>
        <Typography variant="h5" sx={{ pb: 2 }}>
          Recommended 350px * 350px / Max Size : 100MB
        </Typography>
        <Grid
          container
          direction="row"
          justifycontent="flex-start"
          alignItems="flex-end"
        >
          <Grid>
            <Avatar
              alt="Avatar"
              src={uploadImgURL}
              sx={{ width: 200, height: 200, m: 3 }}
              onClick={onClickImg}
            ></Avatar>
            <input
              ref={imgRef}
              type="file"
              accept="image/*"
              onChange={onChangeImg}
              hidden
            ></input>
          </Grid>
          <Grid>
            <Button onClick={onClickDelImg} variant="contained" sx={{ m: 3 }}>
              Delete Img
            </Button>
          </Grid>
        </Grid>
        <Grid>
          <Grid item xs={12} sx={{ py: 3 }}>
            <TextField
              required
              error={nincknameErr}
              helperText={nincknameErrMsg}
              defaultValue={profileData.nickname}
              fullWidth
              label="Enter nickname"
              onChange={OnChangeHandler("nickname")}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ py: 3 }}>
            <TextField
              required
              error={emailErr}
              helperText={emailErrMsg}
              defaultValue={profileData.email}
              fullWidth
              label="Enter email"
              onChange={OnChangeHandler("email")}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ py: 3 }}>
            <TextField
              variant="filled"
              disabled
              fullWidth
              label="MetaMask Address"
              size="small"
              value={user.user_address}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ py: 1 }}>
            <TextField
              fullWidth
              label="Enter your sns"
              onChange={OnChangeHandler("link")}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ py: 4 }}>
            <TextField
              multiline
              rows={4}
              fullWidth
              label="Tell the world your story!"
              onChange={OnChangeHandler("bio")}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={disabled}
              variant="contained"
              sx={{ py: 1, mx: 2, mb: 3 }}
              onClick={onCreateHandler}
            >
              Create
            </Button>
            <Button
              to="/main"
              component={RouterLink}
              variant="contained"
              sx={{ py: 1, mx: 2, mb: 3 }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}

export default CreateProfile;
