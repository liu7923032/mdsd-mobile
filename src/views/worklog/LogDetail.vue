<template>
	<div class="page logDetail">
			<x-header :left-options="{showBack:true,backText:'返回'}">
				<p>{{curDay}}</p>
			</x-header>
			<group title="时间">
					<datetime :value.sync="sTime" format="YYYY-MM-DD HH:mm"  title="开始时间" confirm-text="完成" cancel-text="取消"></datetime>
					<datetime :value.sync="eTime" format="YYYY-MM-DD HH:mm"  title="结束时间" confirm-text="完成" cancel-text="取消"></datetime>
			</group>
			<group title="内容信息">
				<popup-picker title="工作类型" :columns="1" :data="typeOptions" :value.sync="wType"  show-name ></popup-picker>
				<cell title="选择项目" v-show="showPro" is-link  @click="showPop">
					<span slot="value">{{project.text | substr 10 }}</span>
				</cell>
				<x-input  :min="3" :max="20" :value.sync="subTitle" is-type="china_name" placeholder="日志标题:长度3~20" ></x-input>
				<x-textarea :max="200" :row="6"  :value.sync="remark"  placeholder="请填写日志内容"></x-textarea>
				<box gap="10px 10px">
					<x-button @click="saveLog" type="primary">
							提交
					</x-button>
				</box>
			</group>

		  <popup :show.sync="popshow" style="height:100%;">
			  	<div>
				  	<scroller lock-x>
				  		 <group title="我主导的项目">
					        	<cell v-for="item in mainData"  :title="item.text" @click.preventDefault="choosePro(item)">
					        	</cell>
			        </group>
				         <!-- </scroller> -->

			        <group title="我参与的项目">
				        <!-- <scroller lock-x> -->
					        	<cell v-for="item in partData"  :title="item.text" @click.preventDefault="choosePro(item)">
					        	</cell>
			        </group>
		        </scroller>

			  	</div>
		  	
	    </popup>
	</div>
</template>


<script lang="babel">
  import { PopupPicker, Group,XInput,Datetime,XTextarea,XButton,Box,XHeader,Cell,Popup,Search,Scroller } from 'vux'
	export default {
		name:'logdetail',
		data(){
			return {
				curDay:'',
				type:'',
				typeOptions:[
								{value:'XMGZLB',name:"项目工作"},
								{value:'RCGZLB',name:"日常工作"},
								{value:'SHGZLB',name:"售后工作"}
						  	],
				mainData:[],
				partData:[],
				wType:['XMGZLB'],
				remark:'',
				project:{"id":'',"text":''},
				sTime:'',
				eTime:'',
				popshow:false
			}
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
		watch:{
			wType:function (value) {
				if(value!="XMGZLB"){
					this.project={"id":'',"text":''};
				}
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
			},
			showPro () {
				return this.wType[0]=="XMGZLB";
			}
		},
		components:{
			PopupPicker,
			Group,
			XInput,
			Datetime,
			XTextarea,
			XButton,
			Box,
			XHeader,
			Cell,
			Popup,
			Search,
			Scroller
		},
	
		methods:{

			choosePro (value) {
				this.popshow=false;
				this.project=value;
			},
			//查询
			showPop () {
				//加载项目信息
				if(this.mainData.length==0){
					//加载数据
					this.$http.get("Project").then((success)=>{
							var jsonData=success.data;
							if(jsonData.length==0){
								return false;
							}
							this.mainData =	jsonData.filter((item)=>{
								return item.desc=="main";
							});
							this.partData =	jsonData.filter((item)=>{
								return item.desc=="part";
							});
						this.popshow=true;
					},(error)=>{

					})
				}else{
						this.popshow=true;
				}
			},
			clearForm(){
			  	this.remark='';
			  	this.project={"id":'',"text":''};
			},
			loadMore (index) {
				var index=type==0?this.mainIndex:this.partIndex;
				this.$http.get('Project',{type:type,pageIndex:index}).then((response)=>{
						if(type==0){
							this.mainData=response.data;
						}else{
							this.partData=response.data;
						}

				},(error)=>{

				})
			},
			saveLog(){
				//1:提交表单内容
				var postData={
					SubTitle:this.subTitle,
					StartTime:this.sTime,
					EndTime:this.eTime,
					WorkType:this.wType[0],
					ProjectCode:this.project.id,
					Remark:this.remark
				};
				this.$http.post("WorkLog",JSON.stringify(postData)).then((success)=>{
					//提示保存成功
					this.$root.toast={type:'ok',text:'保存成功',show:true};
					//清空表单信息
					this.clearForm();
					//设置
					history.back();
				},(error)=>{

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
		overflow: auto;
	}

	
</style>