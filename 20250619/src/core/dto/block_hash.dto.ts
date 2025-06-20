
// 블록을 생성할때 전달할 데이터 형태
// 해시값을 만들때 필요한 데이터 전달 형태
export interface BlockHashDto {
    version : string;
    heigth : number;
    timestamp : number;
    previousHash : string;
    difficulty : number;
    merkleRoot : string;
    nonce : number;
}