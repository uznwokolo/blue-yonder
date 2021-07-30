import { By, until, WebDriver } from "selenium-webdriver";


/**
 * SpecPage is a page object that points to DuckDuckGo search engine's homepage 
 * (https://duckduckgo.com/). It has methods to navigate there, do a search and 
 * return title results.
 */
export class SpecPage {
    /** The page's WebDriver object */
    driver: WebDriver;
    /** The url of DuckDuckGo seach engine */
    url: string = "https://www.duckduckgo.com/";
    /** The search bar object */
    searchBar: By = By.name('q');
    /** The logo homepage link */
    duckLogo: By = By.id('logo_homepage_link');
    /** The search result links */
    titleLinks: By = By.id('links'); 
    // get the id of the div that contains the results

    /**
     * This is the constructor for the SpecPage class
     * @param drvr - The WebDriver object
     */
    constructor(drvr: WebDriver) {
        this.driver = drvr;
    }

    /**
     * This navigates to the homepage specified in the url string
     */
    async navigate() {
        await this.driver.get(this.url);
        await this.driver.wait(until.elementLocated(this.duckLogo));
        await this.driver.wait(
            until.elementIsVisible(await this.driver.findElement(this.duckLogo))
        );
    }

    /**
     * This method performs a search on the search engine
     * @param searchValue - the search value provided
     */
    async doSearch(searchValue: string) {
        await this.sendKeys(this.searchBar, `${searchValue}\n`);
        await this.driver.wait(until.elementLocated(this.titleLinks));
    }

    /*async getResuls() {
        let links = [];
        await this.driver.wait(until.elementsLocated(this.titleLinks));
        let results = await this.driver.findElements(this.titleLinks);
        results.forEach(function(result) {
            await links.push(await result.getText().toLowerCase())
        })
    }*/ // don't understand why the forEach loop gives me errors

    /**
     * This method gets the results after a search is performed
     * @returns - the array containing the results from the search
     */
    async getResults() {
        return this.getText(this.titleLinks);
    }
    
    async getText(locator: By) {
        await this.driver.wait(until.elementLocated(locator));
        return (await this.driver.findElement(locator)).getText();
      }

    /** Click action for page elements
     * @param locator - the element to click
     */
    async click(locator: By) {
        await this.driver.wait(until.elementLocated(locator));
        return (await this.driver.findElement(locator)).click();
    }

    /** 
     * Fills input to the page element
     * @param locator - the input element
     * @param keys - the string to input
     */
    async sendKeys(locator: By, keys: string) {
        await this.driver.wait(until.elementLocated(locator));
        return this.driver.findElement(locator).sendKeys(keys);
    }
}