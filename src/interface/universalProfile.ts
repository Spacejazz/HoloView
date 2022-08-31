import { imageMetaData, objectMetaData, linkMetaData } from "./metaData";

export interface upMetaData {
    walletAddress: string ;
    name: string;
    description: string;
    backgroundImage?: imageMetaData[];
    profileImage?: imageMetaData[];
    avatar?: objectMetaData[];
    links?: linkMetaData[];
}