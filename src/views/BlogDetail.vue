<template>
  <div>
    <Header></Header>
    <div class="blog">
      <h2>{{ blog.title }}</h2>
      <el-link icon="el-icon-edit" v-show="ownBlog">
        <router-link :to="{ name: 'BlogEdit', params: { blogId: blog.id } }"
          >编辑</router-link
        >
      </el-link>

      <el-link icon="el-icon-delete" v-show="ownBlog" @click="deleteBlog()">删除</el-link>

      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  name: "BlogDetail",
  components: {
    Header,
  },
  data() {
    return {
      blog: {
        id: "",
        title: "",
        description: "",
        content: "",
      },
      ownBlog: false,
    };
  },
  created() {
    const blogId = this.$route.params.blogId;
    if (blogId) {
      this.$ajax.get(`/blog/get/${blogId}`).then((res) => {
        console.log(res);
        this.blog.id = res.data.data.id;
        this.blog.title = res.data.data.title;
        this.blog.description = res.data.data.description;
        //MardownIt 渲染
        var MardownIt = require("markdown-it");
        var md = new MardownIt();
        var result = md.render(res.data.data.content);
        this.blog.content = result;
        // 查看是否是登录人 是则可以编辑
        this.ownBlog = res.data.data.userId === this.$store.getters.getUserInfo.id;
      });
    }
  },
  methods: {
    deleteBlog() {
      const id = this.$route.params.blogId;
      this.$confirm("确定要删除该条博客吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$ajax
            .post(`/blog/del/${id}`, null, {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            })
            .then((resp) => {
              this.$message.success("删除成功!");
              this.$router.push({ name: "Blogs" });
            });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
  },
};
</script>

<style scoped>
.blog {
  margin-top: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 700px;
  padding: 10px;
}
</style>
