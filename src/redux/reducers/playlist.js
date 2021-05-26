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
    coverImg:"",
    index:0,
}

export default function (pre=init,act){
    const {type,data} = act
    switch (type) {
        case "music":
            return {
                musicId:data.id,
                url:data.url,
                name:data.name,
                album:data.album,
                author:data.author,
                timer:data.timer,
                coverImg:data.coverImg,
                index:data.index
            }
            
        default:
            return pre
    }
}