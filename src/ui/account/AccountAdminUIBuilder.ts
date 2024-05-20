import { faker } from "@faker-js/faker/locale/en_US";

export interface AccountAdminUIData {
    agencyName: string,
    email: string,
    accountName: string,
    firstName: string,
    lastName: string,
    phoneNumber?: string,
    accountLogoPath?: string,
    accountWebsite?: string,
    accountAddress: string,
    suite?: string,
    businessAddress2?: string,
    city: string,
    state: string,
    zipCode: string,
    naicCode?: string,
    fein?: string,
    descriptionOfoperation?: string,
    accountManager?: string
}

export class AccountAdminUIBuilder {
    private data: AccountAdminUIData;

    constructor() {
        this.data = this.getDefaultData();
    }

    public getDefaultData(): AccountAdminUIData {
        return {
            agencyName: "Layr Automation",
            email: "cypresscustomer8@layrins.com",
            accountName: `UI_DataGen_Account_${faker.string.alphanumeric(6)}`,
            firstName: "cypress",
            lastName: "customer8",
            accountWebsite: faker.internet.url(),
            accountAddress: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode('#####')
        }
    }

    public withAgencyName(agencyName: string): AccountAdminUIBuilder {
        this.data.agencyName = agencyName;
        return this;
    }

    public withEmail(email: string): AccountAdminUIBuilder {
        this.data.email = email;
        return this;
    }

    public withFirstName(firstName: string): AccountAdminUIBuilder {
        this.data.firstName = firstName;
        return this;
    }

    public withLastName(lastName: string): AccountAdminUIBuilder {
        this.data.lastName = lastName;
        return this;
    }

    public withPhoneNumber(phoneNumber: string): AccountAdminUIBuilder {
        this.data.phoneNumber = phoneNumber;
        return this;
    }

    public withAccountWebsite(accountWebsite: string): AccountAdminUIBuilder {
        this.data.accountWebsite = accountWebsite;
        return this;
    }

    public withAccountAddress(accountAddress: string): AccountAdminUIBuilder {
        this.data.accountAddress = accountAddress;
        return this;
    }

    public withCity(city: string): AccountAdminUIBuilder {
        this.data.city = city;
        return this;
    }

    public withState(state: string): AccountAdminUIBuilder {
        this.data.state = state;
        return this;
    }

    public withZipCode(zipCode: string): AccountAdminUIBuilder {
        this.data.zipCode = zipCode;
        return this;
    }

    public build(): AccountAdminUIData {
        return this.data;
    }
}