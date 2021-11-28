export default function directiveIf(rt) {
    let parent;
    rt.directives['dir-if'] = (el, val) => {
        parent = parent || el.parentElement;
        (val ? el.appendChild : el.removeChild).call(parent, el);
    };
};