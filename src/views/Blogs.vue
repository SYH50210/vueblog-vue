<template>
  <div>
    <Header></Header>
    <div class="block">
      <el-timeline>
        <el-timeline-item
          :timestamp="blog.created"
          placement="top"
          v-for="(blog, key) in blogs"
          :key="key"
        >
          <el-card>
            <h4>
              <router-link :to="{ name: 'BlogDetail', params: { blogId: blog.id } }">
                {{ blog.title }}
              </router-link>
            </h4>
            <p>{{ blog.description }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <!-- 分页 -->
      <el-pagination
        class="mpage"
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="page"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  data() {
    return {
      blogs: {},
      currentPage: 1,
      total: 0,
      pageSize: 5,
    };
  },
  methods: {
    page(currentPage) {
      this.$ajax.get(`/blog/list?currentPage=${currentPage}`).then((res) => {
        console.log(res);
        this.blogs = res.data.data.records;
        this.currentPage = res.data.data.current;
        this.total = res.data.data.total;
        this.pageSize = res.data.data.size;
      });
    },
  },
  components: {
    Header,
  },
  created() {
    this.page(1);
  },
};
</script>

<style scoped>
.block {
  margin: 20px;
}

.mpage {
  margin: 0 auto;
  text-align: center;
}
</style>
