import { cs } from "../../common/chain-services";
import { keyed } from "../../common/react/keyed";
import { cx1 } from "../../common/cx1";

export const Pagination = ({ currentPage, onChange }) => {
  return cs(() => {
    return (
      <ul className="pagination">
        {pages.map((p) =>
          cs(keyed(p), () => (
            <li
              {...{
                className: cx1("page-item", {
                  active: p === currentPage,
                }),

                onClick: () => {
                  onChange(p);
                },
              }}
            >
              <a className="page-link" style={{ cursor: "pointer" }}>
                {p}
              </a>
            </li>
          ))
        )}
      </ul>
    );
  });
};

const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
