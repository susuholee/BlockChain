"use strict";
// 원시타입
let message = "hello TypeScript";
let count = 123456;
let isActive = false;
let hash = "0xfeself"; // 진수는 숫자형 데이터가 맞다. 하지만 우리가 사용할대 많이 문자열로 사용한다.
let initValue = "123"; // 타입검사를 하지 않겠다 any 쓰지마라 이거 사용할거면 자바스크립트를 사용하게 좋다.
// any 타입검사를 할수 없는 경우가 생긴다. 
// 모듈 시스템 라이브러리에서 타입의 모듈을 제공하지 않는 경우 진짜 불가피한경우 사용해라
let initValue2 = undefined;
let initValue3 = null;
let initValue4 = "123";
// any unknown 의 차이
// any는 무슨 값인지 아예 몰라. 완전 타입검사를 강력하게 풀었다.
// unknown 타입을 특정할수는 없는데 검사는 또 하고싶어 검증은 필요해
// 
initValue = 1;
// unknown 값을 재할당할때 조건이 필요하다
// 조건문 이후에 사용을 해야한다.
if (typeof initValue4 === "number") {
    initValue4 = 1;
    console.log(initValue4);
}
count = parseInt(initValue);
// 참조타입 배열
let list = [1, 2, 3, 4, 5]; // 요소들이 숫자형 타입이다.
let list2 = [1, 2, 3, 4, 5]; // 배열의 요소들이 숫자형 타입이다. // Array<number> 제네릭
// 하나의 사이즈의 요소를 가질수 있는 number의 타입만 가질수 있는 배열
// 고정의 사이즈와 각 요소의 타입을 정의하는 형태를 튜플 타입
let list3 = ["id", 1];
list3[0].replace("i", "");
list3[1]; // number
// object
let object = {
    id: 123,
    num: 123,
};
// implements 추상 클래스를 상속 즉 형태를 상속받는다.
// extends 속성을 상속 받는다.
class Block {
    constructor(_id) {
        this.id = _id;
        this.num = 1;
    }
}
// const el : HTMLDivElement | null = document.querySelector(".item");
// 타입을 추론할때 내가 알려줄게 이 타입의 값이 들어있는 변수야
// (el as HTMLDivElement).onclick = (e : MouseEvent) => {
// }
// const add = (count : string) : number => {
//     const add_count : number = 1;
//     return count + add_count;
// }
console.log(message);
//# sourceMappingURL=index.js.map