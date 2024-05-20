import { Locator, Page } from "@playwright/test";

export class UINavigation {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    layrLogo(): Locator {
        return this.page.locator('[data-testid="home"]')
    }
    accountOnAdmin(): Locator {
        return this.page.locator('[data-testid="Accounts"]');
    }

    profileIconOnAdmin(): Locator {
        return this.page.locator('[data-testid="profile_icon"]');
    }

    async navigateToAccountOnAdmin(): Promise<void> {
        await this.layrLogo().hover();
        await this.accountOnAdmin().click();
    }
}