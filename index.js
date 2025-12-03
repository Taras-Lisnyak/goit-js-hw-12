import{a as u,S as m,i as n}from"./assets/vendor-CNqCr-V-.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const p="53511640-00e42e73f696871d7dee14b6b",g="https://pixabay.com/api/";async function y(o){try{return(await u.get(g,{params:{key:p,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}catch(r){throw console.error("Помилка при отриманні зображень:",r),r}}const c=document.querySelector(".gallery"),h=new m(".gallery a",{captionsData:"alt",captionDelay:250});function b(o){const r=o.map(({webformatURL:i,largeImageURL:a,tags:e,likes:t,views:s,comments:f,downloads:d})=>`
      <li class="gallery-item">
        <a href="${a}">
          <img src="${i}" alt="${e}" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${t}</p>
          <p><b>Views:</b> ${s}</p>
          <p><b>Comments:</b> ${f}</p>
          <p><b>Downloads:</b> ${d}</p>
        </div>
      </li>
    `).join("");c.insertAdjacentHTML("beforeend",r),h.refresh()}function L(){c.innerHTML=""}const l=document.querySelector(".loading-text");function v(){document.querySelector(".loader").classList.add("visible"),l.classList.add("visible")}function x(){document.querySelector(".loader").classList.remove("visible"),l.classList.remove("visible")}const S=document.querySelector("#search-form");S.addEventListener("submit",async o=>{o.preventDefault();const r=o.target.elements["search-text"].value.trim();if(!r){n.warning({title:"Увага",message:"Поле пошуку не може бути порожнім!",position:"topRight",backgroundColor:"#ffc107",maxWidth:400,timeout:3e3});return}L(),v();try{const i=await y(r);if(i.hits.length===0){n.info({title:"Немає результатів",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#ff4d4d",titleColor:"#fff",messageColor:"#fff",maxWidth:432,timeout:3e3});return}b(i.hits)}catch{n.error({title:"Помилка",message:"Не вдалося завантажити зображення.",position:"topRight",backgroundColor:"#ff4d4d",titleColor:"#fff",messageColor:"#fff",maxWidth:400,timeout:3e3})}finally{x()}});
//# sourceMappingURL=index.js.map
