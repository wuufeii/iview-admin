<template>
	<div class="insert_form">
		<Form ref="queryForm" :model="queryForm">
			<FormItem prop="item" style="width:300px">
				<Input type="text" size="small" v-model="queryForm.item" placeholder="请输入账号/姓名/地址" clearable/>
			</FormItem>
			<FormItem class="query-btn">
				<Button type="primary" size="small" icon="md-refresh" @click="handleReset('formValidate')">重置</Button>
				<Button type="primary" size="small" icon="ios-search" @click.native="query">查询</Button>
				<Button type="primary" size="small" @click.native="exportData">导出Excel</Button>
			</FormItem>
		</Form>
		<p class="clear"></p>
	</div>
</template>
<script>
	export default {
		props: {
			queryForm: {
				type: Object,
				default: false
			}
		},
		methods: {
			// 重置
			handleReset() {
				this.$refs["queryForm"].resetFields();
			},
			// 查询
			query() {
				this.$emit("query", this.queryForm);
			},
			//导出excel
			exportData() {
				this.$emit("exportData");
			},


		}
	};
</script>