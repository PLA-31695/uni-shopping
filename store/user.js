export default {
	namespaced:true,
	
	
	state:() =>({
		address:JSON.parse(uni.getStorageSync('address')||'{}'),
		token:uni.getStorageSync('token')||'',
		userInfo:JSON.parse(uni.getStorageSync('userInfo') ||'{}'),
		redirectInfo:null
	}),
	
	mutations:{
		undataRedirect(state,info){
			state.redirectInfo = info
			console.log(state.redirectInfo)
		},
		updataAddress(state,address){
			state.address = address
			// console.log(state.address)
			this.commit('m_user/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		updataUserInfo(state,userInfo){
			state.userInfo = userInfo,
			this.commit('m_user/saveUserInfoToStorage')
		},
		saveUserInfoToStorage(state){
			uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
		},
		updataToken(state,token){
			state.token = token
			this.commit('m_user/saveTokenToStorage')
		},
		saveTokenToStorage(state){
			uni.setStorageSync('token',state.token)
		}
	},
	getters:{
		detailAddress(state){
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		},
		
	}
}