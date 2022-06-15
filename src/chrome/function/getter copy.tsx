import { api } from '../../service/api-url';

const testingGet = async (body: any) => {
    const urlApi = `${api()}`;

    let get = await fetch(urlApi, {
        method: "POST",
        body: JSON.stringify(body),
        // credentials: "include"
    })
    const result = await get.json();
    return result
}

const productGet = async (url: string, methodOption: any) => {
    let get: any = await fetch(url, methodOption)
    return get
}



const GetterBackground = () => {
    return {
        getEducationInfo: async (userId: any, callback: any) => {
            const arrayResult: any = {
                'education-service': {},
                'configurations': {}
            }

            const urlEducation = `https://backend.skyeng.ru/api/persons/${userId}/education-services/`;

            // if (window.location.hostname === 'extension-test.ru' || window.location.hostname === 'gibeoebkgmgoeoemcbofgdfcmllkdjpe') {
            if (window.location.hostname === 'extension-test.ru') {
                // console.log('DEV')
                let bodyEducation: any = {}
                bodyEducation['uer-get'] = urlEducation;
                const resultEducation = await testingGet(bodyEducation)
                arrayResult['education-service'] = resultEducation
            } else {
                // console.log('PROD')
                const resultEducation = await productGet(urlEducation, {
                    method: "GET",
                    credentials: "include"
                })
                arrayResult['education-service'] = await resultEducation.json()
                console.log(arrayResult['education-service'])
            }

            const urlConfigurations = `https://backend.skyeng.ru/api/products/configurations/`;
            // if (window.location.hostname === 'extension-test.ru' || window.location.hostname === 'gibeoebkgmgoeoemcbofgdfcmllkdjpe') {
            if (window.location.hostname === 'extension-test.ru') {
                // console.log('DEV')
                let bodyConfigurations: any = {}
                bodyConfigurations['uer-get'] = urlConfigurations;
                const resultConfigurations = await testingGet(bodyConfigurations)
                arrayResult['configurations'] = resultConfigurations
            } else {
                // console.log('PROD')
                const resultConfigurations = await productGet(urlConfigurations, {
                    method: "GET",
                    credentials: "include"
                })
                arrayResult['configurations'] = await resultConfigurations.json()
                console.log(arrayResult['configurations'])
            }

            callback(arrayResult)
            return arrayResult

        },
        getTeacherTrmId: async (userId: any, callback: any) => {
            const arrayResult: any = {
                'teacher-id': {},
            }

            const urlTeacherTrmId = `https://tramway.skyeng.ru/teacher/autocomplete/search?stage=all&term=${userId}`;
            if (window.location.hostname === 'extension-test.ru') {
                let bodyTrmIdList: any = {}
                bodyTrmIdList['uer-get'] = urlTeacherTrmId;
                const resultTrmId = await testingGet(bodyTrmIdList)
                arrayResult['teacher-id'] = resultTrmId
            } else {
                const resultTrmId = await productGet(urlTeacherTrmId, {
                    method: "GET",
                    credentials: "include"
                })
                arrayResult['teacher-id'] = await resultTrmId.json()
            }
            callback(arrayResult)
            return arrayResult

        },
        getUserInfo: async (userId: any, callback: any) => {
            const arrayResult: any = {
                'user-info': {},
                'family': {},
            }

            const urlUserInfo = `https://backend.skyeng.ru/api/persons/${userId}`;
            if (window.location.hostname === 'extension-test.ru') {
                let bodyUserInfoList: any = {}
                bodyUserInfoList['uer-get'] = urlUserInfo;
                const resultUserInfo = await testingGet(bodyUserInfoList);
                arrayResult['user-info'] = resultUserInfo
            } else {
                const resultUserInfo = await productGet(urlUserInfo, {
                    method: "GET",
                    credentials: "include"
                });
                arrayResult['user-info'] = await resultUserInfo.json()
            }

            const urlFamily = `https://backend.skyeng.ru/api/persons/${userId}/family/`
            if (window.location.hostname === 'extension-test.ru') {
                let bodyFamily: any = {}
                bodyFamily['uer-get'] = urlFamily;
                const resultFamily = await testingGet(bodyFamily);
                arrayResult['family'] = resultFamily
            } else {
                const resultFamily = await productGet(urlFamily, {
                    method: "GET",
                    credentials: "include"
                });
                arrayResult['family'] = await resultFamily.json()
            }
            callback(arrayResult)
            return arrayResult
        },
        getUserNumber: async (userId: any, callback: any) => {
            const arrayResult: any = {
                'user-number': {},
            }
            const urlUserNumber = `https://backend.skyeng.ru/api/persons/${userId}/personal-data/?pdType=phone&source=persons.profile`;
            if (window.location.hostname === 'extension-test.ru') {
                let bodyUserNumber: any = {}
                bodyUserNumber['uer-get'] = urlUserNumber
                const resultUserNumber = await testingGet(bodyUserNumber)
                arrayResult['user-number'] = resultUserNumber
            } else {
                const resultUserNumber = await productGet(urlUserNumber, {
                    method: "GET",
                    credentials: "include"
                })
                arrayResult['user-number'] = await resultUserNumber.json()
            }
            callback(arrayResult)
            return arrayResult
        },
        getLoginLink: async (userId: any, callback: any) => {
            const arrayResult: any = {
                'doc': '',
                'loginLink': '',
                'success': true
            }
            const urlLoginLinkPost = `https://id.skyeng.ru/admin/auth/login-links`
            let bodyLoginLinkPost: any = {}
            bodyLoginLinkPost['uer-get'] = urlLoginLinkPost;
            bodyLoginLinkPost['body'] = `login_link_form%5Bid%5D=${userId}`;
            bodyLoginLinkPost['body'] += '&login_link_form%5Btarget%5D=https%3A%2F%2Fskyeng.ru'
            bodyLoginLinkPost['body'] += '&login_link_form%5Blifetime%5D=2000'
            bodyLoginLinkPost['method'] = 'POST'
            bodyLoginLinkPost['return'] = 'html'
            bodyLoginLinkPost['headers'] = {
                'content-type': 'application/x-www-form-urlencoded'
            }
            if (window.location.hostname === 'extension-test.ru') {
                await testingGet(bodyLoginLinkPost)
                // arrayResult['doc'] = resultLoginLinkPost


                let bodyLoginLink: any = {}
                bodyLoginLink['uer-get'] = urlLoginLinkPost
                bodyLoginLink['return'] = 'doc';
                const resultTrmId = await testingGet(bodyLoginLink)
                arrayResult['doc'] = resultTrmId
            } else {
                const resultLoginLinkPost = await productGet(urlLoginLinkPost, {
                    headers: bodyLoginLinkPost['headers'],
                    body: bodyLoginLinkPost['body'],
                    referrer: "https://id.skyeng.ru/admin/auth/login-links",
                    referrerPolicy: "strict-origin-when-cross-origin",
                    method: "POST",
                    credentials: "include"
                })
                arrayResult['doc'] = await resultLoginLinkPost.text()
                console.log(arrayResult['doc'])
            }

            let json = {
                'loginLink': '',
                'success': true
            }
            try {
                const textHtml = arrayResult['doc'];
                let domPars = new DOMParser()
                let loginLinks: any = domPars.parseFromString(textHtml, `text/html`).querySelectorAll("[value^='https://id.skyeng.ru/auth/login-link/']")
                let last = loginLinks[loginLinks.length - 1].value;
                console.log(`Loginner: ${last}`)
                json.loginLink = last
                json.success = true
                console.log(json)
            } catch (err) {
                json.success = false
            }
            callback(json)
            return arrayResult
        },
        getAutofaqCurretnList: async (userId: string, callback: any) => {
            const arrayResult: any = {
                'people-list': {},
            }
            let bodyUserNumber: any = {}
            bodyUserNumber['uer-get'] = `https://skyeng.autofaq.ai/api/operators/statistic/currentState`;
            // arrayList['userid'] = userId;
            const urlUserNumber = `${api()}`;
            let getUserNumber = await fetch(urlUserNumber, {
                method: "POST",
                body: JSON.stringify(bodyUserNumber),
                // credentials: "include"
            })
            const resultUserNumber = await getUserNumber.json();
            arrayResult['people-list'] = resultUserNumber.rows
            callback(arrayResult)
            return arrayResult
        },
        getAutofaqEventList: async (userId: string, callback: any) => {
            const arrayResult: any = {
                'event-list': {},
            }
            let bodyEventList: any = {}
            bodyEventList['uer-get'] = `https://skyeng.autofaq.ai/i18n/ru-RU/ticket.json`;
            // arrayList['userid'] = userId;
            const urlEventList = `${api()}`;
            let getEventList = await fetch(urlEventList, {
                method: "POST",
                body: JSON.stringify(bodyEventList),
                // credentials: "include"
            })
            const resultEventList = await getEventList.json();
            arrayResult['event-list'] = resultEventList.chatEvents
            callback(arrayResult)
            return arrayResult
        },
        getAutofaqChatListUser: async (data: any, callback: any) => {
            const arrayResult: any = {
                'chat-list': {},
            }
            let bodyChatListUser: any = {}
            bodyChatListUser['uer-get'] = `https://skyeng.autofaq.ai/api/conversations/history`;
            bodyChatListUser['body'] = `{\"serviceId\":\"361c681b-340a-4e47-9342-c7309e27e7b5\",\"mode\":\"Json\",\"channelUserFullTextLike\":\"${data.USER_ID}\",\"tsFrom\":\"${data.START.current}T00:00:00.000Z\",\"tsTo\":\"${data.END.current}T23:59:59.059Z\",\"orderBy\":\"ts\",\"orderDirection\":\"Desc\",\"page\":1,\"limit\":10}`;
            bodyChatListUser['method'] = 'POST'
            bodyChatListUser['headers'] = {
                'content-type': 'application/json'
            }
            bodyChatListUser['return'] = 'json'
            // arrayList['userid'] = userId;
            const urlChatListUser = `${api()}`;
            let getChatListUser = await fetch(urlChatListUser, {
                method: "POST",
                body: JSON.stringify(bodyChatListUser),
                // credentials: "include"
            })
            const resultChatListUser = await getChatListUser.json();
            arrayResult['chat-list'] = resultChatListUser
            callback(arrayResult)
            return arrayResult
        },
        getAutofaqMessageValue: async (chatId: string, callback: any) => {
            const arrayResult: any = {
                'message-value': {},
            }
            let bodyMessageValue: any = {}
            bodyMessageValue['uer-get'] = `https://skyeng.autofaq.ai/api/conversations/${chatId}`;
            // arrayList['userid'] = userId;
            const urlMessageValue = `${api()}`;
            let getMessageValue = await fetch(urlMessageValue, {
                method: "POST",
                body: JSON.stringify(bodyMessageValue),
                // credentials: "include"
            })
            const resultMessageValue = await getMessageValue.json();
            arrayResult['message-value'] = resultMessageValue
            callback(arrayResult)
            return arrayResult
        }

    }
}

export { GetterBackground }




