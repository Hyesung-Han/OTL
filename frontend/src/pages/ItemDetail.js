import { Box, Button, Container, Link, Stack, Typography, Grid, Card } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import CardContent from '@mui/material/CardContent';
import { styled } from "@mui/material/styles";
import React, { useEffect, useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import Axios from "axios";
import Web3 from "web3";
import Page from "../components/Page";
import Description from "../components/items/Description"
import ItemHistory from "../components/items/ItemHistory"
import HorizonLine from "../components/HorizonLine";
import {CommonContext} from "../context/CommonContext"
import { useParams } from 'react-router-dom';


const ImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  });

/**
 * CSW | 2022.03.22 | UPDATE
 * @name ItemDetail
 * @des ItemDetail P
 * @api {get} /items/:token_id
 * TODO
 * 2. web3 컨트랙트에서 price, 판매날짜, 주소, 이미지url 받아오기
 */
const ItemDetail = () => {
    const symbol ="ETH";
    const { serverUrlBase } = useContext(CommonContext);
    const {token_id} = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [nickname, setNickname] = useState('');


    const getItemDetail= async()=>{
        try {
            const res = await Axios.get(serverUrlBase + `/items/`+ token_id);
            const data = res.data.data;
            
            setTitle(data.item_title);
            setDescription(data.item_description);
            setAuthor(data.author_name);
            setCategory(data.category_code);
            setNickname(data.author_name);

            console.log(data);
            
        } catch (e) {
            console.log('getItemDetail error' +  e);
        }
    }

    useEffect(()=>{
        getItemDetail();
    }, []);


  return (
    <Page
      title="OTL"
      maxWidth="100%"
      minHeight="60vh"
      alignItems="center"
      display="flex"
    >
        <Grid sx={{my:3}} container spacing={3}>
            <Grid item xs={2}>

            </Grid>
            <Grid item xs={3} style={{alignItems :"center", display :"flex", justifyContent:"center", paddingLeft:0, paddingBottom:24}}>
                <div style={{width: 350, height:350}}>
                    <ImgStyle src="" />
                </div>
            </Grid>
            <Grid item xs={7}>
                <Typography variant="h3"> {title} </Typography>
                <Typography variant="subtitle2" color="text.secondary"> created by {nickname} </Typography>
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
                 <Description description={description} author={author} category = {category}></Description>
            </Grid>
            <Grid item xs={7}>
                <ItemHistory></ItemHistory>
            </Grid>
        </Grid>

    </Page>
  );
};

export default ItemDetail;
