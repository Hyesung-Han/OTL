import * as React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import {
  Box,
  Typography,
  Divider,
  Card,
  CardActionArea,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Avatar,
} from "@mui/material";
import Axios from "axios";

import { CommonContext } from "../context/CommonContext";
import { useNavigate } from "react-router-dom";

import MyItemList from "../components/myhome/MyItemList";
import MyProfile from "../components/myhome/MyProfile";
import MyRoom from "../components/myhome/MyRoom";
import HorizonLine from "../components/HorizonLine";
import Swal from "sweetalert2";

import COMMON_ABI from "../common/ABI";
import { Web3Limit } from "../common/web3Client";

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/UserReducer";

/**
 * LJA | 2022.03.28 | ADD
 * @name MyHome
 * @des MyHome 컴포넌트
 * MyHome 페이지의 최상위 컴포넌트로 프로필, 마이룸, 마이 아이템 컴포넌트가 포함되어있음
 * 마이룸, 마이 아이템에 사용되는 데이터를 호출
 */

function MyHome() {
  const navigate = useNavigate();
  const { serverUrlBase } = useContext(CommonContext);
  const user = useSelector((state) => state.User.user);
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [myItems, setMyItems] = useState([]);
  const NFT_CA = process.env.REACT_APP_NFT_CA;
  const nftInstance = new Web3Limit.eth.Contract(
    COMMON_ABI.CONTRACT_ABI.NFT_ABI,
    NFT_CA
  );

  const getItems = async () => {
    try {
      setItems([]);
      const { data } = await Axios.get(
        serverUrlBase + `/items?user_address=` + user.user_address
      );
      data.data.forEach(async (row) => {
        const nftURL = await nftInstance.methods.tokenURI(row.token_id).call();
        row.src = nftURL;
        setItems((items) => [...items, row]);
      });
    } catch (e) {
      console.log("나의 모든 아이템 가져오기 오류 : " + e);
    }
  };

  const getMyItems = async () => {
    try {
      setMyItems([]);
      const { data } = await Axios.get(
        serverUrlBase + `/home/` + user.user_address
      );
      await data.data.forEach(async (row) => {
        const nftURL = await nftInstance.methods.tokenURI(row.token_id).call();
        row.src = nftURL;
        setMyItems((myItems) => [...myItems, row]);
      });
    } catch (e) {
      console.log("나의 사용중인 아이템 가져오기 오류 : " + e);
    }
  };

  const removeItem = async (token_id) => {
    try {
      const { data } = await Axios.patch(serverUrlBase + `/home/` + token_id, {
        on_use_yn: 0,
        x_index: 0,
        y_index: 0,
        z_index: 0,
      });
      getItems();
      getMyItems();
    } catch (e) {
      console.log("아이템 제거하기 에러: " + e);
    }
  };

  const addItem = async (token_id) => {
    try {
      const { data } = await Axios.patch(serverUrlBase + `/home/` + token_id, {
        on_use_yn: 1,
        x_index: 0,
        y_index: 0,
        z_index: 0,
      });
      getItems();
      getMyItems();
    } catch (e) {
      console.log("아이템 추가하기 에러: " + e);
    }
  };

  useEffect(() => {
    getItems();
    getMyItems();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [uploadImg, setUploadImg] = useState("");
  const [uploadImgURL, setUploadImgURL] = useState(user.user_image_url);
  const imgRef = useRef();

  const onClickImg = () => {
    imgRef.current.click();
  };

  const onChangeImg = async (event) => {
    if (!event.target.files[0]) return;

    setUploadImg(event.target.files[0]);
    setUploadImgURL(URL.createObjectURL(event.target.files[0]));
  };

  const regNm = /^[a-z0-9]{4,}$/;
  const regEma =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const [disabled, setDisabled] = useState(true);
  const [profileData, setProfileData] = useState({
    nickname: user.user_nickname,
    email: user.user_email,
    bio: user.user_bio,
    link: user.user_link,
  });

  const OnChangeHandler = (name) => (e) => {
    setProfileData({ ...profileData, [name]: e.target.value });
  };

  const onUpdateHandler = async () => {
    var { nickname, email, bio, link } = profileData;

    const formData = new FormData();
    formData.append("user_address", user.user_address);
    formData.append("profile", uploadImg);
    formData.append("user_image_url", user.user_image_url);

    if (uploadImg) {
      await Axios.patch(serverUrlBase + `/user/profileImg`, formData)
        .then(async (data) => {
          const create_result = data.data.result;
          if (create_result == "success") {
          } else {
            Swal.fire({
              icon: "error",
              title: "프로필 수정에 실패하였ㅅ브니다",
              text: "Something went wrong!",
            });
            navigate("/myhome");
            return;
          }
        })
        .catch(function (error) {
          console.log("프로필 생성 오류 : " + error);
        });
    }

    await Axios.patch(serverUrlBase + `/user/profile`, {
      user_address: user.user_address,
      user_nickname: nickname,
      user_email: email,
      user_link: link,
      user_bio: bio,
    })
      .then(async (data) => {
        const create_result = data.data.result;
        if (create_result == "success") {
          await Axios.get(
            serverUrlBase + `/user/profile?user_address=` + user.user_address
          )
            .then((data) => {
              const connect_user = data.data.data;
              dispatch(setUser(connect_user));
            })
            .catch(function (error) {
              console.log("프로필 정보 불러오기 오류 : " + error);
            });
          navigate("/myhome");
        } else {
          navigate("/main");
        }
      })
      .catch(function (error) {
        console.log("프로필 생성 오류 : " + error);
      });
  };

  const [nincknameErr, setNicknameErr] = useState(false);
  const [nincknameErrMsg, setNicknameErrMsg] = useState();
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState();

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
            if (
              user.user_nickname != profileData.nickname &&
              data.data.data === false
            ) {
              setNicknameErr(true);
              setNicknameErrMsg("It's a registered ID that already exists!");
            } else {
              setNicknameErr(false);
              setNicknameErrMsg();
            }
          })
          .catch(function (error) {
            console.log("닉네임 중복 오류 : " + error);
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

  if (!items) return <>로딩</>;
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
              mr: 3,
              mt: 3,
            }}
          >
            <Card>
              <CardActionArea onClick={handleClickOpen}>
                <MyProfile />
              </CardActionArea>
            </Card>
          </Box>
          <Box
            sx={{
              width: 680,
              height: 380,
              mt: 3,
            }}
          >
            <Card sx={{ width: "100%", height: "100%" }}>
              {myItems.length == 0 ? (
                <Grid
                  sx={{
                    textAlign: "center",
                    pt: "160px",
                    color: "rgba(131, 139, 151, 0.5)",
                    fontSize: "21px",
                  }}
                >
                  <span>decorate your own unique room</span>
                </Grid>
              ) : (
                <MyRoom myItems={myItems} />
              )}
            </Card>
          </Box>
        </Box>
        <Box display="flex" flexDirection="row">
          <Box
            sx={{
              width: "100%",
              height: 300,
            }}
          >
            <HorizonLine text="my items" />
            <MyItemList
              sx={{ mt: 1 }}
              products={items}
              removeItem={removeItem}
              addItem={addItem}
            />
          </Box>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent sx={{ width: 480 }}>
            <Grid sx={{ textAlign: "-webkit-center" }}>
              <Avatar
                alt="Avatar"
                src={uploadImgURL}
                sx={{ width: 200, height: 200, mr: 5, ml: 5, mb: 2 }}
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
            <Grid item sx={{ py: 1 }}>
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
            <Grid item sx={{ py: 1 }}>
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
            <Grid item>
              <TextField
                fullWidth
                label="Enter your sns"
                onChange={OnChangeHandler("link")}
                defaultValue={profileData.link}
              ></TextField>
            </Grid>
            <Grid item sx={{ py: 2 }}>
              <TextField
                multiline
                rows={3}
                fullWidth
                label="Tell the world your story!"
                onChange={OnChangeHandler("bio")}
                defaultValue={profileData.bio}
              ></TextField>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onUpdateHandler}>Update</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default MyHome;
