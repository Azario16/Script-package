import { ACTIONS } from "../../chrome/actions";

import getUserId from "./mock-app-list/get-user-id.json";
import getSession from "./mock-app-list/get-session.json";
import getTeacherSlackId from "./mock-app-list/get-teacher-slack-id.json";
import getCurrentTask from "./mock-app-list/get-current-task.json";
import getTaskHashAvailable from "./mock-app-list/get-task-hash-available.json";
import getUserContactPhone from "./mock-app-list/get-user-contact-phone.json";
import getUserContacts from "./mock-app-list/get-user-contacts.json";
import geAllPersonalData from "./mock-app-list/get-all-personal-data.json";
import { GetAutoFaqChatListOperator } from "./mock-app-list/get-autofaq-chat-list-operator";
import { GetAutoFaqOperatorInfo } from "./mock-app-list/get-autofaq-operator-info";

const mockResponseList = [
    {
        name: ACTIONS.GET_TEACHER_LESSONS,
        response: {}
    },
    {
        name: ACTIONS.GET_TEACHER_SLACK_ID,
        response: getTeacherSlackId
    },
    {
        name: ACTIONS.GET_SESSION,
        response: getSession
    },
    {
        name: ACTIONS.GET_USER_ID,
        response: getUserId
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
        name: ACTIONS.GET_USER_CONTACTS,
        response: getUserContacts
    },
    {
        name: ACTIONS.GET_ALL_PERSONAL_DATA,
        response: geAllPersonalData
    },
    {
        name: ACTIONS.GET_USER_CONTACT_PHONE,
        response: getUserContactPhone
    },
    {
        name: ACTIONS.GET_CURRENT_TASK,
        response: getCurrentTask
    },
    {
        name: ACTIONS.GET_TASK_HASH_AVAILABLE,
        response: getTaskHashAvailable
    },
    {
        name: ACTIONS.GET_AUTOFAQ_PEOPLE,
        response: GetAutoFaqChatListOperator
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
        response: GetAutoFaqOperatorInfo
    },
]

export { mockResponseList }