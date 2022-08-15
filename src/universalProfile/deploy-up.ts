// https://docs.lukso.tech/tools/lsp-factoryjs/getting-started

import "dotenv/config";
import { LSPFactory } from "@lukso/lsp-factory.js";
import { L16 } from "../constants";
import Web3 from "web3";

const web3 = new Web3();

const lspFactory = new LSPFactory(L16.endpoint, {
  deployKey: process.env.PRIVATE_KEY, // Private key of the account which will deploy any smart contract,
  chainId: L16.chainId, // Chain Id of the network you want to deploy to
});

const myEOA = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY || "");
console.log(`Loaded address: ${myEOA.address} from process.env`);

const main = async () => {
  console.log("Deploying UP with lsp-factory.js");

  const myContracts = await lspFactory.UniversalProfile.deploy({
    controllerAddresses: [myEOA.address], // Account addresses which will control the UP
    lsp3Profile: {
      name: "test name",
      description: "Hello hackers",
    },
  });
  console.log("Done: ", myContracts);
};

main();
