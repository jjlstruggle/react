const init = {
    node:"",
    node2:""
}

export default function (pre=init,act){
    const {type,data} = act
    switch (type) {
        case "audio":
            return {
                node:data,
                node2:""
            }
        case "xxx":
            return pre            
        default:
            return pre
    }
}