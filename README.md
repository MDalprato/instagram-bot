# Instagram bot with node

This project is based on 'tools-for-instagram' node poroject.
The idea behind this project is to create a bot that aumatically will 'like and comment' the latest post of an instagram user.
I'm a huge fan of [@chiaraferragni](https://www.instagram.com/chiaraferragni/) and [@fedez](https://www.instagram.com/fedez) and for this reason I wanted to create soemthing that autmatically will show my appreciation for their posts.

# Install
Just run 'npm install'.
Create an .env files with:

```javascript
IG_USERNAME=instagram username
IG_PASSWORD=instagram password
BOT_TOKEN=telegram token
BOT_CHAT_ID=telegram chat id
```
Both BOT_TOKEN & BOT_CHAT_ID are mandatory only if you want to receive a message on every update.

The check interval is stored into the ***index.js*** and it's called ***secondsBetweenChecks***, the default value is 3600 seconds, you can edit this but be aware to not stress the instagram bot too much or you could be banned by instagram.

```javascript
const secondsBetweenChecks = 3600;
```

# Run
To run the code just use the npm command 'npm run'.
