import { NavLink } from "react-router-dom";

import { cs } from "../../common/chain-services";
import { Load } from "../../common/react/load";
import { consumeContext } from "../../common/react/context";

export const Tags = () => {
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
      return tags?.tags.map((tag, i) => (
        <NavLink key={i} to="" className="tag-pill tag-default">
          {tag}
        </NavLink>
      ));
    }
  );
};
