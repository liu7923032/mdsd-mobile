<template>
	<div class="page userinfo">
		<x-header :left-option="{backText:'返回'}">
			个人首页
		</x-header>
		<page-body>
			<group title="个人基本信息">
				<cell>
					<div slot="body">姓名</div>
					<div slot="footer">XXX</div>
				</cell>
				<cell>
					<div slot="body">部门<span></span></div>
					<div slot="footer">XXX</div>
				</cell>
				<cell>
					<div slot="body">岗位:<span></span></div>
					<div slot="footer">XXX工程师</div>
				</cell>
				<cell>
					<div slot="body">年假结余:<span></span></div>
					<div slot="footer">XXX</div>
				</cell>
				<cell>
					<div slot="body">福利假:<span></span></div>
					<div slot="footer">XX</div>
				</cell>
				<cell>
					<div slot="body">探亲假:<span></span></div>
					<div slot="footer">XX</div>
				</cell>
			<group >
		</page-body>
	</div>

</template>


<script lang="babel">
	

	import { PageBody} from '../components/'

	import { Group,Cell,XHeader } from 'vux'
	
	export default {
		methods:{
		},
		data(){
			return {
			}
		},
		components:{
			Group,
			Cell,
			PageBody,
			XHeader
		}

	}


</script>

<style type="text/css" scoped>
	
</style>