<template>
  <div class="download_wrap">
    <ul v-if="fileList.length > 0">
      <li v-for="(item, index) in fileList" :key="index">
        <div class="file_hash">
          {{ item }}
        </div>
        <div class="action_wrap">
          <el-button @click="handlerDownloadFile()" type="text" size="small"
            >Download</el-button
          >
        </div>
      </li>
    </ul>
    <div v-else class="no_data">
      No Data
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    openDownload(fileHash) {
      this.$prompt('Please enter file decryption code', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        inputPattern: /^[\S]{6,12}$/,
        inputType: 'password',
        inputErrorMessage: '6~12 characters in length and cannot be empty!'
      })
        .then(({ value }) => {
          // console.log(value)
          this.handlerDownloadFile(fileHash, value)
        })
        .catch(() => {})
    },
    async handlerDownloadFile(FileHash, password) {
      // let params = {
      //   fileHash,
      //   password
      // }
      // const loading = this.$loading({
      //   lock: true,
      //   text: 'Loading',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.2)'
      // })
      try {
        let p = {
          jsonrpc: '2.0',
          method: 'downloadfile',
          params: [
            {
              FileHash: 'Sk9yZQaUN4xTP8WtyDoy9vSwE9uaUw3BtLMaMcRyGrbaHNqA',
              InOrder: true,
              MaxPeerCnt: 3,
              OutFilePath: '',
              DecryptPwd: '111111'
            }
          ],
          id: '1'
        }
        let apires = await this.$http.default.Role.CommonFn(p)
        // loading.close()
        console.log('download', apires)
        return
        const { error, desc, result } = apires
        if (error === 0 && desc === 'SUCCESS') {
          loading.close()
          window.open(result, '_self')
        } else {
          let str = ''
          if (
            desc ==
            'no available fs nodes to download file: no node had commit pdp prove data'
          ) {
            str =
              'Uploading file to ONTFS Test Net right now. Please try again later!'
          } else if (desc == 'wrong password') {
            str = 'Wrong decryption code. Please try again.'
          } else {
            str = 'Error. Please try again!'
          }
          this.$message({
            type: 'error',
            message: str
          })
          loading.close()
        }
      } catch (error) {
        // loading.close()
      }
    }
  },
  async created() {
    let p = {
      jsonrpc: '2.0',
      method: 'getfilelist',
      params: [],
      id: '1'
    }
    let res = await this.$http.default.Role.CommonFn(p)
    console.log(res)
    if (res.desc === 'SUCCESS' && res.error === 0) {
      return (this.fileList = res.result)
    }
  }
}
</script>

<style lang="scss" scoped>
.download_wrap {
  width: 100%;
  height: 100%;
  ul {
    border-top: 1px solid #ccc;

    li {
      display: flex;
      justify-content: flex-start;
      border-bottom: 1px solid #ccc;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
      line-height: 30px;
      .action_wrap {
        width: 200px;
        text-align: center;
      }
      .file_hash {
        flex: 1;
        text-align: center;
        border-right: 1px solid #ccc;
        font-size: 14px;
      }
    }
  }
  .no_data {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
