const init = {
    node:"",
}

export default function (pre=init,act){
    const {type,data} = act
    // console.log(data)
    switch (type) {
        case "audio":
            return {
                node:data,
            }
        default:
            return pre
    }
}