import { GetterBackground } from "./getter"
import { apiBackgraund } from "./event"
import { ACTIONS } from "../actions-bg";

const Getter = GetterBackground()
const Event = apiBackgraund()
const mapFunction = (name: string) => {
    switch (name) {
        case ACTIONS.GET_TEACHER_LESSONS:
            return Getter.getTeacherLessons;
        case ACTIONS.GET_SESSION:
            return Getter.getSession;
        case ACTIONS.GET_USER_ID:
            return Getter.getUserInfo;
        case ACTIONS.GET_EDUCATION_INFO:
            return Getter.getEducationInfo;
        case ACTIONS.GET_TEACHER_ID:
            return Getter.getTeacherTrmId;
        case ACTIONS.GET_LOGIN_LINK:
            return Getter.getLoginLink;
        case ACTIONS.GET_USER_NUMBER:
            return Getter.getUserNumber;
        case ACTIONS.GET_AUTOFAQ_PEOPLE:
            return Getter.getAutofaqCurretnList;
        case ACTIONS.GET_AUTOFAQ_PEOPLE_LIST:
            return Getter.getAutofaqPeopleList;
        case ACTIONS.GET_AUTOFAQ_EVENT_NAME:
            return Getter.getAutofaqEventList;
        case ACTIONS.GET_AUTOFAQ_CHAT_LIST_USER:
            return Getter.getAutofaqChatListUser;
        case ACTIONS.GET_AUTOFAQ_CHAT_LIST_OPERATOR:
            return Getter.getAutofaqChatListOperator;
        case ACTIONS.GET_AUTOFAQ_MESSAGE_VALUE:
            return Getter.getAutofaqMessageValue;
        case ACTIONS.GET_AUTOFAQ_START_CHAT:
            return Getter.getAutofaqStartChat;
        case ACTIONS.GET_AUTOFAQ_ASSIGN_CHAT:
            return Getter.getAutofaqAssignChat;
        case ACTIONS.GET_AUTOFAQ_OPERATOR_INFO:
            return Getter.getAutofaqOperatorInfo;
        case ACTIONS.GET_AUTOFAQ_SEND_MESSAGE:
            return Getter.getAutofaqSendMessage;
        case ACTIONS.SEND_EVENT:
            return Event.sendEvent;
        default:
            return  async  ({ messageValue, callback }: { messageValue: any, sender: any, callback: any }) => {

                callback(null)
            };
    }
}


export { mapFunction }