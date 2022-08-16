import axios from "axios";
/**
 * function which extract the data from a hash representing a stored object
 * @param hash IPFS Hash
 * @returns byte array stored inside reponse.data
 */
export const getData = async (hash: string) => {
    return axios.get(`https://api.ipfsbrowser.com/ipfs/download.php?hash=${hash}`, {responseType: 'arraybuffer', responseEncoding: 'binary'})
    .then((response: any) => {
        //the response.data holds the byte array
        return response.data;
    })
    .catch((e: any) => {
        console.log("error", e);
    })
};