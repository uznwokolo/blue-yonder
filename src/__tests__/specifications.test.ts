import { SpecPage } from "./SpecPage";
import { WebDriver, Builder, Capabilities } from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

const page = new SpecPage(driver);

test("it works", async () => {
  await page.navigate();
  await page.doSearch("purple");
  let r = await page.getResults();
  expect("purple").toContain("purple");
});
afterAll(async () => {
  await driver.quit();
});