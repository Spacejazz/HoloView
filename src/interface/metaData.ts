export interface imageMetaData {
    width: number;
    height: number;
    hashFunction: string;
    hash: string;
    url: string;
}

export interface tokenMetaData {
    address: string;
}

export interface objectMetaData {
    hashFunction: string ;
    hash: string;
    url: string;
    fileType: string;
}

export interface linkMetaData {
    title: string;
    url: string;
}