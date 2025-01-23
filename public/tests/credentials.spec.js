const assert = require("assert");
const { By, until } = require("selenium-webdriver");

async function Login(driver) {
  await driver.get("http://localhost:3000/login");
  await driver.manage().window().maximize();
  let title = await driver.getTitle();
  assert.strictEqual(title, "PharmaSys");

  await driver
    .wait(until.elementLocated(By.id("role-dropdown-trigger")), 5000)
    .click();
  await driver
    .wait(
      until.elementLocated(
        By.xpath(`//span[text()='Chief Operating Officer']`)
      ),
      5000
    )
    .click();

  await driver
    .wait(until.elementLocated(By.id("status-dropdown-trigger")), 5000)
    .click();
  await driver
    .wait(until.elementLocated(By.xpath(`//span[text()='Permanent']`)), 5000)
    .click();

  await driver.sleep(500); // wait for dropdown to close

  await driver
    .wait(until.elementLocated(By.name("email")), 5000)
    .sendKeys("johndoe@example.com");

  await driver
    .wait(until.elementLocated(By.name("password")), 5000)
    .sendKeys("123");

  await driver.wait(until.elementLocated(By.id("login-button"))).click();
}

module.exports = { Login };
