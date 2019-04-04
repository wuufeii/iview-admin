<template>
	<div class="user_list">
		<Card class="queryCard">
			<p slot="title">查询条件</p>
			<!-- 查询输入表单 -->
			<Query ref="where" @query="query" @exportData="exportData" :queryForm="queryForm"></Query>
		</Card>

		<Card class="tableCard">
			<p slot="title">用户信息表</p>
			<Table ref="tableUCU" :data="tableData" :columns="tableColumns" :height="$store.state.clientHeight-9" :loading="isLoad" @on-sort-change="sortTable" border stripe></Table>
			<div class="page-div">
				<Select v-model="pageInfo.pageSize" @on-change="changePageSize">
					<Option v-for="item in totalOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<div style="float: right;">
					<Button class="page-btn" @click="toHeadPage">首页</Button>
					<Page ref="pageRef" :current="pageInfo.pageCurrent" :total="pageInfo.total" :page-size="pageInfo.pageSize" @on-change="changeUserPage" show-total simple></Page>
					<Button class="page-btn" @click="toEndPage">末页</Button>
				</div>
			</div>
		</Card>
	</div>
</template>

<script>
	let _this = '';
	import axios from 'axios'
	import Query from "./components/query"
	import { pageMixin, downloadMixin } from '@/util/mixin'
	export default {
		mixins: [pageMixin, downloadMixin],
		data() {
			return {
				isLoad: false,
				queryForm: {
					item: '',
				},
				originTable: [],
				tableColumns: [{
						title: "序号",
						width: 35,
						align: "center",
						fixed: "left",
						render: function(h, obj) {
							var p_n = _this.pageInfo.pageCurrent;
							var p_l = _this.pageInfo.pageSize;
							var num = (p_n - 1) * p_l + obj.index;
							return h('span', {}, num + 1);
						}
					},
					{
						title: "账号",
						align: "center",
						sortable: 'custom',
						key: "account",
						minWidth: 100
					},
					{
						title: "姓名",
						align: "center",
						sortable: 'custom',
						tooltip: true,
						width: 100,
						key: "userName"
					},
					{
						title: "性别",
						align: "center",
						sortable: 'custom',
						key: "sex",
						width: 80
					},
					{
						title: "状态",
						align: "center",
						sortable: true,
						key: "status",
						width: 80,
						render: function(h, params) {
							return h("span", {}, params.row.status == "1" ? "启用" : "停用");
						}
					},
					{
						title: "年龄",
						align: "center",
						tooltip: true,
						sortable: 'custom',
						width: 80,
						tooltip: true,
						key: "age"
					},
					{
						title: "手机",
						align: "center",
						sortable: 'custom',
						key: "phone",
						width: 110,
					},
					{
						title: "邮箱",
						align: "center",
						sortable: 'custom',
						tooltip: true,
						key: "email",
						width: 200,
					},
					{
						title: "地址",
						align: "center",
						sortable: 'custom',
						tooltip: true,
						width: 200,
						key: "address"
					},
					{
						title: "新增时间",
						align: "center",
						sortable: 'custom',
						tooltip: true,
						width: 130,
						key: "insertTime"
					},
					{
						title: "修改时间",
						align: "center",
						sortable: 'custom',
						tooltip: true,
						width: 130,
						key: "updateTime"
					}
				]
			};
		},
		components: {
			Query
		},
		created: function() {
			_this = this;
			this.getTableList();
		},
		methods: {
			//table 数据列表
			getTableList() {
				this.tableData = [];
				this.isLoad = true;
				axios.get('/api/data').then(res => {
					_this.tableData = res.data.array
					_this.originTable = res.data.array
					_this.pageShow()
					_this.isLoad = false
				})
			},
			//条件查询
			query(result) {
				let k = result.item
				if(k == "") {
					this.tableData = this.originTable
					return
				}

				var arr = [];
				var s = this.tableData
				var patt = new RegExp(k);
				for(var i = 0; i < s.length; i++) {
					if(patt.test(s[i].account) || patt.test(s[i].userName) || patt.test(s[i].address)) {
						arr.push(i);
					}
				}

				if(arr.length) {
					var newArr = [];
					for(var i = 0; i < arr.length; i++) {
						newArr.push({
							account: s[arr[i]].account,
							userName: s[arr[i]].userName,
							sex: s[arr[i]].sex,
							status: s[arr[i]].status,
							age: s[arr[i]].age,
							phone: s[arr[i]].phone,
							email: s[arr[i]].email,
							address: s[arr[i]].address,
							insertTime: s[arr[i]].insertTime,
							updateTime: s[arr[i]].updateTime
						})
					}
					this.tableData = newArr
				} else {
					this.tableData = []
				}
			},

			//导出excel
			exportData() {
				this.$refs.tableUCU.exportCsv({
					filename: '用户信息表'
				})
			}
		}
	}
</script>