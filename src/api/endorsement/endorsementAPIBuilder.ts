import { faker } from "@faker-js/faker";
import { calculateDate, commonUtils, getEpochTime } from "../../utils/commonUtils";

export interface createEndorsementAPIData {

    policyInfo: string;
    policyNum: string;
    agencyId: string;
    companyId: string;
    policyId: string;
    policyItemId: string;
    paymentMode: string;
    paymentType: string;
    ascendStatus: string;
    ascendStatusComment: string;
    changePolicyNum: string;
    newPolicyNum: string;
    isThisCancelRewrite: string;
    isThisAudit: string;
    endorsementDetail: EndorsementDetails;
    documents: Documnets[];
    notes: string;

}

export interface EndorsementDetails {
    endorsementType: string;
    endorsementAmount: string;
    effectiveDate: string;
    taxes: Taxes[];
    fees: Fees[];
    coverages: Coverages[];

}

export interface Documnets {

    docName: string;
    docKey: string;
    docType: string;
    comments: string;
}

export interface Taxes {

    taxType: string;
    taxAmount: string;

}
export interface Fees {

    feeType: string;
    feeAmount: string;

}

export interface Coverages {

    coverageType: string;
    locationLabel: string;
    limit: string;
    included: boolean;

}

export interface PolicyInfoData {
    agencyId: string;
    companyId: string;
    policyNum: string;
    policyId: string
}

export class createEndorsementAPIDataBuilder {

    private data: createEndorsementAPIData;

    constructor(environment: string = commonUtils.getEnvironment()) {
        this.data = this.getDefaultData(environment);
    }

    private getDefaultData(environment: string): createEndorsementAPIData {
        if (environment.length == 0) {
            throw new Error(`Unknown environment: ${environment}`);
        }
        return {
            "policyInfo": "Crime (BambinoSyncTest - Active) (05/01/2024 - 05/01/2025)",
            "policyNum": "BambinoSyncTest",
            agencyId: environment == "dev" ? 'da9a1c2e-49e1-46e6-9920-891f58336af8' : '84001287-4789-45f8-a399-16c9101f0fe6',
            companyId: environment == "dev" ? '3db7eb72-7214-4214-a7ab-7210406ec0c5' : 'f0735b6c-a54f-452c-939c-89e2859b5900',
            "policyId": "9a4a73da-e0b9-46fe-9c46-687b4dd643c2",
            "policyItemId": "84b839a5-23cd-4fb8-a130-6b1b34ecd187",
            "paymentMode": "",
            "paymentType": "Direct Bill by Carrier",
            "ascendStatus": "",
            "ascendStatusComment": "",
            "changePolicyNum": 'No',
            "newPolicyNum": "",
            "isThisCancelRewrite": 'No',
            "isThisAudit": 'No',
            "endorsementDetail": {
                "endorsementType": "Additional Premium",
                "endorsementAmount": '500',
                "effectiveDate": getEpochTime(calculateDate("+0")),
                "taxes": [
                    {
                        "taxType": "Others",
                        "taxAmount": '600',
                    }
                ],
                "fees": [
                    {
                        "feeType": "Wholesaler",
                        "feeAmount": '700',
                    }
                ],
                "coverages": [
                    {
                        "coverageType": "Products/Completed Operations Aggregate",
                        "locationLabel": "test",
                        "limit":'300',
                        "included": false
                    }
                ]
            },
            "documents": [
                {
                    "docName": "Screenshot 2024-05-07 at 1.46.40 PM.png",
                    "docKey": "public/tempPolicy/e670d13c-c514-435a-9fbc-5a7543f54602/policyDocuments/Screenshot 2024-05-07 at 1.46.40 PM.png",
                    "docType": "Endorsement",
                    "comments": "  upload comment"
                }
            ],
            "notes": faker.animal.bird()
        }
    }

    public withPolicyInfo(policyInfo: string): createEndorsementAPIDataBuilder {
        this.data.policyInfo = policyInfo;
        return this;
    }

    public withPolicyNum(policyNum: string): createEndorsementAPIDataBuilder {
        this.data.policyNum = policyNum;
        return this;
    }

    public withPolicyId(policyId: string): createEndorsementAPIDataBuilder {
        this.data.policyId = policyId;
        return this;
    }

    public withAgencyId(agencyId: string): createEndorsementAPIDataBuilder {
        this.data.agencyId = agencyId;
        return this;
    }

    public withCompanyId(companyId: string): createEndorsementAPIDataBuilder {
        this.data.companyId = companyId;
        return this;
    }

    public withPolicyItemId(policyItemId: string): createEndorsementAPIDataBuilder {
        this.data.policyItemId = policyItemId;
        return this;
    }

    public withPaymentType(paymentType: string): createEndorsementAPIDataBuilder {
        this.data.paymentType = paymentType;
        return this;
    }

    public withEndorsementDetail(endorsementDetail: any): createEndorsementAPIDataBuilder {
        this.data.endorsementDetail = endorsementDetail;
        return this;
    }

    public withDocuments(documents: any[]): createEndorsementAPIDataBuilder {
        this.data.documents = documents;
        return this;
    }

    public withNotes(notes: string): createEndorsementAPIDataBuilder {
        this.data.notes = notes;
        return this;
    }

    public build(): createEndorsementAPIData {
        return this.data;
    }
}
