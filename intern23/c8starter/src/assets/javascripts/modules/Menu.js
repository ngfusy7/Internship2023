
 export default class Menu {
   constructor () {
     this.this = '#main-menu'
     this.$this = $(this.this)
     this.$mainMenu = $('#main-menu').find('.main-menu-ul')
     this.elementItem = '.hamburger-menu, html, #main-menu, #header'
     this.$header = $('#header, #main-menu-mobile')
     this.$hamburgerMenu = $('.hamburger-menu')
     this.li = this.$this.find('.main-menu-ul >li>a')
     this.liLevel1 = this.$this.find('.main-menu-ul >li')
     this.liLeve2 = this.$this.find('.main-menu-ul .main-menu-dropdown li>a')
     this.isopenmenu = 'is-open-menu'
     this.isopenmenuchild = 'open-menu-child'
     this.isopenchild = 'is-open-child'
     this.$linksInMenu = $('.header a:not(.skip-link), .header button')
     this.$firstLinkInMenu = this.$linksInMenu.first()
     this.$lastLinkInMenu = this.$linksInMenu.last()
     this.$skipLink = $('.header a.skip-link')
     this.ariaExpanded = 'aria-expanded'
     this.classHover = 'hovering'
   }
   init () {
     if (this.$this.length) {
       this.openMainMenu()
       this.clickArowOpenDropdownMenuLeve1()
       this.clickLiOpenDropdownMenuLeve1()
       this.clickArowOpenDropdownMenuLeve2()
       this.clickOutsite()
       this.clickLiOpenDropdownMenuLeve2()
       this.toggleTabIndexSkipLink()
       this.hoverOpenMenu()
     }
   }

  /* micro function */
   microOpenCloseLevel1 (currentElement, openClass, isLiLv1 = false) {
     const ele = currentElement.currentTarget
     const eleParent = $(ele).parent()
     if ($(window).width() < 992) {
       if (eleParent.find('ul').length && !eleParent.hasClass(openClass)) {
         this.liLevel1.removeClass(openClass)
         this.liLevel1.find('> a').each((_i, el) => {
          if ($(el).attr(this.ariaExpanded)) {
            $(el).attr(this.ariaExpanded, false)
          }
         })
         eleParent.addClass(openClass)
         $(ele).attr(this.ariaExpanded, true)
         if (isLiLv1) {
           return false
         }
       } else {
         eleParent.removeClass(openClass)
         $(ele).attr(this.ariaExpanded, false)
       }
     }
     return true
   }
  /* end micro */

   openMainMenu () {
     this.$header.on('click', '.hamburger-menu', (e) => {
       const ele = e.currentTarget

       if ($(ele).hasClass(this.isopenmenu)) {
         $(this.elementItem).removeClass(this.isopenmenu)
         this.$hamburgerMenu.find('.sr-only').text('Open menu')
         this.$hamburgerMenu.attr (this.ariaExpanded, false)
         this.$skipLink.removeAttr('tabindex')
        } else {
          $(this.elementItem).addClass(this.isopenmenu)
          this.$hamburgerMenu.find('.sr-only').text('Close menu')
          this.$hamburgerMenu.attr(this.ariaExpanded, true)
          this.bindEventFocusOnMenu()
        }
     })
   }
   toggleTabIndexSkipLink() {
    $(window).on('resize', () => {
      if ($(window).outerWidth() < 992) {
        this.$skipLink.removeAttr('tabindex')
      }
    })
   }

   bindEventFocusOnMenu() {
    this.$skipLink.attr('tabindex', -1)
    this.$firstLinkInMenu.get(0).addEventListener('keydown', this.shiftTabFocusToLast.bind(this))
    this.$lastLinkInMenu.get(0).addEventListener('keydown', this.tabFocusToFirst.bind(this))
   }

   tabFocusToFirst(e) {
    if (e.which === 9 && $(window).outerWidth() < 992 && !e.shiftKey) {
        e.preventDefault()
        this.$firstLinkInMenu.focus()
      }
   }
   shiftTabFocusToLast(e) {
    if (e.which === 9 && $(window).outerWidth() < 992 && e.shiftKey) {
      e.preventDefault()
      this.$lastLinkInMenu.focus()
    }
   }

   clickArowOpenDropdownMenuLeve1 () {
     this.liLevel1.on('click', '.arrows-lv1', (e) => {
       this.microOpenCloseLevel1(e, this.isopenchild)
     })
   }

   clickLiOpenDropdownMenuLeve1 () {
     this.li.on('click', (e) => {
       return this.microOpenCloseLevel1(e, this.isopenchild, true)
     })
   }

   clickArowOpenDropdownMenuLeve2 () {
     this.$this.find('.main-menu-ul').on('click', '.arrows-lv2', (e) => {
       const ele = e.currentTarget
       const eleParent = $(ele).parent()
       if ($(window).width() < 1025) {
         if (eleParent.find('.menu-child').length && !eleParent.hasClass(this.isopenmenuchild)) {
           eleParent.addClass(this.isopenmenuchild)
         } else {
          // eleParent.addClass(this.isopenmenuchild)
           eleParent.removeClass(this.isopenmenuchild)
         }
       }
     })
   }

   clickOutsite () {
     $(document).on('click', (event) => {
       if (!$(event.target).closest('#header.is-open-menu').length) {
         $(this.elementItem).removeClass(this.isopenmenu)
       }
     })
   }

   clickLiOpenDropdownMenuLeve2 () {
     this.liLeve2.on('click', (e) => {
       const ele = e.currentTarget
       const eleParent = $(ele).parent()
       if ($(window).width() < 1025 && eleParent.find('ul').length && !eleParent.hasClass(this.isopenmenuchild)) {
         this.li.removeClass(this.isopenmenuchild)
         eleParent.addClass(this.isopenmenuchild)
         return false
       }
       return true
     })
   }

   closeAllSubmenu() {
    const $liHover = this.$this.find('.main-menu-ul>li.hovering')
    $liHover.removeClass('hovering')
    if ($liHover.hasClass('has-sub')) {
      $liHover.find('> a').attr(this.ariaExpanded, false)
    }
   }

   hoverOpenMenu(){
    const classHoverHeader = 'pin-color'
    let timeout
    let timeHeader
    this.liLevel1.on('mouseover', (e) => {
      const liHover = this.$this.find(`.main-menu-ul>li.${this.classHover}`)
      this.$header.addClass(classHoverHeader)
      if ($(window).outerWidth() > 991 && liHover.length < 2) {
        const ele = e.currentTarget
        clearTimeout(timeout)
        clearTimeout(timeHeader)
        timeout = setTimeout(() => {
          this.closeAllSubmenu()
          console.log('add')
          $(ele).addClass(this.classHover)
          if ($(ele).hasClass('has-sub')) {
            $(ele).find('> a').attr(this.ariaExpanded, true)
          }
        }, 0)
      }
    })

    this.$mainMenu.on('mouseleave', () => {
      if ($(window).outerWidth() > 991) {
        clearTimeout(timeout)
        clearTimeout(timeHeader)
        timeout = setTimeout(() => {
          this.closeAllSubmenu()
        }, 50)
        timeHeader = setTimeout(() => {
          this.$header.removeClass(classHoverHeader)
          this.closeAllSubmenu()
        }, 200)
      }
    })

    $(window).on('keydown', (e) => {
      if (e.keyCode === 27 && $(window).outerWidth() > 991) {
        clearTimeout(timeout)
        clearTimeout(timeHeader)
        timeout = setTimeout(() => {
          this.closeAllSubmenu()
        }, 50)
        timeHeader = setTimeout(() => {
          this.$header.removeClass(classHoverHeader)
          this.closeAllSubmenu()
        }, 200)
      }
    })
  }
}

 new Menu().init()
