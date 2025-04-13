export interface OperatorInfo {
  id: string;
  login: string;
  fullName: string;
  email: string;
  serviceId: string;
  isActive: boolean;
  isNotify: boolean;
  groupList: string[];
  actions: string[];
  settings: {
    knowledgeBases: number[],
    autoAssignEnabled: boolean,
    isAllowedToInitiateConversation: boolean,
    accessOptions: [],
    superOperatorGroupList: string[],
    operatorChatLimit: number;
  }
}