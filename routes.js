
import { writeFileSync, writeFile } from 'fs';
const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/') {
        res.write(`
            <html>
            <head><title>Enter Message</title></head>
            <body>
                <p>Hello Time is: ${new Date().toUTCString()}</p>
                <a href="/users">Users</a>
            </body>
            </html>
        `);
        res.end();
    } else if(url === '/users') {
        res.write(`
            <html>
            <head><title>Enter Message</title></head>
            <body>
                <ul>
                    <li>User 1</li>
                    <li> User 2</li>
                </ul>
                <form action="/create-user" method="POST">
                    <input type="text" name="user"/>
                    <button type="submit">Send</button>
                </form>
            </body>
            </html>
        `);
        res.end();
    } else if(url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const paresedBody = Buffer.concat(body).toString();
            writeFile('User.txt', paresedBody, () => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            });
        })
    }
}

export default requestHandler; 