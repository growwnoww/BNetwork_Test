

export interface GetNFTSTypes{
    id:string;
    userId:string;
    tokenType:number;
    tokenId:number;
    mintDate:Date;
    royaltNFTId:string;
}

export interface SetNFTBuyResponseTypes{
    status: boolean;
     message: string;
     error?:any;
}