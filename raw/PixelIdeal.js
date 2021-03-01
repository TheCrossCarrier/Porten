class PixelIdeal {
  constructor(imagePath) {
    this.imagePath = imagePath

    const
      visibility
        = window.sessionStorage.getItem('PixelIdealVisibility') == 'true'
          ? true : false,
      opacity = window.sessionStorage.getItem('PixelIdealOpacity') ?? 0.5

    this.createControls(visibility, opacity)

    this.createLayer(visibility)
    this.setOpacity(opacity)
  }

  createControls(visibilityDefault, opacityDefault) {
    this.controls = document.createElement('div')

    this.setDOMProps(this.controls.style, {
      position: 'fixed',
      zIndex: '999999',
      bottom: '10px',
      right: '20px'
    })

    this.controlVisible = document.createElement('input')

    this.setDOMProps(this.controlVisible, {
      type: 'checkbox',
      checked: visibilityDefault,
      oninput: () => this.toggleVisibility()
    })
    this.controlVisible.style.marginRight = '10px'

    this.controlOpacity = document.createElement('input')

    this.setDOMProps(this.controlOpacity, {
      type: 'range',
      min: '0',
      max: '1',
      step: '0.01',
      value: `${opacityDefault}`,
      oninput: () => this.setOpacity(this.controlOpacity.value)
    })

    this.controls.insertAdjacentElement('afterbegin', this.controlVisible)
    this.controls.insertAdjacentElement('beforeend', this.controlOpacity)
    document.body.insertAdjacentElement('beforeend', this.controls)
  }

  createLayer(visibilityDefault) {
    this.layer = document.createElement('div')

    this.layer.id = 'pixelideal'

    this.setDOMProps(this.layer.style, {
      position: 'absolute',
      zIndex: '999998',
      top: '0',
      display: visibilityDefault ? 'block' : 'none',
      width: document.body.clientWidth + 'px',
      height: document.body.clientHeight + 'px',
      backgroundImage: `url('${this.imagePath}')`,
      backgroundPositionX: '50%',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    })

    document.body.insertAdjacentElement('beforeend', this.layer)
  }

  setOpacity(opacity) {
    this.layer.style.opacity = `${opacity}`
    window.sessionStorage.PixelIdealOpacity = opacity
  }

  toggleVisibility() {
    const isChecked = this.controlVisible.checked
    this.layer.style.display = isChecked ? 'block' : 'none'
    window.sessionStorage.PixelIdealVisibility = isChecked
  }

  setDOMProps(element, props) {
    Object.keys(props).forEach(key => element[key] = props[key])
  }

}