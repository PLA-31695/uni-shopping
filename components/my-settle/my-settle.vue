<template>
	<view class="my-settle-container">
		<!-- 全选 -->
		<label class="radio" @click="changeRadio">
			<radio color="#c00000" :checked="isFullCheck" /><text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="amount-box">
			合计：<text class="amount">￥{{totalPrice}}</text>
		</view>
		<!-- 按钮 -->
		<view class="btn-settle" @click="settlement">
			结算({{checkoutCount}})
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-settle",
		computed: {
			...mapGetters("m_cart", ['checkoutCount', 'total', 'totalPrice']),
			...mapState('m_user', ['token']),
			...mapGetters('m_user', ['detailAddress']),
			isFullCheck() {
				return this.checkoutCount === this.total
			}
		},
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			...mapMutations('m_user', ['undataRedirect']),
			showTips(n) {
				let timer = setInterval(() => {
						if (n < 0) {
							clearInterval(timer)
							uni.switchTab({
								url: '../../pages/profile/profile',
								success: () => {
									this.undataRedirect({
										opentype: 'switchTab',
										from: '/pages/carts/carts'
									})
								}
							})
						}
				else {
					uni.showToast({
						title: '请登录后再结算！' + n + 's后自动跳转到登录界面',
						mask: true,
						icon: 'none'
					})
				}
				n--;
			},
			1000)

	},
	changeRadio() {
			this.updateAllGoodsState(!this.isFullCheck)
		},
		settlement() {
			if (!this.detailAddress) {
				return uni.showToast({
					title: "请选择邮寄地址",
					icon: "error",
					duration: 1500
				})
			}
			if (!this.checkoutCount) {
				return uni.showToast({
					title: "请勾选购买商品",
					icon: "error",
					duration: 1500
				})
			}
			if (!this.token) {
				this.showTips(3)
			}
		}
	}
	}
</script>

<style lang="scss">
	.my-settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 100rpx;
		font-size: 28rpx;
		padding-left: 20rpx;

		.radio {
			text {
				vertical-align: middle;
			}
		}

		.amount {
			color: #c00000;
		}

		.btn-settle {
			height: 100%;
			width: 30%;
			background-color: #c00000;
			color: white;
			line-height: 100rpx;
			text-align: center;
		}
	}
</style>
