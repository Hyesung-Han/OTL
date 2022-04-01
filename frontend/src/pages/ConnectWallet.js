import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useEffect, useState, useContext } from "react";
import { CommonContext } from "../context/CommonContext";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Axios from "axios";

import Page from "../components/Page";

import Web3 from "web3";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Backdrop from "@mui/material/Backdrop";

import Swal from "sweetalert2";

// Redux
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/UserReducer";

// web3-react [220317]
import { useWeb3React } from "@web3-react/core";
import { injected } from "../lib/Connectors";
// End

/**
 * LDJ | 2022.03.22 | v1.0
 * @name ConnectWallet
 * @api -
 * @des web3를 통해 Metamask 연동, 연동 완료 및 재연동 시에 메인페이지로
 * @des login API 연결 및 Redux에 user 정보 저장
 * @des 로그인 거절 했을 때, 오류 뜨고 렉... (해결 안되니 다음 version에 하겠음)
 */

const ConnectWallet = () => {
  const { chainId, account, active, activate, deactivate } = useWeb3React();

  const navigate = useNavigate();
  const { serverUrlBase } = useContext(CommonContext);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  // Web3
  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL)
  );

  const handleConnect = async () => {
    setOpen(true);
    activate(injected, (error) => {
      if ("/No Ethereum provider was found on window.ethereum/".test(error)) {
        window.open("https://metamask.io/download.html");
      }
    })
      .then(async () => {
        await setOpen(false);

        await Swal.fire({
          title: "Welcome!",
          text: "nice to see you again ^^",
          imageUrl: "https://unsplash.it/400/200",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
        });

        await navigate("/main");
      })
      .catch(async function (error) {
        await setOpen(false);
        console.log("로그인 취소/오류 : " + error);

        await Swal.fire({
          icon: "error",
          title: "로그인 취소",
        });
      });
  };

  useEffect(() => {
    if (active) {
      navigate("/main");
    }
    if (account) {
      Axios.post(serverUrlBase + `/user/login`, {
        user_address: account,
      })
        .then((data) => {
          const connect_user = data.data.data;
          dispatch(setUser(connect_user));

          console.log(connect_user);
        })
        .catch(function (error) {
          console.log("로그인 오류 발생 : " + error);
        });
    }
  }, [account, active]);

  return (
    <Page
      title="OTL"
      maxWidth="100%"
      minHeight="60vh"
      alignItems="center"
      display="flex"
    >
      <Container>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Typography variant="h2" sx={{ pb: 4 }}>
            Connect your wallet!
          </Typography>
          <Box>
            <Tooltip
              arrow
              placement="right"
              title={
                <h2>
                  A crypto wallet is an application or hardware device that
                  allows individuals to store and retrieve digital items.
                </h2>
              }
            >
              <Typography variant="h4" sx={{ pb: 4 }}>
                Connect with MetaMask or create a new one
              </Typography>
            </Tooltip>
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{
                fontSize: 18,
                display: "flex",
                justifyContent: "space-between",
              }}
              onClick={handleConnect}
            >
              <Typography>
                <img
                  height="25px"
                  src="https://opensea.io/static/images/logos/metamask-alternative.png"
                ></img>
              </Typography>
              <Typography variant="h6">MetaMask</Typography>
              <Typography>Only</Typography>
            </Button>
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={open}
            >
              <Alert severity="info">
                <AlertTitle>1 / 1</AlertTitle>
                Connecting to MetaMask... — <strong>Please wait!</strong>
              </Alert>
            </Backdrop>
          </Box>
        </Stack>
      </Container>
    </Page>
  );
};

export default ConnectWallet;

// End ConnectWallet
