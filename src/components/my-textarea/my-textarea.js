
Component({
  externalClasses: ['class'],

  properties: {
    value: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: ''
    },
    placeholderStyle: {
      type: String,
      value: ''
    },
    disabled: {
      type: Boolean,
      value: false
    },
    maxlength: {
      type: Number,
      value: 140
    },
    autoFocus: {
      type: Boolean,
      value: false
    },
    focus: {
      type: Boolean,
      value: false
    },
    autoHeight: {
      type: Boolean,
      value: false
    },
    cursorSpacing: {
      type: Number,
      value: 0
    },
    cursor: {
      type: Number,
      value: -1
    },
    selectionStart: {
      type: Number,
      value: -1
    },
    selectionEnd: {
      type: Number,
      value: -1
    },
    adjustPosition: {
      type: Boolean,
      value: true
    },
    holdKeyboard: {
      type: Boolean,
      value: false
    },
    disableDefaultPadding: {
      type: Boolean,
      value: false
    },
    confirmType: {
      type: String,
      value: 'return'
    },
    confirmHold: {
      type: Boolean,
      value: false
    },
    adjustKeyboardTo: {
      type: String,
      value: 'cursor'
    },
    placeholderClass: {
      type: String,
      value: 'textarea-placeholder'
    },
    fixed: {
      type: Boolean,
      value: false
    },
    showConfirmBar: {
      type: Boolean,
      value: true
    }
  },

  data: {
    bindValue: ''
  },

  observers: {
    value() {
      this.setBindValue(this.getInputValue())
    }
  },

  lifetimes: {
    attached() {
      this.inputting = false
      this.setData({ bindValue: this.getInputValue() })
    }
  },

  methods: {
    getInputValue() {
      const { value } = this.properties
      if (value === undefined || value === null) {
        return ''
      }
      return typeof value === 'string' ? value : '' + value
    },

    setBindValue(nextValue) {
      const { bindValue: currentValue } = this.data
      if (currentValue === nextValue) {
        return
      }
      if (currentValue && this.inputting) {
        this.data.bindValue = nextValue
      } else {
        this.setData({ bindValue: nextValue })
      }
    },

    emit(e) {
      this.triggerEvent(e.type, e.detail)
    },

    onFocus(e) {
      this.emit(e)
    },

    onBlur(e) {
      this.setData({ bindValue: this.getInputValue() })
      this.emit(e)
    },

    onInput(e) {
      this.inputting = true
      this.emit(e)
      this.inputting = false
      return this.getInputValue()
    },

    onLineChange(e) {
      this.emit(e)
    },
  
    onConfirm(e) {
      this.emit(e)
    },

    onKeyboardHeightChange(e) {
      this.emit(e)
    }
  }
})