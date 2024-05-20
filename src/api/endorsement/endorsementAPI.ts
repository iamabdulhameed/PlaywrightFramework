import { APIRequestContext, APIResponse } from "@playwright/test";
import apiConfig from "../../../api.config";
import { apiUtils } from "../../utils/apiUtils";
import { PolicyInfoData, createEndorsementAPIData } from "./endorsementAPIBuilder";

const getPolicyInfoForEndorsement = async (request: APIRequestContext, polInfoData: PolicyInfoData): Promise<APIResponse> => {
    const url = `${apiConfig.use?.baseURL}${apiUtils.endorsementAPIEndPoints.getPolicyInfo.replace("{{agencyId}}", polInfoData.agencyId).replace("{{companyId}}", polInfoData.companyId).replace("{{policyId}}", polInfoData.policyId)}`
    console.log('INFOURL',url)
    const response = await request.get(url , {
        headers: apiUtils.apiHeaders
    });
    return response
}

const createEndorsement=async(request:APIRequestContext,body:createEndorsementAPIData):Promise<APIResponse>=>{
    const createEndoUrl = `${apiConfig.use?.baseURL}${apiUtils.endorsementAPIEndPoints.createEndorsement.replace("{{policyId}}",body.policyId)}`
    console.log('URL',createEndoUrl)
    const response = await request.post(createEndoUrl , {
        headers: apiUtils.apiHeaders,
        data: body
    });
    return response
}

export const getPolicyInfoAPI = {
    getPolicyInfo: getPolicyInfoForEndorsement
};

export const getCreateEndoAPI = {
    createEndorsement
};