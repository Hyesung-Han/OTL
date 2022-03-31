import { Box, Button, Container, Link, Stack, Typography, Grid, Card } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import CardContent from '@mui/material/CardContent';
import { styled } from "@mui/material/styles";
import React, { useEffect, useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Web3 from "web3";
import Page from "../components/Page";
import Description from "../components/items/Description"
import ItemHistory from "../components/items/ItemHistory"
import HorizonLine from "../components/HorizonLine";
import {CommonContext} from "../context/CommonContext"
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import COMMON_ABI from '../common/ABI';
import { Web3Client } from "../common/web3Client";


const ImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  });

/**
 * CSW | 2022.03.28 | UPDATE
 * @name ItemDetail
 * @des ItemDetail P
 * @api {get} /items/:token_id
 * TODO
 * 1. web3 컨트랙트에서 price, 판매날짜, 주소, 이미지url 받아오기
 */

const ItemDetail = () => {
    const symbol ="SSF";
    const { serverUrlBase } = useContext(CommonContext);
    const {token_id} = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [nickname, setNickname] = useState('');
    const [onsale, setOnsale ] = useState(0); 
    const [owner, setOwner] = useState('');
    const [saleId, setSaleId] = useState('');
    const [saleCA, setSaleCA] = useState('');
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState('');
    const [imgUrl, setImgUrl]= useState('');
    const [date, setDate] = useState('');
    const [history, setHistory] = useState([]);
    const [historyarr, setHistoryArr] = useState([]);
      // nft contract
    const NFT_CA = process.env.REACT_APP_NFT_CA;
      const nftInstance = new Web3Client.eth.Contract(
        COMMON_ABI.CONTRACT_ABI.NFT_ABI, 
        NFT_CA
    );
    // ssafyToken contract
    const ERC20_CA = process.env.REACT_APP_ERC20_CA;
    const tokenInstance = new Web3Client.eth.Contract(
    COMMON_ABI.CONTRACT_ABI.ERC_ABI, 
    ERC20_CA
    );

    const user = useSelector((state)=> state.User.user);
    const navigate = useNavigate();

    const onClickBuyNow = async () => {
        try {
            const saleInstance = new Web3Client.eth.Contract(
                COMMON_ABI.CONTRACT_ABI.SALE_ABI,
                saleCA
              );
            await tokenInstance.methods.approve(saleCA, price).send({from:user.user_address});
            await saleInstance.methods.purchase().send({from:user.user_address});
            const now = new Date();
            const res = await Axios.patch(serverUrlBase+`/sales/`+token_id+`/complete/`,{
                buyer_address : user.user_address,
                completed_at : now
            });

            
            navigate("/itemdetail/"+ token_id);
            
        } catch (e) {
            console.log('buy now error' +  e);
        }
    };


    const getItemDetail= async()=>{
        try {
            const res = await Axios.get(serverUrlBase + `/items/`+ token_id);
            const data = res.data.data;
            setTitle(data.item_title);
            setDescription(data.item_description);
            setAuthor(data.author_name);
            setCategory(data.category_code);
            setNickname(data.author_name);
            setOnsale(data.on_sale_yn);
            setOwner(data.owner_address);
            
            
        } catch (e) {
            console.log('getItemDetail error' +  e);
        }
    }
    
    
    const getDate = async()=>{
        try {
            
            const row = await Axios.get(serverUrlBase + `/sales/`,{
                params:{token_id: token_id}
            });
            const timedata = row.data.data.completed_at;
            const realEndDate = timedata.split("T");
            const rrealEndDate = realEndDate[0] + " " + realEndDate[1].split(".")[0];
            const saleInstance = new Web3Client.eth.Contract(
                COMMON_ABI.CONTRACT_ABI.SALE_ABI,
                saleCA
              );     
            const saleInfo = await saleInstance.methods.getSaleInfo().call();
            setPrice(saleInfo[3]);
            setDate(rrealEndDate);

        } catch (e) {
            console.log('getDate error' +  e);
        }
    }

    const getSaleId = async()=>{
        try {
            const res = await Axios.get(serverUrlBase + `/sales/`,{
                params:{token_id:token_id}
            });
            const data = res.data.data;
            setSaleId(data.sale_id);
            setSaleCA(data.sale_contract_address);

            
        } catch (e) {
            console.log('getSaleId error' +  e);
        }
    }

    const getSaleHistory = async()=>{
        try {
   
            const reshistory = await Axios.get(serverUrlBase + `/sales/history/`,{
                params:{token_id:token_id}
            });
            const datahistory = reshistory.data.data;
            setHistory(datahistory);

            
        } catch (e) {
            console.log('getSaleHistory error' +  e);
        }
    }
    
    const getPrice =()=>{
        try {
            history.map(async(row)=>{
                
                const saleInstance = new Web3Client.eth.Contract(
                    COMMON_ABI.CONTRACT_ABI.SALE_ABI,
                    row.sale_contract_address
                  );  
                const saleInfo = await saleInstance.methods.getSaleInfo().call();
                row.price = saleInfo[3];
                setHistoryArr(historyarr=>[...historyarr,row]);
            });
        } catch (e) {
            console.log('getPrice error' +  e);
        }
    }

    const onClickSaleRegi = () => {
        navigate("/registerSale/"+ token_id);
      };

    const onClickSaleCancel = async() => {
        try {
            const saleInstance = new Web3Client.eth.Contract(
                COMMON_ABI.CONTRACT_ABI.SALE_ABI,
                saleCA
              );   
            await saleInstance.methods.cancelSales().send({from: user.user_address});
            await nftInstance.methods.setApprovalForAll(saleCA, false).send({ from: user.user_address });
            Axios.delete(serverUrlBase+ `/sales/`+saleId)
            navigate("/itemdetail/"+ token_id);
            
        } catch (e) {
            console.log('ItemSaleCancel error' +  e);
        }
    };
    const getNFT = async() => {

        setLoading(true);
        
        try {
            const nftURL = await nftInstance.methods.tokenURI(token_id).call();
           

            setImgUrl(nftURL); 
          setLoading(false);

      } catch (e) {
          console.log('getNFT error' +  e);
      }
    
      };
      
    useEffect(()=>{
        getItemDetail();
        getSaleHistory();
    }, []);

    useEffect(()=>{
        getNFT();
        if(onsale===1){

            getSaleId();

        }
        
    },[onsale]);

    useEffect(()=>{
        if(onsale===1){
            getDate();
        }

    },[saleCA]);

    useEffect(()=>{
        getPrice();
    },[history])


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
                    <ImgStyle src={imgUrl} />
                </div>
            </Grid>
            <Grid item xs={7}>
                <Typography variant="h3"> {title} </Typography>
                <div style={{display:"flex"}}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{mr:1}}> created by </Typography>

                    <Typography variant="subtitle2" color="text.secondary" to={`/home/${owner}` } component={RouterLink}> {nickname} </Typography>

                </div>

                <Card sx={{ width:"70%", mt:3 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 15 }} color="text.secondary" >
                            sale ends
                        </Typography>
                        <Typography sx={{ fontSize: 15, textAlign:"right" }} color="text.secondary" variant="h4">
                            {date}
                        </Typography>
                        <HorizonLine></HorizonLine>
                        <Typography sx={{ fontSize: 15 }} color="text.secondary" >
                            Current Price
                        </Typography>
                        <div style={{display :"flex", justifyContent:"right"}}>
                            <Typography sx={{ fontSize: 20, textAlign:"center", mx:3 }} color="text" >
                                {price}
                            </Typography>
                            <Typography sx={{ fontSize: 20, textAlign:"right" }} color="text" >
                                {symbol}
                            </Typography>
                        </div>
                    </CardContent>
                    <div style={{display :"flex", justifyContent:"center"}}>
                        {user.user_address=== owner ? ( !onsale ? (
                            <Button color="secondary" variant="contained" size="big" style={{width:"100%"}} onClick={onClickSaleRegi} >판매등록</Button>
                        ):
                        (
                            <Button color="secondary" variant="contained" size="big" style={{width:"100%"}} onClick={onClickSaleCancel}>판매취소</Button>
                            )): <div></div>}
                        {user.user_address !== owner ? ( !onsale ? (
                            <Button disabled color="secondary" variant="contained" size="big" style={{width:"100%"} } > 판매중이 아닙니다. </Button>
                        ):
                        (
                            <Button color="secondary" variant="contained" size="big" style={{width:"100%"}} onClick={onClickBuyNow} > Buy now </Button>
                            )): <div></div>}    
                    </div>


                </Card>
            </Grid>
            <Grid item xs={2}>

            </Grid>
            <Grid item xs={3} style={{alignItems :"center", display :"flex", justifyContent:"center", paddingLeft:0, paddingBottom:24}}>
                 <Description description={description} author={author} category = {category} saleCA={saleCA}></Description>
            </Grid>
            <Grid item xs={7}>
                <ItemHistory products={history}></ItemHistory>
            </Grid>
            <Grid item xs={8} >
            </Grid>
        </Grid>


    </Page>
  );
};

export default ItemDetail;

