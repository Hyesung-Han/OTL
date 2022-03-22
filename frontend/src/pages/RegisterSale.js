import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Grid, Box, Button, Typography, Divider,Paper,InputBase } from "@mui/material";
import Page from "../components/Page";
import { useState } from "react";

import logo from "../image/logo.png";

function RegisterSale() {
  const { item_id } = useParams();
  // console.log(item_id);

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /**
   * HSH | 2022.03.22 | v1.0
   * @name ItemDetailGridStyle
   * @des 이미지, author, title, description이 들어가는 영역
   */
  const ItemDetailGridStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems:"center",
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
    margin: 3,
    width: "350px",
    height: "350px",

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

  const TextFiledList = [
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
              sx={{ maxWidth: "350px", maxHeight: "350px" }}
              src={logo}
            />
          </Grid>
          <Grid sx={DetailGridStyle}>
              {TextFiledList.map((item,index)=>(
                 <Box key={index} mb={3}>
                 <Typography variant="h5">{item.name}</Typography>
                 <Paper
                   sx={{
                     display: "flex",
                     justifyContent: "center",
           
                     p: "2px 4px",
                     width: 500,
                     border: "2px solid #cbcbcb",
                     backgroundColor:"#dfdfdf",
                   }}
                 >
                   <InputBase
                     value={item.value}
                     multiline={(item.rows===1)?false:true}
                     rows={item.rows}
                     sx={{ width: "95%" }}
                     disabled
                   />
                 </Paper>
               </Box> 
              ))}
          </Grid>
        </Grid>
        <Grid sx={ItemSaleGridStyle}></Grid>
      </Grid>
    </Page>
  );
}

export default RegisterSale;
