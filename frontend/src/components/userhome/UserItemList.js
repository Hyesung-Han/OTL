import { useState, useEffect, useRef, useContext } from "react";
import Axios from "axios";
import { CommonContext } from "../../context/CommonContext";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import ItemsCard from "./ItemsCard";

/**
 * LJA | 2022.03.30 | ADD
 * @name UserItemList
 * @des UserItemList 컴포넌트
 */

const UserItemList = ({ products }) => {
  return (
    <Grid container spacing={6}>
      {products.map((product) => (
        <Grid sx={{ mb: 6 }} key={product.item_id} item xs={12} sm={6} md={2.4}>
          <ItemsCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default UserItemList;
