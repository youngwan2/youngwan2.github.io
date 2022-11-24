let movieImg = document.querySelector('#movie-img');
let mainContainer = document.querySelector('.main-container');
let button = document.querySelectorAll('button');
let search = document.getElementById('search');
let title = document.getElementById('title');
let cateBtn = document.getElementById('cate-btn');
let category = document.querySelector('.category');
let Body = document.querySelector('body');
let modalContainer = document.querySelector('.modal-container');
let overviewContainer = document.querySelector('.overview-container');
// 카테고리(삼지창) 버튼 클릭 시 드롭다운 
if (cateBtn instanceof HTMLElement)
    cateBtn.addEventListener('click', () => {
        let categoryState = category.style.display;
        categoryState === 'none' ? category.style.display = 'flex' : category.style.display = 'none';
    });
//인풋창 입력 후 엔터 시 실행되는 클릭 이벤트 함수
if (search instanceof HTMLElement)
    search.addEventListener('keydown', (e) => {
        if (search instanceof HTMLInputElement) {
            let searchVal = search.value;
            if (e.keyCode === 13) {
                searchMovie(searchVal);
                modalContainer.style.display = 'none';
            }
            ;
        }
        ;
    });
//  메뉴 클릭 시 해당 영화 api를 호출
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
            oldMovie();
        }
        ;
    });
});
// 공통 코드 저장 함수
let url;
const Deduplication = async () => {
    try {
        let response = await fetch(url);
        let data = await response.json();
        let result = data.results;
        console.log(result);
        let status = response.status;
        let totalPages = data.total_pages;
        let contentHTML = '';
        result.map((el, i) => {
            return (contentHTML +=
                `<div class="main-img">
                <div>
                   <img 
                      onclick='modalShift("${result[i].title}","${result[i].release_date}","${result[i].vote_average}",${result[i].id})'
                      src="https://image.tmdb.org/t/p/original/${result[i].poster_path}"
                      alt="영화이미지"></img>
                </div>
                <div class="title" id="title">${result[i].title}</div>
                <div class="title" id="title-date">(${result[i].release_date})</div>
            </div>`);
        });
        if (mainContainer instanceof Element) {
            mainContainer.innerHTML = contentHTML;
        }
        ;
        if (status == 200) {
            if (totalPages == 0) {
                throw new Error('검색된 자료가 존재하지 않습니다.');
            }
            ;
        }
        else {
            throw new Error(`${status}`);
        }
        ;
    }
    catch (error) {
        alert(error);
        if (mainContainer instanceof Element) {
            mainContainer.innerHTML =
                `<div class='error'>${error}</div>`;
        }
        ;
    }
    ;
};
//영화 디테일 정보 모달창
const modalShift = (title, date, vote, id) => {
    console.log(id);
    let modal = modalContainer.style.display;
    modal == 'none' ? modalContainer.style.display = 'flex' : modalContainer.style.display = 'none';
    modalContainer.innerHTML = `
     <div onclick="modalClose()" class="modal-overlay"></div>
     <div class="modal-box">
         <p>♤ 제목: ${title}</p>
         <p>♤ 개봉날짜: ${date}</p>
         <p>♤ 평점: ${vote}</p>
         <p>♤ 줄거리:</br>
             <a class='overview-rink'
                href="./overview.html">[ 줄거리 보러가기 ]</p>
     </div>`;
};
// 클래스 modal-overlay인 div 태그 클릭 시 모달창을 닫는 함수
const modalClose = () => {
    if (modalContainer.style.display === 'flex') {
        modalContainer.style.display = 'none';
    }
    ;
};
//인기영화(메인화면)
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
//고전영화
const oldMovie = () => {
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
// ---- 임시 저장
// <div class="modal-box">
// <p><span>⊙ 제목:</span></p>
// <p><span>⊙ 평점:</span></p>
// <p><span>⊙ 장르:</span></p>
// <p><span>⊙ 개봉날짜:</span></p>
// <p><span>⊙ 줄거리:</span></p>
// </div>
