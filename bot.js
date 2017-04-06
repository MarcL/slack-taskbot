import SlackBot from 'slackbots';
import config from './config/config';

const isChatMessage = message => (message.type === 'message' && Boolean(message.text));
const isChannelConvesation = message => (typeof message.channel === 'string' && message.channel[0] === 'C');
const isMessageFromMe = (message, botId) => message.user === botId;
const isMessageForMe = (message, botId) => message.text.indexOf(`@${botId}`) > -1;
const isBot = (user) => user.is_bot;
const isUserBot = (user, botName) => user.real_name === botName;
const startBot = () => {
    const bot = new SlackBot(config.slackConfig);
    let botUser;

    const respondToUserInChannel = (channelId, userId, message, params = {}) => {
        bot.postMessage(channelId, `<@${userId}> : ${message}`, params);
    };

    bot.on('start', () => {
        console.log('started bot');
        // bot.postMessageToChannel('general', 'Reporting for duty!');

        bot.getUsers()
            .then((users) => {
                const botUsers = users.members.filter(isBot);
                botUser = botUsers.find((user) => isUserBot(user, config.slackConfig.name));
            })
            .catch((error) => {
                console.log('error', error);
            });
    });

    bot.on('message', (message) => {
        if (isChatMessage(message) &&
            isChannelConvesation(message) &&
            !isMessageFromMe(message, botUser.id)
            && isMessageForMe(message, botUser.id)) {
            if (message.text.indexOf('version') > -1) {
                respondToUserInChannel(message.channel, message.user, 'Hello world');
            }
        }
    });
};


export default startBot;