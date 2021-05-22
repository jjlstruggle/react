const init = {
    state:"logout",
    method:"phone",
    page:"close",
    imf:{
        uid:"",
        uImg:"",
        uName:"",
        uVip:""
    },
}

export default function (pre=init,act){
    const {type,data} = act
    switch (type) {
        case "open":
            return {
                page:"open",
                method:data.m,
                state:"logout",
            }
        case "close":
            return {
                page:"close",
                method:data.m,
                state:"logout"
            }
        case "login":
            return {
                page:"close",
                method:data.m,
                state:"login",
                imf:{
                    uid:data.id,
                    uImg:data.img,
                    uName:data.name,
                    uVip:data.vipType
                }
            }
        default:
            return pre
    }
}