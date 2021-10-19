require("tools-for-instagram");
const { likeUserLatestPost } = require("./myBots/likeUserLatestPost");

const secondsBetweenChecks = 3600;

(async () => {
  let ig = await login();
  likeUserLatestPost(ig, 'chiaraferragni'); // firt fetch
  setInterval(
    await likeUserLatestPost.bind(null, ig, 'chiaraferragni')
    , 1000 * secondsBetweenChecks
  );

})();