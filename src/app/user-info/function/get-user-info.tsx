import { api } from '../../../service/api-url';
const getUserInfo = async (userId: any) => {
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
        const resultFamily= await getFamily.json();
        arrayResult['family'] = resultFamily

        return arrayResult
   
}

export { getUserInfo }