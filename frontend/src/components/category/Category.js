import React, { Component } from "react";
import PropTypes from "prop-types";
import { Box, Container, Typography, Grid, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

const BoxStyle = styled(Box)({
  borderRadius: 8,
  width: 120,
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  border: "0.5px solid rgba(232, 234, 235, 0.93)",
  "&:hover": {
    boxShadow: "2px 5px 5px 2px rgba(225, 223, 214, 1)",
    border: "0.5px solid black",
  },
});

/**
 * CSW | 2022.03.30 | UPDATE
 * @name Category
 * @des Category 컴포넌트
 */

Category.propTypes = {
  products: PropTypes.array,
};

export default function Category({ products }) {
  return (
    <Grid
      container
      spacing={6}
      sx={{ my: "auto", display: "flex", justifyContent: "space-around" }}
    >
      {products.map((product) => (
        <Link
          to={`/items/${product.category_code}`}
          color="inherit"
          underline="hover"
          component={RouterLink}
          key={product.category_code}
        >
          <BoxStyle sx={{ display: "flex", margin: "auto" }}>
            <Typography variant="subtitle1" noWrap>
              {product.category_name}
            </Typography>
          </BoxStyle>
        </Link>
      ))}
    </Grid>
  );
}
