import { Logger } from "../../service/logger/logger.service";
import { Call } from "./getter.interface";

const apiBackgraund = () => {
    return {
        sendEvent: async ({ messageValue, sender, callback }: Call) => {
            Logger.debug(messageValue)
            const tabId: any = sender.tab.id
            chrome.tabs.sendMessage(tabId, messageValue);
        }

    }
}

export { apiBackgraund }




