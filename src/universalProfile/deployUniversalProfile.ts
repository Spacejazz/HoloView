import "dotenv/config";
import { LSPFactory } from "@lukso/lsp-factory.js";
import { L16 } from "../constants";

const lspFactory = new LSPFactory(L16.endpoint, {
    deployKey: process.env.PRIVATE_KEY, // Private key of the account which will deploy any smart contract,
    chainId: L16.chainId, // Chain Id of the network you want to deploy to
  });

export async function deployUniversalProfileFor(walletAddress:string, name:string, description:string){

    const myContracts = await lspFactory.UniversalProfile.deploy({
      controllerAddresses: [walletAddress], 
      lsp3Profile: {
        name: name,
        description: description,
      },
    });
    return {
      "address":myContracts.LSP0ERC725Account?.address
    }
  
  } 