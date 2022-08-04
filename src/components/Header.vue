<template>
  <div class="m-content">
    <h3>欢迎来到我的博客世界</h3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
    </div>
    <div>
      {{ user.username }}
    </div>
    <div class="maction">
      <span>
        <el-link href="/blogs">主页</el-link>
      </span>
      <el-divider direction="vertical"></el-divider>
      <span>
        <el-link type="success" href="/blog/add">发表博客</el-link>
      </span>
      <el-divider direction="vertical"></el-divider>

      <span v-show="!hasLogin">
        <el-link type="primary" @click="login()">登录</el-link>
      </span>
      <span v-show="hasLogin">
        <el-link type="danger" @click="logout()">退出</el-link>
      </span>
    </div>
  </div>
</template>

<script>
import LoginVue from "../views/Login.vue";
export default {
  name: "Header",
  data() {
    return {
      user: {
        username: "请先登录",
        avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      },
      hasLogin: false,
    };
  },
  methods: {
    logout() {
      this.$ajax
        .get("/logout", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((resp) => {
          this.$store.commit("REMOVE_INFO");
          this.$router.push({ name: "Login" });
          this.hasLogin = false;
        });
    },
    login() {
      this.$router.push({ name: "Login" });
    },
  },
  created() {
    // 页面创建的时候获取用户信息
    if (this.$store.getters.getUserInfo.username) {
      this.user.username = this.$store.getters.getUserInfo.username;
      this.user.avatar = this.$store.getters.getUserInfo.avatar;
      //判断是登录状态还是非登录显示 退出按钮或者登录按钮
      this.hasLogin = true;
    }
  },
};
</script>

<style scoped>
.m-content {
  margin: 0 auto;
  max-width: 960px;
  text-align: center;
}
.maction {
  margin: 10px 0;
}
</style>
