const { Component, createElement: h } = require("react");

const State = ({ next, getInitValue, initValue }) =>
  h(State1, { next, getInitValue, initValue });
exports.State = State;

class State1 extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: props.getInitValue ? props.getInitValue() : props.initValue,
    };
  }
  componentWillUnmount() {
    this.unmounted = Date.now();
  }

  setState(state, callback) {
    if (!this.unmounted) {
      super.setState(state, callback);
    }

    // if (!this.unmounted || Date.now() - this.unmounted > 3000) {
    //     super.setState(state, callback);
    // } else {
    //     console.log("[WARNING] Set state when unmounted");
    // }
  }

  render() {
    // console.log(this.props.name);
    const { next } = this.props;
    const { value } = this.state;

    return (
      next?.({
        value,
        onChange: (value1, cb) => {
          this.setState({ value: value1 }, cb);
        },
        change: (reduceValue, cb) => {
          this.setState(
            (state) => ({
              ...state,
              value: reduceValue(state.value),
            }),
            cb
          );
        },
      }) ?? null
    );
  }
}
