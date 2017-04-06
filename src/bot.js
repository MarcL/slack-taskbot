import SlackBot from 'slackbots';
import config from '../config/config';

const isChatMessage = message => (message.type === 'message' && Boolean(message.text));
const isChannelConvesation = message => (typeof message.channel === 'string' && message.channel[0] === 'C');
const isMessageFromMe = (message, botId) => message.user === botId;
const isMessageForMe = (message, botId) => message.text.indexOf(`@${botId}`) > -1;
const isBot = user => user.is_bot;
const isUserBot = (user, botName) => user.real_name === botName;
const isBotMessage = (message, botUserId) =>
    isChatMessage(message) &&
    isChannelConvesation(message) &&
    !isMessageFromMe(message, botUserId)
    && isMessageForMe(message, botUserId);

const respondInChannel = (bot, channelId, message, params = {}) => {
    bot.postMessage(channelId, message, params);
};

const respondToUserInChannel = (bot, channelId, userId, message, params = {}) => {
    const userMessage = `<@${userId}>\n${message}`;
    respondInChannel(bot, channelId, userMessage, params);
};

const tasks = [
    {
        description: 'Get version number of deployed applications',
        command: 'version',
        execute: (message, bot) => {
            respondToUserInChannel(bot, message.channel, message.user, '> Get version number');
            setTimeout(() => {
                respondInChannel(bot, message.channel, 'Got versions...');
            }, 1000);
        }
    },
    {
        description: 'Lists all tasks',
        command: 'list',
        execute: (message, bot) => {
            respondToUserInChannel(bot, message.channel, message.user, '> listing tasks');
        }
    }
];

const startBot = () => {
    const bot = new SlackBot(config.slackConfig);
    let botUser;


    const respondToTask = (message) => {
        tasks.forEach((task) => {
            if (message.text.indexOf(task.command) > -1) {
                task.execute(message, bot);
            }
        });
    };

    bot.on('start', () => {
        console.log('started bot');
        // bot.postMessageToChannel('general', 'Reporting for duty!');

        bot.getUsers()
            .then((users) => {
                const botUsers = users.members.filter(isBot);
                botUser = botUsers.find(user => isUserBot(user, config.slackConfig.name));
            })
            .catch((error) => {
                console.log('error', error);
            });
    });

    bot.on('message', (message) => {
        if (isBotMessage(message, botUser.id)) {
            respondToTask(message);
        }
    });
};

export default startBot;
