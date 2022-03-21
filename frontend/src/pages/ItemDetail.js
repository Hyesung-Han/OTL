import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import Web3 from "web3";
import Page from "../components/Page";
import Description from "../components/items/Description"


const ItemDetail = () => {
  


  return (
    <Page
      title="OTL"
      maxWidth="100%"
      minHeight="60vh"
      alignItems="center"
      display="flex"
    >
      <Container>
        <Description></Description>
      </Container>
    </Page>
  );
};

export default ItemDetail;

