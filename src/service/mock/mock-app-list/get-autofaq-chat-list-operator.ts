import { OperatorsStatisticCurrentStateResponse } from '../../../models/autofaq/operator-statistic.model';

const GetAutoFaqChatListOperator: OperatorsStatisticCurrentStateResponse = {
  onOperator: [
    {
      operator: {
        id: "test-1",
        login: "test-1@test.ru",
        fullName: "Sales-Test-1",
        kbs: [
          121984,
          119844,
          121381,
          121384,
          119841,
          121385,
          120181,
          118980,
          119638,
          119636,
          119025,
          119649,
          119646,
          121286,
          121881,
          121387,
          119843,
          121386,
          121692
        ],
        aae: true,
        status: "Offline"
      },
      groupId: "8266dbb1-db44-4910-8b5f-a140deeec5c0",
      cCnt: 0,
      aCnt: 0
    },
    {
      operator: {
        id: "test-1",
        login: "test-1@test.ru",
        fullName: "Sales-Test-1",
        kbs: [
          121984,
          119844,
          121381,
          121384,
          119841,
          121385,
          120181,
          118980,
          119638,
          119636,
          119025,
          119649,
          119646,
          121286,
          121881,
          121387,
          119843,
          121386,
          121692
        ],
        aae: true,
        status: "Offline"
      },
      groupId: "8266dbb1-db44-4910-8b5f-a140deeec5c0",
      cCnt: 0,
      aCnt: 0
    },
    {
      operator: {
        id: "test-3",
        login: "test-3@test.ru",
        fullName: "Sales-Test-3",
        kbs: [
          121984,
          119844,
          121381,
          121384,
          119841,
          121385,
          120181,
          118980,
          119638,
          119636,
          119025,
          119649,
          119646,
          121286,
          121881,
          121387,
          119843,
          121386,
          121692
        ],
        aae: true,
        status: "Offline"
      },
      groupId: "8266dbb1-db44-4910-8b5f-a140deeec5c0",
      cCnt: 0,
      aCnt: 0
    }
  ],
  unAssigned: [
    {
      groupId: "c7bbb211-a217-4ed3-8112-98728dc382d8",
      kb: 120181,
      count: 3
    }
  ]
}

export { GetAutoFaqChatListOperator }