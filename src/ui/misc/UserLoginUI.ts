import { Locator, Page, expect } from "@playwright/test";
import { UINavigation } from "./UINavigation";
import { UserUIData } from "./UserLoginUIBuilder";

export class UserLoginUI {

    private page: Page;

    private uiNav: UINavigation

    constructor(page: Page) {
        this.page = page;
        this.uiNav = new UINavigation(this.page);
    }

    userNameInput(): Locator {
        return this.page.locator('[data-testid="email"]');
    }

    passwordInput(): Locator {
        return this.page.locator('[data-testid="password"]');
    }

    loginBtn(): Locator {
        return this.page.locator('[data-testid="login-submit"]');
    }

    otpInput(): Locator {
        return this.page.locator('[data-testid="confirmationCode"]');
    }

    confirmBtn(): Locator {
        return this.page.locator('[data-testid="confirm-button"]');
    }

    async doAdminPortalLogin(userData: UserUIData, otp: string = "123456"): Promise<void> {
        await this.userNameInput().fill(userData.username);
        await this.passwordInput().fill(userData.password);
        await this.loginBtn().click();
        await this.otpInput().fill(otp);
        await this.confirmBtn().click();
        expect(this.uiNav.profileIconOnAdmin()).toBeVisible({ timeout: 20000 });
    }
}