class MSwiperPage {
  constructor(element, prev, next) {
    this.element = element
    this.prev = prev
    this.next = next
    this.threshold = 50
    this.touchOffset = 0
    this.onGoingTouchs = []
    this.element.addEventListener(
      'touchstart',
      this.handleStart.bind(this),
      false
    )
    this.element.addEventListener(
      'touchmove',
      this.handleMove.bind(this),
      false
    )
    this.element.addEventListener('touchend', this.handleEnd.bind(this), false)
  }
  handleStart(event) {
    event.preventDefault()
    const touch = event.targetTouches[0]
    this.touchStartPageY = touch.pageY
  }
  handleMove(event) {
    event.preventDefault()
    this.onGoingTouchs.push(event.targetTouches[0])
    console.log(this.onGoingTouchs)
  }
  handleEnd(event) {
    const touch = event.changedTouches[0]
    this.touchOffset = touch.pageY - this.touchStartPageY
    if (Math.abs(this.touchOffset) > this.threshold) {
      console.log('大于阈值')
      if (this.touchOffset > 0) {
        console.log('下一页')
      } else {
        console.log('上一页')        
      }
    } else {
      console.log('小于阈值')
    }
  }
  show () {}
  move () {}
  hide () {}
}

class MSwiper {
  constructor(selector = '.ms-container') {
    this.selector = selector
    this.container = document.querySelector(this.selector)
    this.nodes = Array.from(this.container.children).filter(
      node => node.className.indexOf('ms-page') > -1
    )
    this.pages = []
    this.init()
  }
  init() {
    for (let i = 0; i < this.nodes.length; i++) {
      if (i === 0) {
        this.pages.push(
          new MSwiperPage(
            this.nodes[i],
            this.nodes[this.nodes.length - 1],
            this.nodes[i + 1]
          )
        )
      } else if (i === this.nodes.length - 1) {
        this.pages.push(
          new MSwiperPage(this.nodes[i], this.nodes[i - 1], this.nodes[0])
        )
      } else {
        this.pages.push(
          new MSwiperPage(this.nodes[i], this.nodes[i - 1], this.nodes[i + 1])
        )
      }
    }
  }
}
