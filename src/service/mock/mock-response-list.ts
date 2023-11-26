import { ACTIONS } from "../../chrome/actions"


const mockResponseList = [
    {
        name: ACTIONS.GET_TEACHER_LESSONS,
        response: {}
    },
    {
        name: ACTIONS.GET_TEACHER_SLACK_ID,
        response: {}
    },
    {
        name: ACTIONS.GET_SESSION,
        response: {
            "session": {
                data: {
                    roles: ['TEST']
                }
            }
        }
    },
    {
        name: ACTIONS.GET_USER_ID,
        response: {
            'user-info': {
                data: {
                    id: 1,
                    name: 'test',
                    roles: ['TEST']
                }
            },
            family: {
                data: [
                    {
                        general: {
                            id: 1
                        }
                    }
                ]
            }
        }
    },
    {
        name: ACTIONS.GET_EDUCATION_INFO,
        response: {}
    },
    {
        name: ACTIONS.GET_LOGIN_LINK,
        response: {}
    },
    {
        name: ACTIONS.GET_USER_NUMBER,
        response: {}
    },
    {
        name: ACTIONS.GET_AUTOFAQ_PEOPLE,
        response: {}
    },
    {
        name: ACTIONS.GET_AUTOFAQ_PEOPLE_LIST,
        response: {
            'people-list': []
        }
    },
    {
        name: ACTIONS.GET_AUTOFAQ_EVENT_NAME,
        response: {}
    },
    {
        name: ACTIONS.GET_AUTOFAQ_CHAT_LIST_USER,
        response: {}
    },
    {
        name: ACTIONS.GET_AUTOFAQ_CHAT_LIST_OPERATOR,
        response: {}
    },
    {
        name: ACTIONS.GET_AUTOFAQ_MESSAGE_VALUE,
        response: {}
    },
    {
        name: ACTIONS.GET_AUTOFAQ_START_CHAT,
        response: {}
    },
    {
        name: ACTIONS.GET_AUTOFAQ_ASSIGN_CHAT,
        response: {}
    },
    {
        name: ACTIONS.GET_AUTOFAQ_SEND_MESSAGE,
        response: {}
    },
    {
        name: ACTIONS.GET_AUTOFAQ_OPERATOR_INFO,
        response: {}
    },
]

export { mockResponseList }