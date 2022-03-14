import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import ItemsCard from './ItemsCard';

ItemsCard.propTypes = {
  products: PropTypes.array
};

// 구매하기 카드 리스트 형태
/**
 * CSW | 2022.03.14 | ADD
 * @name ItemList
 * @des ItemList 컴포넌트
 */
export default function ItemsList({ products, ...other }) {
  return (
    /**
     * TODO
     * 한 줄에 카드가 7개 나오게 조정
     */
    <Grid container spacing={6} {...other}>
      {products.map((product) => (
        <Grid sx={{ mb: 3 }} key={product.hash} item xs={12} sm={6} md={3}>
          <ItemsCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
