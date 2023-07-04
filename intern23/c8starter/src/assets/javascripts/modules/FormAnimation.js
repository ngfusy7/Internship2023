export default class FormAnimation {
  constructor () {
    this.formGroup = '.form-group-v2'
    this.formControl = 'input.form-control'
    this.activeFocus = 'active-focus'
    this.$hasFormAni = $('.form-ani')
  }
  init () {
    if (this.$hasFormAni.length) {
      this.formFocus()
      this.formChange()
      this.checkValue()
      this.documentClick()
    }
  }
  checkValue () {
    this.$hasFormAni.find(this.formControl).each((_index, el) => {
      const eleParent = $(el).parents(this.formGroup)
      if ($(el)[0].value.length) {
        eleParent.addClass(this.activeFocus)
      } else {
        eleParent.removeClass(this.activeFocus)
      }
    })
  }
  formFocus () {
    this.$hasFormAni.find(this.formGroup).on('focus', this.formControl, (e) => {
      const ele = e.currentTarget
      this.checkValue()
      $(ele).parents(this.formGroup).addClass(this.activeFocus)
    })
    this.$hasFormAni.find(this.formGroup).on('focusout', this.formControl, () => {
      this.checkValue()
    })
  }
  formChange () {
    this.$hasFormAni.find(this.formGroup).on('change', this.formControl, () => {
      this.checkValue()
    })
  }
  documentClick () {
    $(document).on('click focus', (e) => {
      const ele = e.target
      if (!$(ele).is('.form-group-v2 .form-control')) {
        this.checkValue()
      }
    })
  }
}

new FormAnimation().init()
