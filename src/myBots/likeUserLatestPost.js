const moment = require('moment');
const { getRandomComment } = require("../utils/randomizeComments");
const { sendTelegramMessage } = require("../telegram/sendTelegramMessage");

const log = require('simple-node-logger').createSimpleLogger('info.log');


let previousPostTime;

async function likeUserLatestPost(ig, username) {

  log.info("\n -- Check for latest post, user: **** " + username + " *****");

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

      const info = "User " + username + " created a new post. I'm going to like and commet it. New post is '" + latestPostInfo.caption + "'";

      console.log(info);
      log.info(info);
      sendTelegramMessage(info);


    } else {

      const info = "No updates from user " + username;
      console.log(info);
      log.info(info);

    }

    previousPostTime = latestPostTime;

  }

  const info = "\n -- Finished check for latest post -- ";
  console.log(info);
  log.info(info);

}

module.exports.likeUserLatestPost = likeUserLatestPost;
