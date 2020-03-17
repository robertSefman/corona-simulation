(this["webpackJsonpcorona-simulation"]=this["webpackJsonpcorona-simulation"]||[]).push([[0],{25:function(e,t,n){e.exports=n(31)},30:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(17),c=n.n(r),l=(n(30),n(3)),o=n(5),u=n(7),f=n(2),d=n(18),s=function(e){var t=e.x,n=e.y,a=e.infected,r=e.dead,c=e.recovered,l="rgb(146, 120, 226)",o="white";return r?null:(null!==a?(l="rgb(246, 102, 64)",o="rgb(246, 102, 64)"):c&&(l="rgba(146, 119, 227, 0.5)",o="rgba(146, 119, 227, 0.5)"),i.a.createElement("circle",{cx:t,cy:n,r:5,style:{fill:o,stroke:l,strokeWidth:2}}))},b=function(e){var t=e.label,n=e.value,a=e.setter,r=e.unit,c=void 0===r?"%":r,l=e.editable;return i.a.createElement("p",null,t,":"," ",l?i.a.createElement("input",{type:"range",min:"0",max:"100",value:n,onChange:function(e){return a(e.target.value)},step:1}):null,n,c)};function h(e){var t=e.cx,n=e.cy,a=e.width,i=e.height,r=Math.ceil(i/15),c=f.e().domain(f.c(0,r)).range([n-i/2,n+i/2]),l=f.d().domain([0,r/2,r]).range([15,a,15]);return f.c(0,r).map((function(e){return function(e){var t=e.cx,n=e.cy,a=e.width,i=Math.floor(a/15),r=f.e().domain(f.c(0,i)).range([t-a/2,t+a/2]);return f.c(0,i).map((function(e){return{x:r(e),y:n,key:Object(d.a)(25)(),infected:null}}))}({cx:t,cy:c(e),width:l(e)})})).reduce((function(e,t){return[].concat(Object(u.a)(e),Object(u.a)(t))}))}function m(e){var t=e.width,n=e.height,i=e.mortality,r=e.virality,c=e.lengthOfInfection,d=e.socialDistancing,s=e.reinfectability,b=Object(a.useState)(h({cx:t/2,cy:n/2,width:t-15,height:n-15})),m=Object(l.a)(b,2),g=m[0],v=m[1],y=Object(a.useState)(!1),p=Object(l.a)(y,2),O=p[0],j=p[1],E=Object(a.useState)(0),w=Object(l.a)(E,2),S=w[0],x=w[1];return Object(a.useEffect)((function(){if(O){var e=f.f((function(e){var t=Math.floor(e/60);v((function(e){var n=Object(u.a)(e);return n=function(e,t,n,a){return e.map((function(e){return e.infected?f.b(0,1)()<n/a?Object(o.a)({},e,{dead:!0,infected:null}):t-e.infected>a?Object(o.a)({},e,{infected:null,recovered:!0}):e:e}))}(n=function(e,t,n,a,i){var r=t.map((function(e){return e.key}));return e.map((function(e){return r.includes(e.key)?e.recovered?f.b(0,100)()<a*(i/100)?Object(o.a)({},e,{infected:n,recovered:!1}):e:f.b(0,100)()<a?Object(o.a)({},e,{infected:n,recovered:!1}):e:e}))}(n=function(e,t){var n=1-t/100,a=f.b(-3*n,3*n);return e.map((function(e){return e.dead?e:Object(o.a)({},e,{x:e.x+a(),y:e.y+a()})}))}(n,d),function(e){return e.filter((function(e){return null!==e.infected})).map((function(t){var n=f.a().extent([[-1,-1],[10,10]]).x((function(e){return e.x})).y((function(e){return e.y})).addAll(e.filter((function(e){return!e.infected})).filter((function(e){return e.key!==t.key}))).find(t.x,t.y,10);return n||null})).filter((function(e){return null!==e}))}(n),t,r,s),t,i/100,c)})),x(t)}));return function(){return e.stop()}}}),[c,i,s,O,d,r]),{population:g,startSimulation:function(){var e=Object(u.a)(g);e[Math.floor(Math.random()*e.length)].infected=0,v(e),x(0),j(!0)},stopSimulation:function(){j(!1)},simulating:O,iterationCount:S}}var g=function(e){var t=e.width,n=e.height,r=e.defaultMortality,c=void 0===r?4:r,o=e.defaultVirality,u=void 0===o?50:o,f=e.defaultLengthOfInfection,d=void 0===f?40:f,h=e.defaultSocialDistancing,g=void 0===h?0:h,v=e.defaultReinfectability,y=void 0===v?30:v,p=Object(a.useState)(c),O=Object(l.a)(p,2),j=O[0],E=O[1],w=Object(a.useState)(u),S=Object(l.a)(w,2),x=S[0],k=S[1],I=Object(a.useState)(d),M=Object(l.a)(I,2),D=M[0],C=M[1],R=Object(a.useState)(g),L=Object(l.a)(R,2),V=L[0],W=L[1],A=Object(a.useState)(y),B=Object(l.a)(A,2),J=B[0],P=B[1],z=m({width:t,height:n,mortality:j,virality:x,socialDistancing:V,lengthOfInfection:D,reinfectability:J}),F=z.population,N=z.startSimulation,U=z.stopSimulation,$=z.simulating,q=z.iterationCount;return i.a.createElement(i.a.Fragment,null,i.a.createElement("svg",{style:{width:t,height:n}},F.map((function(e){return i.a.createElement(s,e)}))),i.a.createElement("div",null,$?i.a.createElement("button",{onClick:U},"Stop"):i.a.createElement("button",{onClick:N},"Start simulation")),i.a.createElement("p",null,"Population: ",F.filter((function(e){return!e.dead})).length,", Infected:"," ",F.filter((function(e){return null!==e.infected})).length,", Dead:"," ",F.filter((function(e){return e.dead})).length,", Recovered:"," ",F.filter((function(e){return e.recovered})).length),$?i.a.createElement("p",null,"Iterations: ",q):null,i.a.createElement(b,{label:"Social distancing",value:V,setter:W,editable:!$}),i.a.createElement(b,{label:"Mortality",value:j,setter:E,editable:!$}),i.a.createElement(b,{label:"Virality",value:x,setter:k,editable:!$}),i.a.createElement(b,{label:"Reinfectability",value:J,setter:P,editable:!$}),i.a.createElement(b,{label:"Length of infection",value:D,setter:C,unit:"steps",editable:!$}))};var v=function(){var e=new URLSearchParams(window.location.search);return i.a.createElement("div",{className:"App"},i.a.createElement("h1",null,e.get("title")||"Visualizing the spread of viruses in a population"),i.a.createElement(g,{cx:400,cy:200,width:400,height:300,defaultMortality:e.get("mortality")||4,defaultVirality:e.get("virality")||50,defaultLengthOfInfection:e.get("lengthOfInfection")||40,defaultSocialDistancing:e.get("socialDistancing")||0,defaultReinfectability:e.get("reinfectability")||30}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[25,1,2]]]);
//# sourceMappingURL=main.aab1159a.chunk.js.map