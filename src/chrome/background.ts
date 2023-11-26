import { ChromeMessage, ChromeMessageApi, Sender } from "../interface/types";
import { isExtensionContext } from "../service/chrome-runtime.service";
import { mapFunction } from "./function/map-function"

const messagesFromReactAppListener = (
    message: ChromeMessage,
    sender: chrome.runtime.MessageSender,
    response: any,
) => {
    const messageValue = message.messageValue

    const callback = (result: any) => {
        response(result)
    }
    const getFunction = mapFunction(message.messageName)

    if(getFunction){
        getFunction({ messageValue, sender, callback })
        return true;
    }
}

const messagesFromApiExtension = (
    message: ChromeMessageApi,
    sender: chrome.runtime.MessageSender,
) => {
    const messageValue = message.messageValue
    if (message.tabId) {
        const tabId: any = message.tabId
        chrome.tabs.sendMessage(tabId, messageValue);
    }
}


const main = () => {
    /**
     * Fired when a message is sent from either an extension process or a content script.
     */
    if (isExtensionContext()) {
        chrome.runtime.onMessageExternal.addListener(messagesFromApiExtension);
        chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
    }
}

main();


