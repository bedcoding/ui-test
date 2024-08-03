import { createServer } from 'https';
import fs from 'fs';
import next from 'next';

const port = 3000;
const hostname = 'deploy-test.p-e.kr';
const app = next({ hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    // 1. 인증서 파일 가져오고
    createServer({
        key: fs.readFileSync(`/etc/letsencrypt/live/${hostname}/privkey.pem`, { encoding: "utf-8" }),
        cert: fs.readFileSync(`/etc/letsencrypt/live/${hostname}/cert.pem`, { encoding: "utf-8" })
    }, async (req, res) => {
        try {
            // 2. nextJS 프로젝트 실행
            await handle(req, res);
        } catch (error) {
            console.log(error);
        }
    }).listen(port, err => {
        if (err) throw err
        console.log(`> Ready on localhost:${port}`)
    })
})