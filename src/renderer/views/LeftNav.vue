<template>
  <div class="left_nav_wrap">
    <div class="left">
      <router-link
        :to="{ name: 'Upload' }"
        class="a-primary-css"
        active-class="active-link-css"
      >
        <i class="el-icon-upload2"></i>
      </router-link>
      <router-link
        class="a-primary-css"
        active-class="active-link-css"
        :to="{ name: 'Download' }"
      >
        <i class="el-icon-download"></i>
      </router-link>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.left_nav_wrap {
  width: 100%;
  height: 100%;
  display: flex;
  .left,
  .right {
    height: 100%;
    overflow: auto;
  }
  .left {
    background: #1787eb;
    width: 60px;
  }
  .right {
    background: #fff;
    flex: 1;
    padding: 20px;
  }
  //   0076df
  a.a-primary-css {
    display: block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    i {
      color: #fff;
    }
  }
  a.active-link-css {
    background: #0076df;
  }
}
</style>
