const randomComments = [
  "Wow 🔥",
  "Amazing post 🔥",
  "Awesome 😍😻🤩",
  "Bello 😍😻🤩🦾"
];

function getRandomComment() {

  var randomIndex = Math.floor(Math.random() * randomComments.length);
  console.log("Randomize comment, index= " + Math.random());
  return randomComments[randomIndex];

}

module.exports.getRandomComment = getRandomComment;
