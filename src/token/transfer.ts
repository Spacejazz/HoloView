
import "dotenv/config";
import { L16 } from "../constants";
// import { toUTF8Array } from "../utils/toByteArray"
import Web3 from "web3";
import LSP8IdentifiableDigitalAsset from '@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json';
import { transferPayload } from "../interface/transfer";
import { toUTF8Array } from "../utils/toByteArray";


var currentProvider = new Web3.providers.HttpProvider(`${L16.endpoint}`)
const web3 = new Web3();
web3.setProvider(currentProvider);

web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY || "");




    /**
     * @param from The sending address.
     * @param to The receiving address.
     * @param tokenId The tokenId to transfer.
     * @param force When set to TRUE, to may be any address but
     * when set to FALSE to must be a contract that supports LSP1 UniversalReceiver
     * @param data Additional data the caller wants included in the emitted event, and sent in the hooks to `from` and `to` addresses.
     * @dev Transfers `tokenId` token from `from` to `to`.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     * - If the caller is not `from`, it must be an operator of `tokenId`.
     *
     * Emits a {Transfer} event.
     */
    //  function transfer(
    //     address from,
    //     address to,
    //     bytes32 tokenId,
    //     bool force,
    //     bytes memory data
    // ) external;

export async function transfer(payload : transferPayload, gas = 190209, gasPrice = '8', data = "{controllerAddress: myEOA.address, name: 'MYTOKEN2',symbol: 'DEMO2'}"){

    const {contractAddress, universalProfileAddress, walletAddress, recepientUniversalProfileAddress} = payload;
    const myToken = new web3.eth.Contract(LSP8IdentifiableDigitalAsset.abi as any, contractAddress, {
        gas,
        gasPrice,
    });

    const mintResult = await myToken.methods.transfer(universalProfileAddress, recepientUniversalProfileAddress,  contractAddress, false, toUTF8Array(data)).send({
        from: web3.utils.toChecksumAddress(walletAddress),
        contractAddress
    });

    // const mintResult = await myToken.methods.transfer( universalProfileAddress, recepientUniversalProfileAddress, contractAddress, true, toUTF8Array(data)).call();

    return {
        result: mintResult
    }
}
