import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import Web3 from "web3";
import Page from "../components/Page";

/**
 * LDJ | 2022.03.14 | v1.0
 * @name ConnectWallet
 * @api {web3? 연동?}
 * @des MetaMask 지갑 주소를 기반으로 연동[로그인] (연동 기능 구현은 아직...)
 */

const ConnectWallet = () => {
  // Web3
  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL)
  );

  return (
    <Page
      title="OTL"
      maxWidth="100%"
      minHeight="100%"
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
