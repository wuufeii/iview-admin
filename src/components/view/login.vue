<template>
  <Card class="login">
    <p slot="title">
      <Icon type="ios-body"></Icon>用户登录
    </p>
    <Form
      ref="formItem"
      :model="formItem"
      :rules="ruleValidate"
      :label-width="80"
      :style="{background: '#fff',paddingTop: '10px'}"
    >
      <FormItem label="用户名" prop="userName">
        <Input
          v-model="formItem.userName"
          placeholder="请输入任意用户名"
          :style="{width: '90%',height:'30px'}"
          clearable
        />
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input
          v-model="formItem.password"
          type="password"
          placeholder="请输入任意密码"
          :style="{width: '90%',height:'30px'}"
          clearable
        />
      </FormItem>
      <FormItem style="text-align:right;">
        <Button type="primary" @click="login('formItem')">登录</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
import axios from 'axios'
export default {
  name: "Login",
  data() {
    return {
      decoded: {},
      formItem: {
        userName: "",
        password: ""
      },
      ruleValidate: {
        userName: [
          { required: true, message: "用户名不能为空!", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空!", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
  	login(name) {
  		this.$refs[name].validate(valid => {
        if (valid) {
          var _this = this;
          sessionStorage.setItem("userToken", "");
          this.isLoad = true;
          axios.post('/api/login',{
          	userName: this.formItem.userName,
            password: this.formItem.password
          }).then(res => {
          	console.log(res)
          	_this.isLoad = false;
          	_this.$Message.success("登录成功");
                sessionStorage.setItem("push", "");
                _this.$router.push("/home");
          })
        } else {
          this.$Message.error("登录信息不完整!");
        }
      })
  	}
   
  },
  mounted() {
    let vue_self = this;
    	document.onkeydown = function(e) {
				var key = window.event.keyCode;
				if(key == 13) {
					vue_self.login('formItem');
				}
			}
  }
};
</script>
