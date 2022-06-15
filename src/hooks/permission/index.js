const USER_PERMISSIONS = {
    accesPermission: {}
}


const setUserPermission = (permissions) => {
    // console.log('setUserPermission')
    USER_PERMISSIONS.accesPermission = permissions
}

const getUserPermission = () => {
    // console.log('getUserPermission')
    return USER_PERMISSIONS.accesPermission
}


export { setUserPermission, getUserPermission}