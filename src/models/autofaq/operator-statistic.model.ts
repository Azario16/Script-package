export interface OperatorsStatisticCurrentStateResponse {
  onOperator: OnOperator[];
  unAssigned: UnAssigned[];
}

export interface OnOperator {
  operator: Operator;
  groupId: string;
  cCnt: number;
  aCnt: number;
}

export interface UnAssigned {
  groupId: string;
  kb: number;
  count: number;
}

export interface Operator {
  id: string;
  login: string;
  fullName: string;
  kbs: number[];
  aae: boolean;
  status: OperatorStatus;
}

export type OperatorStatus = 'Offline' | 'Online' | 'Busy' | 'Pause'