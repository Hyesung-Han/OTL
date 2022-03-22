import { styled } from '@mui/material/styles';
import Page from '../components/Page';

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

export default function Page404() {
  return (
    <RootStyle title="SSAFY NFT">

    </RootStyle>
  );
}
