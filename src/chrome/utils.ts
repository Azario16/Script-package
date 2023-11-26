import { ChromeMessage } from "../interface/types";
import { isExtensionContext } from "../service/chrome-runtime.service";
import { mapFunction } from "./function/map-function"

export const getCurrentTabUrl = (callback: (url: string | undefined) => void): void => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
        callback(tabs[0].url);
    });
}

export const getCurrentTabUId = (callback: (url: number | undefined) => void): void => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
        callback(tabs[0].id);
    });
}

export const getMessage = (callback: () => void): void => {
    callback();
}

export const sendMessage = (messageName: string, messageValue: any, callbackSend: any) => {
    if (isExtensionContext()) {
        const message: ChromeMessage = {
            messageValue: messageValue,
            messageName: messageName,
        }
        chrome.runtime.sendMessage(message, (response) => {
            callbackSend(response)
        });
    } else {
        const callback = (result: any) => {
            callbackSend(result)
        }

        const sender = null

        const getFunction = mapFunction(messageName)

        if(getFunction){
            getFunction({ messageValue, sender, callback })
        }
    }
};