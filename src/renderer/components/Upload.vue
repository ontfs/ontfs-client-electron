<template>
  <div class="upload_wrap">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="200px"
      class="demo-ruleForm"
    >
      <el-form-item>
        <div class="label_title">File</div>
        <div class="select_area">
          <el-button @click="clickFns" type="primary" size="small"
            >Select</el-button
          >
          <p
            style="height:20px; line-height: 20px; font-size: 14px; color: #333;margin-top: 10px"
          >
            {{ fileName }}
          </p>
          <input
            type="file"
            ref="file_upload"
            class="outputlist_upload"
            style="display:none"
          />
        </div>
      </el-form-item>
      <el-form-item label="File encryption code" prop="EncryptPassword">
        <el-input
          placeholder="Create an encryption code"
          v-model="ruleForm.EncryptPassword"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="Expiration time" prop="TimeExpired">
        <el-date-picker
          type="date"
          placeholder="Please select file expiration time"
          v-model="ruleForm.TimeExpired"
          style="width: 100%;"
          value-format="timestamp"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="Description" prop="FileDesc">
        <el-input type="textarea" v-model="ruleForm.FileDesc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >Upload</el-button
        >
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      fileName: '',
      ruleForm: {
        EncryptPassword: '',
        TimeExpired: '',
        FileDesc: '',
        FilePath: '',
        PdpInterval: 4 * 60 * 60,
        CopyNum: 3,
        StorageType: 1,
        Encrypt: true,
        WhiteList: []
      },
      rules: {
        EncryptPassword: [
          {
            required: true,
            message: 'Please enter file encryption code',
            trigger: 'blur'
          },
          {
            pattern: /^[\S]{6,12}$/,
            min: 6,
            max: 12,
            message: '6~12 characters in length and cannot be empty!',
            trigger: 'change'
          }
        ],
        TimeExpired: [
          {
            type: 'date',
            required: true,
            message: 'Please select file expiration time',
            trigger: 'change'
          }
        ],
        FileDesc: [
          {
            required: true,
            message: 'Please enter file description',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.ruleForm.FilePath) {
            return this.$message({
              type: 'error',
              message: 'Please select a wallet!'
            })
          }
          console.log(this.DataParams)
          this.uploadFn()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    formatTime(time) {
      return time / 1000
    },
    getFile(e) {
      var that = this
      const files = e.target.files
      console.log(files)
      that.ruleForm.FilePath = files[0].path
      that.ruleForm.FileSize = files[0].size
      that.fileName = files[0].name
    },
    clickFns() {
      this.$refs.file_upload.click()
    },
    async uploadFn() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      let apires = await this.$http.default.Role.CommonFn(this.DataParams)
      console.log('apires', apires)
      const { desc, error, result } = apires
      loading.close()
      if (desc !== 'SUCCESS' || error !== 0) {
        return this.$message({
          type: 'error',
          message: desc
        })
      }
      this.resetForm('ruleForm')
      this.fileName = ''
      return this.$message({
        type: 'success',
        message: 'file upload success!'
      })
    }
  },
  mounted() {
    this.$refs.file_upload.addEventListener('change', e => {
      this.getFile(e)
    })
  },
  computed: {
    DataParams() {
      let TimeExpired = this.formatTime(this.ruleForm.TimeExpired)
      return {
        jsonrpc: '2.0',
        method: 'uploadfile',
        params: [{ ...this.ruleForm, TimeExpired }],
        id: '1'
      }
    }
  }
}
</script>
