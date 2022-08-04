<template>
  <div>
    <Header></Header>
    <div class="m-content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <mavon-editor v-model="ruleForm.content"></mavon-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      ruleForm: {
        id: "",
        title: "",
        description: "",
        content: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" },
        ],
        description: [{ required: true, message: "请输入摘要", trigger: "change" }],
        content: [{ required: true, message: "请输入内容", trigger: "change" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$ajax
            .post("/blog/addOrEdit", this.ruleForm, {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            })
            .then((res) => {
              console.log(res);
              this.$alert("操作成功", "提示", {
                confirmButtonText: "确定",
                callback: (action) => {
                  this.$router.push({ name: "Blogs" });
                },
              });
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
  created() {
    const blogId = this.$route.params.blogId;
    if (blogId) {
      this.$ajax.get(`/blog/get/${blogId}`).then((res) => {
        // 数据回显
        console.log(res);
        this.ruleForm.id = res.data.data.id;
        this.ruleForm.title = res.data.data.title;
        this.ruleForm.description = res.data.data.description;
        this.ruleForm.content = res.data.data.content;
      });
    }
  },
};
</script>

<style scoped>
.m-content {
  text-align: center;
}
</style>
