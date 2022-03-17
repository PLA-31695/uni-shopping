import Vue from 'vue'
import Vuex from 'vuex'
import cartModule from './carts.js'
import userModule from './user.js'
//导入vue和vuex
Vue.use(Vuex)
//将vuex安装成vue的插件

//创建store的实例对象
const store = new Vuex.Store({
	modules:{
		"m_cart":cartModule,
		"m_user":userModule
	}
})

export default store