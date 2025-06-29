import { cs } from "../../common/chain-services";
import { cx1 } from "../../common/cx1";
import { consumeContext } from "../../common/react/context";
import { State } from "../../common/react/state";

export const LikeButton = ({ label = "", className = "", article, onChange }) => {
    return cs(
        consumeContext("apis"),
        ["isLoading", ({}, next) => State({ next })],
        ({ apis, isLoading }) => {
            return (
                <button
                    className={cx1("btn btn-sm btn-outline-primary", className)}
                    style={
                        article?.favorited
                            ? { backgroundColor: "green", color: "white" }
                            : { backgroundColor: "white", color: "green" }
                    }
                    disabled={isLoading.value}
                    onClick={async () => {
                        isLoading.onChange(true);
                        let res;

                        if (article?.favorited) {
                            res = await apis.article.unlikeArticle({
                                slug: article?.slug,
                            });
                        } else {
                            res = await apis.article.likeArticle({
                                slug: article?.slug,
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
                    <i className="ion-heart"></i> {label} {article?.favoritesCount}
                </button>
            );
        }
    );
};
