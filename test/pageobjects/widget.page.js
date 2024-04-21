class WidgetPage {
    async interactWithWidget() {
        await browser.url('https://dev.call24.uz/');
        await browser.maximizeWindow();
        const widget = await $('#call24-wf');
        await widget.waitForDisplayed({ timeout: 10000 });
        await widget.click();

        const iframe = await $('#call24-wf');
        await browser.switchToFrame(iframe);

        const nameInput = await $('#loginName');
        await nameInput.waitForDisplayed({ timeout: 10000 });
        await nameInput.setValue('jama');

        await browser.execute((phone) => {
            const input = document.getElementById('loginPhone');
            input.value = phone;
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }, '7910625047');

        const registerButton = await $('#registerButton');
        await registerButton.click();
    }
    async setTextMessage(text) {
        const textInput = await $('#sendMessage'); // Adjust selector as needed
        await textInput.waitForDisplayed({ timeout: 10000 });
        await textInput.setValue(text);
    }

    async sendTextMessage() {
        const sendButton = await $('#sendActionButton'); // Adjust selector as needed
        await sendButton.click();
        await browser.pause(3000)
    }
}

module.exports = new WidgetPage();
