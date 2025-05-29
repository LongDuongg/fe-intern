import { NavLink } from "react-router-dom";

import { cs } from "../../common/chain-services";
import { Load } from "../../common/react/load";
import { consumeContext } from "../../common/react/context";

export const TagPanel = ({ title, selectedTag }) => {
  return cs(
    consumeContext("apis"),
    [
      "tags",
      ({ apis }, next) =>
        Load({
          fetch: async () => await apis.tag.getTags(),
          next,
        }),
    ],
    ({ tags }) => {
      return (
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
      );
    }
  );
};
