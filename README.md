# Slack Task Bot

> Slack bot that executes user defined tasks

## Install

```
npm install --save slack-taskbot
```

## Use

```javascript
import TaskBot from 'slack-taskbot';

const config = {
    token: 'PUT-YOUR-SLACK-TOKEN-HERE',
    name: 'YOUR BOT NAME'
};

const taskList = [
    {
        commands: ['hello', 'world'],
        execute: (options) => {
            const {bot, command, message, messageArguments, tasks} = options;

            // Do something exciting here
            bot.respondInChannel(message.channel, {text: 'hello world'});
        }
    }
]

const bot = new TaskBot(config, taskList);
bot.start();
```

**Note:** Avoid adding your token to any repository. Use environment variables or a config file which is added to your `.gitignore`.

### Tasks

## Deploy

## License
