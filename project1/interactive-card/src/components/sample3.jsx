import { useState } from "react";
import { cs } from "../common/chain-services.js";
import { State } from "../common/react/state.js";

function ModalToggle({ render }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return render({ isOpen, toggle });
}

function Sample3() {
  return (
    <ModalToggle
      render={({ isOpen, toggle }) => (
        <>
          <button onClick={toggle}>
            {isOpen ? "Close Modal" : "Open Modal"}
          </button>
          {isOpen && (
            <div className="modal">
              <p>This is a modal!</p>
              <button onClick={toggle}>Close</button>
            </div>
          )}
        </>
      )}
    />
  );
}
exports.Sample3 = Sample3;

function ModalToggleCs({ next: rootNext }) {
  return cs(
    ["open", ({}, next) => State({ initValue: false, next })],
    ({ open }) => {
      return rootNext({
        isOpen: open.value,
        toggle: () => {
          open.change((v) => !v);
        },
      });
    }
  );
}

// function Sample3Cs() {
//   return cs(["modal", ({}, next) => ModalToggleCs({ next })], ({ modal }) => (
//     <>
//       <button onClick={modal.toggle}>
//         {modal.isOpen ? "Close Modal" : "Open Modal"}
//       </button>
//       {modal.isOpen && (
//         <div className="modal">
//           <p>This is a modal!</p>
//           <button onClick={modal.toggle}>Close</button>
//         </div>
//       )}
//     </>
//   ));
// }
// exports.Sample3Cs = Sample3Cs;

const SampleCounter = () => {
  return cs(
    [
      "aaa",
      ({}, next) => (
        <div>
          <div>
            I am Foo
            {next("Foo")}
          </div>
          <div>
            I am Bar
            {next("Bar")}
          </div>
        </div>
      ),
    ],
    ({ aaa }) => <div>Hello {aaa}</div>
  );
};

exports.SampleCounter = SampleCounter;
