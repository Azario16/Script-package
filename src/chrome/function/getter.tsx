import { api } from '../../service/api-url';

const GetterBackground = () => {
    return {
        getEducationInfo: async (userId: any, callback: any) => {
            const arrayResult = {
                'education-service': {},
                'configurations': []
            }

            const urlEducation = `${api()}`;

            let bodyEducation: any = {}
            bodyEducation['uer-get'] = `https://backend.skyeng.ru/api/persons/${userId}/education-services/`;
            // arrayList['userid'] = userId;
            let getEducation = await fetch(urlEducation, {
                method: "POST",
                body: JSON.stringify(bodyEducation),
                // credentials: "include"
            })
            const resultEducation = await getEducation.json();
            arrayResult['education-service'] = resultEducation

            const urlConfigurations = `${api()}`;

            let bodyConfigurations: any = {}

            bodyConfigurations['uer-get'] = `https://backend.skyeng.ru/api/products/configurations/`;
            // arrayList['userid'] = userId;
            let getConfigurations = await fetch(urlConfigurations, {
                method: "POST",
                body: JSON.stringify(bodyConfigurations),
                // credentials: "include"
            })
            const resultConfigurations = await getConfigurations.json();
            arrayResult['configurations'] = resultConfigurations.data
            console.log(arrayResult)
            callback(arrayResult)
            return arrayResult

        },
        getTeacherTrmId: async (userId: any, callback: any) => {
            const arrayResult = {
                'teacher-id': {},
            }
            let bodyTrmIdList: any = {}
            bodyTrmIdList['uer-get'] = `https://tramway.skyeng.ru/teacher/autocomplete/search?stage=all&term=${userId}`;
            // arrayList['userid'] = userId;
            const urlTrmId = `${api()}`;
            let getTrmId = await fetch(urlTrmId, {
                method: "POST",
                body: JSON.stringify(bodyTrmIdList),
                // credentials: "include"
            })
            const resultTrmId = await getTrmId.json();
            arrayResult['teacher-id'] = resultTrmId
            callback(arrayResult)
            return arrayResult

        },
        getUserInfo: async (userId: any, callback: any) => {
            const arrayResult = {
                'user-info': {},
                'education-service': {},
                'family': {},
            }
            let bodyUserInfoList: any = {}
            bodyUserInfoList['uer-get'] = `https://backend.skyeng.ru/api/persons/${userId}`;
            // arrayList['userid'] = userId;
            const urlUserInfo = `${api()}`;
            let getUserInfo = await fetch(urlUserInfo, {
                method: "POST",
                body: JSON.stringify(bodyUserInfoList),
                // credentials: "include"
            })
            const resultUserInfo = await getUserInfo.json();
            arrayResult['user-info'] = resultUserInfo

            let bodyFamily: any = {}
            bodyFamily['uer-get'] = `https://backend.skyeng.ru/api/persons/${userId}/family/`;
            // arrayList['userid'] = userId;
            const urlFamily = `${api()}`;
            let getFamily = await fetch(urlFamily, {
                method: "POST",
                body: JSON.stringify(bodyFamily),
                // credentials: "include"
            })
            const resultFamily = await getFamily.json();
            arrayResult['family'] = resultFamily
            callback(arrayResult)
            return arrayResult
        },
        getUserNumber: async (userId: any, callback: any) => {
            const arrayResult = {
                'user-number': {},
            }
            let bodyUserNumber: any = {}
            bodyUserNumber['uer-get'] = `https://backend.skyeng.ru/api/persons/${userId}/personal-data/?pdType=phone&source=persons.profile`;
            // arrayList['userid'] = userId;
            const urlUserNumber = `${api()}`;
            let getUserNumber = await fetch(urlUserNumber, {
                method: "POST",
                body: JSON.stringify(bodyUserNumber),
                // credentials: "include"
            })
            const resultUserNumber = await getUserNumber.json();
            arrayResult['user-number'] = resultUserNumber.data.value
            callback(arrayResult)
            return arrayResult
        },
        getLoginLink: async (userId: any, callback: any) => {
            const arrayResult = {
                'login-link': {},
            }
            let bodyLoginLinkPost: any = {}
            bodyLoginLinkPost['uer-get'] = `https://id.skyeng.ru/admin/auth/login-links`;

            bodyLoginLinkPost['body'] = `login_link_form%5Bid%5D=${userId}`;
            bodyLoginLinkPost['body'] += '&login_link_form%5Btarget%5D=https%3A%2F%2Fskyeng.ru'
            bodyLoginLinkPost['body'] += '&login_link_form%5Blifetime%5D=2000'
            bodyLoginLinkPost['method'] = 'POST'
            bodyLoginLinkPost['headers'] = 'content-type": "application/x-www-form-urlencoded'


            // arrayList['userid'] = userId;
            const urlLoginLinkPost = `${api()}`;
            let getLoginLinkPost = await fetch(urlLoginLinkPost, {
                method: "POST",
                body: JSON.stringify(bodyLoginLinkPost),
                // credentials: "include"
            })
            const resultLoginLinkPost = await getLoginLinkPost.json();

            let json = {
                'loginLink': '',
                'success': true
            }

            let bodyLoginLink: any = {}
            bodyLoginLink['uer-get'] = `https://id.skyeng.ru/admin/auth/login-links`;
            bodyLoginLink['return'] = 'doc';

            // arrayList['userid'] = userId;
            const urlLoginLink = `${api()}`;
            let getLoginLink = await fetch(urlLoginLink, {
                method: "POST",
                body: JSON.stringify(bodyLoginLink),
                // credentials: "include"
            })

            try{
                const textHtml = await getLoginLink.text();
                let domPars = new DOMParser()
                let loginLinks: any = domPars.parseFromString(textHtml, `text/html`).querySelectorAll("[value^='https://id.skyeng.ru/auth/login-link/']")
                let last = loginLinks[loginLinks.length - 1].value;
                console.log(`Loginner: ${last}`)
                json.loginLink = last
                json.success = true
                console.log(json)
            }catch(err){
                json.success = false
            }
            callback(json)
            return arrayResult
        }

    }
}

export { GetterBackground }




