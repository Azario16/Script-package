import { GetterBackground } from "./getter"
import { ACTIONS } from "../actions-bg";
const Getter = GetterBackground()

const mapFunction = (name: string) => {
    switch (name) {
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
        default:
            return (arg1: string, arg2: (arg: any)=>  void)=>{

                arg2(null)
            };
    }
}

export { mapFunction }