import { faker } from "@faker-js/faker/locale/en_US";
import { calculateDate, commonUtils, getEpochTime, getRandomAlphaNumericString, getRandomPhoneNumber } from "../../utils/commonUtils";

export interface createAgencyDraftAPIData {
    emailId: string;
    draftName: string;
    agencyName: string;
    value: {
        basicDetails: AgencyBasicDetails;
        businessAddress: AgencyAddress;
        billingAddress: AgencyBillingAddress;
        primaryContact: AgencyPrimaryContact;
    };
}

export interface createAgencyBasicDetailsAPIData {
    emailId: string;
    draftId: string;
    key: "agencyDetails"; // Key is always "agencyDetails"
    value: {
        basicDetails: AgencyBasicDetails;
        businessAddress: AgencyAddress;
        billingAddress: AgencyBillingAddress;
        primaryContact: AgencyPrimaryContact;
    };
}

export interface createAgencyLogoAndDetailsAPIData {
    emailId: string;
    draftId: string;
    key: "branding"; // Key is always "branding"
    value: AgencyBrandingDetails;
}

export interface createAgencyBillingDetailsAPIData {
    emailId: string;
    draftId: string;
    key: "billing"; // Key is always "billing"
    value: AgencyBillingDetails;
}

export interface createAgencyLicenseDetailsAPIData {
    emailId: string;
    draftId: string;
    key: "license"; // Key is always "license"
    value: AgencyLicenseDetails[];
}

export interface createAgencyCarrierDetailsAPIData {
    emailId: string;
    draftId: string;
    key: "carrier"; // Key is always "carrier"
    value: CarrierUpdate[];
}

export interface createAgencyEODetailsAPIData {
    emailId: string;
    draftId: string;
    key: "errorsAndOmissions"; // Key is always "errorsAndOmissions"
    value: AgencyEODetails;
}

export interface createAgencyAPIData {
    emailId: string;
    draftId: string;
    loggedInUserName: string;
    loggedInUserRole: string;
}

interface AgencyEODetails {
    files: AgencyEODocs[];
}

interface AgencyEODocs {
    fileName: string;
    validFrom: number;
    validTo: number;
    fileId: string;
}


interface CarrierUpdate {
    carrierId: string;
    carrierName: string;
    service_portal_url: string;
    sub_producer_code: string;
}


interface AgencyLicenseDetails {
    state: string;
    expirationDate: number;
    holderName: string;
    licenseNumber: string;
    licenseId: string;
    action: "add" | "update" | "delete";
}


interface AgencyBillingDetails {
    billingStructure: string;
    contractDate: number;
    billingNotes: string;
    billingFiles: string[]; // Array of strings representing file paths or URLs
    expirationDate: number;
    fullName: string;
    email: string;
    address: string;
    suite: string;
    city: string;
    state: string;
    zipCode: string;
}


interface AgencyBrandingDetails {
    primaryColor: string;
    secondaryColor: string;
    primaryLogo: string;
    secondaryLogo: string;
    coBrandedByLayr: string;
    portalUrl: string;
    brandLine: string;
}

interface AgencyBasicDetails {
    agencyName: string;
    businessWebsite: string;
    emailId: string;
    phoneNumber: string;
    fein: string;
    heraldProducerId: string;
    naicsCode: string[];
}

interface AgencyAddress {
    streetAddress: string;
    suite: string;
    city: string;
    state: string;
    zipCode: string;
}

interface AgencyBillingAddress {
    streetAddress2: string;
    suite2: string;
    city2: string;
    state2: string;
    zipCode2: string;
    checkbox: boolean;
}

interface AgencyPrimaryContact {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
}

let emailId: string;
let draftName: string;
let agencyName: string;
let supportMailId: string;
let primaryContactEmailId: string;
let portalUrl: string;
let contractDate: number;
let createdDate: number;
let expiryDate: number;
let licenseNum: string;
let licenseId: string;

let randomizeAgencyData = () => {
    emailId = "cypresssuperadmin@layrins.com";
    draftName = 'datagen_agencydetails';
    agencyName = `DataGen_Agency${getRandomAlphaNumericString(6)}`;
    supportMailId = `agency.supprt+${getRandomAlphaNumericString(6)}@layrins.com`;
    primaryContactEmailId = `agency.primaryEmail+${getRandomAlphaNumericString(6)}@layrins.com`;
    portalUrl = `datagenagency${getRandomAlphaNumericString(6)}`.toLowerCase();
    contractDate = Number(getEpochTime(calculateDate('+3')));
    createdDate = Number(getEpochTime(calculateDate('+5')));
    expiryDate = Number(getEpochTime(calculateDate('+10')));
    licenseNum = `datagen_License${getRandomAlphaNumericString(6)}`;
    licenseId = getRandomAlphaNumericString(21);
}

let valueData: {
    basicDetails: AgencyBasicDetails;
    businessAddress: AgencyAddress;
    billingAddress: AgencyBillingAddress;
    primaryContact: AgencyPrimaryContact;
};

export class CreateAgencyAPIDraftIdBuilder {
    private data: createAgencyDraftAPIData;

    constructor() {
        randomizeAgencyData();
        valueData = {
            "basicDetails": {
                "agencyName": agencyName,
                "businessWebsite": faker.internet.url(),
                "emailId": supportMailId,
                "fein": "",
                "heraldProducerId": "",
                "naicsCode": [],
                "phoneNumber": getRandomPhoneNumber()
            },
            "businessAddress": {
                "streetAddress": faker.location.street(),
                "suite": faker.location.buildingNumber(),
                "city": faker.location.city(),
                "state": faker.location.state(),
                "zipCode": faker.location.zipCode()
            },
            "billingAddress": {
                "streetAddress2": faker.location.street(),
                "suite2": faker.location.buildingNumber(),
                "city2": faker.location.city(),
                "state2": faker.location.state(),
                "zipCode2": faker.location.zipCode(),
                "checkbox": true
            },
            "primaryContact": {
                "firstName": faker.person.firstName(),
                "lastName": faker.person.lastName(),
                "email": primaryContactEmailId,
                "phone": getRandomPhoneNumber(),
                "role": "agencyAccountManager"
            }
        }
        this.data = this.getDefaultData();
    }

    private getDefaultData(): createAgencyDraftAPIData {
        return {
            "emailId": emailId,
            "draftName": draftName,
            "agencyName": agencyName,
            "value": valueData
        };
    }

    public withAgencyName(agencyName: string): CreateAgencyAPIDraftIdBuilder {
        this.data.agencyName = agencyName;
        this.data.value.basicDetails.agencyName = agencyName;
        return this;
    }

    public withDraftName(draftName: string): CreateAgencyAPIDraftIdBuilder {
        this.data.draftName = draftName;
        return this;
    }

    public withEmailId(emailId: string): CreateAgencyAPIDraftIdBuilder {
        this.data.emailId = emailId;
        return this;
    }

    public withBusinessWebsite(businessWebsite: string): CreateAgencyAPIDraftIdBuilder {
        this.data.value.basicDetails.businessWebsite = businessWebsite;
        return this;
    }

    public withSupportEmailId(emailId: string): CreateAgencyAPIDraftIdBuilder {
        this.data.value.basicDetails.emailId = emailId;
        return this;
    }

    public withFein(fein: string): CreateAgencyAPIDraftIdBuilder {
        this.data.value.basicDetails.fein = fein;
        return this;
    }

    public withHeraldProducerId(heraldProducerId: string): CreateAgencyAPIDraftIdBuilder {
        this.data.value.basicDetails.heraldProducerId = heraldProducerId;
        return this;
    }

    public withNaicsCode(naicsCode: string[]): CreateAgencyAPIDraftIdBuilder {
        this.data.value.basicDetails.naicsCode = naicsCode;
        return this;
    }

    public withPhoneNumberBasicDetails(phoneNumber: string): CreateAgencyAPIDraftIdBuilder {
        this.data.value.basicDetails.phoneNumber = phoneNumber;
        return this;
    }

    public withStreetAddress(streetAddress: string): CreateAgencyAPIDraftIdBuilder {
        this.data.value.businessAddress.streetAddress = streetAddress;
        return this;
    }

    public withSuite(suite: string): CreateAgencyAPIDraftIdBuilder {
        this.data.value.businessAddress.suite = suite;
        return this;
    }

    public withCity(city: string): CreateAgencyAPIDraftIdBuilder {
        this.data.value.businessAddress.city = city;
        return this;
    }

    public withState(state: string): CreateAgencyAPIDraftIdBuilder {
        this.data.value.businessAddress.state = state;
        return this;
    }

    public withZipCode(zipCode: string): CreateAgencyAPIDraftIdBuilder {
        this.data.value.businessAddress.zipCode = zipCode;
        return this;
    }

    public withStreetAddress2(streetAddress2: string): CreateAgencyAPIDraftIdBuilder {
        this.data.value.billingAddress.streetAddress2 = streetAddress2;
        return this;
    }

    public withSuite2(suite2: string): CreateAgencyAPIDraftIdBuilder {
        this.data.value.billingAddress.suite2 = suite2;
        return this;
    }

    public withCity2(city2: string): CreateAgencyAPIDraftIdBuilder {
        this.data.value.billingAddress.city2 = city2;
        return this;
    }

    public withState2(state2: string): CreateAgencyAPIDraftIdBuilder {
        this.data.value.billingAddress.state2 = state2;
        return this;
    }

    public withZipCode2(zipCode2: string): CreateAgencyAPIDraftIdBuilder {
        this.data.value.billingAddress.zipCode2 = zipCode2;
        return this;
    }

    public withCheckbox(checkbox: boolean): CreateAgencyAPIDraftIdBuilder {
        this.data.value.billingAddress.checkbox = checkbox;
        return this;
    }

    public withFirstName(firstName: string): CreateAgencyAPIDraftIdBuilder {
        this.data.value.primaryContact.firstName = firstName;
        return this;
    }

    public withLastName(lastName: string): CreateAgencyAPIDraftIdBuilder {
        this.data.value.primaryContact.lastName = lastName;
        return this;
    }

    public withPrimaryContactEmail(email: string): CreateAgencyAPIDraftIdBuilder {
        this.data.value.primaryContact.email = email;
        return this;
    }

    public withPrimaryContactPhone(phone: string): CreateAgencyAPIDraftIdBuilder {
        this.data.value.primaryContact.phone = phone;
        return this;
    }

    public withRole(role: string): CreateAgencyAPIDraftIdBuilder {
        this.data.value.primaryContact.role = role;
        return this;
    }

    public build(): createAgencyDraftAPIData {
        return this.data;
    }
}

export class CreateAgencyAPIBasicDetailsBuilder {
    private data: createAgencyBasicDetailsAPIData;

    constructor() {
        this.data = this.getDefaultData();
    }

    private getDefaultData(): createAgencyBasicDetailsAPIData {
        return {
            "emailId": emailId,
            "draftId": "",
            "key": "agencyDetails",
            "value": valueData
        };
    }

    public withDraftId(draftId: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.draftId = draftId;
        return this;
    }

    public withEmailId(emailId: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.emailId = emailId;
        return this;
    }

    public withBusinessWebsite(businessWebsite: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.basicDetails.businessWebsite = businessWebsite;
        return this;
    }

    public withSupportEmailId(emailId: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.basicDetails.emailId = emailId;
        return this;
    }

    public withFein(fein: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.basicDetails.fein = fein;
        return this;
    }

    public withHeraldProducerId(heraldProducerId: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.basicDetails.heraldProducerId = heraldProducerId;
        return this;
    }

    public withNaicsCode(naicsCode: string[]): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.basicDetails.naicsCode = naicsCode;
        return this;
    }

    public withPhoneNumberBasicDetails(phoneNumber: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.basicDetails.phoneNumber = phoneNumber;
        return this;
    }

    public withStreetAddress(streetAddress: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.businessAddress.streetAddress = streetAddress;
        return this;
    }

    public withSuite(suite: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.businessAddress.suite = suite;
        return this;
    }

    public withCity(city: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.businessAddress.city = city;
        return this;
    }

    public withState(state: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.businessAddress.state = state;
        return this;
    }

    public withZipCode(zipCode: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.businessAddress.zipCode = zipCode;
        return this;
    }

    public withStreetAddress2(streetAddress2: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.billingAddress.streetAddress2 = streetAddress2;
        return this;
    }

    public withSuite2(suite2: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.billingAddress.suite2 = suite2;
        return this;
    }

    public withCity2(city2: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.billingAddress.city2 = city2;
        return this;
    }

    public withState2(state2: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.billingAddress.state2 = state2;
        return this;
    }

    public withZipCode2(zipCode2: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.billingAddress.zipCode2 = zipCode2;
        return this;
    }

    public withCheckbox(checkbox: boolean): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.billingAddress.checkbox = checkbox;
        return this;
    }

    public withFirstName(firstName: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.primaryContact.firstName = firstName;
        return this;
    }

    public withLastName(lastName: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.primaryContact.lastName = lastName;
        return this;
    }

    public withPrimaryContactEmail(email: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.primaryContact.email = email;
        return this;
    }

    public withPrimaryContactPhone(phone: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.primaryContact.phone = phone;
        return this;
    }

    public withRole(role: string): CreateAgencyAPIBasicDetailsBuilder {
        this.data.value.primaryContact.role = role;
        return this;
    }

    public build(): createAgencyBasicDetailsAPIData {
        return this.data;
    }
}

export class CreateAgencyAPILogoAndDetailsBuilder {
    private data: createAgencyLogoAndDetailsAPIData;

    constructor() {
        this.data = this.getDefaultData();
    }

    private getDefaultData(): createAgencyLogoAndDetailsAPIData {
        return {
            "emailId": emailId,
            "draftId": "",
            "key": "branding",
            "value": {
                "primaryColor": faker.color.rgb(),
                "secondaryColor": faker.color.rgb(),
                "primaryLogo": "public/tempPolicy/image1.jpg",
                "secondaryLogo": "public/tempPolicy/image2.jpg",
                "coBrandedByLayr": "no",
                "portalUrl": portalUrl,
                "brandLine": ""
            }
        };
    }

    public withEmailId(emailId: string): CreateAgencyAPILogoAndDetailsBuilder {
        this.data.emailId = emailId;
        return this;
    }

    public withDraftId(draftId: string): CreateAgencyAPILogoAndDetailsBuilder {
        this.data.draftId = draftId;
        return this;
    }

    public withPrimaryColor(primaryColor: string): CreateAgencyAPILogoAndDetailsBuilder {
        this.data.value.primaryColor = primaryColor;
        return this;
    }

    public withSecondaryColor(secondaryColor: string): CreateAgencyAPILogoAndDetailsBuilder {
        this.data.value.secondaryColor = secondaryColor;
        return this;
    }

    public withPrimaryLogo(primaryLogo: string): CreateAgencyAPILogoAndDetailsBuilder {
        this.data.value.primaryLogo = primaryLogo;
        return this;
    }

    public withSecondaryLogo(secondaryLogo: string): CreateAgencyAPILogoAndDetailsBuilder {
        this.data.value.secondaryLogo = secondaryLogo;
        return this;
    }

    public withCoBrandedByLayr(coBrandedByLayr: string): CreateAgencyAPILogoAndDetailsBuilder {
        this.data.value.coBrandedByLayr = coBrandedByLayr;
        return this;
    }

    public withPortalUrl(portalUrl: string): CreateAgencyAPILogoAndDetailsBuilder {
        this.data.value.portalUrl = portalUrl;
        return this;
    }

    public withBrandLine(brandLine: string): CreateAgencyAPILogoAndDetailsBuilder {
        this.data.value.brandLine = brandLine;
        return this;
    }

    public build(): createAgencyLogoAndDetailsAPIData {
        return this.data;
    }
}

export class CreateAgencyAPIBillingDetailsBuilder {
    private data: createAgencyBillingDetailsAPIData;

    constructor() {
        this.data = this.getDefaultData();
    }

    private getDefaultData(): createAgencyBillingDetailsAPIData {
        return {
            "emailId": emailId,
            "draftId": "",
            "key": "billing",
            "value": {
                "billingStructure": "Premium Basis Points",
                "contractDate": contractDate,
                "billingNotes": `billing_notes_${getRandomAlphaNumericString(10)}`,
                "billingFiles": [],
                "expirationDate": expiryDate,
                "fullName": `FullName_${getRandomAlphaNumericString(6)}`,
                "email": faker.internet.email({ provider: "layrins.com" }),
                "address": faker.location.street(),
                "suite": faker.location.buildingNumber(),
                "city": faker.location.city(),
                "state": faker.location.state(),
                "zipCode": faker.location.zipCode()
            }
        };
    }

    public withEmailId(emailId: string): CreateAgencyAPIBillingDetailsBuilder {
        this.data.emailId = emailId;
        return this;
    }

    public withDraftId(draftId: string): CreateAgencyAPIBillingDetailsBuilder {
        this.data.draftId = draftId;
        return this;
    }

    public withBillingStructure(billingStructure: string): CreateAgencyAPIBillingDetailsBuilder {
        this.data.value.billingStructure = billingStructure;
        return this;
    }

    public withContractDate(contractDate: number): CreateAgencyAPIBillingDetailsBuilder {
        this.data.value.contractDate = contractDate;
        return this;
    }

    public withBillingNotes(billingNotes: string): CreateAgencyAPIBillingDetailsBuilder {
        this.data.value.billingNotes = billingNotes;
        return this;
    }

    public withBillingFiles(billingFiles: string[]): CreateAgencyAPIBillingDetailsBuilder {
        this.data.value.billingFiles = billingFiles;
        return this;
    }

    public withExpirationDate(expirationDate: number): CreateAgencyAPIBillingDetailsBuilder {
        this.data.value.expirationDate = expirationDate;
        return this;
    }

    public withFullName(fullName: string): CreateAgencyAPIBillingDetailsBuilder {
        this.data.value.fullName = fullName;
        return this;
    }

    public withEmailBillingDetails(email: string): CreateAgencyAPIBillingDetailsBuilder {
        this.data.value.email = email;
        return this;
    }

    public withAddress(address: string): CreateAgencyAPIBillingDetailsBuilder {
        this.data.value.address = address;
        return this;
    }

    public withSuite(suite: string): CreateAgencyAPIBillingDetailsBuilder {
        this.data.value.suite = suite;
        return this;
    }

    public withCity(city: string): CreateAgencyAPIBillingDetailsBuilder {
        this.data.value.city = city;
        return this;
    }

    public withState(state: string): CreateAgencyAPIBillingDetailsBuilder {
        this.data.value.state = state;
        return this;
    }

    public withZipCode(zipCode: string): CreateAgencyAPIBillingDetailsBuilder {
        this.data.value.zipCode = zipCode;
        return this;
    }

    public build(): createAgencyBillingDetailsAPIData {
        return this.data;
    }
}

export class CreateAgencyAPILicenseDetailsBuilder {
    private data: createAgencyLicenseDetailsAPIData;

    constructor() {
        this.data = this.getDefaultData();
    }

    private getDefaultData(): createAgencyLicenseDetailsAPIData {
        return {
            "emailId": emailId,
            "draftId": "",
            "key": "license",
            "value": [
                {
                    "state": "California",
                    "expirationDate": expiryDate,
                    "holderName": `License_Holder_${getRandomAlphaNumericString(6)}`,
                    "licenseNumber": licenseNum,
                    "licenseId": licenseId,
                    "action": "add"
                }
            ]
        };
    }

    public withEmailId(emailId: string): CreateAgencyAPILicenseDetailsBuilder {
        this.data.emailId = emailId;
        return this;
    }

    public withDraftId(draftId: string): CreateAgencyAPILicenseDetailsBuilder {
        this.data.draftId = draftId;
        return this;
    }

    public withState(state: string): CreateAgencyAPILicenseDetailsBuilder {
        if (this.data.value.length > 0) {
            this.data.value[0].state = state;
        }
        return this;
    }

    public withExpirationDate(expirationDate: number): CreateAgencyAPILicenseDetailsBuilder {
        if (this.data.value.length > 0) {
            this.data.value[0].expirationDate = expirationDate;
        }
        return this;
    }

    public withHolderName(holderName: string): CreateAgencyAPILicenseDetailsBuilder {
        if (this.data.value.length > 0) {
            this.data.value[0].holderName = holderName;
        }
        return this;
    }

    public withLicenseNumber(licenseNumber: string): CreateAgencyAPILicenseDetailsBuilder {
        if (this.data.value.length > 0) {
            this.data.value[0].licenseNumber = licenseNumber;
        }
        return this;
    }

    public withLicenseId(licenseId: string): CreateAgencyAPILicenseDetailsBuilder {
        if (this.data.value.length > 0) {
            this.data.value[0].licenseId = licenseId;
        }
        return this;
    }

    public withNewLicense(data: AgencyLicenseDetails): CreateAgencyAPILicenseDetailsBuilder {
        this.data.value.push(data);
        return this;
    }

    public build(): createAgencyLicenseDetailsAPIData {
        return this.data;
    }
}

export class CreateAgencyAPICarrierDetailsBuilder {
    private data: createAgencyCarrierDetailsAPIData;

    constructor() {
        this.data = this.getDefaultData();
    }

    private getDefaultData(): createAgencyCarrierDetailsAPIData {
        return {
            "emailId": emailId,
            "draftId": "",
            "key": "carrier",
            "value": [
                {
                    "carrierId": "AMCO",
                    "carrierName": "Lancer Insurance Company",
                    "service_portal_url": "https://testcarrier",
                    "sub_producer_code": "testcode"
                }
            ]
        };
    }

    public withEmailId(emailId: string): CreateAgencyAPICarrierDetailsBuilder {
        this.data.emailId = emailId;
        return this;
    }

    public withDraftId(draftId: string): CreateAgencyAPICarrierDetailsBuilder {
        this.data.draftId = draftId;
        return this;
    }

    public withCarrierId(carrierId: string): CreateAgencyAPICarrierDetailsBuilder {
        if (this.data.value.length > 0) {
            this.data.value[0].carrierId = carrierId;
        }
        return this;
    }

    public withCarrierName(carrierName: string): CreateAgencyAPICarrierDetailsBuilder {
        if (this.data.value.length > 0) {
            this.data.value[0].carrierName = carrierName;
        }
        return this;
    }

    public withServicePortalUrl(servicePortalUrl: string): CreateAgencyAPICarrierDetailsBuilder {
        if (this.data.value.length > 0) {
            this.data.value[0].service_portal_url = servicePortalUrl;
        }
        return this;
    }

    public withSubProducerCode(subProducerCode: string): CreateAgencyAPICarrierDetailsBuilder {
        if (this.data.value.length > 0) {
            this.data.value[0].sub_producer_code = subProducerCode;
        }
        return this;
    }

    public withNewCarrier(data: CarrierUpdate): CreateAgencyAPICarrierDetailsBuilder {
        this.data.value.push(data);
        return this;
    }

    public build(): createAgencyCarrierDetailsAPIData {
        return this.data;
    }
}

export class CreateAgencyAPIEODetailsBuilder {
    private data: createAgencyEODetailsAPIData;

    constructor() {
        this.data = this.getDefaultData();
    }

    private getDefaultData(): createAgencyEODetailsAPIData {
        return {
            "emailId": emailId,
            "draftId": "",
            "key": "errorsAndOmissions",
            "value": {
                "files": [
                    {
                        "fileName": "public/tempPolicy/automationcompany2cypresscustomer9@layrins.com/policyDocuments/CypressE&O.pdf",
                        "validFrom": createdDate,
                        "validTo": expiryDate,
                        "fileId": getRandomAlphaNumericString(21)
                    }
                ]
            }
        };
    }

    public withEmailId(emailId: string): CreateAgencyAPIEODetailsBuilder {
        this.data.emailId = emailId;
        return this;
    }

    public withDraftId(draftId: string): CreateAgencyAPIEODetailsBuilder {
        this.data.draftId = draftId;
        return this;
    }

    public withFileName(fileName: string): CreateAgencyAPIEODetailsBuilder {
        if (this.data.value.files.length > 0) {
            this.data.value.files[0].fileName = fileName;
        }
        return this;
    }

    public withValidFrom(validFrom: number): CreateAgencyAPIEODetailsBuilder {
        if (this.data.value.files.length > 0) {
            this.data.value.files[0].validFrom = validFrom;
        }
        return this;
    }

    public withValidTo(validTo: number): CreateAgencyAPIEODetailsBuilder {
        if (this.data.value.files.length > 0) {
            this.data.value.files[0].validTo = validTo;
        }
        return this;
    }

    public withFileId(fileId: string): CreateAgencyAPIEODetailsBuilder {
        if (this.data.value.files.length > 0) {
            this.data.value.files[0].fileId = fileId;
        }
        return this;
    }

    public withNewFile(newFileData: AgencyEODocs): CreateAgencyAPIEODetailsBuilder {
        this.data.value.files.push(newFileData)
        return this;
    }

    public build(): createAgencyEODetailsAPIData {
        return this.data;
    }
}

export class CreateAgencyAPIBuilder {
    private data: createAgencyAPIData;

    constructor() {
        this.data = this.getDefaultData();
    }

    private getDefaultData(): createAgencyAPIData {
        return {
            "emailId": emailId,
            "draftId": "",
            "loggedInUserName": 'Cypress User',
            "loggedInUserRole": "Super Admin"
        };
    }

    public withEmailId(emailId: string): CreateAgencyAPIBuilder {
        this.data.emailId = emailId;
        return this;
    }

    public withDraftId(draftId: string): CreateAgencyAPIBuilder {
        this.data.draftId = draftId;
        return this;
    }

    public withLoggedInUserName(loggedInUserName: string): CreateAgencyAPIBuilder {
        this.data.loggedInUserName = loggedInUserName;
        return this;
    }

    public withLoggedInUserRole(loggedInUserRole: string): CreateAgencyAPIBuilder {
        this.data.loggedInUserRole = loggedInUserRole;
        return this;
    }

    public build(): createAgencyAPIData {
        return this.data;
    }
}

