import { cs } from "../../common/chain-services";
import { consumeContext } from "../../common/react/context";
import { Load } from "../../common/react/load";

export const TagPanel = ({ title, selectedTag }) =>
    cs(
        consumeContext("apis"),
        // prettier-ignore
        ["tags", ({ apis }, next) = Load({
            fetch: async () => await apis.tag.getTags(),
            next,
        })],
        ({ tags }) => (
            <div className="sidebar">
                <p>{title}</p>
                <div className="tag-list">
                    {tags?.tags.slice(0, 89).map((tag, i) => (
                        <div
                            style={{ cursor: "pointer" }}
                            key={i}
                            className="tag-pill tag-default"
                            onClick={() => {
                                selectedTag.onChange(tag);
                            }}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
        )
    );
