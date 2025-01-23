const { By, Builder, until, Key } = require("selenium-webdriver");
const assert = require("assert");
const { Login } = require("./credentials.spec");

describe("Employee Management Tab Tests", function () {
  this.timeout(500000);
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser("chrome").build();

    await Login(driver);
    await driver.sleep(1000);
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("Adding new client", async () => {
    await driver
      .wait(
        until.elementLocated(By.xpath("//button[text()='Client Management']")),
        50000
      )
      .click();

    await driver
      .wait(
        until.elementLocated(By.xpath("//button[text()='Add Client']")),
        10000
      )
      .click();

    await driver
      .wait(until.elementLocated(By.name("name")), 50000)
      .sendKeys("dummyclient");

    await driver
      .wait(until.elementLocated(By.name("type")), 50000)
      .sendKeys("dummytype");

    const dynamicEmail = `test${Date.now()}@example.com`;
    await driver
      .wait(until.elementLocated(By.name("email")), 50000)
      .sendKeys(dynamicEmail);

    await driver
      .wait(until.elementLocated(By.name("contact")), 50000)
      .sendKeys("1234567890");

    await driver
      .wait(until.elementLocated(By.name("contractType")), 50000)
      .sendKeys("dummyType");

    await driver
      .wait(until.elementLocated(By.name("paymentMethod")), 50000)
      .sendKeys("dummyMethod");

    await driver
      .wait(until.elementLocated(By.name("tier")), 50000)
      .sendKeys("dummytier1");

    await driver
      .wait(until.elementLocated(By.name("address[1]")), 50000)
      .sendKeys("123 Main Street, Springfield, IL");

    await driver
      .wait(until.elementLocated(By.id("save-client-button")), 50000)
      .click();

    await driver.actions().move({ x: 50, y: 50 }).click().perform();

    await driver
      .wait(
        until.elementLocated(
          By.xpath("//div[contains(text(), '" + dynamicEmail + "')]")
        ),
        50000
      )
      .click();

    await driver
      .wait(
        until.elementLocated(By.xpath("//button[text()='Update Client']")),
        50000
      )
      .click();

    await driver.sleep(5000); // Wait for the content to load

    await driver
      .wait(until.elementLocated(By.name("tier")), 50000)
      .sendKeys("\b\b\b\b\b\b\b\b\b\bdummytier2");

    await driver
      .wait(until.elementLocated(By.id("save-changes-button")), 50000)
      .click();

    await driver.sleep(5000); // Wait for the content to load
    await driver.actions().move({ x: 50, y: 50 }).click().perform();
    await driver
      .wait(
        until.elementLocated(
          By.xpath("//div[contains(text(), '" + dynamicEmail + "')]")
        ),
        50000
      )
      .click();

    await driver
      .wait(
        until.elementLocated(By.xpath("//button[text()='Remove Client']")),
        50000
      )
      .click();

    await driver
      .wait(until.elementLocated(By.xpath("//button[text()='Yes']")), 50000)
      .click();

    await driver.sleep(5000); // Wait for the content to load
    await driver.actions().move({ x: 50, y: 50 }).click().perform();
  });
});
