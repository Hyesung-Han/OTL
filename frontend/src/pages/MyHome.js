import {
  Box,
  Typography,
  Divider,
} from "@mui/material";
import Axios from "axios";

import { CommonContext } from "../context/CommonContext";
import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";

import MyItemList from "../components/myhome/MyItemList";
import MyProfile from "../components/myhome/MyProfile";
import MyRoom from "../components/myhome/MyRoom";
import HorizonLine from "../components/HorizonLine";
// web3
import COMMON_ABI from '../common/ABI';
import { Web3Client } from "../common/web3Client";

/**
 * LJA | 2022.03.28 | ADD
 * @name MyHome
 * @des MyHome 컴포넌트
 * MyHome 페이지의 최상위 컴포넌트로 프로필, 마이룸, 마이 아이템 컴포넌트가 포함되어있음
 * 마이룸, 마이 아이템에 사용되는 데이터를 호출
 */
function MyHome() {

  const { serverUrlBase } = useContext(CommonContext);
  const user = useSelector((state) => state.User.user);
  const [items, setItems] = useState([]);
  const [myItems, setMyItems] = useState([]);

  // nft contract
  const NFT_CA = process.env.REACT_APP_NFT_CA; 
  const nftInstance = new Web3Client.eth.Contract(
    COMMON_ABI.CONTRACT_ABI.NFT_ABI, 
    NFT_CA
  );

  const getItems = async() => {
    try {
      setItems([]);
      const {data} = await Axios.get(serverUrlBase + `/items?user_address=`+user.user_address)      
      data.data.forEach(async (row) => {
        const nftURL = await nftInstance.methods.tokenURI(row.token_id).call();
        row.src = nftURL;
        setItems(items => [...items, row]);
      });
    } catch(e) {
      console.log("나의 모든 아이템 가져오기 오류 : " + e)
    }
  }

  const getMyItems = async() => {
    try {
      setMyItems([]);
      const {data} = await Axios.get(serverUrlBase + `/home/`+user.user_address)
      await data.data.forEach(async (row) => {
        const nftURL = await nftInstance.methods.tokenURI(row.token_id).call();
        row.src = nftURL;
        setMyItems(myItems => [...myItems, row]);
      });
    } catch(e) {
      console.log("나의 사용중인 아이템 가져오기 오류 : " + e)
    }
  }

  const removeItem = async(token_id) => {
      try {
        const {data} = await Axios.patch(serverUrlBase + `/home/`+token_id, {
            on_use_yn: 0,
            x_index:0,
            y_index:0,
            z_index:0,
        })
        getItems();
        getMyItems();
      } catch(e) {
        console.log("아이템 제거하기 에러: " + e)
      }
    }
    
  const addItem = async(token_id) => {
    try {
      const {data} = await Axios.patch(serverUrlBase + `/home/`+token_id, {
          on_use_yn: 1,
          x_index:0,
          y_index:0,
          z_index:0,
      })
      getItems();
      getMyItems();
    } catch(e) {
      console.log("아이템 추가하기 에러: " + e)
    }
  }

  useEffect(()=>{
    getItems();
    getMyItems();
  }, []);

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

  if(!items) return <>로딩</>;
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
            }}
          >
          <MyProfile/>
          </Box>
          <Box
            sx={{
              width: 700,
              height: 450,
            }}
          >
          <MyRoom sx={{ mt: 1 }} myItems={myItems}/>
          </Box>
        </Box>
        <Box display="flex" flexDirection="row">
          <Box
            sx={{
              width: '100%',
              height: 300,
            }}
          >
            <HorizonLine text="my items" />
            <MyItemList sx={{ mt: 1 }}
              products={items}
              removeItem={removeItem}
              addItem={addItem} />
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default MyHome;