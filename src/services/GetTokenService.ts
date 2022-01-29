import axios from "axios";
import { Agent } from 'https';
import { config } from "../config";
import { IGetTokenService, IGetTokenServiceResponse } from "../interfaces";

export class GetTokenService implements IGetTokenService {
    constructor(
        private readonly httpsAgent:Agent,
    ){}
    async execute(): Promise<IGetTokenServiceResponse> {
        try {
            const url = config.authUrl;

            const urlSearchParams = new URLSearchParams();
            urlSearchParams.append("grant_type", "client_credentials");
            urlSearchParams.append("scope", "directory:software");
            urlSearchParams.append("client_id", "Cx-CluFpgHMDCIHBi2vl6");

            const response = await axios.create({httpsAgent: this.httpsAgent}).post(url, urlSearchParams);
            return response.data.access_token
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }
}