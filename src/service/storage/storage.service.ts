class StorageService {
    createSupportMark(): void {
        localStorage.setItem('isSupport', 'true')
        this.interavalCheckMark()
    }

    private interavalCheckMark(): void {
        setInterval(() => {
            if (!localStorage.getItem('isSupport')) {
                localStorage.setItem('isSupport', 'true')
            }
        }, 5000)
    }

}

const Storage = new StorageService()

export { Storage } 