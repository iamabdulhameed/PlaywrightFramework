import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import apiConfig from "../../../api.config";
import { apiUtils } from "../../utils/apiUtils";
import {
    CreateAgencyAPIBasicDetailsBuilder,
    CreateAgencyAPIBillingDetailsBuilder,
    CreateAgencyAPICarrierDetailsBuilder,
    CreateAgencyAPIEODetailsBuilder,
    CreateAgencyAPILicenseDetailsBuilder,
    CreateAgencyAPILogoAndDetailsBuilder,
    createAgencyAPIData,
    createAgencyBasicDetailsAPIData,
    createAgencyBillingDetailsAPIData,
    createAgencyCarrierDetailsAPIData,
    createAgencyDraftAPIData,
    createAgencyEODetailsAPIData,
    createAgencyLicenseDetailsAPIData,
    createAgencyLogoAndDetailsAPIData
} from "./AgencyAdminAPIBuilder";

let draftId: string;

const generateAgencyDraftId = async (request: APIRequestContext, body: createAgencyDraftAPIData) => {
    const draftResponse = await request.post(`${apiConfig.use?.baseURL}${apiUtils.agencyAPIEndpoints.agencyDraft}`, {
        headers: apiUtils.apiHeaders,
        data: body
    });

    const draftJsonResponse = await draftResponse.json();
    draftId = draftJsonResponse.data.draftId;

    expect(draftResponse.status()).toBe(200);

    return draftResponse;;
}

const updateCreateAgencyBasicDetails = async (request: APIRequestContext, body: createAgencyBasicDetailsAPIData) => {

    const basicDetailsResponse = await request.put(`${apiConfig.use?.baseURL}${apiUtils.agencyAPIEndpoints.agencyDraftUpdate.replace("{{draftId}}", draftId)}`, {
        headers: apiUtils.apiHeaders,
        data: body
    });
    expect(basicDetailsResponse.status()).toBe(200);

    return basicDetailsResponse;
}

const updateCreateAgencyLogoDetails = async (request: APIRequestContext, body: createAgencyLogoAndDetailsAPIData) => {

    const logoDetailsResponse = await request.put(`${apiConfig.use?.baseURL}${apiUtils.agencyAPIEndpoints.agencyDraftUpdate.replace("{{draftId}}", draftId)}`, {
        headers: apiUtils.apiHeaders,
        data: body
    });
    expect(logoDetailsResponse.status()).toBe(200);

    return logoDetailsResponse;
}

const updateCreateAgencyBillingDetails = async (request: APIRequestContext, body: createAgencyBillingDetailsAPIData) => {

    const billingDetailsResponse = await request.put(`${apiConfig.use?.baseURL}${apiUtils.agencyAPIEndpoints.agencyDraftUpdate.replace("{{draftId}}", draftId)}`, {
        headers: apiUtils.apiHeaders,
        data: body
    });
    expect(billingDetailsResponse.status()).toBe(200);

    return billingDetailsResponse;
}

const updateCreateAgencyLicenseDetails = async (request: APIRequestContext, body: createAgencyLicenseDetailsAPIData) => {

    const licenseDetailsResponse = await request.put(`${apiConfig.use?.baseURL}${apiUtils.agencyAPIEndpoints.agencyDraftUpdate.replace("{{draftId}}", draftId)}`, {
        headers: apiUtils.apiHeaders,
        data: body
    });
    expect(licenseDetailsResponse.status()).toBe(200);

    return licenseDetailsResponse;
}

const updateCreateAgencyCarrierDetails = async (request: APIRequestContext, body: createAgencyCarrierDetailsAPIData) => {

    const carrierDetailsResponse = await request.put(`${apiConfig.use?.baseURL}${apiUtils.agencyAPIEndpoints.agencyDraftUpdate.replace("{{draftId}}", draftId)}`, {
        headers: apiUtils.apiHeaders,
        data: body
    });
    expect(carrierDetailsResponse.status()).toBe(200);

    return carrierDetailsResponse;
}

const updateCreateAgencyEODetails = async (request: APIRequestContext, body: createAgencyEODetailsAPIData) => {

    const eoDetailsResponse = await request.put(`${apiConfig.use?.baseURL}${apiUtils.agencyAPIEndpoints.agencyDraftUpdate.replace("{{draftId}}", draftId)}`, {
        headers: apiUtils.apiHeaders,
        data: body
    });
    expect(eoDetailsResponse.status()).toBe(200);

    return eoDetailsResponse;
}

const createAgency = async (request: APIRequestContext, body: createAgencyAPIData, option?: {
    "basicDetails": undefined,
    "logoDetails": undefined,
    "billingDetails": undefined,
    "licenseDetails": undefined,
    "carrierDetails": undefined,
    "eoDetails": undefined
}): Promise<APIResponse> => {

    let agencyBasicDetails: createAgencyBasicDetailsAPIData = option?.basicDetails != undefined ? option.basicDetails : new CreateAgencyAPIBasicDetailsBuilder().withDraftId(draftId).build();
    const agencyLogoDetails: createAgencyLogoAndDetailsAPIData = option?.logoDetails != undefined ? option.logoDetails : new CreateAgencyAPILogoAndDetailsBuilder().withDraftId(draftId).build();
    const agencyBillingDetails: createAgencyBillingDetailsAPIData = option?.billingDetails != undefined ? option.billingDetails : new CreateAgencyAPIBillingDetailsBuilder().withDraftId(draftId).build();
    const agencyLicenseDetails: createAgencyLicenseDetailsAPIData = option?.licenseDetails != undefined ? option.licenseDetails : new CreateAgencyAPILicenseDetailsBuilder().withDraftId(draftId).build();
    const agencyCarrierDetails: createAgencyCarrierDetailsAPIData = option?.carrierDetails != undefined ? option.carrierDetails : new CreateAgencyAPICarrierDetailsBuilder().withDraftId(draftId).build();
    const agencyEODetails: createAgencyEODetailsAPIData = option?.eoDetails != undefined ? option.eoDetails : new CreateAgencyAPIEODetailsBuilder().withDraftId(draftId).build();

    await updateCreateAgencyBasicDetails(request, agencyBasicDetails);
    await updateCreateAgencyLogoDetails(request, agencyLogoDetails);
    await updateCreateAgencyBillingDetails(request, agencyBillingDetails);
    await updateCreateAgencyLicenseDetails(request, agencyLicenseDetails);
    await updateCreateAgencyCarrierDetails(request, agencyCarrierDetails);
    await updateCreateAgencyEODetails(request, agencyEODetails);

    const createAgencyResponse = await request.post(`${apiConfig.use?.baseURL}${apiUtils.agencyAPIEndpoints.createAgency}`, {
        headers: apiUtils.apiHeaders,
        data: body
    });
    expect(createAgencyResponse.status()).toBe(200);

    return createAgencyResponse;
}

export const agencyAdminAPI = {
    createAgency,
    updateCreateAgencyBasicDetails,
    updateCreateAgencyBillingDetails,
    updateCreateAgencyCarrierDetails,
    updateCreateAgencyEODetails,
    updateCreateAgencyLicenseDetails,
    updateCreateAgencyLogoDetails,
    generateAgencyDraftId
};