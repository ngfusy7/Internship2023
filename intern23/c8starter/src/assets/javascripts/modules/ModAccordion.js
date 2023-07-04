export default class ModAccordion {
  constructor() {
    this.moduleClass = '.mod-accordion'
    this.$this = $(this.moduleClass)
    this.clsExpand = 'js-expand'
    this.openOneCls = '.only-open-one'
    this.ariaExpanded = 'aria-expanded'
    this.animatingCls = 'animating'
  }

  handleToggle(elem) {
    const btnEl = $(elem)
    const moduleEl = btnEl.parents(this.moduleClass)
    const contentEl = this.findContent(btnEl)

    const open = btnEl.attr(this.ariaExpanded).trim() === 'true'
    const isOnlyOpenOne = moduleEl.is(this.openOneCls)
    const animationDuration = 400
    const animating = false

    if (isOnlyOpenOne) {
      if (!open) {
        this.deActivate(moduleEl)
        btnEl.attr(this.ariaExpanded, 'true').addClass(this.clsExpand)
        contentEl.slideDown()
      }
    } else {
      if (btnEl.hasClass(this.animatingCls)) {
        return
      }
      if (!open) {
        contentEl.slideDown(animationDuration, () => {
          animating
        })
      } else {
        contentEl.slideUp(animationDuration).removeClass('hidden')
      }
      btnEl.addClass(this.animatingCls)
      btnEl.attr(this.ariaExpanded, `${!open}`).toggleClass(this.clsExpand)

      // prevent multiple click events
      setTimeout( () => {
        btnEl.removeClass(this.animatingCls)
      }, animationDuration + 100)
    }
  }


  deActivate(element) {
    const buttons = element.find('button[aria-expanded]')

    buttons.each((_i, btn) => {
      const btnEl = $(btn)
      const contentEl = this.findContent(btnEl)

      btnEl.attr('aria-expanded', `false`).removeClass(this.clsExpand)
      contentEl.slideUp()
    })
  }

  findContent(btn) {
    const controlsId = btn.attr('aria-controls')
    return $(`#${controlsId}`)
  }

  addListeners(element) {

    element.find('button[aria-expanded]').each((_i, btn) => {
      $(btn).on('click', (e) => {
        if ($(e.currentTarget).is('.mouse')) {
          this.handleToggle(btn)
        }
      })

      $(btn).on('keydown', (e) => {
        this.keydownEventListener(e, btn)
      })
    })
  }

  keydownEventListener(event, element) {
    const key = event.keyCode

    switch (key) {
      case 32:
        event.preventDefault()
        this.handleToggle(element)
        break;

      case 13:
        event.preventDefault()
        this.handleToggle(element)
        break;

      default:
        break;

    }
  }


  init() {
    if (this.$this.length) {
      this.$this.each( (_index, el) => {
        this.addListeners($(el))
      })
    }
  }
}

new ModAccordion().init()
