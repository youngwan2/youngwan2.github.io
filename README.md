# Movie Seacrch App



■ 개요
- 간단하게 영화정보를 확인할 수 있는 앱 입니다.
- 인기영화, 한국영화, 외국영화, 최신영화, 키워드 검색을 지원합니다(미완)
- The Movie DB에서 제공하는 open API와 연동하여 정보를 가져옵니다.
- 페이지네이션을 통해 총 120페이지 까지 영화 정보를 불러올 수 있습니다.
- 영화 장르별로 영화 목록을 가져올 수 있습니다(기능 미구현)

■ 진행상황
- 2022년 11월 23일 : 이미지 클릭 시 디테일 내용이 확인 가능한 모달창이 추가 됨
그러나 일부 모달창의 경우 Uncaught SyntaxError: Invalid or unexpected token 에러가 뜨면서 이벤트가 실행되지 않음
원인으로는 함수(" ) 와 같이 큰 따옴표가 누락되어서 라고 하는데, 이런저런 수정을 해봐도 해결되지 않음
향후 에러를 개선하고 페이지네이션을 추가할 예정.
- 2022년 12월 11일 : 페이지네이션 기능 구현, 자잘한 에러처리 및 UI 수정 등 실시 , 22년 11월 23일 경에 발생했던 에러문제 현재 진행중



■ 링크
- https://movieseacrch.netlify.app/
- youngwan2.github.io

■ 스크린샷

![영화앱이미지(pc)](https://user-images.githubusercontent.com/107159871/206890206-3ada400d-592c-4e4e-b745-031d4ca91b62.PNG)
![영화앱이미지](https://user-images.githubusercontent.com/107159871/206890208-3c4b03bf-2a0c-431c-80e6-323ec6ad343e.PNG)
