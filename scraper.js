require("dotenv").config();
leerlingnummer = process.env.LEERLINGNUMMER;
wachtwoord = process.env.WACHTWOORD;

const puppeteer = require("puppeteer");

const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1
  });
  await page.goto("https://greijdanus.zportal.nl/");
  await page.click("#user_login");
  await page.keyboard.type(leerlingnummer);
  await page.click("#user_pass");
  await page.keyboard.type(wachtwoord);
  await page.keyboard.press("Enter");
  await page.waitForNavigation();
  await page.waitFor("#appLink");
  await page.click("#appLink");
  await page.waitFor(".week");
  await page.click(".week");
  await page.screenshot({
    path: "rooster.png",
    clip: { x: 300, y: 100, width: 810, height: 500 }
  });

  await browser.close();
};

scrape();
