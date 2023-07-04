import $ from 'jquery'
const <%= ClassName %> = (() => {
  const init = () => {
    let _this = $('.<%= ModuleName %>')
    if (_this.length) {
      console.log('<%= ModuleName %>')
    }
  }
  init()
})()
export default <%= ClassName %>
