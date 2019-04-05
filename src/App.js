import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import "./App.css";
import Roulette from "./component/Roulette";
import NinjaGoldManager from "./containers/NinjaGoldManager";
import { updateCount, updateHistory } from "./redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roulette: false
    };

    this.socket = io("http://localhost:1337");
  }

  componentDidMount() {
    this.socket.on("greeting", data => {
      //4
      console.log("CLIENT > socket.on greeting");
      console.log(data.msg); //5
      this.socket.emit("thankyou", { msg: "Thank you for connecting me! -Client" });
    });
  }

  saveWin = value => {
    let number = parseInt(value);
    let string = `Recieved ${number} Gold while at Casino`;
    this.setState({ roulette: false }, () => {
      this.props.updateCount(number);
      this.props.updateHistory(string);
    });
  };

  enableRoulette = () => {
    this.setState({ roulette: true });
  };
  render() {
    return (
      <div>
        <h1>Gold Count: {this.props.count} </h1>
        <NinjaGoldManager enableRoulette={this.enableRoulette} />
        {this.state.roulette && <Roulette saveWin={this.saveWin} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  count: state.count
});

const mapDispatchToProps = dispatch => ({
  updateCount: payload => dispatch(updateCount(payload)),
  updateHistory: payload => dispatch(updateHistory(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
