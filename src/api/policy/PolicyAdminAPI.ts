import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import apiConfig from "../../../api.config";
import { apiUtils } from "../../utils/apiUtils";
import { createPolicyAPIData } from "./PolicyAdminAPIBuilder";
import { policyTemplates } from "./PolicyTemplates";
const { faker } = require("@faker-js/faker");

const createPolicy = async (request: APIRequestContext, body: createPolicyAPIData): Promise<APIResponse> => {
    const docUploadResponse = await request.post(`${apiConfig.use?.baseURL}${apiUtils.docUploadAPIEndpoints.uploadDoc}`, {
        headers: apiUtils.apiHeaders,
        data: {
            "fileName": [policyTemplates.getDocNames().docName1, policyTemplates.getDocNames().docName2],
            "companyId": body.companyId,
            "location": "policy"
        }
    });
    expect(docUploadResponse.status()).toBe(201);

    const response = await request.post(`${apiConfig.use?.baseURL}${apiUtils.policyAPIEndpoints.createPolicy}`, {
        headers: apiUtils.apiHeaders,
        data: body
    });
    expect(response.status()).toBe(201)
    return response;
}


export const policyAdminAPI = {
    createPolicy
}