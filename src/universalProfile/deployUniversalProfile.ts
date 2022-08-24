import "dotenv/config";
import { LSPFactory } from "@lukso/lsp-factory.js";
import { L16 } from "../constants";
import { upMetaData } from "../interface/universalProfile";

const lspFactory = new LSPFactory(L16.endpoint, {
    deployKey: process.env.PRIVATE_KEY, // Private key of the account which will deploy any smart contract,
    chainId: L16.chainId, // Chain Id of the network you want to deploy to
  });

export async function deployUniversalProfileFor(upMetaData: upMetaData){

  const {walletAddress, name, description, profileImage, backgroundImage} = upMetaData;
  
  console.log("properties", {
    controllerAddresses: [walletAddress], 
    lsp3Profile: {
      name,
      description,
      profileImage,
      backgroundImage
    },
  });

    const myContracts = await lspFactory.UniversalProfile.deploy({
      controllerAddresses: [walletAddress], 
      lsp3Profile: {
        name,
        description,
        profileImage,
        backgroundImage
      },
    },
    {
      onDeployEvents: {
        next: (deploymentEvent) => {
          console.log(deploymentEvent);
        },
        error: (error) => {
          console.error(error);
        },
        complete: (contracts) => {
          console.log('Deployment Complete');
          console.log(contracts);
        },
      },
    });

    return {
      "address":myContracts.LSP0ERC725Account?.address
    }
  
  } 