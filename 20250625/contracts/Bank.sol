// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

contract Bank {
    // 지갑의 관리자
    // 불변성 변수를 만들고 싶다.
    address public immutable owner; // get과 set이 그냥 생성된다.

    // 입금한 계정들
    mapping(address => uint) private balances; // private으로 하면 get, set 메서드를 호출할 수 없다.

    // 관리자가 출금 제한을 한 내용
    mapping(address => uint) private balancesLimits;

    // 이벤트 로그

    // 배포자 주소가 들어온다
    constructor() {
        owner = msg.sender;
    }

    // 이더 입금 함수
    // 트랜잭션을 일으킨 사람의 주소가 들어온다
    function deposit () external payable {
        require(msg.value > 0); // 예외처리
        balances[msg.sender] += msg.value; // 입금된 이더량
    }

    // 이더 출금 함수 withdrawal (uint amount) external payable 함수에 작성을 하면 함수에서 이더를 받을수 있다.
    function withdrawal (uint amount) external payable {
        require(amount > 0); // 출금할 금액이 0보다 크면 출금
        require(amount <= balances[msg.sender]); // 출금자가 그 주소를 가지고 조회할때 잔액이 출금 요청보다 작거나 같으면 출금 시도
        // 출금 할때 // 출금 제한을 걸어서 얼마만큼 출금할 수 있는지
        require(amount <= balancesLimits[msg.sender]);

        balances[msg.sender] -= amount; // 상태 변수에 잔액의 이더량이 줄어든다.

        // 출금은 이더를 보내줘야 한다.
        // address 보내줄 주소
        // 컨트랙트에서 이더를 보내줄 주소
        // address는 객체형태로 안에 메서드 형태가 담아있다.
        // address payable account = payable(msg.sender)
        // 컨트랙트 내에서 지갑에 이더를 송금
        // 1 ether 
        // 기본 보내는 단위가 이더단위
        payable(msg.sender).transfer(amount);
    }

    // 관리자가 출금 한도를 설정
    function setLimit(address account, uint amount) external {
        balancesLimits[account] = amount; // 한번 출금할때 한도
    }

    // 본인의 잔액 조회 저금해놓은 잔액
    function getBalance() external view returns(uint) {
        return balances[msg.sender];
    }
    
    // 
    function getLimit() external view returns(uint) {
        return balancesLimits[msg.sender];
    }

    // 이더 잔액 반환
    function getContractBalance () external view returns(uint) {
        return address(this).balance; // 컨트랙트의 주소
    }
}