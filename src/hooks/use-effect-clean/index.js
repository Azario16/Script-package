let effectStatus = true;

function effect(){
    return {
        getStatus: ()=>{
            console.log('getStatus')
            return effectStatus
        },
        setStatus: (value) =>{
            console.log('setStatus')
            effectStatus = value
        }
    }
}

export { effect }