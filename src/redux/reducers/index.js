import {combineReducers} from 'redux'

import login from './login'
import playlist from './playlsit'
import player from './player'

export default combineReducers({
	login,playlist,player
})