import { GetterBackground } from "./getter"
import { ACTIONS } from "../actions-bg";
const Getter = GetterBackground()

const mapFunction = (name: string) => {
    switch (name) {
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
        default:
            return (arg1: string, arg2: (arg: any)=>  void)=>{

                arg2(null)
            };
    }
}

export { mapFunction }