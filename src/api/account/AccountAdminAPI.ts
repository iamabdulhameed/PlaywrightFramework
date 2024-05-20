import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import apiConfig from "../../../api.config";
import { apiUtils } from "../../utils/apiUtils";
import { createAccountAPIData } from "./AccountAdminAPIBuilder";

const createAccount = async (request: APIRequestContext, body: createAccountAPIData): Promise<APIResponse> => {
    const response = await request.post(`${apiConfig.use?.baseURL}${apiUtils.accountAPIEndpoints.createAccount}`, {
        headers: apiUtils.apiHeaders,
        data: body
    });
    expect(response.status()).toBe(201)
    return response;
}

export const accountAdminAPI = {
    createAccount
};