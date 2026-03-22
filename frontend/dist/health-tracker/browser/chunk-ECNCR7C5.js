import{a as se,b as we,d as de,e as ce,f as pe,m as Te,n as Me,p as ue,q as ke,r as Ee,s as Se}from"./chunk-S3YRH2BI.js";import{a as Oe}from"./chunk-ZJ25V4KC.js";import{c as ae,e as y,f as re}from"./chunk-5Y44FW4A.js";import{$ as F,$b as xe,Ba as S,Bb as X,Ea as H,Fa as Q,Fb as $,Ga as L,I as j,Ib as h,J as E,Jb as Z,La as v,M as R,Ma as _,Na as C,Nc as ne,O as g,Oa as B,Oc as z,Pa as D,Qa as u,Ra as r,Sa as a,T as A,Ta as m,U as N,Ub as ee,Vb as te,Za as I,Zc as oe,_a as V,_c as ie,a as x,ab as b,b as w,bb as c,ea as U,eb as G,ed as le,fa as ve,gb as T,ha as O,hb as M,jb as K,mb as f,nb as p,ob as P,ra as d,rb as q,sb as W,tb as Y,ub as J,wb as be,xb as _e,yb as Ce}from"./chunk-HMRRNVRQ.js";var Le=`
    .p-togglebutton {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        position: relative;
        color: dt('togglebutton.color');
        background: dt('togglebutton.background');
        border: 1px solid dt('togglebutton.border.color');
        padding: dt('togglebutton.padding');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
        border-radius: dt('togglebutton.border.radius');
        outline-color: transparent;
        font-weight: dt('togglebutton.font.weight');
    }

    .p-togglebutton-content {
        display: inline-flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
        gap: dt('togglebutton.gap');
        padding: dt('togglebutton.content.padding');
        background: transparent;
        border-radius: dt('togglebutton.content.border.radius');
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {
        background: dt('togglebutton.hover.background');
        color: dt('togglebutton.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked {
        background: dt('togglebutton.checked.background');
        border-color: dt('togglebutton.checked.border.color');
        color: dt('togglebutton.checked.color');
    }

    .p-togglebutton-checked .p-togglebutton-content {
        background: dt('togglebutton.content.checked.background');
        box-shadow: dt('togglebutton.content.checked.shadow');
    }

    .p-togglebutton:focus-visible {
        box-shadow: dt('togglebutton.focus.ring.shadow');
        outline: dt('togglebutton.focus.ring.width') dt('togglebutton.focus.ring.style') dt('togglebutton.focus.ring.color');
        outline-offset: dt('togglebutton.focus.ring.offset');
    }

    .p-togglebutton.p-invalid {
        border-color: dt('togglebutton.invalid.border.color');
    }

    .p-togglebutton:disabled {
        opacity: 1;
        cursor: default;
        background: dt('togglebutton.disabled.background');
        border-color: dt('togglebutton.disabled.border.color');
        color: dt('togglebutton.disabled.color');
    }

    .p-togglebutton-label,
    .p-togglebutton-icon {
        position: relative;
        transition: none;
    }

    .p-togglebutton-icon {
        color: dt('togglebutton.icon.color');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover .p-togglebutton-icon {
        color: dt('togglebutton.icon.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked .p-togglebutton-icon {
        color: dt('togglebutton.icon.checked.color');
    }

    .p-togglebutton:disabled .p-togglebutton-icon {
        color: dt('togglebutton.icon.disabled.color');
    }

    .p-togglebutton-sm {
        padding: dt('togglebutton.sm.padding');
        font-size: dt('togglebutton.sm.font.size');
    }

    .p-togglebutton-sm .p-togglebutton-content {
        padding: dt('togglebutton.content.sm.padding');
    }

    .p-togglebutton-lg {
        padding: dt('togglebutton.lg.padding');
        font-size: dt('togglebutton.lg.font.size');
    }

    .p-togglebutton-lg .p-togglebutton-content {
        padding: dt('togglebutton.content.lg.padding');
    }

    .p-togglebutton-fluid {
        width: 100%;
    }
`;var Ue=["icon"],He=["content"],Pe=n=>({$implicit:n});function Qe(n,o){n&1&&I(0)}function Ge(n,o){if(n&1&&m(0,"span",0),n&2){let e=c(3);f(e.cn(e.cx("icon"),e.checked?e.onIcon:e.offIcon,e.iconPos==="left"?e.cx("iconLeft"):e.cx("iconRight"))),u("pBind",e.ptm("icon"))}}function Ke(n,o){if(n&1&&_(0,Ge,1,3,"span",2),n&2){let e=c(2);C(e.onIcon||e.offIcon?0:-1)}}function qe(n,o){n&1&&I(0)}function We(n,o){if(n&1&&L(0,qe,1,0,"ng-container",1),n&2){let e=c(2);u("ngTemplateOutlet",e.iconTemplate||e._iconTemplate)("ngTemplateOutletContext",be(2,Pe,e.checked))}}function Ye(n,o){if(n&1&&(_(0,Ke,1,1)(1,We,1,4,"ng-container"),r(2,"span",0),p(3),a()),n&2){let e=c();C(e.iconTemplate?1:0),d(2),f(e.cx("label")),u("pBind",e.ptm("label")),d(),P(e.checked?e.hasOnLabel?e.onLabel:"\xA0":e.hasOffLabel?e.offLabel:"\xA0")}}var Je=`
    ${Le}

    /* For PrimeNG (iconPos) */
    .p-togglebutton-icon-right {
        order: 1;
    }

    .p-togglebutton.ng-invalid.ng-dirty {
        border-color: dt('togglebutton.invalid.border.color');
    }
`,Xe={root:({instance:n})=>["p-togglebutton p-component",{"p-togglebutton-checked":n.checked,"p-invalid":n.invalid(),"p-disabled":n.$disabled(),"p-togglebutton-sm p-inputfield-sm":n.size==="small","p-togglebutton-lg p-inputfield-lg":n.size==="large","p-togglebutton-fluid":n.fluid()}],content:"p-togglebutton-content",icon:"p-togglebutton-icon",iconLeft:"p-togglebutton-icon-left",iconRight:"p-togglebutton-icon-right",label:"p-togglebutton-label"},Be=(()=>{class n extends le{name="togglebutton";style=Je;classes=Xe;static \u0275fac=(()=>{let e;return function(i){return(e||(e=O(n)))(i||n)}})();static \u0275prov=E({token:n,factory:n.\u0275fac})}return n})();var De=new R("TOGGLEBUTTON_INSTANCE"),Ze={provide:se,useExisting:j(()=>he),multi:!0},he=(()=>{class n extends ue{componentName="ToggleButton";$pcToggleButton=g(De,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=g(y,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}onKeyDown(e){switch(e.code){case"Enter":this.toggle(e),e.preventDefault();break;case"Space":this.toggle(e),e.preventDefault();break}}toggle(e){!this.$disabled()&&!(this.allowEmpty===!1&&this.checked)&&(this.checked=!this.checked,this.writeModelValue(this.checked),this.onModelChange(this.checked),this.onModelTouched(),this.onChange.emit({originalEvent:e,checked:this.checked}),this.cd.markForCheck())}onLabel="Yes";offLabel="No";onIcon;offIcon;ariaLabel;ariaLabelledBy;styleClass;inputId;tabindex=0;iconPos="left";autofocus;size;allowEmpty;fluid=$(void 0,{transform:h});onChange=new F;iconTemplate;contentTemplate;templates;checked=!1;onInit(){(this.checked===null||this.checked===void 0)&&(this.checked=!1)}_componentStyle=g(Be);onBlur(){this.onModelTouched()}get hasOnLabel(){return this.onLabel&&this.onLabel.length>0}get hasOffLabel(){return this.offLabel&&this.offLabel.length>0}get active(){return this.checked===!0}_iconTemplate;_contentTemplate;onAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"icon":this._iconTemplate=e.template;break;case"content":this._contentTemplate=e.template;break;default:this._contentTemplate=e.template;break}})}writeControlValue(e,t){this.checked=e,t(e),this.cd.markForCheck()}get dataP(){return this.cn({checked:this.active,invalid:this.invalid(),[this.size]:this.size})}static \u0275fac=(()=>{let e;return function(i){return(e||(e=O(n)))(i||n)}})();static \u0275cmp=S({type:n,selectors:[["p-toggleButton"],["p-togglebutton"],["p-toggle-button"]],contentQueries:function(t,i,l){if(t&1&&G(l,Ue,4)(l,He,4)(l,oe,4),t&2){let s;T(s=M())&&(i.iconTemplate=s.first),T(s=M())&&(i.contentTemplate=s.first),T(s=M())&&(i.templates=s)}},hostVars:11,hostBindings:function(t,i){t&1&&b("keydown",function(s){return i.onKeyDown(s)})("click",function(s){return i.toggle(s)}),t&2&&(v("aria-labelledby",i.ariaLabelledBy)("aria-label",i.ariaLabel)("aria-pressed",i.checked?"true":"false")("role","button")("tabindex",i.tabindex!==void 0?i.tabindex:i.$disabled()?-1:0)("data-pc-name","togglebutton")("data-p-checked",i.active)("data-p-disabled",i.$disabled())("data-p",i.dataP),f(i.cn(i.cx("root"),i.styleClass)))},inputs:{onLabel:"onLabel",offLabel:"offLabel",onIcon:"onIcon",offIcon:"offIcon",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",styleClass:"styleClass",inputId:"inputId",tabindex:[2,"tabindex","tabindex",Z],iconPos:"iconPos",autofocus:[2,"autofocus","autofocus",h],size:"size",allowEmpty:"allowEmpty",fluid:[1,"fluid"]},outputs:{onChange:"onChange"},features:[J([Ze,Be,{provide:De,useExisting:n},{provide:ae,useExisting:n}]),H([Te,y]),Q],decls:3,vars:9,consts:[[3,"pBind"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"class","pBind"]],template:function(t,i){t&1&&(r(0,"span",0),L(1,Qe,1,0,"ng-container",1),_(2,Ye,4,5),a()),t&2&&(f(i.cx("content")),u("pBind",i.ptm("content")),v("data-p",i.dataP),d(),u("ngTemplateOutlet",i.contentTemplate||i._contentTemplate)("ngTemplateOutletContext",be(7,Pe,i.checked)),d(),C(i.contentTemplate?-1:2))},dependencies:[te,ee,ie,re,y],encapsulation:2,changeDetection:0})}return n})();var Ae=`
    .p-selectbutton {
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        outline-color: transparent;
        border-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton {
        border-radius: 0;
        border-width: 1px 1px 1px 0;
    }

    .p-selectbutton .p-togglebutton:focus-visible {
        position: relative;
        z-index: 1;
    }

    .p-selectbutton .p-togglebutton:first-child {
        border-inline-start-width: 1px;
        border-start-start-radius: dt('selectbutton.border.radius');
        border-end-start-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton:last-child {
        border-start-end-radius: dt('selectbutton.border.radius');
        border-end-end-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton.p-invalid {
        outline: 1px solid dt('selectbutton.invalid.border.color');
        outline-offset: 0;
    }

    .p-selectbutton-fluid {
        width: 100%;
    }
    
    .p-selectbutton-fluid .p-togglebutton {
        flex: 1 1 0;
    }
`;var tt=["item"],nt=(n,o)=>({$implicit:n,index:o});function ot(n,o){return this.getOptionLabel(o)}function it(n,o){n&1&&I(0)}function lt(n,o){if(n&1&&L(0,it,1,0,"ng-container",3),n&2){let e=c(2),t=e.$implicit,i=e.$index,l=c();u("ngTemplateOutlet",l.itemTemplate||l._itemTemplate)("ngTemplateOutletContext",_e(2,nt,t,i))}}function at(n,o){n&1&&L(0,lt,1,5,"ng-template",null,0,Ce)}function rt(n,o){if(n&1){let e=V();r(0,"p-togglebutton",2),b("onChange",function(i){let l=A(e),s=l.$implicit,k=l.$index,me=c();return N(me.onOptionSelect(i,s,k))}),_(1,at,2,0),a()}if(n&2){let e=o.$implicit,t=c();u("autofocus",t.autofocus)("styleClass",t.styleClass)("ngModel",t.isSelected(e))("onLabel",t.getOptionLabel(e))("offLabel",t.getOptionLabel(e))("disabled",t.$disabled()||t.isOptionDisabled(e))("allowEmpty",t.getAllowEmpty())("size",t.size())("fluid",t.fluid())("pt",t.ptm("pcToggleButton"))("unstyled",t.unstyled()),d(),C(t.itemTemplate||t._itemTemplate?1:-1)}}var st=`
    ${Ae}

    /* For PrimeNG */
    .p-selectbutton.ng-invalid.ng-dirty {
        outline: 1px solid dt('selectbutton.invalid.border.color');
        outline-offset: 0;
    }
`,dt={root:({instance:n})=>["p-selectbutton p-component",{"p-invalid":n.invalid(),"p-selectbutton-fluid":n.fluid()}]},Ne=(()=>{class n extends le{name="selectbutton";style=st;classes=dt;static \u0275fac=(()=>{let e;return function(i){return(e||(e=O(n)))(i||n)}})();static \u0275prov=E({token:n,factory:n.\u0275fac})}return n})();var Fe=new R("SELECTBUTTON_INSTANCE"),ct={provide:se,useExisting:j(()=>ye),multi:!0},ye=(()=>{class n extends ue{componentName="SelectButton";options;optionLabel;optionValue;optionDisabled;get unselectable(){return this._unselectable}_unselectable=!1;set unselectable(e){this._unselectable=e,this.allowEmpty=!e}tabindex=0;multiple;allowEmpty=!0;styleClass;ariaLabelledBy;dataKey;autofocus;size=$();fluid=$(void 0,{transform:h});onOptionClick=new F;onChange=new F;itemTemplate;_itemTemplate;get equalityKey(){return this.optionValue?null:this.dataKey}value;focusedIndex=0;_componentStyle=g(Ne);$pcSelectButton=g(Fe,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=g(y,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}getAllowEmpty(){return this.multiple?this.allowEmpty||this.value?.length!==1:this.allowEmpty}getOptionLabel(e){return this.optionLabel?ne(e,this.optionLabel):e.label!=null?e.label:e}getOptionValue(e){return this.optionValue?ne(e,this.optionValue):this.optionLabel||e.value===void 0?e:e.value}isOptionDisabled(e){return this.optionDisabled?ne(e,this.optionDisabled):e.disabled!==void 0?e.disabled:!1}onOptionSelect(e,t,i){if(this.$disabled()||this.isOptionDisabled(t))return;let l=this.isSelected(t);if(l&&this.unselectable)return;let s=this.getOptionValue(t),k;if(this.multiple)l?k=this.value.filter(me=>!z(me,s,this.equalityKey||void 0)):k=this.value?[...this.value,s]:[s];else{if(l&&!this.allowEmpty)return;k=l?null:s}this.focusedIndex=i,this.value=k,this.writeModelValue(this.value),this.onModelChange(this.value),this.onChange.emit({originalEvent:e,value:this.value}),this.onOptionClick.emit({originalEvent:e,option:t,index:i})}changeTabIndexes(e,t){let i,l;for(let s=0;s<=this.el.nativeElement.children.length-1;s++)this.el.nativeElement.children[s].getAttribute("tabindex")==="0"&&(i={elem:this.el.nativeElement.children[s],index:s});t==="prev"?i.index===0?l=this.el.nativeElement.children.length-1:l=i.index-1:i.index===this.el.nativeElement.children.length-1?l=0:l=i.index+1,this.focusedIndex=l,this.el.nativeElement.children[l].focus()}onFocus(e,t){this.focusedIndex=t}onBlur(){this.onModelTouched()}removeOption(e){this.value=this.value.filter(t=>!z(t,this.getOptionValue(e),this.dataKey))}isSelected(e){let t=!1,i=this.getOptionValue(e);if(this.multiple){if(this.value&&Array.isArray(this.value)){for(let l of this.value)if(z(l,i,this.dataKey)){t=!0;break}}}else t=z(this.getOptionValue(e),this.value,this.equalityKey||void 0);return t}templates;onAfterContentInit(){this.templates.forEach(e=>{e.getType()==="item"&&(this._itemTemplate=e.template)})}writeControlValue(e,t){this.value=e,t(this.value),this.cd.markForCheck()}get dataP(){return this.cn({invalid:this.invalid()})}static \u0275fac=(()=>{let e;return function(i){return(e||(e=O(n)))(i||n)}})();static \u0275cmp=S({type:n,selectors:[["p-selectButton"],["p-selectbutton"],["p-select-button"]],contentQueries:function(t,i,l){if(t&1&&G(l,tt,4)(l,oe,4),t&2){let s;T(s=M())&&(i.itemTemplate=s.first),T(s=M())&&(i.templates=s)}},hostVars:5,hostBindings:function(t,i){t&2&&(v("role","group")("aria-labelledby",i.ariaLabelledBy)("data-p",i.dataP),f(i.cx("root")))},inputs:{options:"options",optionLabel:"optionLabel",optionValue:"optionValue",optionDisabled:"optionDisabled",unselectable:[2,"unselectable","unselectable",h],tabindex:[2,"tabindex","tabindex",Z],multiple:[2,"multiple","multiple",h],allowEmpty:[2,"allowEmpty","allowEmpty",h],styleClass:"styleClass",ariaLabelledBy:"ariaLabelledBy",dataKey:"dataKey",autofocus:[2,"autofocus","autofocus",h],size:[1,"size"],fluid:[1,"fluid"]},outputs:{onOptionClick:"onOptionClick",onChange:"onChange"},features:[J([ct,Ne,{provide:Fe,useExisting:n},{provide:ae,useExisting:n}]),H([y]),Q],decls:2,vars:0,consts:[["content",""],[3,"autofocus","styleClass","ngModel","onLabel","offLabel","disabled","allowEmpty","size","fluid","pt","unstyled"],[3,"onChange","autofocus","styleClass","ngModel","onLabel","offLabel","disabled","allowEmpty","size","fluid","pt","unstyled"],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(t,i){t&1&&B(0,rt,2,12,"p-togglebutton",1,ot,!0),t&2&&D(i.options)},dependencies:[he,pe,de,ce,te,ee,ie,re],encapsulation:2,changeDetection:0})}return n})();var ge=class n{http=g(xe);apiUrl=`${Oe.apiBaseUrl}/daily-logs`;getByDate(o){return this.http.get(`${this.apiUrl}/${o}`)}save(o,e){return this.http.put(`${this.apiUrl}/${e}`,o)}getHistory(o=30){return this.http.get(`${this.apiUrl}/history?days=${o}`)}static \u0275fac=function(e){return new(e||n)};static \u0275prov=E({token:n,factory:n.\u0275fac,providedIn:"root"})};var Ie=(n,o)=>o.key,pt=(n,o)=>o.value;function ut(n,o){if(n&1&&(r(0,"div",35),m(1,"i"),a()),n&2){let e=c().$implicit;K("background",e.gradient),d(),f("pi "+e.icon),K("color",e.iconColor)}}function gt(n,o){if(n&1&&_(0,ut,2,6,"div",34),n&2){let e=o.$implicit,t=c();C(t.isMealActive(e.key)?0:-1)}}function mt(n,o){if(n&1){let e=V();r(0,"p-button",36),b("onClick",function(){let i=A(e).$implicit,l=c();return N(l.toggleMeal(i.key))}),a()}if(n&2){let e=o.$implicit,t=c();u("label",e.label)("icon","pi "+e.icon)("severity",t.isMealActive(e.key)?"success":"secondary"),v("data-active",t.isMealActive(e.key))("data-color",e.iconColor)}}function bt(n,o){if(n&1){let e=V();r(0,"p-button",37),b("onClick",function(){let i=A(e).$implicit,l=c();return N(l.setActivity(i.value))}),a()}if(n&2){let e=o.$implicit,t=c();u("label",e.label)("icon","pi "+e.icon)("severity",t.isActivityActive(e.value)?"success":"secondary"),v("data-active",t.isActivityActive(e.value))}}var Ve=class n{dailyLogService=g(ge);currentDate=Se();note="";energyValue="medium";appetiteValue="normal";saving=U(!1);saved=U(!1);log=U({date:this.currentDate,breakfast:!1,lunch:!1,snack:!1,dinner:!1,activityType:"none",energy:"medium",appetite:"normal"});mealOptions=[{key:"breakfast",label:"Desayuno",icon:"pi-sun",bgColor:"var(--color-meal-breakfast-solid)",iconColor:"var(--color-meal-breakfast-icon)",gradient:"linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)"},{key:"lunch",label:"Almuerzo",icon:"pi-coffee",bgColor:"var(--color-meal-lunch-solid)",iconColor:"var(--color-meal-lunch-icon)",gradient:"linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)"},{key:"snack",label:"Merienda",icon:"pi-apple",bgColor:"var(--color-meal-snack-solid)",iconColor:"var(--color-meal-snack-icon)",gradient:"linear-gradient(135deg, #e9d5ff 0%, #c4b5fd 100%)"},{key:"dinner",label:"Cena",icon:"pi-moon",bgColor:"var(--color-meal-dinner-solid)",iconColor:"var(--color-meal-dinner-icon)",gradient:"linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%)"}];activityOptions=[{value:"none",label:"Ninguna",icon:"pi-minus",color:"#64748b",bgColor:"#e2e8f0",gradient:"linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)"},{value:"walk",label:"Paseo",icon:"pi-directions-walk",color:"#059669",bgColor:"#a7f3d0",gradient:"linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)"},{value:"exercise",label:"Ejercicio",icon:"pi-bolt",color:"#d97706",bgColor:"#fde68a",gradient:"linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)"},{value:"walk_and_exercise",label:"Ambos",icon:"pi-star",color:"#4f46e5",bgColor:"#c7d2fe",gradient:"linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)"}];energyOptions=[{value:"low",label:"Baja"},{value:"medium",label:"Media"},{value:"high",label:"Alta"}];appetiteOptions=[{value:"low",label:"Bajo"},{value:"normal",label:"Normal"},{value:"high",label:"Alto"}];greeting=X(()=>{let o=new Date().getHours();return o<12?"Buenos d\xEDas":o<18?"Buenas tardes":"Buenas noches"});formattedDate=X(()=>new Date(this.currentDate+"T00:00:00").toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long"}));todaySummary=X(()=>{let o=["breakfast","lunch","snack","dinner"].filter(e=>this.log()[e]);return o.length===0?"Sin registrar todav\xEDa":o.length===4?"D\xEDa completo - \xA1Excelente!":`${o.length} de 4 comidas registradas`});constructor(){this.loadTodayLog(),ve(()=>{let o=this.log();this.autoSave(o)})}loadTodayLog(){this.dailyLogService.getByDate(this.currentDate).subscribe({next:o=>{o&&(this.log.set(o),this.note=o.note||"",this.energyValue=o.energy||"medium",this.appetiteValue=o.appetite||"normal")},error:o=>console.error("Error loading daily log:",o)})}toggleMeal(o){let e=this.log();this.log.set(w(x({},e),{[o]:!e[o]}))}setActivity(o){let e=this.log();this.log.set(w(x({},e),{activityType:o}))}setEnergy(o){this.energyValue=o;let e=this.log();this.log.set(w(x({},e),{energy:o}))}setAppetite(o){this.appetiteValue=o;let e=this.log();this.log.set(w(x({},e),{appetite:o}))}saveNote(){let o=this.log();this.log.set(w(x({},o),{note:this.note}))}autoSave(o){this.saving.set(!0),this.dailyLogService.save(w(x({},o),{date:this.currentDate}),this.currentDate).subscribe({next:()=>{this.saving.set(!1),this.saved.set(!0),setTimeout(()=>this.saved.set(!1),2e3)},error:e=>{console.error("Error saving:",e),this.saving.set(!1)}})}isMealActive(o){return!!this.log()[o]}isActivityActive(o){return this.log().activityType===o}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=S({type:n,selectors:[["app-today"]],decls:77,vars:14,consts:[[1,"animate-fade-in"],[1,"page-header"],[1,"page-title"],[1,"page-subtitle","capitalize"],["styleClass","shadow-sm",3,"value","severity","icon"],[1,"hero-section"],[1,"flex","items-start","justify-between"],[1,"flex","items-center","gap-4","sm:gap-5"],[1,"hero-icon-lg"],[1,"pi","pi-sun"],[1,"hero-title"],[1,"hero-subtitle"],[1,"flex","gap-2","sm:gap-3"],[1,"grid","grid-cols-1","lg:grid-cols-2","gap-5","mb-5"],[1,"widget-card"],[1,"widget-header"],[1,"widget-icon",2,"background","linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)"],[1,"pi","pi-utensils",2,"color","#d97706"],[1,"widget-title"],[1,"widget-subtitle"],[1,"grid","grid-cols-2","sm:grid-cols-4","gap-3","sm:gap-4"],["styleClass","meal-btn w-full",3,"label","icon","severity"],[1,"widget-icon",2,"background","linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)"],[1,"pi","pi-directions-run",2,"color","#059669"],["styleClass","activity-btn w-full",3,"label","icon","severity"],[1,"grid","grid-cols-1","sm:grid-cols-2","gap-5","mb-5"],[1,"pi","pi-bolt",2,"color","#d97706"],["optionLabel","label","optionValue","value","styleClass","w-full energy-selector",3,"ngModelChange","onChange","options","ngModel"],[1,"widget-icon",2,"background","linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)"],[1,"pi","pi-heart",2,"color","#db2777"],["optionLabel","label","optionValue","value","styleClass","w-full appetite-selector",3,"ngModelChange","onChange","options","ngModel"],[1,"widget-icon",2,"background","linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)"],[1,"pi","pi-pencil",2,"color","#7c3aed"],["pTextarea","","placeholder","\xBFC\xF3mo te sientes? \xBFQu\xE9 has notado hoy? Escribe aqu\xED tus observaciones...","rows","4",1,"w-full",3,"ngModelChange","blur","ngModel","autoResize"],[1,"chip-meal",3,"background"],[1,"chip-meal"],["styleClass","meal-btn w-full",3,"onClick","label","icon","severity"],["styleClass","activity-btn w-full",3,"onClick","label","icon","severity"]],template:function(e,t){e&1&&(r(0,"div",0)(1,"div",1)(2,"div")(3,"h2",2),p(4),a(),r(5,"p",3),p(6),a()(),m(7,"p-tag",4),a(),r(8,"div",5)(9,"div",6)(10,"div",7)(11,"div",8),m(12,"i",9),a(),r(13,"div")(14,"h3",10),p(15,"Resumen del d\xEDa"),a(),r(16,"p",11),p(17),a()()(),r(18,"div",12),B(19,gt,1,1,null,null,Ie),a()()(),r(21,"div",13)(22,"div",14)(23,"div",15)(24,"div",16),m(25,"i",17),a(),r(26,"div")(27,"h4",18),p(28,"Comidas del d\xEDa"),a(),r(29,"p",19),p(30,"Toca para marcar las comidas tomadas"),a()()(),r(31,"div",20),B(32,mt,1,5,"p-button",21,Ie),a()(),r(34,"div",14)(35,"div",15)(36,"div",22),m(37,"i",23),a(),r(38,"div")(39,"h4",18),p(40,"Actividad f\xEDsica"),a(),r(41,"p",19),p(42,"\xBFQu\xE9 has hecho hoy?"),a()()(),r(43,"div",20),B(44,bt,1,4,"p-button",24,pt),a()()(),r(46,"div",25)(47,"div",14)(48,"div",15)(49,"div",16),m(50,"i",26),a(),r(51,"div")(52,"h4",18),p(53,"Nivel de energ\xEDa"),a(),r(54,"p",19),p(55,"\xBFC\xF3mo te sientes hoy?"),a()()(),r(56,"p-selectbutton",27),Y("ngModelChange",function(l){return W(t.energyValue,l)||(t.energyValue=l),l}),b("onChange",function(l){return t.setEnergy(l.value)}),a()(),r(57,"div",14)(58,"div",15)(59,"div",28),m(60,"i",29),a(),r(61,"div")(62,"h4",18),p(63,"Apetito"),a(),r(64,"p",19),p(65,"\xBFC\xF3mo ha sido tu hambre hoy?"),a()()(),r(66,"p-selectbutton",30),Y("ngModelChange",function(l){return W(t.appetiteValue,l)||(t.appetiteValue=l),l}),b("onChange",function(l){return t.setAppetite(l.value)}),a()()(),r(67,"div",14)(68,"div",15)(69,"div",31),m(70,"i",32),a(),r(71,"div")(72,"h4",18),p(73,"Notas personales"),a(),r(74,"p",19),p(75,"Reflexiones sobre tu d\xEDa"),a()()(),r(76,"textarea",33),Y("ngModelChange",function(l){return W(t.note,l)||(t.note=l),l}),b("blur",function(){return t.saveNote()}),a()()()),e&2&&(d(4),P(t.greeting()),d(2),P(t.formattedDate()),d(),K("visibility",t.saving()||t.saved()?"visible":"hidden"),u("value",t.saving()?"Guardando...":t.saved()?"Guardado":"")("severity",t.saving()?"warn":"success")("icon",t.saving()?"pi pi-spin pi-spinner":"pi pi-check"),d(10),P(t.todaySummary()),d(2),D(t.mealOptions),d(13),D(t.mealOptions),d(12),D(t.activityOptions),d(12),u("options",t.energyOptions),q("ngModel",t.energyValue),d(10),u("options",t.appetiteOptions),q("ngModel",t.appetiteValue),d(10),q("ngModel",t.note),u("autoResize",!0))},dependencies:[pe,we,de,ce,Me,ye,ke,Ee],styles:['[_nghost-%COMP%]{display:block}.widget-card[_ngcontent-%COMP%]{@apply bg-white rounded-2xl p-5 border border-slate-200/80;box-shadow:0 1px 3px #0000000a;transition:all .25s cubic-bezier(.4,0,.2,1)}@media(hover:hover){.widget-card[_ngcontent-%COMP%]:hover{@apply border-teal-200;box-shadow:0 4px 12px #0000000f;transform:translateY(-1px)}}@media(min-width:640px){.widget-card[_ngcontent-%COMP%]{@apply p-6 rounded-2xl;}}.widget-header[_ngcontent-%COMP%]{@apply flex items-center gap-3 mb-5;}@media(min-width:640px){.widget-header[_ngcontent-%COMP%]{@apply gap-4 mb-6;}}.widget-icon[_ngcontent-%COMP%]{@apply w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0;box-shadow:0 4px 12px #00000014}@media(min-width:640px){.widget-icon[_ngcontent-%COMP%]{@apply w-14 h-14;}}.widget-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{@apply text-xl;}@media(min-width:640px){.widget-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{@apply text-2xl;}}.widget-title[_ngcontent-%COMP%]{@apply text-base sm:text-lg font-bold text-slate-900;}.widget-subtitle[_ngcontent-%COMP%]{@apply text-xs sm:text-sm text-slate-500 mt-0.5;}[_nghost-%COMP%]     .meal-btn[data-active=true], [_nghost-%COMP%]     .activity-btn{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px 8px!important;min-height:80px;border-radius:16px!important}@media(min-width:640px){[_nghost-%COMP%]     .meal-btn[data-active=true], [_nghost-%COMP%]     .activity-btn{padding:14px 10px!important;min-height:96px}}[_nghost-%COMP%]     .meal-btn[data-active=true], [_nghost-%COMP%]     .activity-btn.p-button-success{background:linear-gradient(135deg,#10b981,#059669)!important;border-color:#10b981!important;color:#fff;box-shadow:0 4px 12px #10b9814d}[_nghost-%COMP%]     .meal-btn .p-button-label, [_nghost-%COMP%]     .activity-btn .p-button-label{@apply text-xs sm:text-sm font-semibold mt-2;}[_nghost-%COMP%]     .meal-btn .p-button-icon, [_nghost-%COMP%]     .activity-btn .p-button-icon{@apply text-2xl sm:text-3xl;}[_nghost-%COMP%]     .energy-selector .p-selectbutton, [_nghost-%COMP%]     .appetite-selector .p-selectbutton{display:flex;width:100%;gap:8px}[_nghost-%COMP%]     .energy-selector .p-button, [_nghost-%COMP%]     .appetite-selector .p-button{flex:1;justify-content:center;padding:12px 8px;border-radius:14px;font-size:.875rem}@media(min-width:640px){[_nghost-%COMP%]     .energy-selector .p-button, [_nghost-%COMP%]     .appetite-selector .p-button{padding:14px 20px;border-radius:16px;font-size:1rem}}[_nghost-%COMP%]     .energy-selector .p-button .p-button-label, [_nghost-%COMP%]     .appetite-selector .p-button .p-button-label{font-weight:600}.hero-section[_ngcontent-%COMP%]{@apply bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-500 rounded-2xl p-5 sm:p-6 mb-5 text-white relative overflow-hidden;box-shadow:0 8px 32px #0d948859,inset 0 1px #ffffff40}.hero-section[_ngcontent-%COMP%]:before{content:"";position:absolute;top:-50%;right:-20%;width:60%;height:150%;background:radial-gradient(circle,rgba(255,255,255,.1) 0%,transparent 70%);pointer-events:none}@media(min-width:640px){.hero-section[_ngcontent-%COMP%]{@apply p-6 mb-6;}}.hero-icon-lg[_ngcontent-%COMP%]{@apply w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center;background:#fff3;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:0 4px 16px #0000001a}@media(min-width:640px){.hero-icon-lg[_ngcontent-%COMP%]{@apply w-18 h-18;}}.hero-icon-lg[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{@apply text-2xl sm:text-3xl text-white;}.hero-title[_ngcontent-%COMP%]{@apply text-xl sm:text-2xl font-bold text-white;}@media(min-width:640px){.hero-title[_ngcontent-%COMP%]{@apply text-2xl;}}.hero-subtitle[_ngcontent-%COMP%]{@apply text-sm sm:text-base text-white/80 mt-1;}.chip-meal[_ngcontent-%COMP%]{@apply inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl;box-shadow:0 4px 12px #00000026}@media(min-width:640px){.chip-meal[_ngcontent-%COMP%]{@apply w-12 h-12 rounded-xl;}.chip-meal[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{@apply text-xl;}}.chip-meal[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{@apply text-lg;}']})};export{Ve as TodayComponent};
