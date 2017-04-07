import listTask from './tasks/listTask';

const shouldRespondToMessage = (message, commands) => {
    const commandList = Array.isArray(commands) ? commands : [commands];
    return commandList.some(command => message.text.indexOf(command) > -1);
};

const getMessageArguments = (message, bot) => {
    const botUserIdString = `<@${bot.user.id}>`;
    return message.text.split(' ')
        .filter(messageArgument => messageArgument !== botUserIdString);
};

class TaskManager {
    constructor(bot, tasks) {
        this.bot = bot;
        this.tasks = tasks.concat(listTask);
    }

    handleMessage(message) {
        let handledMessage = false;

        this.tasks.forEach((task) => {
            if (shouldRespondToMessage(message, task.commands)) {
                const messageArguments = getMessageArguments(message, this.bot);
                const taskOptions = {
                    bot: this.bot,
                    command: messageArguments[0],
                    messageArguments: messageArguments.slice(1),
                    message,
                    tasks: this.tasks
                };
                task.execute(taskOptions);
                handledMessage = true;
            }
        });

        return handledMessage;
    }
}

export default TaskManager;
