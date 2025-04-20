---

layout: layouts/index.njk
title: Beranda
description: Halaman Utama
quote: No, this is not your first day.

---

<div class="content home section-informasi__ul">
<div class="index__header ">
<div style="padding: unset;" class="postingan__p">
  
# Alexander "Anderezya"
  
Pengembang Web Amatir dan Pengamat Teknologi Informasi di waktu luang.
  
</div>
<img alt="Anderezya Logo" style="max-width: 200px; width: 100%; aspect-ratio: 1/1;" src="./external/asset/Anderezya_November.svg">
</div>
<div class="separator"></div>

# Artikel

Pedoman, Tutorial, dan Topik Menarik

  <div style="flex: 1; grid-area: primary-container3">
  <article class="primary-container">
    <section style="justify-content: space-between;" class="secondary-container--nogap">
     <ul class="secondary-container--postingan" >
 {%- for post in collections.artikel | reverse -%}   
        <li class="secondary-container--styled" {% if page.url == post.url %} aria-current="page" {% endif %} >
          <article>
          <a href="{{ post.url }}">
          <header class="container__header" style="border-bottom: unset;">
            <h3>{{ post.data.title }}</h3>
            <h4>{{ post.data.page.date | htmlDateString }}</h4>
          </header>
             </a>
          </article>
        </li>
       {%- endfor -%}
   </ul>
       <p class="click container__p"><a href="/konten">Lihat Semua Artikel</a></p>
      </section>
    </article>
</li>
</div>

<div class="separator"></div>

# Postingan

Perkembangan, Rongsokan, dan Hal pribadi lainnya

<div style="flex: 1; grid-area: primary-container4">
<article class="primary-container">
    <section style="justify-content: space-between;" class="secondary-container--nogap">
    <ul style="flex: unset; flex-direction: column-reverse;" class="limit secondary-container" >
 {%- for post in collections.postingan -%}   
        <li style="flex: unset;" class="secondary-container--styled" {% if page.url == post.url %} aria-current="page" {% endif %} >
          <article>
          <a href="{{ post.url }}">
          <header style="border-bottom: unset;" class="container__header row">
            <h3>{{ post.data.title }}</h3>
            <h4>{{ post.data.page.date | htmlDateString }}</h4>
          </header>
             </a>
          </article>
        </li>
       {%- endfor -%}
   </ul>
       <p class="click container__p"><a href="/konten">Lihat Semua Postingan</a></p>
      </section>
    </article>
</div>

</div>
