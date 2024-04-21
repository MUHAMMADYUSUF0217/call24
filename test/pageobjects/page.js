const { browser } = require('@wdio/globals')

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
class Page {
        async open() {
        await browser.url('https://dev.call24.uz/');
        await browser.maximizeWindow();
        const widget = await $('#call24-wf');
        await widget.waitForDisplayed({ timeout: 10000 });
        await widget.click();

        const iframe = await $('#call24-wf');
        await browser.switchToFrame(iframe);
        await browser.pause(1000)
    }
}

module.exports = new Page;