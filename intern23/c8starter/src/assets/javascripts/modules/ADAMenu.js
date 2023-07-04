class ADAMenu {
  constructor(e) {
    this.$this = $(e);
    this.$controlledNodes = [];
    this.openIndex = null;
    this.useArrowKeys = true;
    this.$topLevelNodes = this.$this.find('.main-link, a[aria-expanded][aria-controls]');
    this.ariaExpanded = 'aria-expanded';
  }

  init() {
    this.$topLevelNodes.each((_i, e) => {
      // handle menu item has sub + sub menu
      if (e.tagName.toLowerCase() === 'a' && e.hasAttribute('aria-controls')) {
        const $subMenu = $(e).parent().find('.dropdown-menu');
        if ($subMenu.length) {
          // save ref controlled sub menu
          this.$controlledNodes.push($subMenu);

          // attach event listeners
          $subMenu.on('keydown', this.onSubMenuKeyDown.bind(this));
          $(e).on('click', this.onMenuHasSubClick.bind(this));
          $(e).on('keydown', this.onMenuHasSubKeyDown.bind(this));
        }
      }
      // handle menu item no sub
      else {
        this.$controlledNodes.push(null);
        $(e).on('keydown', this.onMenuNoSubKeyDown.bind(this));
        $(e).on('focus', this.onMenuNoSubFocus.bind(this));
      }
    });

    this.$this.on('focusout', this.onBlur.bind(this));
  }

  controlFocusByKey(keyboardEvent, nodeList, currentIndex) {
    switch (keyboardEvent.which) {
      // ArrowLeft, ArrowUp
      case 37:
      case 38:
        keyboardEvent.preventDefault();
        if (currentIndex > -1) {
          const prevIndex = Math.max(0, currentIndex - 1);
          nodeList[prevIndex].focus();
        }
        break;
      // ArrowRight, ArrowDown
      case 39:
      case 40:
        keyboardEvent.preventDefault();
        if (currentIndex > -1) {
          const nextIndex = Math.min(nodeList.length - 1, currentIndex + 1);
          nodeList[nextIndex].focus();
        }
        break;
      // Home
      case 36:
        keyboardEvent.preventDefault();
        nodeList[0].focus();
        break;
      // End
      case 35:
        keyboardEvent.preventDefault();
        nodeList[nodeList.length - 1].focus();
        break;
      default: break;
    }
  }

  // public function to close open menu
  close() {
    this.toggleExpand(this.openIndex, false);
  }

  onBlur(e) {
    const menuContainsFocus = this.$this.find($(e.relatedTarget)).length;
    if (!menuContainsFocus && this.openIndex !== null) {
      this.toggleExpand(this.openIndex, false);
    }
  }

  onMenuHasSubClick(e) {
    if ($(window).outerWidth() > 991) {
      const $menuItem = $(e.target);
      const menuItemIndex = this.$topLevelNodes.index($menuItem);
      const menuItemExpanded = $menuItem.attr(this.ariaExpanded) === 'true';
      this.toggleExpand(menuItemIndex, !menuItemExpanded);
    }
  }

  onMenuHasSubKeyDown(e) {
    const targetMenuItemIndex = this.$topLevelNodes.index($(document.activeElement));
    // close on escape
    if (e.which === 27 && $(window).outerWidth() > 991) {
      this.toggleExpand(this.openIndex, false);
    }
    // move focus into the open menu if the current menu is open
    else if (
      this.useArrowKeys &&
      this.openIndex === targetMenuItemIndex &&
      e.which === 40
    ) {
      e.preventDefault();
      this.$controlledNodes[this.openIndex].find('a').first().focus();
    }

    // handle arrow key navigation between top-level menu items, if set
    else {
      if (this.useArrowKeys) {
        this.controlFocusByKey(e, this.$topLevelNodes, targetMenuItemIndex);
      }
    }
  }

  onMenuNoSubKeyDown(e) {
    const targetLinkIndex = this.$topLevelNodes.index($(document.activeElement));

    // handle arrow key navigation between top-level menu items, if set
    if (this.useArrowKeys) {
      this.controlFocusByKey(e, this.$topLevelNodes, targetLinkIndex);
    }
  }

  onSubMenuKeyDown(e) {
    if (this.openIndex === null) {
      return;
    }

    const $menuLinks = this.$controlledNodes[this.openIndex].find('a');
    const currentIndex = $menuLinks.index($(document.activeElement));

    // close on escape
    if (e.which === 27 && $(window).outerWidth() > 991) {
      this.$topLevelNodes[this.openIndex].focus();
      this.toggleExpand(this.openIndex, false);
    }

    // handle arrow key navigation within menu links, if set
   if (this.useArrowKeys) {
      this.controlFocusByKey(e, $menuLinks, currentIndex);
    }
  }

  onMenuNoSubFocus() {
    if ($(window).outerWidth() > 991) {
      this.toggleExpand(this.openIndex, false);
    }
  }

  toggleExpand(index, expanded) {
    // close open menu, if applicable
    if (this.openIndex !== index) {
      this.toggleExpand(this.openIndex, false);
    }

    // handle menu at called index
    if (this.$topLevelNodes.eq(index)) {
      this.openIndex = expanded ? index : null;
      this.$topLevelNodes.eq(index).attr(this.ariaExpanded, expanded);
      this.toggleMenu(this.$controlledNodes[index], expanded);
    }
  }

  toggleMenu($menu, show) {
    if ($menu && $(window).outerWidth() > 991) {
      show ? $menu.parents('.menu-item').eq(0).addClass('hovering') : $menu.parents('.menu-item').eq(0).removeClass('hovering');
    } else {
      if ($menu && !show) {
        $menu.parent().removeClass('is-open-child');
      }
    }
  }

  updateKeyControls(useArrowKeys) {
    this.useArrowKeys = useArrowKeys;
  }
}

/* Initialize Disclosure Menus */
const $menus = $('.main-menu-ul');
$menus.each((_i, e) => {
  new ADAMenu(e).init()
})

// Fake link behavior
$menus.each((i, _e)  => {
  const $links = $menus.eq(i).find('a');
  $links.on('click', (e) => {
    $links.removeAttr('aria-current');
    $(e.target).attr('aria-current', 'page');
  })
});