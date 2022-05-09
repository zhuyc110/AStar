(()=>{"use strict";class t{constructor(){this.items=[]}get length(){return this.items.length}enqueue(t,i){if(0===this.items.length)return void this.items.push({priority:i,item:t});let s=0;for(let e=0;e<this.items.length;e++)if(s=e,this.items[e].priority>i)return void this.items.splice(s,0,{item:t,priority:i});this.items.push({priority:i,item:t})}dequeue(){return this.getFirst(!0)}peek(){return this.getFirst()}getFirst(t=!1){if(0===this.items.length)return null;const i=this.items[0];return t&&this.items.splice(0,1),i.item}}class i{constructor(t=0,i=0){this.x=Math.floor(t),this.y=Math.floor(i)}get stringify(){return`${this.x}, ${this.y}`}}class s{constructor(t,i,s){this.world=t,this.start=i,this.goal=s,this.visited=[],this.mapPath=new Map}get pathToPrint(){const t=[this.goal];let i=this.goal;for(;i;){const s=this.mapPath.get(i);if(!s)break;t.push(s),i=s}return t}getNeighbors(t){const s=[];if(t.x>0){const e=new i(t.x-1,t.y);s.push(e)}if(t.x<this.world.bound.x-1){const e=new i(t.x+1,t.y);s.push(e)}if(t.y>0){const e=new i(t.x,t.y-1);s.push(e)}if(t.y<this.world.bound.y-1){const e=new i(t.x,t.y+1);s.push(e)}return s}getDistance(t,i){return Math.abs(t.x-i.x)+Math.abs(i.y-t.y)}}class e extends s{goToGoal(){const i=this.world.objects.filter((t=>t.stringify!==this.goal.stringify)),s=new Map;s.set(this.start.stringify,0);const e=new t;for(e.enqueue(this.start,0);e.length>0;){const t=e.dequeue();if(t.stringify===this.goal.stringify){this.visited.push(t);break}this.visited.push(t);const n=this.getNeighbors(t);for(let o of n){if(i.find((t=>t.stringify===o.stringify)))continue;o.stringify===this.goal.stringify&&(o=this.goal);const n=s.get(t.stringify)+1;if(!s.has(o.stringify)||n<s.get(o.stringify)){const i=n+this.getDistance(o,this.goal);s.set(o.stringify,n),e.enqueue(o,i),this.mapPath.set(o,t)}}}}}class n extends s{goToGoal(){const i=this.world.objects.filter((t=>t.stringify!==this.goal.stringify)),s=new Set,e=new t;for(e.enqueue(this.start,0);e.length>0;){const t=e.dequeue();if(t.stringify===this.goal.stringify){this.visited.push(t);break}if(s.has(t.stringify))continue;this.visited.push(t),s.add(t.stringify);const n=this.getNeighbors(t);for(let o of n){if(i.find((t=>t.stringify===o.stringify)))continue;if(s.has(o.stringify))continue;o.stringify===this.goal.stringify&&(o=this.goal);const n=this.getDistance(o,this.goal);e.enqueue(o,n),this.mapPath.set(o,t)}}}}class o{constructor(){this.items=[]}get length(){return this.items.length}enqueue(t){this.items.push(t)}dequeue(){return this.getFirst(!0)}peek(){return this.getFirst()}includes(t){return!!this.items.find((i=>t(i)))}getFirst(t=!1){if(0===this.items.length)return null;const i=this.items[0];return t&&this.items.splice(0,1),i}}class r extends s{goToGoal(){const t=this.world.objects.filter((t=>t.stringify!==this.goal.stringify)),i=new Set,s=new o;for(s.enqueue(this.start);s.length>0;){const e=s.dequeue();if(e.stringify===this.goal.stringify){this.visited.push(e);break}if(i.has(e.stringify))continue;this.visited.push(e),i.add(e.stringify);const n=this.getNeighbors(e);for(let o of n)t.find((t=>t.stringify===o.stringify))||i.has(o.stringify)||(o.stringify===this.goal.stringify&&(o=this.goal),s.enqueue(o),this.mapPath.set(o,e))}}}class h extends i{constructor(t=0,i=0){super(t,i),this.loaded=[],this.img=new Image,this.img.onload=()=>{this.loaded.forEach((t=>{t(this)}))},this.draw.bind(this)}enable(t){this.context=t,this.active=!0}draw(){this.context.drawImage(this.img,this.x*this.resolution+2,this.y*this.resolution+2)}getRandomInt(t,i=0){return t<=i?0:Math.floor(Math.random()*(t-i))+Math.floor(i)}}class a extends h{constructor(t=0,i=0,s=0){super(t,i),this.resolution=s,this.img.src="asset/brick.png"}init(t,i){for(this.resolution=t,this.x=this.getRandomInt(this.context.canvas.width/this.resolution),this.y=this.getRandomInt(this.context.canvas.height/this.resolution);i.has(this.stringify);)this.x=this.getRandomInt(this.context.canvas.width/this.resolution),this.y=this.getRandomInt(this.context.canvas.height/this.resolution);this.draw()}update(){this.draw()}interact(t){console.log("Brick clicked"),t.world.removeSprite(this),t.handled=!0}}a.createBrickHandler=t=>{const i=new a(t.position.x,t.position.y,t.resolution);return t.handled=!0,i};class l extends h{constructor(t=0,i=0){super(t,i),this.img.src="asset/goal.png"}init(t,i){for(this.resolution=t,this.x=this.getRandomInt(this.context.canvas.width/this.resolution,this.context.canvas.width/this.resolution/2),this.y=this.getRandomInt(this.context.canvas.height/this.resolution,this.context.canvas.height/this.resolution/2);i.has(this.stringify);)this.x=this.getRandomInt(this.context.canvas.width/this.resolution,this.context.canvas.width/this.resolution/2),this.y=this.getRandomInt(this.context.canvas.height/this.resolution,this.context.canvas.height/this.resolution/2);this.draw()}update(){this.draw()}interact(t){console.log("Goal clicked"),t.handled=!0}}class c extends h{constructor(t=0,i=0){super(t,i),this.img.src="asset/start.png"}init(t){this.resolution=t,this.draw()}update(){this.draw()}interact(t){t.handled=!0}}class d{constructor(t,s=25){this.sprites=[],this.worldResolution=25,this.interactHandler=[],this.canvas=t,this.context=this.canvas.getContext("2d"),this.worldResolution=s,this.canvas.onclick=this.onClick.bind(this),this.update=this.update.bind(this),this.removeSprite=this.removeSprite.bind(this),this.drawSprite=this.drawSprite.bind(this),this.boundValue=new i(Math.floor(this.canvas.width/s),Math.floor(this.canvas.height/s))}get objects(){return this.sprites}get bound(){return this.boundValue}renderWorld(t){for(let i=1;i<this.canvas.width;i+=this.worldResolution)t.beginPath(),t.moveTo(i,0),t.lineTo(i,this.canvas.height),t.stroke();for(let i=1;i<this.canvas.height;i+=this.worldResolution)t.beginPath(),t.moveTo(0,i),t.lineTo(this.canvas.width,i),t.stroke()}renderPath(t,s){let e=null;for(let n=0;n<s.length;n++){const o=s[n],r=new i((o.x+.5)*this.worldResolution+1,(o.y+.5)*this.worldResolution+1);if(null!==e){const s=new i((e.x+.5)*this.worldResolution+1,(e.y+.5)*this.worldResolution+1);t.beginPath(),t.moveTo(s.x,s.y),t.lineTo(r.x,r.y),t.stroke()}t.beginPath(),t.ellipse(r.x,r.y,2,2,Math.PI/4,0,2*Math.PI),t.stroke(),e=o}}renderVisited(t,i){t.fillStyle="#E1A679";for(const s of i)t.fillRect(s.x*this.worldResolution+2,s.y*this.worldResolution+2,this.worldResolution-2,this.worldResolution-2);t.fillStyle="black"}activeSprite(t){t.enable(this.context),this.sprites.push(t)}removeSprite(t){const i=this.sprites.indexOf(t);this.sprites.splice(i,1)}start(t=100){const i=new Set;for(const t of this.sprites.filter((t=>t.active)))t.init(this.worldResolution,i),i.add(t.stringify);const s=setTimeout((()=>{this.update(),clearTimeout(s)}),100);this.frameRunner=setInterval(this.update,t)}update(){this.clear();for(const t of this.sprites.filter((t=>t.active)))t.update()}stop(){clearInterval(this.frameRunner),this.clear()}clear(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}registerInteract(t){this.interactHandler.push(t)}onClick(t){const i=this.getInteractArgs(t);for(const s of this.sprites)t.offsetX>=s.x*s.resolution&&t.offsetX<=(s.x+1)*s.resolution&&t.offsetY>=s.y*s.resolution&&t.offsetY<=(s.y+1)*s.resolution&&s.interact(i);for(const t of this.interactHandler){if(i.handled)break;const s=t(i);s&&this.activeSprite(s)}}getInteractArgs(t){return{position:new i(t.offsetX/this.worldResolution,t.offsetY/this.worldResolution),handled:!1,world:this,resolution:this.worldResolution}}drawSprite(t){t.draw();const i=t.loaded.indexOf(this.drawSprite);t.loaded.splice(i,1)}}const u=document.querySelector("#world"),g=document.querySelector("#curtain"),f=document.querySelector("#path");let p,w,y;function m(t){u.getContext("2d").clearRect(0,0,u.width,u.height),f.getContext("2d").clearRect(0,0,f.width,f.height),null==p||p.stop(),p=new d(g,+t),p.registerInteract(a.createBrickHandler),p.renderWorld(u.getContext("2d")),y=new c,p.activeSprite(y),w=new l,p.activeSprite(w);for(let i=0;i<200/+t;i++){const t=new a;p.activeSprite(t)}p.start()}function x(t){f.getContext("2d").clearRect(0,0,f.width,f.height);const i=t(p,y,w);i.goToGoal(),p.renderVisited(f.getContext("2d"),i.visited),p.renderPath(f.getContext("2d"),i.pathToPrint)}m(25);const v=document.querySelector("input");document.querySelector("#reset").addEventListener("click",(()=>m(v.value))),document.querySelector("#wfs").addEventListener("click",(()=>{x(((t,i,s)=>new r(t,i,s)))})),document.querySelector("#heuristic").addEventListener("click",(()=>{x(((t,i,s)=>new n(t,i,s)))})),document.querySelector("#a-star").addEventListener("click",(()=>{x(((t,i,s)=>new e(t,i,s)))}))})();