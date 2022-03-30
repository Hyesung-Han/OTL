import Web3 from 'web3';
const HTTP_PROVIDER = process.env.REACT_APP_ETHEREUM_RPC_URL;

export const Web3Client = new Web3(
  Web3.givenProvider || new Web3.providers.HttpProvider(HTTP_PROVIDER)
);  