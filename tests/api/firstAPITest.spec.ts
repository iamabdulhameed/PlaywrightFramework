import { test } from "@playwright/test";
import { accountAdminAPI } from "../../resources/api/account/AccountAdminAPI";
import { CreateAccountAPIDataBuilder, createAccountAPIData } from "../../resources/api/account/AccountAdminAPIBuilder";
import { agencyAdminAPI } from "../../resources/api/agency/AgencyAdminAPI";
import { CreateAgencyAPIBuilder, CreateAgencyAPIDraftIdBuilder, createAgencyDraftAPIData } from "../../resources/api/agency/AgencyAdminAPIBuilder";
import { getCreateEndoAPI, getPolicyInfoAPI } from "../../resources/api/endorsement/endorsementAPI";
import { PolicyInfoData, createEndorsementAPIDataBuilder } from "../../resources/api/endorsement/endorsementAPIBuilder";
import { policyAdminAPI } from "../../resources/api/policy/PolicyAdminAPI";
import { CreatePolicyAPIDataBuilder, createPolicyAPIData } from "../../resources/api/policy/PolicyAdminAPIBuilder";
import { apiUtils } from "../../resources/utils/apiUtils";
import { commonUtils, updateStat } from "../../resources/utils/commonUtils";
import { uiUtils } from "../../resources/utils/uiUtils";


test.describe("POC API Test Suite", () => {

    let policyReqBodies: createPolicyAPIData[];

    test.beforeAll("Fetching the session", async ({ browser }) => {
        const page = await (await browser.newContext()).newPage();
        await uiUtils.setAdminSessionInAPIHeaders(page);
        try {
            policyReqBodies = JSON.parse(commonUtils.readFile(`${process.cwd()}/resources/api/account/CreatedAccountDataFromAPI.json`))
        } catch (error) {
            console.log("Unable to fetch data in before block: ", error)
        }
    })

    test("Policy API Tests with custom Agency & Account ID", async ({ request }) => {
        for (let i = 0; i < 5; i++) {
            // Creating Agency
            const agencyDraftBody: createAgencyDraftAPIData = new CreateAgencyAPIDraftIdBuilder().build();
            const draftResponse = await (await agencyAdminAPI.generateAgencyDraftId(request, agencyDraftBody)).json();
            const draftId = draftResponse.data.draftId;
            const createAgencyBody = new CreateAgencyAPIBuilder().withDraftId(draftId).build()
            await agencyAdminAPI.createAgency(request, createAgencyBody);
            apiUtils.saveCreatedAgencyDataFromAPI(agencyDraftBody, createAgencyBody);

            // Creating Account
            const accReqBody = new CreateAccountAPIDataBuilder().withAgentId(draftId).build();
            const accResponse = await (await accountAdminAPI.createAccount(request, accReqBody)).json();
            apiUtils.saveCreatedAcccountDataFromAPI(accReqBody, accResponse);

            // Creating Policy
            const polReqBody = new CreatePolicyAPIDataBuilder(["OTH", "COM"])
                .withAgencyName(agencyDraftBody.agencyName)
                .withAgencyId(draftId)
                .withCompanyId(accResponse.data.companyId)
                .withCompanyName(accReqBody.name)
                .build();
            const polResponse = await (await policyAdminAPI.createPolicy(request, polReqBody)).json();
            apiUtils.saveCreatedPolicyDataFromAPI(polReqBody, polResponse);

            console.log("No. of Created Data: ", i + 1);
        }

    })

    test("Create Policies on random accounts", async ({ request }) => {

        for (let i = 0; i < 50; i++) {
            const randomData = commonUtils.getRandomElementFromArray(policyReqBodies);

            const polReqBody = new CreatePolicyAPIDataBuilder(["OTH", "COM"])
                .withCompanyId(randomData.companyId)
                .withCompanyName(randomData.companyName)
                .withCoverageLimit(0, "11000")
                .build();

            const polResponse = await (await policyAdminAPI.createPolicy(request, polReqBody)).json();
            apiUtils.saveCreatedPolicyDataFromAPI(polReqBody, polResponse);
            console.log("count: ", i + 1);
        }
    })

    test("Policy API Tests with single agency & multiple accounts", async ({ request }) => {
        // Creating Agency
        const agencyDraftBody: createAgencyDraftAPIData = new CreateAgencyAPIDraftIdBuilder().build();
        const draftResponse = await (await agencyAdminAPI.generateAgencyDraftId(request, agencyDraftBody)).json();
        const draftId = draftResponse.data.draftId;
        const createAgencyBody = new CreateAgencyAPIBuilder().withDraftId(draftId).build()
        await agencyAdminAPI.createAgency(request, createAgencyBody);
        apiUtils.saveCreatedAgencyDataFromAPI(agencyDraftBody, createAgencyBody);

        let accReqBody: createAccountAPIData = {} as createAccountAPIData;
        let accResponse: any;

        for (let i = 0; i < 20; i++) {
            // Creating Account
            accReqBody = new CreateAccountAPIDataBuilder().withAgentId(draftId).build();
            accResponse = await (await accountAdminAPI.createAccount(request, accReqBody)).json();
            apiUtils.saveCreatedAcccountDataFromAPI(accReqBody, accResponse);

            console.log("No. of Account Created Data: ", i + 1);
        }

        policyReqBodies = JSON.parse(commonUtils.readFile(`${process.cwd()}/resources/api/account/CreatedAccountDataFromAPI.json`));

        for (let i = 0; i < 100; i++) {
            // Creating Policy
            const randomData = commonUtils.getRandomElementFromArray(policyReqBodies);
            const polReqBody = new CreatePolicyAPIDataBuilder(["OTH", "COM"])
                .withAgencyName(agencyDraftBody.agencyName)
                .withAgencyId(draftId)
                .withCompanyId(randomData.companyId)
                .withCompanyName(randomData.companyName)
                .build();
            const polResponse = await (await policyAdminAPI.createPolicy(request, polReqBody)).json();
            apiUtils.saveCreatedPolicyDataFromAPI(polReqBody, polResponse);

            console.log("No. of Policy Created Data: ", i + 1);
        }
        for (let i = 0; i < 66; i++) {
            
            
        }

    })

    test.only('test endo api', async ({ request }) => {

        const agencyDraftBody: createAgencyDraftAPIData = new CreateAgencyAPIDraftIdBuilder().build();
        const draftResponse = await (await agencyAdminAPI.generateAgencyDraftId(request, agencyDraftBody)).json();
        const draftId = draftResponse.data.draftId;
        const createAgencyBody = new CreateAgencyAPIBuilder().withDraftId(draftId).build()
        await agencyAdminAPI.createAgency(request, createAgencyBody);
        apiUtils.saveCreatedAgencyDataFromAPI(agencyDraftBody, createAgencyBody);

        //account

        let accReqBody: createAccountAPIData = {} as createAccountAPIData;
        let accResponse: any;
        accReqBody = new CreateAccountAPIDataBuilder().withAgentId(draftId).build();
        accResponse = await (await accountAdminAPI.createAccount(request, accReqBody)).json();
        apiUtils.saveCreatedAcccountDataFromAPI(accReqBody, accResponse);
        console.log('JJJJJ', accResponse)

        //POLICY

        const polReqBody = new CreatePolicyAPIDataBuilder(['GL']).withAgencyId(draftId).withCompanyId(accResponse.data.companyId)
            .build();

        console.log('POLREQ', polReqBody)
        const polResponse = await (await policyAdminAPI.createPolicy(request, polReqBody)).json();
        const policyData: PolicyInfoData = {
            agencyId: draftId, companyId: accResponse.data.companyId,
            policyId: polResponse.data.policyId, policyNum: polReqBody.policyNum
        }

        console.log('KKAKSKSKSKS', policyData)
        const polInfoResponse = await (await getPolicyInfoAPI.getPolicyInfo(request, policyData)).json()
        console.log('boby', polInfoResponse)

        const createEndoReqBody = new createEndorsementAPIDataBuilder().withPolicyInfo(polInfoResponse.data.primary.policyInfo)
            .withPolicyId(polResponse.data.policyId).withPolicyItemId(polResponse.data.policyItemsId[0]).withPolicyNum(polReqBody.policyNum).withAgencyId(draftId).withCompanyId(accResponse.data.companyId).build();
        console.log('endoREQ', createEndoReqBody)
        const createEndoResponse = await (await getCreateEndoAPI.createEndorsement(request, createEndoReqBody)).json();

        console.log('MMMMM', createEndoResponse)

    })

    test.afterAll("Updating the stats", () => {
        console.log("Data Stat", updateStat());
    })
})