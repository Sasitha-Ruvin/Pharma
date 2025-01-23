// const { By, Builder, until } = require("selenium-webdriver");
// const assert = require("assert");
// const { Login } = require("./credentials.spec");

// describe("Product Management Tab Tests", function () {
//   this.timeout(50000);
//   let driver;

//   this.beforeEach(async () => {
//     driver = await new Builder().forBrowser("chrome").build();

//     await Login(driver);
//     await driver.sleep(1000);
//   });
//   afterEach(async () => {
//     await driver.quit();
//   });

//   it("Adding new products", async () => {
//     let button = await driver.findElement(
//       By.xpath("//button[text()='Product Management']")
//     );
//     await button.click();

//     await driver.wait(
//       until.elementLocated(By.xpath("//button[text()='Add Medication Name']")),
//       5000
//     );
//     button = await driver.findElement(
//       By.xpath("//button[text()='Add Medication Name']")
//     );
//     await driver.wait(until.elementIsVisible(button), 5000);
//     await driver.wait(until.elementIsEnabled(button), 5000);
//     await button.click();

//     await driver.wait(until.elementLocated(By.name("name")), 5000);
//     const medNameInput = await driver.findElement(By.name("name"));
//     await medNameInput.sendKeys("Paracetamol3");

//     await driver.wait(
//       until.elementLocated(
//         By.xpath("//button[normalize-space(text())='Save']")
//       ),
//       5000
//     );
//     const saveButton = await driver.findElement(
//       By.xpath("//button[normalize-space(text())='Save']")
//     );
//     await saveButton.click();

//     const tryAgainButtonXPath = "//button[normalize-space(text())='Try Again']";
//     const okButtonXPath = "//button[normalize-space(text())='OK']";

//     try {
//       await driver.wait(
//         until.elementLocated(By.xpath(tryAgainButtonXPath)),
//         5000
//       );

//       const tryAgainButton = await driver.findElement(
//         By.xpath(tryAgainButtonXPath)
//       );
//       await tryAgainButton.click();
//       let button = await driver.findElement(
//         By.xpath("//button[text()='Product Management']")
//       );
//       await button.click();
//     } catch (error) {
//       await driver.wait(until.elementLocated(By.xpath(okButtonXPath)), 5000);
//       const okButton = await driver.findElement(By.xpath(okButtonXPath));
//       await okButton.click();
//     }

//     //! ----------------------------INCOMPLETE--------------------------------
//   });
// });
