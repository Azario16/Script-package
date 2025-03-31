import { isExtensionContext } from '../../service/chrome-runtime.service';
import { Logger } from '../../service/logger/logger.service';
import { ACTIONS } from '../actions';
import { Getter } from './getter.interface';

const generalGet = async (url: string, methodOption: any) => {
    const get: any = await fetch(url, methodOption)
    return get
}

const WINDOW = globalThis as unknown as (Window & typeof globalThis);

const GetterBackground = (): Getter[] => {
    return [
        {
            name: ACTIONS.GET_TEACHER_LESSONS,
            call: async ({ messageValue, callback }) => {
                Logger.debug(messageValue)
                const arrayResult: any = {
                    'lessons': {},
                }

                const body = {
                    "timetableFrom": `${messageValue.dateWeek.wkStart}T21:00:00+00:00`,
                    "timetableTo": `${messageValue.dateWeek.wkEnd}T20:59:59+00:00`,
                    "serviceTypeKey": null,
                    "timeRanges": [],
                    "expressions": [],
                    "teacherIds": [
                        messageValue.teacherId
                    ],
                    "isComplexSearch": false,
                    "intensity": null,
                    "customFilters": {
                        "includeTeachersWhoClosedSpecificSlots": false
                    },
                    "page": 1,
                    "pageSize": 15,
                    "orderByProperty": "by_rating_small_package"
                }



                const url = `https://timetable.skyeng.ru/api/v3/teacher/search`;

                const result = await generalGet(url, {
                    headers: {
                        "content-type": "application/json; charset=UTF-8",
                    },
                    body: JSON.stringify(body),
                    method: "POST",
                    credentials: "include"
                })
                arrayResult['lessons'] = await result.json()

                callback(arrayResult)
                return arrayResult
            }
        },
        {
            name: ACTIONS.GET_TEACHER_SLACK_ID,
            call: async ({ messageValue, callback }) => {
                const arrayResult: any = {
                    'lessons': {},
                }

                const body = [
                    `from=${messageValue.dateWeek.wkStart} 21:00:00`,
                    `to=${messageValue.dateWeek.wkEnd} 20:59:59`,
                    `offset=0`,
                    `filters[teacherIds][]=${messageValue.teacherId}`,
                    `limit=15`,
                    `sort=by_rating_small_package`
                ]

                const url = `https://timetable.skyeng.ru/api/teachers/search`;

                const result = await generalGet(url, {
                    headers: {
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                    body: body.join('&'),
                    method: "POST",
                    credentials: "include"
                })
                arrayResult['lessons'] = await result.json()
                callback(arrayResult)
                return arrayResult
            },
        },
        {
            name: ACTIONS.GET_SESSION,
            call: async ({ callback }) => {
                const arrayResult: any = {
                    'session': {},
                }

                const urlSession = `https://backend.skyeng.ru/api/session`;
                const resultSession = await generalGet(urlSession, {
                    method: "GET",
                    credentials: "include"
                })
                arrayResult['session'] = await resultSession.json()

                callback(arrayResult)
                return arrayResult
            },
        },
        {
            name: ACTIONS.GET_EDUCATION_INFO,
            call: async ({ messageValue, callback }) => {
                const arrayResult: any = {
                    'education-service': {},
                    'configurations': {}
                }

                const urlEducation = `https://backend.skyeng.ru/api/persons/${messageValue}/education-services/`;
                const resultEducation = await generalGet(urlEducation, {
                    method: "GET",
                    credentials: "include"
                })
                arrayResult['education-service'] = await resultEducation.json()

                const urlConfigurations = `https://backend.skyeng.ru/api/products/configurations/`;
                const resultConfigurations = await generalGet(urlConfigurations, {
                    method: "GET",
                    credentials: "include"
                })
                arrayResult['configurations'] = await resultConfigurations.json()


                callback(arrayResult)
                return arrayResult

            },
        },
        {
            // OUTDATED!
            name: ACTIONS.GET_TEACHER_ID,
            call: async ({ messageValue, callback }) => {
                const arrayResult: any = {
                    'teacher-id': {},
                }

                const urlTeacherTrmId = `https://tramway.skyeng.ru/teacher/autocomplete/search?stage=all&term=${messageValue}`;
                const resultTrmId = await generalGet(urlTeacherTrmId, {
                    method: "GET",
                    credentials: "include"
                }).catch(err => {}) || "[]";

                arrayResult['teacher-id'] = await resultTrmId.json()

                callback(arrayResult)
                return arrayResult

            },
        },
        {
            name: ACTIONS.GET_USER_ID,
            call: async ({ messageValue, callback }) => {
                const arrayResult: any = {
                    'user-info': {},
                    'family': {},
                }

                const urlUserInfo = `https://backend.skyeng.ru/api/persons/${messageValue}`;

                const resultUserInfo = await generalGet(urlUserInfo, {
                    method: "GET",
                    credentials: "include"
                });
                arrayResult['user-info'] = await resultUserInfo.json()


                const urlFamily = `https://backend.skyeng.ru/api/persons/${messageValue}/family/`
                const resultFamily = await generalGet(urlFamily, {
                    method: "GET",
                    credentials: "include"
                });
                arrayResult['family'] = await resultFamily.json()

                callback(arrayResult)
                return arrayResult
            }
        },
        {
            name: ACTIONS.GET_USER_NUMBER,
            call: async ({ messageValue, callback }) => {
                const urlUserNumber = `https://id.skyeng.ru/user-api/v1/users/${messageValue.userID}/unmasked-contact?contactId=${messageValue.contactId}`;
                const resultUserNumber = await generalGet(urlUserNumber, {
                    method: "GET",
                    credentials: "include"
                })
                const userNumber = await resultUserNumber.json()
                callback(userNumber.result)
                return userNumber
            }
        },
        {
            name: ACTIONS.GET_USER_CONTACTS,
            call: async ({ messageValue, callback }) => {
                const urlUserNumber = `https://backend.skyeng.ru/api/persons/${messageValue}/contacts`;
                const resultUserNumber = await generalGet(urlUserNumber, {
                    method: "GET",
                    credentials: "include"
                })
                const userContacts = await resultUserNumber.json()
                callback(userContacts)
                return userContacts
            }
        },
        {
            name: ACTIONS.GET_ALL_PERSONAL_DATA,
            call: async ({ messageValue, callback }) => {
                const urlUserNumber = `https://backend.skyeng.ru/api/persons/${messageValue}/all-personal-data/`;
                const resultUserNumber = await generalGet(urlUserNumber, {
                    method: "GET",
                    credentials: "include"
                })
                const userContacts = await resultUserNumber.json()
                callback(userContacts)
                return userContacts
            }
        },
        {
            name: ACTIONS.GET_USER_CONTACT_PHONE,
            call: async ({ messageValue, callback }) => {
                const GENERAL_CONTACT = 'Телефон(основной)'
                const CONTACT_COLUMN_NAME = ['Телефон', GENERAL_CONTACT]

                const urlUserNumber = `https://id.skyeng.ru/admin/users/${messageValue}`;
                const resultUserNumber = await generalGet(urlUserNumber, {
                    method: "GET",
                    credentials: "include"
                })
                const textHtmlResult = await resultUserNumber.text()

                try {
                    const domPars = new DOMParser()
                    const userContactsTableTr = domPars.parseFromString(textHtmlResult, `text/html`).querySelectorAll("body > main > div:nth-child(9) > table > tbody > tr")

                    const userContacts = Array.from(userContactsTableTr)
                        .filter((userContactTableTr: any) => {
                            const columnName = userContactTableTr.find('th').text().replace(/\s+/g, '');
                            debugger;
                            if (columnName && CONTACT_COLUMN_NAME.includes(columnName)) {
                                return true;
                            }
                        })
                        .map((userContactTableTr: any) => {
                            const contact = userContactTableTr?.find('span > span')?.text().replace(/\s+/g, '');
                            const dataContactIdNumber = userContactTableTr.find('span')?.attribs['data-contact-id']?.replace(/\s+/g, '');
                            const isGeneralContact = userContactTableTr.find('th')?.text().replace(/\s+/g, '') === GENERAL_CONTACT;

                            return {
                                id: dataContactIdNumber,
                                contact: contact,
                                general: isGeneralContact
                            }
                        })

                    callback(userContacts)
                    return userContacts

                } catch (err) {
                    callback({ error: err })
                }
            }
        },
        {
            name: ACTIONS.GET_LOGIN_LINK,
            call: async ({ messageValue, callback }) => {
                const arrayResult: any = {
                    'doc': '',
                    'loginLink': '',
                    'success': true
                }
                const urlLoginLinkPost = `https://id.skyeng.ru/admin/auth/login-links`
                const bodyLoginLinkPost: any = {}
                bodyLoginLinkPost['uer-get'] = urlLoginLinkPost;
                bodyLoginLinkPost['body'] = `login_link_form%5Bid%5D=${messageValue}`;
                bodyLoginLinkPost['body'] += '&login_link_form%5Btarget%5D=https%3A%2F%2Fskyeng.ru'
                bodyLoginLinkPost['body'] += '&login_link_form%5Blifetime%5D=2000'
                bodyLoginLinkPost['method'] = 'POST'
                bodyLoginLinkPost['return'] = 'html'
                bodyLoginLinkPost['headers'] = {
                    'content-type': 'application/x-www-form-urlencoded'
                }
                const resultLoginLinkPost = await generalGet(urlLoginLinkPost, {
                    headers: bodyLoginLinkPost['headers'],
                    body: bodyLoginLinkPost['body'],
                    referrer: "https://id.skyeng.ru/admin/auth/login-links",
                    referrerPolicy: "strict-origin-when-cross-origin",
                    method: "POST",
                    credentials: "include"
                })
                arrayResult['doc'] = await resultLoginLinkPost.text()

                const json = {
                    'textHtml': '',
                    'success': true
                }
                try {
                    const textHtml = arrayResult['doc'];
                    Logger.debug(textHtml)

                    json.textHtml = textHtml
                    json.success = true
                } catch (err) {
                    Logger.debug(err)
                    json.success = false
                }
                callback(json)
                return arrayResult
            }
        },
        {
            name: ACTIONS.GET_CURRENT_TASK,
            call: async ({ callback }) => {
                const urlUserNumber = `https://customer-support.skyeng.ru/task/current`;
                const resultUserNumber = await generalGet(urlUserNumber, {
                    method: "GET",
                    credentials: "include"
                })

                const response = await resultUserNumber.json()

                callback(response)
                return response
            }
        },
        {
            name: ACTIONS.GET_TASK_HASH_AVAILABLE,
            call: async ({ callback }) => {
                const urlUserNumber = `https://customer-support.skyeng.ru/task/has-available`;
                const resultUserNumber = await generalGet(urlUserNumber, {
                    method: "GET",
                    credentials: "include"
                })

                const response = await resultUserNumber.json()

                callback(response)
                return response
            }
        },
        {
            name: ACTIONS.GET_AUTOFAQ_PEOPLE,
            call: async ({ callback }) => {
                const arrayResult: any = {
                    'people-list': {},
                }

                const urlCurrentList = `https://skyeng.autofaq.ai/api/operators/statistic/currentState`;
                const resultCurrentList = await generalGet(urlCurrentList, {
                    method: "GET",
                    credentials: "include"
                })
                const currentList = await resultCurrentList.json()
                arrayResult['people-list'] = currentList

                callback(arrayResult)
                return arrayResult
            }
        },
        {
            name: ACTIONS.GET_AUTOFAQ_PEOPLE_LIST,
            call: async ({ callback }) => {
                const arrayResult: any = {
                    'people-list': {},
                }

                const urlPeopleList = `https://skyeng.autofaq.ai/api/users?serviceId=361c681b-340a-4e47-9342-c7309e27e7b5&action=Reason8Operator`;
                const resultPeopleList = await generalGet(urlPeopleList, {
                    method: "GET",
                    credentials: "include"
                })
                const peopleList = await resultPeopleList.json()
                arrayResult['people-list'] = peopleList.items

                callback(arrayResult)
                return arrayResult
            }
        },
        {
            name: ACTIONS.GET_AUTOFAQ_EVENT_NAME,
            call: async ({ callback }) => {
                const arrayResult: any = {
                    'event-list': {},
                }
                const urlEventList = `https://skyeng.autofaq.ai/i18n/ru-RU/ticket.json`;
                const resultEventList = await generalGet(urlEventList, {
                    method: "GET",
                    credentials: "include"
                })
                const eventList = await resultEventList.json()
                arrayResult['event-list'] = eventList.chatEvents

                callback(arrayResult)
                return arrayResult
            }
        },
        {
            name: ACTIONS.GET_AUTOFAQ_CHAT_LIST_USER,
            call: async ({ messageValue, callback }) => {
                const arrayResult: any = {
                    'chat-list': {},
                }
                const urlChatListUser = `https://skyeng.autofaq.ai/api/conversations/history`;

                const bodyChatListUser: any = {}
                bodyChatListUser['uer-get'] = urlChatListUser;
                bodyChatListUser['body'] = `{\"serviceId\":\"361c681b-340a-4e47-9342-c7309e27e7b5\",\"mode\":\"Json\",\"channelUserFullTextLike\":\"${messageValue.USER_ID}\",\"tsFrom\":\"${messageValue.START.current}T00:00:00.000Z\",\"tsTo\":\"${messageValue.END.current}T23:59:59.059Z\",\"orderBy\":\"ts\",\"orderDirection\":\"Desc\",\"page\":1,\"limit\":10}`;
                bodyChatListUser['method'] = 'POST'
                bodyChatListUser['headers'] = {
                    'content-type': 'application/json'
                }
                bodyChatListUser['return'] = 'json'

                const resultChatListUser = await generalGet(urlChatListUser, {
                    headers: bodyChatListUser['headers'],
                    body: bodyChatListUser['body'],
                    method: "POST",
                    credentials: "include"
                })
                arrayResult['chat-list'] = await resultChatListUser.json()

                callback(arrayResult)
                return arrayResult
            }
        },
        {
            name: ACTIONS.GET_AUTOFAQ_CHAT_LIST_OPERATOR,
            call: async ({ messageValue, callback }) => {
                const arrayResult: any = {
                    'chat-list': {},
                }
                const urlChatListOperator = `https://skyeng.autofaq.ai/api/conversations/history`;
                const bodyOperator = {
                    "serviceId": "361c681b-340a-4e47-9342-c7309e27e7b5",
                    "mode": "Json",
                    "participatingOperatorsIds": [
                        messageValue.OPERATOR_ID.id
                    ],
                    "tsFrom": `${messageValue.START.current}T23:23:00.043Z`,
                    "tsTo": `${messageValue.END.current}T23:23:00.043Z`,
                    "usedStatuses": [
                        "OnOperator",
                        "AssignedToOperator",
                        "Active"
                    ],
                    "orderBy": "ts",
                    "orderDirection": "Asc",
                    "page": 1,
                    "limit": 10
                }

                const bodyChatListOperator: any = {}
                bodyChatListOperator['uer-get'] = urlChatListOperator;
                // bodyChatListOperator['body'] = `{\"serviceId\":\"361c681b-340a-4e47-9342-c7309e27e7b5\",\"mode\":\"Json\",\"channelUserFullTextLike\":\"${data.USER_ID}\",\"tsFrom\":\"${data.START.current}T00:00:00.000Z\",\"tsTo\":\"${data.END.current}T23:59:59.059Z\",\"orderBy\":\"ts\",\"orderDirection\":\"Desc\",\"page\":1,\"limit\":10}`;
                bodyChatListOperator['body'] = JSON.stringify(bodyOperator)
                bodyChatListOperator['method'] = 'POST'
                bodyChatListOperator['headers'] = {
                    'content-type': 'application/json'
                }
                bodyChatListOperator['return'] = 'json'

                const resultChatListOperator = await generalGet(urlChatListOperator, {
                    headers: bodyChatListOperator['headers'],
                    body: JSON.stringify(bodyOperator),
                    method: "POST",
                    credentials: "include"
                })
                arrayResult['chat-list'] = await resultChatListOperator.json()

                callback(arrayResult)
                return arrayResult
            }
        },
        {
            name: ACTIONS.GET_AUTOFAQ_MESSAGE_VALUE,
            call: async ({ messageValue, callback }) => {
                const arrayResult: any = {
                    'message-value': {},
                }

                const urlMessageValue = `https://skyeng.autofaq.ai/api/conversations/${messageValue}`;
                const resultMessageValue = await generalGet(urlMessageValue, {
                    method: "GET",
                    credentials: "include"
                })
                arrayResult['message-value'] = await resultMessageValue.json()

                callback(arrayResult)
                return arrayResult
            }
        },
        {
            name: ACTIONS.GET_AUTOFAQ_START_CHAT,
            call: async ({ messageValue, callback }: { messageValue: any, callback: any }) => {
                Logger.debug(messageValue)

                const arrayResult: any = {
                    'start-chat': {},
                }
                const urStartChat = `https://skyeng.autofaq.ai/api/conversation/start?channelId=eca64021-d5e9-4c25-b6e9-03c24s638d4d&userId=${messageValue.userId}&operatorId=${messageValue.afOperatorValue.id}&groupId=${messageValue.afOperatorValue.groupList[0]}`;
                const resultStartChat = await generalGet(urStartChat, {
                    method: "POST",
                    credentials: "include"
                })
                arrayResult['start-chat'] = await resultStartChat.json()

                callback(arrayResult)
                return arrayResult
            }
        },
        {
            name: ACTIONS.GET_AUTOFAQ_ASSIGN_CHAT,
            call: async ({ messageValue, callback }) => {
                const arrayResult: any = {
                    'assign-chat': {},
                }

                const bodyOperator = {
                    "command": "DO_ASSIGN_CONVERSATION",
                    "conversationId": messageValue.chatId,
                    "assignToOperatorId": messageValue.operatorAfId
                }

                const urAssignChat = `https://skyeng.autofaq.ai/api/conversation/assign`;
                const resultAssignChat = await generalGet(urAssignChat, {
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(bodyOperator),
                    method: "POST",
                    credentials: "include"
                })
                arrayResult['assign-chat'] = await resultAssignChat.json()

                callback(arrayResult)
                return arrayResult
            }
        },
        {
            name: ACTIONS.GET_AUTOFAQ_SEND_MESSAGE,
            call: async ({ messageValue, callback }) => {
                const body = {
                    "sessionId": `${messageValue.sessionId}`,
                    "conversationId": `${messageValue.chatId}`,
                    "text": `${messageValue.sendText}`,
                    "isComment": messageValue.commentValue
                }

                const url = `https://skyeng.autofaq.ai/api/reason8/answers`;
                const result = await generalGet(url, {
                    headers: {
                        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary4KtHEYQgYopjdhoL'
                    },
                    // body: `payload: ${JSON.stringify(body)}`,
                    body: `------WebKitFormBoundary4KtHEYQgYopjdhoL\r\nContent-Disposition: form-data; name=\"payload\"\r\n\r\n${JSON.stringify(body)}\r\n------WebKitFormBoundary4KtHEYQgYopjdhoL--\r\n"`,
                    method: "POST",
                    credentials: "include"
                })

                callback(result)
            }
        },
        {
            name: ACTIONS.GET_AUTOFAQ_OPERATOR_INFO,
            call: async ({ callback }: { callback: any }) => {
                if (isExtensionContext()) {
                    chrome.cookies.get({ "url": "http://skyeng.autofaq.ai", "name": "jwt" }, function (cookie: any) {
                        if (callback) {
                            const base64Url = cookie.value.split('.')[1];
                            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                            const jsonPayload: any = decodeURIComponent(WINDOW.atob(base64).split('').map(function (c) {
                                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                            }).join(''));
                            Logger.debug(jsonPayload)
                            const user = JSON.parse(jsonPayload).user
                            Logger.debug(user)
                            callback(user);
                        }
                    });
                }
            }
        }
    ]
}

export { GetterBackground }




