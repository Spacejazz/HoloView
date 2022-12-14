import axios from "axios";
import { PINATA_IPFS } from "../constants";


/**
 * function which extract the data from a hash representing a stored object
 * @param hash IPFS Hash
 * @returns byte array stored inside reponse.data
 */

export const getData = async (hash: string) => {
    return axios.get(`${PINATA_IPFS}${hash}`, {responseType: 'arraybuffer', responseEncoding: 'binary', timeout: 0})
    .then((response: any) => {
        //the response.data holds the byte array
        return response.data;
    })
    .catch((e: any) => {
        console.log("error", e);
    })
};
