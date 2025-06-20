import { IMempool } from "../interface/mempool.interface";
import { Transaction } from "../transaction";

// Mempool 용어
// 이더리움 제안서
// Mempool 거래의 처리 내용들을 담아놓을 객체의 공간
// 다른 사람의 거래를 처리해주는 내용을
// 거래 발생하면 => mempool
// 거래 발생하면 => 내가 만든 mempool에 담는다 (수수료 지불자) => mempool에 담는다.
export class Mempool implements IMempool {
    transaction: Transaction[];

    constructor() {
        this.transaction = []; // 처음에 빈배열
    }

    // 거래가 발생했다
    // 거래가 발생하면 거래 기록인 트랜잭션 생성
    // 트랜잭션 추가가 정상적으로 되었다. 서명검증이 즉, 거래의 검증이 잘 되었다. 
    addTransaction (tx : Transaction) : boolean {
        // 서명 검사
        if(tx.verifyInputs()){
            // 중복 체크
            const exists = this.transaction.find(item => item.id === tx.id);
            if(exists) return false;
            this.transaction.push(tx);
            return true; 
            // 객체 반환, 객체 반환 , 성공 반환, 실패 반환
        } else {
            return false;
        }
    }

    // 트랜잭션이 처리가 되었다.
    // 처리된 거래는 배열에서 제거
    removeTransaction (txId : string) : void {
        this.transaction = this.transaction.filter(tx => tx.id !== txId);
    }
}