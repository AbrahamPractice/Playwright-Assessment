import { test, expect } from '@playwright/test';
import { ZipPage } from './pageObject';

//This is s quick test for the USPS zip code search
//There are three test cases
//NO.1 Search for Valid Zip Code
//NO.2 Search for Invalid Zip Code
//NO.3 Search for Empty Zip Code

const zip = require('../../src/utils/zip.json');

test.describe('This is the place for UI testing', () => {
  test('NO.1 Search for valid zip code on USPS website', async ({ page }) => {
    const zipSearch = new ZipPage(page);
    //(1) Navigate to USPS page which search cities
    //(2) Select search by Zip Code
    //(3) In the inputbox, input a valid zip code 48105
    //(4) Validate the result which should be Ann Arbor, MI

    await zipSearch.navigateToUspsZipSearch();
    await zipSearch.selectFindCityByZip();
    await zipSearch.inputZipCode(zip.valid);
    await zipSearch.clickFindButton();
    expect(zipSearch.displayedTextAsAnnArbor).toBeVisible();
  });

  test('NO.2 Search for inalid zip code on USPS website', async ({ page }) => {
    const zipSearch = new ZipPage(page);
    //(1) Navigate to USPS page which search cities
    //(2) Select search by Zip Code
    //(3) In the inputbox, input an invalid zip code 9999999999
    //(4) Validate the warning message telling the user that the zip code is invalid

    await zipSearch.navigateToUspsZipSearch();
    await zipSearch.selectFindCityByZip();
    await zipSearch.inputZipCode(zip.invalid);
    await zipSearch.clickFindButton();
    expect(zipSearch.warningForInvalidZip).toBeVisible();
  });

  test('NO.3 Search for empty zip code on USPS website', async ({ page }) => {
    const zipSearch = new ZipPage(page);

    await zipSearch.navigateToUspsZipSearch();
    await zipSearch.selectFindCityByZip();
    await zipSearch.inputZipCode(zip.empty);
    await zipSearch.clickFindButton();
    expect(zipSearch.warningForEmptyZip).toBeVisible();
  });
});
