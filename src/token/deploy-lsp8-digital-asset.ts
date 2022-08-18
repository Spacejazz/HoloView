// https://docs.lukso.tech/tools/lsp-factoryjs/getting-started

import "dotenv/config";
import { LSPFactory } from "@lukso/lsp-factory.js";
import { L16 } from "../constants";

import { toUTF8Array } from "../utils/toByteArray"
import Web3 from "web3";

import LSP8Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP8Mintable.json';


var currentProvider = new Web3.providers.HttpProvider(`${L16.endpoint}`)
const web3 = new Web3();
web3.setProvider(currentProvider);

const lspFactory = new LSPFactory(L16.endpoint, {
  deployKey: process.env.PRIVATE_KEY, // Private key of the account which will deploy any smart contract,
  chainId: L16.chainId, // Chain Id of the network you want to deploy to
});

const myEOA = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY || "");

const upAddress = "0x40270Ee82dE43B34b9c95Ae84FfeD66282392733";


console.log(`Loaded address: ${myEOA.address} from process.env`);

const main = async () => {
  console.log("Deploying LSP8 Digital asset with lsp-factory.js");
  const jsonBody = {
    "controllerAddress": myEOA.address,
    "name": "Small asset size token",
    "symbol": "sToken",
    "digitalAssetMetadata": {
      "LSP4Metadata": {
          "description": "The GLB and the mp4 is also smaller file size to test if its working",
          "icon": [
              {
                  "width": 256,
                  "height": 256,
                  "hashFunction": "keccak256(bytes)",
                  "hash": "0x1ffe139fbcba9a5e8582d164c7944461512a80b3d5e39b7014cf831d6ab12768",
                  "url": "ipfs://QmZFLAPsE9tWsUHi48J5xViMLeSmbnCUpvhb2Jj7pGE4ni"
              }
          ],
          "images": [
              [
                  {
                      "width": 1800,
                      "height": 1800,
                      "hashFunction": "keccak256(bytes)",
                      "hash": "0x75c1c8e7fe7ef26be71d45833e098fd713db2a95e026ca08089b3d645b6a6d54",
                      "url": "ipfs://Qmf9a5NCFAVza9DJjBnNufwL82cxkMGDpPsLNTrq7jXQ9D"
                  }
              ]
          ],
          "assets": [
              {
                  "hashFunction": "keccak256(bytes)",
                  "hash": "ba44e8e74af059a8ecf5ccbfdabfc755d1db5a40d591a801935ea7620e4c76e9",
                  "url": "ipfs://QmZSf8Jas2jhV4vjeTegmjk6cXTx841sfo3u7RCnSKJbr9",
                  "fileType": "video/mp4"
              },
              {
                  "hashFunction": "keccak256(bytes)",
                  "hash": "ddbceb89c635743e2f21991b574202c14e57f26fde7aa52b3709a399322ca0ae",
                  "url": "ipfs://QmdbT2imVpsPmqV9aCEzPnraMWPX8TFvTCTUngNTL3z71c",
                  "fileType": "glb"
              }
          ]
      }
  } 
};

    const metadata1 =  await lspFactory.LSP8IdentifiableDigitalAsset.deploy(
      jsonBody,
    {
      onDeployEvents: {
        next: (deploymentEvent) => {
          console.log("deploymentEvent", deploymentEvent);
        },
        error: (error) => {
          console.error("error", error);
        },
        complete: (contracts) => {
          console.log('Deployment Complete');
          console.log(contracts.LSP8IdentifiableDigitalAsset);
          
        },
      },
    });
    console.log("right before getting the contract");

    const myToken = new web3.eth.Contract(LSP8Mintable.abi as any, metadata1.LSP8IdentifiableDigitalAsset.address, {
      gas: 5_000_000,
      gasPrice: '1000000000',
    });

    console.log("right before minting");
  /*
   function mint(
          address to,
          bytes32 tokenId,
          bool force,
          bytes memory data
          */
    const mintResult = await myToken.methods.mint(upAddress, metadata1.LSP8IdentifiableDigitalAsset.address, false, toUTF8Array(JSON.stringify(jsonBody, undefined, 2))).send({
      from: web3.utils.toChecksumAddress(myEOA.address),
    });
  
    console.log("Done mint: ", mintResult);
};

main();
