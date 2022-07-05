import { ChromeMessage, ChromeMessageApi, Sender } from "../interface/types";
import { mapFunction } from "./function/map-function"

const messagesFromReactAppListener = (
    message: ChromeMessage,
    sender: chrome.runtime.MessageSender,
    response: any,
) => {


    console.log(sender)
    console.log(message)

    const messageValue = message.messageValue

    const callback = (result: any) => {
        response(result)
    }
    const getFunction = mapFunction(message.messageName)

    getFunction({ messageValue, sender, callback })
    return true;

}

const messagesFromApiExtension = (
    message: ChromeMessageApi,
    sender: chrome.runtime.MessageSender,
) => {
    const messageValue = message.messageValue
    console.log(sender)
    console.log(message)
    if (message.tabId) {
        const tabId: any = message.tabId
        chrome.tabs.sendMessage(tabId, messageValue);
    }
    // })
}


const main = () => {
    // console.log('[content.ts] Main')
    /**
     * Fired when a message is sent from either an extension process or a content script.
     */
    const hostName = window.location.hostname
    if (hostName !== 'build.extension-test.ru' && hostName !== 'extension-test.ru') {
        console.log('hostName')
        chrome.runtime.onMessageExternal.addListener(messagesFromApiExtension);
        chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
    }

}

main();


