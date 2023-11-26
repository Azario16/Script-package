import { GetterBackground } from "./getter"
import { apiBackgraund } from "./event"
import { ACTIONS } from "../actions-bg";
import { GetterCallback } from "./getter.interface";
import { isExtensionContext } from "../../service/chrome-runtime.service";
import { MockService } from "../../service/mock/mock.service";

const Getter = GetterBackground()
const Event = apiBackgraund()
const mapFunction = (functionName: string): GetterCallback | undefined  => {
    if(!isExtensionContext()){
        const mockService = new MockService();
        return mockService.get(functionName)
    }

    if(functionName === ACTIONS.SEND_EVENT){
        return Event.sendEvent;
    }

    const method = Getter
        .find(getter => getter.name === functionName)?.call

    return method
}


export { mapFunction }