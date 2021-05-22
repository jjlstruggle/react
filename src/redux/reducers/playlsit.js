const init = {
    playlistId:"",
    musicIdArr:"",
    musicId:"",
    url:"",
    musicId:"",
    name:"",
    timer:"",
    author:[],
    album:"",
    coverImg:""
}

export default function (pre=init,act){
    const {type,data} = act
    switch (type) {
        case "playlist":
            return {
                playlistId:data.playlistId,
                musicIdArr:data.musicIdArr,
            }
        case "music":
            return {
                musicId:data.id,
                url:data.url,
                name:data.name,
                album:data.album,
                author:data.author,
                timer:data.timer,
                coverImg:data.coverImg
            }
        default:
            return pre
    }
}