	import { serverAjaxReq, downloadReq } from '@/util/axios'

	/*
	 *分页mixin
	 * tableData: 表格数据
	 * pageInfo: 分页信息
	 * getTableList: 获取分页数据相关表格的查询方法
	 * */

	export const pageMixin = {
		data() {
			return {
				totalOption: [{
					value: 10,
					label: '10条/页'
				}, {
					value: 20,
					label: '20条/页'
				}, {
					value: 50,
					label: '50条/页'
				}, {
					value: 100,
					label: '100条/页'
				}, {
					value: 200,
					label: '200条/页'
				}],
				tableData: [],
				pageInfo: {
					total: 10,
					pageCurrent: 1,
					pageSize: 10,
					lastPage: 1
				}
			}
		},
		mounted() {
			//监听分页input值，动态设置宽度
			$('.page-div .ivu-page-simple-pager>input').bind("input oninput", function(event) {
				var w = ($(this).val().toString().length - 1) * 6
				$(this).width(12 + w)
			});
		},
		methods: {

			//首页显示数据
			pageShow() {
				let len = this.originTable.length
				let size = this.pageInfo.pageSize
				let cur = Math.ceil(len / size)
				this.pageInfo.lastPage = cur
				this.pageInfo.total = len
				this.currentTable(1)
			},
			//  当前页显示数据
			currentTable(cur) {
				let len = this.originTable.length
				let size = this.pageInfo.pageSize
				this.tableData = []
				let arr = []
				let total = size * cur > len ? len : size * cur
				for(var i = (cur - 1) * 10; i < total; i++) {
					arr.push(this.originTable[i])
				}
				this.tableData = arr
			},
			//上/下页事件
			changeUserPage: function(pageCurrent) {
				this.pageInfo.pageCurrent = pageCurrent;
				this.currentTable(pageCurrent);
			},
			//首页事件
			toHeadPage: function() {
				if(this.tableData.length > 0) {
					this.pageInfo.pageCurrent = 1;
					this.pageShow()
				}
			},
			//末页事件
			toEndPage: function() {
				if(this.tableData.length > 0) {
					this.pageInfo.pageCurrent = this.pageInfo.lastPage;
					this.currentTable(this.pageInfo.lastPage);
				}
			},
			//改变每页条数
			changePageSize() {
				this.pageInfo.pageCurrent = 1;
				this.pageShow()
			},
			//表格自定义排序
			sortTable(column) {
				var type = 1;
				if(column.order == 'asc') {
					type = 0;
				}
				if(this.tableData.length > 0) {
					this.tableData.sort(function(obj1, obj2) {
						var val1 = obj1[column.key];
						var val2 = obj2[column.key];
						if(!isNaN(Number(val1)) && !isNaN(Number(val2))) {
							val1 = Number(val1);
							val2 = Number(val2);
						}
						//如果值为空的，放在最后
						if(val1 == null && val2 == null) {
							return 0;
						} else if(val1 == null && val2 != null) {
							return(type == 1 ? -1 : 1);
						} else if(val2 == null && val1 != null) {
							return(type == 1 ? 1 : -1);
						}
						//排序
						if(val1 < val2) {
							return(type == 1 ? 1 : -1);
						} else if(val1 > val2) {
							return(type == 1 ? -1 : 1);;
						} else {
							return 0;
						}
					});
				}
			}
		}
	}

	/*
	 *模板下载mixin
	 * getTableList: 获取分页数据相关表格的查询方法
	 * */

	export const downloadMixin = {
		data() {
			return {
				isDownload: false,
			}
		},
		methods: {
			//下载模板base64
			downloadFileBase64(url, fileName) {
				let _that = this
				_that.isDownload = true;
				clientAjaxReq(url, {
					fileName: fileName
				}, function(state, rspMsg, rspData) {
					if(state == 'FAIL') {
						_that.$Message.error('下载失败！');
						_that.isDownload = false;
						return;
					}
					if(state == 'ERROR') {
						_that.$Message.error(rspMsg);
						_that.isDownload = false;
						return;
					}
					if(state == 'SUCCESS') {
						let fileName = rspData.fileName;
						let code = `data:text/html;base64,${rspData.content}`

						let aLink = document.createElement('a');
						let blob = _that.base64ToBlob(code); //new Blob([content]);
						let evt = document.createEvent("HTMLEvents");
						evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
						aLink.download = fileName;
						aLink.href = URL.createObjectURL(blob);
						aLink.click()
						_that.isDownload = false;
					}
				});
			},
			//base64转blob
			base64ToBlob(code) {
				let parts = code.split(';base64,');
				let contentType = parts[0].split(':')[1];
				let raw = window.atob(parts[1]);
				let rawLength = raw.length;

				let uInt8Array = new Uint8Array(rawLength);

				for(let i = 0; i < rawLength; ++i) {
					uInt8Array[i] = raw.charCodeAt(i);
				}
				return new Blob([uInt8Array], {
					type: contentType
				});
			},

			//下载模板基于流
			downloadByFileName(url, fileName) {
				let _that = this
				_that.isDownload = true;
				downloadReq(url, fileName).then(res => {
					const link = document.createElement("a");
					let blob = new Blob([res.data], {
						type: "application/vnd.ms-excel"
					});
					link.style.display = "none";
					link.href = URL.createObjectURL(blob);
					link.setAttribute("download", fileName);
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					_that.isDownload = false;
				});
			},
			
			
			/*
			 
			 * npm install -S file-saver
			 * npm install -S xlsx
			 * npm install -D script-loader
			 * */
			/*下载excel
			 * colData： 含有title和key值的json数组
			 * excelData: 模板数据
			 * filename: 文件名
			 * bookType：文件格式
			 * */
			downloadExcel(colData, excelData, filename, bookType) {
				import('@/util/vendor/Export2Excel').then(excel => {
					const header = this.getHeader(colData)  //表头
					const filterVal = this.getKey(colData)  //key值
					const data = this.formatJson(filterVal, excelData)
					excel.export_json_to_excel({
						header,
						data,
						filename,
						bookType,
						autoWidth: true
					})
				})
			},

			//json对象转数组
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => {
					if(j === 'timestamp') {
						return parseTime(v[j])
					} else {
						return v[j]
					}
				}))
			},
			
			//获取header数组
			getHeader(val) {
				const arr = []
				for(var i = 0; i < val.length; i++) {
					if(val[i].title != '序号') {
						arr.push(val[i].title)
					}
				}
				return arr
			},
			
			//获取每列key值数组
			getKey(val) {
				const arr = []
				for(var i = 0; i < val.length; i++) {
					if(val[i].title != '序号') {
						arr.push(val[i].key)
					}
				}
				return arr
			}
		}
	}