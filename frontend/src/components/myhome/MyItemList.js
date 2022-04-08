import { Grid } from "@mui/material";
import ItemsCard from "./ItemsCard";

/**
 * LJA | 2022.03.28 | ADD
 * @name MyItemList
 * @des MyItemList 컴포넌트
 */

const MyItemList = ({ products, removeItem, addItem }) => {
  return (
    <Grid container spacing={6}>
      {products.map((product) => (
        <Grid sx={{ mb: 6 }} key={product.item_id} item xs={12} sm={6} md={2.4}>
          <ItemsCard
            product={product}
            removeItem={removeItem}
            addItem={addItem}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MyItemList;
