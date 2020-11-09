import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { DraggableRect } from './Rect/draggable-rect'
import { tLToCenter } from './utils'

export class Draggable extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    rotateAngle: PropTypes.number,
    dragStartThreshold: PropTypes.number,
    dragStartTimeThreshold: PropTypes.number,
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func
  }

  static defaultProps = {
    className: '',
    rotateAngle: 0,
    dragStartThreshold: 3,
    dragStartTimeThreshold: 1000
  }

  handleDrag = (deltaX, deltaY) => {
    this.props.onDrag && this.props.onDrag(deltaX, deltaY)
  }

  render () {
    const {
      children, className, top, left, width, height, rotateAngle, dragStartThreshold, dragStartTimeThreshold,
      onDragStart, onDragEnd
    } = this.props

    const styles = tLToCenter({ top, left, width, height, rotateAngle })

    return (
      <DraggableRect
        children={children}
        className={className}
        styles={styles}
        dragStartThreshold={dragStartThreshold}
        dragStartTimeThreshold={dragStartTimeThreshold}

        onDragStart={onDragStart}
        onDrag={this.handleDrag}
        onDragEnd={onDragEnd}
      />
    )
  }
}
