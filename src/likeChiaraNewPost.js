const { post } = require("request");
const http = require('http');
require("tools-for-instagram");
const moment = require('moment');

let secondsBetweenChecks = 60;
let previousPostTime;
let username = 'chiaraferragni';

let app = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!\n');
});

app.listen(process.env.PORT , '127.0.0.1');
console.log('Node server running on port ' + process.env.PORT );

(async () => {

  console.log("\n -- Check and like " + username + " post --\n".bold.underline);
  let ig = await login();

  await likeChiaraNewPost(ig);
  setInterval(await likeChiaraNewPost.bind(null, ig), 1000 * secondsBetweenChecks);

})();

async function likeChiaraNewPost(ig) {

  console.log("likeChiaraNewPost ...");

  let posts = await getUserRecentPosts(ig, username);

  if (posts != undefined || posts != null) {

    console.log("Latest posts size: " + posts.length);

    let latestPost = posts[0];
    let latestPostTime = moment(latestPost.caption.created_at_utc);
    let dateString = moment.unix(latestPost.caption.created_at_utc).format("MM/DD/YYYY HH:mm:ss");

    let latestPostInfo = {
     // short_name: latestPost.location.short_name ? 'nothing' : latestPost.location.short_name ,
     // name: latestPost.location.name  ? 'nothing' : latestPost.location.name ,
      caption: latestPost.caption.text  ? 'nothing' : latestPost.caption.text ,
      created_at_utc: dateString  ,
    }

    if (latestPostTime.diff(previousPostTime) > 0 || previousPostTime == undefined) {

      // post most updated than previous, like and comment it 
      await commentPost(ig, latestPost, "Wow 🔥");
      likePost(ig, latestPost);
      console.log("latestPostInfo:");
      console.log(latestPostInfo);

      console.log("Like + comment latest post");


    } else {
      console.log("Nothing new from the user, skip");
    }

    previousPostTime = latestPostTime;
    console.log("Updating time");


  }
  console.log("Finished checking posts, waiting " + secondsBetweenChecks + " seconds");

}