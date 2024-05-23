Page({
  data: {
    value: ''
  },

  onInput(e) {
    // setTimeout(() => {
    //   this.setData({ value: e.detail.value })

    // }, 0)
    this.setData({ value: e.detail.value })
  },

  submit() {
    console.log('submit value:', this.data.value)
  }
})