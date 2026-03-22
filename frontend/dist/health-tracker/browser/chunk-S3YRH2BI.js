import{a as ve,b as Wt,c as H,d as x,e as g,f as Me}from"./chunk-5Y44FW4A.js";import{$ as z,$a as pe,Ab as et,Ac as Gt,Ba as F,Bb as R,Ca as O,Da as y,Ea as L,Fa as p,Fb as b,Fc as xe,Ga as k,Gb as fe,I as Pt,Ia as ue,Ib as h,J as E,Jb as ge,Jc as Ee,K as B,La as A,Lb as Ht,M as w,Mc as Et,O as l,Qa as c,Qb as be,Ra as it,Sa as rt,Sb as wt,Ta as tt,Tb as me,Ua as Ot,Ub as xt,V as Ct,Va as Rt,Vb as X,Wa as jt,Xa as st,Y as se,Ya as at,Za as ce,Zb as gt,Zc as Vt,_c as Y,a as P,aa as ae,ab as lt,b as U,bb as V,bd as Ve,cb as W,cc as Ut,db as q,dc as ct,ea as G,eb as Dt,ec as ye,ed as S,fa as J,fc as _e,g as ne,ga as le,gb as Q,ha as u,hb as Z,j as oe,ja as ft,jb as he,kb as zt,lc as Ce,mb as v,na as de,nb as dt,o as ie,ob as ut,ra as f,u as re,ub as C,vc as $t,wa as Bt,xa as I,xb as Lt,xc as De,yc as we}from"./chunk-HMRRNVRQ.js";var Pe=(()=>{class e{_renderer;_elementRef;onChange=t=>{};onTouched=()=>{};constructor(t,n){this._renderer=t,this._elementRef=n}setProperty(t,n){this._renderer.setProperty(this._elementRef.nativeElement,t,n)}registerOnTouched(t){this.onTouched=t}registerOnChange(t){this.onChange=t}setDisabledState(t){this.setProperty("disabled",t)}static \u0275fac=function(n){return new(n||e)(I(Bt),I(ft))};static \u0275dir=y({type:e})}return e})(),Cn=(()=>{class e extends Pe{static \u0275fac=(()=>{let t;return function(i){return(t||(t=u(e)))(i||e)}})();static \u0275dir=y({type:e,features:[p]})}return e})(),Be=new w("");var Dn={provide:Be,useExisting:Pt(()=>Oe),multi:!0};function wn(){let e=Ht()?Ht().getUserAgent():"";return/android (\d+)/.test(e.toLowerCase())}var xn=new w(""),Oe=(()=>{class e extends Pe{_compositionMode;_composing=!1;constructor(t,n,i){super(t,n),this._compositionMode=i,this._compositionMode==null&&(this._compositionMode=!wn())}writeValue(t){let n=t??"";this.setProperty("value",n)}_handleInput(t){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(t)}_compositionStart(){this._composing=!0}_compositionEnd(t){this._composing=!1,this._compositionMode&&this.onChange(t)}static \u0275fac=function(n){return new(n||e)(I(Bt),I(ft),I(xn,8))};static \u0275dir=y({type:e,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(n,i){n&1&&lt("input",function(s){return i._handleInput(s.target.value)})("blur",function(){return i.onTouched()})("compositionstart",function(){return i._compositionStart()})("compositionend",function(s){return i._compositionEnd(s.target.value)})},standalone:!1,features:[C([Dn]),p]})}return e})();var En=new w(""),Vn=new w("");function Re(e){return e!=null}function je(e){return ue(e)?oe(e):e}function ze(e){let o={};return e.forEach(t=>{o=t!=null?P(P({},o),t):o}),Object.keys(o).length===0?null:o}function Le(e,o){return o.map(t=>t(e))}function Mn(e){return!e.validate}function He(e){return e.map(o=>Mn(o)?o:t=>o.validate(t))}function Sn(e){if(!e)return null;let o=e.filter(Re);return o.length==0?null:function(t){return ze(Le(t,o))}}function Ue(e){return e!=null?Sn(He(e)):null}function In(e){if(!e)return null;let o=e.filter(Re);return o.length==0?null:function(t){let n=Le(t,o).map(je);return re(n).pipe(ie(ze))}}function $e(e){return e!=null?In(He(e)):null}function Se(e,o){return e===null?[o]:Array.isArray(e)?[...e,o]:[e,o]}function An(e){return e._rawValidators}function Fn(e){return e._rawAsyncValidators}function qt(e){return e?Array.isArray(e)?e:[e]:[]}function St(e,o){return Array.isArray(e)?e.includes(o):e===o}function Ie(e,o){let t=qt(o);return qt(e).forEach(i=>{St(t,i)||t.push(i)}),t}function Ae(e,o){return qt(o).filter(t=>!St(e,t))}var It=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(o){this._rawValidators=o||[],this._composedValidatorFn=Ue(this._rawValidators)}_setAsyncValidators(o){this._rawAsyncValidators=o||[],this._composedAsyncValidatorFn=$e(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(o){this._onDestroyCallbacks.push(o)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(o=>o()),this._onDestroyCallbacks=[]}reset(o=void 0){this.control?.reset(o)}hasError(o,t){return this.control?this.control.hasError(o,t):!1}getError(o,t){return this.control?this.control.getError(o,t):null}},Qt=class extends It{name;get formDirective(){return null}get path(){return null}},nt=class extends It{_parent=null;name=null;valueAccessor=null},Zt=class{_cd;constructor(o){this._cd=o}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var ai=(()=>{class e extends Zt{constructor(t){super(t)}static \u0275fac=function(n){return new(n||e)(I(nt,2))};static \u0275dir=y({type:e,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(n,i){n&2&&zt("ng-untouched",i.isUntouched)("ng-touched",i.isTouched)("ng-pristine",i.isPristine)("ng-dirty",i.isDirty)("ng-valid",i.isValid)("ng-invalid",i.isInvalid)("ng-pending",i.isPending)},standalone:!1,features:[p]})}return e})();var bt="VALID",Mt="INVALID",pt="PENDING",mt="DISABLED",ot=class{},At=class extends ot{value;source;constructor(o,t){super(),this.value=o,this.source=t}},vt=class extends ot{pristine;source;constructor(o,t){super(),this.pristine=o,this.source=t}},yt=class extends ot{touched;source;constructor(o,t){super(),this.touched=o,this.source=t}},ht=class extends ot{status;source;constructor(o,t){super(),this.status=o,this.source=t}};var Xt=class extends ot{source;constructor(o){super(),this.source=o}};function kn(e){return(Ft(e)?e.validators:e)||null}function Tn(e){return Array.isArray(e)?Ue(e):e||null}function Nn(e,o){return(Ft(o)?o.asyncValidators:e)||null}function Pn(e){return Array.isArray(e)?$e(e):e||null}function Ft(e){return e!=null&&!Array.isArray(e)&&typeof e=="object"}var Yt=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(o,t){this._assignValidators(o),this._assignAsyncValidators(t)}get validator(){return this._composedValidatorFn}set validator(o){this._rawValidators=this._composedValidatorFn=o}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(o){this._rawAsyncValidators=this._composedAsyncValidatorFn=o}get parent(){return this._parent}get status(){return et(this.statusReactive)}set status(o){et(()=>this.statusReactive.set(o))}_status=R(()=>this.statusReactive());statusReactive=G(void 0);get valid(){return this.status===bt}get invalid(){return this.status===Mt}get pending(){return this.status==pt}get disabled(){return this.status===mt}get enabled(){return this.status!==mt}errors;get pristine(){return et(this.pristineReactive)}set pristine(o){et(()=>this.pristineReactive.set(o))}_pristine=R(()=>this.pristineReactive());pristineReactive=G(!0);get dirty(){return!this.pristine}get touched(){return et(this.touchedReactive)}set touched(o){et(()=>this.touchedReactive.set(o))}_touched=R(()=>this.touchedReactive());touchedReactive=G(!1);get untouched(){return!this.touched}_events=new ne;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(o){this._assignValidators(o)}setAsyncValidators(o){this._assignAsyncValidators(o)}addValidators(o){this.setValidators(Ie(o,this._rawValidators))}addAsyncValidators(o){this.setAsyncValidators(Ie(o,this._rawAsyncValidators))}removeValidators(o){this.setValidators(Ae(o,this._rawValidators))}removeAsyncValidators(o){this.setAsyncValidators(Ae(o,this._rawAsyncValidators))}hasValidator(o){return St(this._rawValidators,o)}hasAsyncValidator(o){return St(this._rawAsyncValidators,o)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(o={}){let t=this.touched===!1;this.touched=!0;let n=o.sourceControl??this;o.onlySelf||this._parent?.markAsTouched(U(P({},o),{sourceControl:n})),t&&o.emitEvent!==!1&&this._events.next(new yt(!0,n))}markAllAsDirty(o={}){this.markAsDirty({onlySelf:!0,emitEvent:o.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsDirty(o))}markAllAsTouched(o={}){this.markAsTouched({onlySelf:!0,emitEvent:o.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsTouched(o))}markAsUntouched(o={}){let t=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let n=o.sourceControl??this;this._forEachChild(i=>{i.markAsUntouched({onlySelf:!0,emitEvent:o.emitEvent,sourceControl:n})}),o.onlySelf||this._parent?._updateTouched(o,n),t&&o.emitEvent!==!1&&this._events.next(new yt(!1,n))}markAsDirty(o={}){let t=this.pristine===!0;this.pristine=!1;let n=o.sourceControl??this;o.onlySelf||this._parent?.markAsDirty(U(P({},o),{sourceControl:n})),t&&o.emitEvent!==!1&&this._events.next(new vt(!1,n))}markAsPristine(o={}){let t=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let n=o.sourceControl??this;this._forEachChild(i=>{i.markAsPristine({onlySelf:!0,emitEvent:o.emitEvent})}),o.onlySelf||this._parent?._updatePristine(o,n),t&&o.emitEvent!==!1&&this._events.next(new vt(!0,n))}markAsPending(o={}){this.status=pt;let t=o.sourceControl??this;o.emitEvent!==!1&&(this._events.next(new ht(this.status,t)),this.statusChanges.emit(this.status)),o.onlySelf||this._parent?.markAsPending(U(P({},o),{sourceControl:t}))}disable(o={}){let t=this._parentMarkedDirty(o.onlySelf);this.status=mt,this.errors=null,this._forEachChild(i=>{i.disable(U(P({},o),{onlySelf:!0}))}),this._updateValue();let n=o.sourceControl??this;o.emitEvent!==!1&&(this._events.next(new At(this.value,n)),this._events.next(new ht(this.status,n)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(U(P({},o),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(i=>i(!0))}enable(o={}){let t=this._parentMarkedDirty(o.onlySelf);this.status=bt,this._forEachChild(n=>{n.enable(U(P({},o),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:o.emitEvent}),this._updateAncestors(U(P({},o),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(n=>n(!1))}_updateAncestors(o,t){o.onlySelf||(this._parent?.updateValueAndValidity(o),o.skipPristineCheck||this._parent?._updatePristine({},t),this._parent?._updateTouched({},t))}setParent(o){this._parent=o}getRawValue(){return this.value}updateValueAndValidity(o={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let n=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===bt||this.status===pt)&&this._runAsyncValidator(n,o.emitEvent)}let t=o.sourceControl??this;o.emitEvent!==!1&&(this._events.next(new At(this.value,t)),this._events.next(new ht(this.status,t)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),o.onlySelf||this._parent?.updateValueAndValidity(U(P({},o),{sourceControl:t}))}_updateTreeValidity(o={emitEvent:!0}){this._forEachChild(t=>t._updateTreeValidity(o)),this.updateValueAndValidity({onlySelf:!0,emitEvent:o.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?mt:bt}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(o,t){if(this.asyncValidator){this.status=pt,this._hasOwnPendingAsyncValidator={emitEvent:t!==!1,shouldHaveEmitted:o!==!1};let n=je(this.asyncValidator(this));this._asyncValidationSubscription=n.subscribe(i=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(i,{emitEvent:t,shouldHaveEmitted:o})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let o=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,o}return!1}setErrors(o,t={}){this.errors=o,this._updateControlsErrors(t.emitEvent!==!1,this,t.shouldHaveEmitted)}get(o){let t=o;return t==null||(Array.isArray(t)||(t=t.split(".")),t.length===0)?null:t.reduce((n,i)=>n&&n._find(i),this)}getError(o,t){let n=t?this.get(t):this;return n?.errors?n.errors[o]:null}hasError(o,t){return!!this.getError(o,t)}get root(){let o=this;for(;o._parent;)o=o._parent;return o}_updateControlsErrors(o,t,n){this.status=this._calculateStatus(),o&&this.statusChanges.emit(this.status),(o||n)&&this._events.next(new ht(this.status,t)),this._parent&&this._parent._updateControlsErrors(o,t,n)}_initObservables(){this.valueChanges=new z,this.statusChanges=new z}_calculateStatus(){return this._allControlsDisabled()?mt:this.errors?Mt:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(pt)?pt:this._anyControlsHaveStatus(Mt)?Mt:bt}_anyControlsHaveStatus(o){return this._anyControls(t=>t.status===o)}_anyControlsDirty(){return this._anyControls(o=>o.dirty)}_anyControlsTouched(){return this._anyControls(o=>o.touched)}_updatePristine(o,t){let n=!this._anyControlsDirty(),i=this.pristine!==n;this.pristine=n,o.onlySelf||this._parent?._updatePristine(o,t),i&&this._events.next(new vt(this.pristine,t))}_updateTouched(o={},t){this.touched=this._anyControlsTouched(),this._events.next(new yt(this.touched,t)),o.onlySelf||this._parent?._updateTouched(o,t)}_onDisabledChange=[];_registerOnCollectionChange(o){this._onCollectionChange=o}_setUpdateStrategy(o){Ft(o)&&o.updateOn!=null&&(this._updateOn=o.updateOn)}_parentMarkedDirty(o){return!o&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(o){return null}_assignValidators(o){this._rawValidators=Array.isArray(o)?o.slice():o,this._composedValidatorFn=Tn(this._rawValidators)}_assignAsyncValidators(o){this._rawAsyncValidators=Array.isArray(o)?o.slice():o,this._composedAsyncValidatorFn=Pn(this._rawAsyncValidators)}};var Ge=new w("",{factory:()=>Kt}),Kt="always";function Bn(e,o){return[...o.path,e]}function On(e,o,t=Kt){jn(e,o),o.valueAccessor.writeValue(e.value),(e.disabled||t==="always")&&o.valueAccessor.setDisabledState?.(e.disabled),zn(e,o),Hn(e,o),Ln(e,o),Rn(e,o)}function Fe(e,o){e.forEach(t=>{t.registerOnValidatorChange&&t.registerOnValidatorChange(o)})}function Rn(e,o){if(o.valueAccessor.setDisabledState){let t=n=>{o.valueAccessor.setDisabledState(n)};e.registerOnDisabledChange(t),o._registerOnDestroy(()=>{e._unregisterOnDisabledChange(t)})}}function jn(e,o){let t=An(e);o.validator!==null?e.setValidators(Se(t,o.validator)):typeof t=="function"&&e.setValidators([t]);let n=Fn(e);o.asyncValidator!==null?e.setAsyncValidators(Se(n,o.asyncValidator)):typeof n=="function"&&e.setAsyncValidators([n]);let i=()=>e.updateValueAndValidity();Fe(o._rawValidators,i),Fe(o._rawAsyncValidators,i)}function zn(e,o){o.valueAccessor.registerOnChange(t=>{e._pendingValue=t,e._pendingChange=!0,e._pendingDirty=!0,e.updateOn==="change"&&We(e,o)})}function Ln(e,o){o.valueAccessor.registerOnTouched(()=>{e._pendingTouched=!0,e.updateOn==="blur"&&e._pendingChange&&We(e,o),e.updateOn!=="submit"&&e.markAsTouched()})}function We(e,o){e._pendingDirty&&e.markAsDirty(),e.setValue(e._pendingValue,{emitModelToViewChange:!1}),o.viewToModelUpdate(e._pendingValue),e._pendingChange=!1}function Hn(e,o){let t=(n,i)=>{o.valueAccessor.writeValue(n),i&&o.viewToModelUpdate(n)};e.registerOnChange(t),o._registerOnDestroy(()=>{e._unregisterOnChange(t)})}function Un(e,o){if(!e.hasOwnProperty("model"))return!1;let t=e.model;return t.isFirstChange()?!0:!Object.is(o,t.currentValue)}function $n(e){return Object.getPrototypeOf(e.constructor)===Cn}function Gn(e,o){if(!o)return null;Array.isArray(o);let t,n,i;return o.forEach(r=>{r.constructor===Oe?t=r:$n(r)?n=r:i=r}),i||n||t||null}function ke(e,o){let t=e.indexOf(o);t>-1&&e.splice(t,1)}function Te(e){return typeof e=="object"&&e!==null&&Object.keys(e).length===2&&"value"in e&&"disabled"in e}var Wn=class extends Yt{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(o=null,t,n){super(kn(t),Nn(n,t)),this._applyFormState(o),this._setUpdateStrategy(t),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),Ft(t)&&(t.nonNullable||t.initialValueIsDefault)&&(Te(o)?this.defaultValue=o.value:this.defaultValue=o)}setValue(o,t={}){this.value=this._pendingValue=o,this._onChange.length&&t.emitModelToViewChange!==!1&&this._onChange.forEach(n=>n(this.value,t.emitViewToModelChange!==!1)),this.updateValueAndValidity(t)}patchValue(o,t={}){this.setValue(o,t)}reset(o=this.defaultValue,t={}){this._applyFormState(o),this.markAsPristine(t),this.markAsUntouched(t),this.setValue(this.value,t),t.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,t?.emitEvent!==!1&&this._events.next(new Xt(this))}_updateValue(){}_anyControls(o){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(o){this._onChange.push(o)}_unregisterOnChange(o){ke(this._onChange,o)}registerOnDisabledChange(o){this._onDisabledChange.push(o)}_unregisterOnDisabledChange(o){ke(this._onDisabledChange,o)}_forEachChild(o){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(o){Te(o)?(this.value=this._pendingValue=o.value,o.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=o}};var qn={provide:nt,useExisting:Pt(()=>Qn)},Ne=Promise.resolve(),Qn=(()=>{class e extends nt{_changeDetectorRef;callSetDisabledState;control=new Wn;static ngAcceptInputType_isDisabled;_registered=!1;viewModel;name="";isDisabled;model;options;update=new z;constructor(t,n,i,r,s,a){super(),this._changeDetectorRef=s,this.callSetDisabledState=a,this._parent=t,this._setValidators(n),this._setAsyncValidators(i),this.valueAccessor=Gn(this,r)}ngOnChanges(t){if(this._checkForErrors(),!this._registered||"name"in t){if(this._registered&&(this._checkName(),this.formDirective)){let n=t.name.previousValue;this.formDirective.removeControl({name:n,path:this._getPath(n)})}this._setUpControl()}"isDisabled"in t&&this._updateDisabled(t),Un(t,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective?.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){On(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._checkName()}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(t){Ne.then(()=>{this.control.setValue(t,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(t){let n=t.isDisabled.currentValue,i=n!==0&&h(n);Ne.then(()=>{i&&!this.control.disabled?this.control.disable():!i&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(t){return this._parent?Bn(t,this._parent):[t]}static \u0275fac=function(n){return new(n||e)(I(Qt,9),I(En,10),I(Vn,10),I(Be,10),I(fe,8),I(Ge,8))};static \u0275dir=y({type:e,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:!1,features:[C([qn]),p,le]})}return e})();var Zn=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=O({type:e});static \u0275inj=B({})}return e})();var di=(()=>{class e{static withConfig(t){return{ngModule:e,providers:[{provide:Ge,useValue:t.callSetDisabledState??Kt}]}}static \u0275fac=function(n){return new(n||e)};static \u0275mod=O({type:e});static \u0275inj=B({imports:[Zn]})}return e})();var Jt=(()=>{class e{static zindex=1e3;static calculatedScrollbarWidth=null;static calculatedScrollbarHeight=null;static browser;static addClass(t,n){t&&n&&(t.classList?t.classList.add(n):t.className+=" "+n)}static addMultipleClasses(t,n){if(t&&n)if(t.classList){let i=n.trim().split(" ");for(let r=0;r<i.length;r++)t.classList.add(i[r])}else{let i=n.split(" ");for(let r=0;r<i.length;r++)t.className+=" "+i[r]}}static removeClass(t,n){t&&n&&(t.classList?t.classList.remove(n):t.className=t.className.replace(new RegExp("(^|\\b)"+n.split(" ").join("|")+"(\\b|$)","gi")," "))}static removeMultipleClasses(t,n){t&&n&&[n].flat().filter(Boolean).forEach(i=>i.split(" ").forEach(r=>this.removeClass(t,r)))}static hasClass(t,n){return t&&n?t.classList?t.classList.contains(n):new RegExp("(^| )"+n+"( |$)","gi").test(t.className):!1}static siblings(t){return Array.prototype.filter.call(t.parentNode.children,function(n){return n!==t})}static find(t,n){return Array.from(t.querySelectorAll(n))}static findSingle(t,n){return this.isElement(t)?t.querySelector(n):null}static index(t){let n=t.parentNode.childNodes,i=0;for(var r=0;r<n.length;r++){if(n[r]==t)return i;n[r].nodeType==1&&i++}return-1}static indexWithinGroup(t,n){let i=t.parentNode?t.parentNode.childNodes:[],r=0;for(var s=0;s<i.length;s++){if(i[s]==t)return r;i[s].attributes&&i[s].attributes[n]&&i[s].nodeType==1&&r++}return-1}static appendOverlay(t,n,i="self"){i!=="self"&&t&&n&&this.appendChild(t,n)}static alignOverlay(t,n,i="self",r=!0){t&&n&&(r&&(t.style.minWidth=`${e.getOuterWidth(n)}px`),i==="self"?this.relativePosition(t,n):this.absolutePosition(t,n))}static relativePosition(t,n,i=!0){let r=K=>{if(K)return getComputedStyle(K).getPropertyValue("position")==="relative"?K:r(K.parentElement)},s=t.offsetParent?{width:t.offsetWidth,height:t.offsetHeight}:this.getHiddenElementDimensions(t),a=n.offsetHeight,d=n.getBoundingClientRect(),M=this.getWindowScrollTop(),m=this.getWindowScrollLeft(),_=this.getViewport(),D=r(t)?.getBoundingClientRect()||{top:-1*M,left:-1*m},N,$,_t="top";d.top+a+s.height>_.height?(N=d.top-D.top-s.height,_t="bottom",d.top+N<0&&(N=-1*d.top)):(N=a+d.top-D.top,_t="top");let ee=d.left+s.width-_.width,_n=d.left-D.left;if(s.width>_.width?$=(d.left-D.left)*-1:ee>0?$=_n-ee:$=d.left-D.left,t.style.top=N+"px",t.style.left=$+"px",t.style.transformOrigin=_t,i){let K=_e(/-anchor-gutter$/)?.value;t.style.marginTop=_t==="bottom"?`calc(${K??"2px"} * -1)`:K??""}}static absolutePosition(t,n,i=!0){let r=t.offsetParent?{width:t.offsetWidth,height:t.offsetHeight}:this.getHiddenElementDimensions(t),s=r.height,a=r.width,d=n.offsetHeight,M=n.offsetWidth,m=n.getBoundingClientRect(),_=this.getWindowScrollTop(),T=this.getWindowScrollLeft(),D=this.getViewport(),N,$;m.top+d+s>D.height?(N=m.top+_-s,t.style.transformOrigin="bottom",N<0&&(N=_)):(N=d+m.top+_,t.style.transformOrigin="top"),m.left+a>D.width?$=Math.max(0,m.left+T+M-a):$=m.left+T,t.style.top=N+"px",t.style.left=$+"px",i&&(t.style.marginTop=origin==="bottom"?"calc(var(--p-anchor-gutter) * -1)":"calc(var(--p-anchor-gutter))")}static getParents(t,n=[]){return t.parentNode===null?n:this.getParents(t.parentNode,n.concat([t.parentNode]))}static getScrollableParents(t){let n=[];if(t){let i=this.getParents(t),r=/(auto|scroll)/,s=a=>{let d=window.getComputedStyle(a,null);return r.test(d.getPropertyValue("overflow"))||r.test(d.getPropertyValue("overflowX"))||r.test(d.getPropertyValue("overflowY"))};for(let a of i){let d=a.nodeType===1&&a.dataset.scrollselectors;if(d){let M=d.split(",");for(let m of M){let _=this.findSingle(a,m);_&&s(_)&&n.push(_)}}a.nodeType!==9&&s(a)&&n.push(a)}}return n}static getHiddenElementOuterHeight(t){t.style.visibility="hidden",t.style.display="block";let n=t.offsetHeight;return t.style.display="none",t.style.visibility="visible",n}static getHiddenElementOuterWidth(t){t.style.visibility="hidden",t.style.display="block";let n=t.offsetWidth;return t.style.display="none",t.style.visibility="visible",n}static getHiddenElementDimensions(t){let n={};return t.style.visibility="hidden",t.style.display="block",n.width=t.offsetWidth,n.height=t.offsetHeight,t.style.display="none",t.style.visibility="visible",n}static scrollInView(t,n){let i=getComputedStyle(t).getPropertyValue("borderTopWidth"),r=i?parseFloat(i):0,s=getComputedStyle(t).getPropertyValue("paddingTop"),a=s?parseFloat(s):0,d=t.getBoundingClientRect(),m=n.getBoundingClientRect().top+document.body.scrollTop-(d.top+document.body.scrollTop)-r-a,_=t.scrollTop,T=t.clientHeight,D=this.getOuterHeight(n);m<0?t.scrollTop=_+m:m+D>T&&(t.scrollTop=_+m-T+D)}static fadeIn(t,n){t.style.opacity=0;let i=+new Date,r=0,s=function(){r=+t.style.opacity.replace(",",".")+(new Date().getTime()-i)/n,t.style.opacity=r,i=+new Date,+r<1&&(window.requestAnimationFrame?window.requestAnimationFrame(s):setTimeout(s,16))};s()}static fadeOut(t,n){var i=1,r=50,s=n,a=r/s;let d=setInterval(()=>{i=i-a,i<=0&&(i=0,clearInterval(d)),t.style.opacity=i},r)}static getWindowScrollTop(){let t=document.documentElement;return(window.pageYOffset||t.scrollTop)-(t.clientTop||0)}static getWindowScrollLeft(){let t=document.documentElement;return(window.pageXOffset||t.scrollLeft)-(t.clientLeft||0)}static matches(t,n){var i=Element.prototype,r=i.matches||i.webkitMatchesSelector||i.mozMatchesSelector||i.msMatchesSelector||function(s){return[].indexOf.call(document.querySelectorAll(s),this)!==-1};return r.call(t,n)}static getOuterWidth(t,n){let i=t.offsetWidth;if(n){let r=getComputedStyle(t);i+=parseFloat(r.marginLeft)+parseFloat(r.marginRight)}return i}static getHorizontalPadding(t){let n=getComputedStyle(t);return parseFloat(n.paddingLeft)+parseFloat(n.paddingRight)}static getHorizontalMargin(t){let n=getComputedStyle(t);return parseFloat(n.marginLeft)+parseFloat(n.marginRight)}static innerWidth(t){let n=t.offsetWidth,i=getComputedStyle(t);return n+=parseFloat(i.paddingLeft)+parseFloat(i.paddingRight),n}static width(t){let n=t.offsetWidth,i=getComputedStyle(t);return n-=parseFloat(i.paddingLeft)+parseFloat(i.paddingRight),n}static getInnerHeight(t){let n=t.offsetHeight,i=getComputedStyle(t);return n+=parseFloat(i.paddingTop)+parseFloat(i.paddingBottom),n}static getOuterHeight(t,n){let i=t.offsetHeight;if(n){let r=getComputedStyle(t);i+=parseFloat(r.marginTop)+parseFloat(r.marginBottom)}return i}static getHeight(t){let n=t.offsetHeight,i=getComputedStyle(t);return n-=parseFloat(i.paddingTop)+parseFloat(i.paddingBottom)+parseFloat(i.borderTopWidth)+parseFloat(i.borderBottomWidth),n}static getWidth(t){let n=t.offsetWidth,i=getComputedStyle(t);return n-=parseFloat(i.paddingLeft)+parseFloat(i.paddingRight)+parseFloat(i.borderLeftWidth)+parseFloat(i.borderRightWidth),n}static getViewport(){let t=window,n=document,i=n.documentElement,r=n.getElementsByTagName("body")[0],s=t.innerWidth||i.clientWidth||r.clientWidth,a=t.innerHeight||i.clientHeight||r.clientHeight;return{width:s,height:a}}static getOffset(t){var n=t.getBoundingClientRect();return{top:n.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:n.left+(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0)}}static replaceElementWith(t,n){let i=t.parentNode;if(!i)throw"Can't replace element";return i.replaceChild(n,t)}static getUserAgent(){if(navigator&&this.isClient())return navigator.userAgent}static isIE(){var t=window.navigator.userAgent,n=t.indexOf("MSIE ");if(n>0)return!0;var i=t.indexOf("Trident/");if(i>0){var r=t.indexOf("rv:");return!0}var s=t.indexOf("Edge/");return s>0}static isIOS(){return/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream}static isAndroid(){return/(android)/i.test(navigator.userAgent)}static isTouchDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0}static appendChild(t,n){if(this.isElement(n))n.appendChild(t);else if(n&&n.el&&n.el.nativeElement)n.el.nativeElement.appendChild(t);else throw"Cannot append "+n+" to "+t}static removeChild(t,n){if(this.isElement(n))n.removeChild(t);else if(n.el&&n.el.nativeElement)n.el.nativeElement.removeChild(t);else throw"Cannot remove "+t+" from "+n}static removeElement(t){"remove"in Element.prototype?t.remove():t.parentNode?.removeChild(t)}static isElement(t){return typeof HTMLElement=="object"?t instanceof HTMLElement:t&&typeof t=="object"&&t!==null&&t.nodeType===1&&typeof t.nodeName=="string"}static calculateScrollbarWidth(t){if(t){let n=getComputedStyle(t);return t.offsetWidth-t.clientWidth-parseFloat(n.borderLeftWidth)-parseFloat(n.borderRightWidth)}else{if(this.calculatedScrollbarWidth!==null)return this.calculatedScrollbarWidth;let n=document.createElement("div");n.className="p-scrollbar-measure",document.body.appendChild(n);let i=n.offsetWidth-n.clientWidth;return document.body.removeChild(n),this.calculatedScrollbarWidth=i,i}}static calculateScrollbarHeight(){if(this.calculatedScrollbarHeight!==null)return this.calculatedScrollbarHeight;let t=document.createElement("div");t.className="p-scrollbar-measure",document.body.appendChild(t);let n=t.offsetHeight-t.clientHeight;return document.body.removeChild(t),this.calculatedScrollbarWidth=n,n}static invokeElementMethod(t,n,i){t[n].apply(t,i)}static clearSelection(){if(window.getSelection&&window.getSelection())window.getSelection()?.empty?window.getSelection()?.empty():window.getSelection()?.removeAllRanges&&(window.getSelection()?.rangeCount||0)>0&&(window.getSelection()?.getRangeAt(0)?.getClientRects()?.length||0)>0&&window.getSelection()?.removeAllRanges();else if(document.selection&&document.selection.empty)try{document.selection.empty()}catch{}}static getBrowser(){if(!this.browser){let t=this.resolveUserAgent();this.browser={},t.browser&&(this.browser[t.browser]=!0,this.browser.version=t.version),this.browser.chrome?this.browser.webkit=!0:this.browser.webkit&&(this.browser.safari=!0)}return this.browser}static resolveUserAgent(){let t=navigator.userAgent.toLowerCase(),n=/(chrome)[ \/]([\w.]+)/.exec(t)||/(webkit)[ \/]([\w.]+)/.exec(t)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t)||/(msie) ([\w.]+)/.exec(t)||t.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)||[];return{browser:n[1]||"",version:n[2]||"0"}}static isInteger(t){return Number.isInteger?Number.isInteger(t):typeof t=="number"&&isFinite(t)&&Math.floor(t)===t}static isHidden(t){return!t||t.offsetParent===null}static isVisible(t){return t&&t.offsetParent!=null}static isExist(t){return t!==null&&typeof t<"u"&&t.nodeName&&t.parentNode}static focus(t,n){t&&document.activeElement!==t&&t.focus(n)}static getFocusableSelectorString(t=""){return`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        .p-inputtext:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t},
        .p-button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${t}`}static getFocusableElements(t,n=""){let i=this.find(t,this.getFocusableSelectorString(n)),r=[];for(let s of i){let a=getComputedStyle(s);this.isVisible(s)&&a.display!="none"&&a.visibility!="hidden"&&r.push(s)}return r}static getFocusableElement(t,n=""){let i=this.findSingle(t,this.getFocusableSelectorString(n));if(i){let r=getComputedStyle(i);if(this.isVisible(i)&&r.display!="none"&&r.visibility!="hidden")return i}return null}static getFirstFocusableElement(t,n=""){let i=this.getFocusableElements(t,n);return i.length>0?i[0]:null}static getLastFocusableElement(t,n){let i=this.getFocusableElements(t,n);return i.length>0?i[i.length-1]:null}static getNextFocusableElement(t,n=!1){let i=e.getFocusableElements(t),r=0;if(i&&i.length>0){let s=i.indexOf(i[0].ownerDocument.activeElement);n?s==-1||s===0?r=i.length-1:r=s-1:s!=-1&&s!==i.length-1&&(r=s+1)}return i[r]}static generateZIndex(){return this.zindex=this.zindex||999,++this.zindex}static getSelection(){return window.getSelection?window.getSelection()?.toString():document.getSelection?document.getSelection()?.toString():document.selection?document.selection.createRange().text:null}static getTargetElement(t,n){if(!t)return null;switch(t){case"document":return document;case"window":return window;case"@next":return n?.nextElementSibling;case"@prev":return n?.previousElementSibling;case"@parent":return n?.parentElement;case"@grandparent":return n?.parentElement?.parentElement;default:let i=typeof t;if(i==="string")return document.querySelector(t);if(i==="object"&&t.hasOwnProperty("nativeElement"))return this.isExist(t.nativeElement)?t.nativeElement:void 0;let s=(a=>!!(a&&a.constructor&&a.call&&a.apply))(t)?t():t;return s&&s.nodeType===9||this.isExist(s)?s:null}}static isClient(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}static getAttribute(t,n){if(t){let i=t.getAttribute(n);return isNaN(i)?i==="true"||i==="false"?i==="true":i:+i}}static calculateBodyScrollbarWidth(){return window.innerWidth-document.documentElement.offsetWidth}static blockBodyScroll(t="p-overflow-hidden"){document.body.style.setProperty("--scrollbar-width",this.calculateBodyScrollbarWidth()+"px"),this.addClass(document.body,t)}static unblockBodyScroll(t="p-overflow-hidden"){document.body.style.removeProperty("--scrollbar-width"),this.removeClass(document.body,t)}static createElement(t,n={},...i){if(t){let r=document.createElement(t);return this.setAttributes(r,n),r.append(...i),r}}static setAttribute(t,n="",i){this.isElement(t)&&i!==null&&i!==void 0&&t.setAttribute(n,i)}static setAttributes(t,n={}){if(this.isElement(t)){let i=(r,s)=>{let a=t?.$attrs?.[r]?[t?.$attrs?.[r]]:[];return[s].flat().reduce((d,M)=>{if(M!=null){let m=typeof M;if(m==="string"||m==="number")d.push(M);else if(m==="object"){let _=Array.isArray(M)?i(r,M):Object.entries(M).map(([T,D])=>r==="style"&&(D||D===0)?`${T.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}:${D}`:D?T:void 0);d=_.length?d.concat(_.filter(T=>!!T)):d}}return d},a)};Object.entries(n).forEach(([r,s])=>{if(s!=null){let a=r.match(/^on(.+)/);a?t.addEventListener(a[1].toLowerCase(),s):r==="pBind"?this.setAttributes(t,s):(s=r==="class"?[...new Set(i("class",s))].join(" ").trim():r==="style"?i("style",s).join(";").trim():s,(t.$attrs=t.$attrs||{})&&(t.$attrs[r]=s),t.setAttribute(r,s))}})}}static isFocusableElement(t,n=""){return this.isElement(t)?t.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n}`):!1}}return e})();function bi(){ye({variableName:Ve("scrollbar.width").name})}var qe=class{element;listener;scrollableParents;constructor(o,t=()=>{}){this.element=o,this.listener=t}bindScrollListener(){this.scrollableParents=Jt.getScrollableParents(this.element);for(let o=0;o<this.scrollableParents.length;o++)this.scrollableParents[o].addEventListener("scroll",this.listener)}unbindScrollListener(){if(this.scrollableParents)for(let o=0;o<this.scrollableParents.length;o++)this.scrollableParents[o].removeEventListener("scroll",this.listener)}destroy(){this.unbindScrollListener(),this.element=null,this.listener=null,this.scrollableParents=null}};var Qe=(()=>{class e extends x{autofocus=!1;focused=!1;platformId=l(de);document=l(se);host=l(ft);onAfterContentChecked(){this.autofocus===!1?this.host.nativeElement.removeAttribute("autofocus"):this.host.nativeElement.setAttribute("autofocus",!0),this.focused||this.autoFocus()}onAfterViewChecked(){this.focused||this.autoFocus()}autoFocus(){gt(this.platformId)&&this.autofocus&&setTimeout(()=>{let t=Jt.getFocusableElements(this.host?.nativeElement);t.length===0&&this.host.nativeElement.focus(),t.length>0&&t[0].focus(),this.focused=!0})}static \u0275fac=(()=>{let t;return function(i){return(t||(t=u(e)))(i||e)}})();static \u0275dir=y({type:e,selectors:[["","pAutoFocus",""]],inputs:{autofocus:[0,"pAutoFocus","autofocus"]},features:[p]})}return e})();var Ze=`
    .p-badge {
        display: inline-flex;
        border-radius: dt('badge.border.radius');
        align-items: center;
        justify-content: center;
        padding: dt('badge.padding');
        background: dt('badge.primary.background');
        color: dt('badge.primary.color');
        font-size: dt('badge.font.size');
        font-weight: dt('badge.font.weight');
        min-width: dt('badge.min.width');
        height: dt('badge.height');
    }

    .p-badge-dot {
        width: dt('badge.dot.size');
        min-width: dt('badge.dot.size');
        height: dt('badge.dot.size');
        border-radius: 50%;
        padding: 0;
    }

    .p-badge-circle {
        padding: 0;
        border-radius: 50%;
    }

    .p-badge-secondary {
        background: dt('badge.secondary.background');
        color: dt('badge.secondary.color');
    }

    .p-badge-success {
        background: dt('badge.success.background');
        color: dt('badge.success.color');
    }

    .p-badge-info {
        background: dt('badge.info.background');
        color: dt('badge.info.color');
    }

    .p-badge-warn {
        background: dt('badge.warn.background');
        color: dt('badge.warn.color');
    }

    .p-badge-danger {
        background: dt('badge.danger.background');
        color: dt('badge.danger.color');
    }

    .p-badge-contrast {
        background: dt('badge.contrast.background');
        color: dt('badge.contrast.color');
    }

    .p-badge-sm {
        font-size: dt('badge.sm.font.size');
        min-width: dt('badge.sm.min.width');
        height: dt('badge.sm.height');
    }

    .p-badge-lg {
        font-size: dt('badge.lg.font.size');
        min-width: dt('badge.lg.min.width');
        height: dt('badge.lg.height');
    }

    .p-badge-xl {
        font-size: dt('badge.xl.font.size');
        min-width: dt('badge.xl.min.width');
        height: dt('badge.xl.height');
    }
`;var Xn=`
    ${Ze}

    /* For PrimeNG (directive)*/
    .p-overlay-badge {
        position: relative;
    }

    .p-overlay-badge > .p-badge {
        position: absolute;
        top: 0;
        inset-inline-end: 0;
        transform: translate(50%, -50%);
        transform-origin: 100% 0;
        margin: 0;
    }
`,Yn={root:({instance:e})=>{let o=typeof e.value=="function"?e.value():e.value,t=typeof e.size=="function"?e.size():e.size,n=typeof e.badgeSize=="function"?e.badgeSize():e.badgeSize,i=typeof e.severity=="function"?e.severity():e.severity;return["p-badge p-component",{"p-badge-circle":Et(o)&&String(o).length===1,"p-badge-dot":Ee(o),"p-badge-sm":t==="small"||n==="small","p-badge-lg":t==="large"||n==="large","p-badge-xl":t==="xlarge"||n==="xlarge","p-badge-info":i==="info","p-badge-success":i==="success","p-badge-warn":i==="warn","p-badge-danger":i==="danger","p-badge-secondary":i==="secondary","p-badge-contrast":i==="contrast"}]}},Xe=(()=>{class e extends S{name="badge";style=Xn;classes=Yn;static \u0275fac=(()=>{let t;return function(i){return(t||(t=u(e)))(i||e)}})();static \u0275prov=E({token:e,factory:e.\u0275fac})}return e})();var Ye=new w("BADGE_INSTANCE");var te=(()=>{class e extends x{componentName="Badge";$pcBadge=l(Ye,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=l(g,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass=b();badgeSize=b();size=b();severity=b();value=b();badgeDisabled=b(!1,{transform:h});_componentStyle=l(Xe);get dataP(){return this.cn({circle:this.value()!=null&&String(this.value()).length===1,empty:this.value()==null,disabled:this.badgeDisabled(),[this.severity()]:this.severity(),[this.size()]:this.size()})}static \u0275fac=(()=>{let t;return function(i){return(t||(t=u(e)))(i||e)}})();static \u0275cmp=F({type:e,selectors:[["p-badge"]],hostVars:5,hostBindings:function(n,i){n&2&&(A("data-p",i.dataP),v(i.cn(i.cx("root"),i.styleClass())),he("display",i.badgeDisabled()?"none":null))},inputs:{styleClass:[1,"styleClass"],badgeSize:[1,"badgeSize"],size:[1,"size"],severity:[1,"severity"],value:[1,"value"],badgeDisabled:[1,"badgeDisabled"]},features:[C([Xe,{provide:Ye,useExisting:e},{provide:H,useExisting:e}]),L([g]),p],decls:1,vars:1,template:function(n,i){n&1&&dt(0),n&2&&ut(i.value())},dependencies:[X,Y,Me],encapsulation:2,changeDetection:0})}return e})(),Ke=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=O({type:e});static \u0275inj=B({imports:[te,Y,Y]})}return e})();var Jn=["*"],to={root:"p-fluid"},Je=(()=>{class e extends S{name="fluid";classes=to;static \u0275fac=(()=>{let t;return function(i){return(t||(t=u(e)))(i||e)}})();static \u0275prov=E({token:e,factory:e.\u0275fac})}return e})();var tn=new w("FLUID_INSTANCE"),Tt=(()=>{class e extends x{componentName="Fluid";$pcFluid=l(tn,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=l(g,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}_componentStyle=l(Je);static \u0275fac=(()=>{let t;return function(i){return(t||(t=u(e)))(i||e)}})();static \u0275cmp=F({type:e,selectors:[["p-fluid"]],hostVars:2,hostBindings:function(n,i){n&2&&v(i.cx("root"))},features:[C([Je,{provide:tn,useExisting:e},{provide:H,useExisting:e}]),L([g]),p],ngContentSelectors:Jn,decls:1,vars:0,template:function(n,i){n&1&&(W(),q(0))},dependencies:[X],encapsulation:2,changeDetection:0})}return e})();var eo=["*"],no=`
.p-icon {
    display: inline-block;
    vertical-align: baseline;
    flex-shrink: 0;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`,en=(()=>{class e extends S{name="baseicon";css=no;static \u0275fac=(()=>{let t;return function(i){return(t||(t=u(e)))(i||e)}})();static \u0275prov=E({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var nn=(()=>{class e extends x{spin=!1;_componentStyle=l(en);getClassNames(){return ve("p-icon",{"p-icon-spin":this.spin})}static \u0275fac=(()=>{let t;return function(i){return(t||(t=u(e)))(i||e)}})();static \u0275cmp=F({type:e,selectors:[["ng-component"]],hostAttrs:["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],hostVars:2,hostBindings:function(n,i){n&2&&v(i.getClassNames())},inputs:{spin:[2,"spin","spin",h]},features:[C([en]),p],ngContentSelectors:eo,decls:1,vars:0,template:function(n,i){n&1&&(W(),q(0))},encapsulation:2,changeDetection:0})}return e})();var oo=["data-p-icon","spinner"],on=(()=>{class e extends nn{pathId;onInit(){this.pathId="url(#"+Wt()+")"}static \u0275fac=(()=>{let t;return function(i){return(t||(t=u(e)))(i||e)}})();static \u0275cmp=F({type:e,selectors:[["","data-p-icon","spinner"]],features:[p],attrs:oo,decls:5,vars:2,consts:[["d","M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(n,i){n&1&&(Ct(),Ot(0,"g"),jt(1,"path",0),Rt(),Ot(2,"defs")(3,"clipPath",1),jt(4,"rect",2),Rt()()),n&2&&(A("clip-path",i.pathId),f(3),pe("id",i.pathId))},encapsulation:2})}return e})();var rn=`
    .p-ink {
        display: block;
        position: absolute;
        background: dt('ripple.background');
        border-radius: 100%;
        transform: scale(0);
        pointer-events: none;
    }

    .p-ink-active {
        animation: ripple 0.4s linear;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`;var io=`
    ${rn}

    /* For PrimeNG */
    .p-ripple {
        overflow: hidden;
        position: relative;
    }

    .p-ripple-disabled .p-ink {
        display: none !important;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`,ro={root:"p-ink"},sn=(()=>{class e extends S{name="ripple";style=io;classes=ro;static \u0275fac=(()=>{let t;return function(i){return(t||(t=u(e)))(i||e)}})();static \u0275prov=E({token:e,factory:e.\u0275fac})}return e})();var an=(()=>{class e extends x{componentName="Ripple";zone=l(ae);_componentStyle=l(sn);animationListener;mouseDownListener;timeout;constructor(){super(),J(()=>{gt(this.platformId)&&(this.config.ripple()?this.zone.runOutsideAngular(()=>{this.create(),this.mouseDownListener=this.renderer.listen(this.el.nativeElement,"mousedown",this.onMouseDown.bind(this))}):this.remove())})}onAfterViewInit(){}onMouseDown(t){let n=this.getInk();if(!n||this.document.defaultView?.getComputedStyle(n,null).display==="none")return;if(!this.$unstyled()&&ct(n,"p-ink-active"),n.setAttribute("data-p-ink-active","false"),!$t(n)&&!Gt(n)){let a=Math.max(Ce(this.el.nativeElement),we(this.el.nativeElement));n.style.height=a+"px",n.style.width=a+"px"}let i=De(this.el.nativeElement),r=t.pageX-i.left+this.document.body.scrollTop-Gt(n)/2,s=t.pageY-i.top+this.document.body.scrollLeft-$t(n)/2;this.renderer.setStyle(n,"top",s+"px"),this.renderer.setStyle(n,"left",r+"px"),!this.$unstyled()&&Ut(n,"p-ink-active"),n.setAttribute("data-p-ink-active","true"),this.timeout=setTimeout(()=>{let a=this.getInk();a&&(!this.$unstyled()&&ct(a,"p-ink-active"),a.setAttribute("data-p-ink-active","false"))},401)}getInk(){let t=this.el.nativeElement.children;for(let n=0;n<t.length;n++)if(typeof t[n].className=="string"&&t[n].className.indexOf("p-ink")!==-1)return t[n];return null}resetInk(){let t=this.getInk();t&&(!this.$unstyled()&&ct(t,"p-ink-active"),t.setAttribute("data-p-ink-active","false"))}onAnimationEnd(t){this.timeout&&clearTimeout(this.timeout),!this.$unstyled()&&ct(t.currentTarget,"p-ink-active"),t.currentTarget.setAttribute("data-p-ink-active","false")}create(){let t=this.renderer.createElement("span");this.renderer.addClass(t,"p-ink"),this.renderer.appendChild(this.el.nativeElement,t),this.renderer.setAttribute(t,"data-p-ink","true"),this.renderer.setAttribute(t,"data-p-ink-active","false"),this.renderer.setAttribute(t,"aria-hidden","true"),this.renderer.setAttribute(t,"role","presentation"),this.animationListener||(this.animationListener=this.renderer.listen(t,"animationend",this.onAnimationEnd.bind(this)))}remove(){let t=this.getInk();t&&(this.mouseDownListener&&this.mouseDownListener(),this.animationListener&&this.animationListener(),this.mouseDownListener=null,this.animationListener=null,xe(t))}onDestroy(){this.config&&this.config.ripple()&&this.remove()}static \u0275fac=function(n){return new(n||e)};static \u0275dir=y({type:e,selectors:[["","pRipple",""]],hostAttrs:[1,"p-ripple"],features:[C([sn]),p]})}return e})();var ln=`
    .p-button {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        color: dt('button.primary.color');
        background: dt('button.primary.background');
        border: 1px solid dt('button.primary.border.color');
        padding: dt('button.padding.y') dt('button.padding.x');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('button.transition.duration'),
            color dt('button.transition.duration'),
            border-color dt('button.transition.duration'),
            outline-color dt('button.transition.duration'),
            box-shadow dt('button.transition.duration');
        border-radius: dt('button.border.radius');
        outline-color: transparent;
        gap: dt('button.gap');
    }

    .p-button:disabled {
        cursor: default;
    }

    .p-button-icon-right {
        order: 1;
    }

    .p-button-icon-right:dir(rtl) {
        order: -1;
    }

    .p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {
        order: 1;
    }

    .p-button-icon-bottom {
        order: 2;
    }

    .p-button-icon-only {
        width: dt('button.icon.only.width');
        padding-inline-start: 0;
        padding-inline-end: 0;
        gap: 0;
    }

    .p-button-icon-only.p-button-rounded {
        border-radius: 50%;
        height: dt('button.icon.only.width');
    }

    .p-button-icon-only .p-button-label {
        visibility: hidden;
        width: 0;
    }

    .p-button-icon-only::after {
        content: "\xA0";
        visibility: hidden;
        width: 0;
    }

    .p-button-sm {
        font-size: dt('button.sm.font.size');
        padding: dt('button.sm.padding.y') dt('button.sm.padding.x');
    }

    .p-button-sm .p-button-icon {
        font-size: dt('button.sm.font.size');
    }

    .p-button-sm.p-button-icon-only {
        width: dt('button.sm.icon.only.width');
    }

    .p-button-sm.p-button-icon-only.p-button-rounded {
        height: dt('button.sm.icon.only.width');
    }

    .p-button-lg {
        font-size: dt('button.lg.font.size');
        padding: dt('button.lg.padding.y') dt('button.lg.padding.x');
    }

    .p-button-lg .p-button-icon {
        font-size: dt('button.lg.font.size');
    }

    .p-button-lg.p-button-icon-only {
        width: dt('button.lg.icon.only.width');
    }

    .p-button-lg.p-button-icon-only.p-button-rounded {
        height: dt('button.lg.icon.only.width');
    }

    .p-button-vertical {
        flex-direction: column;
    }

    .p-button-label {
        font-weight: dt('button.label.font.weight');
    }

    .p-button-fluid {
        width: 100%;
    }

    .p-button-fluid.p-button-icon-only {
        width: dt('button.icon.only.width');
    }

    .p-button:not(:disabled):hover {
        background: dt('button.primary.hover.background');
        border: 1px solid dt('button.primary.hover.border.color');
        color: dt('button.primary.hover.color');
    }

    .p-button:not(:disabled):active {
        background: dt('button.primary.active.background');
        border: 1px solid dt('button.primary.active.border.color');
        color: dt('button.primary.active.color');
    }

    .p-button:focus-visible {
        box-shadow: dt('button.primary.focus.ring.shadow');
        outline: dt('button.focus.ring.width') dt('button.focus.ring.style') dt('button.primary.focus.ring.color');
        outline-offset: dt('button.focus.ring.offset');
    }

    .p-button .p-badge {
        min-width: dt('button.badge.size');
        height: dt('button.badge.size');
        line-height: dt('button.badge.size');
    }

    .p-button-raised {
        box-shadow: dt('button.raised.shadow');
    }

    .p-button-rounded {
        border-radius: dt('button.rounded.border.radius');
    }

    .p-button-secondary {
        background: dt('button.secondary.background');
        border: 1px solid dt('button.secondary.border.color');
        color: dt('button.secondary.color');
    }

    .p-button-secondary:not(:disabled):hover {
        background: dt('button.secondary.hover.background');
        border: 1px solid dt('button.secondary.hover.border.color');
        color: dt('button.secondary.hover.color');
    }

    .p-button-secondary:not(:disabled):active {
        background: dt('button.secondary.active.background');
        border: 1px solid dt('button.secondary.active.border.color');
        color: dt('button.secondary.active.color');
    }

    .p-button-secondary:focus-visible {
        outline-color: dt('button.secondary.focus.ring.color');
        box-shadow: dt('button.secondary.focus.ring.shadow');
    }

    .p-button-success {
        background: dt('button.success.background');
        border: 1px solid dt('button.success.border.color');
        color: dt('button.success.color');
    }

    .p-button-success:not(:disabled):hover {
        background: dt('button.success.hover.background');
        border: 1px solid dt('button.success.hover.border.color');
        color: dt('button.success.hover.color');
    }

    .p-button-success:not(:disabled):active {
        background: dt('button.success.active.background');
        border: 1px solid dt('button.success.active.border.color');
        color: dt('button.success.active.color');
    }

    .p-button-success:focus-visible {
        outline-color: dt('button.success.focus.ring.color');
        box-shadow: dt('button.success.focus.ring.shadow');
    }

    .p-button-info {
        background: dt('button.info.background');
        border: 1px solid dt('button.info.border.color');
        color: dt('button.info.color');
    }

    .p-button-info:not(:disabled):hover {
        background: dt('button.info.hover.background');
        border: 1px solid dt('button.info.hover.border.color');
        color: dt('button.info.hover.color');
    }

    .p-button-info:not(:disabled):active {
        background: dt('button.info.active.background');
        border: 1px solid dt('button.info.active.border.color');
        color: dt('button.info.active.color');
    }

    .p-button-info:focus-visible {
        outline-color: dt('button.info.focus.ring.color');
        box-shadow: dt('button.info.focus.ring.shadow');
    }

    .p-button-warn {
        background: dt('button.warn.background');
        border: 1px solid dt('button.warn.border.color');
        color: dt('button.warn.color');
    }

    .p-button-warn:not(:disabled):hover {
        background: dt('button.warn.hover.background');
        border: 1px solid dt('button.warn.hover.border.color');
        color: dt('button.warn.hover.color');
    }

    .p-button-warn:not(:disabled):active {
        background: dt('button.warn.active.background');
        border: 1px solid dt('button.warn.active.border.color');
        color: dt('button.warn.active.color');
    }

    .p-button-warn:focus-visible {
        outline-color: dt('button.warn.focus.ring.color');
        box-shadow: dt('button.warn.focus.ring.shadow');
    }

    .p-button-help {
        background: dt('button.help.background');
        border: 1px solid dt('button.help.border.color');
        color: dt('button.help.color');
    }

    .p-button-help:not(:disabled):hover {
        background: dt('button.help.hover.background');
        border: 1px solid dt('button.help.hover.border.color');
        color: dt('button.help.hover.color');
    }

    .p-button-help:not(:disabled):active {
        background: dt('button.help.active.background');
        border: 1px solid dt('button.help.active.border.color');
        color: dt('button.help.active.color');
    }

    .p-button-help:focus-visible {
        outline-color: dt('button.help.focus.ring.color');
        box-shadow: dt('button.help.focus.ring.shadow');
    }

    .p-button-danger {
        background: dt('button.danger.background');
        border: 1px solid dt('button.danger.border.color');
        color: dt('button.danger.color');
    }

    .p-button-danger:not(:disabled):hover {
        background: dt('button.danger.hover.background');
        border: 1px solid dt('button.danger.hover.border.color');
        color: dt('button.danger.hover.color');
    }

    .p-button-danger:not(:disabled):active {
        background: dt('button.danger.active.background');
        border: 1px solid dt('button.danger.active.border.color');
        color: dt('button.danger.active.color');
    }

    .p-button-danger:focus-visible {
        outline-color: dt('button.danger.focus.ring.color');
        box-shadow: dt('button.danger.focus.ring.shadow');
    }

    .p-button-contrast {
        background: dt('button.contrast.background');
        border: 1px solid dt('button.contrast.border.color');
        color: dt('button.contrast.color');
    }

    .p-button-contrast:not(:disabled):hover {
        background: dt('button.contrast.hover.background');
        border: 1px solid dt('button.contrast.hover.border.color');
        color: dt('button.contrast.hover.color');
    }

    .p-button-contrast:not(:disabled):active {
        background: dt('button.contrast.active.background');
        border: 1px solid dt('button.contrast.active.border.color');
        color: dt('button.contrast.active.color');
    }

    .p-button-contrast:focus-visible {
        outline-color: dt('button.contrast.focus.ring.color');
        box-shadow: dt('button.contrast.focus.ring.shadow');
    }

    .p-button-outlined {
        background: transparent;
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):hover {
        background: dt('button.outlined.primary.hover.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):active {
        background: dt('button.outlined.primary.active.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined.p-button-secondary {
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):hover {
        background: dt('button.outlined.secondary.hover.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):active {
        background: dt('button.outlined.secondary.active.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-success {
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):hover {
        background: dt('button.outlined.success.hover.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):active {
        background: dt('button.outlined.success.active.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-info {
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):hover {
        background: dt('button.outlined.info.hover.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):active {
        background: dt('button.outlined.info.active.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-warn {
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):hover {
        background: dt('button.outlined.warn.hover.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):active {
        background: dt('button.outlined.warn.active.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-help {
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):hover {
        background: dt('button.outlined.help.hover.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):active {
        background: dt('button.outlined.help.active.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-danger {
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):hover {
        background: dt('button.outlined.danger.hover.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):active {
        background: dt('button.outlined.danger.active.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-contrast {
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):hover {
        background: dt('button.outlined.contrast.hover.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):active {
        background: dt('button.outlined.contrast.active.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-plain {
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):hover {
        background: dt('button.outlined.plain.hover.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):active {
        background: dt('button.outlined.plain.active.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-text {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):hover {
        background: dt('button.text.primary.hover.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):active {
        background: dt('button.text.primary.active.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text.p-button-secondary {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):hover {
        background: dt('button.text.secondary.hover.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):active {
        background: dt('button.text.secondary.active.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-success {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):hover {
        background: dt('button.text.success.hover.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):active {
        background: dt('button.text.success.active.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-info {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):hover {
        background: dt('button.text.info.hover.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):active {
        background: dt('button.text.info.active.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-warn {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):hover {
        background: dt('button.text.warn.hover.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):active {
        background: dt('button.text.warn.active.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-help {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):hover {
        background: dt('button.text.help.hover.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):active {
        background: dt('button.text.help.active.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-danger {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):hover {
        background: dt('button.text.danger.hover.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):active {
        background: dt('button.text.danger.active.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-contrast {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):hover {
        background: dt('button.text.contrast.hover.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):active {
        background: dt('button.text.contrast.active.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-plain {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):hover {
        background: dt('button.text.plain.hover.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):active {
        background: dt('button.text.plain.active.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-link {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.color');
    }

    .p-button-link:not(:disabled):hover {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.hover.color');
    }

    .p-button-link:not(:disabled):hover .p-button-label {
        text-decoration: underline;
    }

    .p-button-link:not(:disabled):active {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.active.color');
    }
`;var ao=["content"],lo=["loadingicon"],uo=["icon"],co=["*"],cn=(e,o)=>({class:e,pt:o});function po(e,o){e&1&&ce(0)}function ho(e,o){if(e&1&&tt(0,"span",7),e&2){let t=V(3);v(t.cn(t.cx("loadingIcon"),"pi-spin",t.loadingIcon||(t.buttonProps==null?null:t.buttonProps.loadingIcon))),c("pBind",t.ptm("loadingIcon")),A("aria-hidden",!0)}}function fo(e,o){if(e&1&&(Ct(),tt(0,"svg",8)),e&2){let t=V(3);v(t.cn(t.cx("loadingIcon"),t.cx("spinnerIcon"))),c("pBind",t.ptm("loadingIcon"))("spin",!0),A("aria-hidden",!0)}}function go(e,o){if(e&1&&(st(0),k(1,ho,1,4,"span",3)(2,fo,1,5,"svg",6),at()),e&2){let t=V(2);f(),c("ngIf",t.loadingIcon||(t.buttonProps==null?null:t.buttonProps.loadingIcon)),f(),c("ngIf",!(t.loadingIcon||t.buttonProps!=null&&t.buttonProps.loadingIcon))}}function bo(e,o){}function mo(e,o){if(e&1&&k(0,bo,0,0,"ng-template",9),e&2){let t=V(2);c("ngIf",t.loadingIconTemplate||t._loadingIconTemplate)}}function vo(e,o){if(e&1&&(st(0),k(1,go,3,2,"ng-container",2)(2,mo,1,1,null,5),at()),e&2){let t=V();f(),c("ngIf",!t.loadingIconTemplate&&!t._loadingIconTemplate),f(),c("ngTemplateOutlet",t.loadingIconTemplate||t._loadingIconTemplate)("ngTemplateOutletContext",Lt(3,cn,t.cx("loadingIcon"),t.ptm("loadingIcon")))}}function yo(e,o){if(e&1&&tt(0,"span",7),e&2){let t=V(2);v(t.cn(t.cx("icon"),t.icon||(t.buttonProps==null?null:t.buttonProps.icon))),c("pBind",t.ptm("icon")),A("data-p",t.dataIconP)}}function _o(e,o){}function Co(e,o){if(e&1&&k(0,_o,0,0,"ng-template",9),e&2){let t=V(2);c("ngIf",!t.icon&&(t.iconTemplate||t._iconTemplate))}}function Do(e,o){if(e&1&&(st(0),k(1,yo,1,4,"span",3)(2,Co,1,1,null,5),at()),e&2){let t=V();f(),c("ngIf",(t.icon||(t.buttonProps==null?null:t.buttonProps.icon))&&!t.iconTemplate&&!t._iconTemplate),f(),c("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)("ngTemplateOutletContext",Lt(3,cn,t.cx("icon"),t.ptm("icon")))}}function wo(e,o){if(e&1&&(it(0,"span",7),dt(1),rt()),e&2){let t=V();v(t.cx("label")),c("pBind",t.ptm("label")),A("aria-hidden",(t.icon||(t.buttonProps==null?null:t.buttonProps.icon))&&!(t.label||t.buttonProps!=null&&t.buttonProps.label))("data-p",t.dataLabelP),f(),ut(t.label||(t.buttonProps==null?null:t.buttonProps.label))}}function xo(e,o){if(e&1&&tt(0,"p-badge",10),e&2){let t=V();c("value",t.badge||(t.buttonProps==null?null:t.buttonProps.badge))("severity",t.badgeSeverity||(t.buttonProps==null?null:t.buttonProps.badgeSeverity))("pt",t.ptm("pcBadge"))("unstyled",t.unstyled())}}var Eo={root:({instance:e})=>["p-button p-component",{"p-button-icon-only":e.hasIcon&&!e.label&&!e.buttonProps?.label&&!e.badge,"p-button-vertical":(e.iconPos==="top"||e.iconPos==="bottom")&&e.label,"p-button-loading":e.loading||e.buttonProps?.loading,"p-button-link":e.link||e.buttonProps?.link,[`p-button-${e.severity||e.buttonProps?.severity}`]:e.severity||e.buttonProps?.severity,"p-button-raised":e.raised||e.buttonProps?.raised,"p-button-rounded":e.rounded||e.buttonProps?.rounded,"p-button-text":e.text||e.variant==="text"||e.buttonProps?.text||e.buttonProps?.variant==="text","p-button-outlined":e.outlined||e.variant==="outlined"||e.buttonProps?.outlined||e.buttonProps?.variant==="outlined","p-button-sm":e.size==="small"||e.buttonProps?.size==="small","p-button-lg":e.size==="large"||e.buttonProps?.size==="large","p-button-plain":e.plain||e.buttonProps?.plain,"p-button-fluid":e.hasFluid}],loadingIcon:"p-button-loading-icon",icon:({instance:e})=>["p-button-icon",{[`p-button-icon-${e.iconPos||e.buttonProps?.iconPos}`]:e.label||e.buttonProps?.label,"p-button-icon-left":(e.iconPos==="left"||e.buttonProps?.iconPos==="left")&&e.label||e.buttonProps?.label,"p-button-icon-right":(e.iconPos==="right"||e.buttonProps?.iconPos==="right")&&e.label||e.buttonProps?.label,"p-button-icon-top":(e.iconPos==="top"||e.buttonProps?.iconPos==="top")&&e.label||e.buttonProps?.label,"p-button-icon-bottom":(e.iconPos==="bottom"||e.buttonProps?.iconPos==="bottom")&&e.label||e.buttonProps?.label},e.icon,e.buttonProps?.icon],spinnerIcon:({instance:e})=>Object.entries(e.cx("icon")).filter(([,o])=>!!o).reduce((o,[t])=>o+` ${t}`,"p-button-loading-icon"),label:"p-button-label"},dn=(()=>{class e extends S{name="button";style=ln;classes=Eo;static \u0275fac=(()=>{let t;return function(i){return(t||(t=u(e)))(i||e)}})();static \u0275prov=E({token:e,factory:e.\u0275fac})}return e})();var un=new w("BUTTON_INSTANCE");var Kr=(()=>{class e extends x{componentName="Button";hostName="";$pcButton=l(un,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=l(g,{self:!0});_componentStyle=l(dn);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}type="button";badge;disabled;raised=!1;rounded=!1;text=!1;plain=!1;outlined=!1;link=!1;tabindex;size;variant;style;styleClass;badgeClass;badgeSeverity="secondary";ariaLabel;autofocus;iconPos="left";icon;label;loading=!1;loadingIcon;severity;buttonProps;fluid=b(void 0,{transform:h});onClick=new z;onFocus=new z;onBlur=new z;contentTemplate;loadingIconTemplate;iconTemplate;templates;pcFluid=l(Tt,{optional:!0,host:!0,skipSelf:!0});get hasFluid(){return this.fluid()??!!this.pcFluid}get hasIcon(){return this.icon||this.buttonProps?.icon||this.iconTemplate||this._iconTemplate||this.loadingIcon||this.loadingIconTemplate||this._loadingIconTemplate}_contentTemplate;_iconTemplate;_loadingIconTemplate;onAfterContentInit(){this.templates?.forEach(t=>{switch(t.getType()){case"content":this._contentTemplate=t.template;break;case"icon":this._iconTemplate=t.template;break;case"loadingicon":this._loadingIconTemplate=t.template;break;default:this._contentTemplate=t.template;break}})}get dataP(){return this.cn({[this.size]:this.size,"icon-only":this.hasIcon&&!this.label&&!this.badge,loading:this.loading,fluid:this.hasFluid,rounded:this.rounded,raised:this.raised,outlined:this.outlined||this.variant==="outlined",text:this.text||this.variant==="text",link:this.link,vertical:(this.iconPos==="top"||this.iconPos==="bottom")&&this.label})}get dataIconP(){return this.cn({[this.iconPos]:this.iconPos,[this.size]:this.size})}get dataLabelP(){return this.cn({[this.size]:this.size,"icon-only":this.hasIcon&&!this.label&&!this.badge})}static \u0275fac=(()=>{let t;return function(i){return(t||(t=u(e)))(i||e)}})();static \u0275cmp=F({type:e,selectors:[["p-button"]],contentQueries:function(n,i,r){if(n&1&&Dt(r,ao,5)(r,lo,5)(r,uo,5)(r,Vt,4),n&2){let s;Q(s=Z())&&(i.contentTemplate=s.first),Q(s=Z())&&(i.loadingIconTemplate=s.first),Q(s=Z())&&(i.iconTemplate=s.first),Q(s=Z())&&(i.templates=s)}},inputs:{hostName:"hostName",type:"type",badge:"badge",disabled:[2,"disabled","disabled",h],raised:[2,"raised","raised",h],rounded:[2,"rounded","rounded",h],text:[2,"text","text",h],plain:[2,"plain","plain",h],outlined:[2,"outlined","outlined",h],link:[2,"link","link",h],tabindex:[2,"tabindex","tabindex",ge],size:"size",variant:"variant",style:"style",styleClass:"styleClass",badgeClass:"badgeClass",badgeSeverity:"badgeSeverity",ariaLabel:"ariaLabel",autofocus:[2,"autofocus","autofocus",h],iconPos:"iconPos",icon:"icon",label:"label",loading:[2,"loading","loading",h],loadingIcon:"loadingIcon",severity:"severity",buttonProps:"buttonProps",fluid:[1,"fluid"]},outputs:{onClick:"onClick",onFocus:"onFocus",onBlur:"onBlur"},features:[C([dn,{provide:un,useExisting:e},{provide:H,useExisting:e}]),L([g]),p],ngContentSelectors:co,decls:7,vars:17,consts:[["pRipple","",3,"click","focus","blur","ngStyle","disabled","pAutoFocus","pBind"],[4,"ngTemplateOutlet"],[4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"value","severity","pt","unstyled",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","spinner",3,"class","pBind","spin",4,"ngIf"],[3,"pBind"],["data-p-icon","spinner",3,"pBind","spin"],[3,"ngIf"],[3,"value","severity","pt","unstyled"]],template:function(n,i){n&1&&(W(),it(0,"button",0),lt("click",function(s){return i.onClick.emit(s)})("focus",function(s){return i.onFocus.emit(s)})("blur",function(s){return i.onBlur.emit(s)}),q(1),k(2,po,1,0,"ng-container",1)(3,vo,3,6,"ng-container",2)(4,Do,3,6,"ng-container",2)(5,wo,2,6,"span",3)(6,xo,1,4,"p-badge",4),rt()),n&2&&(v(i.cn(i.cx("root"),i.styleClass,i.buttonProps==null?null:i.buttonProps.styleClass)),c("ngStyle",i.style||(i.buttonProps==null?null:i.buttonProps.style))("disabled",i.disabled||i.loading||(i.buttonProps==null?null:i.buttonProps.disabled))("pAutoFocus",i.autofocus||(i.buttonProps==null?null:i.buttonProps.autofocus))("pBind",i.ptm("root")),A("type",i.type||(i.buttonProps==null?null:i.buttonProps.type))("aria-label",i.ariaLabel||(i.buttonProps==null?null:i.buttonProps.ariaLabel))("tabindex",i.tabindex||(i.buttonProps==null?null:i.buttonProps.tabindex))("data-p",i.dataP)("data-p-disabled",i.disabled||i.loading||(i.buttonProps==null?null:i.buttonProps.disabled))("data-p-severity",i.severity||(i.buttonProps==null?null:i.buttonProps.severity)),f(2),c("ngTemplateOutlet",i.contentTemplate||i._contentTemplate),f(),c("ngIf",i.loading||(i.buttonProps==null?null:i.buttonProps.loading)),f(),c("ngIf",!(i.loading||i.buttonProps!=null&&i.buttonProps.loading)),f(),c("ngIf",!i.contentTemplate&&!i._contentTemplate&&(i.label||(i.buttonProps==null?null:i.buttonProps.label))),f(),c("ngIf",!i.contentTemplate&&!i._contentTemplate&&(i.badge||(i.buttonProps==null?null:i.buttonProps.badge))))},dependencies:[X,wt,xt,me,an,Qe,on,Ke,te,Y,g],encapsulation:2,changeDetection:0})}return e})();var Nt=(()=>{class e extends x{modelValue=G(void 0);$filled=R(()=>Et(this.modelValue()));writeModelValue(t){this.modelValue.set(t)}static \u0275fac=(()=>{let t;return function(i){return(t||(t=u(e)))(i||e)}})();static \u0275dir=y({type:e,features:[p]})}return e})();var pn=`
    .p-textarea {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('textarea.color');
        background: dt('textarea.background');
        padding-block: dt('textarea.padding.y');
        padding-inline: dt('textarea.padding.x');
        border: 1px solid dt('textarea.border.color');
        transition:
            background dt('textarea.transition.duration'),
            color dt('textarea.transition.duration'),
            border-color dt('textarea.transition.duration'),
            outline-color dt('textarea.transition.duration'),
            box-shadow dt('textarea.transition.duration');
        appearance: none;
        border-radius: dt('textarea.border.radius');
        outline-color: transparent;
        box-shadow: dt('textarea.shadow');
    }

    .p-textarea:enabled:hover {
        border-color: dt('textarea.hover.border.color');
    }

    .p-textarea:enabled:focus {
        border-color: dt('textarea.focus.border.color');
        box-shadow: dt('textarea.focus.ring.shadow');
        outline: dt('textarea.focus.ring.width') dt('textarea.focus.ring.style') dt('textarea.focus.ring.color');
        outline-offset: dt('textarea.focus.ring.offset');
    }

    .p-textarea.p-invalid {
        border-color: dt('textarea.invalid.border.color');
    }

    .p-textarea.p-variant-filled {
        background: dt('textarea.filled.background');
    }

    .p-textarea.p-variant-filled:enabled:hover {
        background: dt('textarea.filled.hover.background');
    }

    .p-textarea.p-variant-filled:enabled:focus {
        background: dt('textarea.filled.focus.background');
    }

    .p-textarea:disabled {
        opacity: 1;
        background: dt('textarea.disabled.background');
        color: dt('textarea.disabled.color');
    }

    .p-textarea::placeholder {
        color: dt('textarea.placeholder.color');
    }

    .p-textarea.p-invalid::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }

    .p-textarea-fluid {
        width: 100%;
    }

    .p-textarea-resizable {
        overflow: hidden;
        resize: none;
    }

    .p-textarea-sm {
        font-size: dt('textarea.sm.font.size');
        padding-block: dt('textarea.sm.padding.y');
        padding-inline: dt('textarea.sm.padding.x');
    }

    .p-textarea-lg {
        font-size: dt('textarea.lg.font.size');
        padding-block: dt('textarea.lg.padding.y');
        padding-inline: dt('textarea.lg.padding.x');
    }
`;var Vo=`
    ${pn}

    /* For PrimeNG */
    .p-textarea.ng-invalid.ng-dirty {
        border-color: dt('textarea.invalid.border.color');
    }
    .p-textarea.ng-invalid.ng-dirty::placeholder {
        color: dt('textarea.invalid.placeholder.color');
    }
`,Mo={root:({instance:e})=>["p-textarea p-component",{"p-filled":e.$filled(),"p-textarea-resizable ":e.autoResize,"p-variant-filled":e.$variant()==="filled","p-textarea-fluid":e.hasFluid,"p-inputfield-sm p-textarea-sm":e.pSize==="small","p-textarea-lg p-inputfield-lg":e.pSize==="large","p-invalid":e.invalid()}]},hn=(()=>{class e extends S{name="textarea";style=Vo;classes=Mo;static \u0275fac=(()=>{let t;return function(i){return(t||(t=u(e)))(i||e)}})();static \u0275prov=E({token:e,factory:e.\u0275fac})}return e})();var fn=new w("TEXTAREA_INSTANCE"),Cs=(()=>{class e extends Nt{componentName="Textarea";bindDirectiveInstance=l(g,{self:!0});$pcTextarea=l(fn,{optional:!0,skipSelf:!0})??void 0;pTextareaPT=b();pTextareaUnstyled=b();autoResize;pSize;variant=b();fluid=b(void 0,{transform:h});invalid=b(void 0,{transform:h});$variant=R(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());onResize=new z;ngControlSubscription;_componentStyle=l(hn);ngControl=l(nt,{optional:!0,self:!0});pcFluid=l(Tt,{optional:!0,host:!0,skipSelf:!0});get hasFluid(){return this.fluid()??!!this.pcFluid}constructor(){super(),J(()=>{let t=this.pTextareaPT();t&&this.directivePT.set(t)}),J(()=>{this.pTextareaUnstyled()&&this.directiveUnstyled.set(this.pTextareaUnstyled())})}onInit(){this.ngControl&&(this.ngControlSubscription=this.ngControl.valueChanges.subscribe(()=>{this.updateState()}))}onAfterViewInit(){this.autoResize&&this.resize(),this.cd.detectChanges()}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"])),this.autoResize&&this.resize(),this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value)}onInput(t){this.writeModelValue(t.target?.value),this.updateState()}resize(t){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(t||{})}updateState(){this.autoResize&&this.resize()}onDestroy(){this.ngControlSubscription&&this.ngControlSubscription.unsubscribe()}static \u0275fac=function(n){return new(n||e)};static \u0275dir=y({type:e,selectors:[["","pTextarea",""],["","pInputTextarea",""]],hostVars:2,hostBindings:function(n,i){n&1&&lt("input",function(s){return i.onInput(s)}),n&2&&v(i.cx("root"))},inputs:{pTextareaPT:[1,"pTextareaPT"],pTextareaUnstyled:[1,"pTextareaUnstyled"],autoResize:[2,"autoResize","autoResize",h],pSize:"pSize",variant:[1,"variant"],fluid:[1,"fluid"],invalid:[1,"invalid"]},outputs:{onResize:"onResize"},features:[C([hn,{provide:fn,useExisting:e},{provide:H,useExisting:e}]),L([g]),p]})}return e})();var gn=`
    .p-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: dt('tag.primary.background');
        color: dt('tag.primary.color');
        font-size: dt('tag.font.size');
        font-weight: dt('tag.font.weight');
        padding: dt('tag.padding');
        border-radius: dt('tag.border.radius');
        gap: dt('tag.gap');
    }

    .p-tag-icon {
        font-size: dt('tag.icon.size');
        width: dt('tag.icon.size');
        height: dt('tag.icon.size');
    }

    .p-tag-rounded {
        border-radius: dt('tag.rounded.border.radius');
    }

    .p-tag-success {
        background: dt('tag.success.background');
        color: dt('tag.success.color');
    }

    .p-tag-info {
        background: dt('tag.info.background');
        color: dt('tag.info.color');
    }

    .p-tag-warn {
        background: dt('tag.warn.background');
        color: dt('tag.warn.color');
    }

    .p-tag-danger {
        background: dt('tag.danger.background');
        color: dt('tag.danger.color');
    }

    .p-tag-secondary {
        background: dt('tag.secondary.background');
        color: dt('tag.secondary.color');
    }

    .p-tag-contrast {
        background: dt('tag.contrast.background');
        color: dt('tag.contrast.color');
    }
`;var So=["icon"],Io=["*"];function Ao(e,o){if(e&1&&tt(0,"span",4),e&2){let t=V(2);v(t.cx("icon")),c("ngClass",t.icon)("pBind",t.ptm("icon"))}}function Fo(e,o){if(e&1&&(st(0),k(1,Ao,1,4,"span",3),at()),e&2){let t=V();f(),c("ngIf",t.icon)}}function ko(e,o){}function To(e,o){e&1&&k(0,ko,0,0,"ng-template")}function No(e,o){if(e&1&&(it(0,"span",2),k(1,To,1,0,null,5),rt()),e&2){let t=V();v(t.cx("icon")),c("pBind",t.ptm("icon")),f(),c("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)}}var Po={root:({instance:e})=>["p-tag p-component",{"p-tag-info":e.severity==="info","p-tag-success":e.severity==="success","p-tag-warn":e.severity==="warn","p-tag-danger":e.severity==="danger","p-tag-secondary":e.severity==="secondary","p-tag-contrast":e.severity==="contrast","p-tag-rounded":e.rounded}],icon:"p-tag-icon",label:"p-tag-label"},bn=(()=>{class e extends S{name="tag";style=gn;classes=Po;static \u0275fac=(()=>{let t;return function(i){return(t||(t=u(e)))(i||e)}})();static \u0275prov=E({token:e,factory:e.\u0275fac})}return e})();var mn=new w("TAG_INSTANCE"),js=(()=>{class e extends x{componentName="Tag";$pcTag=l(mn,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=l(g,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;severity;value;icon;rounded;iconTemplate;templates;_iconTemplate;_componentStyle=l(bn);onAfterContentInit(){this.templates?.forEach(t=>{t.getType()==="icon"&&(this._iconTemplate=t.template)})}get dataP(){return this.cn({rounded:this.rounded,[this.severity]:this.severity})}static \u0275fac=(()=>{let t;return function(i){return(t||(t=u(e)))(i||e)}})();static \u0275cmp=F({type:e,selectors:[["p-tag"]],contentQueries:function(n,i,r){if(n&1&&Dt(r,So,4)(r,Vt,4),n&2){let s;Q(s=Z())&&(i.iconTemplate=s.first),Q(s=Z())&&(i.templates=s)}},hostVars:3,hostBindings:function(n,i){n&2&&(A("data-p",i.dataP),v(i.cn(i.cx("root"),i.styleClass)))},inputs:{styleClass:"styleClass",severity:"severity",value:"value",icon:"icon",rounded:[2,"rounded","rounded",h]},features:[C([bn,{provide:mn,useExisting:e},{provide:H,useExisting:e}]),L([g]),p],ngContentSelectors:Io,decls:5,vars:6,consts:[[4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"pBind"],[3,"class","ngClass","pBind",4,"ngIf"],[3,"ngClass","pBind"],[4,"ngTemplateOutlet"]],template:function(n,i){n&1&&(W(),q(0),k(1,Fo,2,1,"ng-container",0)(2,No,2,4,"span",1),it(3,"span",2),dt(4),rt()),n&2&&(f(),c("ngIf",!i.iconTemplate&&!i._iconTemplate),f(),c("ngIf",i.iconTemplate||i._iconTemplate),f(),v(i.cx("label")),c("pBind",i.ptm("label")),f(),ut(i.value))},dependencies:[X,be,wt,xt,Y,g],encapsulation:2,changeDetection:0})}return e})();var vn="Europe/Madrid";function Bo(){let e=new Date;return new Date(e.toLocaleString("en-US",{timeZone:vn}))}function yn(e){return e.toISOString().split("T")[0]}function Hs(){return yn(Bo())}function Oo(e=new Date){let o=new Date(e.toLocaleString("en-US",{timeZone:vn})),t=o.getDay(),n=o.getDate()-t+(t===0?-6:1);return o.setDate(n),yn(o)}function Ro(e){let[o,t,n]=e.split("-").map(Number);return new Date(o,t-1,n)}function jo(e){let o=Ro(e),t=new Date(o);t.setDate(t.getDate()+6);let n=i=>i.toLocaleDateString("es-ES",{day:"numeric",month:"short"});return`${n(o)} - ${n(t)}`}function Us(e=12){let o=[],t=new Date;for(let n=0;n<e;n++){let i=new Date(t);i.setDate(i.getDate()-n*7);let r=Oo(i);o.find(s=>s.weekStart===r)||o.push({weekStart:r,label:jo(r)})}return o}var Qs=(()=>{class e extends Nt{required=b(void 0,{transform:h});invalid=b(void 0,{transform:h});disabled=b(void 0,{transform:h});name=b();_disabled=G(!1);$disabled=R(()=>this.disabled()||this._disabled());onModelChange=()=>{};onModelTouched=()=>{};writeDisabledState(t){this._disabled.set(t)}writeControlValue(t,n){}writeValue(t){this.writeControlValue(t,this.writeModelValue.bind(this))}registerOnChange(t){this.onModelChange=t}registerOnTouched(t){this.onModelTouched=t}setDisabledState(t){this.writeDisabledState(t),this.cd.markForCheck()}static \u0275fac=(()=>{let t;return function(i){return(t||(t=u(e)))(i||e)}})();static \u0275dir=y({type:e,inputs:{required:[1,"required"],invalid:[1,"invalid"],disabled:[1,"disabled"],name:[1,"name"]},features:[p]})}return e})();export{Be as a,Oe as b,nt as c,ai as d,Qn as e,di as f,bi as g,qe as h,Qe as i,Tt as j,nn as k,on as l,an as m,Kr as n,Nt as o,Qs as p,Cs as q,js as r,Hs as s,Oo as t,Us as u};
