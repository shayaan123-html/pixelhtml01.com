const L=[
{t:"1. Headings",x:"Headings are big titles. Wrap text in <h1> and </h1>. Make a heading that says anything you like.",s:"<!-- write your heading below -->\n",c:c=>/<h1[^>]*>\s*\S[\s\S]*?<\/h1>/i.test(c),h:"Use <h1>Hello</h1>"},
{t:"2. Paragraphs",x:"Paragraphs hold normal text. Use <p> and </p>. Add a paragraph under the heading.",s:"<h1>My page</h1>\n",c:c=>/<h1[\s\S]*<\/h1>[\s\S]*<p[^>]*>\s*\S[\s\S]*?<\/p>/i.test(c),h:"Add <p>Some text</p> after the heading"},
{t:"3. Links",x:"Links take you to other pages. Use <a href=\"web address\">text</a>.",s:"<p>Visit my favorite site:</p>\n",c:c=>/<a\s+[^>]*href\s*=\s*["'][^"']+["'][^>]*>\s*\S[\s\S]*?<\/a>/i.test(c),h:"Try <a href=\"https://example.com\">Click me</a>"},
{t:"4. Lists",x:"Lists group items. Put <li> items inside <ul>. Make a list with at least two items.",s:"<h2>Snacks</h2>\n",c:c=>/<ul[^>]*>(?=[\s\S]*<li[^>]*>[\s\S]*<\/li>[\s\S]*<li[^>]*>[\s\S]*<\/li>)[\s\S]*<\/ul>/i.test(c),h:"<ul><li>Apple</li><li>Bread</li></ul>"},
{t:"5. Buttons",x:"Buttons are for clicking. Use <button> and </button> with a label inside.",s:"<h1>Level 5</h1>\n",c:c=>/<button[^>]*>\s*\S[\s\S]*?<\/button>/i.test(c),h:"<button>Press me</button>"},
{g:1,t:'6. Images',x:'Images use <img src="picture.jpg" alt="description">. The alt text describes the picture for people who cannot see it. Add one image with src and alt.',s:'<h2>My photo</h2>\n',c:c=>/<img\s+(?=[^>]*src\s*=\s*["'][^"']+["'])(?=[^>]*alt\s*=\s*["'][^"']*["'])[^>]*>/i.test(c),h:'<img src="cat.jpg" alt="A sleepy cat">'},
{g:1,t:'7. Bold and italic',x:'Use <strong> for important text and <em> for emphasis. Use both in one paragraph.',s:'<p>Practice makes progress.</p>\n',c:c=>/<strong[^>]*>\s*\S[\s\S]*?<\/strong>/i.test(c)&&/<em[^>]*>\s*\S[\s\S]*?<\/em>/i.test(c),h:'<p><strong>Big</strong> and <em>soft</em></p>'},
{g:1,t:'8. Tables',x:'Tables show rows and columns. <table> holds <tr> rows, and each row holds <th> or <td> cells. Make a table with two rows.',s:'<h2>Scores</h2>\n',c:c=>/<table[\s\S]*<tr[\s\S]*<t[dh][\s\S]*<tr[\s\S]*<t[dh][\s\S]*<\/table>/i.test(c),h:'<table><tr><th>Name</th></tr><tr><td>Sam</td></tr></table>'},
{g:1,t:'9. Forms',x:'Forms collect input. Put a <label> and an <input> inside a <form>.',s:'<h2>Join us</h2>\n',c:c=>/<form[\s\S]*<label[\s\S]*<input[\s\S]*<\/form>/i.test(c),h:'<form><label>Name <input></label></form>'},
{g:1,t:'10. Div and class',x:'A <div> groups things into a block. A class name lets you style it later. Make a div with a class.',s:'<h2>Card</h2>\n',c:c=>/<div\s+[^>]*class\s*=\s*["'][^"']+["'][^>]*>[\s\S]*?<\/div>/i.test(c),h:'<div class="card">Hi</div>'},
{g:2,t:'11. Page skeleton',x:'Every real page starts with <!DOCTYPE html>, then <html>, a <head> with a <title>, and a <body>. Build the full skeleton.',s:'',c:c=>/<!doctype html>[\s\S]*<html[\s\S]*<head>[\s\S]*<title>\s*\S[\s\S]*<\/title>[\s\S]*<\/head>[\s\S]*<body>[\s\S]*<\/body>[\s\S]*<\/html>/i.test(c),h:'Add DOCTYPE, html, head with title, then body'},
{g:2,t:'12. Semantic layout',x:'Semantic tags describe the page parts: <header>, <main> and <footer>. Use all three.',s:'<h1>My site</h1>\n',c:c=>['header','main','footer'].every(t=>new RegExp('<'+t+'[^>]*>[\\s\\S]*<\\/'+t+'>','i').test(c)),h:'<header>..</header><main>..</main><footer>..</footer>'},
{g:2,t:'13. CSS with style',x:'The <style> tag changes how things look. A rule has a selector and braces, like p { color: hotpink; }. Style something.',s:'<p>Make me colorful.</p>\n',c:c=>/<style[^>]*>[\s\S]*\{[^}]*:[^}]*\}[\s\S]*<\/style>/i.test(c),h:'<style>p{color:hotpink;}</style>'},
{g:2,t:'14. Flexbox',x:'Flexbox lines items up in a row. Give a container display: flex; and put two or more children inside.',s:'<style>\n  .row { }\n</style>\n<div class="row">\n  <div>One</div>\n  <div>Two</div>\n</div>\n',c:c=>/display\s*:\s*flex/i.test(c)&&/<div[\s\S]*<div/i.test(c),h:'.row{display:flex;gap:10px;}'},
{g:2,t:'15. Final project',x:'Build a profile card. Use a div with a class, a heading, a paragraph, a link, a button, and a style tag.',s:'',c:c=>[/<div\s+[^>]*class\s*=/i,/<h[1-3][^>]*>\s*\S/i,/<p[^>]*>\s*\S/i,/<a\s+[^>]*href/i,/<button[^>]*>\s*\S/i,/<style[^>]*>[\s\S]*\{[\s\S]*\}/i].every(r=>r.test(c)),h:'You need div.class, h1-h3, p, a href, button, and style'}
];
const G=["Basic","Intermediate","Advanced"];L.forEach(l=>l.g=l.g||0);
const $=id=>document.getElementById(id);
let cur=0,done=new Set(),saved={};
try{const d=JSON.parse(localStorage.getItem("pxdone")||"[]");d.forEach(i=>done.add(i))}catch(e){}
function save(){try{localStorage.setItem("pxdone",JSON.stringify([...done]))}catch(e){}}
function list(){let h="",g=-1;L.forEach((l,i)=>{if(l.g!==g){g=l.g;h+=`<li class="grp">${G[g]}</li>`}h+=`<li><button class="${i==cur?'on':''} ${done.has(i)?'done':''}" data-i="${i}">${l.t}</button></li>`});$("list").innerHTML=h;
$("score").textContent="Stars: "+done.size+" / "+L.length}
function load(i){cur=i;$("ttl").textContent=L[i].t;$("txt").textContent=L[i].x;$("code").value=saved[i]??L[i].s;
$("msg").textContent="";$("nxt").hidden=true;show();list()}
function show(){$("prev").srcdoc='<body style="font:16px sans-serif;margin:10px">'+$("code").value}
$("list").onclick=e=>{const b=e.target.closest("button");if(b)load(+b.dataset.i)};
$("code").oninput=()=>{saved[cur]=$("code").value;show()};
$("rst").onclick=()=>{delete saved[cur];load(cur)};
$("nxt").onclick=()=>load(cur+1);
$("chk").onclick=()=>{const m=$("msg");
if(L[cur].c($("code").value)){done.add(cur);save();list();
m.className="ok";m.textContent=done.size==L.length?"All stars collected! You finished every level.":"Nice! Star earned.";
$("nxt").hidden=cur>=L.length-1}
else{m.className="no";m.textContent="Not yet. Hint: "+L[cur].h}};
load(0);

// pixel ghost sprite
(function(){const map=[".pppppp.","pppppppp","pkppkppp","pppppppp","pppppppp","pppppppp","pp.pp.pp","p.p..p.p"];
const cv=$("sprite"),g=cv.getContext("2d");
map.forEach((r,y)=>[...r].forEach((ch,x)=>{if(ch!=".")g.fillStyle=ch=="p"?"#ff6b9d":"#15163a",g.fillRect(x,y,1,1)}))})();

// scroll flow: progress bar, ghost follows, clouds parallax
const bar=$("bar"),sp=$("sprite"),cl=[...document.querySelectorAll(".cloud")];
let tick=false;
function onScroll(){tick=false;const max=document.documentElement.scrollHeight-innerHeight,p=max>0?scrollY/max:0;
bar.style.width=(p*100)+"%";bar.style.width=Math.round(p*50)*2+"%";
sp.style.top=(50+p*(innerHeight-120))+"px";
cl.forEach(c=>c.style.transform="translateY("+(-scrollY*c.dataset.s)+"px)")}
addEventListener("scroll",()=>{if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});
onScroll();
