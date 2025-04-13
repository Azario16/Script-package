import { ACTIONS } from "../../chrome/actions";
import { sendMessage } from "../../chrome/utils";
import { ViewerResponse } from "../../models/autofaq/viewer.model";
import { JwtService } from "../jwt/jwt.service"
import { Logger } from "../logger/logger.service";

export class AutoFaqUserInfoService {
  static async saveUserInfoForStore(): Promise<void> {
    try {
      const jwt = await cookieStore.get('jwt')
      if (!jwt) {
        Logger.debug("JWT not found")
        return;
      }
      const payload = JwtService.parseJwt(jwt.value)
      Logger.debug("Payload", payload)

      if (!payload['user']) {
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

  static async saveUserInfoForStoreV2(): Promise<void> {
    try {
      const cfrToken = await cookieStore.get('csrf_token')
      if (!cfrToken) {
        return;
      }

      sendMessage(ACTIONS.GET_AUTOFAQ_VIEWER, { cfrToken: cfrToken.value }, (result: ViewerResponse) => {
        const user = result.user
        chrome.storage.local.set({ 'autofaq-user': user }, () => {
          Logger.debug("User info saved to storage", user);
        });
      })

    } catch (error) {
      Logger.debug(error)
    }
  }
}