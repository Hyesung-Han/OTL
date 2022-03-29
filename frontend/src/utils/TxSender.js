const Web3 = require("web3");
const fs = require("fs");
import CONTRACT_ABI from '../common/ABI';

// 네트워크 기본 설정
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));

const { abi: contractABI } = {};

export default async function sendTransaction(fromAddr, privKey, toAddr, data) {
    try {
        
        const walletAccount = web3.eth.accounts.privateKeyToAccount(privKey);
        console.log(data.gas);
        const rawTx = {
            from: fromAddr,
            to: toAddr,
            gas: data.gas,
            data: data.contractEncodedMethod,
        };
    
        walletAccount.signTransaction(rawTx).then((signedTx) => {
            if (signedTx == null) throw new Error("TransactionSignFailedException");

            let tran = web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            tran.on('transactionHash', (txhash) => { 
                console.log("Tx Hash: " + txhash)
                tran.off('transactionHash');
            });

            tran.on('confirmation', async (confirmationNumber, receipt) => {
                try {
                    // 3회 이상 컨펌시 더이상 Confirmation 이벤트 추적 안함
                    if (confirmationNumber > 2) {
                        tran.off('confirmation');
                        throw new Error("ConfirmCompletedException");
                    }

                    console.log("Confirm #" + confirmationNumber);
                    // console.log("Confirm Receipt: " + receipt);

                    // const Name = await contractInstance.methods.Nickname(fromAddr).call();
                    // const TokenURI = await contractInstance.methods.tokenURI(fromAddr).call();

                    // console.log(Name, TokenURI);
                } catch (err) {
                    if (err instanceof TypeError) console.error('예외: 타입 에러', err);
                    if (err instanceof Error) {
                        if (err.message == "ConfirmCompletedException") console.error('예외: 컨펌 완료');
                        else console.error('예외: 알 수 없는 에러2', err);
                    }
                }
            });
            tran.on('error', (error, receipt) => {
                if (receipt) throw new Error("OutOfGasException") 
                else new Error("UnknownErrorException");
            }); 
        })
        .catch(err => { throw err; } );
    } catch (err) {
        if (err instanceof Error) {
            if (err.message == "TransactionSignFailedException") console.error('예외: 트랜잭션 서명 실패', err);
            if (err.message == "OutOfGasException") console.error('예외: 가스 부족', err);
            if (err.message == "UnknownErrorException") console.error('예외: 알 수 없는 에러', err);
            else console.error('예외: 알 수 없는 에러1', err);
        }
    }
};