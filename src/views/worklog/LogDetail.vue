<template>
	<div class="page logDetail">
		<x-header>
			<p>{{curDay}}</p>
		</x-header>
		
		<div style="overflow-y:auto;">
			<group title="时间">
				<datetime :value.sync="sTime" format="YYYY-MM-DD HH:mm"  title="开始时间" confirm-text="完成" cancel-text="取消"></datetime>
				<datetime :value.sync="eTime" format="YYYY-MM-DD HH:mm"  title="结束时间" confirm-text="完成" cancel-text="取消"></datetime>
			</group>
			<group title="内容信息">
				<popup-picker title="工作类型" :columns="2" :data="typeOptions" :value.sync="wType"  show-name >
				</popup-picker>
				<x-input title="日志标题" :min="2" :max="20" :value.sync="subTitle" is-type="china_name" placeholder="日志标题:长度3~20" ></x-input>
			
				<popup-picker title="项目" :columns="1" :data="projectList" :value.sync="project" show-name>
				</popup-picker>
				 <x-textarea :max="200"  :row="6"  :value.sync="remark"  placeholder="请填写日志内容"></x-textarea>
			</group>
			
			<box gap="10px 10px">
						<x-button @click="saveLog" type="primary">
						提交
					</x-button>
			</box>
		</div>

	</div>
</template>


<script lang="babel">
  import { PopupPicker, Group, Picker,GroupTitle,XInput,Datetime,XTextarea,Toast,XButton,Flexbox,FlexboxItem,Box,XHeader } from 'vux'
	export default {
		name:'logdetail',
		data(){
			return {
				curDay:'',
				type:'',
				typeOptions:[{value:'XMGZLB',name:"项目工作"},
						  {value:'RCGZLB',name:"日常工作"},
						  {value:'SHGZLB',name:"售后工作"},{value:'main',name:'我主导',parent:'XMGZLB'},{value:'part',name:'我参与',parent:'XMGZLB'}],
				projectList:[],
				allProList:[],
				wType:[],
				title:'',
				remark:'',
				project:[],
				projectCode:'',
				projectName:'',
				sTime:'',
				eTime:'',
				isRequered:true
			}
		},
		//加载对应的项目信息
		ready () {
			this.$http.get('Project').then((response)=>{
				this.allProList=response.data;
				console.log(this.allProList);
			});
		},
		route:{
			//加载数
			data(transition){
				var date=new Date();

				//加载数据
			  this.curDay=transition.to.params.date;
			  this.type=transition.to.query.type=="add"||'edit';
			  this.sTime=this.curDay+' 08:50';
			  this.eTime=this.curDay+' 17:50';

			}
		},
		computed:{
			subTitle () {
				//通过选择的值找到
				var workType=this.wType[0];
				var wName="";
				this.typeOptions.forEach((item)=>{
					if(item.value==workType){
						wName=item.name;
					}
				});
				return '['+this.curDay+']'+wName;
			}
		},
		components:{
			Toast,
			PopupPicker,
			Picker,
			Group,
			GroupTitle,
			XInput,
			Datetime,
			XTextarea,
			XButton,
			Box,
			XHeader
		},
		methods:{
			clearForm(){
					this.sTime='';
			  	this.eTime='';
			  	this.remark='';
			  	this.wType=[];
			  	this.subType=[];
			},
			loadForm(){

			},
			back(){
				history.back();
			},
			saveLog(){
				//1:提交表单内容
				var postData={
					SubTitle:this.subTitle,
					StartTime:this.sTime,
					EndTime:this.eTime,
					WorkType:this.wType[0],
					ProjectCode:this.projectCode,
					Remark:this.remark
				};
				console.log(postData);
				this.isloading=true;

				// this.$http.post("WorkLog",JSON.stringify(postData)).then((success)=>{
				// 	this.isloading=false;
				// },(error)=>{
				// 	this.isloading=false;
				// });
			}
		}
	}
</script>

<style type="text/css">
	
	.weui_label{
		width: 4em;
	}

	.logDetail .page-bd{
		padding-bottom: 30px;
	}

	
</style>