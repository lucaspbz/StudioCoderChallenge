import { makeGetClientService, makeGetStatementService, makeGetTokenService } from "./factories";

export async function handler() {
    const getTokenService = makeGetTokenService();
    const getStatementService = makeGetStatementService();
    const getClientService = makeGetClientService();
    
    const access_token = await getTokenService.execute();
    const jwt = await getStatementService.execute(access_token);
    return getClientService.execute(jwt);
}