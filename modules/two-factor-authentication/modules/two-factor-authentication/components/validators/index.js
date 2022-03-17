


export const emailValidator= (email) =>{
    const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
    if (regex.test(email)){
        return true
    }
    else return false
}

export const phoneValidator=(num)=>{
    if (num.length >= 10 && typeof(parseInt(num))==='number'){
        return true
    }
    else return false
}
