const { By, Builder, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Login Tests", function () {
  async function testLogin(
    driver,
    email = null,
    password = null,
    role = null,
    status = null,
    expectedMessage = null
  ) {
    if (role) {
      await driver
        .wait(until.elementLocated(By.id("role-dropdown-trigger")), 5000)
        .click();
      await driver
        .wait(until.elementLocated(By.xpath(`//span[text()='${role}']`)), 5000)
        .click();
    }

    if (status) {
      await driver
        .wait(until.elementLocated(By.id("status-dropdown-trigger")), 5000)
        .click();
      await driver
        .wait(
          until.elementLocated(By.xpath(`//span[text()='${status}']`)),
          5000
        )
        .click();
    }

    await driver.sleep(500); // wait for dropdown to close

    email &&
      (await driver
        .wait(until.elementLocated(By.name("email")), 5000)
        .sendKeys(email));

    password &&
      (await driver
        .wait(until.elementLocated(By.name("password")), 5000)
        .sendKeys(password));

    await driver.wait(until.elementLocated(By.id("login-button"))).click();

    if (expectedMessage) {
      const message = await driver.wait(
        until.elementLocated(By.id("error-message")),
        5000
      );
      const messageText = await message.getText();
      assert.equal(messageText, expectedMessage);
    }
  }

  this.timeout(10000); // maximum 10 seconds timeout
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/login");
    await driver.manage().window().maximize();
    let title = await driver.getTitle();
    assert.strictEqual(title, "PharmaSys");
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("Invalid credentials login", async () => {
    let title = await driver.getTitle();
    assert.strictEqual(title, "PharmaSys");

    await testLogin(
      driver,
      (email = "notjohndoe@example.com"),
      (password = "123"),
      (role = "Chief Operating Officer"),
      (status = "Permanent"),
      (expectedMessage = "Invalid credentials")
    );
  });

  it("Missing credentials login", async () => {
    await testLogin(
      driver,
      null,
      null,
      "Chief Operating Officer",
      null,
      "Please select both role and status before logging in."
    );
  });

  it("Valid credentials login", async () => {
    let title = await driver.getTitle();
    assert.strictEqual(title, "PharmaSys");

    await testLogin(
      driver,
      (email = "johndoe@example.com"),
      (password = "123"),
      (role = "Chief Operating Officer"),
      (status = "Permanent")
    );

    await driver
      .wait(until.elementLocated(By.id("logout-button")), 5000)
      .click();
    await driver.sleep(500);
  });
});
