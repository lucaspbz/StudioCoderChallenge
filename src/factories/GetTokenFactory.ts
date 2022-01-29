import { makeHttpsAgent } from ".";
import { IGetTokenService } from "../interfaces";
import { GetTokenService } from "../services";

export const makeGetTokenService = ():IGetTokenService => {
    const httpsAgent = makeHttpsAgent(); 

    return new GetTokenService(httpsAgent);
}