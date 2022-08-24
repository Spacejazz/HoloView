import { AssetType } from "../common/enum";

/**
 * returns correct AssetType enum
 * @returns corresponding asset type 
 */
export function assetType(type:string) {
    switch (type) {
        case 'RECEIVED': return AssetType.RECEIVED
        case 'ISSUED': return AssetType.ISSUED
        
        default: AssetType.RECEIVED
     }
     return  AssetType.RECEIVED;
}

