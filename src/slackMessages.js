const simpleMessage = text => ({
    text
});

const defaultColour = '#36a64f';
const attachmentMessage = (title, text, fields, colour = defaultColour) => ({
    attachments: [{
        title,
        text,
        fields,
        fallback: text,
        color: colour
    }]
});

export {
    attachmentMessage,
    simpleMessage
};
