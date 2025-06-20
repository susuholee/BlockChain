import express from "express";
import path from "path";
import { Wallet } from "../index";
import fs, { access } from "fs";

const app = express();

app.use(express.urlencoded({extended : false}));
app.use(express.json());

// 페이지 라우터
app.get("/", (req, res) => {
    const page = fs.readFileSync(path.join(__dirname,"..", "/view/index.html"), "utf-8");
    res.send(page);
})


// api 데이터 라우터

// 지갑 목록 조회 
// restFull
app.get('/wallets', (req, res) => {
    const list = Wallet.getWalletList();
    res.json(list);
})
// 지금 내용 잘 공부해놓아야한다. 디렉터리 구조 바뀌면 복잡

// 지갑 생성
app.post('/wallet', (req, res) => {
    res.json(new Wallet());
})

// 이미 있는 지갑 조회
app.get('/wallet/:id', (req, res) => {
    const { id } = req.params;
    const privateKey = Wallet.getWalletPrivateKey(id);
    res.json(new Wallet(privateKey))
})

app.listen(3000, () => {
    console.log("서버 작동중...")
})