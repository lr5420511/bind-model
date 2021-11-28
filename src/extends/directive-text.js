export default function directiveText(rt) {
    rt.directives['dir-text'] = (el, val, cur, prop, callback) => {
        el.textContent = callback(val, cur, prop);
    };
};