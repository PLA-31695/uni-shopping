<template>
	<view>
		<view class="top" @click="searchBoxHandle">
			<view class="search">
				<uni-icons type="search" size="17"></uni-icons>
				<text>搜索</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		methods:{
			searchBoxHandle(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.top{
	height: 100rpx;
	background-color:#0e1ef8 ;
	padding-bottom: 5rpx;
	.search{
		height: 95rpx;
		width: 95%;
		margin: 0 auto;
		background-color: white;
		border-radius:45rpx;
		text-align: center;
		line-height: 95rpx;
		font-size: 30rpx;
	}
}
</style>
