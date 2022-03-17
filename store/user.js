export default {
	namespaced:true,
	
	
	state:() =>({
		address:JSON.parse(uni.getStorageSync('address')||'{}')
	}),
	
	mutations:{
		updataAddress(state,address){
			state.address = address
			// console.log(state.address)
			this.commit('m_user/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		}
	},
	getters:{
		detailAddress(state){
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		},
		
	}
}