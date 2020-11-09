import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { DraggableRect } from './Rect/draggable-rect'
import { tLToCenter } from './utils'

export class Draggable extends Component {
  static propTypes = {
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    rotateAngle: PropTypes.number,
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func
  }

  static defaultProps = {
    rotateAngle: 0
  }

  handleDrag = (deltaX, deltaY) => {
    this.props.onDrag && this.props.onDrag(deltaX, deltaY)
  }

  render () {
    const {
      top, left, width, height, rotateAngle,
      onDragStart, onDragEnd
    } = this.props

    const styles = tLToCenter({ top, left, width, height, rotateAngle })

    return (
      <DraggableRect
        styles={styles}

        onDragStart={onDragStart}
        onDrag={this.handleDrag}
        onDragEnd={onDragEnd}
      />
    )
  }
}
