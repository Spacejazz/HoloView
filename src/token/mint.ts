
import "dotenv/config";
import { L16 } from "../constants";

import { toUTF8Array } from "../utils/toByteArray"
import Web3 from "web3";

import LSP8Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP8Mintable.json';


var currentProvider = new Web3.providers.HttpProvider(`${L16.endpoint}`)
const web3 = new Web3();
web3.setProvider(currentProvider);



const myEOA = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY || "");

const upAddress = "0x40270Ee82dE43B34b9c95Ae84FfeD66282392733";


const main = async () => {

    console.log("right before getting the contract");
    const myToken = new web3.eth.Contract(LSP8Mintable.abi as any, "0xCa54b79791e7966ce62f8F4a9E3a0c977902280d", {
        gas: 5_000_000,
        gasPrice: '10000000000',
    });

    console.log("right before minting");
    /*
     function mint(
            address to,
            bytes32 tokenId,
            bool force,
            bytes memory data
            */
    const mintResult = await myToken.methods.mint(upAddress, "0xCa54b79791e7966ce62f8F4a9E3a0c977902280d", false, toUTF8Array("{controllerAddress: myEOA.address, name: 'My image/video based Token', symbol: 'DEMO3'")).send({
        from: web3.utils.toChecksumAddress(myEOA.address),
    });

    console.log("Done mint: ", mintResult);
};

main();