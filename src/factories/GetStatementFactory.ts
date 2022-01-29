import { makeHttpsAgent } from ".";
import { IGetStatementService } from "../interfaces";
import { GetStatementService } from "../services";

export const makeGetStatementService = ():IGetStatementService => {
    const httpsAgent = makeHttpsAgent(); 

    return new GetStatementService(httpsAgent);
}