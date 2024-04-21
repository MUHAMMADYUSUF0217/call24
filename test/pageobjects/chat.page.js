class ChatPage {
    get widget() { return $('')}
    get username() { return $('#login-username'); }
    get password() { return $('#login-password'); }
    get submitBtn() { return $('#login-button'); }
    get btnNewMessage() { return $('#conversation-tab-item-new'); }
    get firstMessage() { return $('#chat-list > div:first-child'); }
    get messageText() { return $('#chat-message-textarea'); }
    get sendMessageBtn() { return $('#chat-send-message'); }

    async login(username, password) {
        await this.username.setValue(username);
        await this.password.setValue(password);
        await this.submitBtn.click();
        await browser.pause(3000);
    }

    async open() {
        await browser.url('https://dev-app.call24.uz/chats');
    }

    async openNewMessages() {
        await this.btnNewMessage.click();
        await this.firstMessage.click();
        await browser.pause(3000);
    }

    async sendChatMessage(message) {
        await this.messageText.setValue(message);
        await this.sendMessageBtn.click();
        await browser.pause(3000);
    }
}
module.exports = new ChatPage();
