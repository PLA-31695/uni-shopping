<template>
	<view>
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="addressBtn" @click="chooseAddress">请选择收货地址+</button>
		</view>
	
		<view class="address-info" v-else @click="chooseAddress">
			<view class="top">
				<view class="top-right">
					<view class="username">
						收货人：{{address.userName}}
					</view>
				</view>
				<view class="top-left">
					<view class="phone">
						电话：{{address.telNumber}}
						<uni-icons type="arrowright" size="16"></uni-icons>
					</view>
				</view>
			</view>
			<view class="bottom">
				收货地址：{{detailAddress}}
			</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState,mapGetters} from 'vuex'
	
	export default {
		name:"my-address",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['address']),
			...mapGetters('m_user',['detailAddress'])
		},
		methods:{
			...mapMutations('m_user',['updataAddress']),
			async chooseAddress(){
				const [err,succ] = await uni.chooseAddress().catch(err =>err)
				if(err === null&&succ.errMsg === "chooseAddress:ok"){
					// this.address = succ
					console.log(succ)
					this.updataAddress(succ)
				}
			}
		}
	}
</script>

<style lang="scss">
.address-choose-box{
	height: 180rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	.addressBtn{
		
	}
}
.address-info{
	padding: 20rpx 30rpx;
	font-size:24rpx;
	.top{
		display: flex;
		justify-content: space-between;
	}
	.bottom{
		margin-top: 30rpx;
	}
}
</style>
