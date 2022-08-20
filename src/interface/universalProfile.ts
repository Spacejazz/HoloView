import { imageMetaData, tokenMetaData, objectMetaData, linkMetaData } from "./metaData";

export interface upMetaData {
    walletAddress: string ;
    name?: string;
    description?: string;
    backgroundImage?: [imageMetaData | tokenMetaData];
    profileImage?: [imageMetaData | tokenMetaData];
    avatar?: [objectMetaData];
    links?: [linkMetaData];
}