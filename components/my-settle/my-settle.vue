<template>
	<view class="my-settle-container">
		 <!-- 全选 -->
		 <label class="radio" @click="changeRadio">
		 	<radio color="#c00000" :checked="isFullCheck"/><text>全选</text>
		 </label>
		 <!-- 合计 -->
		 <view class="amount-box">
		 	合计：<text class="amount">￥{{totalPrice}}</text>
		 </view>
		 <!-- 按钮 -->
		 <view class="btn-settle">
			结算({{checkoutCount}})
		 </view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		name:"my-settle",
		computed:{
			...mapGetters("m_cart",['checkoutCount','total','totalPrice']),
			isFullCheck(){
				return this.checkoutCount === this.total
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			changeRadio(){
				this.updateAllGoodsState(!this.isFullCheck)
			}
		}
	}
</script>

<style lang="scss">
.my-settle-container{
	position: fixed;
	bottom:0;
	left: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 100rpx;
	font-size: 28rpx;
	padding-left: 20rpx;
	.radio{
		text{
			vertical-align: middle;
		}
	}
	.amount{
		color:#c00000;
	}
	.btn-settle{
		height: 100%;
		width:30%;
		background-color: #c00000;
		color: white;
		line-height: 100rpx;
		text-align: center;
	}
}
</style>
