<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" style="height: 750rpx;">
			<swiper-item v-for="(item,index) in goods_detail.pics" :key="index">
				<view class="swiper-item" @click="preview(index)">
					<image :src="item.pics_big" mode="widthFix"></image>
				</view>
			</swiper-item>
		</swiper>

		<!-- 信息 -->
		<view class="goods_detail_info" v-if="goods_detail.goods_price">
			<view class="price">
				￥{{goods_detail.goods_price}}
			</view>
			<view class="goods_name">
				<view class="goods_name_left">
					{{goods_detail.goods_name}}
				</view>
				<view class="goods_name_right">
					<uni-icons type="star" size="18"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="info_bottom">
				<text>快递：免运费---- {{cart.length}}</text>
			</view>
		</view>

		<!-- 详情信息 -->
		<rich-text :nodes="goods_detail.goods_introduce"></rich-text>

		<!-- 导航组件 -->
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'

	export default {
		computed: {
			...mapState('m_cart', ['cart']),
			...mapGetters('m_cart', ['total'])
		},

		watch: {
			// total(newVal){
			// 	const result = this.options.find(item =>{
			// 		return item.text === '购物车'
			// 	})
			// 	console.log(result)
			// 	if(result){
			// 		result.info = newVal
			// 	}
			// }
			total: {  //total定一个对象
				handler(newVal) {
					const result = this.options.find(item => {
						return item.text === '购物车'
					})
					console.log(result)
					if (result) {
						result.info = newVal
					}
				},
				immediate:true  //解决页面刷新上标不显示问题
			}
		},

		data() {
			return {
				goods_id: '',
				goods_detail: {},
				options: [{
					icon: 'shop',
					text: '店铺',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff',

					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(options) {
			// console.log(options)
			this.goods_id = options.goods_id
			this.getGoodsDetail()
		},
		methods: {
			...mapMutations('m_cart', ['addCart']),
			async getGoodsDetail(id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail?goods_id=' + this.goods_id)
				if (res.meta.status !== 200) {
					uni.showToast({
						title: "请求失败",
						icon: "error",
						duration: 1500
					})
				} else {
					this.goods_detail = res.message
				}

			},
			preview(index) {
				uni.previewImage({
					current: index,
					urls: this.goods_detail.pics.map(item => item.pics_big)
				})
			},


			//点击购物车 跳转到购物车页面
			onClick(e) {
				console.log(e)
				if (e.content.text == "购物车") {
					uni.switchTab({
						url: '../../pages/carts/carts'
					})
				}
			},

			//点击加入购物车按钮 
			buttonClick(e) {
				// console.log(e)
				if (e.content.text === "加入购物车") {
					const goods = {
						goods_id: this.goods_detail.goods_id,
						goods_name: this.goods_detail.goods_name,
						goods_price: this.goods_detail.goods_price,
						goods_count: 1,
						goods_small_logo: this.goods_detail.goods_small_logo,
						goods_status: true
					}
					this.addCart(goods)
				} else if (e.content.text === "立即购买") {
					const cart = uni.getStorageSync('cart')
				}
			}

		}
	}
</script>

<style lang="scss">
	.swiper-item {
		image {
			width: 100%;
		}
	}

	//info
	.goods_detail_info {
		padding: 10px;

		.price {
			color: red;
			font-size: 18px;
		}

		.goods_name {
			display: flex;
			justify-content: space-between;

			.goods_name_left {
				padding-right: 20px;
			}

			.goods_name_right {
				width: 120rpx;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				align-items: center;
				color: gray;
			}
		}

		.info_bottom {
			color: gray;
			font-size: 12px;
			margin: 10px 0;
		}
	}

	.goods_nav {
		position: sticky;
		bottom: 0;
		z-index: 999;
	}
</style>
