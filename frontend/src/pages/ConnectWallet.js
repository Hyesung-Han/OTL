import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import Web3 from "web3";
import Page from "../components/Page";

// web3-react [220317]
import { useWeb3React } from "@web3-react/core";
import { injected } from "../lib/Connectors";
// End

/**
 * LDJ | 2022.03.14 | v1.0
 * @name ConnectWallet
 * @api {}
 * @des web3를 통해 로그인 버튼을 누르면 Metamask 연동/비연동 (아직 완벽 X, 추후 개발하며 더 상세하게 작성)
 */

const ConnectWallet = () => {
  // Web3
  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL)
  );

  const { chainId, account, active, activate, deactivate } = useWeb3React();

  const handleConnect = () => {
    if (active) {
      deactivate();
      console.log(active);
      return;
    }
    activate(injected, (error) => {
      if ("/No Ethereum provider was found on window.ethereum/".test(err)) {
        window.open("https://metamask.io/download.html");
      }
    });
    console.log(active);
  };

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
              title="A crypto wallet is an application or hardware device that allows individuals to store and retrieve digital items."
            >
              {/* TODO 하단의 MetaMask 글자만 색상 변경하고픔 */}
              <Typography variant="h4" sx={{ pb: 4 }}>
                Connect with MetaMask or create a new one
              </Typography>
            </Tooltip>
            <Button
              fullWidth
              to=""
              variant="contained"
              size="large"
              sx={{
                fontSize: 18,
                display: "flex",
                justifyContent: "space-between",
              }}
              component={RouterLink}
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
          </Box>
        </Stack>
      </Container>
    </Page>
  );
};

export default ConnectWallet;

// End ConnectWallet
