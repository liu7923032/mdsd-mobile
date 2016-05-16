
<template>
	<div class="page proinfo">
	<x-header >
		<p>项目信息</p>
	</x-header>
	<div style="overflow-y:auto;">
		 <Group :title="projectName">
        <cell title="医院名称" >
          <div slot="value">
            <span style="color: green">刘克志</span>
          </div>
        </cell>
        <cell title="产品线" >
          <div slot="value">
            <span style="color: green">信息管理中心</span>
          </div>
        </cell>
        <cell title="项目经理" >
          <div slot="value">
            <span style="color: green">3天</span>
          </div>
        </cell>
        <cell title="项目金额" >
          <div slot="value">
            <span style="color: green">1天</span>
          </div>
        </cell>
        <cell title="项目类型" >
          <div slot="value">
            <span style="color: green">1天</span>
          </div>
        </cell>
        <cell title="项目属性" >
          <div slot="value">
            <span style="color: green">信息管理中心</span>
          </div>
        </cell>
        <cell title="项目状态" >
          <div slot="value">
            <span style="color: green">3天</span>
          </div>
        </cell>
        <cell title="项目阶段" >
          <div slot="value">
            <span style="color: green">1天</span>
          </div>
        </cell>
        <cell title="安装数量" >
          <div slot="value">
            <span style="color: green">1天</span>
          </div>
        </cell>
         <cell title="入场时间" >
          <div slot="value">
            <span style="color: green">1天</span>
          </div>
        </cell>
        <cell title="验收时间" >
          <div slot="value">
            <span style="color: green">1天</span>
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
				projectCode:'',
				projectName:'苏州市麻醉临床信息系统V50S',

			}
		},
		route:{
			data(transition){
				console.log("1111");
				var projectCode=transition.to.params.id;
				console.log(projectCode);
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