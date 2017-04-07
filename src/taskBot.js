import Bot from 'slackbots';
import smb from 'slack-message-builder';
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
        this.on('message', this.slackMessageHandler);
    }

    onStart() {
        this.findBotUser();
    }

    slackMessageHandler(message) {
        if (this.user && isBotMessage(message, this.user.id)) {
            if (!this.taskManager.handleMessage(message)) {
                const responseMessage = smb()
                    .text(':question: _I\'m sorry but I don\'t understand that command._')
                    .json();
                this.respondInChannel(message.channel, responseMessage);
            }
        }
    }

    // TODO : Work out the best way to store bot user
    findBotUser() {
        this.getUsers()
            .then((users) => {
                const botUsers = users.members.filter(isBot);
                this.user = botUsers.find(user => isUserBot(user, this.name));
                if (!this.user) {
                    this.postMessageToChannel('general', `:negative_squared_cross_mark: Cannot find bot user : ${this.name}!`);
                    this.postMessageToChannel('general', '_I cannot respond to messages until this is resolved_');
                } else {
                    this.postMessageToChannel('general', `:tada: ${this.user.real_name} is reporting for duty!`);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    respondInChannel(channelId, params = {}) {
        return this.postMessage(channelId, '', params)
            .catch((error) => {
                console.log(error);
            });
    }
}

export default TaskBot;
