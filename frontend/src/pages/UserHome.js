import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import Axios from "axios";

import { CommonContext } from "../context/CommonContext";
import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';

import UserProfile from "../components/userhome/UserProfile";
import UserRoom from "../components/userhome/UserRoom";
import UserItemList from "../components/userhome/UserItemList";
import HorizonLine from "../components/HorizonLine";
// web3
import COMMON_ABI from '../common/ABI';
import { Web3Client } from "../common/web3Client";

/**
 * LJA | 2022.03.30 | ADD
 * @name Home
 * @des Home 컴포넌트
 * User Home을 나타내기 위한 컴포넌트
 */
function UserHome() {
  const { serverUrlBase } = useContext(CommonContext);
  const {user_address} = useParams();
  const [user, setUser] = useState();
  const [userItems, setUserItems] = useState([]);
  const [items, setItems] = useState([]);

  // nft contract
  const NFT_CA = process.env.REACT_APP_NFT_CA; 
  const nftInstance = new Web3Client.eth.Contract(
    COMMON_ABI.CONTRACT_ABI.NFT_ABI, 
    NFT_CA
  );

  const getUser = async() => {
    try {
      const {data} = await Axios.get(serverUrlBase + `/user/profile?user_address=`+ user_address);
      const userinfo = data.data;
      setUser(user=>userinfo);
    } catch(e) {
      console.log("회원 정보 가져오기 에러",e);
    }
  }

  const getItems = async() => {
    try {
      const {data} = await Axios.get(serverUrlBase + `/items?user_address=`+user_address);
      const map = data.data;
      map.forEach(async (row) => {
        const nftURL = await nftInstance.methods.tokenURI(row.token_id).call();
        row.src = nftURL;
        setItems(items=> [...items, row]);
      });
    } catch(e) {
      console.log("나의 모든 아이템 가져오기 오류 : " + e)
    }
  }
  const getUserItems = async() => {
    try {
      const {data} = await Axios.get(serverUrlBase + `/home/`+user_address)
      data.data.forEach(async (row) => {
        const nftURL = await nftInstance.methods.tokenURI(row.token_id).call();
        row.src = nftURL;
        setUserItems(userItems => [...userItems, row]);
      });
    } catch(e) {
      console.log("나의 꾸미기 아이템 가져오기 오류 : " + e)
    }
  }
  
  useEffect(async() => {
    await getUser();
    await getItems();
    await getUserItems();
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
          <UserProfile user={user}/>
          </Box>
          {(user && !!userItems) && (
          <Box
            sx={{
              width: 700,
              height: 450,
            }}
          >
            <UserRoom myItems={userItems}/>
          </Box>)}
        </Box>
        {(user && !!items) && (
        <Box display="flex" flexDirection="row">
          <Box
            sx={{
              width: '100%',
              height: 300,
            }}
          >
            <HorizonLine text="items" />
            <UserItemList products={items} />
          </Box>
        </Box>)}
        
      </div>
    </div>
  );
}

export default UserHome;