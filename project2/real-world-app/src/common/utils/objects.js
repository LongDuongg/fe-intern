const omit = (obj, attrs) => {
    if (obj == null) {
        return null;
    }

    const ret = {};
    for (const k in obj) {
        if (!~attrs.indexOf(k)) {
            ret[k] = obj[k];
        }
    }
    return ret;
};
exports.omit = omit;
