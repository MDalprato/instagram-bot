const http = require('http');
import { likeChiaraNewPost } from './likeChiaraNewPost';

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {
    // Set a response type of plain text for the response
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // Send back a response and end the connection
    res.end('Hello World!\n');


    (async () => {

        console.log("\n -- Check and like " + username + " post --\n".bold.underline);
        let ig = await login();
      
        await likeChiaraNewPost(ig);
        setInterval(await likeChiaraNewPost.bind(null, ig), 1000 * secondsBetweenChecks);
      
      })();

});

// Start the server on port 3000
app.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');