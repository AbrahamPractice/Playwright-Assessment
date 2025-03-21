import { Locator, Page } from '@playwright/test';

export class ZipPage {
    private page: Page;
    private findCityByZipButtonObj: Locator;
    private zipCodeInputboxObj: Locator;
    private findButtonObj: Locator;
    private displayedTextAsAnnArborObj: Locator;
    private warningForInvalidZipObj: Locator;
    private warningForEmptyZipObj: Locator;

    //Locators
    constructor(page: Page) {
        this.page = page;
        this.findCityByZipButtonObj = this.page.getByRole('button', { name: 'Find Cities by ZIP' });
        this.zipCodeInputboxObj = this.page.getByRole('textbox', { name: 'Enter ZIP Code™' });
        this.findButtonObj = this.page.getByRole('button', { name: 'Find' });
        this.displayedTextAsAnnArborObj = this.page.getByText('ANN ARBOR MI');
        this.warningForInvalidZipObj = this.page.locator('#zip-code-zip-by-city-form').getByText('You did not enter a valid ZIP Code™');
        this.warningForEmptyZipObj = this.page.getByText('Please enter a valid ZIP Code™');

    }

    

    // Methods
    async navigateToUspsZipSearch(): Promise<void> {
        await this.page.goto("https://tools.usps.com/zip-code-lookup.htm");
    }

    async selectFindCityByZip(): Promise<void> {
        await this.findCityByZipButtonObj.click();
    }

    async inputZipCode(zipCode: string): Promise<void> {
        await this.zipCodeInputboxObj.fill(zipCode);
    }

    async clickFindButton(): Promise<void> {
        await this.findButtonObj.click();  
        await this.page.waitForTimeout(2000);
    }

    get displayedTextAsAnnArbor(){
        return this.displayedTextAsAnnArborObj;
    }

    get warningForInvalidZip(){
        return this.warningForInvalidZipObj;
    }

    get warningForEmptyZip(){
        return this.warningForEmptyZipObj;
    }

}