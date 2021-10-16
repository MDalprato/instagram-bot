const { post } = require("request");
require("tools-for-instagram");
const moment = require('moment');

let secondsBetweenChecks = 60;
let previousPostTime;
let username = 'chiaraferragni';

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
      caption: latestPost.caption.text,
      created_at_utc: dateString  ,
    }
    if (latestPostTime.diff(previousPostTime) > 0 || previousPostTime == undefined) {
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