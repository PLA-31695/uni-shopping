<template>
	<view class="">
		<view v-for="(item,index) in goodsList" :key="index"  @click="gotoGoodsDetail(item.goods_id)">
			<myGoods :item= "item"></myGoods>
		</view>
	</view>
	
</template>

<script>
	import myGoods from "../../components/my-goods/my-goods.vue"
	export default {
		components:{
			myGoods
		},
		data() {
			return {
				isloading:false,
				goodsList:[],
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				}
			}
		},
		onLoad(options){
			console.log(options)
			this.queryObj.cid = options.cid||"",
			this.queryObj.query = options.query||"",
			this.getGoodsList()
		},
		methods: {
			gotoGoodsDetail(id){
				uni.navigateTo({
					url:'../../subpkg/goods_detail/goods_detail?goods_id=' + id
				})
			},
			async getGoodsList(){
				this.isloading  = true
				const {data:res} = await uni.$http.get("/api/public/v1/goods/search",this.queryObj)
				console.log(res)
				this.isloading = false
				if(res.meta.status !== 200){
					return uni.showToast({
						title:"请求失败",
						duration:1500,
						icon:"error"
					})
				}
				this.goodsList = [...this.goodsList,... res.message.goods]
				console.log(this.goodsList)
			}
		},
		onReachBottom(){
			if(this.isloading)return
			this.queryObj.pagenum ++;
			this.getGoodsList()
		}
	}
</script>

<style lang="scss">

</style>
