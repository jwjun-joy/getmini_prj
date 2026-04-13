const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // 요청 URL이 루트('/') 이거나 '/index.html'일 때 'sample.html' 파일을 제공합니다.
    if (req.url === '/' || req.url === '/index.html') {
        const filePath = path.join(__dirname, 'index.html');

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                // 파일을 읽는 중 오류가 발생하면 500 Internal Server Error를 응답합니다.
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('서버 오류');
                return;
            }
            // 정상적으로 파일을 읽었다면 HTML 컨텐츠를 응답합니다.
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });
    } else {
        // 그 외의 요청에는 404 Not Found를 응답합니다.
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('페이지를 찾을 수 없습니다.');
    }
});

server.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

