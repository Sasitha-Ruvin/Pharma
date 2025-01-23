const { By, Builder, until, Key } = require("selenium-webdriver");
const assert = require("assert");
const { Login } = require("./credentials.spec");

describe("Employee Management Tab Tests", function () {
  this.timeout(50000);
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser("chrome").build();

    await Login(driver);
    await driver.sleep(1000);
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("Adding new supplier", async () => {
    await driver
      .wait(
        until.elementLocated(
          By.xpath("//button[text()='Supplier Management']")
        ),
        5000
      )
      .click();

    await driver
      .wait(
        until.elementLocated(By.xpath("//button[text()='Add Supplier']")),
        10000
      )
      .click();

    await driver
      .wait(until.elementLocated(By.name("name")), 5000)
      .sendKeys("dummysupplier");

    await driver
      .wait(until.elementLocated(By.name("email")), 5000)
      .sendKeys("dummysupplier@example.com");

    await driver
      .wait(until.elementLocated(By.name("address")), 5000)
      .sendKeys("123 Main Street, Springfield, IL");

    await driver
      .wait(until.elementLocated(By.name("contact")), 5000)
      .sendKeys("1234567890");

    await driver.actions().sendKeys(Key.TAB).perform();
    await driver.actions().sendKeys("United Kingdom\n").perform();

    await driver
      .wait(until.elementLocated(By.name("tier")), 5000)
      .sendKeys("tier1");

    await driver
      .wait(until.elementLocated(By.xpath("//button[text()='Save']")), 5000)
      .click();

    await driver
      .wait(until.elementLocated(By.css(".swal2-confirm")), 5000)
      .click();

    await driver
      .wait(
        until.elementLocated(
          By.xpath("//button[text()='Supplier Management']")
        ),
        5000
      )
      .click();

    await driver
      .wait(
        until.elementLocated(
          By.xpath("//div[contains(text(), 'dummysupplier')]")
        ),
        5000
      )
      .click();

    await driver
      .wait(
        until.elementLocated(By.xpath("//button[text()='Update Supplier']")),
        5000
      )
      .click();

    await driver.sleep(500);
    await driver
      .wait(until.elementLocated(By.name("tier")), 5000)
      .sendKeys("\b\b\b\b\btier2");

    await driver
      .wait(until.elementLocated(By.xpath("//button[text()='Save']")), 5000)
      .click();

    // await driver.actions().move({ x: 50, y: 50 }).click().perform();
    await driver
      .wait(until.elementLocated(By.css(".swal2-confirm")), 5000)
      .click();

    // await driver
    //   .wait(
    //     until.elementLocated(
    //       By.xpath("//button[text()='Supplier Management']")
    //     ),
    //     5000
    //   )
    //   .click();

    await driver
      .wait(
        until.elementLocated(
          By.xpath("//div[contains(text(), 'dummysupplier')]")
        ),
        5000
      )
      .click();

    await driver
      .wait(
        until.elementLocated(By.xpath("//button[text()='Remove Supplier']")),
        5000
      )
      .click();

    await driver
      .wait(until.elementLocated(By.css(".swal2-confirm")), 5000)
      .click();

    await driver.actions().move({ x: 50, y: 50 }).click().perform();
  });
});
