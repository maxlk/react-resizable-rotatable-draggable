import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

const MAIN_MOUSE_BUTTON = 0

export class DraggableRect extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    styles: PropTypes.object,
    dragStartThreshold: PropTypes.number,
    dragStartTimeThreshold: PropTypes.number,
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func
  }

  setElementRef = (ref) => { this.$element = ref }

  // Drag
  startDrag = (e) => {
    if (e.button !== MAIN_MOUSE_BUTTON) return
    let { clientX: lastX, clientY: lastY } = e
    let startX = lastX
    let startY = lastY
    this._isMouseDown = true

    let dragStarted = false
    const { dragStartThreshold, dragStartTimeThreshold } = this.props
    const startDragTimer = setTimeout(() => {
      dragStarted = true
      startX = lastX
      startY = lastY
      this.props.onDragStart && this.props.onDragStart()
    }, dragStartTimeThreshold)

    const onMove = (e) => {
      if (!this._isMouseDown) return // patch: fix windows press win key during mouseup issue
      e.stopImmediatePropagation()
      const { clientX, clientY } = e
      const deltaX = clientX - startX
      const deltaY = clientY - startY
      lastX = clientX
      lastY = clientY

      if (!dragStarted) {
        if (
          Math.abs(deltaX) < dragStartThreshold &&
          Math.abs(deltaY) < dragStartThreshold
        ) {
          return
        }
        dragStarted = true
        clearTimeout(startDragTimer)
        this.props.onDragStart && this.props.onDragStart()
      }

      if (e.shiftKey) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          this.props.onDrag(deltaX, 0)
        } else {
          this.props.onDrag(0, deltaY)
        }
      } else {
        this.props.onDrag(deltaX, deltaY)
      }
    }
    const onUp = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      if (!this._isMouseDown) return
      this._isMouseDown = false
      if (!dragStarted) {
        clearTimeout(startDragTimer)
        return
      }
      this.props.onDragEnd && this.props.onDragEnd()
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  render () {
    const {
      children,
      className,
      styles: {
        position: { centerX, centerY },
        size: { width, height },
        transform: { rotateAngle }
      }
    } = this.props
    const style = {
      position: 'absolute',
      width: Math.abs(width),
      height: Math.abs(height),
      transform: `rotate(${rotateAngle}deg)`,
      left: centerX - Math.abs(width) / 2,
      top: centerY - Math.abs(height) / 2
    }

    return (
      <div
        ref={this.setElementRef}
        onMouseDown={this.startDrag}
        className={`rect single-resizer ${className}`}
        style={style}
      >
        {children}
      </div>
    )
  }
}
