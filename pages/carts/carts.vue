<template>
	<view>
		<view class="" v-if="cart.length !== 0">
			<myAddress></myAddress>
			<view class="cart-title">
				<uni-icons type="shop" size="18"></uni-icons>
				<text class="cart-title-text">购物车</text>
			</view>
			  
			<uni-swipe-action>
				<block v-for="(item,index) in cart" :key="index">
					<uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(item)">
						<myGoods :item="item" :isShow="true" @radio-change="changeCartStatus" :boxShow="true"
							@count-change="countClickHandler"></myGoods>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
			
			<mySettle></mySettle>
		</view>
		
		<view class="nocart" v-else>
			<view class="">
				<text>空空如也</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState,
		mapMutations
	} from 'vuex'
	import badgeMix from '../../mixins/tabbar-badge.js'
	
	
	import myGoods from '../../components/my-goods/my-goods.vue'
	import myAddress from '../../components/my-address/my-address.vue'
	import mySettle from '../../components/my-settle/my-settle.vue'
	export default {
		mixins: [badgeMix],
		computed: {
			...mapState("m_cart", ['cart'])
		},
		components: {
			myGoods,
			myAddress,
			mySettle
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}]
			};
		},
		methods: {
			...mapMutations("m_cart", ['changeCartStatus', 'changeCartCount','delCart']),
			// radioClickHandler(e) {
			// 	console.log(e)
			// 	this.changeCartStatus(e)
			// },
			countClickHandler(e) {
				console.log(e)
				this.changeCartCount(e)
			},
			swipeItemClickHandler(item){
				this.delCart(item)
			}
		}
	}
</script>

<style lang="scss">
	.cart-title {
		display: flex;
		height: 80rpx;
		font-size: 28rpx;
		padding-left: 10rpx;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			margin-left: 20rpx;
		}
	}
	.nocart{
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
