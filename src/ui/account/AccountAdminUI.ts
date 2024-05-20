import { Locator, Page, expect } from "@playwright/test";
import { uiUtils } from "../../utils/uiUtils";
import { UINavigation } from "../misc/UINavigation";
import { AccountAdminUIData } from "./AccountAdminUIBuilder";

export class AccountAdminUI {
    private page: Page;
    private uiNav: UINavigation;

    constructor(page: Page) {
        this.page = page;
        this.uiNav = new UINavigation(this.page);
    }


    addAccountBtn(): Locator {
        return this.page.locator('[data-testid="Add-Account"]');
    }

    agencySelect(): Locator {
        return this.page.locator('[data-testid="partner-select"]');
    }

    emailSelector(): Locator {
        return this.page.locator('[data-testid="emailId-select"]');
    }

    accountNameInput(): Locator {
        return this.page.locator('[data-testid="companyName"]');
    }

    firstNameInput(): Locator {
        return this.page.locator('[id="firstName"]');
    }

    lastNameInput(): Locator {
        return this.page.locator('[id="lastName"]');
    }

    accountAddressInput(): Locator {
        return this.page.locator('[id="mailingCompanyAddress"]');
    }

    cityInput(): Locator {
        return this.page.locator('[id="mailingCity"]');
    }

    stateSelect(): Locator {
        return this.page.locator('[data-testid="mailingState-select"]');
    }

    zipCodeInput(): Locator {
        return this.page.locator('[id="mailingZipCode"]');
    }

    submitBtn(): Locator {
        return this.page.locator('[data-testid="submit"]');
    }

    mailingAddressCheck(): Locator {
        return this.page.locator('[id="same_as_mailing_address"]');
    }

    async chooseAgency(agencyName: string): Promise<void> {
        await uiUtils.selectDropdown(this.page, this.agencySelect(), agencyName);
    }

    async chooseEmail(email: string): Promise<void> {
        await uiUtils.selectDropdown(this.page, this.emailSelector(), email);
    }

    async fillFirstName(firstName: string): Promise<void> {
        await this.firstNameInput().scrollIntoViewIfNeeded();
        await this.firstNameInput().fill(firstName);
    }

    async fillLastName(lastName: string): Promise<void> {
        await this.lastNameInput().scrollIntoViewIfNeeded();
        await this.lastNameInput().fill(lastName);
    }

    async fillAccountName(accountName: string): Promise<void> {
        await this.accountNameInput().scrollIntoViewIfNeeded();
        await this.accountNameInput().fill(accountName);
    }


    async fillAccountAddress(accountAddress: string): Promise<void> {
        await this.accountAddressInput().scrollIntoViewIfNeeded();
        await this.accountAddressInput().fill(accountAddress);
    }


    async fillCity(city: string): Promise<void> {
        await this.cityInput().scrollIntoViewIfNeeded();
        await this.cityInput().fill(city);
    }


    async chooseState(state: string): Promise<void> {
        await this.stateSelect().scrollIntoViewIfNeeded();
        await uiUtils.selectDropdown(this.page, this.stateSelect(), state);
    }


    async fillZipCode(zip: string): Promise<void> {
        await this.zipCodeInput().scrollIntoViewIfNeeded();
        await this.zipCodeInput().fill(zip);
    }

    async clickSubmitBtn(): Promise<void> {
        await this.submitBtn().scrollIntoViewIfNeeded();
        await this.submitBtn().click();
    }

    async checkMailingAddress(): Promise<void> {
        await this.mailingAddressCheck().click();
    }

    async verifyNoCheckAvailability(): Promise<void> {
        const svgCheckAvailability = this.page.locator('//p[text()="Checking availability"]/preceding-sibling::span').locator('svg');
        expect(svgCheckAvailability).not.toBeVisible({ timeout: 10000 });
    }

    async createAccount(accountData: AccountAdminUIData): Promise<void> {
        await this.uiNav.navigateToAccountOnAdmin();
        await this.addAccountBtn().click();
        await this.page.waitForLoadState("networkidle");
        await this.chooseAgency(accountData.agencyName);
        await this.chooseEmail(accountData.email);
        await this.verifyNoCheckAvailability();
        await this.fillFirstName(accountData.firstName);
        await this.fillLastName(accountData.lastName);
        await this.fillAccountName(accountData.accountName);
        await this.fillAccountAddress(accountData.accountAddress);
        await this.fillCity(accountData.city);
        await this.chooseState(accountData.state);
        await this.fillZipCode(accountData.zipCode);
        await this.page.waitForTimeout(1500);
        await this.checkMailingAddress();
        await this.clickSubmitBtn();
        expect(this.page.locator('//p[text()="New Account Added successfully"]')).toBeVisible();
        expect(this.page.locator('//p[text()="You’re being redirected to another page"]')).toBeVisible();
    }
}