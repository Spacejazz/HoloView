
import { getData } from "../utils/getIPFSData";
import { getReceivedAssetsWithMetadataFrom } from "./getReceivedAssetsData";

const ipfsHash = "QmPh67zUUtMH928uLNpEVGyEzVBtSDCvezBFKthHhecyZy";

const main = async () => {
//hardcoded byte extraction test
await getData(ipfsHash);//console.log("byte code :  \n ", await getData(ipfsHash));

console.log("test :  \n ", await getReceivedAssetsWithMetadataFrom("0xE361C1137770Ed678883Ba3553A2dd5939bB94Ec"), await getData(ipfsHash));
}

main();