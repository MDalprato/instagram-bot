require("tools-for-instagram");
const { likeUserLatestPost } = require("./myBots/likeUserLatestPost");

const secondsBetweenChecks = 3600;

const listOfFollowing = [
  'chiaraferragni', 'fedez', 'valentinaferragni'
];

(async () => {
  let ig = await login();
  listOfFollowing.forEach(username => {
    setInterval(likeUserLatestPost.bind(null, ig, username), 1000 * secondsBetweenChecks);
  })
})();

