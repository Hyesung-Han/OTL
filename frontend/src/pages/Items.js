import { Box, Container, tableRowClasses, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useState, useContext } from "react";
import { MotionContainer, varBounceIn } from '../components/animate';
import Axios from 'axios';
import Web3 from 'web3';
import COMMON_HEADER from '../common/HeaderType';
import getSaleByTokenId from '../common/SaleInfoGetter';
import { onResponse } from '../common/ErrorMessage';
import Page from '../components/Page';
import ItemsList from '../components/items/ItemsList';
import Category from '../components/category/Category';
import {CommonContext} from "../context/CommonContext"
import COMMON_ABI from '../common/ABI';
import { Web3Client } from "../common/web3Client";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
/**
 * [구매하기] 화면
 */
const Items = () => {
  // [변수] 아이템, 컬렉션 유무, 로딩
  const { serverUrlBase } = useContext(CommonContext);
  const [item, setItem] = useState([]);
  const [isCollection, setIsCollection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const {category_code} = useParams();
  const [saleId,setSaleId] = useState([]);

  // nft contract
  const NFT_CA = process.env.REACT_APP_NFT_CA;
  const nftInstance = new Web3Client.eth.Contract(
    COMMON_ABI.CONTRACT_ABI.NFT_ABI, 
    NFT_CA
  );


  /**
   * [초기 데이터 설정]
   * 화면 첫 렌더링시 판매중인 작품을 조회하는 함수를 호출합니다.
   */
  useEffect(() => {
    getItem();
    getCategory();
  }, []);

  useEffect(()=>{
    getSaleId();
  },[item]);

  useEffect(()=>{
    getNFT();
  },[saleId]);


  /**
   * PJT Ⅲ - 과제 4: 조회
   * Req.4-F1 구매하기 화면 조회
   * 
   * 1. 구매하기 클릭 시 판매 작품을 조회 API를 호출합니다.  
   * 2. 응답으로부터 받은 token id로 Sale 정보를 요청합니다.
   * 3. sale 컨트랙트 주소로 즉시 구매가를 컨트랙트로부터 직접 조회합니다.
   * 3. token id로 NFT 컨트랙트로부터 직접 tokenURI를 조회하여 화면에 표시합니다. 
   */
   const getItem = async () => {

    setLoading(true);
    
    try {
      const res = await Axios.get(serverUrlBase + `/items/list/`,{
        params:{category_code: category_code}
      });
      const data = res.data.data;

  
      setItem(data);
      setLoading(false);
      setIsCollection(true);
      
  } catch (e) {
      console.log('getItem error' +  e);
  }

  };

  const getSaleId = ()=>{
    try {
      const testArray=[];
      item.map( async(row)=>{
        const res = await Axios.get(serverUrlBase + `/sales/`,{
            params:{token_id: row.token_id}
        });
        const data = res.data.data;
        row.saleCA = data.sale_contract_address;
        testArray.push(data.sale_contract_address);
      });
      setSaleId(testArray);
        
    } catch (e) {
        console.log('getSaleId error' +  e);
    }
}
  const getNFT = () => {

    setLoading(true);
    
    try {
      item.map( async(row)=>{
        const nftURL = await nftInstance.methods.tokenURI(row.token_id).call();
        const saleInstance = new Web3Client.eth.Contract(
          COMMON_ABI.CONTRACT_ABI.SALE_ABI,
          row.saleCA
        );      
        const saleInfo = await saleInstance.methods.getSaleInfo().call();
        row.img_src = nftURL;
        row.price = saleInfo[3];

      });

      
      console.log("0", item);
      setLoading(false);

  } catch (e) {
      console.log('getNFT error' +  e);
  }

  };

  const getCategory = async () => {

    setLoading(true);
    
    try {
      const res = await Axios.get(serverUrlBase + `/items/category/`);
      const data = res.data.data;
      
      setCategory(data);
      setLoading(false);
      setIsCollection(true);
      
  } catch (e) {
      console.log('getCategory error' +  e);
  }

  };



  return (
    <Page title="SSAFY NFT" maxWidth="100%" minHeight="100%" alignItems="center" display="flex">
      {loading === false ? (
        <>
          {isCollection === true ? (
            
            <Container maxWidth="xl" sx={{my:3}}>
              <Box sx={{ width: "80%", margin: 'auto', textAlign: 'center' }}>
                <Category sx={{ mt: 1 }} products={category} />
              </Box>
              <ItemsList sx={{ mt: 1 }} products={item}/>
            </Container>
          ) : (
            <Container>
              <MotionContainer initial="initial" sx={{ mt: 10 }} open>
                <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
                  <motion.div variants={varBounceIn}>
                    <Typography variant="h3" paragraph>
                      검색 결과 없음
                    </Typography>
                  </motion.div>
                  <Typography sx={{ color: 'text.secondary' }}>
                    판매되고 있는 아이템이 없습니다.
                  </Typography>

                  <motion.div variants={varBounceIn}>
                    <Box
                      component="img"
                      src="/static/illustrations/illustration_register.png"
                      sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
                    />
                  </motion.div>
                </Box>
              </MotionContainer>
            </Container>
          )}
        </>
      ) : (
        <Container>
          <MotionContainer initial="initial" sx={{ mt: 10 }} open>
            <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
              <motion.div variants={varBounceIn}>
                <Typography variant="h3" paragraph>
                  아이템 로딩중...
                </Typography>
              </motion.div>
              <Typography sx={{ color: 'text.secondary' }}>
                판매되고 있는 아이템을 검색하고 있습니다.
              </Typography>

              <motion.div variants={varBounceIn}>
                <Box
                  component="img"
                  src="/static/illustrations/illustration_register.png"
                  sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
                />
              </motion.div>
            </Box>
          </MotionContainer>
        </Container>
      )}
    </Page>
  );
};

export default Items;
