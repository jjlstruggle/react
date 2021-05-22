const init = {
    node2: ""
}

export default function (pre = init, act) {
    const { type, data } = act
    switch (type) {
        case true:
            return {
                node2:data
            }
        default:
            return pre
    }
}