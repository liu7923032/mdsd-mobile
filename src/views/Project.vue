<template>
	<div class="page project" >
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
	        <scroller lock-x scrollbar-y use-pullup :pullup-status.sync="pullupStatus" @pullup:loading="loadMore">
	     		 <!--content slot-->
		      <div class="box2" >
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
					  <scroller lock-x scrollbar-y use-pullup  :pullup-status.sync="pullupStatus" @pullup:loading="loadMore">
		     		 <!--content slot-->
			      <div class="box2">
			        	<cell  v-for="item in partData" is-link v-link="'/project/projectinfo/'+item.value">
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
				srcType:''
			}
		},
		methods: {
			switchTab (flag) {
				this.selectIndex=flag;
				var data=flag==0?this.mainData:this.partData;
				if(data.length==0){
					this.loadMore(flag);
				}
			},
			loadMore (type) {
				var index=type==0?this.mainIndex:this.partIndex;
				this.$http.get('Project',{type:type,pageIndex:index}).then((response)=>{
						if(type==0){
							if(index==0){
								this.mainData=response.data;
							}else{
								this.mainData.concat(response.data);
							}
							this.mainIndex++;
						}else{
							if(index==0){
								this.partData=response.data;
							}else{
								this.partData.concat(response.data);
							}
							this.partIndex++;
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
				this.loadMore(0);
				
			}
		}
	}
</script>


<style scoped>


	.project{
		padding-bottom: 85px;

	}
</style>