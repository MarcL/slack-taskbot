import TaskBot from './taskBot';
import config from '../config/config';

const startBot = () => {
    const bot = new TaskBot(config.slackConfig);
    bot.start();
};

export default startBot;
