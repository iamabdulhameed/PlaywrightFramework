import { PolicyDetail } from "./PolicyAdminAPIBuilder"

let getGeneralLiability = (): PolicyDetail => {
    return {
        "policyType": "General Liability",
        "policyStatus": "Active",
        "statusReason": "Active/New",
        "isPrimary": false,
        "cancellationPending": "No",
        "deductible": "100",
        "isThisPolicyClaimMade": "No",
        "aggregateLimitAppliesPer": "LOC",
        "otherStatusReason": "",
        "fullPriorActs": "",
        "retroActiveDate": "",
        "hiredCarLiability": "No",
        "otherAggregateLimitApplication": "",
        "coInsurance": "",
        "businessIncomeTerm": "10",
        "coInsurancePercentage": "",
        "limitsApplyPer": "",
        "areOfficersExcluded": "",
        "listExcludedOfficers": "",
        "renewalStatus": "",
        "otherPolicy": false,
        "borDate": "",
        "otherLimitApplication": "",
        "coverages": [
            {
                "coverageType": "Each Occurrence",
                "limit": "10,000",
                "locationLabel": "label 1"
            },
            {
                "coverageType": "General Aggregate",
                "limit": "20,000",
                "locationLabel": "label 2"
            }
        ],
        "exposureBasis": [
            {
                "basis": "Payroll",
                "total": "1500",
                "state": "NY"
            },
            {
                "basis": "Area (Sq. Footage, Acres, etc.)",
                "total": "3000",
                "state": "CA"
            }
        ],
        "otherDetails": {
            "waiverSubrogation": "Yes",
            "blanketAdditionalInsured": "Yes"
        },
        "whatTypeOfAutoPolicyIsThis": "Owned Autos"
    }
}

let getAutoLiability = (): PolicyDetail => {
    return {
        "policyType": "Auto Liability",
        "policyStatus": "Active",
        "statusReason": "Active/New",
        "isPrimary": false,
        "cancellationPending": "No",
        "deductible": "50",
        "isThisPolicyClaimMade": "",
        "aggregateLimitAppliesPer": "",
        "otherStatusReason": "",
        "fullPriorActs": "",
        "retroActiveDate": "",
        "hiredCarLiability": "Yes",
        "otherAggregateLimitApplication": "",
        "coInsurance": "",
        "businessIncomeTerm": "",
        "coInsurancePercentage": "",
        "limitsApplyPer": "",
        "areOfficersExcluded": "",
        "listExcludedOfficers": "",
        "renewalStatus": "",
        "otherPolicy": false,
        "borDate": "",
        "otherLimitApplication": "",
        "coverages": [
            {
                "coverageType": "Auto - Bodily Injury (Per Person)",
                "limit": "15,000",
                "locationLabel": "label 1"
            },
            {
                "coverageType": "Auto - Combined Single Limit",
                "limit": "30,000",
                "locationLabel": "label 2"
            }
        ],
        "exposureBasis": [
            {
                "basis": "Revenue / Sales",
                "total": "2500",
                "state": "AZ"
            },
            {
                "basis": "Number of employees",
                "total": "4000",
                "state": "CO"
            }
        ],
        "otherDetails": {
            "waiverSubrogation": "No",
            "blanketAdditionalInsured": "No"
        },
        "whatTypeOfAutoPolicyIsThis": "Scheduled Autos"
    }
}

let getOtherTypeOfPolicy = (policyType: string): PolicyDetail => {
    return {
        "policyType": `OtherPolicy${policyType}`,
        "policyStatus": "Active",
        "statusReason": "Active/New",
        "isPrimary": false,
        "cancellationPending": "No",
        "deductible": "200",
        "isThisPolicyClaimMade": "No",
        "aggregateLimitAppliesPer": "LOC",
        "otherStatusReason": "",
        "fullPriorActs": "",
        "retroActiveDate": "",
        "hiredCarLiability": "No",
        "otherAggregateLimitApplication": "",
        "coInsurance": "",
        "businessIncomeTerm": "",
        "coInsurancePercentage": "",
        "limitsApplyPer": "",
        "areOfficersExcluded": "",
        "listExcludedOfficers": "",
        "renewalStatus": "",
        "otherPolicy": true,
        "borDate": "",
        "otherLimitApplication": "",
        "coverages": [
            {
                "coverageType": "Each Occurrence",
                "limit": "10,000",
                "locationLabel": "label 1"
            },
            {
                "coverageType": "General Aggregate",
                "limit": "20,000",
                "locationLabel": "label 2"
            }
        ],
        "exposureBasis": [
            {
                "basis": "Payroll",
                "total": "1500",
                "state": "NY"
            },
            {
                "basis": "Area (Sq. Footage, Acres, etc.)",
                "total": "3000",
                "state": "CA"
            }
        ],
        "otherDetails": {
            "waiverSubrogation": "Yes",
            "blanketAdditionalInsured": "Yes"
        },
        "whatTypeOfAutoPolicyIsThis": ""
    }
}

let getCommercialPackage = (): PolicyDetail => {
    return {
        "policyType": "Commercial Package (GL, Auto, Property)",
        "policyStatus": "Active",
        "statusReason": "Active/New",
        "isPrimary": false,
        "cancellationPending": "No",
        "deductible": "100",
        "isThisPolicyClaimMade": "No",
        "aggregateLimitAppliesPer": "LOC",
        "otherStatusReason": "",
        "fullPriorActs": "",
        "retroActiveDate": "",
        "hiredCarLiability": "No",
        "otherAggregateLimitApplication": "",
        "coInsurance": "Yes",
        "businessIncomeTerm": "10",
        "coInsurancePercentage": "20",
        "limitsApplyPer": "",
        "areOfficersExcluded": "",
        "listExcludedOfficers": "",
        "otherPolicy": false,
        "renewalStatus": "",
        "borDate": "",
        "otherLimitApplication": "",
        "coverages": [
            {
                "coverageType": "Each Occurrence",
                "limit": "10,000.00",
                "locationLabel": "label 1"
            },
            {
                "coverageType": "General Aggregate",
                "limit": "20,000.00",
                "locationLabel": "label 2"
            }
        ],
        "exposureBasis": [
            {
                "basis": "Payroll",
                "total": "1500",
                "state": "NY"
            },
            {
                "basis": "Area (Sq. Footage, Acres, etc.)",
                "total": "3000",
                "state": "CA"
            }
        ],
        "otherDetails": {
            "waiverSubrogation": "Yes",
            "blanketAdditionalInsured": "Yes"
        },
        "whatTypeOfAutoPolicyIsThis": "Owned Autos"
    }
}

let getDocNames = (): { docName1: string, docName2: string } => {
    return {
        "docName1": "CypressE&O.pdf",
        "docName2": "CypressTesting.pdf"
    }
}

export const policyTemplates = {
    getGeneralLiability,
    getAutoLiability,
    getOtherTypeOfPolicy,
    getCommercialPackage,
    getDocNames
}