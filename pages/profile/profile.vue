<template>
	<view>
		<myLogin v-if="!token"></myLogin>
		<myUserInfo v-else></myUserInfo>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import badgeMix from '../../mixins/tabbar-badge.js'
	import myLogin from '../../components/my-login/my-login.vue'
	import myUserInfo from '../../components/my-userInfo.vue'
	export default {
		mixins:[badgeMix],
		computed:{
			...mapState('m_user',['token']),
		},
		components:{
			
			myLogin,
			myUserInfo
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
