const { post } = require("request");

require("tools-for-instagram");
const moment = require('moment');

let secondsBetweenChecks = 3600;
let previousPostTime;

(async () => {

  console.log("\n -- Check and like chiara ferragni post --\n".bold.underline);
  let ig = await login();

  await likeChiaraNewPost(ig);
  setInterval(await likeChiaraNewPost.bind(null, ig), 1000 * secondsBetweenChecks);
})();

async function likeChiaraNewPost(ig) {

  console.log("Checking ...");
  let posts = await getUserRecentPosts(ig, 'chiaraferragni');
  if (posts != undefined || posts != null) {

    let latestPost = posts[0];
    let latestPostTime = moment(latestPost.caption.created_at_utc);
    let dateString = moment.unix(latestPost.caption.created_at_utc).format("MM/DD/YYYY HH:mm:ss");

    let latestPostInfo = {
      short_name: latestPost.location.short_name,
      name: latestPost.location.name,
      caption: latestPost.caption.text,
      created_at_utc: dateString,
    }

    if (latestPostTime.diff(previousPostTime) > 0 || previousPostTime == undefined) {

      // post most updated than previous, like and comment it 
      await commentPost(ig, latestPost, "Wow 🔥");
      likePost(ig, latestPost);
      console.log("Liking and commenting this post");
      console.log(latestPostInfo);

    }else{
      console.log("Nothing new from the user ...");
    }

    previousPostTime = latestPostTime;

  }
  console.log("Finished checking posts, waiting " + secondsBetweenChecks + " seconds");

}