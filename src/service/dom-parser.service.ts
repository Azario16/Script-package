export class DoomParserService {
  static getLoginLinkFromHtml(textHtml: string): string | null{
    const domPars = new DOMParser()
    const loginLinks = domPars.parseFromString(textHtml, `text/html`).querySelectorAll("[value^='https://id.skyeng.ru/auth/login-link/']")

    if (loginLinks.length === 0) return null;

    const lastInput = loginLinks[loginLinks.length - 1] as HTMLInputElement;

    return lastInput.value;
  }
}