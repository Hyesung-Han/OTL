import { Link as RouterLink } from "react-router-dom";
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
} from "@mui/material";
import Page from "../components/Page";

import { useState, useRef } from "react";

import BackupIcon from "@mui/icons-material/Backup";
import logo from "../image/logo.png";

function RegisterItem() {
  const [uproadImg, setUproadImg] = useState("");
  const imgRef = useRef();

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");

  /**
   * HSW | 2022.03.21 | v1.0
   * @name RootStyle
   * @des 가장 바깥 root css
   */
  const RootStyle = {
    width: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  /**
   * HSW | 2022.03.21 | v1.0
   * @name BodyStyle
   * @des root 바로 다음. 폭 넓이 지정해주는 css
   */
  const BodyStyle = {
    width: 1000,
  };

  /**
   * HSW | 2022.03.21 | v1.0
   * @name ContentStyle
   * @des author, title 등등 text 부분 영역
   */
  const ContentStyle = {
    display: "flex",
    alignItems: "left",
    flexDirection: "column",

    padding: "0 50px",
  };

  /**
   * HSW | 2022.03.21 | v1.0
   * @name ImageStyle
   * @des uproad image 영역
   */
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

  /**
   * HSW | 2022.03.21 | v1.0
   * @name onClickImg
   * @des 이미지 클릭 시 실행되는 함수
   */
  const onClickImg = () => {
    imgRef.current.click();
  };

  /**
   * HSW | 2022.03.21 | v1.0
   * @name onChangeAutor
   * @des author 변경 시 실행
   */
  const onChangeAutor = (e) => {
    setAuthor(e.target.value);
  };

  /**
   * HSW | 2022.03.21 | v1.0
   * @name onChangeTitle
   * @des title 변경 시 실행
   */
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  /**
   * HSW | 2022.03.21 | v1.0
   * @name onChangeDescription
   * @des description 변경 시 실행
   */
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  /**
   * HSW | 2022.03.21 | v1.0
   * @name inputTexts
   * @des author, title, Description에 관한 정보 저장
   */
  const inputTexts = [
    {
      name: "Author",
      data: author,
      set: onChangeAutor,
      rows: 1,
      placeholder: "Name",
      multiline: false,
    },
    {
      name: "Title",
      data: title,
      set: onChangeTitle,
      rows: 1,
      placeholder: "item title",
      multiline: false,
    },
    {
      name: "Description",
      data: Description,
      set: onChangeDescription,
      rows: 4,
      placeholder: "item description",
      multiline: true,
    },
  ];

  /**
   * HSW | 2022.03.21 | v1.0
   * @name inputTextList
   * @des inputTexts의 값들을 뿌려주는 컴포넌트
   */
  const inputTextList = inputTexts.map((item, index) => (
    <Box key={index} mb={3}>
      <Typography variant="h5">{item.name}</Typography>
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
    </Box>
  ));

  /**
   * HSW | 2022.03.21 | v1.0
   * @name ButtonStyle
   * @des create, cancel 버튼 css
   */
  const ButtonStyle = styled(Button)((theme) => ({
    margin: "10px 10px",
    width: "100px",
    font: "1em Fira Sans",
    // fontWeight:'bold',

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

  /**
   * HSW | 2022.03.21 | v1.0
   * @name onClickCreate
   * @des create 버튼 클릭 시 실행
   */
  const onClickCreate = () => {
    console.log("onClickCreate");
  };

  /**
   * HSW | 2022.03.21 | v1.0
   * @name onClickCancel
   * @des cancel 버튼 클릭 시 실행
   */
  const onClickCancel = () => {
    console.log("onClickCancel");
  };

  /**
   * HSW | 2022.03.21 | v1.0
   * @name onImgChange
   * @des 파일 선택장에서 파일 선택 시 실행
   */
  const onImgChange = async (event) => {
    setUproadImg(URL.createObjectURL(event.target.files[0]));
  };

  /**
   * HSW | 2022.03.21 | v1.0
   * @name categoryList
   * @des 카테고리 리스트
   * HACK
   * 카테고리 db에서 받아오기전까지는 임시로 사용하도록 만들어 놓음
   */
  const categoryList = [
    {
      id: 0,
      name: "chair",
    },
    {
      id: 1,
      name: "table",
    },
    {
      id: 2,
      name: "wallpaper",
    },
    {
      id: 3,
      name: "floor",
    },
    {
      id: 4,
      name: "wall hanging",
    },
    {
      id: 5,
      name: "prop",
    },
  ];

  return (
    <div style={RootStyle}>
      <div style={BodyStyle}>
        <Typography variant="h4">Create New Item</Typography>
        <Divider />
        <Box m={5} display="flex" flexDirection="row">
          <Box display="flex" flexDirection="column">
            <ImageStyle onClick={onClickImg}>
              {uproadImg && (
                <Box
                  component="img"
                  src={uproadImg}
                  sx={{ maxWidth: "400px", maxHeight: "400px" }}
                />
              )}

              {!uproadImg && (
                <div>
                  <BackupIcon sx={{ fontSize: "50px", color: "#ababab" }} />
                  <Typography
                    sx={{
                      fontSize: "20px",
                      color: "#ababab",
                      fontWeight: "bold",
                    }}
                  >
                    Uproad Img
                  </Typography>
                </div>
              )}
            </ImageStyle>
            <input
              ref={imgRef}
              type="file"
              id="file_input"
              accept="image/*"
              onChange={onImgChange}
              hidden
            />
          </Box>
          <div style={ContentStyle}>
            {inputTextList}
            <Typography variant="h5">category</Typography>
            <Box m={0.5}>
              <FormControl fullWidth>
                <NativeSelect
                  defaultValue={0}
                  inputProps={{
                    name: "category",
                    id: "uncontrolled-native",
                  }}
                >
                  {categoryList.map((item, index) => (
                    <option key={index} value={index}>
                      {item.name}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Box>
            <Box mt={3} display="flex" justifyContent="right">
              <ButtonStyle onClick={onClickCreate}>CREATE</ButtonStyle>
              <ButtonStyle onClick={onClickCancel}>CANCEL</ButtonStyle>
            </Box>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default RegisterItem;
