
<template>
	<view>
		<view class="my-userInfo-container">
			<view class="top-image">
				<image src="../static/avatar%20.jpg" mode=""></image>
				<view class="username">
					<text>not bad</text>
				</view>
			</view>
			<view class="panel-list">
				<!-- 第一个面板 -->
				<view class="panel">
					<view class="panel-item">
						<text>3</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>3</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>2</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>31</text>
						<text>足迹</text>
					</view>
				</view>
				<!-- 第二个面板 -->
				<view class="panel-header">
					<text>我的订单</text>
				</view>
				<view class="panel">
					<view class="panel-item">
						<uni-icons type="compose" size="30" color="red"> </uni-icons>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<uni-icons type="shop" size="30" color="red"></uni-icons>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<uni-icons type="loop" size="30" color="red"></uni-icons>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<uni-icons type="headphones" size="30" color="red"></uni-icons>
						<text>待付款</text>
					</view>
					
				</view>
				<!-- 第三个面板 -->
					<view class="panel-bottom">
						<text>收货地址</text>
						<uni-icons type="right" size="20"></uni-icons>
					</view>
					<view class="panel-bottom">
						<text>联系客服</text>
						<uni-icons type="right" size="20"></uni-icons>
					</view>
					<view class="panel-bottom" @click="logout">
						<text>退出登录</text>
						<uni-icons type="right" size="20"></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapGetters} from 'vuex'
	export default {
		name:"my-userInfo",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_user',['updataAddress','updataUserInfo','updataToken']),
			async logout(){
				const [err,succ] = await uni.showModal({
					title:'提示',
					content:'是否退出登录',
				}).catch(err => err)
				if(succ&&succ.confirm){
					this.updataAddress({})
					this.updataUserInfo({})
					this.updataToken('')
				}
			}
		}
	}
</script>

<style lang="scss">
.my-userInfo-container{
	height: 100%;
	background-color: #f4f4f4;
	.top-image{
		height: 400rpx;
		background-color: #c00000;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image{
			display: inline-block;
			height: 150rpx;
			width: 150rpx;
			border: 2px solid white;
			border-radius: 50%;
		}
		.username{
			margin-top: 20rpx;
			color: white;
		}
	}
}
.panel-list{
	width: 90%;
	margin: -10px auto;
	background-color: white;
	border-radius: 10rpx;
	.panel-header{
		margin-top: 80rpx;
		font-weight: bold;
		font-size: 24rpx;
	}
	.panel{
		display: flex;
		justify-content: space-around;
		.panel-item{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding-top: 10rpx;
			font-size: 24rpx;
		}
	}
}
.panel-bottom{
	margin-top: 60rpx;
	height: 50rpx;
	display: flex;
	justify-content: space-between;
	font-size: 28rpx;
}
</style>
