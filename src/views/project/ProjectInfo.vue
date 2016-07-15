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
					<cell title="医院名称">
						<div slot="value">
							<span style="color: green">{{HospName}}</span>
						</div>
					</cell>
					<cell title="产品线">
						<div slot="value">
							<span style="color: green">{{LineName}}</span>
						</div>
					</cell>
					<cell title="项目经理">
						<div slot="value">
							<span style="color: green">{{UserName}}</span>
						</div>
					</cell>
					<cell title="项目金额">
						<div slot="value">
							<span style="color: green">{{ProjectMoney}}</span>
						</div>
					</cell>
					<cell title="项目类型">
						<div slot="value">
							<span style="color: green">{{TypeName}}</span>
						</div>
					</cell>
					<cell title="项目属性">
						<div slot="value">
							<span style="color: green">{{AttrName}}</span>
						</div>
					</cell>
					<cell title="项目状态">
						<div slot="value">
							<span style="color: green">{{StatusName}}</span>
						</div>
					</cell>
					<cell title="项目阶段">
						<div slot="value">
							<span style="color: green">{{StageName}}</span>
						</div>
					</cell>
					<cell title="安装数量">
						<div slot="value">
							<span style="color: green">{{InstallUnit}}</span>
						</div>
					</cell>
					<cell title="入场时间">
						<div slot="value">
							<span style="color: green">{{EnterDate}}</span>
						</div>
					</cell>
					<cell title="验收时间">
						<div slot="value">
							<span style="color: green">{{DocDate}}</span>
						</div>
					</cell>
				</group>
			</div>
			<div v-show="selectIndex == 1">
				<group title="上传文档">
					<popup-picker title="文档类型" :columns="1" :data="docTypeList" :value.sync="docType" show-name></popup-picker>
					<datetime :value.sync="docDate" format="YYYY-MM-DD" title="签字日期" confirm-text="完成" cancel-text="取消"></datetime>
					<cell>
						<uploader slot="after-title" :count="fileCount" :maxlength="1" @change="chooseFile($event)">
							<span slot="title">文件上传</span>
							<uploader-files slot="uploader-files" v-show="showfile" :image-url="imgPath">
							</uploader-files>
						</uploader>
					</cell>
					<x-textarea :max="200" :row="6" :value.sync="memo" placeholder="文档备注信息"></x-textarea>
					<box gap="10px 10px">
						<x-button @click="saveProDoc"  v-show="false" type="primary">
							提交
						</x-button>

						<x-button @click="saveFlow" v-show="false" type="primary">
							保存表单
						</x-button>
						<x-button @click="sendFlow"  v-show="false" type="primary">
							发起流程
						</x-button>
					</box>
				</group>
			</div>
			<div v-show="selectIndex == 2">
				<group title="已上传文档">
					<cell v-for="item in docList" :title="item.DictName"  track-by="$index" :value="item.DocDate">
						<div slot="afterTitle">{{ item.ApproveStatus }}</div>
					</cell>
				</group>
			</div>
		</div>

	</div>

</template>

<script lang="babel">
	
import	{ XHeader,Group,Cell,Tab, TabItem ,Scroller,PopupPicker,Datetime,XInput,XTextarea,Box,XButton} from 'vux'
import 	{ Uploader, UploaderFiles, UploaderFile } from '../../components';
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
				AcceptDate:'',
				UserName:0,
				AttrName:'',
				selectIndex:0,
				docTypeList:[{value:'1',name:'1'},{value:'2',name:'2'}],
				docType:[],
				docList:[],
				docDate:'',
				memo:'',
				// 文件上传涉及的变量
				showfile:false,
				imgPath:'',
				fileCount:0,
				loaded:0,
				docFile:null
				
			}
		},
		route:{
			data(transition){
				this.ProjectCode=transition.to.params.id;
				//加载基本信息
				this.loadInfo();
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
			XTextarea,
			Uploader, UploaderFiles, UploaderFile,
			Box,XButton
		},
		methods:{
			// 加载项目的基本信息
			loadInfo () {
				var url="Project/"+this.ProjectCode;
				var docUrl="SysDict/项目文档";
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
					this.AcceptDate=project.DocDate;
					this.UserName=project.UserName;
					this.AttrName=project.AttrName;
					//加载文档信息
					 this.loadDocs();
					 //加载已经上传的文档
					 this.loadDocList();
				},(error)=>{

				});
			},
			// 加载项目文档信息
			loadDocs () {
				var url="SysDict/项目文档";
				var _this=this;
					//调用远程,加载该项目的基本信息i
				_this.$http.get(url).then((success)=>{
					var doclist=success.data;
					if(!doclist){
						return false;
					}
				  	var tempList = doclist.filter((item)=>{
						return item.DictParam.length>10 && JSON.parse(item.DictParam).StageCode==_this.StageNo;
					}).map((item)=>{
						var temp= {
							name:item.DictName,
							value:JSON.parse(item.DictParam).StageCode
						};
						return temp;
					});
					// _this.docTypeList=tempList;
					console.log(_this.docTypeList);
				},(error)=>{

				});
			},
			loadDocList () {
				this.$http.get("Document/GetProjectDoc/"+this.ProjectCode).then((success)=>{
					var tempList=success.data;
					if(!tempList || tempList.length==0){
						return false;
					}
					this.docList=tempList;
				},(error)=>{

				})
			},
			chooseFile (event) {
				//显示加载的文件
				this.showfile=true;
				var _this=this;
				//获取加载后的文件
				var file=event.target.files[0];
				if(!file){
					return false;
				}
				_this.docFile=file;
				//读取上传的文件信息
				var reader = new FileReader();
				reader.onload = (evt)=>{
					var temp= evt.target.result
					_this.imgPath=temp;
					_this.fileCount=1;
				}
				var loaded = 0,total=file.size;  
				//每次读取1M  
			
				reader.onprogress=(e)=>{
					loaded += e.loaded;  
					//更新进度条  
					var temp = (loaded / total) * 100;  
				}
				reader.readAsDataURL(file);
			},
			//上传验收报告
			saveProDoc () {
				
				//创建表单对象
				var formData = new FormData();
				// 添加编号
				formData.append('documentCode', this.docType.value);
					// 添加日期
				formData.append('docDate', this.docDate);
					// 添加编号
				formData.append('memo', this.memo);
				// append Blob/File object
				formData.append('upfile', this.docFile);
				// POST /someUrl
				this.$http.post("Document/UploadProFile", formData).then((response) => {
					//提示保存成功
					this.$root.toast={type:'ok',text:'保存成功',show:true};
					//初始化表单信息
					this.file=null;
					this.docDate=null;
					this.fileCount=0;
					this.showfile=false;
					this.imgPath='';
					this.memo='';
					this.docTypeList=[];
					// history.back();
					// success callback
				}, (response) => {
					// error callback
				});
			},
			saveFlow ()  {
				var formData={aa:'11',text:'11'};
				var postData={
					WFNo:'ccc019c9-0797-4288-bfa5-4f2e3ec0ff20',
					SourcePK:'',
					FlowNo:'',
					FlowName:'流程标题',
					FlowJson:JSON.stringify(formData),
					FlowMemo:'备注嘻嘻你',
					FlowStatus:'0',
					SubUserId:'10685',
					NextUser:'',
					NextStepNo:'',
					Comment:'我统一'
				}
				this.$http.post("WFlow/SaveForm",JSON.stringify(postData)).then((success)=>{

				},(error)=>{

				})
			},
			sendFlow () {

			}

		}
	}

</script>

<style>

</style>