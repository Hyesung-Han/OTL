import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState, useContext } from "react";
import { MotionContainer, varBounceIn } from "../components/animate";
import Axios from "axios";
import Web3 from "web3";
import Page from "../components/Page";
import ItemsList from "../components/items/ItemsList";
import ProfileList from "../components/profile/ProfileList";
import HorizonLine from "../components/HorizonLine";
import { CommonContext } from "../context/CommonContext";
import { useParams } from "react-router-dom";
import COMMON_ABI from "../common/ABI";
import { Web3Limit } from "../common/web3Client";

/**
 * CSW | 2022.03.30 | UPDATE
 * @name SearchResult
 * @des SearchResult P
 * @api {get} /search/:search_value
 */

const SearchResult = () => {
  const { serverUrlBase } = useContext(CommonContext);
  const [item, setItem] = useState([]);
  const [isCollection, setIsCollection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState([]);
  const [saleId, setSaleId] = useState([]);
  const [itemarr, setItemarr] = useState([]);
  const { search_value } = useParams();

  const NFT_CA = process.env.REACT_APP_NFT_CA;
  const nftInstance = new Web3Limit.eth.Contract(
    COMMON_ABI.CONTRACT_ABI.NFT_ABI,
    NFT_CA
  );

  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL)
  );

  useEffect(() => {
    getProfile();
    getItem();
  }, []);

  useEffect(() => {
    getSaleId();
  }, [item]);

  useEffect(() => {
    getNFT();
  }, [saleId]);

  const getProfile = async () => {
    setLoading(true);

    try {
      const res = await Axios.get(serverUrlBase + `/user/list/`, {
        params: { user_nickname: search_value },
      });
      const data = res.data.data;
      setProfile(data);
      setLoading(false);
      setIsCollection(true);
    } catch (e) {
      console.log("getProfile error" + e);
    }
  };
  const getSaleId = () => {
    try {
      const testArray = [];
      item.map(async (row) => {
        const res = await Axios.get(serverUrlBase + `/sales/`, {
          params: { token_id: row.token_id },
        });
        const data = res.data.data;
        row.saleCA = data.sale_contract_address;
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
        const nftURL = await nftInstance.methods.tokenURI(row.token_id).call();
        
        if(row.saleCA) {
          const saleInstance = new Web3Limit.eth.Contract(
            COMMON_ABI.CONTRACT_ABI.SALE_ABI,
            row.saleCA
          );
          const saleInfo = await saleInstance.methods.getSaleInfo().call();
          row.img_src = nftURL;
          row.price = saleInfo[3];
          setItemarr((itemarr) => [...itemarr, row]);
        } else {
          getNFT();
        }
      });
      setLoading(false);
    } catch (e) {
      console.log("getNFT error" + e);
    }
  };
  const getItem = async () => {
    setLoading(true);

    try {
      const res = await Axios.get(serverUrlBase + `/items/list/`, {
        params: { item_title: search_value },
      });
      const data = res.data.data;

      setItem(data);
      setLoading(false);
      setIsCollection(true);
    } catch (e) {
      console.log("getItem error" + e);
    }
  };

  const productsprofile = [...Array(profile.length)].map((_, index) => {

    return {
      address: profile[index].user_address,
      image: profile[index].user_image_url,
      nickname: profile[index].user_nickname,
    };
  });

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
              <HorizonLine text="Artist" />
              <ProfileList sx={{ mt: 1 }} products={productsprofile} />

              <HorizonLine text="Items" />
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

export default SearchResult;
