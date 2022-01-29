import axios from "axios";
import { Agent } from 'https';
import { config } from "../config";
import { IGetStatementService } from "../interfaces";

export class GetStatementService implements IGetStatementService {
    constructor(
        private readonly httpsAgent:Agent
    ){}

    async execute(accessToken: string): Promise<string> {
        try {
            const url = config.statementUrl;
            const response = await axios.create({httpsAgent: this.httpsAgent}).get(url, {
                headers: {
                    "Authorization" : `Bearer ${accessToken}`
                }
            });
            return response.data
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }
}