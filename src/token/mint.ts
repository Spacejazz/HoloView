
import "dotenv/config";
import { L16 } from "../constants";
import { toUTF8Array } from "../utils/toByteArray"
import Web3 from "web3";
import LSP8Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP8Mintable.json';


var currentProvider = new Web3.providers.HttpProvider(`${L16.endpoint}`)
const web3 = new Web3();
web3.setProvider(currentProvider);

web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY || "");

/**
 * function responsible for minting a contract
 * @param walletAddress controller address
 * @param universalProfileAddress destination universal profile address
 * @param contractAddress 
 * @param gas 
 * @param gasPrice 
 * @param data 
 * @returns the mint result and receipt
 */
export async function mint(walletAddress:string, universalProfileAddress:string, contractAddress:string, gas = 5_000_000, gasPrice = '10000000000', data = " "){

    const myToken = new web3.eth.Contract(LSP8Mintable.abi as any, contractAddress, {
        gas,
        gasPrice,
    });

    const mintResult = await myToken.methods.mint(universalProfileAddress, contractAddress, false, toUTF8Array(data)).send({
        from: web3.utils.toChecksumAddress(walletAddress),
    });

    return {
        result: mintResult
    }
};

