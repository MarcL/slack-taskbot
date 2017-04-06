import {attachmentMessage, defaultColour} from '../slackMessages';

const listTask = {
    description: 'Lists all tasks',
    commands: ['list', 'commands'],
    execute: (bot, message, taskList) => {
        const fields = taskList.map((task) => {
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
            '_Hello, I\'m here to serve_'
        );
        bot.respondInChannel(message.channel, '', attachment);
    }
};

export default listTask;
