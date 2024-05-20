import { Locator, Page, expect } from "@playwright/test";
import { apiUtils } from "./apiUtils";
import { commonUtils } from "./commonUtils";

const environment = commonUtils.getEnvironment();

let setAdminSessionInAPIHeaders = async (page: Page): Promise<void> => {
    await page.goto(`https://${environment}.withlayr.app`);
    await page.waitForLoadState("domcontentloaded")
    await page.waitForSelector('[id="email"]', { state: "visible" })
    await page.locator('[id="email"]').fill("cypresssuperadmin@layrins.com");
    await page.locator('[id="password"]').fill("@Testing123");
    await page.locator('[data-testid="login-submit"]').click();
    await page.locator('[id="confirmationCode"]').fill("123456");
    await page.locator('[data-testid="confirm-button"]').click();
    await page.waitForSelector('[data-testid="profile_icon"]')
    const accessToken = await page.evaluate(() => localStorage.getItem("accessToken"));
    const authToken = await page.evaluate(() => localStorage.getItem("token"));
    apiUtils.apiHeaders["accesstoken"] = accessToken
    apiUtils.apiHeaders["authorization"] = authToken
    await page.close()
}

let selectDropdown = async (page: Page, locator: Locator, option: string, level: number = 1): Promise<void> => {
    await locator.waitFor({ state: "visible", timeout: 10000 })
    const dropdown = locator.locator("input").nth(0);
    await dropdown.fill(option);
    expect(locator).not.toContainText("No options", { timeout: 6000 });
    page.waitForTimeout(2000);
    for (let i = 0; i < level; i++) {
        await page.keyboard.press('ArrowDown');
    }
    await page.keyboard.up('ArrowDown');
    await page.keyboard.press('Enter');
    await page.keyboard.up('Enter');
}

export const uiUtils = {
    setAdminSessionInAPIHeaders,
    selectDropdown
}