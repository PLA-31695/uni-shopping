<template>
	<view class="scroll-container">
		<scroll-view scroll-y="true" class="scroll-left" :style="{height: wh + 'px'}">

			<view :class="['left-scroll-item' ,index === active?'active':'']" 
			v-for="(item,index) in cateList" 
			:key="index" @click="clickHandle(index)">{{item.cat_name}}</view>
		 
		</scroll-view>
		<scroll-view scroll-y="true" class="scroll-right" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
			<view  v-for="(item,index) in cateLevel2" :key="index"  >
				<view class="cate-lv2-title">{{item.cat_name}}</view> 
				<view class="cate-lv2-image">
					<view v-for="(item1,index1) in item.children" >
						<view class="cate-lv3" @click="cateClick(item1)">
							<image :src="item1.cat_icon" mode="widthFix"></image>
							<text>{{item1.cat_name}}</text>
						</view>
					</view>
				</view>
			</view>
			
		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh:0,
				cateList:[],
				cateLevel2:[],
				active:0,
				scrollTop:0
			}
		},
		onLoad(){
			 const systemInfo = uni.getSystemInfoSync();
			 this.wh = systemInfo.windowHeight
			 this.getCateList()
		},
		methods:{
			async getCateList(){
				const {data:res} = await uni.$http.get('/api/public/v1/categories')
				console.log(res)
				if(res.meta.status !== 200){
					return uni.showToast({
						title:"请求失败",
						duration:1500,
						icon:'error'
					})
				}
				this.cateList = res.message
				this.cateLevel2 = this.cateList[0].children
				console.log(this.cateLevel2)
			},
			
			clickHandle(index){
				this.active = index
				this.cateLevel2 = this.cateList[index].children
				this.scrollTop = this.scrollTop === 0 ? 1:0
			},
			
			cateClick(item1){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?cid=' + item1.cat_id
				})
			}
			
			
		}
	}
</script>

<style lang="scss">
	.scroll-container{
		display: flex;
		.scroll-left{
			width: 200rpx;
			.left-scroll-item{
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				font-size: 25rpx;
				background-color: #f7f7f7;
			}
			& .active{
				position: relative;
				background-color: #FFFFFF;
				&::before{
					content: "";
					position: absolute;
					top: 20rpx;
					left: 0;
					display: inline-block;
					height: 60rpx;
					border: 1rpx solid #C00000;
				}
			}
		}
		.scroll-right{
				.cate-lv2-title{
					font-weight: bold;
					text-align: center;
					height: 100rpx;
					line-height: 100rpx;
				}
				.cate-lv2-image{
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					align-items: center;
					.cate-lv3{
						width: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						image{
							width: 150rpx;
						}
						
					}
				}
		}
	}
</style>
