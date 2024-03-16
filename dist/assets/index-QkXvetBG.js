var ot=Object.defineProperty;var st=(e,a,g)=>a in e?ot(e,a,{enumerable:!0,configurable:!0,writable:!0,value:g}):e[a]=g;var q=(e,a,g)=>(st(e,typeof a!="symbol"?a+"":a,g),g);(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))k(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const I of r.addedNodes)I.tagName==="LINK"&&I.rel==="modulepreload"&&k(I)}).observe(document,{childList:!0,subtree:!0});function g(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function k(o){if(o.ep)return;o.ep=!0;const r=g(o);fetch(o.href,r)}})();class W{constructor(a,g,k,o,r,I){q(this,"name");q(this,"categoryIndex");q(this,"important");q(this,"date");q(this,"description");q(this,"checked");q(this,"taskInCategory0",!1);q(this,"taskInCategory1",!1);q(this,"taskInCategory2",!1);this.name=a,this.categoryIndex=g,this.checked=k,this.important=o,this.date=r,this.description=I}}const T=(()=>{let e=[];const a='<svg class="toggleCheckedBox taskButtonClick unchecked" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>',g='<svg class="toggleCheckedBox taskButtonClick checked" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>',k='<svg class="taskButtonClick" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-80 240-320l57-57 183 183 183-183 57 57L480-80ZM298-584l-58-56 240-240 240 240-58 56-182-182-182 182Z"/></svg>',o='<svg class="taskButtonClick" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>',r='<svg class="taskButtonClick" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>',I='<svg class="taskButtonClick" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-200h133.847v-237.692h212.306V-200H720v-360L480-740.769 240-560v360Zm-59.999 59.999v-449.998L480-815.767l299.999 225.768v449.998H526.154v-237.693h-92.308v237.693H180.001ZM480-470.385Z"/></svg>';function $(t,n,s,m,c){const h=new W(t,n,!1,s,m,c);e.push(h),B(h),d()}function B(t,n){const s=e.indexOf(t),m=`taskContainer-${n||t.categoryIndex}`;let c=document.getElementById(m);if(!c){c=document.createElement("div"),c.id=m,c.classList.add("taskContainer");const E=document.getElementById("taskHeaderContainer");E==null||E.insertAdjacentElement("afterend",c),c.addEventListener("click",M=>{M.target.classList.contains("taskButtonClick")&&u(M)})}const h=document.createElement("div");h.classList.add("myTask"),h.classList.add("toggleBorder","toggleSubText"),h.setAttribute("data-task",s.toString()),h.setAttribute("assigned-category",n||t.categoryIndex);const f=document.createElement("div");f.id="taskContent",h.classList.add(t.important?"important-task":"normal-task");const x=document.createElement("div");x.classList.add("svgButton","taskButton"),x.id="checkButton",x.innerHTML=t.checked?g:a,f.appendChild(x);const w=document.createElement("div");w.classList.add("svgButtonContainer");const A=document.createElement("div");if(A.classList.add("svgButton","taskButton"),A.id="descriptionButton",A.innerHTML=k,w.appendChild(A),n){const E=document.createElement("div");E.classList.add("svgButton","taskButton"),E.id="mainCategoryButton",E.innerHTML=I,w.appendChild(E)}else{const E=document.createElement("div");E.classList.add("svgButton","taskButton"),E.id="editButton",E.innerHTML=o,w.appendChild(E);const M=document.createElement("div");M.classList.add("svgButton","taskButton"),M.id="removeButton",M.innerHTML=r,w.appendChild(M)}const H=document.createElement("span");H.classList.add("nameText"),H.textContent=t.name,f.appendChild(H);const O=document.createElement("span");O.classList.add("dateText"),O.textContent=t.date??"",f.appendChild(O),f.appendChild(w),h.appendChild(f);const P=document.createElement("div");P.classList.add("descriptionDropdown"),P.style.display="none";const G=document.createElement("span");G.classList.add("descriptionText"),G.textContent=t.description||"No description available",P.appendChild(G),h.appendChild(P),c.appendChild(h),parseInt(n||t.categoryIndex,10)>2&&D(t),l(n||t.categoryIndex)}function D(t,n){n&&(t.date!==y()&&t.taskInCategory1&&(p(t,"1"),t.taskInCategory1=!1),!t.important&&t.taskInCategory2&&(p(t,"2"),t.taskInCategory2=!1)),t&&t.categoryIndex!=="0"&&!t.taskInCategory0&&(B(t,"0"),t.taskInCategory0=!0),t.date===y()&&t.categoryIndex!=="1"&&!t.taskInCategory1&&(B(t,"1"),t.taskInCategory1=!0),t.important&&t.categoryIndex!=="2"&&!t.taskInCategory2&&(B(t,"2"),t.taskInCategory2=!0),l(t.categoryIndex)}function p(t,n){const s=document.getElementById(`taskContainer-${n}`),m=s==null?void 0:s.querySelector(`.myTask[data-task="${e.indexOf(t)}"]`);m?(m.remove(),d()):console.error("Could not find the task in that category")}function y(){const t=new Date,n=String(t.getDate()).padStart(2,"0"),s=String(t.getMonth()+1).padStart(2,"0"),m=t.getFullYear();return`${s}-${n}-${m}`}function u(t){const s=t.target.closest(".svgButton"),c=s.closest(".myTask").getAttribute("data-task"),h=parseInt(c,10),f=e[h];let x;if((w=>{w.checkButton="checkButton",w.DescriptionButton="descriptionButton",w.EditButton="editButton",w.RemoveButton="removeButton",w.mainCategoryButton="mainCategoryButton"})(x||(x={})),s)switch(s.id){case"checkButton":Z(f,!0);break;case"descriptionButton":const H=s.closest(".myTask").querySelector(".descriptionDropdown");H&&(H.style.display=H.style.display==="none"?"block":"none");break;case"mainCategoryButton":const O=document.querySelector(`.myCategories[data-category="${f.categoryIndex}"]`);O&&(O.click(),l(f.categoryIndex));break;case"editButton":N.task("edit",f);break;case"removeButton":N.task("remove",f);break}}function v(t,n,s,m,c){const h=e.indexOf(t);h!==-1?(t.name=n,t.important=s,t.date=m,t.description=c,document.querySelectorAll(`.myTask[data-task="${h}"]`).forEach(x=>{const w=x.querySelector(".nameText");w&&(w.textContent=n),x.classList.remove("important-task","normal-task"),x.classList.add(s?"important-task":"normal-task");const A=x.querySelector(".dateText");A&&(A.textContent=m||"");const H=x.querySelector(".descriptionText");H&&(H.textContent=c||"No description available")}),D(t,!0),d()):console.error("Error: Task not found for editing.")}function L(t){const n=e.indexOf(t);e.splice(n,1),document.querySelectorAll(`.myTask[data-task="${n}"]`).forEach(c=>{c.remove()}),document.querySelectorAll(".myTask").forEach(c=>{const h=c.getAttribute("data-task"),f=parseInt(h,10);if(f>n){const x=f-1;c.setAttribute("data-task",x.toString())}}),l(t.categoryIndex.toString()),d()}function S(t,n){if(e.filter(m=>m.categoryIndex===t).forEach(m=>{L(m)}),n){const m=document.getElementById(`taskContainer-${t}`);m==null||m.remove(),b(t)}else d()}function b(t){e.forEach(s=>{parseInt(s.categoryIndex,10)>parseInt(t,10)&&(s.categoryIndex=(parseInt(s.categoryIndex,10)-1).toString())}),document.querySelectorAll(".taskContainer").forEach(s=>{const m=parseInt(s.id.split("-")[1],10);if(m>parseInt(t,10)){const c=m-1;s.id=`taskContainer-${c}`,s.querySelectorAll(".myTask").forEach(f=>{f.setAttribute("assigned-category",c.toString())})}}),l(t),d()}function Z(t,n=!1){if(n){t.checked=!t.checked;const c=t.checked,h=e.indexOf(t);document.querySelectorAll(`.myTask[data-task="${h}"]`).forEach(x=>{const w=x.querySelector("svg");if(w){const A=c?g:a;w.outerHTML=A}})}const s=e.indexOf(t);document.querySelectorAll(`.myTask[data-task="${s}"]`).forEach(c=>{const h=c==null?void 0:c.querySelectorAll("span");h&&(h.forEach(f=>{f.style.textDecoration=t.checked?"line-through":"currentColor"}),c.style.backgroundColor=t.checked?"#7D7D7D":"")}),d()}function l(t){document.querySelectorAll(".taskContainer").forEach(c=>{const h=c.id===`taskContainer-${t}`,f=c;f.style.display=h?"block":"none",f.querySelector(".myTask")!==null||f.remove()});let s=document.getElementById(`taskContainer-${t}`);const m=document.getElementById("addTaskMessage");e.length>0&&s?m&&(m.style.display="none"):m&&(m.style.display="block")}function i(t){return e.some(n=>n.categoryIndex===t)}function d(){localStorage.setItem("tasksList",JSON.stringify(e))}function R(){const t=localStorage.getItem("tasksList");t&&(e=JSON.parse(t).map(s=>new W(s.name,s.categoryIndex,s.checked,s.important,s.date,s.description)),e.forEach(s=>{B(s),l(s.categoryIndex),s.checked&&Z(s)}))}return localStorage.getItem("tasksList")?R():console.info("no tasks to retrieve"),{addTaskToList:$,removeAllTasks:S,removeTask:L,updateTasks:l,updateTasksAfterCategoryRemoval:b,checkCategoryForTasks:i,editTask:v}})();class J{constructor(a,g,k){q(this,"name");q(this,"color");q(this,"defaultCategory");this.name=a,this.color=g,this.defaultCategory=k}}const K=(()=>{let e=[];localStorage.getItem("categoriesList")?D():g();function g(){k("All","#eaeaea",!0),k("Today","#ffe6e2",!0),k("Important","#fffeea",!0)}function k(p,y,u=!1){const v=new J(p,y,u);e.push(v),o(v),B()}function o(p){const y=document.getElementById("categoryContainer"),u=e.length,v=document.createElement("div");if(v.classList.add("myCategories","toggleBorder"),v.style.backgroundColor=`${p.color}`,v.setAttribute("data-category",u.toString()),p.defaultCategory){let S;switch(p.name){case"All":S='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-440 160-640v400h360v80H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v280h-80v-200L480-440Zm0-80 320-200H160l320 200ZM760-40l-56-56 63-64H600v-80h167l-64-64 57-56 160 160L760-40ZM160-640v440-240 3-283 80Z"/></svg>';break;case"Today":S='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M360-300q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>';break;case"Important":S='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m354-247 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-350Z"/></svg>';break;default:S="<svg>Fallback SVG goes here</svg>"}v.innerHTML=S,v.classList.add("defaultCategory");const b=document.querySelector('.myCategories[data-category="0"]');b&&(b.classList.add("categorySelected"),b.click())}const L=document.createElement("span");if(L.classList.add("toggleSubText"),L.textContent=p.name,v.appendChild(L),!p.defaultCategory){const S=document.createElement("div");S.classList.add("svgButtonContainer");const b=document.createElement("div");b.classList.add("svgButton"),b.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>',S.appendChild(b);const Z=document.createElement("div");Z.classList.add("svgButton"),Z.setAttribute("data-remove",u.toString()),Z.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>',S.appendChild(Z),Z.addEventListener("click",l=>{l.stopPropagation(),N.category("remove",p)}),S.appendChild(Z),v.appendChild(S),b.addEventListener("click",()=>N.category("edit",p))}y==null||y.appendChild(v),p&&u>2&&v.click(),$()}function r(p){const y=e.indexOf(p);if(y!==-1){const u=document.querySelector(`.myCategories[data-category="${y}"]`);u==null||u.remove(),e.splice(y,1),T.checkCategoryForTasks(y.toString())===!0?T.removeAllTasks(y.toString(),!0):T.updateTasksAfterCategoryRemoval(y.toString());const v=document.querySelector('.myCategories[data-category="0"]');v&&v.click(),$(),B()}}function I(p,y,u){const v=e.indexOf(p);if(y!==null&&u!==null&&v!==-1){p.name=y,p.color=u;const L=document.querySelector(`.myCategories[data-category="${v}"]`);if(L){const S=L.querySelector("span");S.textContent=y,L.style.backgroundColor=u,L.click()}B()}}function $(){document.querySelectorAll(".myCategories").forEach((y,u)=>{y.setAttribute("data-category",u.toString());const v=y.querySelector(".svgButton[data-remove]");v&&v.setAttribute("data-remove",u.toString())})}function B(){localStorage.setItem("categoriesList",JSON.stringify(e))}function D(){const p=localStorage.getItem("categoriesList");p&&(e=JSON.parse(p).map(u=>new J(u.name,u.color,u.defaultCategory)),e.forEach(u=>{o(u)}))}return{addCategoryToList:k,removeCategory:r,editCategory:I}})(),N=(()=>{function e(o,r,I,$){const B=document.querySelector("#modal-container");B==null||B.classList.remove("hidden");const D=y(o,r,I,$);B.innerHTML=D,document.getElementById(`${r}Form`).addEventListener("submit",L),k(),document.getElementById("cancel").addEventListener("click",g),document.getElementById("close").addEventListener("click",g);function y(l,i,d,R){const C=R||{},t=(C==null?void 0:C.name)??"",n=(C==null?void 0:C.color)??"",s=(C==null?void 0:C.description)??"",m=(C==null?void 0:C.date)??"",c=(C==null?void 0:C.important)??"";return l==="remove"?`
                        <div class="toggleForeground" id="modal-content">
                            <div id="modalHeader">
                                <h2 class="large-text">${l==="remove"?"Remove":"Edit"} ${d}</h2>
                                <div class="svgButton" id="close"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></div>
                            </div>
                            <form id="${i}Form">
                                <div>${l==="remove"?`Remove this ${i}: "${t}"`:""}</div>
                                <div class="modal${d}Buttons">
                                    <button class="modal-button" id="cancel">Cancel</button>
                                    <button class="modal-button" type="submit">${l==="remove"?"Remove":"Edit"} ${d}</button>
                                </div>
                            </form>
                        </div>
                    `:`
                <div class="toggleForeground" id="modal-content">
                <div id="modalHeader">
                    <h2 class="large-text">${l==="add"?"Create New":"Edit"} ${d}</h2>
                    <div class="svgButton" id="close"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></div>
                </div>
                <form id="${i}Form">
                    <label for="${i}Name">${d} Name*</label>
                    <input type="text" class="toggleBackground toggleBorder" id="${i}Name" name="${i}Name" value="${t}" maxlength="30" required>
            
                    ${i==="task"?`
                        <label for="${i}Description">${d} Description:</label>
                        <textarea class="toggleBackground toggleBorder" id="${i}Description" name="${i}Description" rows="4" placeholder="Optional">${s}</textarea>
            
                        <label for="${i}Date">Due Date:</label>
                        <input class="toggleBackground toggleBorder" type="date" id="${i}Date" name="${i}Date" value="${v(m,"yyyy-mm-dd")}">

                        <div class="important-checkbox">
                            <label for="${i}Important">Important: </label>
                            <input type="checkbox" id="${i}Important" name="${i}Important" ${c?"checked":""}>
                            
                        </div>
            
                    `:`
                        <label for="${i}Color">${d} Color</label>
                        <div class="color-options">
                            ${u(n)}
                        </div>
                    `}
            
                    <div class="modal${d}Buttons">
                        <button class="modal-button" id="cancel">Cancel</button>
                        <button class="modal-button" type="submit">${l==="add"?"Create":"Edit"} ${d}</button>
                    </div>
                </form>
            </div>
            `}function u(l){return["black","slategray","white","#ec7e7e","#ecb67e","#ece07e","#95ec7e","#7ea9ec","#c57eec","#ec7eb6"].map(d=>`
                <div class="color-square ${d===l?"selected":""}" style="background-color: ${d}" data-color="${d}"></div>
            `).join("")}function v(l,i="mm-dd-yyyy"){if(l){const d=l.split("-");if(i==="mm-dd-yyyy")return`${d[1]}-${d[2]}-${d[0]}`;if(i==="yyyy-mm-dd")return`${d[2]}-${d[0]}-${d[1]}`}return""}function L(l){if(l.preventDefault(),o==="remove")a($);else{const i=document.getElementById(`${r}Name`);r==="category"?S(i):r==="task"&&b(i)}}function S(l){const i=document.querySelector(".color-square.selected");if(i){const d=i.getAttribute("data-color");o==="edit"&&$ instanceof J?(K.editCategory($,l.value,d),k()):o==="add"&&(K.addCategoryToList(l.value,d),k())}else alert("Please select a color.")}function b(l){const i=document.getElementById(`${r}Description`),d=document.getElementById(`${r}Important`),R=document.getElementById(`${r}Date`),C=v(R.value);if(o==="edit"&&$ instanceof W)T.editTask($,l.value,d.checked,C,i.value),k();else if(o==="add"){const n=document.querySelector(".myCategories.categorySelected").getAttribute("data-category");T.addTaskToList(l.value,n,d.checked,C,i.value),k()}}function Z(){const l=document.querySelectorAll(".color-square");l.forEach(i=>{i.addEventListener("click",()=>{l.forEach(d=>d.classList.remove("selected")),i.classList.add("selected")})})}B&&r==="category"&&window.getComputedStyle(B).display==="flex"&&Z()}function a(o){o instanceof J?K.removeCategory(o):o instanceof W?T.removeTask(o):console.error("Error: No class provided for removal"),k()}function g(o){o.preventDefault(),k()}function k(){const o=document.querySelector("#modal-container");o.style.display=o.style.display==="flex"?"none":"flex"}return{category:(o,r)=>e(o,"category","Category",r),task:(o,r)=>e(o,"task","Task",r)}})();document.body.addEventListener("click",e=>{const a=e.target;if(a.classList.contains("showModal")||a.parentElement&&a.parentElement.classList.contains("showModal"))switch(a.id||a.parentElement&&a.parentElement.id){case"category":N.category("add"),e.stopPropagation();break;case"task":N.task("add"),e.stopPropagation();break}});const U=document.querySelector(".moon"),X=document.querySelector(".sun"),_=localStorage.getItem("theme"),nt=window.matchMedia("(prefers-color-scheme: dark)").matches,z=()=>{U.classList.toggle("display-none"),X.classList.toggle("display-none")},at=()=>{if(_==="dark"||!_&&nt){document.documentElement.classList.add("dark"),U.classList.add("display-none");return}X.classList.add("display-none")},et=()=>{if(document.documentElement.classList.contains("dark")){document.documentElement.classList.remove("dark"),localStorage.setItem("theme","light"),z();return}document.documentElement.classList.add("dark"),localStorage.setItem("theme","dark"),z()};U.addEventListener("click",()=>{et()});X.addEventListener("click",()=>{et()});at();const Q=document.getElementById("toggleSidebarButton"),V=document.getElementById("sidebar");function j(e){const a=Q.querySelector(".sidebarOpen"),g=Q.querySelector(".sidebarClose");V.style.display=e?"block":"none",V.classList.toggle("closed",!e),a.style.display=e?"none":"block",g.style.display=e?"block":"none"}j(window.innerWidth>=768);Q.addEventListener("click",()=>{const e=V.style.display==="none"||V.classList.contains("closed");j(e)});window.addEventListener("resize",()=>{const a=window.innerWidth<768;j(!a)});const Y=document.getElementById("categoryContainer");let F;Y==null||Y.addEventListener("click",e=>{var k;const g=e.target.closest(".myCategories");if(g){F==null||F.classList.remove("categorySelected"),g.classList.add("categorySelected"),F=g;const o=(k=g.querySelector("span"))==null?void 0:k.textContent;let r=document.getElementById("taskCategoryHeader");r.textContent=o||"",j(window.innerWidth>=768);const I=g.getAttribute("data-category");I&&(dt(I),T.updateTasks(I))}});const tt=document.querySelector(".categorySelected");tt&&tt.click();function dt(e){const a=document.getElementById("task");e==="1"||e==="2"?a.style.display="none":a.style.display="block"}
