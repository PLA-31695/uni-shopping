export default {
	namespaced:true,
	//开启命名空间
	
	state:() => ({
		cart:JSON.parse(uni.getStorageSync('cart')||'[]')
	}),
	
	mutations:{
		addCart(state,goods){
			const res = state.cart.find(item => item.goods_id === goods.goods_id)
			console.log(res)
			if(!res){
				state.cart.push(goods)
			}else{
				res.goods_count++
			}
			this.commit('m_cart/saveToStorage') //调用commit方法  实现m_cart命名空间下的saveToStorage方法
			console.log(state.cart)
		}, 
		
		// 改变购物车数量
		
		changeCartCount(state,goods){
			// 查询购物车的id
			const res = state.cart.find(item => item.goods_id === goods.goods_id)
			if(res){
				res.goods_count = goods.goods_count
				console.log(state.cart)
				this.commit('m_cart/saveToStorage')
			}
			
		},
		
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		changeCartStatus(state,goods){
			const res = state.cart.find(item => item.goods_id === goods.goods_id)
			if(res){
				res.goods_status = goods.goods_status
				
				console.log(state.cart)
				this.commit("m_cart/saveToStorage")
			}
			
		},
		delCart(state,goods){
			 state.cart = state.cart.filter(item => item.goods_id !== goods.goods_id)
			this.commit("m_cart/saveToStorage")
		},
		updateAllGoodsState(state,newStatus){
			state.cart.forEach(item => item.goods_status = newStatus)
			this.commit('m_cart/saveToStorage')
		}
		
		
	},
	
	getters:{
		total(state){
			return state.cart.reduce((total,item) => total+=item.goods_count,0)
		},
		checkoutCount(state){
			return state.cart.filter(item => item.goods_status).reduce((total,item) => total+=item.goods_count,0)
		},
		totalPrice(state){
			
			return state.cart.filter(item => item.goods_status).reduce((total,item) => total+=item.goods_count*item.goods_price,0).toFixed(2)
		}
	},
	
}