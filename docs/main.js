
document.addEventListener("DOMContentLoaded",()=>{
  const toggle=document.querySelector(".menu-toggle");
  const nav=document.querySelector(".site-nav");
  if(toggle&&nav){toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",open?"true":"false")});}
  document.querySelectorAll(".copy-btn").forEach(btn=>btn.addEventListener("click",async()=>{const txt=btn.closest(".code-box").querySelector("code").innerText;try{await navigator.clipboard.writeText(txt);btn.textContent="Copied"}catch(e){btn.textContent="Copy failed"}setTimeout(()=>btn.textContent="Copy",1000)}));
  const links=[...document.querySelectorAll(".sidebar a")];const secs=links.map(a=>document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if("IntersectionObserver" in window&&secs.length){const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.remove("active"));const a=links.find(x=>x.getAttribute("href")==="#"+e.target.id);if(a)a.classList.add("active")}})},{rootMargin:"-18% 0px -68% 0px"});secs.forEach(s=>io.observe(s));}
  const q=document.querySelector("[data-reference-search]");const refButtons=[...document.querySelectorAll("[data-ref-filter]")];const rows=[...document.querySelectorAll("[data-ref-row]")];
  function filterRef(){if(!rows.length)return;const query=q?q.value.toLowerCase().trim():"";const active=(refButtons.find(b=>b.classList.contains("active"))||{}).dataset?.refFilter||"all";rows.forEach(r=>{const tool=r.dataset.tool||"";r.hidden=(active!=="all"&&tool!==active)||(query&&!r.innerText.toLowerCase().includes(query))})}
  if(q)q.addEventListener("input",filterRef);refButtons.forEach(b=>b.addEventListener("click",()=>{refButtons.forEach(x=>x.classList.remove("active"));b.classList.add("active");filterRef()}));
  const tb=[...document.querySelectorAll("[data-trouble-filter]")];const cards=[...document.querySelectorAll("[data-problem]")];const tq=document.querySelector("[data-trouble-search]");
  function filterTrouble(){if(!cards.length)return;const query=tq?tq.value.toLowerCase().trim():"";const active=(tb.find(b=>b.classList.contains("active"))||{}).dataset?.troubleFilter||"all";cards.forEach(c=>{c.hidden=(active!=="all"&&c.dataset.problem!==active)||(query&&!c.innerText.toLowerCase().includes(query))})}
  if(tq)tq.addEventListener("input",filterTrouble);tb.forEach(b=>b.addEventListener("click",()=>{tb.forEach(x=>x.classList.remove("active"));b.classList.add("active");filterTrouble()}));
});
