import {attachmentMessage, defaultColour} from '../slackMessages';

const showTaskList = options => {
    const {bot, message, tasks: taskList} = options;

    const fields = taskList.map(task => {
        const commandText = task.commands.join(' | ');
        return {
            title: commandText,
            value: task.description,
            short: false
        };
    });

    const attachment = attachmentMessage(
        'Command List',
        'A list of all the commands that I respond to',
        fields,
        defaultColour,
        "_Hello, I'm here to serve_"
    );
    bot.respondInChannel(message.channel, attachment);
};

const listTask = {
    description: 'Lists all tasks',
    commands: ['list', 'commands'],
    execute: showTaskList
};

export default listTask;
