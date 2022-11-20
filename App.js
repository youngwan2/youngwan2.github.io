let movieImg = document.querySelector('#movie-img');
let mainContainer = document.querySelector('.main-container');
let button = document.querySelectorAll('button');
let search = document.getElementById('search');
let title = document.getElementById('title');
if (search instanceof HTMLElement)
    search.addEventListener('keydown', (e) => {
        if (search instanceof HTMLInputElement) {
            let searchVal = search.value;
            if (e.keyCode === 13) {
                searchMovie(searchVal);
            }
            ;
        }
        ;
    });
button.forEach((btnEl) => {
    btnEl.addEventListener('click', () => {
        if (btnEl.textContent === '인기영화') {
            popularMoive();
        }
        else if (btnEl.textContent === '개봉예정영화') {
            recentMovie();
        }
        else if (btnEl.textContent === '한국영화') {
            koreanMovie();
        }
        else {
            foreignMovie();
        }
    });
});
let url;
const Deduplication = async () => {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    let result = data.results;
    let contentHTML = '';
    result.map((el, i) => {
        return (contentHTML +=
            `<div class="main-img">
                <div><img src="https://image.tmdb.org/t/p/w500${result[i].poster_path}"></img></div>
                <div class="title" id="title">${result[i].title}</div>
                <div class="title" id="title-date">(${result[i].release_date})</div>
            </div>`);
    });
    if (mainContainer instanceof Element)
        mainContainer.innerHTML = contentHTML;
};
//인기영화
const popularMoive = () => {
    if (title instanceof HTMLElement)
        title.innerHTML = '인기영화';
    url = new URL('https://api.themoviedb.org/3/movie/popular?api_key=dd5b2707a7e0bb5f2a03f34ba3f049bc&language=ko&page=1');
    Deduplication();
};
popularMoive();
//최근 개봉 예정 영화
const recentMovie = () => {
    if (title instanceof HTMLElement)
        title.innerHTML = '개봉예정영화';
    url = new URL('https://api.themoviedb.org/3/discover/movie?api_key=dd5b2707a7e0bb5f2a03f34ba3f049bc&language=ko&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate');
    Deduplication();
};
//한국영화
const koreanMovie = () => {
    if (title instanceof HTMLElement)
        title.innerHTML = '한국영화';
    url = new URL('https://api.themoviedb.org/3/discover/movie?api_key=dd5b2707a7e0bb5f2a03f34ba3f049bc&language=ko&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_original_language=ko&with_watch_monetization_types=flatrate');
    Deduplication();
};
//외국영화
const foreignMovie = () => {
    if (title instanceof HTMLElement)
        title.innerHTML = '고전영화';
    url = new URL('https://api.themoviedb.org/3/discover/movie?api_key=dd5b2707a7e0bb5f2a03f34ba3f049bc&language=ko&sort_by=release_date.asc&include_adult=false&include_video=false&page=1&with_original_language=&with_watch_monetization_types=flatrate');
    Deduplication();
};
//영화 키워드 검색
const searchMovie = (searchVal) => {
    if (title instanceof HTMLElement)
        title.innerHTML = '키워드 검색';
    url = new URL(`https://api.themoviedb.org/3/search/movie?api_key=dd5b2707a7e0bb5f2a03f34ba3f049bc&language=ko&query=${searchVal}&page=1`);
    Deduplication();
};
