import { styled } from '@mui/material/styles';
import { Box} from '@mui/material';

const Footer = () => {
  const Wrapper = styled(Box)(() => ({
    width:'100%',
    height:'100px',
    backgroundColor:'#111111',
  }));

  return (
    <Wrapper>
    </Wrapper>
  );
};

export default Footer;
