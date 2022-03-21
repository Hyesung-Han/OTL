import { Box, Button, Container, Link, Stack, Typography, Grid, Card } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import CardContent from '@mui/material/CardContent';
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import Web3 from "web3";
import Page from "../components/Page";
import Description from "../components/items/Description"
import ItemHistory from "../components/items/ItemHistory"
import HorizonLine from "../components/HorizonLine";

const ImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  });

/**
 * CSW | 2022.03.21 | ADD
 * @name ItemDetail
 * @des ItemDetail P
 * TODO
 * 1. 이미지 Url, description, author, category, 컨트랙트 정보 받아오기
 * 2. 컨트랙트에서 price, 판매날짜 받아오기
 */
const ItemDetail = () => {
    const symbol ="ETH";

  return (
    <Page
      title="OTL"
      maxWidth="100%"
      minHeight="60vh"
      alignItems="center"
      display="flex"
    >
        <Grid container spacing={3}>
            <Grid item xs={2}>

            </Grid>
            <Grid item xs={3} style={{alignItems :"center", display :"flex", justifyContent:"center", paddingLeft:0, paddingBottom:24}}>
                <div style={{width: 300, height:300}}>
                    <ImgStyle src="" />
                </div>
            </Grid>
            <Grid item xs={7}>
                <Typography variant="h3"> Title </Typography>
                <Typography variant="subtitle2" color="text.secondary"> created by nickname </Typography>
                <Card sx={{ width:"70%", mt:3 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 15 }} color="text.secondary" >
                            sale ends XXXX 11, 2022 at xx:xx:xx am KST
                        </Typography>
                        <HorizonLine></HorizonLine>
                        <Typography sx={{ fontSize: 15 }} color="text.secondary" >
                            Current Price
                        </Typography>
                        <div style={{display :"flex", justifyContent:"right"}}>
                            <Typography sx={{ fontSize: 20, textAlign:"center" }} color="text" >
                                XX.XX
                            </Typography>
                            <Typography sx={{ fontSize: 20, textAlign:"right" }} color="text" >
                                {symbol}
                            </Typography>
                        </div>
                    </CardContent>
                    <div style={{display :"flex", justifyContent:"center"}}>
                        <Button color="secondary" variant="contained" size="big" style={{width:"100%"}}>Buy now</Button>
                        <Button color="secondary" variant="contained" size="big" style={{width:"100%"}}>Make offer</Button>
                    </div>


                </Card>
            </Grid>
            <Grid item xs={2}>

            </Grid>
            <Grid item xs={3} style={{alignItems :"center", display :"flex", justifyContent:"center", paddingLeft:0, paddingBottom:24}}>
                 <Description></Description>
            </Grid>
            <Grid item xs={7}>
                <ItemHistory></ItemHistory>
            </Grid>
        </Grid>

    </Page>
  );
};

export default ItemDetail;

