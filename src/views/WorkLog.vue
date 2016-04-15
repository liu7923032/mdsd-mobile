<template>
	<div class="page worklog">
		<nav-bar text="工作日志">
			<span class="icon-chevron-left" slot="leftBar" @click="back()"></span>
			<span slot="rightBtn"></span>
		</nav-bar>
		<page-body>
			<group-title>
				<div>开始:{{startDay}} 结束:{{endDay}}</div>
			</group-title>
			<cells type="access">
				<link-cell v-for="item in dateRange" :router-link="{ name: 'loginfo', params: { date: item }}">
					<div slot="header" :class="{'week':($index==5 ||$index==6)}">{{ getZNWeek($index) }}</div>
					<div slot="body">
						<div class="time">
							{{item}}
						</div>
					</div>
				</link-cell>
			</cells>
		</page-body>
	</div>
	
</template>

<script>
	import {NavBar,PageBody,Cells,LinkCell} from '../components/';
	import {GroupTitle} from 'vux'
	import DateHelper from '../assets/js/DateHelper.js'

	export default {
		name:'worklog',
		data(){
			return {
				title:'工作日志',
				startDay:'',
				endDay:'',
				dateRange:[]
			}
		},
		ready(){
			this.startDay=DateHelper.weekFirstDay();
			console.log(this.startDay);
			this.endDay=DateHelper.weekLastDay();
			this.dateRange=this.getDateRange();
		},
		methods:{
			back(){
				history.back();
			},
			//子控件触发事件后执行的方法
			selectDay(day){
				alert(day);
			},
			getDateRange(){
				var tempRange=[];
				//1:得到当前月份的天数
				var date=new Date();
				var month=date.getMonth()+1;
				var year=date.getFullYear();
				var days=DateHelper.dayNumOfMonth(year,month);
				//2:得到当前周的第一天
				var firstDay=parseInt(this.startDay.split('-')[2]);
				if(firstDay+7>days){
					//跨月加载数据
					//得到上个月的天数
					var preMonthDay=DateHelper.dayNumOfMonth(year,month);
					for (var i = firstDay; i <=preMonthDay; i++) {
						var tempDate=new Date(year+"/"+(month)+"/"+i);
						tempRange.push(
							DateHelper.formate(tempDate,"yyyy-MM-dd")
						);
					}
					var lastDay=parseInt(this.endDay.split('-')[2]);
					for (var i = 1; i <=lastDay; i++) {
						var tempDate=new Date(year+"/"+(month+1)+"/"+i);
						tempRange.push(
							DateHelper.formate(tempDate,"yyyy-MM-dd")
						);
					}

				}else{
					for (var i = firstDay,length=firstDay+7; i <length; i++) {
						var tempDate=new Date(year+"/"+month+"/"+i);
						tempRange.push(
							DateHelper.formate(tempDate,"yyyy-MM-dd")
						);
					};
				}
				return tempRange;
			},
			getZNWeek(flag){
				var array=["周一","周二","周三","周四","周五","周六","周日"];
				return array[flag];
			}
		},
		components:{
			NavBar,
			PageBody,
			LinkCell,
			GroupTitle,
			Cells
		}
	}
</script>

<style scoped>
	.weui_cells_title>div{
		text-align: center;
		font-size: 17px;
		margin-bottom: 10px;
	}

	.weui_cell_bd>div{
		padding-left: 10px;
	}

	.week{
		color: red;
	}
</style>