const moment = require('moment');
const { getRandomComment } = require("../utils/randomizeComments");
const {sendTelegramMessage} = require("../telegram/sendTelegramMessage");

let previousPostTime;

async function likeUserLatestPost(ig, username) {

  console.log("\n -- Check for latest post, user:" + username + "-- \n".bold.underline);

  let posts = await getUserRecentPosts(ig, username);

  if (posts != undefined || posts != null) {

    let latestPost = posts[0];
    let latestPostTime = moment(latestPost.caption.created_at_utc);
    let dateString = moment.unix(latestPost.caption.created_at_utc).format("MM/DD/YYYY HH:mm:ss");

    let latestPostInfo = {
      caption: latestPost.caption.text,
      created_at_utc: dateString,
    }


    if (latestPostTime.diff(previousPostTime) > 0 || previousPostTime == undefined) {

      await commentPost(ig, latestPost, getRandomComment());
      likePost(ig, latestPost);
      console.log("latestPostInfo:");
      console.log(latestPostInfo);
      console.log("Like + comment with ' " + getRandomComment() +  "getRandomComment()  ' latest post");

       sendTelegramMessage("User " + username + " created a new post. I'm going to like and commet it. New post is '" + latestPostInfo.caption + "'");

      
    } else {
      console.log("Nothing new from the user, skip");
       sendTelegramMessage("User " + username + " did not posted anything new yet");

    }
    previousPostTime = latestPostTime;
    console.log("Updating time");

  }
  console.log("\n -- Finished check for latest post -- \n".bold.underline);

}

module.exports.likeUserLatestPost = likeUserLatestPost;
