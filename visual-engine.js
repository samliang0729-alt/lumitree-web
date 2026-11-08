/* LumiTree visual engine — measured text, balanced compact trees and inline SVG icons. */
'use strict';
const LV=(()=>{
const icons={
 spark:['靈感','<path d="m12 2 2.6 6.4L21 11l-6.4 2.6L12 20l-2.6-6.4L3 11l6.4-2.6Z"/><path d="m20 18 1 2 2 1-2 1-1 2-1-2-2-1 2-1Z"/>'],
 target:['目標','<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="m12 12 9-9M17 3h4v4"/>'],
 plan:['計畫','<rect x="4" y="4" width="16" height="17" rx="3"/><path d="M8 2v4m8-4v4M4 9h16M8 13h3m-3 4h7"/>'],
 team:['團隊','<circle cx="12" cy="7" r="3"/><path d="M6 21v-4a6 6 0 0 1 12 0v4M3 10a3 3 0 0 0 0 6m18-6a3 3 0 0 1 0 6"/>'],
 org:['組織','<rect x="8" y="2" width="8" height="6" rx="1"/><path d="M12 8v5M4 17v-4h16v4"/><rect x="1" y="17" width="6" height="5" rx="1"/><rect x="9" y="17" width="6" height="5" rx="1"/><rect x="17" y="17" width="6" height="5" rx="1"/>'],
 task:['工作','<rect x="4" y="3" width="16" height="19" rx="2"/><path d="m7 8 1 1 2-2m-3 7 1 1 2-2m3-5h4m-4 6h4m-10 5h10"/>'],
 gear:['執行','<path d="m10 2-.5 3-2 .9-2.7-1.1-2 3.4 2.2 2-.1 2.4-2.1 2 2 3.4L7.5 17l2 .9.5 3h4l.5-3 2-.9 2.7 1.1 2-3.4-2.2-2 .1-2.4 2.1-2-2-3.4L16.5 6l-2-.9-.5-3Z"/><circle cx="12" cy="12" r="3"/>'],
 warning:['風險','<path d="m10 3-9 16a2 2 0 0 0 2 3h18a2 2 0 0 0 2-3L14 3a2 2 0 0 0-4 0Z"/><path d="M12 8v6m0 3h.01"/>'],
 chart:['成效','<path d="M3 3v18h19M7 16v-4m5 4V8m5 8V5"/><path d="m6 8 5-4 5 1 4-3"/>'],
 chat:['溝通','<path d="M21 14a4 4 0 0 1-4 4H9l-6 4V6a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/><path d="M7 7h10M7 12h7"/>'],
 money:['資源','<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 4 16 4 16 0V5M4 11v6c0 4 16 4 16 0v-6"/>'],
 rocket:['啟動','<path d="M14 3a10 10 0 0 0-7 10l4 4a10 10 0 0 0 10-14ZM7 10l-4 1-2 5 6-1m7 2-1 5 5-2 1-4M6 18l-3 3"/><circle cx="16" cy="8" r="2"/>'],
 bulb:['建議','<path d="M8 17c0-4-3-4-3-9a7 7 0 0 1 14 0c0 5-3 5-3 9ZM8 20h8m-6 3h4"/>'],
 shield:['品質','<path d="m12 2 9 4v6c0 6-9 10-9 10S3 18 3 12V6Z"/><path d="m8 12 3 3 5-6"/>'],
 check:['完成','<circle cx="12" cy="12" r="10"/><path d="m7 12 3 3 7-7"/>'],
 book:['知識','<path d="M12 5C8 2 4 2 2 3v17c3-2 7-1 10 1 3-2 7-3 10-1V3c-2-1-6-1-10 2Zm0 0v16"/>'],
 time:['時間','<circle cx="12" cy="12" r="10"/><path d="M12 5v7l5 3"/>'],
 heart:['文化','<path d="M12 21 3 12C-3 4 7-2 12 5c5-7 15-1 9 7Z"/>'],
 search:['分析','<circle cx="10" cy="10" r="7"/><path d="m15 15 7 7"/>'],
 dot:['重點','<circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/>']
};
const palette=[['#d24362','#ffe8ec'],['#de9c08','#fff4d2'],['#249553','#e6f5e6'],['#2584d9','#e6f2ff'],['#8061c4','#f0eaff'],['#13998c','#dff5ef'],['#df7446','#fff0e6'],['#a14f99','#f9e9f6']];
const rules=[['target',/目標|願景|願望|objective|goal/i],['warning',/風險|危機|異常|失敗|風險|問題|risk|problem/i],['shield',/品質|安全|驗證|quality|safety/i],['chart',/成效|績效|評估|衡量|指標|成果|分析結果|KPI|metric/i],['money',/資源|資金|預算|成本|財務|投資|budget|cost|resource/i],['chat',/溝通|協調|回饋|會議|communication/i],['heart',/文化|信任|精神|culture/i],['org',/授權|組織|權責|架構|責任|organization|RACI/i],['team',/團隊|人員|人才|領導|team|people/i],['plan',/計畫|規劃|策略|時程|plan|strategy/i],['bulb',/改善|建議|更好|修正|改進|improve|recommend/i],['task',/任務|分配|作業|工作|task|work/i],['gear',/執行|控制|設備|流程|運作|process|control/i],['book',/學習|培訓|教學|知識|學員|training|learning/i],['time',/時間|日期|期限|進度|timeline|schedule/i],['check',/達成|完成|成功|complete|success/i],['search',/研究|分析|調查|原因|research|analysis/i]];
let ctx=null;const cache=new Map();
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function mix(a,b,t){return'#'+[0,2,4].map(i=>Math.round(parseInt(a.slice(i+1,i+3),16)*(1-t)+parseInt(b.slice(i+1,i+3),16)*t).toString(16).padStart(2,'0')).join('')}
function svgIcon(key,size=24){const i=icons[key];return i?`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${i[1]}</svg>`:''}
function iconFor(n,dep){if(n.icon==='none')return'none';if(icons[n.icon])return n.icon;return rules.find(([,r])=>r.test(n.text))?.[0]||(dep===0?'spark':dep===1?'book':'dot')}
function measureText(text,size,bold=false){const key=size+'|'+bold+'|'+text;if(cache.has(key))return cache.get(key);if(!ctx&&typeof document!=='undefined')try{ctx=document.createElement('canvas').getContext('2d')}catch{};let width;if(ctx){ctx.font=`${bold?650:400} ${size}px "Segoe UI","Microsoft JhengHei",sans-serif`;width=ctx.measureText(text).width}else width=Array.from(text).reduce((s,c)=>s+size*(/[^\x00-\xff]/.test(c)?1:.56),0);if(cache.size>5000)cache.clear();cache.set(key,width);return width}
function wrap(text,width,size,bold){const lines=[];for(const paragraph of String(text).split('\n')){if(!paragraph){lines.push('');continue}let line='';for(const char of Array.from(paragraph)){if(line&&measureText(line+char,size,bold)>width){lines.push(line.trimEnd());line=char.trimStart()}else line+=char}if(line)lines.push(line.trimEnd())}return lines.length?lines:['']}
function box(n,s){const dep=s.dep||0,icon=iconFor(n,dep),iconSize=icon==='none'?0:dep===0?32:dep===1?30:22,gap=iconSize?10:0,pad=dep<=1?20:15,space=2*pad+iconSize+gap+4;
  let w;if(Number.isFinite(n.style?.width)&&n.style?.widthMode!=='auto')w=clamp(n.style.width,120,520);else{const min=dep===0?240:dep===1?176:150,max=dep===0?350:dep===1?290:350,full=measureText(n.text,s.size,s.bold);const target=dep===0?1.6:dep===1?1.7:2.8;w=clamp(Math.ceil((full/target+space)/8)*8,min,max);if(full+space<=max)w=clamp(Math.ceil((full+space)/8)*8,min,max);const initial=wrap(n.text,w-space,s.size,s.bold);if(initial.length>4)w=max;}
  const textW=Math.max(30,w-space),lines=wrap(n.text,textW,s.size,s.bold),lineH=s.size*1.45,h=Math.ceil(Math.max(iconSize,lines.length*lineH)+2*(dep<=1?17:13)+3);return{w,h,lines,textW,icon,iconSize,pad,gap,lineH};
}
function style(n,doc,dep,depthFn){let branch=n;while(branch.parentId&&depthFn(branch)>1)branch=doc.nodes.find(x=>x.id===branch.parentId);const root=doc.nodes.find(n=>!n.parentId),siblings=doc.nodes.filter(x=>x.parentId===root.id),index=Math.max(0,siblings.findIndex(x=>x.id===branch.id)),p=palette[index%palette.length];let bg,color,border,accent;
 if(doc.colorMode==='level'){const arr=['#dceee9','#f4dfd8','#e1e4f5','#f5ebcc','#dcecf5','#e9dff0'],offset=Math.max(0,arr.indexOf(doc.theme));bg=dep===0?'#13345d':arr[(dep-1+offset+arr.length)%arr.length];color=dep===0?'#ffffff':'#253744';border=dep===0?'#214c78':mix(bg,'#284354',.35);accent=border}
 else{accent=p[0];bg=dep===0?'#112f56':dep===1?p[0]:mix(p[1],'#ffffff',Math.min(.54,(dep-2)*.13));color=dep===1&&index%palette.length===1?'#403214':dep<=1?'#ffffff':'#233443';border=dep===0?'#2a507e':mix(p[0],'#ffffff',dep===1?.12:.42)}
 const s={dep,size:dep===0?23:dep===1?18:16,bold:dep<=1,shape:dep<=1?'pill':'round',...n.style,bg,color,border,accent,...doc.levelStyles?.[dep]};s.end=dep<=1?mix(s.bg,'#ffffff',.12):mix(s.bg,'#ffffff',.45);return s;
}
function layout(doc,sty,depthFn){const positions=[],links=[],frames=[],byId=new Map(),kids=new Map();for(const n of doc.nodes){byId.set(n.id,n);if(n.parentId){if(!kids.has(n.parentId))kids.set(n.parentId,[]);kids.get(n.parentId).push(n)}}const collapsed=new Set(doc.collapsed),children=n=>collapsed.has(n.id)?[]:kids.get(n.id)||[],boxes=new Map(),dims=n=>{if(!boxes.has(n.id))boxes.set(n.id,box(n,sty(n)));return boxes.get(n.id)},root=doc.nodes.find(n=>!n.parentId);if(!root)return{positions,links,frames};
 function add(n,x,y,extra={}){const d=dims(n),p={...n,...d,x,y,...extra};positions.push(p);return p}function connect(a,b,kind='horizontal',dir=1){links.push({a,b,kind,dir})}
 const metrics=new Map();
 // Lower-level subtrees use a narrow indentation instead of expanding every level horizontally.
 function compactSize(n){if(metrics.has(n.id))return metrics.get(n.id);const d=dims(n),cs=children(n),child=cs.map(compactSize),gap=12;let w=d.w,h=d.h;for(const c of child){w=Math.max(w,24+c.w);h+=gap+c.h}const m={w,h};metrics.set(n.id,m);return m}
 function compactPlace(n,x,y,dir){const d=dims(n),p=add(n,dir<0?x+compactSize(n).w-d.w:x,y);let nextY=y+d.h+12;for(const c of children(n)){const m=compactSize(c),cx=dir<0?x+compactSize(n).w-24-m.w:x+24,q=compactPlace(c,cx,nextY,dir);connect(p,q,'outline',dir);nextY+=m.h+12}return p}
 const branchMetrics=new Map();
 function branchSize(n){const d=dims(n),cs=children(n),ms=cs.map(compactSize);if(!cs.length)return{w:d.w,h:d.h,columns:0,rows:[]};const total=ms.reduce((s,m)=>s+m.h,0)+18*(ms.length-1),columns=ms.length>=3&&total>540?2:1,colW=Array(columns).fill(0),rows=[];for(let i=0;i<ms.length;i++){colW[i%columns]=Math.max(colW[i%columns],ms[i].w);const r=Math.floor(i/columns);rows[r]=Math.max(rows[r]||0,ms[i].h)}const blockW=colW.reduce((a,b)=>a+b,0)+28*(columns-1),blockH=rows.reduce((a,b)=>a+b,0)+18*(rows.length-1);const m={w:d.w+48+blockW,h:Math.max(d.h,blockH),columns,colW,rows,blockH,blockW};branchMetrics.set(n.id,m);return m}
 function placeBranch(n,anchor,cy,dir){const d=dims(n),m=branchSize(n),p=add(n,dir<0?anchor-d.w:anchor,cy-d.h/2);let y=cy-(m.blockH||0)/2;children(n).forEach((c,i)=>{const col=i%m.columns,row=Math.floor(i/m.columns);if(col===0&&row>0)y+=m.rows[row-1]+18;const xoff=m.colW.slice(0,col).reduce((a,b)=>a+b,0)+28*col;const x=dir<0?p.x-48-xoff-compactSize(c).w:p.x+p.w+48+xoff;const q=compactPlace(c,x,y,dir);connect(p,q,'horizontal',dir);const rect={x:x-9,y:y-9,w:compactSize(c).w+18,h:compactSize(c).h+18,id:c.id};if(children(c).length)frames.push(rect)});return p}
 if(['mind','logic','bracket'].includes(doc.layout)&&doc.arrangement!=='expanded'){
  const r=dims(root),p=add(root,-r.w/2,-r.h/2),cs=children(root),sides={left:[],right:[]},totals={left:0,right:0};for(const c of cs){const side=doc.layout!=='mind'?'right':totals.right<=totals.left?'right':'left';sides[side].push(c);totals[side]+=branchSize(c).h+40}for(const side of ['left','right']){const dir=side==='left'?-1:1,total=Math.max(0,totals[side]-40);let top=-total/2;for(const c of sides[side]){const m=branchSize(c),q=placeBranch(c,dir<0?p.x-68:p.x+p.w+68,top+m.h/2,dir);connect(p,q,'horizontal',dir);top+=m.h+40}}
 }else if(['mind','logic','bracket'].includes(doc.layout)){
  const heights=new Map();function mh(n){const d=dims(n),cs=children(n);const h=Math.max(d.h,cs.reduce((s,c)=>s+mh(c)+24,0)-24);heights.set(n.id,h);return h}mh(root);function b(n,anchor,cy,dir){const d=dims(n),p=add(n,dir<0?anchor-d.w:anchor,cy-d.h/2);let top=cy-heights.get(n.id)/2;for(const c of children(n)){const h=heights.get(c.id),q=b(c,dir<0?p.x-48:p.x+p.w+48,top+h/2,dir);connect(p,q,'horizontal',dir);top+=h+24}return p}const d=dims(root),p=add(root,-d.w/2,-d.h/2),cs=children(root);for(const dir of doc.layout==='mind'?[-1,1]:[1]){const subset=doc.layout==='mind'?cs.filter((_,i)=>i%2===(dir===1?0:1)):cs,total=subset.reduce((s,c)=>s+heights.get(c.id)+30,0)-30;let top=-total/2;for(const c of subset){const h=heights.get(c.id),q=b(c,dir<0?p.x-68:p.x+p.w+68,top+h/2,dir);connect(p,q,'horizontal',dir);top+=h+30}}}
 else if(doc.layout==='org'){
  const mm=new Map();function size(n){const d=dims(n),cs=children(n),ms=cs.map(size),columns=cs.length>4?2:Math.max(1,cs.length),colW=Array(columns).fill(0),rows=[];ms.forEach((m,i)=>{colW[i%columns]=Math.max(colW[i%columns],m.w);rows[Math.floor(i/columns)]=Math.max(rows[Math.floor(i/columns)]||0,m.h)});const m={w:Math.max(d.w,colW.reduce((a,b)=>a+b,0)+30*(columns-1)),h:d.h+(cs.length?55+rows.reduce((a,b)=>a+b,0)+35*(rows.length-1):0),colW,rows,columns};mm.set(n.id,m);return m}const rm=size(root);function place(n,x,y){const m=mm.get(n.id),d=dims(n),p=add(n,x+(m.w-d.w)/2,y);let ry=y+d.h+55;children(n).forEach((c,i)=>{const col=i%m.columns,row=Math.floor(i/m.columns);if(col===0&&row>0)ry+=m.rows[row-1]+35;const cx=x+m.colW.slice(0,col).reduce((a,b)=>a+b,0)+30*col,q=place(c,cx,ry);connect(p,q,'vertical')});return p}place(root,-rm.w/2,0)
 }else if(doc.layout==='tree'){let y=0;function row(n){const p=add(n,depthFn(n)*32,y);y+=p.h+16;for(const c of children(n)){const q=row(c);connect(p,q,'outline')}return p}row(root)}
 else if(doc.layout==='table'){const widths=[];doc.nodes.forEach(n=>{const d=depthFn(n);widths[d]=Math.max(widths[d]||0,dims(n).w)});const hs=new Map();function hh(n){const h=Math.max(dims(n).h,children(n).reduce((s,c)=>s+hh(c),0));hs.set(n.id,h);return h}hh(root);function cell(n,y,height){const dep=depthFn(n),p=add(n,widths.slice(0,dep).reduce((a,b)=>a+b,0),y,{w:widths[dep],h:height});let top=y;const cs=children(n),total=cs.reduce((s,c)=>s+hs.get(c.id),0);for(const c of cs){const h=hs.get(c.id)+(height-total)/cs.length;cell(c,top,h);top+=h}return p}cell(root,0,hs.get(root.id))}
 else if(doc.layout==='fish'||doc.layout==='timeline'){
  const r=dims(root),p=add(root,doc.layout==='fish'?50:-r.w-85,-r.h/2),cs=children(root),ms=cs.map(compactSize),spacing=Math.max(300,...ms.map(m=>m.w+55));cs.forEach((c,i)=>{const above=i%2===0,x=doc.layout==='fish'?-(Math.floor(i/2)+1)*spacing:i*spacing,y=above?-100-ms[i].h:100,q=compactPlace(c,x,y,1);links.push({a:p,b:q,kind:'axis',dir:1,pivot:q.x+q.w/2,above});if(children(c).length)frames.push({x:x-9,y:y-9,w:ms[i].w+18,h:ms[i].h+18,id:c.id})})}
 return{positions,links,frames};
}
function path(l,doc){if(l.kind==='axis')return`M${l.a.x+l.a.w/2} 0 H${l.pivot} L${l.pivot} ${l.above?l.b.y+l.b.h:l.b.y}`;if(l.kind==='vertical')return`M${l.a.x+l.a.w/2} ${l.a.y+l.a.h} V${(l.a.y+l.a.h+l.b.y)/2} H${l.b.x+l.b.w/2} V${l.b.y}`;
 if(l.kind==='outline'){const x1=l.dir<0?l.a.x+l.a.w-12:l.a.x+12,x2=l.dir<0?l.b.x+l.b.w:l.b.x;return`M${x1} ${l.a.y+l.a.h} V${l.b.y+l.b.h/2} H${x2}`}
 const x1=l.dir<0?l.a.x:l.a.x+l.a.w,y1=l.a.y+l.a.h/2,x2=l.dir<0?l.b.x+l.b.w:l.b.x,y2=l.b.y+l.b.h/2;if(doc.line==='straight')return`M${x1} ${y1} L${x2} ${y2}`;if(doc.layout==='bracket'||doc.line==='elbow')return`M${x1} ${y1} H${(x1+x2)/2} V${y2} H${x2}`;return`M${x1} ${y1} C${(x1+x2)/2} ${y1},${(x1+x2)/2} ${y2},${x2} ${y2}`;
}
return{icons,palette,svgIcon,iconFor,box,style,layout,path,wrap,mix,measureText};
})();
if(typeof module!=='undefined')module.exports=LV;
