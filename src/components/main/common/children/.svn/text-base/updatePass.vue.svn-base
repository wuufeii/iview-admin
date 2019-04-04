<template>
  <Form ref="updatePassword" :model="updatePassword" :rules="ruleValidate" :label-width="80">
    <div class="model_box">
      <FormItem label="旧密码" prop="oldPassword">
        <Input type="password" v-model="updatePassword.oldPassword" placeholder="请输入旧密码" clearable/>
      </FormItem>
      <FormItem label="新密码" prop="oneNewPassword">
        <Input
          type="password"
          v-model="updatePassword.oneNewPassword"
          placeholder="请输入新密码"
          clearable
        />
      </FormItem>
      <FormItem label="确认密码" prop="newPassword">
        <Input
          type="password"
          v-model="updatePassword.newPassword"
          placeholder="请再确认输入一次新密码"
          clearable
        />
      </FormItem>
    </div>
    <div class="form-btn">
      <Button type="primary" @click="close('updatePassword')">关闭</Button>
      <Button type="primary" @click="submit('updatePassword')">保存</Button>
    </div>
  </Form>
</template>

<script>
import { serverAjaxReq } from "@/util/axios.js";
export default {
  props: ["password"],
  data() {
    const validateOneNewPass = (rule, value, callback) => {
      if (!rule.pattern.test(value)) {
        callback(new Error("密码为最短6位，最长16位"));
      } else {
        callback();
      }
    };
    const validateNewPass = (rule, value, callback) => {
      if (this.updatePassword.oneNewPassword == value) {
        callback();
      } else {
        callback(new Error("两次输入密码不一致"));
      }
    };
    return {
      updatePassword: {
        oldPassword: "",
        oneNewPassword: "",
        newPassword: ""
      },
      ruleValidate: {
        oldPassword: [
          { required: true, message: "旧密码不能为空!", trigger: "change,blur" }
        ],
        oneNewPassword: [
          {
            required: true,
            pattern: /^[\w_-]{6,16}$/,
            validator: validateOneNewPass,
            trigger: "change,blur"
          }
        ],
        newPassword: [
          { required: true, validator: validateNewPass, trigger: "change,blur" }
        ]
      }
    };
  },
  methods: {
    // 关闭
    close(name) {
      this.$emit("close");
      this.$refs[name].resetFields();
    },
    // 保存
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          serverAjaxReq(
            "/user/updateUserPwd",
            {
             password:this.updatePassword.oldPassword,
             newPassword:this.updatePassword.newPassword,
            },
            (state, rspMsg, rspData) => {
              if (state == "FAIL") {
                this.$Message.error("查询异常！");
              }
              if (state == "ERROR") {
                this.$Message.error(rspMsg);
              }
              if (state == "SUCCESS") {
                 this.$refs[name].resetFields();
                 // 修改后从新登陆
                 this.$store.commit('tagCloseWhole','all')
                 sessionStorage.clear();
                 this.$router.push("/");
                
              }
            }
          );
        } else {
          this.$Message.error("表单验证失败，请先修改后再提交!");
        }
      });
    }
  }
};
</script>
