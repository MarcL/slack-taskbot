import TaskBot from './taskBot';
import config from '../config/config';

const tasks = [
    {
        description: 'Get version number of deployed applications',
        commands: ['version'],
        execute: (bot, message) => {
            bot.respondToUserInChannel(message.channel, message.user, '> Get version number');
            setTimeout(() => {
                bot.respondInChannel(message.channel, 'Got versions...');
            }, 1000);
        }
    }
];

const startBot = () => {
    const bot = new TaskBot(config.slackConfig, tasks);
    bot.start();
};

export default startBot;
