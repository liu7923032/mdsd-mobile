<template>
	<div class="page logInfo">
		<nav-bar :text="curDay">
			<span class="icon-chevron-left" slot="leftBar" @click="back"></span>
			<!-- <span class="icon-add" slot="rightBar" @click="addTask"></span> -->
			<a class="icon-plus"   slot="rightBar" @click="addTask"></a>
		</nav-bar>	
		<page-body>
			<group>
				<cell v-for="item in logInfo" >
					<div slot="after-title">
						<table class="log">
							<tbody>
								<tr>
									<td class="tdLabel">日志名称</td>
									<td>{{item.LogTitle}}</td>
								</tr>

								<tr>
									<td class="tdLabel">开始时间</td>
									<td>{{item.SDate}}</td>
								</tr>
								<tr>
									<td class="tdLabel">结束时间</td>
									<td>{{item.EDate}}</td>
								</tr>
								<tr>
									<td class="tdLabel">工作类型</td>
									<td >{{item.WType}}</td>
								</tr>
								
								<tr v-for="subItem in item.SubItems">
									<td class="tdLabel">{{subItem.SubType}}</td>
									<td>{{{ subItem.SubContent | replace '\n' '&lt;br /&gt;' }}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</cell>
			</group>
			
		</page-body>
		<loading :show.sync="isloading">
			加载中..
		</loading>
	</div>
</template>


<script lang="babel">
	import {NavBar,PageBody} from '../../components/'
	import {Loading,Group,Cell} from 'vux'

	export default {
		name:'loginfo',
		data(){
			return {
				curDay:'',
				logInfo: [],
				userId:0,
				isloading:false
			}
		},

		route:{
			//加载数
			data(transition){
				console.log(transition);
				//加载数据
			  this.curDay=transition.to.params.date;
			  this.userId=this.$root.userId;
			  console.log("loginfo-"+this.userId);
			  this.isloading=true;
			  var rUrl='WorkLog/'+this.curDay+"/10685";

			  this.$http.get(rUrl).then((response)=>{
			  	this.isloading=false;

			  	this.logInfo=response.data;
			  	console.log(this.logInfo)
			  },(error)=>{
			  	this.isloading=false;
			  });
			}
		},
		components:{
			NavBar,
			PageBody,
			Loading,
			Cell,
			Group
		},
		methods:{
			back(){
				history.back();
			},
			addTask(){
				console.log("新增")
				this.$route.router.go({name:'logdetail',params:{date:this.curDay},query:{type:'add'}});
			}
		}
	}
</script>

<style type="text/css">
	.logInfo table{
		width: 100%;
		border-collapse:collapse;
		border-spacing:0;
	}
	.logInfo tr{
		border-bottom:1px dashed lightblue;
	}
	.logInfo tr:last-child{
		 border-bottom: none;
	}

	.logInfo td{
		padding: 5px;
	}
	.tdLabel{
		width: 100px;
	}
</style>