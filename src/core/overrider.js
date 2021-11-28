const Overrider = function(model) {
    const valid = model instanceof Object;
    if(!valid) throw new TypeError('model is invalid.');
    this.combos = {};
    this.host = (function rebuild(cur, path) {
        return Object.keys(cur).reduce((res, prop) => {
            const full = `${path}${isNaN(prop) ? `${'.'.repeat(!!path)}${prop}` : `[${prop}]`}`;
            let value = res[prop];
            Object.defineProperty(res, prop, {
                get: () => value,
                set: val => {
                    const temp = value;
                    value = val;
                    temp !== val && (this.combos[full] || []).every(hook =>
                        !hook(val, temp, prop, res, full)    
                    );
                }
            });
            (value instanceof Object) && rebuild.call(this, value, full);
            return res;
        }, cur);
    }).call(this, model, '');
};

Overrider.prototype = {
    constructor: Overrider,
    bind: function(path, el, directive, callback) {
        const keys = path.match(/[^\n\.\[\]]+/g);
        if(!keys) throw new Error('path is invalid.');
        const hooks = this.combos[path] = this.combos[path] || [],
            n = hooks.push((val, _, prop, cur) =>
                Overrider.preset.directives[directive](el, val, cur, prop, callback)
            ),
            last = keys.pop(),
            level = keys.reduce((res, key) => res[key], this.host);
        hooks[n - 1](level[last], null, last, level, path);
        return this;
    },
    watch: function(path, callback) {
        const hooks = this.combos[path] = this.combos[path] || [];
        return hooks.push(callback) && this;
    }
};

Overrider.install = plugin => {
    const plugins = Overrider.plugins = Overrider.plugins || [];
    return (plugin(Overrider.preset) || 1) && plugins.push(plugin) && Overrider;
};

Overrider.preset = { directives: {} };

export default Overrider;