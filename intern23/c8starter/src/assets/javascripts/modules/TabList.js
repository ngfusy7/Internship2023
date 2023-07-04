export default class TabList {
  constructor(e) {
    this.$this = $(e)
    this.tablist = this.$this.find('.tablist')
    this.tabs = this.$this.find('[role=tab]')
    this.panels = this.$this.find('[role=tabpanel]')
    this.clsTabHiden = 'is-hidden hidden'
    this.keys = {
      end: 35,
      home: 36,
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      delete: 46
    }
    this.direction = {
      37: -1,
      38: -1,
      39: 1,
      40: 1
    }
  }
  init() {
    // this.skipMain()
    this.addListeners()
  }
  // Bind listeners
  addListeners() {
    this.tabs.on('click', (e) => {
      this.clickEventListener(e)
    })
    this.tabs.on('keydown', (e) => {
      this.keydownEventListener(e)
    })
    this.tabs.on('keyup', (e) => {
      this.keyupEventListener(e)
    })
    this.tabs.on('focus', (e) => {
      this.focusEventHandler(e)
    })
  }
  clickEventListener(event) {
    const tab = event.currentTarget
    this.activateTab(tab, false)
  }
  keydownEventListener(event) {
    const key = event.keyCode

    switch (key) {
      case this.keys.end:
        event.preventDefault()
        // Activate last tab
        this.activateTab(this.tabs[this.tabs.length - 1],true)
        break
      case this.keys.home:
        event.preventDefault()
        // Activate first tab
        this.activateTab(this.tabs[0],true)
        break
      // Up and down are in keydown
      // because we need to prevent page scroll >:)
      case this.keys.up:
      case this.keys.down:
        this.determineOrientation(event)
        break
        default:
        break
    }
  }

  // Handle keyup on tabs
  keyupEventListener(event) {
    const key = event.keyCode
    switch (key) {
      case this.keys.left:
      case this.keys.right:
        this.determineOrientation(event)
        break
      case this.keys.delete:
        this.determineDeletable(event)
        break
        default:
        break
    }
  }
  determineOrientation(event) {
    const key = event.keyCode
    const vertical = this.tablist.attr('aria-orientation') === 'vertical'
    let proceed = false
    if (vertical) {
      if (key === this.keys.up || key === this.keys.down) {
        event.preventDefault()
        proceed = true
      }
    } else {
      if (key === this.keys.left || key === this.keys.right) {
        proceed = true
      }
    }
    if (proceed) {
      this.switchTabOnArrowPress(event)
    }
  }

  // Either focus the next, previous, first, or last tab
  // depending on key pressed
  switchTabOnArrowPress(event) {
    const pressed = event.keyCode

    if (this.direction[pressed]) {
      const target = event.target
      if (this.tabs[$(target).index() + this.direction[pressed]]) {
        this.tabs[$(target).index() + this.direction[pressed]].focus()
      } else if (pressed === this.keys.left || pressed === this.keys.up) {
        this.focusLastTab()
      } else {
        if (pressed === this.keys.right || pressed === this.keys.down) {
          this.focusFirstTab()
        }
      }
    }
  }

  // Activates any given tab panel
  activateTab(tab, keydown) {
    this.deactivateTabs()
    $(tab).attr({
      'tabindex': '0',
      'aria-selected': 'true'
    }).addClass('active')
    $(`#${$(tab).attr('aria-controls')}`).removeClass(this.clsTabHiden)
    if(keydown){
      $(tab).focus()
    }
  }

  // Deactivate all tabs and tab panels
  deactivateTabs() {
    this.tabs.attr({
      'tabindex': '-1',
      'aria-selected': 'false'
    }).removeClass('active')
    this.panels.addClass(this.clsTabHiden)
  }

  // Make a guess
  focusFirstTab() {
    this.tabs[0].focus()
  }

  // Make a guess
  focusLastTab() {
    this.tabs[this.tabs.length - 1].focus()
  }

  // Detect if a tab is deletable
  determineDeletable(event) {
    const target = event.target
    if ($(target).attr('data-deletable') !== null) {
      // Delete target tab
      this.deleteTab(event, target)
      // Update arrays related to tabs widget
      this.tabs = this.$this.find('[role=tab]')
      this.panels = this.$this.find('[role=tabpanel]')

      // Activate the closest tab to the one that was just deleted
      if ($(target).index() - 1 < 0) {
        this.activateTab(this.tabs[0])
      } else {
        this.activateTab(this.tabs[$(target).index() - 1])
      }
    }
  }

  // Deletes a tab and its panel
  deleteTab(event) {
    const target = event.target
    const $panel = $(`#${$(target).attr('aria-controls')}`)
    $panel.remove()
    $(target).remove()
  }

  focusEventHandler(event) {
    const target = event.target
    const focused = document.activeElement

    if (target === focused) {
      this.activateTab(target, false)
    }
  }
}

const $tabs = $('.mod-tabs')
if ($tabs.length) {
  $tabs.each((_i, e) => {
    new TabList(e).init()
  })
}
