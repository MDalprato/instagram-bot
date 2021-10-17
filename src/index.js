require("tools-for-instagram");
const { likeUserLatestPost } = require("./myBots/likeUserLatestPost");

const secondsBetweenChecks = 60;

(async () => {

  let ig = await login();
  setInterval(
    await likeUserLatestPost.bind(null, ig, 'chiaraferragni')
    , 1000 * secondsBetweenChecks
  );

})();