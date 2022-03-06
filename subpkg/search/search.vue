<template>
	<view>
		<view class="search-box">
			<uni-search-bar placeholder="请输入搜索内容" :radius="100" @confirm="search" @input="input" cancelButton="none">
			</uni-search-bar>
		</view>
		
		<!-- 搜索历史区域 -->
		<view class="history-box" v-if="searchResult.length === 0">
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash-filled" size="20" @click="clearHistory"></uni-icons>
			</view>
			<view class="history-body">
				<uni-tag :text="item" v-for="(item,index) in history"></uni-tag>
			</view>
		</view>
		
		<!-- 搜索建议区域 -->
		<view class="sug-list" v-else>
			<view class="sug-item" v-for="(item,index) in searchResult" :key='index' @click='getDetail(item.goods_id)'>
				<view class="goods_name">
					{{item.goods_name}}
				</view>
				<uni-icons type="right" size="17"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				searchResult: [],
				keyWord: '',
				history:[]
			};
		},
		methods: {
			input(e) {
				clearTimeout(this.timer)
				// console.log(e)
				this.timer = setTimeout(() => {
					this.keyWord = e
					this.getSearchList()
				}, 500)
			},
			async getSearchList() {
				if (this.keyWord.length === 0) {
					return this.searchResult= []
				}
				console.log('123')
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.keyWord
				})
				this.searchResult = res.message
				// console.log(res)
				
			},
			getDetail(id){
				uni.navigateTo({
					url:"/subpkg/goods_detail/goods_detail?cid=" + id
				})
				this.saveHistoryList()
			},
			saveHistoryList(){
				this.history.unshift(this.keyWord)
				const set = new Set(this.history)
				this.history = Array.from(set)
				// console.log(this.history)
				//本地化存储
				uni.setStorageSync(
					'kw',JSON.stringify(this.history)
				)
			},
			clearHistory(){
				this.history = []
				uni.setStorageSync('kw','[]')
			}
		},
		computed:{
		},
		onLoad(){
			this.history = JSON.parse(uni.getStorageSync('kw')||"[]")
		}
	}
</script>

<style lang="scss">
	.search-box {
		background-color: #0e1ef8;
	}
	.sug-item{
		display: flex;
		justify-content: space-between;
		height: 100rpx;
		line-height: 100rpx;
		.goods_name{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-left: 10rpx;
		}
	}
	.history-box{
		.history-title{
			margin: 0 20rpx;
			display: flex;
			justify-content: space-between;
		}
		.history-body{
			 text{
				 margin: 20rpx;
			 }
		}
	}
</style>
