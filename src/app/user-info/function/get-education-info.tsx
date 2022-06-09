import { api } from '../../../service/api-url';
const getEducationInfo = async (userId: any) => {
    const arrayResult = {
        'education-service': {},
        'configurations' : []
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
    return arrayResult

}

export { getEducationInfo }