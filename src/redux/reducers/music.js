const init = {
    musicList: false
}

export default function (pre = init, act) {
    const { type, data } = act
    switch (type) {
        case "musicListPage":
                return {
                    musicList:data
                }
        default:
            return pre
    }
}