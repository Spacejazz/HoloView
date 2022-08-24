require("isomorphic-fetch");
import { ERC725, ERC725JSONSchema } from "@erc725/erc725.js";
import Web3 from "web3";
import LSP3 from "@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json";
import { RPC_ENDPOINT } from "../constants";
import { AssetType } from "../common/enum";

const lsp5Schema = "LSP5ReceivedAssets[]";
const lsp12Schema = "LSP12IssuedAssets[]";
const lsp4Schema = "LSP4Metadata";
const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
const config = {
  ipfsGateway: "https://2eff.lukso.dev/ipfs/",
};



export const getAssetsWithMetadataFrom = async (upAddress: string, type : AssetType) => {
  const erc725 = new ERC725(
    LSP3 as ERC725JSONSchema[],
    upAddress,
    provider,
    config
  );

  console.log("payload", upAddress);
// fetches the needed data from the universal profile
  const data = await erc725.fetchData(type === AssetType.RECEIVED ? lsp5Schema : lsp12Schema);
  const ownedAssets = data.value;
  // check if the returned data is an array or an object
  if(Array.isArray(ownedAssets)){
    const ownedAssetsMetadata =  ownedAssets.map(async (ownedAsset) => {
      // Instantiate the asset
      const digitalAsset = new ERC725([
          {
            "name": "SupportedStandards:LSP4DigitalAsset",
            "key": "0xeafec4d89fa9619884b60000a4d96624a38f7ac2d8d9a604ecf07c12c77e480c",
            "keyType": "Mapping",
            "valueType": "bytes4",
            "valueContent": "0xa4d96624"
          },
          {
            "name": "LSP4TokenName",
            "key": "0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1",
            "keyType": "Singleton",
            "valueType": "string",
            "valueContent": "String"
          },
          {
            "name": "LSP4TokenSymbol",
            "key": "0x2f0a68ab07768e01943a599e73362a0e17a63a72e94dd2e384d2c1d4db932756",
            "keyType": "Singleton",
            "valueType": "string",
            "valueContent": "String"
          },
          {
            "name": "LSP4Metadata",
            "key": "0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e",
            "keyType": "Singleton",
            "valueType": "bytes",
            "valueContent": "JSONURL"
          },
          {
            "name": "LSP4Creators[]",
            "key": "0x114bd03b3a46d48759680d81ebb2b414fda7d030a7105a851867accf1c2352e7",
            "keyType": "Array",
            "valueType": "address",
            "valueContent": "Address"
          },
          {
            "name": "LSP4CreatorsMap:<address>",
            "key": "0x6de85eaf5d982b4e5da00000<address>",
            "keyType": "Mapping",
            "valueType": "(bytes4,bytes8)",
            "valueContent": "(Bytes4,Number)"
          }
        ]
        , ownedAsset, provider, config);
    
      // Get the encoded data
      return await digitalAsset.fetchData(lsp4Schema);
    });

    const fetchedMetadata = await Promise.all(ownedAssetsMetadata);

    return fetchedMetadata;
  }else{
      // Instantiate the asset
      const digitalAsset = new ERC725([
        {
          "name": "SupportedStandards:LSP4DigitalAsset",
          "key": "0xeafec4d89fa9619884b60000a4d96624a38f7ac2d8d9a604ecf07c12c77e480c",
          "keyType": "Mapping",
          "valueType": "bytes4",
          "valueContent": "0xa4d96624"
        },
        {
          "name": "LSP4TokenName",
          "key": "0xdeba1e292f8ba88238e10ab3c7f88bd4be4fac56cad5194b6ecceaf653468af1",
          "keyType": "Singleton",
          "valueType": "string",
          "valueContent": "String"
        },
        {
          "name": "LSP4TokenSymbol",
          "key": "0x2f0a68ab07768e01943a599e73362a0e17a63a72e94dd2e384d2c1d4db932756",
          "keyType": "Singleton",
          "valueType": "string",
          "valueContent": "String"
        },
        {
          "name": "LSP4Metadata",
          "key": "0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e",
          "keyType": "Singleton",
          "valueType": "bytes",
          "valueContent": "JSONURL"
        },
        {
          "name": "LSP4Creators[]",
          "key": "0x114bd03b3a46d48759680d81ebb2b414fda7d030a7105a851867accf1c2352e7",
          "keyType": "Array",
          "valueType": "address",
          "valueContent": "Address"
        },
        {
          "name": "LSP4CreatorsMap:<address>",
          "key": "0x6de85eaf5d982b4e5da00000<address>",
          "keyType": "Mapping",
          "valueType": "(bytes4,bytes8)",
          "valueContent": "(Bytes4,Number)"
        }
      ]
      , ownedAssets, provider, config);

      const ownedAssetsMetadata = await digitalAsset.fetchData(lsp4Schema);

    return [ownedAssetsMetadata];
  
  }

};


