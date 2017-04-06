import Bot from 'slackbots';
import TaskManager from './taskManager';

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

class TaskBot extends Bot {
    constructor(settings = {}, tasks = []) {
        super(settings);

        this.user = null;
        this.name = settings.name || 'TaskBot';

        this.taskManager = new TaskManager(this, tasks);
    }

    start() {
        this.on('start', this.onStart);
        this.on('message', this.onMessage);
    }

    onStart() {
        this.findBotUser();
    }

    onMessage(message) {
        if (isBotMessage(message, this.user.id)) {
            this.taskManager.handleMessage(message);
        }
    }

    findBotUser() {
        this.getUsers()
            .then((users) => {
                const botUsers = users.members.filter(isBot);
                this.user = botUsers.find(user => isUserBot(user, this.name));

                this.postMessageToChannel('general', `:tada: ${this.user.real_name} is reporting for duty!`);
            });
    }

    respondInChannel(channelId, message, params = {}) {
        this.postMessage(channelId, message, params);
    }

    respondToUserInChannel(channelId, userId, message, params = {}) {
        const userMessage = `<@${userId}>\n${message}`;
        this.respondInChannel(channelId, userMessage, params);
    }
}

export default TaskBot;