import listTask from '../../src/tasks/listTask';

describe('listTask', () => {
    it('should contain expected description', () => {
        expect(listTask.description).to.equal('Lists all tasks');
    });

    it('should contain expected commands', () => {
        expect(listTask.commands).to.deep.equal(['list', 'commands']);
    });

    describe('when executing task', () => {
        const defaultTaskList = [];
        const fakeBot = {};

        let spyRespondInChannel;

        beforeEach(() => {
            spyRespondInChannel = sinon.spy();
            fakeBot.respondInChannel = spyRespondInChannel;
        });

        it('should call respondInChannel with expected channel', () => {
            const givenChannel = 'C1234';
            const givenMessage = {
                channel: givenChannel
            };

            const givenOptions = {
                bot: fakeBot,
                message: givenMessage,
                tasks: defaultTaskList
            };

            listTask.execute(givenOptions);

            expect(spyRespondInChannel.getCall(0).args[0]).to.equal(
                givenChannel
            );
        });
    });
});
