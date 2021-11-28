export default function directiveShow(rt) {
    rt.directives['dir-show'] = (el, val) => {
        el.style.visibility = val ? 'visible' : 'hidden';
    };
};