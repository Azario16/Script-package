const apiBackgraund = () => {
    return {
        sendEvent: async ({ messageValue, sender, callback }: { messageValue: any, sender: any, callback: any }) => {
            console.log(messageValue)
            const tabId: any = sender.tab.id
            chrome.tabs.sendMessage(tabId, messageValue);
        }

    }
}

export { apiBackgraund }




