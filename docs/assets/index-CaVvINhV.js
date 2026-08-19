(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=()=>{let e=document.createElement(`label`);return e.className=`swap swap-rotate`,e.id=`themeToggle`,e.innerHTML=`
        <!-- this hidden checkbox controls the state -->
        <input type="checkbox" class="theme-controller" value="light" />

        <!-- sun icon -->
        <svg
            class="swap-on h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>

        <!-- moon icon -->
        <svg
            class="swap-off h-5 w-5 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
    `,e},t=e=>{e?(o?.classList.remove(`hidden`),s?.classList.add(`hidden`),localStorage.setItem(`theme`,`light`),a.checked=!0,document.documentElement.setAttribute(`data-theme`,`light`)):(o?.classList.add(`hidden`),s?.classList.remove(`hidden`),localStorage.setItem(`theme`,`dark`),document.documentElement.setAttribute(`data-theme`,`dark`),a.checked=!1)},n=()=>{let e=localStorage.getItem(`theme`);t(!e||e===`light`)},r=(e,t,n=!1)=>{let r=document.createElement(`span`);return r.id=`${e}-theme`,r.className=`theme text-base font-sans font-medium`,r.textContent=t,n||r.classList.add(`text-white`),n&&r.classList.add(`hidden`),r},i=(t=>{let n=document.createElement(`nav`);n.className=`navbar bg-base-100 h-20 shadow-sm`,n.innerHTML+=`
        <header class="flex-1 ms-10">
            <a class="btn btn-ghost text-xl font-bold title">${t}</a>
        </header>
    `;let i=document.createElement(`div`);i.className=`flex items-center gap-2 me-20 themeArea`;let a=e();return i.appendChild(a),i.appendChild(r(`light`,`Light Mode`,!0)),i.appendChild(r(`dark`,`Dark Mode`)),n.appendChild(i),n})(`Where in the world?`),a=i.querySelector(`#themeToggle`)?.querySelector(`input`),o=i.querySelector(`#light-theme`),s=i.querySelector(`#dark-theme`);document.getElementById(`body`).prepend(i),n(),a.addEventListener(`change`,()=>{a.checked?t(!0):t(!1)});var c=e=>{let t=document.createElement(`label`);return t.className=`input searchInput`,t.innerHTML=`
        <svg class="h-[1.3em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
            >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
            </g>
        </svg>

        <input id='searchEntries' class='ps-4' type="search" required placeholder="${e}" />
    `,t},l=e=>{let t=document.createElement(`a`);return t.dataset.region=e,t.textContent=e,t},u=(e,t,n)=>{let r=document.createElement(`button`),i=document.createElement(`ul`);return r.className=`btn dropdownBtn`,r.setAttribute(`popovertarget`,`popover-${t}`),r.style.anchorName=`--anchor-${t}`,r.innerHTML=`
        <span>${e}</span>
        <svg class="rotate-90 h-6 w-6 fill-current md:h-8 md:w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
        </svg>
        `,i.className=`dropdownItems dropdown menu w-52 rounded-box bg-base-100 shadow-sm`,i.setAttribute(`popover`,``),i.id=`popover-${t}`,i.style.positionAnchor=`--anchor-${t}`,n.forEach(e=>{let t=document.createElement(`li`);t.appendChild(l(e)),i.appendChild(t)}),[r,i]},d=e=>{let t=[];e.borderCountries.forEach(e=>t.push(C(e)?.name??``));let n=document.createElement(`div`);return n.className=`flex flex-1 flex-col lg:flex-row md:h-95 gap-10 justify-between lg:justify-around mt-10`,n.innerHTML=`
        <div class='w-97 xl:w-130 aspect-3/2 mx-auto hover-3d'>

        <figure class="">
            <img class='w-full aspect-3/2' src="${e.flagRoute}" alt="Flag of ${e.name}" />
        </figure>

        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </div>

        <section class="sm:justify-around sm:mx-auto">
            <h2 class='countryTitle ms-[1%] sm:ms-0'>${e.name}</h2>
            <section class='flex flex-col sm:flex-row sm:gap-25 mt-5 ms-[1%] sm:ms-0'>
                <article class='flex flex-col gap-2 mb-2'>
                    <p>Native Name: <span>${e.nativeName}</span></p>
                    <p>Population: <span>${e.population}</span></p>
                    <p>Region: <span>${e.region}</span></p>
                    <p>Sub Region: : <span>${e.subRegion}</span></p>
                    <p>Capital: <span>${e.capital.join(`, `)}</span></p>
                </article>
                <article class='flex flex-col gap-2'>
                    <p>Top Level Domain: <span>${e.domain}</span></p>
                    <p>Currencies: <span>${e.currencies.join(`, `)}</span></p>
                    <p>Languages: <span>${e.languages.join(`, `)}</span></p>
                </article>
            </section>
            <section class="flex flex-col sm:flex-row mt-6 sm:mt-15 gap-2 items-start sm:items-center ms-[1%] sm:ms-0">
                <p class='mb-2 sm:mb-0'>Border Countries: </p>
                <div class="flex flex-wrap justify-start gap-2">
                    ${f(t).innerHTML}
                </div>
            <section>
        </section>
    `,n},f=e=>{let t=document.createElement(`div`);return e.forEach(e=>{let n=document.createElement(`div`);n.className=`countryStack shadow-lg flex items-center justify-center`,n.textContent=e,t.appendChild(n)}),t},p=e=>{let t=document.createElement(`div`);return t.className=`card w-85 md:w-60 shadow-lg mt-10 mb-5 mx-auto rounded-[.6rem]`,t.dataset.code=e.code,t.innerHTML=`
        <div class="hover-3d md:h-34 aspect-3/2">
            <figure >
            <img
                class='w-full h-full cardTopLeft cardTopRight'
                src="${e.flagRoute}"
                alt="${e.name}'s flag"/>
            </figure>
            <!-- 8 empty divs needed for the 3D effect -->
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>

        <article class="card-body">
            <div class='cardContent flex flex-col gap-1 '>
            <h2 class="card-title">${e.name}</h2>
            <p>Population: <span>${e.population}</span></p>
            <p>Region: <span>${e.region}</span></p>
            <p>Capital: <span>${e.capital}</span></p>
            </div>
            <div class="card-actions justify-end">
            </div>
        </article>
    `,t},m=e=>e.map(e=>p(e)),h=e=>{let t=e.codes?.alpha_3||`UNK`,n=e.names?.official||`No Oficial Name`,r=e.population||0,i=e.subregion||`No available`,a=e.region||`No available`,o=e.borders||[`N/A`],s=e.flag?.url_png||`../../assets/placeholder-flag.webp`,c=e.tlds?.length?e.tlds[0]:`No domain`,l=e.names?.native?Object.values(e.names.native).map(e=>e.official):[`N/A`],u=e.languages?.length?e.languages.map(e=>e.iso639_1||e.name):[`No Oficial Language`],d=e.capitals?.length?e.capitals.map(e=>e.name):[`No oficial capital`],f=e.currencies?.length?e.currencies.map(e=>e.code):[`No oficial currency`];return console.log(n),{code:t,name:n,nativeName:l,population:r,region:a,subRegion:i,capital:d,languages:u,domain:c,currencies:f,borderCountries:o,flagRoute:s}},g=async(e=20,t=0)=>{try{let n=await fetch(`https://api.restcountries.com/countries/v5?limit=${e}&offset=${t}&response_fields=codes.alpha_3,names.official,languages,names.native,population,region,subregion,capitals.name,tlds,currencies.code,borders,flag.url_png`,{method:`GET`,headers:{Authorization:`Bearer rc_live_6de58c276c8c48c5b45ff954231d9d39`}});if(!n.ok)throw Error(`Not able to get data`);let r=await n.json();console.log(r);let i=r.data.objects.map(e=>h(e));return console.log(i),i}catch(e){return console.error(e),[]}},_=[],v=localStorage.getItem(`countries`);v&&v.length?_=JSON.parse(v):(_.push(...await g(100)),_.push(...await g(100,100)),_.push(...await g(100,200)),localStorage.setItem(`countries`,JSON.stringify(_)));var y=[`DEU`,`USA`,`BRA`,`ISL`,`AFG`,`ALA`,`ALB`,`DZA`,`ECU`,`COL`],b=[],x=_.filter(e=>y.includes(e.code));y.forEach(e=>{let t=x.find(t=>t.code===e);t&&b.push(t)});var S=b,C=(e,t=_)=>t.find(t=>t.code===e),w=document.getElementById(`searchFilter`),T=document.getElementById(`content`),E=document.createElement(`button`),D=c(`Search for a country...`),O=D.querySelector(`input`),k=[`grid`,`grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]`],A=[`Africa`,`Americas`,`Asia`,`Europe`,`Oceania`,`Reset Filter`],j=A[5],[M,N]=u(`Filter by Region`,1,A);function P(e,t=!1){t&&(w.innerHTML=``,w.appendChild(D),w.appendChild(M),w.appendChild(N)),T.innerHTML=``,T.classList.add(k[0]),T.classList.add(k[1]),m(e).map(e=>T.appendChild(e))}function F(e){w.innerHTML=``,T.innerHTML=``,T.classList.remove(k[0]),T.classList.remove(k[1]),E.className=`btn backBtn mt-7 mb-9 ms-9`,E.innerHTML=`
    <svg class="h-6 w-6 fill-current" viewBox="0 -960 960 960">
    <path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/>
    </svg>
    
    <span">Back<span>`,w.appendChild(E),T.appendChild(d(e))}E.addEventListener(`click`,()=>{P(S,!0)}),T.addEventListener(`click`,e=>{let t=e.target.closest(`.card`);if(!t)return;let n=C(t.dataset.code??``);n&&F(n)}),O.addEventListener(`input`,()=>{let e=A[5],t=O.value.trim().toLowerCase(),n=[];n=t===``&&j===e?b:t===``?_.filter(e=>e.region===j):j===e?_.filter(e=>e.name.toLowerCase().includes(t)):_.filter(e=>e.region===j&&e.name.toLowerCase().includes(t)),S=n,P(n)}),N.addEventListener(`click`,e=>{let t=e.target.closest(`a`);t&&(j=t.dataset.region||``,S=j===A[5]?b:_.filter(e=>e.region===j),P(S))}),P(b,!0);