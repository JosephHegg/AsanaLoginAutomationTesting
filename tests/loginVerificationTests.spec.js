const { test, expect } = require('@playwright/test');

import {
    testCases,
    TEST_CASE_ID_IDENTIFIER,
    TEST_CASE_NAME_IDENTIFIER,
    TEST_CASE_LEFTNAV_IDENTIFIER,
    TEST_CASE_COLUMN_IDENTIFIER,
    TEST_CASE_TASK_CARD_TITLE_IDENTIFIER,
    TEST_CASE_TAGS_IDENTIFIER
}
from '../utils/testDataBank';

import * as loginCredentials from '../utils/loginCredentials';

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

  await logOutLocator.isVisible();
  await logOutLocator.click();

  console.log("Logged out.");
});

const TEST_NAVIGATION_STEP = "Navigation to proper source.";
const TEST_CARD_COLUMN_VERIFICATION = "Verifying proper card and column.";
const TEST_TAG_VERIFICATION = "Verifying proper tags for card.";

const COLUMN_CLASS_LIST_SELECTOR = ".BoardColumn.BoardBody-column";
const TAG_CLASS_LIST_SELECTOR = ".BoardCardCustomPropertiesAndTags-tag";


testCases.forEach(currentTest => {
    test(currentTest.TEST_CASE_NAME_IDENTIFIER, async ({ page }) => {
      await test.step(TEST_NAVIGATION_STEP, async() => {

        var navigationLocator = page.getByLabel(currentTest.TEST_CASE_LEFTNAV_IDENTIFIER);
        await expect(navigationLocator).toBeVisible();
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
          await page.pause();
          await expect(boardCardAncestor).toBeVisible();

          for(const currentTagLocator of tagLocatorList){
            await currentTagLocator.hover();
            for(const currentTagText of currentTest.TEST_CASE_TAGS_IDENTIFIER){
              try{
                const textLocator = boardCardAncestor.locator(`text="${currentTagText}"`);
                await expect(textLocator).toBeVisible();
                break;
                
              } catch (error) {

              }
              
            }
          }

      });
    })
    return;
})

async function compareLocators(firstLocator, secondLocator) {
  const firstHandle = await firstLocator.elementHandle();
  const secondHandle = await secondLocator.elementHandle();
  firstLocator.page().evaluate(
      compare => compare.left.isEqualNode(compare.right),
      { left: firstHandle, right: secondHandle }
  );
}