import { Call, GetterCallback } from '../../chrome/function/getter.interface'
import { mockResponseList } from './mock-response-list'

export class MockService {
   get(nameRequest: string): GetterCallback {


      const mokcResponse = async ({ messageValue, callback }: Call) =>{
         callback(this.findResponse(nameRequest))
      }

      return mokcResponse;
   }

   private findResponse(nameRequest: string) {
      return mockResponseList
         .find(mockResponse=> mockResponse.name === nameRequest)?.response
   }
}