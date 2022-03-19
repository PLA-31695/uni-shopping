<template>
	<view class="mylogin">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<button type="warn" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<view class="bottom">
			登录后享受更多权力
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		name:"my-login",
		computed:{
			...mapState('m_user',['redirectInfo'])
		},
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_user',['updataUserInfo','updataToken','undataRedirect']),
			getUserInfo(e){
				console.log(e.detail)
				this.updataUserInfo(e.detail.userInfo)
				this.getToken(e.detail)
			},
			async getToken(info){
				const [err,succ] = await uni.login().catch(err => err)
				console.log(succ)
				if(err||succ.errMsg !== "login:ok") {
					return uni.showToast({
						title:"登陆失败",
						icon:"error",
						duration:1500
					})
				}
				const query = {
					code:succ.code,
					iv:info.iv,
					encryptedData:info.encryptedData,
					signature:info.signature,
					rawData:info.rawData
				}
				console.log(query)
				const {data:res} = await uni.$http.post('/api/public/v1/users/wxlogin',query)
				
				this.updataToken(res.meta.msg)
				this.navigatorBack()
			},
			navigatorBack(){
				if(this.redirectInfo.opentype === "switchTab"){
					uni.switchTab({
						url:this.redirectInfo.from,
						complete:() =>{
							this.undataRedirect(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.mylogin{
		display: flex;
		height:100vh;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		button{
			width: 100%;
			border-radius: 45rpx;
		}
		.bottom{
			margin-top:20rpx;
			color:#303133;
			font-size: 24rpx;
		}
	}
</style>
