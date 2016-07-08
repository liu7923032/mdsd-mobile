<template>
	<div class="page project">
		<x-header :left-options="{showBack:true,backText:'返回'}">
			<p>项目信息</p>
			<div slot="right">

			</div>
		</x-header>
		<tab>
			<tab-item :selected="selectIndex === 0" @click="switchTab(0)">
				我主导的项目
			</tab-item>
			<tab-item :selected="selectIndex === 1" @click="switchTab(1)">
				我参与项目
			</tab-item>
		</tab>
		<div class="weui_tab_bd">
			<!-- 我主导的项目 -->
			<div v-show="selectIndex==0">
				<scroller use-pullup v-ref:mainscroller :pullup-status.sync="pullupStatus" lock-x scrollbar-y @pullup:loading="loadMore">
					<!--content slot-->
					<div class="box2">
						<cell v-for="item in mainData" is-link v-link="'/project/projectinfo/'+item.value">
							<div slot="after-title">
								<span style="color: black">{{item.name}}</span>
							</div>
						</cell>
					</div>
					<!--pullup slot-->
					<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
						<span v-show="pullupStatus === 'default'"></span>
						<span class="pullup-arrow" v-show="pullupStatus === 'down' || pullupStatus === 'up'" :class="{'rotate': pullupStatus === 'up'}">↑</span>
						<span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
					</div>
				</scroller>
			</div>
			<!-- 我参与的项目 -->
			<div v-show="selectIndex==1">
				<scroller v-ref:partscroller lock-x scrollbar-y use-pullup :pullup-status.sync="pullupStatus" @pullup:loading="loadMore">
					<!--content slot-->
					<div class="box2">
						<cell v-for="item in partData" is-link v-link="'/project/projectinfo/'+item.value">
							<div slot="after-title">
								<span style="color: black;">{{item.name}}</span>
							</div>
						</cell>
					</div>
					<!--pullup slot-->
					<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
						<span v-show="pullupStatus === 'default'"></span>
						<span class="pullup-arrow" v-show="pullupStatus === 'down' || pullupStatus === 'up'" :class="{'rotate': pullupStatus === 'up'}">↑</span>
						<span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
					</div>
				</scroller>
			</div>
		</div>
	</div>
</template>

<script lang="babel">
	import {Tab,TabItem,XHeader,Cell,Scroller,Spinner} from 'vux'

	export default {
		name: 'Project',
		data () {
			return {
				mainData:[],
				partData:[],
				selectIndex:0,
				pullupStatus:'default',
				mainIndex:0,
				partIndex:0,
				srcType:'',
				curType:0,
				pullconfig:{
					content: '下拉刷新',
					downContent: '下拉刷新',
					upContent: '释放刷新',
					loadingContent: '加载中'
				}
			}
		},
		methods: {
			switchTab (flag) {
				this.selectIndex=flag;
				var data=flag==0?this.mainData:this.partData;
				this.curType=flag;
				if(data.length==0){
					this.loadMore();
				}
			},
			loadMore (uuid) {
				var _this=this;
				var index=_this.curType==0?_this.mainIndex:this.partIndex;
				console.log(index);
				_this.$http.get('Project',{type:_this.curType,pageIndex:index}).then((response)=>{
						
						if(_this.curType==0){

							if(index==0){
								_this.mainData=response.data;
							}else{
								_this.mainData.concat(response.data);
							}
							_this.mainIndex++;
							_this.$nextTick(function(){
								 _this.$refs.mainscroller.reset();
								  _this.pullupStatus="default"
								// _this.$broadcast('pullup:reset', uuid)
							});
						}else{
							if(index==0){
								_this.partData=response.data;
							}else{
								_this.partData.concat(response.data);
							}
							_this.partIndex++;
							_this.$nextTick(function(){
								 _this.$refs.partscroller.reset();
								 _this.pullupStatus="default"
								// _this.$broadcast('pullup:reset', uuid)
							});
						}
				},(error)=>{

				})
			}
		},
		components:{
			TabItem,
			Tab,
			Cell,
			XHeader,
			Scroller,
			Spinner
		},
		route: {
			data (transition) {
				var that=this;
				this.loadMore();
			}
		}
	}
</script>


<style scoped>

</style>