import axios from "axios";


/**
 * function which extract the data from a hash representing a stored object
 * @param hash IPFS Hash
 * @returns byte array stored inside reponse.data
 */
//`https://gateway.pinata.cloud/ipfs/${hash}`
//`https://2eff.lukso.dev/ipfs/${hash}`
//`https://api.ipfsbrowser.com/ipfs/download.php?hash=${hash}`
// https://b8bskateboards.mypinata.cloud/ipfs/QmbUivWqkpEk7m2wPHjQ8YukdYZ1Kvfyko3Aw7QAfHQnf4

export const getData = async (hash: string) => {
    return axios.get(`https://b8bskateboards.mypinata.cloud/ipfs/${hash}`, {responseType: 'arraybuffer', responseEncoding: 'binary', timeout: 0})
    .then((response: any) => {
        //the response.data holds the byte array
        return response.data;
    })
    .catch((e: any) => {
        console.log("error", e);
    })
};