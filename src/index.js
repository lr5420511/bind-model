import 'babel-polyfill';

import ModelOverrider from './core/overrider';
import DirectiveBind from './extends/directive-bind';
import DirectiveIf from './extends/directive-if';
import DirectiveModel from './extends/directive-model';
import DirectiveShow from './extends/directive-show';
import DirectiveText from './extends/directive-text';

window.ModelOverrider = ModelOverrider.install(DirectiveBind)
    .install(DirectiveIf)
    .install(DirectiveModel)
    .install(DirectiveShow)
    .install(DirectiveText);