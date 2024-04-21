const MessagesPage = require('../pageobjects/MessagesPage');
const ChatPage = require('../pageobjects/chat.page');
const WidgetPage = require('../pageobjects/widget.page')

const Page = require('../pageobjects/page.js')
const assert = require('assert');

describe('Message List Test', function () {
    it('should find the text "test" within the second div of messages-list', async function () {
        await WidgetPage.interactWithWidget();
        await WidgetPage.setTextMessage('test');
        await WidgetPage.sendTextMessage();

        await ChatPage.open();
        await ChatPage.login('adizbek', '12345678@');
        await ChatPage.openNewMessages();
        await ChatPage.sendChatMessage('Assalomu Alaykum');

        const actualText = await MessagesPage.waitForSecondDivTextToBe('test');
        assert.strictEqual(actualText, 'test', 'The text in the second receiver is not "test".');

        await Page.open();

        
        const actualLastMessageText = await MessagesPage.waitForLastMessageTextToBe('Assalomu Alaykum');
        // assert.strictEqual(actualLastMessageText, 'The text of the last message is incorrect.');

        await browser.pause(3000);
    });
});
