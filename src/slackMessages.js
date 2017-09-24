const simpleMessage = text => ({
    text
});

const defaultColour = '#36a64f';
const attachmentMessage = (
    title,
    text,
    fields,
    colour = defaultColour,
    pretext = undefined
) => ({
    attachments: [
        {
            title,
            text,
            fields,
            pretext,
            fallback: text,
            color: colour,
            mrkdwn_in: ['pretext']
        }
    ]
});

export {attachmentMessage, defaultColour, simpleMessage};
