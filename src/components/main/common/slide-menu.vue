<template>
	<div>
		<!-- 导航信息 -->
		<Menu ref="side_menu" :active-name="$store.state.activeName" :name="$store.state.activeName" width="auto" :class="menuitemClasses" v-if="slideShow" :open-names='activeFather'>
			<Submenu v-for="items in menuList" :name="items.name" :key="items.name">
				<template slot="title">
					<Icon :type="items.icon" :size="num" />
					<span v-show="slideShow" class="org">{{items.title}}</span>
				</template>
				<MenuItem v-for="item in items.children" :name="item.name" :key="item.name" @click.native="menuBtn(item)">
				<Icon :type="item.icon" />
				<span>{{item.title}}</span>
				</MenuItem>
			</Submenu>
		</Menu>
		<Dropdown class="slide_drop" v-for="items in menuList" :key="items.name" v-show="!slideShow">
			<a href="javascript:void(0)">
				<Icon :type="items.icon" :size="25" style="color:white"></Icon>
			</a>
			<DropdownMenu slot="list">
				<DropdownItem v-for="item in items.children" :key="item.name" @click.native="menuBtn(item)">
					<Icon :type="item.icon" />
					<span>{{item.title}}</span>
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	</div>
</template>

<script>
	import { serverAjaxReq } from "@/util/axios.js";
	import {
		forTreeData
	} from '@/util/util.js'
	export default {
		data() {
			return {
				num: "14",
				data: {},
				activeFather: [],
				menuList: [
				{
					icon: "logo-buffer",
					title: "一级菜单",
					name: "first",
					children: [{
							icon: "md-trending-up",
							to: "/first/first_1",
							title: "一级菜单-1",
							name: "first_1"
					}]
				},
				{
					icon: "logo-buffer",
					title: "二级菜单",
					name: "second",
					children: [{
							icon: "md-trending-up",
							to: "/second/second_1",
							title: "二级菜单-1",
							name: "second_1"
					},
					{
							icon: "md-trending-up",
							to: "/second/second_2",
							title: "二级菜单-2",
							name: "second_2"
					}]
				},
				{
					icon: "logo-buffer",
					title: "三级菜单",
					name: "third",
					children: [{
							icon: "md-trending-up",
							to: "/third/third_1",
							title: "三级菜单-1",
							name: "third_1"
					},
					{
							icon: "md-trending-up",
							to: "/third/third_2",
							title: "三级菜单-2",
							name: "third_2"
					},
					{
							icon: "md-trending-up",
							to: "/third/third_3",
							title: "三级菜单-3",
							name: "third_3"
					}]
				}
				]
			};
		},
		props: ["slideShow"],
		computed: {
			menuitemClasses() {
				return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
			}

		},
		methods: {
			menuBtn(item) {
				this.data = {
					title: item.title,
					to: item.to,
					name: item.name,
					color: "primary"
				};
				this.$store.commit("getMenu", this.data);
				this.$store.commit('menuActive', item.name)
				this.$router.push(item.to)
				this.$store.commit("startMenustr");
			}
		},
		created() {
			let str = sessionStorage.getItem('push');
			let arr = [];
			let path = this.$route.path
			/*serverAjaxReq('/permission/selectUserMenus', {
				menuType: 1
			}, (state, rspMsg, rspData) => {
				if(state == 'SUCCESS') {
					if(rspData == null || rspData == '' || typeof rspData == 'undefined' || rspData[0] == null || rspData[0] == '' || typeof rspData[0] == 'undefined') {
						this.menuList = [];
					} else {
						forTreeData(rspData, function(itemMenu) {
							itemMenu.title = itemMenu.menuName;
							itemMenu.to = itemMenu.url;
							itemMenu.name = itemMenu.menuCode;
							itemMenu.children = itemMenu.childNodes;
						});
						this.menuList = rspData[0].childNodes;
					}
					sessionStorage.setItem("menuList", JSON.stringify(this.menuList))
					this.menuList.forEach(items => {
						items.children.forEach(item => {
							if(item.to == path) {
								this.$store.commit('menuActive', item.name)
								this.activeFather.push(items.name);
								item.color = "primary"
								this.$nextTick(() => {
									this.$refs.side_menu.updateOpened();
									this.$refs.side_menu.updateActiveName();
								});
							}
							if(str.search(item.to) > -1) {
								arr.push(item)
							}
						})
					});
					this.$store.commit('startMenuArr', arr)
				}
			});*/
		}
	};
</script>