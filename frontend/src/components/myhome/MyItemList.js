import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

/**
 * LJA | 2022.03.28 | ADD
 * @name MyItemList
 * @des MyItemList 컴포넌트
 */

export default function MyItemList({ products, ...other }) {
  return (
    <Grid>
      <h2>리스트</h2>
    </Grid>
    // <Grid container spacing={6} {...other}>
    //   {products.map((product) => (
    //     <Grid sx={{ mb: 6 }} key={product.nickname} item xs={12} sm={6} md={2.4}>
    //       <ProfileCard product={product} />
    //     </Grid>
    //   ))}
    // </Grid>
  );
}
