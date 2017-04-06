/* eslint no-unused-expressions: 0 */
import * as slackMessages from '../src/slackMessages';

describe('Slack Messages', () => {
    describe('simpleMessage()', () => {
        it('message should contain expected text', () => {
            const givenText = 'givenText';
            const expectedMessage = {
                text: givenText
            };

            const message = slackMessages.simpleMessage(givenText);

            expect(message).to.deep.equal(expectedMessage);
        });
    });

    describe('attachmentMessage()', () => {
        const defaultTitle = 'default title';
        const defaultText = 'default text';
        const defaultFields = [{
            title: 'default field title',
            value: 'default field value',
            short: false
        }];

        it('message should contain 1 attachment', () => {
            const message = slackMessages.attachmentMessage(
                defaultTitle,
                defaultText,
                defaultFields
            );

            expect(message.attachments.length).to.equal(1);
        });

        it('message should contain expected title', () => {
            const givenTitle = 'given title';

            const message = slackMessages.attachmentMessage(
                givenTitle,
                defaultText,
                defaultFields
            );

            expect(message.attachments[0].title).to.equal(givenTitle);
        });

        it('message should contain expected text', () => {
            const givenText = 'given text';

            const message = slackMessages.attachmentMessage(
                defaultTitle,
                givenText,
                defaultFields
            );

            expect(message.attachments[0].text).to.equal(givenText);
        });

        it('message should contain fallback to text', () => {
            const givenText = 'given text';

            const message = slackMessages.attachmentMessage(
                defaultTitle,
                givenText,
                defaultFields
            );

            expect(message.attachments[0].fallback).to.equal(givenText);
        });

        it('message should contain default colour', () => {
            const message = slackMessages.attachmentMessage(
                defaultTitle,
                defaultText,
                defaultFields
            );

            expect(message.attachments[0].color).to.equal('#36a64f');
        });

        it('message should contain expected colour', () => {
            const givenColour = '#ff0000';
            const message = slackMessages.attachmentMessage(
                defaultTitle,
                defaultText,
                defaultFields,
                givenColour
            );

            expect(message.attachments[0].color).to.equal(givenColour);
        });

        it('message should contain expected fields', () => {
            const givenFields = [{
                title: 'given field title',
                value: 'given field value',
                short: false
            }];

            const message = slackMessages.attachmentMessage(
                defaultTitle,
                defaultText,
                givenFields
            );

            expect(message.attachments[0].fields).to.equal(givenFields);
        });

        it('message should not contain pretext by default', () => {
            const message = slackMessages.attachmentMessage(
                defaultTitle,
                defaultText,
                defaultFields
            );

            expect(message.attachments[0].pretext).to.be.undefined;
        });

        it('message should allow markdown in pretext', () => {
            const message = slackMessages.attachmentMessage(
                defaultTitle,
                defaultText,
                defaultFields
            );

            expect(message.attachments[0].mrkdwn_in).to.deep.equal(['pretext']);
        });
    });
});
