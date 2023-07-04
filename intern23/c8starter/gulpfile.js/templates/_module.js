const $this = $('.<%= ModuleName %>')
const init = () => {
  $this.each((index, el) => {
    console.log(el, index)
  })
}

const <%= ClassName %> = (() => {
  if ($this.length) {
    init()
  }
})()
export default <%= ClassName %>
