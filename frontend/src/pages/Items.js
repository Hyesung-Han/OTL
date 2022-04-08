import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState, useContext } from "react";
import { MotionContainer, varBounceIn } from "../components/animate";
import Axios from "axios";
import Page from "../components/Page";
import ItemsList from "../components/items/ItemsList";
import Category from "../components/category/Category";
import { CommonContext } from "../context/CommonContext";
import COMMON_ABI from "../common/ABI";
import { Web3Limit } from "../common/web3Client";
import { useParams } from "react-router-dom";

const Items = () => {
  const { serverUrlBase } = useContext(CommonContext);
  const [item, setItem] = useState([]);
  const [isCollection, setIsCollection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [saleId, setSaleId] = useState([]);
  const [itemarr, setItemarr] = useState([]);
  const { category_code } = useParams();

  const NFT_CA = process.env.REACT_APP_NFT_CA;
  const nftInstance = new Web3Limit.eth.Contract(
    COMMON_ABI.CONTRACT_ABI.NFT_ABI,
    NFT_CA
  );

  useEffect(() => {
    getItem();
    getCategory();
  }, []);

  useEffect(() => {
    getSaleId();
  }, [item]);

  useEffect(() => {
    getNFT();
  }, [saleId]);

  const getItem = async () => {
    setLoading(true);

    try {
      const res = await Axios.get(serverUrlBase + `/items/list/`, {
        params: { category_code: category_code },
      });
      const data = res.data.data;

      setItem(data);
      setLoading(false);
      setIsCollection(true);
    } catch (e) {
      console.log("getItem error" + e);
    }
  };

  const getSaleId = () => {
    try {
      const testArray = [];
      item.map(async (row) => {
        const res = await Axios.get(serverUrlBase + `/sales/`, {
          params: { token_id: row.token_id },
        });
        const data = await res.data.data;
        row.saleCA = await data.sale_contract_address;
        testArray.push(data.sale_contract_address);
      });
      setSaleId(testArray);
    } catch (e) {
      console.log("getSaleId error" + e);
    }
  };
  const getNFT = () => {
    setLoading(true);
    try {
      item.map(async (row) => {
        const nftURL = await nftInstance.methods.tokenURI(row.token_id).call()
        .then( async (data) => {
          if(row.saleCA) {
            const saleInstance = new Web3Limit.eth.Contract(
              COMMON_ABI.CONTRACT_ABI.SALE_ABI,
              row.saleCA
            );

            if(saleInstance) {
              await saleInstance.methods.getSaleInfo().call()
              .then((data) =>{
                // row.price = saleInfo[3];
                row.price = data[3];
              });
              row.img_src = data;
              // row.img_src = nftURL;
              setItemarr((itemarr) => [...itemarr, row]);
            }
          } else {
            getNFT();
          }
        });
      });

      setLoading(false);
    } catch (e) {
      console.log("getNFT error" + e);
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
      console.log("getCategory error" + e);
    }
  };

  return (
    <Page
      title="SSAFY NFT"
      maxWidth="100%"
      minHeight="100%"
      alignItems="center"
      display="flex"
    >
      {loading === false ? (
        <>
          {isCollection === true ? (
            <Container maxWidth="xl" sx={{ my: 3 }}>
              <Box sx={{ width: "80%", margin: "auto", textAlign: "center" }}>
                <Category sx={{ mt: 1 }} products={category} />
              </Box>
              <ItemsList sx={{ mt: 1 }} products={item} />
            </Container>
          ) : (
            <Container>
              <MotionContainer initial="initial" sx={{ mt: 10 }} open>
                <Box
                  sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}
                >
                  <motion.div variants={varBounceIn}>
                    <Typography variant="h3" paragraph>
                      검색 결과 없음
                    </Typography>
                  </motion.div>
                  <Typography sx={{ color: "text.secondary" }}>
                    판매되고 있는 아이템이 없습니다.
                  </Typography>

                  <motion.div variants={varBounceIn}>
                    <Box
                      component="img"
                      src="/static/illustrations/illustration_register.png"
                      sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
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
            <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
              <motion.div variants={varBounceIn}>
                <Typography variant="h3" paragraph>
                  아이템 로딩중...
                </Typography>
              </motion.div>
              <Typography sx={{ color: "text.secondary" }}>
                판매되고 있는 아이템을 검색하고 있습니다.
              </Typography>

              <motion.div variants={varBounceIn}>
                <Box
                  component="img"
                  src="/static/illustrations/illustration_register.png"
                  sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
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
