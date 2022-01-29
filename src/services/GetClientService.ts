import axios from "axios";
import { Agent } from 'https';
import { config } from "../config";
import { IGetClientService } from "../interfaces";

export class GetClientService implements IGetClientService {
    constructor(
        private readonly httpsAgent:Agent,
    ){}

    async execute(jwtToken: string): Promise<string> {
        try {
            const url = config.clientUrl;

            const body = {
                "grant_types": [
                "authorization_code",
                "implicit",
                "refresh_token",
                "client_credentials"
                ],
                "tls_client_auth_subject_dn": "UID=234c141e-d3a7-4ff2-b0cf-aae440061df1,1.3.6.1.4.1.311.60.2.1.3=#13024252,2.5.4.15=#130f427573696e65737320456e74697479,2.5.4.5=#130e3435323436343130303030313535,CN=gobaas-itp.com,OU=8292c33e-d95a-5fe7-8f27-dd7a95c68b55,O=BANCO GENIAL S.A.,L=RIO DE JANEIRORJ,ST=RJ,C=BR",
                "jwks_uri": "https://keystore.sandbox.directory.openbankingbrasil.org.br/8292c33e-d95a-5fe7-8f27-dd7a95c68b55/234c141e-d3a7-4ff2-b0cf-aae440061df1/application.jwks",
                "token_endpoint_auth_method": "tls_client_auth",
                "response_types": [
                "code id_token"
                ],
                "redirect_uris": [
                "https://gobaas-itp.com:3003/gobaas-itp/payment/pix/callback"
                ],
                "software_statement": jwtToken
            }

            const response = await axios.create({httpsAgent: this.httpsAgent}).post(url, body);
            return response.data
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }
}