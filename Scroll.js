function Scroll(opts) {
  this.num = opts.num || 5
  this.width = opts.width || 1000
  this.height = opts.height || 300
  this.src = opts.src
  this.n = 1
  this.timer01 = null
  this.timer02 = null
  this.container = null
  this.outter = null
  this.inner = null
  this.left = null
  this.right = null
  this.imgs_index = null
  this.direction = opts.direction || false
  this.index = opts.index || false
}
Scroll.prototype.init = function () {
    this.container = document.createElement('div')
    this.container.classList.add('scroll-container')
    this.container.style.width = this.width + 'px'
    this.container.style.height = this.height + 'px'
    this.outter = document.createElement('div')
    this.outter.classList.add('scroll-outter')
    this.outter.style.width = this.width + 'px'
    this.outter.style.height = this.height + 'px'
    this.inner = document.createElement('div')
    this.inner.classList.add('scroll-inner')
    this.inner.style.height = this.height + 'px'
    this.inner.style.width = this.width * (this.num + 1) + 'px'

    if (this.direction) {
      this.left = document.createElement('div')
      this.left.classList.add('scroll-left')
      this.right = document.createElement('div')
      this.right.classList.add('scroll-right')
      this.container.appendChild(this.left)
      this.container.appendChild(this.right)
    }

    for (var i = 0; i < this.num; i++) {
      var li = document.createElement('li')
      var img = document.createElement('img')
      img.style.width = this.width + 'px'
      img.style.height = this.height + 'px'
      img.src = this.src[i]
      li.appendChild(img)
      this.inner.appendChild(li)
    }
    var li = document.createElement('li')
    var img = document.createElement('img')
    img.style.width = this.width + 'px'
    img.style.height = this.height + 'px'
    img.src = this.src[0]
    li.appendChild(img)
    this.inner.appendChild(li)
    this.outter.appendChild(this.inner)
    this.container.appendChild(this.outter)
    if (this.index) {
      this.imgs_index = document.createElement('ul')
      this.imgs_index.classList.add('scrool-imgs-index')
      for (var i = 0; i < this.num; i++) {
        var li = document.createElement('li')
        li.innerText = i + 1
        if (i===0) {
          li.classList.add('scroll-current')
        }
        this.imgs_index.appendChild(li)
      }
      this.container.appendChild(this.imgs_index)
    }
    document.body.appendChild(this.container)
    this.outter.scrollLeft = this.width
    this.autoMove()
}
Scroll.prototype.move = function () {
  var self = this,
      step = 0,
      maxstep = 20,
      pos = this.outter.scrollLeft,
      end = this.width * this.n,
      every = (end - pos ) / maxstep
    clearInterval(this.timer01)
    this.timer01 = setInterval(function(){
      step++
      if (step >= maxstep) {
        clearInterval(this.timer01)
        self.outter.scrollLeft = end
        step = 0
      }
      pos += every
      self.outter.scrollLeft = pos
    },10)
}
Scroll.prototype.autoMove = function () {
    var self = this
    clearInterval(this.timer02)
    this.timer02 = setInterval(function(){
      self.n++
      if (self.n > self.num) {
        self.n = 1
        self.outter.scrollLeft = 0
      }
      self.move(self.n)
      self.current()
    },2000)
    self.arrow()
    self.tap()
}
Scroll.prototype.arrow = function () {
    var self = this
    if (!this.left) {
      return
    }
    this.left.onclick = function(){
      clearInterval(self.timer01)
      clearInterval(self.timer02)
      self.n--
      if (self.n < 0) {
        self.n = self.num -1
        self.outter.scrollLeft = self.width * self.num
      }
      self.move(self.n)
      self.current()
      self.autoMove()
    }
    this.right.onclick = function(){
      clearInterval(self.timer01)
      clearInterval(self.timer02)
      self.n++
      if (self.n > self.num) {
        self.n = 1
        self.outter.scrollLeft = 0
      }
      self.move(self.n)
      self.current()
      self.autoMove()
    }
}
Scroll.prototype.tap = function () {
  var self = this
  if (!self.imgs_index) {
    return
  }
  var img_index = this.imgs_index.getElementsByTagName('li')
  for (var i = 0; i < self.num; i++) {
    img_index[i].onclick = function () {
      for (var i = 0; i < self.num; i++) {
        imgs_index[i].className = ''
        if (this === img_index[i]) {
          self.n = i + 1
          self.move(self.n)
          self.current()
          self.autoMove()
        }
      }
    }
  }
}

Scroll.prototype.current = function () {
    var self = this
    if (!this.imgs_index) {
      return
    }
    var img_index = this.imgs_index.getElementsByTagName('li')
    for (var i = 0; i < self.num; i++) {
      img_index[i].className = ''
    }
    if (self.n === 0) {
      img_index[self.num - 1].className = 'scroll-current'
    }else{
      img_index[self.n - 1].className = 'scroll-current'
    }
}
