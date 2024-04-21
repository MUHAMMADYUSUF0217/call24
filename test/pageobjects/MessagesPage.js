class MessagesPage {
    // Define selectors as properties of the page object
    get messagesList() {
        return $('#messages-list');
    }

    getSecondDiv() {
        return this.messagesList.$('div:nth-child(2)');
    }

    async getSecondDivText() {
        const secondDiv = await this.getSecondDiv();
        return secondDiv.$('.bubble span').getText();
    }

    getLastMessageDiv() {
        return this.messagesList.$('div:last-child');
    }

    async getLastMessageText() {
        const lastDiv = await this.getLastMessageDiv();
        return lastDiv.$('.message > div').getText();  // Adjust the selector as needed
    }

    async waitForSecondDivTextToBe(expectedText, maxAttempts = 3) {
        let actualText = "";
        let attempts = 0;

        while (attempts < maxAttempts) {
            try {
                // Wait for the second div to be present in the DOM
                await browser.waitUntil(
                    async () => (await this.getSecondDiv().isExisting()),
                    {
                        timeout: 2000, // Short timeout for each attempt
                        timeoutMsg: 'Expected the second div to exist'
                    }
                );

                // Retrieve the text and break the loop if it matches the expected text
                actualText = await this.getSecondDivText();
                if (actualText === expectedText) {
                    break;
                }
            } catch (error) {
                console.log(`Attempt ${attempts + 1}: waiting for correct text, received: '${actualText}'`);
            }
            attempts++;
            await browser.pause(1000); // Wait 1 second before the next attempt
        }

        console.log('Final text:', actualText);
        return actualText;
    }

    async waitForLastMessageTextToBe() {
        let lastMessageText = "";
        let attempts = 0;
        const maxAttempts = 3; // Maximum number of attempts to find the text
    
            // Loop until the text is as expected or max attempts are reached
            while (attempts < maxAttempts) {
                try {
                    // Wait for the last div to be present in the DOM
                    await browser.waitUntil(
                        async () => (await $('#messages-list > div:last-child').isExisting()),
                        {
                            timeout: 2000, // Short timeout for each attempt
                            timeoutMsg: 'Expected the last div to exist'
                        }
                    );
    
                    const lastDiv = await $('#messages-list > div:last-child');
    
                    // Retrieve the text and break the loop if it matches the expected text
                    lastMessageText = await lastDiv.$('.message > div').getText();
                    if (lastMessageText === actualLastMessageText) { // Replace with the actual expected text
                        break;
                    }
                } catch (error) {
                    console.log(`Attempt ${attempts + 1}: waiting for correct text, received: ${lastMessageText}`);
                }
                attempts++;
                await browser.pause(1000); // Wait 1 second before the next attempt
            }
    
            console.log('Final message text:', lastMessageText);
            expect(lastMessageText).toEqual('Assalomu Alaykum'); // Check if the final text is correct
    
            await browser.pause(3000);
    } 
}

module.exports = new MessagesPage(); // Export an instance of the page object
