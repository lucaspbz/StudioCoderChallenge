export type IGetClientServiceResponse = string
export type IGetClientServiceRequest = string
export interface IGetClientService {
    execute(jwtToken:IGetClientServiceRequest): Promise<IGetClientServiceResponse>
}