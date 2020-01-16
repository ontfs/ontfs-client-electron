<template>
  <div class="startsdk_wrap">
    <!-- <el-button @click="send" type="success">Click</el-button> -->
    <div class="form_area">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="demo-ruleForm"
      >
        <el-form-item label="Wallet(.dat)" style="display: inline-block;">
          <div style="">
            <input
              type="file"
              name="upload"
              id="upload"
              style="display: none;"
              @change="openFile"
              multiple="multiple"
              accept=".dat"
            />
            <el-button type="primary" @click="showRealPath">Select</el-button>
            <p>{{ textarea }}</p>
          </div>
        </el-form-item>
        <el-form-item label="Wallet Password" prop="WalletPwd">
          <el-input type="password" v-model="ruleForm.WalletPwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      textarea: '',
      ruleForm: {
        ChainRpcAddr: 'http://128.1.40.229:20336',
        WalletPath: '',
        WalletPwd: '',
        GasPrice: 0,
        GasLimit: 20000,
        PdpVersion: 1,
        P2pProtocol: 'tcp',
        P2pListenAddr: '0.0.0.0:20556',
        P2pNetworkId: 7,
        BlockConfirm: 0
      },
      rules: {
        WalletPwd: [
          {
            required: true,
            message: 'Please enter Wallet passowrd',
            trigger: 'blur'
          }
        ],
        ChainRpcAddr: [
          {
            required: true,
            message: 'Please enter ChainRpcAddr',
            trigger: 'blur'
          },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        WalletPath: [
          {
            required: true,
            message: 'Please enter WalletPath',
            trigger: 'blur'
          },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.ruleForm.WalletPath) {
            return this.$message({
              type: 'error',
              message: 'Please select a wallet!'
            })
          }
          this.send()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async send() {
      let p = {
        jsonrpc: '2.0',
        method: 'startsdk',
        params: [
          {
            ...this.ruleForm
          }
        ],
        id: '1'
      }
      console.log(p)
      let res = await this.$http.default.Role.StartSDK(p)
      console.log(res)
      const { desc, error } = res
      if (desc === 'SUCCESS' && error === 0) {
        this.$message({
          type: 'success',
          message: 'Start success!'
        })
      } else {
        this.$message({
          type: 'error',
          message: desc
        })
      }
    },
    openFile() {
      //   document.getElementById('upload').click()
      console.log(document.getElementById('upload').files[0])
      this.textarea = document.getElementById('upload').files[0].name
      this.ruleForm.WalletPath = document.getElementById('upload').files[0].path
    },
    showRealPath() {
      document.getElementById('upload').click()
    }
  }
}
</script>

<style lang="scss" scoped>
.startsdk_wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  .form_area {
    width: 100%;
    max-width: 400px;
  }
}
</style>
