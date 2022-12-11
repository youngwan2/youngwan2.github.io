let movieImg = document.querySelector("#movie-img");
let mainContainer = document.querySelector(".main-container");
let button = document.querySelectorAll("button");
let search = document.getElementById("search");
let title = document.getElementById("title");
let cateBtn = document.getElementById("cate-btn");
let category = document.querySelector(".category");
let Body = document.querySelector("body");
let modalContainer = document.querySelector(".modal-container");
let overviewContainer = document.querySelector(".overview-container");
let topShiftBtn = document.querySelector(".top-shift");
// 페이지가 0이면 에러가 발생하므로 초기 페이지 넘버를 1로 설정함
let page = 1;
let totalPages = 120;
// 카테고리(삼지창) 버튼 클릭 시 드롭다운
if (cateBtn instanceof HTMLElement)
    cateBtn.addEventListener("click", () => {
        let categoryState = category.style.display;
        categoryState === "none"
            ? (category.style.display = "flex")
            : (category.style.display = "none");
    });
//인풋창 입력 후 엔터 시 실행되는 클릭 이벤트 함수
if (search instanceof HTMLElement)
    search.addEventListener("keydown", (e) => {
        if (search instanceof HTMLInputElement) {
            let searchVal = search.value;
            if (e.keyCode === 13) {
                searchMovie(searchVal);
                modalContainer.style.display = "none";
            }
        }
    });
//  메뉴 클릭 시 해당 영화 api를 호출
button.forEach((btnEl) => {
    btnEl.addEventListener("click", () => {
        if (btnEl.textContent === "인기영화") {
            popularMoive();
        }
        else if (btnEl.textContent === "개봉예정영화") {
            recentMovie();
        }
        else if (btnEl.textContent === "한국영화") {
            koreanMovie();
        }
        else {
            oldMovie();
        }
    });
});
// 공통 코드 저장 함수
let url;
const Deduplication = async () => {
    try {
        url.searchParams.set("page", page);
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        let result = data.results;
        console.log(result);
        let status = response.status;
        let pageNum = data.page;
        let totalPages = data.total_pages;
        pageShift(pageNum);
        let contentHTML = "";
        result.map((el, i) => {
            return (contentHTML += `<div class="main-img">
                    <div>
                    <img 
                        onclick='modalShift("${result[i].title}","${result[i].release_date}","${result[i].vote_average}","${result[i].overview}")'
                        src="https://image.tmdb.org/t/p/original/${result[i].poster_path}"
                        onerror="this.src ='./이미지대체.png'"
                        alt="영화이미지"></img>
                    </div>
                    <div class="title" id="title">${result[i].title}</div>
                    <div class="title" id="title-date">(${result[i].release_date})</div>
                </div>`);
        });
        if (mainContainer instanceof Element) {
            mainContainer.innerHTML = contentHTML;
        }
        page = 1;
        if (status == 200) {
            if (totalPages == 0) {
                throw new Error("검색된 자료가 존재하지 않습니다.");
            }
        }
        else {
            throw new Error(`${status}`);
        }
    }
    catch (error) {
        alert(error);
        if (mainContainer instanceof Element) {
            mainContainer.innerHTML = `<div class='error'>${error}</div>`;
        }
    }
};
//영화 디테일 정보 모달창
const modalShift = (title, date, vote, overview) => {
    let modal = modalContainer.style.display;
    modal == "none"
        ? (modalContainer.style.display = "flex")
        : (modalContainer.style.display = "none");
    modalContainer.innerHTML = `
     <div 
        onclick="modalClose()" 
        class="modal-overlay"></div> 
     <div 
        class="modal-box">
         <p>◎ 제목: ${title}</p>
         <p>◎ 개봉날짜: ${date}</p>
         <p>◎ 평점: ${vote}</p>
         <p>◎ 줄거리:${overview !== "" ? overview : "줄거리 정보가 존재하지 않습니다."}</p>
     </div>

     <button 
         onclick="delBtn()"
         class='del-btn'>X
      </button>`;
};
// 모달창 바깥 영역 클릭 시 모달창 닫음
const modalClose = () => {
    if (modalContainer.style.display === "flex") {
        modalContainer.style.display = "none";
    }
};
// 모달창 X 버튼 클릭 시 모달창 닫음
const delBtn = () => {
    modalClose();
};
//인기영화(메인화면)
const popularMoive = () => {
    if (title instanceof HTMLElement)
        title.innerHTML = "인기영화";
    url = new URL("https://api.themoviedb.org/3/movie/popular?api_key=dd5b2707a7e0bb5f2a03f34ba3f049bc&language=ko&page=1");
    Deduplication();
};
popularMoive();
//최근 개봉 예정 영화
const recentMovie = () => {
    if (title instanceof HTMLElement)
        title.innerHTML = "개봉예정영화";
    url = new URL("https://api.themoviedb.org/3/discover/movie?api_key=dd5b2707a7e0bb5f2a03f34ba3f049bc&language=ko&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate");
    Deduplication();
};
//한국영화
const koreanMovie = () => {
    if (title instanceof HTMLElement)
        title.innerHTML = "한국영화";
    url = new URL("https://api.themoviedb.org/3/discover/movie?api_key=dd5b2707a7e0bb5f2a03f34ba3f049bc&language=ko&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&with_original_language=ko&with_watch_monetization_types=flatrate");
    Deduplication();
};
//고전영화
const oldMovie = () => {
    if (title instanceof HTMLElement)
        title.innerHTML = "고전영화";
    url = new URL("https://api.themoviedb.org/3/discover/movie?api_key=dd5b2707a7e0bb5f2a03f34ba3f049bc&language=ko&sort_by=release_date.asc&include_adult=false&include_video=false&page=1&with_original_language=&with_watch_monetization_types=flatrate");
    Deduplication();
};
//영화 키워드 검색
const searchMovie = (searchVal) => {
    if (title instanceof HTMLElement)
        title.innerHTML = "키워드 검색";
    url = new URL(`https://api.themoviedb.org/3/search/movie?api_key=dd5b2707a7e0bb5f2a03f34ba3f049bc&language=ko&query=${searchVal}&page=1`);
    Deduplication();
};
//최상단 이동 버튼
topShiftBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
// 페이지 네이션 영역
const pageShift = (pageNum) => {
    console.log("현재페이지(pageShift):", pageNum);
    //     전체 페이지
    //     현재 페이지
    //     현재 페이지 그룹 = Math.ceil(현재페이지/한 화면에 보여줄 페이지 수)
    //     마지막 페이지 = 현재 페이지 그룹 * 한 화면에 보여줄 페이지 수
    //     첫 페이지 = 마지막 페이지 -(화면에 보여줄 페이지 수 - 1)
    //     페이지네이션을 1~5 까지 그려준다.
    //     페이지를 클릭 할 때 해당하는 페이지 번호가 현재 페이지 변수에 저장되고,
    //     저장된 번호를 api 호출 함수가 받아서 url 에 파라미스를 넣어주는 형식으로 저장
    let currentPageGroup = Math.ceil(pageNum / 5);
    let lastPage = currentPageGroup * 5;
    let firstPage = lastPage - (5 - 1);
    let paginationHTML = "";
    //페이지번호가 1이 아닌경우에만 뒤로가기, 처음 위치 이동 버튼 보여줌.
    pageNum !== 1 ?
        paginationHTML = `
            <li 
                onclick="movePage(${1})"
                class="page-item">
                    <a class="page-link"  href="#"> << </a>
            </li>

            <li 
                onclick="movePage(${pageNum - 1})"
                class="page-item">
                    <a class="page-link" href="#"> < </a>
            </li>` : null;
    for (let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `
            <li 
                onclick="movePage(${i})"
                class="page-item "${i !== page ? "render" : null}>
                    <a 
                        class="page-link"
                        href="#">${i}</a>
            </li>`;
    }
    //페이지번호가 120(총 페이지)이 아닌경우에만 앞으로가기, 마지막페이지가기 버튼 보여줌
    pageNum !== 120 ?
        paginationHTML += `
            <li 
                onclick="movePage(${pageNum + 1})"
                style="margin-left:5px" 
                class="page-item">
                    <a class="page-link" 
                       href="#">></a>
            </li>

            <li 
                onclick="movePage(${totalPages})"
                class="page-item">
                    <a 
                        class="page-link" 
                        href="#">>></a>
            </li>` : null;
    let pageList = document.querySelector(".pagination");
    pageList !== null ? (pageList.innerHTML = paginationHTML) : null;
};
//페이지네이션 조작 시 이동토록 함.
const movePage = (newPageNum) => {
    page = newPageNum;
    Deduplication();
};
