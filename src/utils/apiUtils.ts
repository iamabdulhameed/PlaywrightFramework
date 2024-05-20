/**
 * 
 * 
 * 
 */

import fs from "node:fs";
import { createAccountAPIData } from "../api/account/AccountAdminAPIBuilder";
import { createAgencyAPIData, createAgencyDraftAPIData } from "../api/agency/AgencyAdminAPIBuilder";
import { createPolicyAPIData } from "../api/policy/PolicyAdminAPIBuilder";

const apiHeaders = {
    'accept': 'application/json, text/plain, */*',
    'content-type': 'application/json'
}

const accountAPIEndpoints = {
    createAccount: "/company"
}

const policyAPIEndpoints = {
    createPolicy: "/policy"
}

const docUploadAPIEndpoints = {
    uploadDoc: "/company/qe/documents/upload"
}

const agencyAPIEndpoints = {
    agencyDraft: "/agency/agency-draft",
    agencyDraftUpdate: "/agency/agency-draft/{{draftId}}",
    createAgency: "/agency"
}

const endorsementAPIEndPoints={
    getPolicyInfo:`/policy/details?agencyId={{agencyId}}&companyId={{companyId}}&policyId={{policyId}}&sectionKey=policylist`,
    createEndorsement:`/policy/{{policyId}}/endorsement`
}

 

const saveCreatedPolicyDataFromAPI = (req: createPolicyAPIData, res: any, newData?: any) => {
    const data = {
        "timeStamp": new Date(Date.now()).toLocaleString(),
        "policyNum": req.policyNum,
        "agencyName": req.agencyName,
        "companyName": req.companyName,
        "policyId": res.data.policyId,
        "policyItemsId": res.data.policyItemsId,
        ...newData
    }

    let existingData: any[] = [];
    try {
        // Read existing data from the file
        const fileContent = fs.readFileSync(`${process.cwd()}/resources/api/policy/CreatedPolicyDataFromAPI.json`, 'utf8');
        existingData = JSON.parse(fileContent);
    } catch (err) {
        console.error('Error reading file:', err);
    }

    // Add new data to the existing array
    existingData.push(data);

    try {
        // Write the updated data back to the file
        fs.writeFileSync(`${process.cwd()}/resources/api/policy/CreatedPolicyDataFromAPI.json`, JSON.stringify(existingData, null, 2));
    } catch (err) {
        console.error('Error writing file:', err);
    }

}

const saveCreatedAcccountDataFromAPI = async (req: createAccountAPIData, res: any, newData?: any) => {
    const data = {
        "timeStamp": new Date(Date.now()).toLocaleString(),
        "agencyId": req.agencyId,
        "agencyName": res.data.agencyName,
        "companyName": req.name,
        "companyId": res.data.companyId,
        ...newData
    }

    let existingData: any[] = [];
    try {
        // Read existing data from the file
        const fileContent = fs.readFileSync(`${process.cwd()}/resources/api/account/CreatedAccountDataFromAPI.json`, 'utf8');
        existingData = JSON.parse(fileContent);
    } catch (err) {
        console.error('Error reading file:', err);
    }

    // Add new data to the existing array
    existingData.push(data);

    try {
        // Write the updated data back to the file
        fs.writeFileSync(`${process.cwd()}/resources/api/account/CreatedAccountDataFromAPI.json`, JSON.stringify(existingData, null, 2));
    } catch (err) {
        console.error('Error writing file:', err);
    }
}

const saveCreatedAgencyDataFromAPI = (data1: createAgencyDraftAPIData, data2: createAgencyAPIData, newData?: any) => {
    const data = {
        "timeStamp": new Date(Date.now()).toLocaleString(),
        "draftId": data2.draftId,
        "agencyId": data2.draftId,
        "agencyName": data1.agencyName,
        ...newData
    }

    let existingData: any[] = [];
    try {
        // Read existing data from the file
        const fileContent = fs.readFileSync(`${process.cwd()}/resources/api/agency/CreatedAgencyDataFromAPI.json`, 'utf8');
        existingData = JSON.parse(fileContent);
    } catch (err) {
        console.error('Error reading file:', err);
    }

    // Add new data to the existing array
    existingData.push(data);

    try {
        // Write the updated data back to the file
        fs.writeFileSync(`${process.cwd()}/resources/api/agency/CreatedAgencyDataFromAPI.json`, JSON.stringify(existingData, null, 2));
    } catch (err) {
        console.error('Error writing file:', err);
    }
}




export const apiUtils = {
    apiHeaders,
    accountAPIEndpoints,
    policyAPIEndpoints,
    docUploadAPIEndpoints,
    saveCreatedPolicyDataFromAPI,
    saveCreatedAcccountDataFromAPI,
    agencyAPIEndpoints,
    saveCreatedAgencyDataFromAPI,
    endorsementAPIEndPoints
}