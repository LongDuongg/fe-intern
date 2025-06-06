import { cs } from "../../common/chain-services";
import { cx1 } from "../../common/cx1";
import { keyed } from "../../common/react/keyed";
import { State } from "../../common/react/state";
import { Fragment } from "react";

export const Tabs = ({ tabs, initActive = 0, onChangeTab }) => {
    return cs(
        [
            "forcedIndex",
            ({}, next) => {
                const forcedIndex = tabs.findIndex((tab) => tab.forced);
                return next(forcedIndex > -1 ? forcedIndex : null);
            },
        ],
        [
            "active",
            ({ forcedIndex }, next) => State({ initValue: forcedIndex || initActive, next }),
        ],

        ({ active, forcedIndex }) => {
            const activeIndex = forcedIndex || active.value;
            const activeTab = tabs[activeIndex];

            return (
                <>
                    <div className="feed-toggle">
                        {TabHeader({
                            isActive: (index) => activeIndex === index,
                            tabs,
                            onChange: (i) => {
                                if (forcedIndex && i === forcedIndex) {
                                    return;
                                }
                                active.onChange(i);
                                onChangeTab();
                            },
                        })}
                    </div>

                    {cs(keyed(activeTab.key), () => activeTab.render())}
                    {/* <Fragment key={activeTab.key}>{activeTab.render()}</Fragment> */}
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
