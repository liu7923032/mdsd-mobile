
<template>
	<div class="page proinfo">
	<x-header :left-options="{showBack:true,backText:'返回'}">
		<p>项目信息</p>
	</x-header>
		<tab>
			<tab-item :selected="selectIndex === 0" @click="selectIndex = 0">
				基本信息
			</tab-item>
			<tab-item :selected="selectIndex === 1" @click="selectIndex = 1">
				文档上传
			</tab-item>
			<tab-item :selected="selectIndex === 2" @click="selectIndex = 2">
				文档列表
			</tab-item>
		</tab>
		<div class="weui-tab-bd">
			<div v-show="selectIndex == 0">
					<group :title="ProjectName">
		        <cell title="医院名称" >
		          <div slot="value">
		            <span style="color: green">{{HospName}}</span>
		          </div>
		        </cell>
		        <cell title="产品线" >
		          <div slot="value">
		            <span style="color: green">{{LineName}}</span>
		          </div>
		        </cell>
		        <cell title="项目经理" >
		          <div slot="value">
		            <span style="color: green">{{UserName}}</span>
		          </div>
		        </cell>
		        <cell title="项目金额" >
		          <div slot="value">
		            <span style="color: green">{{ProjectMoney}}</span>
		          </div>
		        </cell>
		        <cell title="项目类型" >
		          <div slot="value">
		            <span style="color: green">{{TypeName}}</span>
		          </div>
		        </cell>
		        <cell title="项目属性" >
		          <div slot="value">
		            <span style="color: green">{{AttrName}}</span>
		          </div>
		        </cell>
		        <cell title="项目状态" >
		          <div slot="value">
		            <span style="color: green">{{StatusName}}</span>
		          </div>
		        </cell>
		        <cell title="项目阶段" >
		          <div slot="value">
		            <span style="color: green">{{StageName}}</span>
		          </div>
		        </cell>
		        <cell title="安装数量" >
		          <div slot="value">
		            <span style="color: green">{{InstallUnit}}</span>
		          </div>
		        </cell>
		         <cell title="入场时间" >
		          <div slot="value">
		            <span style="color: green">{{EnterDate}}</span>
		          </div>
		        </cell>
		        <cell title="验收时间" >
		          <div slot="value">
		            <span style="color: green">{{DocDate}}</span>
		          </div>
		        </cell>
      		</group>
			</div>
			<div v-show="selectIndex == 1">
				<group title="上传文档">
					<popup-picker title="文档类型" :columns="1" :data="docTypeList" :value.sync="docType"  show-name ></popup-picker>
					<datetime :value.sync="docDate" format="YYYY-MM-DD"  title="签字日期" confirm-text="完成" cancel-text="取消"></datetime>
					<x-input is-type="file" title="选择文档" ></x-input>
				</group>
			</div>
			<div v-show="selectIndex == 2">
				<group title="已上传文档">
					<cell title="验收文档" value="2016-05-04">
						<div slot="afterTitle">aaaa</div>
					</cell>
				</group>
			</div>
		</div>
		
</div>

</template>

<script lang="babel">
	
import	{ XHeader,Group,Cell,Tab, TabItem ,Scroller,PopupPicker,Datetime,XInput,XTextarea} from 'vux'

	export default {
		name:'proinfo',
		data () {
			return {
				ProjectCode:'',
				ProjectName:'苏州市麻醉临床信息系统V50S',
				InstallUnit:0,
				EnterDate:'',
				HospDept:0,
				HospName:'',
				ProjectMoney:0,
				IncomeMoney:'',
				LineName:0,
				StageName:'',
				StageNo:0,
				StatusName:'',
				TypeName:0,
				DocDate:'',
				UserName:0,
				AttrName:'',
				selectIndex:0,
				docTypeList:[{value:'1',name:'验收文旦'}],
				docType:[],
				docDate:''
			}
		},
		route:{
			data(transition){
				this.ProjectCode=transition.to.params.id;
				var url="Project/"+this.ProjectCode;
				//调用远程,加载该项目的基本信息i
				this.$http.get(url).then((success)=>{
					// console.log(success.data);
					var project=success.data;
					if(!project){
						return false;
					}
					this.ProjectName=project.ProjectName;
					this.InstallUnit=project.InstallUnit;
					this.EnterDate=project.EnterDate;
					this.HospDept=project.HospDept;
					this.HospName=project.HospName;
					this.ProjectMoney=project.ProjectMoney;
					this.IncomeMoney=project.IncomeMoney;
					this.LineName=project.LineName;
					this.StageNo=project.StageNo;
					this.StageName=project.StageName;
					this.StatusName=project.StatusName;
					this.TypeName=project.TypeName;
					this.DocDate=project.DocDate;
					this.UserName=project.UserName;
					this.AttrName=project.AttrName;
				},(error)=>{

				});
			}
		},
		components:{
			XHeader,
			Group,
			Cell,
			Tab,
			TabItem,
			Scroller,
			PopupPicker,
			Datetime,
			XInput,
			XTextarea
		},
		methods:{
			
		}
	}

</script>

<style >
	.weui-tab-bd{
		height: 100%;
	}
</style>