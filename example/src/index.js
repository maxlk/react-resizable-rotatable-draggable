import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import ResizableRect from "react-resizable-rotatable-draggable";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      width: 100,
      height: 30,
      top: 100,
      left: 100,
      rotateAngle: 0,
      ...props
    };
  }

  handleResize = ({ top, left, width, height }, isShiftKey, type) => {
    this.setState({
      top: top,
      left: left,
      width: width,
      height: height
    });
  };

  handleRotate = rotateAngle => {
    this.setState({ rotateAngle });
  };

  handleDrag = (deltaX, deltaY) => {
    this.setState({
      left: this.state.left + deltaX,
      top: this.state.top + deltaY
    });
  };

  handleRotateEnd = () => console.log("RotateEnd");

  handleRotateStart = () => console.log("RotateStart");

  render() {
    const { top, left, width, height, rotateAngle } = this.state;
    const { fixed = true } = this.props;
    return (
      <ResizableRect
        {...{
          top,
          left,
          width,
          height,
          rotateAngle,
          // aspectRatio: false,
          aspectRatio: fixed && width / height,
          minWidth: -Infinity,
          minHeight: -Infinity,
          zoomable: "n, w, s, e, nw, ne, se, sw",
          // rotatable: true,
          onRotateStart: this.handleRotateStart,
          onRotate: this.handleRotate,
          onRotateEnd: this.handleRotateEnd,
          // onResizeStart: this.handleResizeStart,
          onResize: this.handleResize,
          // onResizeEnd: this.handleUp,
          // onDragStart: this.handleDragStart,
          onDrag: this.handleDrag
          // onDragEnd: this.handleDragEnd,
        }}
      />
    );
  }
}

const SuperApp = () => (
  <div>
    <App width={20} height={20} top={200} left={170} />
    <App width={100} height={20} top={170} left={200} />
    <App width={100} height={20} top={200} left={200} />
    <App width={100} height={100} top={400} left={400} fixed={false} />
    <App width={20} height={20} top={570} left={600}/>
    <App width={20} height={100} top={600} left={600}/>
    <App width={20} height={100} top={600} left={630}/>
  </div>
)

const initExample = (rootElement = document.getElementById("root")) =>
  ReactDOM.render(<SuperApp />, rootElement);

export { initExample };
