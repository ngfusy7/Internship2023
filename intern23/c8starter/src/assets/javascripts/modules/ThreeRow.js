export default class ThreeRow {
  constructor () {
    this.$this = $('mod-three-row')
  }
  init() {
    this.showHidden();
  }
  showHidden() {
    $('.box-title').click(function() {
      var boxContent = $(this).siblings(".box-content");
      var image = $(this).find('img');
      var speed = 300;

      if (boxContent.is(':hidden')) {
        boxContent.slideDown(speed);
        $(this).removeClass("bg-gray-400 text-black");
        $(this).addClass("bg-blue-300 text-white");
        image.attr('src', 'assets/images/sub.svg');
      }
      else {
        boxContent.slideUp(speed);
        $(this).removeClass("bg-blue-300 text-white");
        $(this).addClass("bg-gray-400 text-black");
        image.attr('src', 'assets/images/plus.svg');
      }
    });
  }
}
new ThreeRow().init()