export default function directiveModel(rt) {
    let hook;
    rt.directives['dir-model'] = (el, val, cur, prop) => {
        el.value = val;
        if(hook) return;
        el.addEventListener('input', (hook = ev => (cur[prop] = ev.target.value)));
    };
};