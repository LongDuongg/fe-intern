import { ARTICLES_PER_PAGE } from "../routes/home/article-preview-list";

const API_HOST = "https://conduit-realworld-example-app.fly.dev";

export const createApis = ({ onUnauthen, token }) => {
    const fetcher = createFetcher({ onUnauthen, token });
    return {
        user: {
            // prettier-ignore
            updateUser: async ({ image, username, bio, email, password }) => await fetcher.put("/user", {
                user: {
                    image,
                    username,
                    bio,
                    email,
                    password,
                },
            }),
        },

        profile: {
            getProfile: async ({ username }) => fetcher.get(`/profiles/${username}`),

            followUser: async ({ username }) => fetcher.post(`/profiles/${username}/follow`),

            unfollowUser: async ({ username }) => fetcher.delete(`/profiles/${username}/follow`),
        },

        article: {
            getGlobalFeed: ({ page, limit = ARTICLES_PER_PAGE }) =>
                fetcher.get(`/articles?limit=${limit}&offset=${page}`),

            getFeedByTag: ({ tag, page, limit = ARTICLES_PER_PAGE }) =>
                fetcher.get(`/articles?tag=${tag}&limit=${limit}&offset=${page}`),

            getMyFeed: async ({ username, page, limit = ARTICLES_PER_PAGE }) =>
                fetcher.get(`/articles?author=${username}&limit=${limit}&offset=${page}`),

            getSingleArticle: async ({ slug }) => fetcher.get(`/articles/${slug}`),

            createArticle: async ({ title, description, body, tagList }) =>
                fetcher.post("/articles", {
                    article: {
                        title,
                        description,
                        body,
                        tagList,
                    },
                }),

            // prettier-ignore
            updateArticle: async ({ slug, title, description, body, tagList }) =>
                fetcher.put(`/articles/${slug}`, {
                    article: {
                        slug,
                        title,
                        description,
                        body,
                        tagList,
                    }
                }
            ),

            deleteArticle: async ({ slug }) => fetcher.delete(`/articles/${slug}`),

            likeArticle: async ({ slug }) => fetcher.post(`/articles/${slug}/favorite`),

            unlikeArticle: async ({ slug }) => fetcher.delete(`/articles/${slug}/favorite`),

            getComments: async ({ slug }) => fetcher.get(`/articles/${slug}/comments`),

            commentArticle: async ({ slug, body }) =>
                fetcher.post(`/articles/${slug}/comments`, {
                    comment: { body },
                }),

            deleteComment: async ({ slug, id }) =>
                fetcher.delete(`/articles/${slug}/comments/${id}`),
        },

        tag: {
            getTags: async () => fetcher.get("/tags"),
        },
    };
};

const createFetcher = ({ onUnauthen, token }) => {
    const makeRequest = (method) => {
        return async (url, payload) => {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            if (token) {
                headers.append("Authorization", `Token ${token}`);
            }

            const res = await fetch(`${API_HOST}/api${url}`, {
                method,
                headers,
                body: payload ? JSON.stringify(payload) : null,
            });

            const data = await res.json();

            if (res.status === 401) {
                console.log(data);
                onUnauthen?.(data.errors.body[0]);
            }
            return data;
        };
    };
    return {
        get: makeRequest("GET"),
        post: makeRequest("POST"),
        put: makeRequest("PUT"),
        delete: makeRequest("DELETE"),
    };
};
