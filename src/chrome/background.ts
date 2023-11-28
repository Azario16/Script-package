import { ChromeMessage, ChromeMessageApi } from "../interface/types";
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

    if (getFunction) {
        getFunction({ messageValue, sender, callback })
        return true;
    }
}

const messagesFromApiExtension = (
    message: ChromeMessageApi
) => {
    const messageValue = message.messageValue
    if (message.tabId) {
        const tabId: any = message.tabId
        chrome.tabs.sendMessage(tabId, messageValue);
    }
}

const onBeforeWebRequest = (message: chrome.webRequest.WebResponseHeadersDetails) => {
    if (message.tabId) {
        const tabId: any = message.tabId
        chrome.tabs.sendMessage(tabId, { event: 'webRequestCompleted', data: message });
    }
}


const main = () => {
    /**
     * Fired when a message is sent from either an extension process or a content script.
     */
    if (isExtensionContext()) {
        chrome.runtime.onMessageExternal.addListener(messagesFromApiExtension);
        chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
        chrome.webRequest.onCompleted.addListener(onBeforeWebRequest,
            {
                urls: [
                    "*://customer-support.test-y34.skyeng.link/task/priority",
                    // "*://customer-support.test-y34.skyeng.link/task/*",
                    "*://customer-support.test-y34.skyeng.link/task/*/take",
                    "*://customer-support.test-y34.skyeng.link/task/*/complete",
                ]
            }
        )
    }
}

main();


