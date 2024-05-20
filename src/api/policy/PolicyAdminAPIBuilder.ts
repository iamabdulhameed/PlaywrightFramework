import { faker } from "@faker-js/faker/locale/en_US";
import { calculateDate, commonUtils, getEpochTime, getRandomAlphaNumericString } from "../../utils/commonUtils";
import { policyTemplates } from "./PolicyTemplates";

export interface createPolicyAPIData {
    agencyId: string;
    agencyName: string;
    companyId: string;
    companyName: string;
    customerEmail: string;
    policyNum: string;
    policyHeader: PolicyHeader;
    primaryPolicyType: string;
    policyDetails: PolicyDetail[];
    billingDetails: BillingDetails;
    documents: Document[];
    notes: string;
}

export interface PolicyHeader {
    customerFirstName: string;
    customerLastName: string;
    carrier: string;
    wholesaler: string;
    issuingCarrier: string;
    customerPhoneNum: string;
    effectiveDate: string;
    expirationDate: string
    qualifiesForCarriersAutoRenewal: string;
}

export interface PolicyDetail {
    policyType: string;
    policyStatus: string;
    statusReason: string;
    isPrimary: boolean;
    cancellationPending: string;
    deductible: string;
    isThisPolicyClaimMade: string;
    aggregateLimitAppliesPer: string;
    otherStatusReason: string;
    fullPriorActs: string;
    retroActiveDate: string;
    hiredCarLiability: string;
    otherAggregateLimitApplication: string;
    coInsurance: string;
    businessIncomeTerm: string;
    coInsurancePercentage: string;
    limitsApplyPer: string;
    areOfficersExcluded: string;
    listExcludedOfficers: string;
    renewalStatus: string;
    otherPolicy: boolean;
    borDate: string;
    otherLimitApplication: string;
    coverages: Coverage[];
    exposureBasis: ExposureBasis[];
    otherDetails: OtherDetails;
    whatTypeOfAutoPolicyIsThis: string;
}

export interface Coverage {
    coverageType: string;
    limit: string;
    locationLabel: string;
}

export interface ExposureBasis {
    basis: string;
    total: string;
    state: string;
}

export interface OtherDetails {
    waiverSubrogation: string;
    blanketAdditionalInsured: string;
}

export interface BillingDetails {
    grossPremium: string;
    paymentType: string;
    agencyFees: string;
    commission: string;
    minimumEarnedRate: string;
    paymentMode: string;
    ascendStatus: string;
    ascendStatusComment: string;
    minimumEarnedAmount: string;
    taxes: Tax[];
    fees: Fee[];
}

export interface Tax {
    taxAmount: string;
    taxType: string;
}

export interface Fee {
    feeAmount: string;
    feeType: string;
}

export interface Document {
    docName: string;
    docKey: string;
    docType: string;
    comments: string;
}

export class CreatePolicyAPIDataBuilder {   
    private data: createPolicyAPIData;

    constructor(policyTypes: string[], environment: string = commonUtils.getEnvironment()) {
        this.data = this.getDefaultData(environment);
        let flag = true;
        this.data.policyDetails.pop();
        policyTypes.forEach(policy => {
            switch (policy) {
                case "GL":
                    this.addPolicy(policyTemplates.getGeneralLiability());
                    if (flag) {
                        this.withPrimaryPolicyType("General Liability")
                        this.data.policyDetails[0].isPrimary = true;
                    }
                    flag = false;
                    break;

                case "AL":
                    this.addPolicy(policyTemplates.getAutoLiability());
                    if (flag) {
                        this.withPrimaryPolicyType("Auto Liability")
                        this.data.policyDetails[0].isPrimary = true;
                    }
                    flag = false;
                    break;

                case "COM":
                    this.addPolicy(policyTemplates.getCommercialPackage());
                    if (flag) {
                        this.withPrimaryPolicyType("Commercial Package (GL, Auto, Property)")
                        this.data.policyDetails[0].isPrimary = true;
                    }
                    flag = false;
                    break;

                case "OTH":
                    let otherPolicy = policyTemplates.getOtherTypeOfPolicy(getRandomAlphaNumericString(6));
                    this.addPolicy(otherPolicy);
                    if (flag) {
                        this.withPrimaryPolicyType(otherPolicy.policyType)
                        this.data.policyDetails[0].isPrimary = true;
                    }
                    flag = false;
                    break;
            }
        })
    }

    private getDefaultData(environment: string): createPolicyAPIData {
        if (environment.length == 0) {
            throw new Error(`Unknown environment: ${environment}`);
        }
        return {
            agencyId: environment == "dev" ? 'da9a1c2e-49e1-46e6-9920-891f58336af8' : '84001287-4789-45f8-a399-16c9101f0fe6',
            agencyName: 'Layr Automation',
            companyId: environment == "dev" ? '3db7eb72-7214-4214-a7ab-7210406ec0c5' : 'f0735b6c-a54f-452c-939c-89e2859b5900',
            companyName: 'Automation Account',
            customerEmail: 'cypresscustomer8@layrins.com',
            policyNum: `DataGen_Policy_${getRandomAlphaNumericString(6)}`,
            policyHeader: {
                customerFirstName: 'cypress',
                customerLastName: 'customer8',
                carrier: 'AIG',
                wholesaler: 'AJ Wayne',
                issuingCarrier: '10324',
                customerPhoneNum: '(987) 654-3211',
                effectiveDate: getEpochTime(calculateDate("+0")),
                expirationDate: getEpochTime(calculateDate("+1461")),
                qualifiesForCarriersAutoRenewal: '',
            },
            primaryPolicyType: 'General Liability',
            policyDetails: [
                {
                    policyType: 'General Liability',
                    policyStatus: 'Active',
                    statusReason: 'Active/New',
                    isPrimary: true,
                    cancellationPending: 'No',
                    deductible: '100',
                    isThisPolicyClaimMade: 'No',
                    aggregateLimitAppliesPer: 'LOC',
                    otherStatusReason: '',
                    fullPriorActs: '',
                    retroActiveDate: '',
                    hiredCarLiability: 'No',
                    otherAggregateLimitApplication: '',
                    coInsurance: '',
                    businessIncomeTerm: '10',
                    coInsurancePercentage: '',
                    limitsApplyPer: '',
                    areOfficersExcluded: '',
                    listExcludedOfficers: '',
                    renewalStatus: '',
                    otherPolicy: false,
                    borDate: '',
                    otherLimitApplication: '',
                    coverages: [
                        {
                            coverageType: 'Each Occurrence',
                            limit: '10,000',
                            locationLabel: 'label 1',
                        },
                        {
                            coverageType: 'General Aggregate',
                            limit: '20,000',
                            locationLabel: 'label 2',
                        },
                    ],
                    exposureBasis: [
                        {
                            basis: 'Payroll',
                            total: '1500',
                            state: 'NY',
                        },
                        {
                            basis: 'Area (Sq. Footage, Acres, etc.)',
                            total: '3000',
                            state: 'CA',
                        },
                    ],
                    otherDetails: {
                        waiverSubrogation: 'Yes',
                        blanketAdditionalInsured: 'Yes',
                    },
                    whatTypeOfAutoPolicyIsThis: 'Owned Autos',
                },
            ],
            billingDetails: {
                grossPremium: '10,000',
                paymentType: 'Agency',
                agencyFees: '100',
                commission: '10',
                minimumEarnedRate: '10',
                paymentMode: 'Ascend',
                ascendStatus: 'Invoice Pending',
                ascendStatusComment: '',
                minimumEarnedAmount: '1000.00',
                taxes: [
                    {
                        taxAmount: '1,000',
                        taxType: 'Surplus Lines',
                    },
                    {
                        taxAmount: '1,000',
                        taxType: 'Others',
                    },
                ],
                fees: [
                    {
                        feeAmount: '1,000',
                        feeType: 'Wholesaler',
                    },
                    {
                        feeAmount: '1,000',
                        feeType: 'Carrier',
                    },
                ],
            },
            documents: [
                {
                    docName: 'CypressE&O.pdf',
                    docKey: 'public/tempPolicy/3db7eb72-7214-4214-a7ab-7210406ec0c5/policyDocuments/CypressE&O.pdf',
                    docType: 'Policy',
                    comments: 'Policy Comment 1',
                },
                {
                    docName: 'CypressTesting.pdf',
                    docKey: 'public/tempPolicy/3db7eb72-7214-4214-a7ab-7210406ec0c5/policyDocuments/CypressTesting.pdf',
                    docType: 'Endorsement',
                    comments: 'Policy Comment 2',
                },
            ],
            notes: 'Ipsum officia tempor incididunt nisi excepteur dolor.',
        };
    }

    public addPolicy(policy: Partial<PolicyDetail>): CreatePolicyAPIDataBuilder {
        this.data.policyDetails.push(policy as PolicyDetail);
        return this;
    }

    public withAgencyId(agencyId: string): CreatePolicyAPIDataBuilder {
        this.data.agencyId = agencyId;
        return this;
    }

    public withAgencyName(agencyName: string): CreatePolicyAPIDataBuilder {
        this.data.agencyName = agencyName;
        return this;
    }

    public withCompanyId(companyId: string): CreatePolicyAPIDataBuilder {
        this.data.companyId = companyId;
        return this;
    }

    public withCompanyName(companyName: string): CreatePolicyAPIDataBuilder {
        this.data.companyName = companyName;
        return this;
    }

    public withPrimaryPolicyType(primaryPolicyType: string): CreatePolicyAPIDataBuilder {
        this.data.primaryPolicyType = primaryPolicyType;
        return this;
    }

    public withCarrier(carrier: string): CreatePolicyAPIDataBuilder {
        this.data.policyHeader.carrier = carrier;
        return this;
    }

    public withCoverageLimit(index: number, limit: string): CreatePolicyAPIDataBuilder {
        if (this.data.policyDetails[index] && this.data.policyDetails[index].coverages) {
            this.data.policyDetails[index].coverages[0].limit = limit;
        }
        return this;
    }

    public withDocument(docIndex: number, docName: string, docKey: string, docType: string, comments: string): CreatePolicyAPIDataBuilder {
        if (this.data.documents[docIndex]) {
            this.data.documents[docIndex] = { docName, docKey, docType, comments };
        }
        return this;
    }

    public build(): createPolicyAPIData {
        this.withDocument(0, policyTemplates.getDocNames().docName1,
            `public/tempPolicy/${this.data.companyId}/policyDocuments/${policyTemplates.getDocNames().docName1}`,
            "Policy", "Policy Comment 1");

        this.withDocument(1, policyTemplates.getDocNames().docName2,
            `public/tempPolicy/${this.data.companyId}/policyDocuments/${policyTemplates.getDocNames().docName2}`,
            "Endorsement", "Policy Comment 2");

        return this.data;
    }
}