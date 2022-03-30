import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { convertToAccountingFormat } from '../../utils/NumberFormatter';


// 이미지 스타일
const ImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute'
});

const CardStyle = styled(Card)({
  borderRadius : 8,
  "&:hover":{
    boxShadow: '2px 5px 5px 2px rgba(225, 223, 214, 1)'
  }
});


ItemsCard.propTypes = {
  product: PropTypes.object,
};

// 구매하기 카드 형태
/**
 * CSW | 2022.03.16 | FIX
 * @name ItemsCard
 * @des ItemCard 컴포넌트
 */
export default function ItemsCard({ product }) {
  // 이미지, 제목, 가격, 토큰 ID, 심볼
  const { item_title, price, token_id, img_src } = product;
  const symbol = 'SSF';

  return (
    <CardStyle>
      <Link
          to={`/itemdetail/${token_id}`}
          color="inherit"
          underline='hover'
          component={RouterLink}
        >
        <Box sx={{ pt: '100%', position: 'relative'}}>
          <ImgStyle src={img_src} />
        </Box>
        <Stack spacing={2} sx={{ p: 3 }}>
            <Typography variant="subtitle1" noWrap>
              {item_title}
            </Typography>
          <Typography variant="subtitle1" textAlign="right" sx={{ fontSize: 15 }}>
            {convertToAccountingFormat(price)} {symbol}
          </Typography>
        </Stack>

      </Link>
    </CardStyle>
  );
}
