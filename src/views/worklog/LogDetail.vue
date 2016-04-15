<template>
	<div class="page logDetail">
		<nav-bar :text="curDay">
			<span class="icon-chevron-left" slot="leftBar" @click="back()">返回</span>
		</nav-bar>	
		<page-body>
			<group title="时间">
				<datetime :value.sync="sTime" format="YYYY-MM-DD HH:II"  title="开始时间" confirm-text="完成" cancel-text="取消"></datetime>
				<datetime :value.sync="eTime" format="YYYY-MM-DD HH:II"  title="结束时间" confirm-text="完成" cancel-text="取消"></datetime>
			</group>
			<group title="分类">
				<x-input title="日志标题" :min=3 :max=20 :value.sync="title" is-type="china_name" placeholder="日志标题:长度3~20"></x-input>
				<popup-picker title="工作类型" :columns="1" :data="typeOptions" :value.sync="wType" show-name>
				</popup-picker>
				<popup-picker title="项目" :columns="2" :data="projectList" :value.sync="project" show-name>
				</popup-picker>
				<popup-picker title="工作分类" :data="subTypeData" :value.sync="subType" >
				</popup-picker>
				 <textarea :max=200 placeholder="请填写日志内容" ></textarea>
			</group>
			
			<box gap="10px 10px">
						<x-button @click="saveLog" type="primary">
						提交
					</x-button>
			</box>
		</page-body>

		<toast :show.sync="isloading" >
			保存中。。
		</toast>
	</div>
</template>


<script lang="babel">
	
	import {NavBar,PageBody} from '../../components/'
  import { PopupPicker, Group, Picker,GroupTitle,Input as XInput,Datetime,Textarea,Toast,XButton,Flexbox,FlexboxItem,Box } from 'vux'
	export default {
		name:'logdetail',
		data(){
			return {
				curDay:'',
				type:'',
				typeOptions:[{value:'XMGZLB',name:"项目工作"},
						  {value:'RCGZLB',name:"日常工作"},
						  {value:'SHGZLB',name:"售后工作"}],
				projectList:[{value:'main',name:'我主导',parent:0},{value:'part',name:'我参与',parent:0},{value:'11',name:'山东',parent:'main'}
										,{value:'11',name:'上海麻醉临床信息系统V5.0',parent:'part'}],
				wType:[],
				title:'',
				memo:'',
				subTypeData:[['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']],
				subType:[],
				project:[],
				projectCode:'',
				projectName:'',
				isloading:false,
				sTime:'',
				eTime:''
			}
		},
		route:{
			//加载数
			data(transition){
				
				//加载数据
			  this.curDay=transition.to.params.date;
			  this.type=transition.to.query.type=="add"||'edit';
			 
			}
		},
		computed:{
			ckTitle:function () {
				return this.title.length==0;
			},
			ckMemo:function(){
				return this.memo.length==0;
			}
		},
		components:{
			NavBar,
			PageBody,
			Toast,
			PopupPicker,
			Picker,
			Group,
			GroupTitle,
			XInput,
			Datetime,
			Textarea,
			XButton,
			Flexbox,FlexboxItem,
			Box
		},
		methods:{
			clearForm(){
					this.sTime='';
			  	this.eTime='';
			  	this.memo='';
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
					SubTitle:this.title,
					StartTime:this.curDay+" "+this.sTime,
					EndTime:this.curDay+" "+this.eTime,
					WorkType:this.wType,
					ProjectCode:this.projectCode,
					ActionUser:this.$root.userId,
					SubItems:this.subType+"-"+this.memo,
					device:this.$root.device
				};
				this.isloading=true;
				this.$http.post("WorkLog",postData).then((success)=>{
					this.isloading=false;
				},(error)=>{
					this.isloading=false;
				});
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