import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';


const CardStyle = styled(Card)({
  borderRadius : 8,
  "&:hover":{
    boxShadow: '2px 5px 5px 2px rgba(225, 223, 214, 1)'
  }
});


ItemsCard.propTypes = {
  product: PropTypes.object
};

/**
 * CSW | 2022.03.17 | ADD
 * @name ProfileCard
 * @des ProfileCard 컴포넌트
 */
export default function ProfileCard({ product }) {
  // 이미지, 제목, 가격, 토큰 ID, 심볼
  const { image, nickname } = product;
  const symbol = 'ETH';

  return (
    <CardStyle>
      <Link
          to={`/#/${tokenId}`}
          color="inherit"
          underline='hover'
          component={RouterLink}
        >
        <Box sx={{ pt: '100%', position: 'relative'}}>
          <Avatar alt={nickname} src={image} sx={{ width: 100, height: 100 }}/>
        </Box>
        <Stack spacing={2} sx={{ p: 3 }}>
            <Typography variant="subtitle1" textAlign="center" noWrap>
              {nickname}
            </Typography>
        </Stack>

      </Link>
    </CardStyle>
  );
}
