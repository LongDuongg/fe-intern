const cx1 = (...params) => {
    return params.map((p) => {
        if (p == null) {
            return null;
        } else if (typeof p === "string") {
            return p;
        } else if (typeof p === "boolean") {
            return null;
        } else if (typeof p === "object") {
            return Object.keys(p).filter((k) => p[k]).join(" ");
        } else {
            throw "5t43543 " + p;
        }
    }).filter(v=>v).join(" ");
};
exports.cx1 = cx1;
