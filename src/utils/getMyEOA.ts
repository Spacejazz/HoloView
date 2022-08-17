import Web3 from "web3";

const web3 = new Web3();
/**
 * returns wallett address based on a private key
 * @returns myEOA 
 */
export function getMyEOA(){return web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY || "");} 