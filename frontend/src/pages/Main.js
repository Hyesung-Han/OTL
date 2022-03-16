import { Grid, Box, Button, Card, Container, Link, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import COMMON_ABI from '../common/ABI';
import COMMON_HEADER from '../common/HeaderType';
import COMMON_CONTRACT from '../common/SaleInfoGetter';
import { onResponse } from '../common/ErrorMessage';

const Main = () => {
  // Web3
  // const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));

  /**
   * HSH | 2022.03.16 | v1.0
   * @name RootStyle
   * @des Main root
   */
  const RootStyle = styled(Grid)(({ theme }) => ({
    // backgroundColor: alpha(theme.palette.background.default, 0.72),

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }));

   /**
   * HSH | 2022.03.16 | v1.0
   * @name MainTopStyle
   * @des Main top grid
   */
   const MainTopStyle = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",

    height:"400px",
  }));

  /**
   * HSH | 2022.03.16 | v1.0
   * @name MainStyle
   * @des Main category grid
   */
   const CategoryStyle = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
  }));

  /**
   * HSH | 2022.03.16 | v1.0
   * @name MainStyle
   * @des Main Footer grid
   */
   const MainFooterStyle = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "row",

    backgroundColor: "#444444",
    height: "400px",
  }));

  useEffect(() => {
  }, []);

  return (
    <RootStyle>
      <MainTopStyle>
        <Typography>
          One can Take Limited
        </Typography>
      </MainTopStyle>
      <CategoryStyle>
        <h1>카테고리 카드</h1>
      </CategoryStyle>
      <MainFooterStyle>
        <h1>footer</h1>
      </MainFooterStyle>
    </RootStyle>
  );
};

export default Main;
