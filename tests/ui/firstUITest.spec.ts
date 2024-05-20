import { Page, test } from "@playwright/test";
import { AccountAdminUI } from "../../resources/ui/account/AccountAdminUI";
import { AccountAdminUIBuilder } from "../../resources/ui/account/AccountAdminUIBuilder";
import { UserLoginUI } from "../../resources/ui/misc/UserLoginUI";
import { UserLoginUIBuilder } from "../../resources/ui/misc/UserLoginUIBuilder";

test.describe("Test Suite for POC/Framework Development Testings", () => {

    let page: Page;
    let userLogin: UserLoginUI;
    let adminAccount: AccountAdminUI;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        userLogin = new UserLoginUI(page);
        adminAccount = new AccountAdminUI(page);
    })

    test.beforeEach(async () => {
        await page.goto("/");
    })

    test("Logging in to V3 and create an account", async () => {
        const userData = new UserLoginUIBuilder().build();
        await userLogin.doAdminPortalLogin(userData);
        const accountData = new AccountAdminUIBuilder().build();
        await adminAccount.createAccount(accountData);
        await page.waitForTimeout(6000);
        console.log(accountData)
    })
})

// test("Login to V3", async ({ browser }) => {
//     const context = await browser.newContext()
//     const page = await context.newPage()
//     await page.goto("https://demoqa.com/browser-windows")
//     const pagePromise = context.waitForEvent('page')
//     await page.on('request', req => console.log(req))
//     //await page.waitForLoadState('networkidle')
//     await page.waitForSelector('[id="windowButton"]', { state: 'visible' })
//     await page.locator('[id="windowButton"]').click()
//     const newWindow = await pagePromise
//     expect(newWindow).toHaveURL('https://demoqa.com/sample')
//     expect(await page.title()).toEqual('DEMOQA')
//     //await page.pause()
// })