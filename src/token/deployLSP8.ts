// https://docs.lukso.tech/tools/lsp-factoryjs/getting-started

import "dotenv/config";
import { LSPFactory } from "@lukso/lsp-factory.js";
import { L16 } from "../constants";
import Web3 from "web3";
import { DigitalAssetDeploymentOptions } from "@lukso/lsp-factory.js/build/main/src/lib/interfaces/digital-asset-deployment";


var currentProvider = new Web3.providers.HttpProvider(`${L16.endpoint}`)
const web3 = new Web3();
web3.setProvider(currentProvider);

const lspFactory = new LSPFactory(L16.endpoint, {
  deployKey: process.env.PRIVATE_KEY, // Private key of the account which will deploy any smart contract,
  chainId: L16.chainId, // Chain Id of the network you want to deploy to
});


/**
 * deploy LSP8 contract
 * @param jsonBody 
 * @returns 
 */
export async function deployLSP8(jsonBody: DigitalAssetDeploymentOptions){
    const metadata1 =  await lspFactory.LSP8IdentifiableDigitalAsset.deploy(
      jsonBody,
    );
    return {
      LSP8Address: metadata1.LSP8IdentifiableDigitalAsset.address
    }
   
};


