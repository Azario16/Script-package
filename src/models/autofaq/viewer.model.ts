import { OperatorInfo } from "./operator-info.model";

export interface ViewerResponse {
  user: OperatorInfo,
  expires: number;
}