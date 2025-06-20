src 
    - core : 블록체인 트랜잭션
    - DTO : 데이터를 전달할때 사용할 형태
    - interface : 인스턴스 형태 정의
    - type : 데이터의 형태만 정의 = (VO)
    - untill :  공통적으로 사용하는 기능을 분리
    - env : 환경 변수 사용

# DTO (Data Transfer Object)
const user = {
    userId : "",
    userPW : "",
    userName : "",
}

응답을 보낼때 

user 그대로 응답을 하면 비밀번호가 노출된다.
비밀번호를 노출시키지 않기 위해서 데이터를 전달할 구조를 정의해서 전달한다.
데이터를 보낼때의 형태를 각각 정해놓고 사용하는 객체의 형태

작은 택배 박스, 중간 택배 박스, 큰 택배 박스

const userDto = {
    userId : "",
    userName : ""
}

### DTO의 목적
1. 데이터를 전달할때 불필요한 데이터 포함 방지
2. 보안성, 데이터 낭비 방지
3. 데이터를 포장해서 보내기 위해서 사용
4. 요청을 받을때 DTO가 정의되어 있고, 응답 받을때도 DTO가 정의되어있다.

#### DTO의 역활
- 필요한 데이터 전송
- 보안적 데이터의 전달 방지
- 계층간의 데이터 전달
- 데이터의 구조를 정의해서 코드의 가독성 향상

### MVC
- 브라우저 -> 컨트롤러 ->  { DTO 포장 }  -> 서비스 로직 -> DB (요청로직)

interface userDTO {
    userId : string,
}


- DB -> 서비스 로직 -> 컨트롤러 -> 브라우저  (응답로직)

interface userDTO {
    userId : string,
    userImg : string
}

const userdto : userDTO {
    userName : "suho",
    userImg :  "http://kakao/suho.png"
}

### Vo(Value Object) DAO (Data Access Object)

#### VO
> 값을 정의하는 형태 값 자체를 객체로 표현한 것.
> 보통 불변객체

> 목적은 값 자체를 표현하는것이 목적



```js
class User {
    constructor(uid, upw){
        this.uid = uid;
        this.upw = upw;
    }
}

const user1 = new User("suho", "1234");
const user2 = new User("suho2", "1234");

console.log(typeof user1.uid === typeof user2.uid); // true
console.log(typeof user1.uid === typeof user2.uid); // true
console.log(typeof user1.uid === typeof user2.uid); // true
console.log(typeof user1.uid === typeof user2.uid); // true
console.log(user1 === user2); // false
console.log(user1 == user2); // false

// 객체는 단순히 비교가 어려우니 객체의 값들을 비교
// 순회를 돌려서 비교를 해야한다.
console.log(user1.equals(user2)); // 객체의 값들을 비교하는 메서드
// 타입스크립트에서 우리는 지금 vo의 개념이라하면 객체의 형태를 정의해서
// 키에 할당되는 값의 타입의 형태 비교 
```

#### DAO 
> 데이터 접근 객체
> DAO는 vo와 DTO의 내용을 받아서
> 비즈니스 로직을 구분해서 처리하고, DAO가 받아서 데이터베이스에 요청한다.

> DAO는 데이터베이스에 접근하는 역활을 하는 객체

```js
class UserDAO {
    constructor(db) {
        this.db = db;
    } 
    
    findOneId (id) {
        return this.db.query("SELECT * FROM user ..")
    }
}

// 시퀄라이즈에게 전달하기전에 원하는 형태의 데이터를 전달하기 위한 정의를 하고 
// DAO를 통해서 시퀄라이즈에게 요청
```

### 객체지향 프로그래밍 제안
> 데이터의 포맷 형태를 생각하면
> 데이터를 저장하는 형태
> 데이터 구조
> 생각을 객체의 결합성을 때는 생각을 하고 구성을 해야한다.
> 본인이 편하게 작업 + 협업을 하기위해서 편한 상태 => 협업간의 편의성
> 잘돌아가면 장땡이다...

### 체인 이후부터


### 헤커톤 

### 기술문서 이력서 자소서
> 목차 -> 내용
> 유무
> 프로젝트 내용 => 이력서 

### 내일 이더리움 백서
> 이더리움 네트워크
> EVM 가상 머신 -> 상태의 값을 저장, 솔리디티 코드 실행 런타임 환경(OPCODE)

> 솔리디티 문법
> 컨트렉트 배포 => 실제 네트워크와 유사한 => 테스트 네트워크(테스트 네트워크에 있는 테스트 이더리움)
> dApp
> 숫자 야구 게임
> 여러가지 게임
> ERC20 토큰 (플랫폼 마다의 재화) => 쇼핑몰 (탈중앙화 된 포인트)
> ERC721 NFT (파일이 있는 토큰)
> DAO
> 거래소
> (슈퍼앱) => 하이브리드 앱의 형태
> 계정 추상화
> 