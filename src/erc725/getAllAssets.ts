// https://docs.lukso.tech/tools/erc725js/getting-started
require("isomorphic-fetch");
import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";
import Web3 from "web3";
import LSP3 from "@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json";
import { RPC_ENDPOINT } from "../constants";

const upAddress = "0xE361C1137770Ed678883Ba3553A2dd5939bB94Ec";

const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
const config = {
  ipfsGateway: "https://2eff.lukso.dev/ipfs/",
};

const erc725 = new ERC725(
  LSP3 as ERC725JSONSchema[],
  upAddress,
  provider,
  config
);

const main = async () => {
  console.log("Starting...");
  const data = await erc725.fetchData();



console.log("Done", JSON.stringify(data, undefined, 2));
};

main();
