<template>
	<div class="page" >
		<nav-bar text="我的项目">
			<span class="icon-chevron-left" slot="leftBar" @click="back"></span>
	        <span class="icon-refresh" slot="rightBar" @click="showSheet"></span>
		</nav-bar>
		<tab>
			<tab-item :selected="selectType==='我主导的项目'" @click="selectType='我主导的项目'">
				我主导的项目
			</tab-item>
			<tab-item :selected="selectType==='我参与的项目'" @click="selectType='我参与的项目'">
				我参与项目
			</tab-item>
		</tab>
		<div class="weui_tab_bd">
			
		</div>
	
		<toast v-show="showToast" type="loading"> 
			数据加载中...
		</toast>
		<actionsheet :show.sync="showsheet"  :menus="menuItems" :actions="actionItems" v-on:weui-menu-click="actionClick"></actionsheet>
	</div>
</template>

<script lang="babel">
	import {NavBar,PageBody} from '../components/'
	import {Tab,TabItem} from 'vux'
	import {Cells,LinkCell,CellsTitle,Toast,Actionsheet} from 'vue-weui'

	export default {
		name: 'Project',
		data () {
			return {
				showsheet:false,
				menuItems:{camaer:'拍照',img:'选择图片'},
				actionItems:{text:'取消'},
				showToast:false,
				selectType:'我主导的项目',
				mainData:[],
				partData:[],
				//链接请求  默认是查看项目详情,select是选择项目
				linkType:''
			}
		},
		methods: {
			back () {
				history.back();
			},
			showSheet () {
				this.showsheet=!this.showsheet;
			},
			actionClick (index) {
				alert(index);
			},
			getInitData () {
				alert('集合刷新');
			},
			getMoreData () {
				alert("集合加载更多")
			},
			goPage (index,flag) {
				var projectCode='';
				var projectName='';
				if(flag==0){
					projectCode=this.mainData[index].id;
					projectName=this.mainData[index].text;
				}else{
					projectCode=this.partData[index].id;
					projectName=this.partData[index].text;
				}
				if(this.linkType=="select"){
					this.$route.router.go({
						name:'logdetail',
						query:{
							projectCode:projectCode,
							projectName:projectName
						}
					});
				}else{

				}
			}
		},
		components:{
			NavBar,
			Actionsheet,
			Toast,
			PageBody,
			TabItem,
			Tab,
			Cells,
			LinkCell,
			CellsTitle
		},
		route: {
			data (transition) {
				this.linkType=transition.to.params.linkType||'';
				//加载项目信息
				this.showToast=true;
				this.$http.get("Project",{"type":0,"key":"",userId:10353}).then((response)=>{
					console.log(response);
					this.showToast=false;
					var data=response.data;
					this.mainData=data;

				},(error)=>{
					this.showToast=false;
				})
			}
		}
	}
</script>


<style scoped>
	.page-bd{
		padding-bottom: 85px;
	}
</style>