import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, Link, Typography, Stack, Chip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';

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
  product: PropTypes.object
};

export default function ItemsCard({ product, removeItem, addItem }) {
  const { token_id, item_title, on_use_yn, src } = product;

  const handleClick = (token_id) => {
    addItem(token_id);
  };
  const deleteClick = (token_id) => {
    removeItem(token_id);
  };
  
  return (
    <CardStyle>
      {on_use_yn === 1?(<Chip
      label="in use"
      color="error"
      onClick={deleteClick.bind(this, token_id)}
      icon={<CheckCircleIcon />}
    />):(<Chip
      label="add"
      color="default"
      onClick={handleClick.bind(this, token_id)}
      icon={<AddCircleIcon />}
    />)}
    
      <Link
          to={`/items/detail/${token_id}`}
          color="inherit"
          underline='hover'
          component={RouterLink}
        >
        <Box sx={{ pt: '100%', position: 'relative'}}>
          <ImgStyle src={`${src}`} />
        </Box>
        <Stack spacing={2} sx={{ p: 3 }}>
            <Typography variant="subtitle1" noWrap>
              {item_title}
            </Typography>
        </Stack>

      </Link>
    </CardStyle>
  );
}
