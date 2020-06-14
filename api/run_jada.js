const WebDriver = require('selenium-webdriver');
const driver = new WebDriver.Builder().forBrowser('chrome').build();

async function seleniumGoogleTest() {
    await driver.get('http://google.com');
    await driver.findElement({ name: 'q' }).sendKeys('Sherry Espineli');
    await driver.findElement({ name: 'q' }).sendKeys(WebDriver.Key.ENTER);
    let firstResult = await driver.wait(WebDriver.until.elementLocated({ xpath: '//*[@id="rso"]/div[1]/div/div[1]/a' }), 2000);

    if (firstResult) {
        console.log('success')
        await driver.findElement({ xpath: '//*[@id="rso"]/div[1]/div/div[1]/a' }).click();
        driver.getTitle().then((title) => { console.log(title) }).catch((err) => { console.log(err) });
    } else {
        console.log('failure')
    }
}

seleniumGoogleTest();