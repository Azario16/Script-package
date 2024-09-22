export default class Storage {
    static async read(key: string): Promise<any> {
        return new Promise((resolve, _) => {
            chrome.storage.local.get([key], function (result) {
                resolve(result[key]);
            });
        });
    }
    
    static async write(key: string, value: any): Promise<void> {
        return new Promise((resolve, _) => {
            chrome.storage.local.set({ [key]: value }, function () {
                resolve();
            });
        });
    }

    static supportMarkInterval: any = null;
    static createSupportMark(): void {
        localStorage.setItem('isSupport', 'true');

        if (this.supportMarkInterval) {
            clearInterval(this.supportMarkInterval);
        }

        this.supportMarkInterval = setInterval(() => {
            if (!localStorage.getItem('isSupport')) {
                localStorage.setItem('isSupport', 'true')
            }
        }, 5000);
    }
}