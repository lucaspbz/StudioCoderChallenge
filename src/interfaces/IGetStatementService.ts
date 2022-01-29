export type IGetStatementServiceResponse = string
export type IGetStatementServiceRequest = string
export interface IGetStatementService {
    execute(accessToken:IGetStatementServiceRequest): Promise<IGetStatementServiceResponse>
}