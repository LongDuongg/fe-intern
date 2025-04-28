import "./sample1.scss";
import Sample2 from "./sample2";

function Sample1() {
  return (
    <div className="sample-3as">
      <div className="label">Label 1</div>

      <div className="table">
        <div className="label">Label 2</div>
      </div>

      <Sample2 />
    </div>
  );
}

export default Sample1;
