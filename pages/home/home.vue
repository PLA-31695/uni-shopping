<template>
	<view>
		<view class="search-box">
			<my-search></my-search>
		</view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="nav">
			<navigator v-for="(item,index) in navList" :key="index" class="nav-item">
				<image :src="item.image_src"></image>
			</navigator>
		</view>
		<view class="floor" v-for="(item,index) in floorList">
			<image :src="item.floor_title.image_src"></image>
			<view class="floor-box">
				<view class="left-box">
					<image :src="item.product_list[0].image_src"
						:style="{ width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
				</view>
				<view class="right-box">
					<navigator v-for="(item1,index) in item.product_list" v-if="index !== 0" :url="item1.url">
						<image :src="item1.image_src" :style="{ width:item1.image_width + 'rpx'}" mode="widthFix">
						</image>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '../../mixins/tabbar-badge.js'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				swiperList: [], //轮播图的数据
				navList: [], //导航栏数据
				floorList: [] //楼层数据
			};
		},
		onLoad() {
			this.getSwiperList(),
				this.getNavList()
			this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				// console.log(res)
				if (res.meta.status !== 200) {
					return uni.showToast({
						title: "请求失败",
						duration: 1500,
						icon: "error"
					})
				}
				this.swiperList = res.message
			},
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')

				if (res.meta.status !== 200) {
					return uni.showToast({
						title: "请求失败",
						duration: 1500,
						icon: "error"
					})
				}
				this.navList = res.message

			},
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')

				if (res.meta.status !== 200) {
					return uni.showToast({
						title: "请求失败",
						duration: 1500,
						icon: "error"
					})
				}
				this.floorList = res.message
				console.log(this.floorList)
				this.floorList.forEach(floor => {
					floor.product_list.forEach(item => {
						item.url = `/subpkg/goods_list/goods_list?${item.navigator_url.split("?")[1]}`
					})
				})


			}
		}
	}
</script>

<style lang="scss">
	.search-box{
		position: sticky;
		top: 0;
		z-index: 1;
	}
	swiper {
		height: 330rpx;
		padding: 20rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav {
		display: flex;
		height: 200rpx;
		justify-content: space-around;

		.nav-item,
		image {
			height: 140rpx;
			width: 128rpx;
		}
	}

	.floor {
		image {
			height: 60rpx;
			widows: 100%;
		}

		.floor-box {
			display: flex;

			.left-box {
				flex: 1;
			}

			.right-box {
				flex: 2;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;

			}
		}
	}
</style>
