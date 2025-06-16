# 타입스크립트
> 자바스크립트의는 동적인 언어 타입을 가지고 있는데 객체지향에 반하는 형태로 설계되었다.(프로토타입)
> 변수의 타입은 자바스크립트에서 실행을 시킨 이후에 런타임 환경에서 예측하지못한 타입에러가 발생할수 있다.
> 타입스크립트는 마이크로소프트에서 만든 트랜스파일러 작성 단계에서는 타입스크립트로 작성을 하고
> 컴파일을 통해 자바스크립트로 변환한후 런타임 환경에서 동작된다.
> 타입스크립트는 런타임환경이 X 

> 프로젝트의 규모가 커지다보면 버그나 유지보수에 어렵다 사람이 많은 프로젝트가 진행되기 때문에 타입의 조건 검증 코드가 늘어나고 가독성이 떨어지고 실행 전까지는 에러를 파악할수 없다. 

> 상위 집합 즉 슈퍼셋 언어로 타입스크립트를 마이크로소프트에서 발표 했다.

> 타입스크립트의 목표는 타입을 사용하게 된 이유 목적뿐만이 아니라 객체 지향 프로그래밍을 하기 위한 목적을 가지고 있다. 추상화 -> 이력서 우대사항 타입스크립트가 우대조건으로 있고 (객체지향 언어를 경험하신분)

### 원시타입
```ts
// javasciprt 
let count = 1; // 박싱 언박싱 프로토 타입
// 숫자 타입이 동적으로 할당

count = "1"; // 자바스크립트

// 타입지정 타입스크립트
// 원시 타입 7 (숫자, 문자, bool, undefined, null, 심볼, bigint)
let count : number = 1;
[예약어] [변수명] : [타입명] = [변수값];

let isActive : boolean = true;
let str : string = "hello";
let count1 : undefined = undefined;
let null : null = null;

// any 많이 사용하지 마라 타입스크립트를 사용하는 목적이 모호해진다.
// @types/express 인터페이스를 정의해놓은 파일
// 타입 인터페이스를 제공하지 않는 라이브러리들을 사용할대는 any를 사용할수 밖에 없다.
let any : any = "123";
let any1 : any = 1;
let any2 : any = null;

// 참조 타입
// 배열 튜플
// 타입스크립트

let list = []; // 자바스크립트에서 배열 요소들이 동적인 타입을 가진다.
let list : number[] = [1,2,3,4]; // 배열에 요소들의 타입을 number로 지정
let list : Array<number> = [1,2,3,4]; // Array 배열의 객체 형태에서 요소들의 타입을 number타입을 전달받아서 사용한다.

// 튜퓰 타입을 명시하는데 고정된 사이즈의 배열에 요소의 타입을 지정한다.
// 쿠키 파싱 쿼리스트링 파싱 요청메시지 파싱 ["method", "get"]
let method : [string, number] = ["get", 0];

// 함수
// 함수의 반환 타입을 명시하지 않으면 void
// 함수는 void 반환 값이 없는 함수
const add = (a : number, b : number) : void => {
}

// 반환 타입이 있는 함수
const add = (a : number, b : number) : number => {
    return a + b;
}

// 객체의 타입 지정
// 추상화 어렵다..
// interface 추상 클래스 선언 (객체의 형태를 선언) 객체의 형태의 검증만
interface CountObject {
    num : number;
    num2 : number;
    message : string;
} 

// 동적인 타입을 가지는 키와 값을 가지고 있는 객체
const count = {

}

// VO DTO DAO => IOC
const count : CountObject = {
    num : 1,
    num2 : 2,
    message : "안녕"
}

// class 클래스 
// 형태를 상속 시킨다. 형태를 상속 시킨다.
// constructor 함수를 호출해서 만드는 객체의 형태가 CountObject의 형태이어야한다.
class Count implements CountObject {
    num: number
    num2: number
    message : string
    constructor () {
        this.num = 1;
        this.num2 = 2;
        this.message = "123";
    }
}

// implements 추상 클래스를 상속 즉 형태를 상속받는다.
// extends 속성을 상속 받는다. 

// 타입스크립트의 고급 타입
// 유니언
// 유니언 타입은 둘이상의 타입중에 하나에 속할수 있다.

// 메시지를 만드는 함수
const addMessage = (a : number | string, b : string) : string => {
    return a + b;
}

// 제네릭
// 제네릭은 함수 혹은 생성자 클래스에 타입을 매개변수처럼 전달해서 사용할수 있는 방식
// 타입을 인자로 전달할수 있다.
// 타입을 두가지 혹은 여러가지를 사용하는데 확장성을 고래서 작성할수 있다.

// 두값을 더하는 함수인데 문자열을 더할수도 있고 숫자를 더할수도 있는데 매개변수의 값의 타입이 잘 전달이 될지 추론을 하고싶다.
function add<T> (a : T, b : T) : T {
    return a + b;
}
// 제네릭 문법을 사용하는 구문은 실행단계에서 타입이 정의된다.
add<number>(1,2);

interface IResult {
    message : string,
    result : number
}

interface IError {
    message : string,
}

class Count<R,E> {
    constructor () {

    }

    add = (bool : boolean) : R | E => {
        // 로직에 따라서 결과 객체의 형태를 반환하거나 에러객체의 형태를 반환하거나
        if(bool) {
            let result : R = {

            }
            return result
        }else {
            let error : E = {

            }
            return error
        }
    }
}
// 코드를 잘쓰는 사람보다 기본 AI
// 설계 생각을 해보는것 
```

```ts
// 추상 클래스로 상품을 정의할때 필요한 형태를 정의
interface IProduct {
    name : string,
    price : number,
    discountAmount : number
}

class Product implements IProduct {
    name : string;
    price : number;
    discountAmount : number;
    // constructor 객체를 생성 X 생성할 객체를 초기화하기위한 생성자 함수
    constructor (name : string, price : number) {
        this.name = name;
        this.price = price;
        this.discountAmount = 0;        
    }

    getNmae() : string {
        return this.name
    }

    getPrice() : number {
        return this.price;
    }

    getPriceDisCount () : number {
        return this.price - this.discountAmount;
    }

    setDiscountAmount (amount : number) : void {
        this.discountAmount = amount;
    }
}


const product = new Product("셔츠", 3000);
product.getName(); // OOP 캡슐화 5대 원칙
product.getPrice(); // 3000
product.getPriceDisCount(); // 3000
product.setDiscountAmount(2000);
product.getPriceDisCount(); // 1000

// 클라이언트가 상품마다 할인가가 쿠폰을 사용하는 형태가 아니고 할인가를 퍼센트로 넣을수 있는 할인이 존재합니다.
```

## This가 어려운 이유

```js
function Foo (a, b) {
    this = {} // 함수 스코프에서 this를 사용하면 객체가 할당이 된다. This 객체를 참조해 할당해
    // 함수가 실행되는 영역의 상위 객체를 할당한다.
}
Foo(); // 전역 스코프 {} 전역도 객체 window this의 위치가 어디있느냐에 바인드가 되어서 상위 객체를 참조하는것.
// new 키워드는 객체의 생성을 한뒤 {} new 키워드 뒤에 있는 생성자 함수를 객체의 스코프에서 실행한다.
// new키워드로 생성한 빈객체가 this에 할당되어서 생성자함수의 로직이 객체의 스코프에서 실행된다. this는 빈객체를 참조하고 있는것.
```

## 일반 함수로 사용
```js
function Foo(a, b) {
    console.log(this); // this
    return [a, b];
}

Foo(1,2); // 스코프  전역 스코프 { } window 전역 객체를 참조
// function 키워드 쓰지 말아주세요
// 일반 함수의 용도로 사용되고 생성자 함수 용도로도 사용되니까 
// function 프로토타입 속성중에 이터러블 메타데이터 다음 속성을 표현하는 설명하는 속성이 for in for of
// function enumerable 속성이 들어있는데 생성자 함수는 "ture" 클래스는 false 클래스에서 객체를 생성할때 불필요한 값이 선언되지 않도록
function Foo2 (a, b) {
    this.a = a;
    this.b = b;
} 
const obj = new Foo2(1,2);
// Rxjs // 이터레이터에 대해 극한으로 다뤄보고 싶다.

// 생성자 함수로 만든 객체와 클래스로 만든 객체를 
// for in문을 사용해서 동작시켜보면 class 객체는 순회가 되지 않는다.
// function 생성자 함수로 생성한 객체는 순회가 된다. // 생성된 객체의 불필요한 내용을 빼고 객체를 생성한다

// 일반함수는 화살표 함수를 사용하고 객체 생성은 클래스를 사용해라
```

### this binding

#### 일반 함수
```js
function a() {}
/*
arguments: null
caller: null
length: 0
name: "a"
prototype: {}
[[FunctionLocation]]: VM685:1
[[Prototype]]: ƒ () // 생성자 관련 속성 여기 안에있는 생성자 함수가 불필요하다 우리에게
[[Scopes]]: Scopes[1]
*/
console.log(a);

// 일반함수 사용할때 this의 혼란이 발생한다.
```

```js
function Foo(a,b) {
    console.log(this);
    return [a,b];
}

const a = Foo(1,2); // window;
console.log(a); // [1, 2]

const bar = {
    method : Foo,
}

const b = bar.method(2,3) // 객체의 안에 메터 리턴 배열
console.log(b); // 
```

### 바인드 this
> foo는 같은 함수인데도 this의 결과물이 다르다
> this가 객체를 할당받는 즉 참조하는 예약어 상위 객체의 주소를 할당시켜준다.
> 용어로 표현했을때 this binding이라고 한다.

- bind
- call
- apply

### 바인드 메서드를 사용

```js
function Foo (a, b) {
    console.log(this);
    return [a, b];
}

// 연산자 등 함수 모든 자바스크립트를 사용하면서 공부하면서 가장 중요하게 보고 설계하는 부분은 매개변수 반환값 그리고 타입

// function에서 바인딩을 제어하는 메서드를 제공한다.

// this에 할당되는 객체를 전달
const foo = Foo.bind({name : "soon"});

const bar = {method : foo }

bar.method(1,2);
// log 

```

### call, apply

```js
function Foo (a, b) {
    console.log(this);
    return [a, b];
}

// call
const foo = Foo.call({name : "soon"}, 1, 2); // 바인드 하고 함수 실행 첫번째 인자로 전달한 객체를 바인드 한다. 두번재 이후부터 매개변수로 전달 순서대로
console.log(foo);
// apply 크개 없는데

const foo = Foo.apply({name : "soon"}, [1, 2]); // call과 동작은 같지만 매개변수의 타입의 차이가 있다. 배열의 형태로 매개변수의 값을 전달.
```

### 함수의 다향한 this

- 일반 함수
- 생성자 함수
- 객체 메서드로 할당

> function은 기본적으로 함수 선언으로 사용하는것을 목적으로 처음에 만들었는데
> this bindiog으로 기능이 추가되었다 어떤 기능이 추가되었냐하면 생성자 함수로 사용하는 프로퍼티
> 프로토 타입의 생성자 함수에 의해서 new 키워드를 만나서 생성자로 사용될수 있다.
> new로 생성한 스코프에서 this가 객체를 참조하기 때문에