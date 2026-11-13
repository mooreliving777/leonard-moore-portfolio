/* Portfolio motion. Progressively enhanced; no trackers or network calls. */
(() => {
 "use strict";
 if(!document.body || !window.matchMedia)return;
 const reduced=matchMedia("(prefers-reduced-motion: reduce)");
 if(reduced.matches)return;
 document.body.classList.add("motion-ready");
 let observer=null;
 if("IntersectionObserver" in window){
   observer=new IntersectionObserver((entries,obs)=>{
      for(const item of entries)if(item.isIntersecting){item.target.classList.add("lm-visible");obs.unobserve(item.target)}
   },{rootMargin:"0px 0px -7% 0px",threshold:.07});
   const nodes=document.querySelectorAll("main .section,main .feature,main .project-card,main .case-grid,main .lab h2,main .lab ol");
   let index=0;
   for(const el of nodes){
     if(el.getBoundingClientRect().top<innerHeight*.82)continue;
     el.style.setProperty("--lm-delay",((index++%3)*75)+"ms");
     el.classList.add("lm-reveal");observer.observe(el);
   }
 }
 const progress=document.createElement("div");progress.className="lm-progress";progress.setAttribute("aria-hidden","true");document.body.appendChild(progress);
 let frame=false;
 const draw=()=>{frame=false;const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform="scaleX("+(max>0?Math.min(1,Math.max(0,scrollY/max)):0).toFixed(4)+")"};
 const schedule=()=>{if(!frame){frame=true;requestAnimationFrame(draw)}};
 addEventListener("scroll",schedule,{passive:true});addEventListener("resize",schedule,{passive:true});schedule();
 function stop(){document.body.classList.remove("motion-ready");if(observer)observer.disconnect();document.querySelectorAll(".lm-reveal").forEach(el=>{el.classList.add("lm-visible");el.classList.remove("lm-reveal")});progress.remove();removeEventListener("scroll",schedule);removeEventListener("resize",schedule)}
 if(reduced.addEventListener)reduced.addEventListener("change",event=>{if(event.matches)stop()});
})();
