const { By, Builder, until, Key, Actions } = require("selenium-webdriver");
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

  it("Adding new employee", async () => {
    await driver
      .wait(
        until.elementLocated(
          By.xpath("//button[text()='Employee Management']")
        ),
        5000
      )
      .click();

    await driver
      .wait(
        until.elementLocated(By.xpath("//button[text()='Add Employee']")),
        10000
      )
      .click();

    await driver
      .wait(until.elementLocated(By.name("name")), 5000)
      .sendKeys("firstname lastname");

    const dynamicEmail = `test${Date.now()}@example.com`;
    await driver
      .wait(until.elementLocated(By.name("email")), 5000)
      .sendKeys(dynamicEmail);

    await driver
      .wait(until.elementLocated(By.name("address")), 5000)
      .sendKeys("123 Main Street, Springfield, IL");

    await driver
      .wait(until.elementLocated(By.name("password")), 5000)
      .sendKeys("password");

    await driver
      .wait(until.elementLocated(By.name("contact")), 5000)
      .sendKeys("1234567890");

    await driver.wait(until.elementLocated(By.id("role-select")), 5000).click();
    await driver
      .wait(
        until.elementLocated(By.xpath("//div[text()='Inventory Manager']")),
        5000
      )
      .click();

    await driver
      .wait(until.elementLocated(By.name("dateJoined")), 5000)
      .sendKeys("2024" + "\t" + "0105");

    await driver
      .wait(until.elementLocated(By.xpath("//input[@value='Permanent']")), 5000)
      .click();

    await driver
      .wait(until.elementLocated(By.xpath("//button[text()='Save']")), 5000)
      .click();

    await driver
      .wait(until.elementLocated(By.css(".swal2-confirm")), 5000)
      .click();

    await driver
      .wait(
        until.elementLocated(
          By.xpath("//div[contains(text(), '" + dynamicEmail + "')]")
        ),
        5000
      )
      .click();

    await driver
      .wait(
        until.elementLocated(By.xpath("//button[text()='Update Employee']")),
        5000
      )
      .click();

    await driver.sleep(500); // Wait for the content to load

    await driver
      .wait(until.elementLocated(By.xpath("//input[@value='Trainee']")), 5000)
      .click();

    await driver
      .wait(until.elementLocated(By.xpath("//button[text()='Update']")), 5000)
      .click();

    await driver
      .wait(until.elementLocated(By.css(".swal2-confirm")), 5000)
      .click();

    await driver
      .wait(
        until.elementLocated(
          By.xpath("//div[contains(text(), '" + dynamicEmail + "')]")
        ),
        5000
      )
      .click();

    await driver
      .wait(
        until.elementLocated(By.xpath("//button[text()='Remove Employee']")),
        5000
      )
      .click();

    await driver
      .wait(until.elementLocated(By.xpath("//button[text()='Yes']")), 5000)
      .click();

    await driver.actions().move({ x: 50, y: 50 }).click().perform();
  });
});
