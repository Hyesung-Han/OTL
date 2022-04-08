import Web3 from 'web3';
const HTTP_PROVIDER = process.env.REACT_APP_ETHEREUM_RPC_URL;
const HTTPS_PROVIDER = `https://j6a405.p.ssafy.io/web3`;
export const Web3Client = new Web3(
  Web3.givenProvider || new Web3.providers.HttpProvider(HTTP_PROVIDER) 
);  

export const Web3Limit = new Web3(
  new Web3.providers.HttpProvider(HTTPS_PROVIDER) || Web3.givenProvider
);  