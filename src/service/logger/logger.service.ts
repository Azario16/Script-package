class LoggerService {
    static isDebug = true;

    constructor() {
        this.loadDebugSetting();
        this.subscribeToChanges();
    }

    private loadDebugSetting(): void {
        chrome.storage.local.get('debug-mode', (data) => {
            LoggerService.isDebug = data["debug-mode"] ?? false;
            console.log("Debug mode updated:", data["debug-mode"]);
        });
    }

    private subscribeToChanges(): void {
        chrome.storage.onChanged.addListener((changes, areaName) => {
            if (areaName === 'local' && changes["debug-mode"]) {
                LoggerService.isDebug = changes["debug-mode"].newValue;
                console.log("Debug mode updated:", changes["debug-mode"].newValue);
            }
        });
    }

    static setDebugMode(enabled: boolean): void {
        chrome.storage.sync.set({ "debug-mode": enabled });
    }

    debug(...logs: any): void {
        if (LoggerService.isDebug) {
            logs.forEach((log: any) => console.log("ScriptPackageDebug: ", log));
        }
    }
}

const Logger = new LoggerService();
export { Logger };
