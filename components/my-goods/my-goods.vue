<template>
	<view class="goods-list" @click="gotoGoodsDetail(item.goods_id)">
		<image :src="item.goods_small_logo" mode="widthFix"></image>
		<view class="goods-list-right">
			<view class="goods-name">{{item.goods_name}}</view>
			<view class="goods-price">￥{{item.goods_price | tofixed}}</view>
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

			}
		},
		methods:{
			gotoGoodsDetail(id){
				uni.navigateTo({
					url:'../../subpkg/goods_detail/goods_detail?goods_id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-list {
		display: flex;
		width: 100%;
		image {
			width: 50%;
		}

		.goods-list-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}
</style>
