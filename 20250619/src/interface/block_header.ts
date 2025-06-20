export interface BlocHeader {
    version : string;
    height : number,
    timestamp : number,
    previousHash : string,
    merkleRoot : string,
    difficulty : number,
    nonce : number,
}