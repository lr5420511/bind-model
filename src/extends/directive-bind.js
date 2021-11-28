export default function directiveBind(rt) {
    rt.directives['dir-bind'] = (el, val, cur, prop, callback) => {
        callback(el, val, cur, prop);
    };
};