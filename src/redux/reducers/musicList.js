const init = {
    musicImf:[]
}

export default function (pre = init, act) {
    const { type, data } = act
    switch (type) {
        case "musicList":
            return {
                musicImf:data
            }
        default:
            return pre
    }
}