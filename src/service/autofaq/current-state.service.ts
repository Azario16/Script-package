import { ACTIONS } from "../../chrome/actions";
import { sendMessage } from "../../chrome/utils";
import { OperatorsStatisticCurrentStateResponse } from "../../models/autofaq/operator-statistic.model";
import { Logger } from "../logger/logger.service";

export class AutoFaqCurrentStateService {
  static async saveCurrentStateForStore(): Promise<void> {
    try {
      const cfrToken = await cookieStore.get('csrf_token')
      if(!cfrToken){
        return;
      }

      sendMessage(ACTIONS.GET_AUTOFAQ_CURRENT_STATE, { cfrToken: cfrToken.value }, (result: OperatorsStatisticCurrentStateResponse) => {
        chrome.storage.local.set({ 'current-state': result }, () => {
          Logger.debug("Current state saved to storage", result);
        });
      })

    } catch (error) {
      Logger.debug(error)
    }
  }
}