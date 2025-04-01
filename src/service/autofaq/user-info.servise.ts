import { JwtService } from "../jwt/jwt.service"
import { Logger } from "../logger/logger.service";

export class AutoFaqUserInfoService {
  static async saveUserInfoForStore(): Promise<void> {
    try {
      const jwt = await cookieStore.get('jwt')
      if(!jwt){
        return;
      }
      const payload = JwtService.parseJwt(jwt.value)
      Logger.debug(payload)
  
      if(!payload['user']){
        Logger.debug("User not found")
        return;
      }

      chrome.storage.local.set({ 'autofaq-user': payload['user'] }, () => {
        Logger.debug("User info saved to storage", payload['user']);
      });
      
    } catch (error) {
      Logger.debug(error)
    }
  }
}