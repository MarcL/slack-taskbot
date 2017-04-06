import listTask from './tasks/listTask';

const shouldRespondToMessage = (message, commands) => {
    const commandList = Array.isArray(commands) ? commands : [commands];
    return commandList.some(command => message.text.indexOf(command) > -1);
};

class TaskManager {
    constructor(bot, tasks) {
        this.bot = bot;
        this.tasks = tasks.concat(listTask);
    }

    handleMessage(message) {
        this.tasks.forEach((task) => {
            if (shouldRespondToMessage(message, task.commands)) {
                task.execute(this.bot, message, this.tasks);
            }
        });
    }
}

export default TaskManager;
