import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCount, updateHistory } from "../redux";

class NinjaGoldManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { name: "Farm", helpText: "Earns 2 - 5 Gold", button: "Farm!" },
        { name: "Cave", helpText: "Earns 5 - 10 Gold", button: "Cave!" },
        { name: "Casino", helpText: "Earn up to or Lose up to 100 Gold", button: "Casino!" },
        { name: "House", helpText: "Earns 7 - 15 Gold", button: "House!" }
      ]
    };
  }
  onClick = event => {
    let number;
    if (event.target.id === "Farm") {
      number = Math.floor(Math.random() * 4) + 2;
      let string = `Recieved ${number} Gold while at ${event.target.id}`;
      this.props.updateCount(number);
      this.props.updateHistory(string);
    } else if (event.target.id === "Cave") {
      number = Math.floor(Math.random() * 6) + 5;
      let string = `Recieved ${number} Gold while at ${event.target.id}`;
      this.props.updateCount(number);
      this.props.updateHistory(string);
    } else if (event.target.id === "House") {
      number = Math.floor(Math.random() * 9) + 7;
      let string = `Recieved ${number} Gold while at ${event.target.id}`;
      this.props.updateCount(number);
      this.props.updateHistory(string);
    } else if (event.target.id === "Casino") {
      this.props.enableRoulette();
    }

    console.log(number);
  };

  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "50px" }}>
          {this.state.options.map((option, index) => {
            return (
              <div style={{ display: "inline-block", width: "225px", height: "200px" }}>
                <h3>{option.name}</h3>
                <p style={{ height: "50px" }}>{option.helpText}</p>
                <button onClick={this.onClick} style={{ width: "200px" }} id={option.name} className="btn btn-primary">
                  {option.button}
                </button>
              </div>
            );
          })}
        </div>
        <div style={{ height: "400px", border: "1px solid black", overflowY: "scroll" }}>
          <ul className="list-group">
            {this.props.history.length > 0 &&
              this.props.history.map((item, index) => {
                return <li className="list-group-item ">{item}</li>;
              })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  history: state.history
});

const mapDispatchToProps = dispatch => ({
  updateCount: payload => dispatch(updateCount(payload)),
  updateHistory: payload => dispatch(updateHistory(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NinjaGoldManager);
