<template>
  <div class="m-content">
    <div class="file-box">
      <span>添加附件
      <input type="file" @change="uploadFiles($event.target.files)" ref="file" accept=".doc, .docx, .pdf, .jpg, .jpeg, .png" style="opacity: 0;">
        <!--<input type="file" @change="uploadFiles($event.target.files)" ref="file" accept="image/jpg, image/jpeg, image/png,
         application/vnd.ms-powerpoint, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document,
         application/vnd.openxmlformats-officedocument.presentationml.presentation">添加附件-->
      </span>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {

      }
    },
    methods: {
      // 上传文件
      uploadFiles (file) {
        let fd = new FormData()
        fd.append('attach', file[0])
        this.api.uploadImage(fd).then(({data, code, message}) => {

        }).catch(err => {
          console.error(err)
        })
      }
    },
    created () {

    }
  }
</script>

<style lang="scss" scoped>

  .m-content {
    height: 100%;
    background: #31CC99;
    .file-box {
      border: 1px red solid;
    }
  }
</style>
