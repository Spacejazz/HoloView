// https://docs.lukso.tech/tools/erc725js/getting-started
require("isomorphic-fetch");
import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";
import Web3 from "web3";
import LSP3 from "@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json";
import { LUKSO_IPFS, RPC_ENDPOINT } from "../constants";

const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
const config = {
  ipfsGateway: LUKSO_IPFS,
};



export const getUniversalProfile = async (universalProfileAddress:string) => {

  const erc725 = new ERC725(
    LSP3 as ERC725JSONSchema[],
    universalProfileAddress,
    provider,
    config
  );

  const data = await erc725.fetchData("LSP3Profile");


    return data.value;
};

