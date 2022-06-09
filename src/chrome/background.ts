import { ChromeMessage, Sender } from "../interface/types";
import { mapFunction } from "./function/map-function"
type MessageResponse = (response?: any, arg2?: () => void) => void


const messagesFromReactAppListener = (
    message: ChromeMessage,
    sender: chrome.runtime.MessageSender,
    response: any,
) => {
    console.log(sender)
    const getFunction = mapFunction(message.messageName)
    getFunction(message.messageValue, (result: any) => {
        response(result)
    })
    return true;

}

const main = () => {
    console.log('[content.ts] Main')
    /**
     * Fired when a message is sent from either an extension process or a content script.
     */
    chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
}

main();


