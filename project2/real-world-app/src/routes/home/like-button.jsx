import { cs } from "../../common/chain-services";
import { consumeContext } from "../../common/react/context";
import { State } from "../../common/react/state";

export const LikeButton = ({ article, onChange }) => {
  return cs(
    consumeContext("apis"),
    ["isLoading", ({}, next) => State({ next })],
    ({ apis, isLoading }) => {
      return (
        <button
          className="btn btn-outline-primary btn-sm pull-xs-right"
          style={
            article.favorited
              ? { backgroundColor: "green", color: "white" }
              : { backgroundColor: "white", color: "green" }
          }
          disabled={isLoading.value}
          onClick={async () => {
            isLoading.onChange(true);
            let res;

            if (article.favorited) {
              res = await apis.article.unlikeArticle({
                slug: article.slug,
              });
            } else {
              res = await apis.article.likeArticle({
                slug: article.slug,
              });
            }

            if (res.errors) {
              // Handle error case
            } else {
              onChange(res.article);
            }

            isLoading.onChange(false);
          }}
        >
          <i className="ion-heart"></i> {article.favoritesCount}
        </button>
      );
    }
  );
};
