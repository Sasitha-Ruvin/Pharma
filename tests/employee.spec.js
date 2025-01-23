const { By, Builder, until, Key, Actions } = require("selenium-webdriver");
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

  it("Adding new employee", async () => {
    await driver
      .wait(
        until.elementLocated(
          By.xpath("//button[text()='Employee Management']")
        ),
        50000
      )
      .click();

    await driver
      .wait(
        until.elementLocated(By.xpath("//button[text()='Add Employee']")),
        100000
      )
      .click();

    await driver
      .wait(until.elementLocated(By.name("name")), 50000)
      .sendKeys("firstname lastname");

    const dynamicEmail = `test${Date.now()}@example.com`;
    await driver
      .wait(until.elementLocated(By.name("email")), 50000)
      .sendKeys(dynamicEmail);

    await driver
      .wait(until.elementLocated(By.name("address")), 50000)
      .sendKeys("123 Main Street, Springfield, IL");

    await driver
      .wait(until.elementLocated(By.name("password")), 50000)
      .sendKeys("password");

    await driver
      .wait(until.elementLocated(By.name("contact")), 50000)
      .sendKeys("1234567890");

    await driver.wait(until.elementLocated(By.id("role-select")), 50000).click();
    await driver
      .wait(
        until.elementLocated(By.xpath("//div[text()='Inventory Manager']")),
        50000
      )
      .click();

    await driver
      .wait(until.elementLocated(By.name("dateJoined")), 50000)
      .sendKeys("2024" + "\t" + "0105");

    await driver
      .wait(until.elementLocated(By.xpath("//input[@value='Permanent']")), 50000)
      .click();

    await driver
      .wait(until.elementLocated(By.xpath("//button[text()='Save']")), 50000)
      .click();

    await driver
      .wait(until.elementLocated(By.css(".swal2-confirm")), 50000)
      .click();

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
        until.elementLocated(By.xpath("//button[text()='Update Employee']")),
        50000
      )
      .click();

    await driver.sleep(5000); // Wait for the content to load

    await driver
      .wait(until.elementLocated(By.xpath("//input[@value='Trainee']")), 50000)
      .click();

    await driver
      .wait(until.elementLocated(By.xpath("//button[text()='Update']")), 50000)
      .click();

    await driver
      .wait(until.elementLocated(By.css(".swal2-confirm")), 50000)
      .click();

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
        until.elementLocated(By.xpath("//button[text()='Remove Employee']")),
        50000
      )
      .click();

    await driver
      .wait(until.elementLocated(By.xpath("//button[text()='Yes']")), 50000)
      .click();

    await driver.actions().move({ x: 50, y: 50 }).click().perform();
  });
});
