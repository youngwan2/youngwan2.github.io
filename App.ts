let movieImg= document.querySelector('#movie-img');
let mainContainer=document.querySelector('.main-container');
let button=document.querySelectorAll('button');
let search = document.getElementById('search');
let title = document.getElementById('title');
let cateBtn = document.getElementById('cate-btn');
let category:any = document.querySelector('.category');
let Body =document.querySelector('body');
let modalContainer:any = document.querySelector('.modal-container');




if(cateBtn instanceof HTMLElement)
cateBtn.addEventListener('click',()=>{
   let categoryState:HTMLElement|string = category.style.display;
   categoryState==='none'? category.style.display='flex': category.style.display='none';
    
});



if(search instanceof HTMLElement)
search.addEventListener('keydown',(e)=>{
    if(search instanceof HTMLInputElement){
    let searchVal = search.value;
     if(e.keyCode===13){ 
        searchMovie(searchVal);
        modalContainer.style.display='none'

     };
    };
 });


button.forEach((btnEl)=>{
    btnEl.addEventListener('click',()=>{
        if(btnEl.textContent ==='인기영화'){
            popularMoive();
        } else if(btnEl.textContent ==='개봉예정영화'){
            recentMovie();
        } else if(btnEl.textContent ==='한국영화'){
            koreanMovie();
        } else{
            oldMovie();
        }
    });
 });



let url:URL;
const Deduplication = async() =>{
    try{
    let response = await fetch(url);
    let data =await response.json();
    let result = data.results
    console.log(result)
    let status = response.status
    let totalPages=data.total_pages
    console.log(result.overview)

    let contentHTML =''
    result.map((el:any,i:number)=>{
        return (
            contentHTML+=
            `<div class="main-img">
                <div>
                   <img 
                      onclick='modalShift("${result[i].title}","${result[i].release_date}","${result[i].vote_average}","${result[i].overview}")'
                      src="https://image.tmdb.org/t/p/original/${result[i].poster_path}"
                      alt="영화이미지"></img>
                </div>
                <div class="title" id="title">${result[i].title}</div>
                <div class="title" id="title-date">(${result[i].release_date})</div>
            </div>` )}) 

    if(mainContainer instanceof Element){ 
        mainContainer.innerHTML = contentHTML
    };

        
    if(status==200){
        if(totalPages == 0){
            throw new Error('검색된 자료가 존재하지 않습니다.');
        }; 
     } else {
        throw new Error(`${status}`);
     };
    
    } catch(error){
        alert(error);
        if(mainContainer instanceof Element){ 
            mainContainer.innerHTML =
        `<div class='error'>${error}</div>`
        };
    };
};

//영화 디테일 정보 모달창
const modalShift=(title:string,date:string,vote:string,overview:string)=>{
    let modal = modalContainer.style.display
     modal =='none' ? modalContainer.style.display='flex': modalContainer.style.display='none'


    if(overview[0] ==''){
     modalContainer.innerHTML=`
     <div class="modal-box">
         <p>□ 제목: ${title}</p>
         <p>□ 개봉날짜: ${date}</p>
         <p>□ 평점: ${vote}</p>
         <p>□ 줄거리:</br> <span>줄거리 정보가 존재하지 않습니다.</span> </p>
     </div>`

    } else{
     modalContainer.innerHTML=`
     <div class="modal-box">
         <p>□ 제목: ${title}</p>
         <p>□ 개봉날짜: ${date}</p>
         <p>□ 평점: ${vote}</p>
         <p>□ 줄거리:</br>${overview}</p>
     </div>`
    };
};




//인기영화
const popularMoive=()=>{
    if(title instanceof HTMLElement) title.innerHTML = '인기영화';
    url =new URL('https://api.themoviedb.org/3/movie/popular?api_key=dd5b2707a7e0bb5f2a03f34ba3f049bc&language=ko&page=1')
    Deduplication();
};

popularMoive();


//최근 개봉 예정 영화
const recentMovie=() =>{
    if(title instanceof HTMLElement) title.innerHTML ='개봉예정영화'
    url =new URL('https://api.themoviedb.org/3/discover/movie?api_key=dd5b2707a7e0bb5f2a03f34ba3f049bc&language=ko&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate')
    Deduplication();
};

//한국영화
const koreanMovie=()=>{
    if(title instanceof HTMLElement) title.innerHTML ='한국영화';
    url =new URL('https://api.themoviedb.org/3/discover/movie?api_key=dd5b2707a7e0bb5f2a03f34ba3f049bc&language=ko&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_original_language=ko&with_watch_monetization_types=flatrate')
    Deduplication();
}

//고전영화
const oldMovie=()=>{
    if(title instanceof HTMLElement) title.innerHTML ='고전영화';
    url=new URL('https://api.themoviedb.org/3/discover/movie?api_key=dd5b2707a7e0bb5f2a03f34ba3f049bc&language=ko&sort_by=release_date.asc&include_adult=false&include_video=false&page=1&with_original_language=&with_watch_monetization_types=flatrate')
    Deduplication();
}

//영화 키워드 검색
const searchMovie=(searchVal:string)=>{
    if(title instanceof HTMLElement) title.innerHTML = '키워드 검색';
    url = new URL(`https://api.themoviedb.org/3/search/movie?api_key=dd5b2707a7e0bb5f2a03f34ba3f049bc&language=ko&query=${searchVal}&page=1`)
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