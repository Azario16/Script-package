import { api } from '../../../service/api-url';
const getTeacherTrmId = async (userId: any) => {
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
    const resultTrmId= await getTrmId.json();
    arrayResult['teacher-id'] = resultTrmId

    return arrayResult

}

export { getTeacherTrmId }