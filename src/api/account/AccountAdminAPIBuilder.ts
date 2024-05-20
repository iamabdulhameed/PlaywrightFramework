import { faker } from "@faker-js/faker/locale/en_US";
import { commonUtils, getRandomAlphaNumericString, getRandomPhoneNumber } from "../../utils/commonUtils";

export interface createAccountAPIData {
    profileImage: string;
    name: string;
    address: string;
    suite?: string;
    businessAddressTwo?: string;
    city: string;
    zipCode: string;
    requestedBy: string;
    customerEmail: string;
    agencyId: string;
    state: string;
    website: string;
    phoneNo: string;
    isUserAcceptedInvite: boolean;
    firstName: string;
    lastName: string;
    accountManager: string;
    mailingAddress: {}
}

export interface MailingAddress {
    sameAsPrimary: string;
    address: string;
    suite?: string;
    businessAddressTwo?: string;
    city: string;
    state: string;
    zipCode: string;
}

export class CreateAccountAPIDataBuilder {
    private data: createAccountAPIData;

    constructor(environment: string = commonUtils.getEnvironment()) {
        this.data = this.getDefaultData(environment);
    }

    private getDefaultData(environment: string): createAccountAPIData {
        if (environment.length == 0) {
            throw new Error(`Unknown environment: ${environment}`);
        }
        return {
            profileImage: "",
            name: `DataGen_Account_${getRandomAlphaNumericString(6)}`,
            address: faker.location.streetAddress(),
            suite: faker.location.buildingNumber(),
            businessAddressTwo: "",
            city: faker.location.city(),
            zipCode: faker.location.zipCode("#####"),
            requestedBy: "cypresssuperadmin@layrins.com",
            customerEmail: "cypresscustomer8@layrins.com",
            agencyId: environment == "dev" ? 'da9a1c2e-49e1-46e6-9920-891f58336af8' : '84001287-4789-45f8-a399-16c9101f0fe6',
            state: faker.location.state(),
            website: faker.internet.url(),
            phoneNo: getRandomPhoneNumber(),
            isUserAcceptedInvite: false,
            firstName: "cypress",
            lastName: "customer8",
            accountManager: "shaheem.anjum@layrins.com",
            mailingAddress: {
                sameAsPrimary: true,
                address: "12033 Lone Peak Parkway",
                suite: "",
                businessAddressTwo: "",
                city: "Moab",
                state: "Utah",
                zipCode: "84532"
            }
        };
    }

    public withAgentId(agencyId: string): CreateAccountAPIDataBuilder {
        this.data.agencyId = agencyId;
        return this;
    }

    public withProfileImage(profileImage: string): CreateAccountAPIDataBuilder {
        this.data.profileImage = profileImage;
        return this;
    }

    public withName(name: string): CreateAccountAPIDataBuilder {
        this.data.name = name;
        return this;
    }

    public withAddress(address: string): CreateAccountAPIDataBuilder {
        this.data.address = address;
        return this;
    }

    public withSuite(suite: string): CreateAccountAPIDataBuilder {
        this.data.suite = suite;
        return this;
    }

    public withBusinessAddressTwo(businessAddressTwo: string): CreateAccountAPIDataBuilder {
        this.data.businessAddressTwo = businessAddressTwo;
        return this;
    }

    public withCity(city: string): CreateAccountAPIDataBuilder {
        this.data.city = city;
        return this;
    }

    public withZipCode(zipCode: string): CreateAccountAPIDataBuilder {
        this.data.zipCode = zipCode;
        return this;
    }

    public withRequestedBy(requestedBy: string): CreateAccountAPIDataBuilder {
        this.data.requestedBy = requestedBy;
        return this;
    }

    public withState(state: string): CreateAccountAPIDataBuilder {
        this.data.state = state;
        return this;
    }

    public withWebsite(website: string): CreateAccountAPIDataBuilder {
        this.data.website = website;
        return this;
    }

    public withPhoneNo(phoneNo: string): CreateAccountAPIDataBuilder {
        this.data.phoneNo = phoneNo;
        return this;
    }

    public withIsUserAcceptedInvite(isUserAcceptedInvite: boolean): CreateAccountAPIDataBuilder {
        this.data.isUserAcceptedInvite = isUserAcceptedInvite;
        return this;
    }

    public withFirstName(firstName: string): CreateAccountAPIDataBuilder {
        this.data.firstName = firstName;
        return this;
    }

    public withLastName(lastName: string): CreateAccountAPIDataBuilder {
        this.data.lastName = lastName;
        return this;
    }

    public withAccountManager(accountManager: string): CreateAccountAPIDataBuilder {
        this.data.accountManager = accountManager;
        return this;
    }

    public build(): createAccountAPIData {
        return this.data;
    }
}
