import { cs } from "../../common/chain-services";
import { cx1 } from "../../common/cx1";
import { State } from "../../common/react/state";

export const Tabs = ({ tabs, initActive = 0 }) => {
  return cs(
    ["active", ({}, next) => State({ initValue: initActive, next })],
    ({ active }) => {
      const activeTab = tabs[active.value];
      console.log(activeTab);
      console.log(active.value);
      return (
        <>
          <div className="feed-toggle">
            {TabHeader({
              isActive: (index) => active.value === index,
              tabs,
              onChange: active.onChange,
            })}
          </div>

          {activeTab.render()}
        </>
      );
    }
  );
};

export const TabHeader = ({ isActive, tabs, onChange }) => {
  return cs(() => {
    return (
      <ul className="nav nav-pills outline-active">
        {tabs.map((tab, i) => {
          return (
            <li key={i} className="nav-item">
              <div
                style={{ cursor: "pointer" }}
                className={cx1("nav-link", {
                  active: isActive(i),
                })}
                onClick={() => {
                  onChange(i);
                }}
              >
                {tab.label}
              </div>
            </li>
          );
        })}
      </ul>
    );
  });
};
