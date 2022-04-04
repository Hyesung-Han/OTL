import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import ProfileCard from "./ProfileCard";

ProfileList.propTypes = {
  products: PropTypes.array,
};

/**
 * CSW | 2022.03.17 | ADD
 * @name ProfileList
 * @des ProfileList 컴포넌트
 */

export default function ProfileList({ products, ...other }) {
  return (
    <Grid container spacing={6} {...other}>
      {products.map((product) => (
        <Grid sx={{ mb: 6 }} key={product.address} item xs={12} sm={6} md={2.4}>
          <ProfileCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
