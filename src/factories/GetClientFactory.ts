import { makeHttpsAgent } from ".";
import { IGetClientService } from "../interfaces";
import { GetClientService } from "../services";

export const makeGetClientService = ():IGetClientService => {
    const httpsAgent = makeHttpsAgent(); 

    return new GetClientService(httpsAgent);
}