import { cs } from "../../common/chain-services";
import { cx1 } from "../../common/cx1";
import { keyed } from "../../common/react/keyed";

export const Tabs = ({ tabs, onChange, isActive }) => {
    return cs(({}) => {
        const activeTab = tabs.find((tab, i) => isActive(tab, i));

        return (
            <>
                <div className="feed-toggle">
                    {TabHeader({
                        isActive,
                        tabs,
                        onChange,
                    })}
                </div>

                {cs(keyed(activeTab.key), () => activeTab.render())}
                {/* <Fragment key={activeTab.key}>{activeTab.render()}</Fragment> */}
            </>
        );
    });
};

const TabHeader = ({ isActive, tabs, onChange }) => {
    return cs(() => {
        const renderItem = (tab, i) => {
            return (
                <div
                    style={{ cursor: "pointer" }}
                    className={cx1("nav-link", {
                        active: isActive(tab, i),
                    })}
                    onClick={() => {
                        onChange?.(i);
                    }}
                >
                    {tab.label}
                </div>
            );
        };
        return (
            <ul className="nav nav-pills outline-active">
                {tabs.map((tab, i) => {
                    return (
                        <li key={i} className="nav-item">
                            {tab.renderLabel
                                ? tab.renderLabel(renderItem(tab, i))
                                : renderItem(tab, i)}
                        </li>
                    );
                })}
            </ul>
        );
    });
};
