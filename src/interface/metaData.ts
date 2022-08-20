export interface imageMetaData {
    width: Number;
    height: Number;
    hashFunction: string ;
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