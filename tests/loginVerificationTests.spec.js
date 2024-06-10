const { test, expect } = require('@playwright/test');

import { testCases } from '../utils/testDataBank';

import * as loginCredentials from '../utils/loginCredentials';

const SLOW_LOAD_TIMEOUT_TIME = 10000;
const TAG_TEXT_TIMEOUT_TIME = 1500;

const TEST_NAVIGATION_STEP = "Navigation to proper source.";
const TEST_CARD_COLUMN_VERIFICATION = "Verifying proper card and column.";
const TEST_TAG_VERIFICATION = "Verifying proper tags for card.";

const COLUMN_CLASS_LIST_SELECTOR = ".BoardColumn.BoardBody-column";
const TAG_CLASS_LIST_SELECTOR = ".BoardCardCustomPropertiesAndTags-tag";
const TAG_CONTENT_CLASS_SELECTOR = ".TooltipPresentation-body";

test.beforeEach(async ({ page }) => {
  await page.goto(loginCredentials.ASANA_LOGIN_URL);
    
  const CONTINUE_BUTTON_TEXT = "Continue";
  const LOGIN_BUTTON_TEXT = "Log in";

  await page.locator('input[type="email"]').fill(loginCredentials.ASANA_USER_EMAIL);
  await page.getByRole('button', { name: CONTINUE_BUTTON_TEXT , exact: true}).click();
  await page.locator('input[type="password"]').fill(loginCredentials.ASANA_USER_PASSWORD);
  await page.getByRole('button', { name: LOGIN_BUTTON_TEXT, exact: true}).click();
});

test.afterEach(async ({ page }) => {
  const USER_SETTINGS_ARIA_LABEL = "User settings";
  const LOG_OUT_MESSAGE = "Log out";

  await page.getByLabel(USER_SETTINGS_ARIA_LABEL).click();

  const logOutLocator = page.getByText(LOG_OUT_MESSAGE);

  await expect(logOutLocator).toBeVisible();
  await logOutLocator.click();
});

testCases.forEach(currentTest => {
    test(currentTest.TEST_CASE_NAME_IDENTIFIER, async ({ page }) => {
      await test.step(TEST_NAVIGATION_STEP, async() => {

        var navigationLocator = page.getByLabel(currentTest.TEST_CASE_LEFTNAV_IDENTIFIER);
        await expect(navigationLocator).toBeVisible({timeout : SLOW_LOAD_TIMEOUT_TIME});
        await navigationLocator.click();

      });
      await test.step(TEST_CARD_COLUMN_VERIFICATION, async() => {

        var columnLocator = page.getByText(currentTest.TEST_CASE_COLUMN_IDENTIFIER);
        var cardTextLocator = page.getByText(currentTest.TEST_CASE_TASK_CARD_TITLE_IDENTIFIER);

        var columnLocatorAncestor = page.locator([COLUMN_CLASS_LIST_SELECTOR]).filter({ has: columnLocator});
        var cardTextLocatorAncestor = page.locator([COLUMN_CLASS_LIST_SELECTOR]).filter({ has: cardTextLocator});
        
        await expect(columnLocator).toBeVisible();
        await expect(cardTextLocator).toBeVisible();
        
        // this ancestor exists for both locators - they are in the same column
        await expect(columnLocatorAncestor).toBeVisible();
        await expect(cardTextLocatorAncestor).toBeVisible();

      });
      await test.step(TEST_TAG_VERIFICATION, async() => {
          var boardCardAncestor = page.locator(`[data-task-id="${currentTest.TEST_CASE_BOARD_CARD_TASK_ID}"]`);
        
          await expect(boardCardAncestor).toBeVisible();

          var tagLocatorList = boardCardAncestor.locator(TAG_CLASS_LIST_SELECTOR).all();

          for(const currentTagLocator of await tagLocatorList){
            await page.pause();
            await currentTagLocator.hover();
            var tagTextFound = false;
            for(const currentTagText of currentTest.TEST_CASE_TAGS_IDENTIFIER){

              // the tag text is NOT a child of the card.
              const tagTextLocator = page.getByRole("tooltip").locator(` > ${TAG_CONTENT_CLASS_SELECTOR}`, {name: currentTagText, exact: true});              

              try {
                await expect(tagTextLocator).toBeVisible({timeout : TAG_TEXT_TIMEOUT_TIME});
                tagTextFound = true;
                break;
              }
              catch (error) {
                // we only want to throw an error if all options have been attempted
              } 
            }

            // replace test data tag entries with ERROR_HANDLING_TEST_TEXT_FIELD to raise this error. 
            if(!tagTextFound){
              throw Error(`There was no tag discovered with text from the acceptable tags list: ${currentTest.TEST_CASE_TAGS_IDENTIFIER.join(' | ')}.`);
            }
          }

      });
    })
});
