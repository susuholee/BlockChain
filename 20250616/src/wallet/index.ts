// 랜덤한 값을 생성하기 위한 모듈 
import {randomBytes} from "crypto";
// 클래스가 참조되어야할 인터페이스
import { IWallet } from "../interface/wellet.interface";
// 타원 곡선 알고리즘이 포함된 라이브러리
import elliptic from "elliptic";
// 해시 문자열로 변환하기 위해 사용
import {SHA256} from 'crypto-js';
import path from "path";
import fs from "fs";

const dir = path.join(__dirname, "./data");

if(!fs.existsSync(dir)){
    fs.mkdirSync(dir, {recursive : true});
}

// 타원 곡선 알고리즘 이름
// 타원 곡선의 형태를 정의하는 객체를 받고
// secp256k1 곡선 사용
// ec : 곡선에서 개인키, 공개키 생성에서 사용
const ec = new elliptic.ec("secp256k1");

// Wallet 클래스
// 개인키 생성, 공개키 생성, 지갑주소 생성, 메시지 서명 포함
export class Wallet implements IWallet {
    account: string; // 공개키를 잘라서 만든 지갑 주소
    privateKey: string; // 개인키 랜덤한 정수, 엄청 큰수 정수
    publicKey: string; // 공개키
    balance: number; // 지갑에 표현할 잔액 UTXO에서 가져온다.

    // 랜덤 정수
    // 개인키
    // 지갑을 생성 했었으면 개인키를 가지고 있다.(노출되면 안된다.)
    // 지갑의 개인키를 가지고 있다 라는것만으로도 내가 지갑을 소유하고 있다.
    constructor (privateKey : string = "") {
        // 개인키 -> 개인키가 있으면 사용하고 없으면 새로 생성
        this.privateKey = privateKey || this.setPrivateKey();

        // 개인키로부터 공개키를 생성
        this.publicKey = this.setPublicKey();

        // 공개키의 문자열의 일부분을 잘라서 사용한 것이 지갑 주소
        this.account = this.setAccount();

        // 잔액
        this.balance = 0;

        // 새로 생성한 지갑은 지갑 파일 저장
        if(privateKey === "") {
            Wallet.createWallet(this)
        }
    }

    static createWallet(Wallet : Wallet) {
        const filepath =  path.join(dir, Wallet.account); // 확장자 txt
        // /data/wallet.account.txt
        fs.writeFileSync(filepath, Wallet.privateKey);
    }

    static getWalletList() : string[] {
        const walletFiles : string[] = fs.readdirSync(dir);
        return walletFiles;
    }

    static getWalletPrivateKey(account : string) : string {
        const filepath = path.join(dir, account);
        
        const content = fs.readFileSync(filepath, "utf-8");

        return content;
    }

    setPrivateKey() : string {
        // 랜덤한 32바이트의 개인키의 값을 만들고
        return randomBytes(32).toString("hex")
    }

    // 공개키 생성
    setPublicKey() : string {
        // 반환값이 공개키의 내용
        // keyPair 는 공개키를 제공하는 메서드가 포함된 객체
        const keyPair = ec.keyFromPrivate(this.privateKey);

        // 개인키로 생성한 공개키를 조회 인코딩해서 반환
        return keyPair.getPublic().encode("hex", true);
    }

    // 지갑의 주소는 앞자리의 문자열을 잘라서 40자리의 문자열을 만들어서 지갑의 주소로 사용한다.
    setAccount() : string {
        // 66개의 문자열에서 40 앞부분이 26개를 잘라서 반환
        return this.publicKey.slice(26);
    }

    // 누군가가 한 일이 맞는지 검증 비대칭키, 개인키, 공개키
    // A -> B에게 보물상자를 전달 -> A가 B에게 보물상자의 키를 전달 -> B는 이 보물상자를 열기위해서 이 키를 사용해서
    // 보물상자 안에 들어있는 내용은 A가 보물상자를 줬다는 내용이 들어있다 그리고 보물
    // 트랜잭션의 내용 즉, 메시지를 증명할 수 있는 키가 공개키, 공개키로 검증할 수 있는 값이 서명값
    // 메시지를 하나 만들어서 서명에 사용을 해보자
    static hashMessage(message : string) : string {
        return SHA256(message).toString();
    }
    
    // 서명 생성
    signMessage(message : string ) : string {
        const hash = Wallet.hashMessage(message);

        // 키페어 객체를 가지고 서명을 생성
        // 타원 곡선의 형태와 기준점과 개인키, 공개키
        const keyPair = ec.keyFromPrivate(this.privateKey)

        // 서명 생성
        // rsv
        // s 값을 짧게 작은 값으로 고정 표준 서명의 값
        // 메세지 문자열 해시값, hex 해시값으로 인코딩, options = {canonical}
        // canonical s 서명의 압축을 할지 => 표준 서명 형태로 정의 
        const signature = keyPair.sign(hash, "hex");
        // 서명 생성
        console.log(signature);
        // r s v(복구 구문)
        // r : 개인키를 통한 연산 => r 개인키의 값 (서명할때 필요한 해시값) 좌표를 구하기 위한 값
        // r = k * G
        // s :  z값, r 서명값과 k값이랑 개인키를 가지고  mod n k-1 * k = 0 mod
        // k의 값은 랜덤한 난수, 서명을 만들때 난수가 2, 하나는 내가 알고있는 개인키는 이제 변하지 않지만
        // s = k(^-1) * (z + r * 개인키) mod n 
        // k 서명에 사용되는 난수는 매번 바뀐다. 한번 쓰고 버리는 값
        // k는 서명을 만들때마다  바뀐다.
        // 개인키가 아니다!!
        // s가 서명 검증에 사용되는값
        // 전달해주는 매개변수의 값 v 비유를 해서 쉽게 보조의 값, 공개키로 복원할때 사용되는 보조의 정보
        // 실제 서명값은 r s
        // z 메시지 내용,
        // 메시지도 서명에 포함되는 이유

        // keyPair에서 라이브러리인 elliptic을 사용하여 타원곡선의 형태, 개인키, 공개키, 기준점

        /*
                Signature {
        r: BN {
            negative: 0,

            words: [
            44851573, 31990455,
            27694692,  1206962,
                940407,  5336312,
            60190407, 43247934,
            47058518,   142257
            ],
            length: 10,
            red: null
        },
        s: BN {
            negative: 0,
            words: [
            34258868, 40674540, 29551223, 17080911,
            37430386, 63714202, 60117811, 39176625,
            62305833,  1916724,        0,        0,
                    0,        0,        0,        0,
                    0,        0,        0,        0,
                    0,        0,        0,        0,
                    0,        0,        0,        0,
                    0,        0
            ],
            length: 10,
            red: null
        },
        recoveryParam: 1
        }

        */

        // 서명을 인코딩해서 DER형식으로 16진수 문자열로 변환해서 반환.
        return signature.toDER("hex");
    }
    
    // 서명 검증
    static verifySignature(message : string, signature : string, publicKey : string) : boolean {
        const hash = Wallet.hashMessage(message);
        
        // 공개키를 가지고 있는 메서드 생성
        // 검증 메서드를 호출할 수 있다. 서명 검증
        const key = ec.keyFromPublic(publicKey, "hex");

        // verify 검증
        // verify() 
        // 1. 해시문자열
        // 2. 전달한 서명값
        return key.verify(hash, signature); // => signature(영수증에 기록된 서명이 올바른지 확인)
    }
}

// const Wallet = new Wallet();

// const signature = Wallet.signMessage("안녕~~");

// console.log(Wallet.verifySignature("안녕~~", signature, Wallet.publicKey));
// console.log(Wallet.verifySignature("안녕2", signature, Wallet.publicKey));