// https://docs.lukso.tech/tools/lsp-factoryjs/getting-started

import "dotenv/config";
import { LSPFactory } from "@lukso/lsp-factory.js";
import { L16 } from "../constants";
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

const upAddress = "0xE361C1137770Ed678883Ba3553A2dd5939bB94Ec";

function toUTF8Array(str:string ) {
let utf8 = [];
  for (let i = 0; i < str.length; i++) {
    let charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);
      else if (charcode < 0x800) {
          utf8.push(0xc0 | (charcode >> 6),
                    0x80 | (charcode & 0x3f));
      }
      else if (charcode < 0xd800 || charcode >= 0xe000) {
          utf8.push(0xe0 | (charcode >> 12),
                    0x80 | ((charcode>>6) & 0x3f),
                    0x80 | (charcode & 0x3f));
      }
      // surrogate pair
      else {
          i++;
          // UTF-16 encodes 0x10000-0x10FFFF by
          // subtracting 0x10000 and splitting the
          // 20 bits of 0x0-0xFFFFF into two halves
          charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                    | (str.charCodeAt(i) & 0x3ff));
          utf8.push(0xf0 | (charcode >>18),
                    0x80 | ((charcode>>12) & 0x3f),
                    0x80 | ((charcode>>6) & 0x3f),
                    0x80 | (charcode & 0x3f));
      }
  }
  return utf8;
}


console.log(`Loaded address: ${myEOA.address} from process.env`);

const main = async () => {
  console.log("Deploying LSP8 Digital asset with lsp-factory.js");
 
  const metadata1 =  await lspFactory.LSP8IdentifiableDigitalAsset.deploy({
    controllerAddress: myEOA.address,
    name: 'MYTOKEN2',
    symbol: 'DEMO2',
    digitalAssetMetadata: {
      description: "My Digital Asset",
      links: [{
        title: "Twitter website",
        url: "https://twitter.com"
      }],
      images: [
        [
          {
            width: 500,
            height: 500,
            hashFunction: 'keccak256(bytes)',
            hash: '0xfdafad027ecfe57eb4ad044b938805d1dec209d6e9f960fc320d7b9b11cced14',
            url: 'ipfs://QmPLqMFDxiUgYAom3Zg4SiwoxDaFcZpHXpCmiDzxrajSGp',
          }
        ]
      ]
    }
  },
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
  const myToken = new web3.eth.Contract(LSP8Mintable.abi as any, metadata1.LSP8IdentifiableDigitalAsset.address, {
    gas: 5_000_000,
    gasPrice: '1000000000',
  });
/*
 function mint(
        address to,
        bytes32 tokenId,
        bool force,
        bytes memory data
        */
  const mintResult = await myToken.methods.mint(upAddress, metadata1.LSP8IdentifiableDigitalAsset.address, false, toUTF8Array("{controllerAddress: myEOA.address, name: 'MYTOKEN2',symbol: 'DEMO2'}")).send({
    from: web3.utils.toChecksumAddress(myEOA.address),
  });

  console.log("Done mint: ", mintResult);

};

main();
