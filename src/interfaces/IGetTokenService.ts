export type IGetTokenServiceResponse = string
export interface IGetTokenService {
    execute(): Promise<IGetTokenServiceResponse>
}