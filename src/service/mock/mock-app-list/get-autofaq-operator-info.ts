import { OperatorInfo } from "../../../models/autofaq/operator-info.model"

const GetAutoFaqOperatorInfo: OperatorInfo = {
  id: "test-1",
  login: "test-1@test.ru",
  fullName: "Sales-Test-1",
  email: "test-1@test.ru",
  serviceId: "8266dbb1-db44-4910-8b5f-a140deeec5c0",
  settings: {
    accessOptions: [],
    isAllowedToInitiateConversation: false,
    operatorChatLimit: 0,
    autoAssignEnabled: false,
    knowledgeBases: [],
    superOperatorGroupList: []
  },
  actions: [],
  groupList: [],
  isActive: false,
  isNotify: false
}


export { GetAutoFaqOperatorInfo }