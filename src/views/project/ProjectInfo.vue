
<template>
	<div class="page proinfo">
	<x-header :left-options="{showBack:true,backText:'返回'}">
		<p>项目信息</p>
	</x-header>
	<div style="overflow-y:auto;">
		 <Group :title="ProjectName">
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
      </Group>
	</div>
</div>

</template>

<script lang="babel">
	
import	{ XHeader,Group,Cell } from 'vux'

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
			Cell
		},
		methods:{

		}
	}

</script>