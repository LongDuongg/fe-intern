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

function equalDeep(o1, o2) {
    if (o1 === o2) {
        return true;
    }

    if (o1 == null && o2 == null) {
        return false;
    }

    if (o1 == null || o2 == null) {
        return false;
    }

    if (typeof o1 === "object" && typeof o2 === "object") {
        for (const k in o1) {
            if (!equalDeep(o1[k], o2[k])) {
                return false;
            }
        }
        for (const k in o2) {
            if (o1[k] === undefined && o2[k] !== undefined) {
                return false;
            }
        }
        return true;
    }

    return false;
}
exports.equalDeep = equalDeep;

const keepOnly = (o, attrs) => {
    if (o == null) {
        return o;
    }
    const ret = {};
    for (const attr of attrs) {
        if (o.hasOwnProperty(attr)) {
            ret[attr] = o[attr];
        }
    }
    // for (const k in o) {
    //     if (attrs.indexOf(k) > -1) {
    //         ret[k] = o[k];
    //     }
    // }
    return ret;
};

exports.keepOnly = keepOnly;
