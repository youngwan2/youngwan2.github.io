let movieImg= document.querySelector('#movie-img');
let mainContainer=document.querySelector('.main-container');



const PopularMoive=async()=>{
    let url =new URL('https://api.themoviedb.org/3/movie/popular?api_key=dd5b2707a7e0bb5f2a03f34ba3f049bc&language=en-US&page=1')
    let response = await fetch(url);
    let data =await response.json();
    console.log(data);
    let result = data.results
    console.log(result);
    console.log(result[0].poster_path);


    let popularHTML =''
    result.map((el,i)=>{
        return (
            popularHTML+=
            `<div class="main-img">
                <div><img src="https://image.tmdb.org/t/p/w500${result[i].poster_path}"></img></div>
                <div class="title" id="title">${result[i].title}</div>
                <div class="title" id="title-date">(${result[i].release_date})</div>
            </div>`
        );
    });
    mainContainer.innerHTML = popularHTML
};

PopularMoive();