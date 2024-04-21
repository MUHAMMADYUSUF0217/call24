class MainPage {
    get widget() { return $('#call24-wf'); }
    get nameInput() { return $('#loginName'); }
    get phoneInput() { return $('#loginPhone'); }
    get registrBtn() { return $('#registerButton'); }
    get textInput() { return $('#sendMessage'); }
    get sendBtn() { return $('#sendActionButton'); }

    async open() {
        await browser.url('https://dev.call24.uz/');
        await browser.maximizeWindow();
        await this.widget.waitForDisplayed({ timeout: 10000 });
    }

    async login(name, phone) {
        await this.widget.click();
        await browser.switchToFrame(this.widget);
        await this.nameInput.waitForDisplayed({ timeout: 10000 });
        await this.nameInput.setValue(name);
        await this.phoneInput.waitForDisplayed({ timeout: 10000 });
        await browser.execute((phone) => {
            const input = document.getElementById('loginPhone');
            input.value = phone;
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }, phone);
    }

    // async login(name, phone) {
    //     await this.widget.click();
    //     await this.ensureIframeLoadedAndSwitch();
    //     try {
    //         await this.nameInput.waitForDisplayed({ timeout: 10000 });
    //         await this.nameInput.setValue(name);
    //         await this.phoneInput.waitForDisplayed({ timeout: 10000 });
    //         await browser.execute((phone) => {
    //             const input = document.getElementById('loginPhone');
    //             input.value = phone;
    //             input.dispatchEvent(new Event('input', { bubbles: true }));
    //         }, phone);
    //     } catch (error) {
    //         console.error("Error interacting with login elements:", error);
    //         throw error; // Re-throw to handle it in the calling function or to fail the test with a clear cause
    //     } finally {
    //         await browser.switchToParentFrame(); // Ensure to switch back to the main content
    //     }
    // }
    

    async sendMessage(message) {
        await this.textInput.setValue(message);
        await browser.pause(3000);
        await this.sendBtn.click();
        await browser.pause(3000);
    }

    // async ensureIframeLoadedAndSwitch() {
    //     // await this.iframe.waitForDisplayed({ timeout: 10000 });
    //     await browser.switchToFrame(this.iframe);
    // }
}
module.exports = new MainPage();

