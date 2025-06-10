# 스타벅스 웹사이트 클론코딩
<br>
메인페이지, 서브페이지, 로그인페이지를 반응형으로 제작<br>
제작시기 : 2024.11 <br><br>
link: https://kminjoo9093.github.io/Starbucks/
<br><br>
<img src="https://github.com/user-attachments/assets/a97529a1-d576-4982-b6bb-ca7c2d5eca6f" height="250">
<img src="https://github.com/user-attachments/assets/88b35970-a907-48a2-8fd9-47c771172bd6" height="250">
<img src="https://github.com/user-attachments/assets/0f1c349c-587c-4c04-ad16-2ed308ac2130" height="200">

<br><br><br>
## 🛠 &nbsp; 사용기술
- HTML
- CSS
- JAVASCRIPT
- JQUERY
- BXSLIDER

  <br><br><br>

## 💻 &nbsp; 주요 기능

### 1.메인페이지의 공지사항, 서브페이지의 보도자료 내용 롤링효과
<br>
<img width="700" alt="image" src="https://github.com/user-attachments/assets/566463a0-06be-4fc3-890f-52ece6c3a807" />
<br><br>
1️⃣ 첫번째 요소가 아닌 경우 요소의 높이만큼 위로 위치 이동<br><br>
2️⃣ 위치 이동 후 시간차를 두고 첫번째 요소는 배열에서 삭제했다가(shift()) 반복 실행을 위해 마지막요소로 다시 추가(push())<br><br>
3️⃣ 바뀐 순서를 실제 dom에 반영하기 위해 배열의 전체 요소를 컨테이너에서 순서대로 삭제하며 자식으로 다시 넣어준다 (appendChild())<br><br>
4️⃣ 모든 요소의 위치를 초기화 시킨다 translateY(0)<br><br>
5️⃣ 반복을 위해 setInterval로 rollingUp함수를 실행<br><br>
<br>

**[ 관련 코드 ]**

```js
function rollingUp() {
  const linkContainer = document.querySelector(".notice-contents-ani");
  if(!linkContainer) return;
  const linksArray = Array.from(linkContainer.querySelectorAll("a"));
  const countLinks = linksArray.length;
  const linkHeight = linkContainer.clientHeight / countLinks;
  
  linksArray.forEach((link, index) => {
    if (index > 0) {       // 첫 번째 요소가 아닌 경우, 위로 이동
      link.style.transform = `translateY(-${linkHeight}px)`;
      link.style.transition = `transform 0.3s ease-in`;
    }
  });
  
  setTimeout(() => {
    // 첫 번째 요소가 맨 아래로 이동한 후, 애니메이션 초기화
    const firstLink = linksArray.shift(); // 첫 번째 요소를 제거
    linksArray.push(firstLink); // 배열에 다시 추가

    linksArray.forEach((link) => {
      // 실제 dom에 변경된 요소 순서를 반영
      linkContainer.appendChild(link);
      // 모든 요소의 위치를 초기화
      link.style.transform = "translateY(0)";
    });
  }, 300);
}

setInterval(rollingUp, 4000);
```
<br><br>

### 🧪 &nbsp; 구현 과정에서 시도한 다른 접근 방식

```js
function rollingUp() {
  let linkContainer = document.querySelector(".notice-contents-ani");
  let links = document.querySelectorAll(".notice-contents-ani a");
  const linksArr = Array.from(links);
  const countLinks = linksArr.length;
  const linkHeight = linkContainer.clientHeight / countLinks;
  const lastLinkPos = linkHeight * (countLinks - 1); //마지막 요소의 Y위치

  linksArr.forEach((link, index) => {
    if (index === 0) {
      setTimeout(() => {
        link.style.transform = `translateY(${lastLinkPos}px)`; //첫 요소인 경우 마지막 포지션으로
        index = countLinks - 1;
      }, 300);
    } else {
      //첫 요소가 아닌 경우
      link.style.transform = `translateY(-${linkHeight}px)`;
      link.style.transition = `transform 0.3s ease-in`;
      index--;
    }
  });
}
setInterval(rollingUp, 4000);
```
<br>

**[구현 실패 원인 분석]** <br><br>
🆖 업데이트된 요소들의 순서를 실제 dom에 반영하지 않은 점<br><br>
🆖 index 변수는 forEach문 안에서만 일시적으로 유효하기 때문에 수동으로 수정하더라도 index값이 다음 반복에는 영향을 미치지 않는다<br><br>
<br><br><br><br>
<hr>

### 2. 메인페이지 슬라이드 애니메이션

<img width="450" alt="image" src="https://github.com/user-attachments/assets/11399259-0d61-4195-9e24-9ef0d8b0338d" />
<img width="450" alt="image" src="https://github.com/user-attachments/assets/cae67b9c-5c08-4516-a759-621d8aea61fc" />
<br>
<br>
1️⃣ 해당 섹션에 active클래스가 추가되면 슬라이딩 애니메이션이 실행하도록 스타일링 <br><br>
2️⃣ IntersectionObserver 객체 생성하여, observeTarget로 받은 관찰 대상(섹션)이 뷰포트에 보이는지 여부 체크(isIntersecting === true)<br><br>
3️⃣ 화면에 보이면 해당 섹션에 애니메이션을 적용하기 위한 active 클래스를 추가하고, 화면에서 벗어나면 클래스 제거하도록<br><br>


**[ 관련 코드 : CSS ]**

```css
.special-bean-wrap.active .bean-img-box{
    animation: bean-img-ani 1s ease-out forwards;
}
.special-bean-wrap.active .bean-text-wrap{
    animation: bean-text-ani 1s ease-out forwards;
}
@keyframes bean-img-ani {
    0%{
        opacity: 0;
        left: 0%;
    }
    100%{
        opacity: 1;
        left: 22%;
    }
}
@keyframes bean-text-ani {
    0%{
        opacity: 0;
        right: 0%;
    }
    100%{
        opacity: 1;
        right: 9%;
    }
}
```

**[ 관련 코드 : JS ]**

```javascript
// ====== special-bean / favorite / store slide animation =======
setSlideAniObserver('.special-bean-wrap');
setSlideAniObserver('.favorite-wrap');
setSlideAniObserver('.store-wrap');

function setSlideAniObserver(observeTarget){
    const targetSection = document.querySelector(observeTarget);
    const observer = new IntersectionObserver(function(entries){
        console.log(entries)
        entries.forEach((entry)=>{
            if(entry.isIntersecting){
                targetSection.classList.add('active');
            } else {
                targetSection.classList.remove('active');
            }
        })
    });
    observer.observe(targetSection);
}
```

<br><br><br><br>
<hr>

### 3. 서브페이지 탭 메뉴
<img width="450" alt="image" src="https://github.com/user-attachments/assets/b773716a-8684-407f-88e8-2d716d68476a" />
<img width="450" alt="image" src="https://github.com/user-attachments/assets/3fadb0dc-0871-4494-888a-d31ac5f9e053" />
<br>
1️⃣ 탭 메뉴의 사용자 정의 속성 data-tab의 값과 탭 컨텐츠의 id 값을 연결
<br><br>

**[ HTML ]**

```html
<div class="product-tab-area">
  <ul class="product-tabMenu">
    <li data-tab="tab1" class="active">MD 상품</li>
    <li data-tab="tab2">실물카드</li>
    <li data-tab="tab3">스타벅스 모바일 카드(MMS)</li>
    <li data-tab="tab4">스타벅스 모바일 카드(BULK)</li>
  </ul>
  <div class="product-tab-content">
    <div id="tab1" class="tab active">
      ...
    </div>
    <div id="tab2" class="tab">
      ...
    </div>
    <div id="tab3" class="tab">
      ...
    </div>
    <div id="tab4" class="tab">
      ...
    </div>
  </div>
</div>
```
<br>

**[ JS ]**

```js
const productTabMenus = document.querySelectorAll('.product-tabMenu li');
productTabMenus.forEach((menu)=>{
  menu.addEventListener('click', ()=>{
    // menu style change
    productTabMenus.forEach((tab)=>{
      tab.classList.remove('active');
    })
    menu.classList.add('active');
    // content change
    const tabId = menu.getAttribute('data-tab');
    document.querySelectorAll('.product-tab-content .tab').forEach((tab)=>{
      tab.style.display = 'none';
    })
    document.getElementById(tabId).style.display = 'block';
  })
})
```
<br><br><br><br>

## 🎨 &nbsp; 주요 스타일

### 1. 검색창
<br>
<img height="50" alt="image" src="https://github.com/user-attachments/assets/97ca26f3-6133-4ac3-84d4-dc8f048cbc38" /> &nbsp;
<img height="50" alt="image" src="https://github.com/user-attachments/assets/d6391199-b2b9-41fe-8d71-1dd71ee62443" />
<br><br>

1️⃣ &nbsp; .top_search-btn를 클릭하면 active클래스가 붙으면서 width값이 auto가 되도록 한다 <br><br>
2️⃣ &nbsp; 처음에는 인풋의 width를 0으로 설정하여 보이지 않도록하고, 버튼을 클릭했을 때 width 값을 주어 보이도록 한다<br>
❗️ 인풋이 슬라이드되면서 나타나기 때문에 display none/block이 아닌 width값으로 컨트롤하고 transition값을 준다<br><br>
3️⃣ 검색창을 열기위한 버튼(.top_search-btn)과 검색어를 입력한 후 누르는 검색 버튼(.top_search-link)을 분리하여 <br> 검색창이 열리기 전에는 .top_search-link가 보이지 않고, 열린 후에는 .top_search-btn의 이미지가 보이지 않도록 한다<br><br>

**[ HTML ]**

```html
 <div class="top-search-area">
  <p class="top_search-btn" aria-label="검색창 열기" role="button">
    <input type="text" class="search-input" id="search" placeholder="통합검색"/>
    <a href="#" class="top_search-link" aria-label="검색"></a>
  </p>
</div>
```

**[ CSS ]**

```css
.top_search-btn {
  text-align: right;
  border: 0.1rem solid var(--gray_cc);
  border-radius: 0.5rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  cursor: pointer;
}
.top_search-btn,
.top_search-btn.active .top_search-link {
  width: 3.6rem;
  height: 3.6rem;
  background: #fff url("../images/icon_search.png") no-repeat center / 2rem auto;
}
.top_search-btn.active {
  width: auto;
  background: #fff;
}
.search-input {
  margin: 0;
  padding: 0;
  width: 0;
  height: 2.6rem;
  border: none;
  font-size: 1.3rem;
  transition: all 0.4s ease-in-out;
}
.top_search-btn.active .search-input {
  width: 14.8rem;
  padding-left: 1rem;
}
.top_search-btn .top_search-link {
  display: none;
}
.top_search-btn.active .top_search-link {
  display: block;
}
```

<br><br><br><br>



## 🚨 &nbsp; 이슈
### 1. 애니메이션 적용 시 버튼 위치 설정
❌ &nbsp; 메인페이지 store섹션이 뷰포트에 들어올 때 텍스트와 매장찾기 버튼이 애니메이션으로 우측에서 슬라이드되어 들어오는데 애니메이션이 진행되는 과정에서 매장찾기 버튼의 너비가 변하는 현상 발생
<br><br>

#### 🔍 &nbsp; 해결
1️⃣ 위치를 left가 아닌 translateX로 설정<br>
=> 애니메이션이 적용되는 동안 레이아웃이 변동하게 되면 요소의 크기나 위치가 예기치 않게 변화할 수 있는데<br>
   transform은 레이아웃 계산에 영향을 주지 않으므로 크기나 위치가 예기치 않게 변하는 문제를 피할 수 있다
<br><br><br>
<hr>

### 2. 슬라이더 중앙 정렬 with bxslider

❌&nbsp; bxslider는 슬라이드를 중앙정렬하는 기본 옵션이 없음으로 직접 구현 필요
<br><br>
<img width="700" alt="image" src="https://github.com/user-attachments/assets/bd193daa-744c-41f1-8547-e52c546fe66c" />
<br><br>

#### 🔍 &nbsp; 해결
1️⃣ bx-viewport, bx-wrapper 사이즈를 슬라이드 하나의 크기와 동일하게 설정 후 중앙 정렬<br><br>
2️⃣ overflow: visible; 로 설정해서 활성화된 슬라이드 외 전,후 슬라이드가 보이도록 설정<br><br>
3️⃣ 보이는 슬라이드 개수 1로 설정<br><br>

```js
$('.promotion-slider').bxSlider({
    auto: true,
    autoControls: true,
    stopAutoOnClick: true,
    autoControlsCombine: true,
    pager: true,
    slideWidth: 800,
    minSlides: 1,
    maxSlides: 1,
    moveSlides: 1,
    slideMargin: 10,
    onSliderLoad: function(){
        const allSlides = document.querySelectorAll('.promotion-slider .slide');
        allSlides[1].classList.add('active');
    },
    onSlideAfter: function($slideElement, oldIndex, newIndex) {
        $('.promotion-slider .slide').removeClass('active');
        $slideElement.addClass('active');
    }
})
```
❗️ &nbsp; onSlideAfter 콜백함수에서 현재 활성화된 슬라이드를 가리키는 매개변수는 $slideElement 이다
<br><br>

#### 🧪 &nbsp; 구현 과정에서 시도한 다른 방식 
<br>
🆖 &nbsp; 뷰포트 너비에서 슬라이드 너비를 뺀 후 2로 나눈 지점에 슬라이드를 포지셔닝 시키는 setCenterSlide함수를 <br>
 &nbsp;&nbsp;  onSliderLoad, onSlideAfter의 콜백함수로 설정<br>
&nbsp;&nbsp;   => 처음에는 잘 작동하지만 슬라이드 전환 후 무너지는 현상 발생<br>

```js
$('.promotion-slider').bxSlider({
  auto: true,
      autoControls: true,
      stopAutoOnClick: true,
      autoControlsCombine: true,
      pager: true,
      slideWidth: 800,
      minSlides: 1,
      maxSlides: 1,
      moveSlides: 1,
      slideMargin: 10,
  onSliderLoad: function(){   
      setCenterSlide();
  },
  onSlideAfter: function(){
      setCenterSlide();
  }
})

function setCenterSlide (){
    const slideItems = document.querySelectorAll('.promotion-slider .slide');
    slideItems.forEach((slide)=>{
        const slideWidth = slide.offsetWidth;
        slide.style.left = `${window.innerWidth - slideWidth / 2}px`;
    })
};
```
<br><br><br><br>

## 📌 &nbsp; 회고 및 배운 점 정리

1️⃣&nbsp; 자세히 보기 같은 버튼은 다른 컨텐츠와 같이 묶기보다 독립적으로 두어 마크업하는 것이 반응형 작업하기에 편리 <br><br>
2️⃣&nbsp; 스크립트 코드를 작성했다고 변화가 화면에 바로 보이는 것이 아니고, dom에 실제로 반영되어야 한다는 점 명심! <br><br>
3️⃣&nbsp; 애니메이션 줄 경우 위치 값을 transform으로 주는 것이 안전<br><br>
🆖&nbsp; 개선해야할 점<br>
- 반응형 브레이크포인트를 명확히 구조화하지 않은 점<br><br>
디자인이 최대한 깨지지 않도록 하기 위해 화면이 깨지는 구간마다 미디어쿼리를 추가하는 방식으로 대응한 결과 미디어쿼리가 산발적으로 늘어나 유지보수가 어려워지고 구조가 복잡해지는 결과를 초래함 <br>
=> 기기별 대표 브레이크포인트를 사전에 설정하여 좀 더 체계적으로 구조화시켜야 할 필요성을 느낌

