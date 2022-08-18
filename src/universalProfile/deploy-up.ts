// https://docs.lukso.tech/tools/lsp-factoryjs/getting-started

import "dotenv/config";
import { getMyEOA } from "../utils/getMyEOA";
import { deployUniversalProfileFor } from "./deployUniversalProfile";


const myEOA = getMyEOA();
console.log(`Loaded address: ${myEOA.address} from process.env`);

const main = async () => {
  console.log("Deploying UP with lsp-factory.js");

  console.log("Done: ", await deployUniversalProfileFor(myEOA.address,"Csabi", "cool stuff about myself"));
};




main();
