import Bot from 'slackbots';
import smb from 'slack-message-builder';
import TaskManager from './taskManager';

const isChatMessage = message =>
    message.type === 'message' && Boolean(message.text);
const isChannelConversation = message =>
    typeof message.channel === 'string' && message.channel[0] === 'C';
const isMessageFromMe = (message, botId) => message.user === botId;
const isMessageForMe = (message, botId) =>
    message.text.indexOf(`@${botId}`) > -1;
const isBot = user => user.is_bot;
const isUserBot = (user, botName) => user.real_name === botName;
const isBotMessage = (message, botUserId) =>
    isChatMessage(message) &&
    isChannelConversation(message) &&
    !isMessageFromMe(message, botUserId) &&
    isMessageForMe(message, botUserId);

const defaultAsUserParams = {as_user: true};

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
                const {user, channel} = message;
                const responseMessage = `:question: _I'm sorry but I don't understand that command._\n> ${message.text}`;
                this.respondEphemeral(channel, user, responseMessage);
            }
        }
    }

    // TODO : Work out the best way to store bot user
    findBotUser() {
        this.getUsers()
            .then(users => {
                const botUsers = users.members.filter(isBot);
                this.user = botUsers.find(user => isUserBot(user, this.name));
                let welcomeText;
                if (!this.user) {
                    welcomeText = `:negative_squared_cross_mark: Cannot find bot user : ${this
                        .name}!\n_I cannot respond to messages until this is resolved_`;
                } else {
                    welcomeText = `:tada: ${this.user
                        .real_name} is reporting for duty!`;
                }

                const welcomeMessage = smb()
                    .text(welcomeText)
                    .json();
                this.respondInChannel('general', welcomeMessage);
            })
            .catch(error => {
                console.log(error);
            });
    }

    respondInChannel(channelId, params = {}) {
        // TODO: Unify this - respond as bot user
        const updatedMessage = smb(params)
            .asUser(true)
            .json();

        return this.postMessage(channelId, '', updatedMessage).catch(error => {
            console.log(error);
        });
    }

    respondEphemeral(channelId, userId, text, params = defaultAsUserParams) {
        return this.postEphemeral(
            channelId,
            userId,
            text,
            params
        ).catch(error => {
            console.log(error);
        });
    }

    respondTo(userId, text, params = defaultAsUserParams) {
        return this.postMessageToUser('marc', text, params).catch(error => {
            console.log(error);
        });
    }
}

export default TaskBot;
