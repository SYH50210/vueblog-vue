<template>
  <div>
    <el-container>
      <el-header>
        <img class="corgi" src="../assets/corgi.jpg" alt="可爱柯基" />
      </el-header>

      <el-main>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: "sunyuhang",
        password: "111111",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 校验成功，登录逻辑
          this.$ajax.post("/login", this.ruleForm).then((res) => {
            const jwtToken = res.headers["authorization"];
            const userInfo = res.data.data;

            //存储（共享）的全局变量jwt和userInfo
            this.$store.commit("SET_TOKEN", jwtToken);
            this.$store.commit("SET_USERINFO", userInfo);

            this.$router.push({ name: "Blogs" });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  line-height: 60px;
  text-align: center;
  color: #333;
}

.corgi {
  height: 100%;
  border-radius: 50%;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.demo-ruleForm {
  max-width: 500px;
  margin: 0 auto;
}
</style>
