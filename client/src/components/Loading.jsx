import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animate } from "react-move";
import "./loading.css";

export default class Robot1 extends Component {
  static propTypes = {
    name: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      eyeScale: 1,
      bodyY: 0,
      leg1Y: 0,
      leg2Y: -20,
      headRotation: 0,
      headDirection: 1,
      steamOpacity: 0,
    };
  }

  jump(prevState) {
    return { bodyY: Math.random() * 10 - 10 };
  }

  walk(prevState) {
    const length = 5;
    return {
      leg1Y: prevState.leg1Y === 0 ? -length : 0,
      leg2Y: prevState.leg2Y === -length ? 0 : -length,
    };
  }

  rotateHead(prevState) {
    const max = 10;
    return {
      headDirection: -prevState.headDirection,
      headRotation: max * prevState.headDirection,
    };
  }

  steam(prevState) {
    return {
      steamOpacity: prevState.steamOpacity === 0 ? 1.0 : 0,
    };
  }

  blink(prevState) {
    return {
      eyeScale: prevState.eyeScale ? 0 : 1,
    };
  }

  componentDidMount() {
    //Use React Move to animate the body
    setInterval(() => {
      this.setState(this.jump);
    }, 100);

    setInterval(() => {
      this.setState(this.walk);
    }, 200);

    setInterval(() => {
      this.setState(this.rotateHead);
      this.setState(this.steam);
    }, 1000);

    setInterval(() => {
      this.setState(this.blink);
    }, 900);
  }

  render() {
    return (
      <div className="loading__svg">
        
          HELLO
      </div>
    );
  }
}

const animateBody = () => {

};
