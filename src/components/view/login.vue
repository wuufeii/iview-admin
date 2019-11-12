<template>
  <div class="login">
    <vue-particles class="login-bg">
    </vue-particles>
    <div class="login-container">
      <div class="login-title">用户登录</div>
      <Form
        ref="formItem"
        :model="formItem"
        :rules="ruleValidate"
        class="login-content"
      >
        <FormItem prop="userName">
          <Icon class="login-icon" type="ios-person-outline"/>
          <Input
            v-model="formItem.userName"
            placeholder="请输入用户姓名"
            clearable
          />
        </FormItem>
        <FormItem prop="password">
          <Icon class="login-icon" type="ios-lock-outline"/>
          <Input
            v-model="formItem.password"
            type="password"
            placeholder="请输入用户密码"
            clearable
          />
        </FormItem>
        <Button type="primary" @click="login('formItem')">登录</Button>
      </Form>
    </div>
  </div>

</template>
<script>
  import axios from 'axios'

  export default {
    name: "Login",
    data() {
      return {
        decoded: {},
        formItem: {
          userName: "admin",
          password: "admin"
        },
        ruleValidate: {
          userName: [
            {required: true, message: "用户姓名不能为空!", trigger: "blur,change"}
          ],
          password: [
            {required: true, message: "用户密码不能为空!", trigger: "blur,change"}
          ]
        }
      };
    },
    methods: {
      login(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            sessionStorage.setItem("userToken", "");
            this.isLoad = true;
            axios.post('/api/login', {
              userName: this.formItem.userName,
              password: this.formItem.password
            }).then(res => {
              this.isLoad = false;
              this.$Message.success("登录成功");
              sessionStorage.setItem("push", "");
              this.$router.push("/home");
            })
          } else {
            this.$Message.error("登录信息不完整!");
          }
        })
      }

    },
    mounted() {
      document.onkeydown = (e) => {
        var key = window.event.keyCode;
        if (key == 13) {
          this.login('formItem');
        }
      }
    }
  };
</script>

<style>
  .login {
    height: 100vh;
  }

  .login-bg {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/images/bg.jpg');
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
    margin-left: auto;
    margin-right: auto;
  }

  .login-container {
    width: 300px;
    height: 340px;
    background-color: rgba(0, 0, 0, .4);
    position: absolute;
    top: calc(50% - 150px);
    left: calc(50% - 170px);
    color: #ccc;
    padding: 70px 20px;
  }

  .login-title {
    font-size: 16px;
    text-align: center;
    margin-bottom: 20px;
  }

  .login-content > div {
    margin-bottom: 20px;
    position: relative;
  }

  .login-icon {
    width: 36px;
    height: 36px;
    overflow: hidden;
    text-align: center;
    position: absolute;
    font-size: 28px;
    line-height: 36px;
    border-right: 1px solid #999;
  }

  .login-icon.ivu-icon-ios-lock-outline {
    font-size: 26px;
  }

  .login-content input {
    color: #ccc;
    height: 36px;
    line-height: 36px;
    padding-left: 40px;
  }

  .login-content button {
    margin-top: 10px;
    width: 100%;
    height: 36px;
  }
</style>