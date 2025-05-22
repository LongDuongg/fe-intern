const { createElement: h } = require("react");

const { FComponent } = require("./f-component");

const Invoke = ({
  // @deprecated
  fn,
  action,
  props,
  onMounted,
  next,
}) => h(Invoke1, { action: action ?? fn, props, onMounted, next });
exports.Invoke = Invoke;

class Invoke1 extends FComponent {
  constructor(props, context) {
    super(props, context);

    props.action &&
      props.action({
        getLatestProps: () => this.props.props,
        isMounted: () => this.mounted,
      });

    if (props.onMounted) {
      console.log("[Quan warning] Invoke onMounted is deprecated");
      this.onMount(() => {
        setTimeout(() => {
          this.props.onMounted({
            getLatestProps: () => this.props.props,
            isMounted: () => this.mounted,
          });
        }, 0);
      });
    }
  }

  render() {
    const { next } = this.props;
    return next ? next() : null;
  }
}
exports.Invoke1 = Invoke1;
