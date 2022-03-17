<template>
	<view class="goods-list">
		<view class="goods-list-left">
			<radio :checked="item.goods_status" color="red" v-if="isShow" @click='radioClickHandler'></radio>
			<image :src="item.goods_small_logo" mode="widthFix"></image>		
		</view>
		 
		<view class="goods-list-right">
			<view class="goods-name">{{item.goods_name}}</view>
			<view class="goods-price">￥{{item.goods_price | tofixed}}</view>
			<uni-number-box :min="1" :value="item.goods_count" v-if="boxShow" @change="boxClickHandler"></uni-number-box>
		</view>
	</view>
</template>

<script>
	export default { 
		name: "my-goods",
		data() {
			return {

			};
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
		props: {
			item: {
				type: Object,
				default: {}
			},
			isShow: {
				type:Boolean,
				default:false
			},
			boxShow:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			
			radioClickHandler(){
				this.$emit('radio-change',{
					goods_id:this.item.goods_id,
					goods_status:!this.item.goods_status
				})
			},
			boxClickHandler(val){
				this.$emit('count-change',{
					goods_id:this.item.goods_id,
					goods_count:  val
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-list {
		display: flex;
		width: 100%;
		}
		.goods-list-left{
			display: flex;
			margin-right: 10rpx;
			justify-content: space-between;
			align-items: center;
			width: 50%;
			image {
				width: 200rpx;
				height: 200rpx;
		}
		.goods-list-right { 
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 20rpx;
		}
	}
</style>
