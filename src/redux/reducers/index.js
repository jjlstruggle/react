import {combineReducers} from 'redux'

import playlist from './playlist'
import player from './player'
import musicList from './musicList'
import music from './music'

export default combineReducers({
	playlist,player,musicList,music
})