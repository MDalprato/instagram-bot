require("tools-for-instagram");
const { likeUserLatestPost } = require("./myBots/likeUserLatestPost");
const {sendTelegramMessage} = require("./telegram/sendTelegramMessage");

const secondsBetweenChecks = 10;

(async () => {
  let ig = await login();

  sendTelegramMessage("Starting and login to instagram for you");

  setInterval(
    await likeUserLatestPost.bind(null, ig, 'chiaraferragni')
    , 1000 * secondsBetweenChecks
  );

})();