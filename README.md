# 스타벅스 웹사이트 클론코딩
<br>
메인페이지, 서브페이지, 로그인페이지를 반응형으로 제작
<br><br>
link: 
<br><br>
<img src="https://github.com/user-attachments/assets/a97529a1-d576-4982-b6bb-ca7c2d5eca6f" height="250">
<img src="https://github.com/user-attachments/assets/88b35970-a907-48a2-8fd9-47c771172bd6" height="250">
<img src="https://github.com/user-attachments/assets/0f1c349c-587c-4c04-ad16-2ed308ac2130" height="200">

<br><br><br>
## 사용기술
- HTML
- CSS
- JAVASCRIPT
- JQUERY
- BXSLIDER

  <br><br><br>

## 주요 기능

### 1.메인페이지의 공지사항, 서브페이지의 보도자료 내용 롤링효과
<br>
<img width="700" alt="image" src="https://github.com/user-attachments/assets/566463a0-06be-4fc3-890f-52ece6c3a807" />
<br><br>
1️⃣ 첫번째 요소가 아닌 경우 요소의 높이만큼 위로 위치 이동<br>
2️⃣ 위치 이동 후 시간차를 두고 첫번째 요소는 배열에서 삭제했다가(shift()) 반복 실행을 위해 마지막요소로 다시 추가(push())<br>
3️⃣ 바뀐 순서를 실제 dom에 반영하기 위해 배열의 전체 요소를 컨테이너에서 순서대로 삭제하며 자식으로 다시 넣어준다 (appendChild())<br>
4️⃣ 모든 요소의 위치를 초기화 시킨다 translateY(0)<br>
5️⃣ 반복을 위해 setInterval로 rollingUp함수를 실행<br>
<br>

**[관련 코드]**

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
<br>

**[구현 과정에서 시도한 다른 접근 방식]**

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

**[구현 실패 원인 분석]** <br>
🆖 업데이트된 요소들의 순서를 실제 dom에 반영하지 않은 점<br>
🆖 index 변수는 forEach문 안에서만 일시적으로 유효하기 때문에 수동으로 수정하더라도 index값이 다음 반복에는 영향을 미치지 않는다<br>
<br><br><br><br>


### 2. 메인페이지 슬라이드 애니메이션

<img width="450" alt="image" src="https://github.com/user-attachments/assets/11399259-0d61-4195-9e24-9ef0d8b0338d" />
<img width="450" alt="image" src="https://github.com/user-attachments/assets/cae67b9c-5c08-4516-a759-621d8aea61fc" />
<br>
<br>
1️⃣ 해당 섹션에 active클래스가 추가되면 슬라이딩 애니메이션이 실행하도록 스타일링 <br>
setSlideAniObserver 함수<br>
2️⃣ IntersectionObserver 객체 생성하여, observeTarget로 받은 관찰 대상(섹션)이 뷰포트에 보이는지 여부 체크(isIntersecting === true)<br>
3️⃣ 화면에 보이면 해당 섹션에 애니메이션을 적용하기 위한 active 클래스를 추가하고, 화면에서 벗어나면 클래스 제거하도록<br>
<br>


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

### 3. 서브페이지 탭 메뉴
<img width="450" alt="image" src="https://github.com/user-attachments/assets/b773716a-8684-407f-88e8-2d716d68476a" />
<img width="450" alt="image" src="https://github.com/user-attachments/assets/3fadb0dc-0871-4494-888a-d31ac5f9e053" />
<br>
1️⃣ 탭 메뉴의 사용자 정의 속성 data-tab의 값과 탭 컨텐츠의 id 값을 연결
<br><br>

**[ 관련 코드 : HTML ]**

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

**[ 관련 코드 : JS ]**

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

## 이슈
### 1. 애니메이션 적용 시 버튼 위치 설정
❎ 메인페이지 store섹션이 뷰포트에 들어올 때 텍스트와 매장찾기 버튼이 애니메이션으로 우측에서 슬라이드되어 들어오는데<br>
  애니메이션이 진행되는 과정에서 매장찾기 버튼의 너비가 변하는 현상 발생
<br><br>

#### 해결
1️⃣ 위치를 left가 아닌 translateX로 설정<br>
=> 애니메이션이 적용되는 동안 레이아웃이 변동하게 되면 요소의 크기나 위치가 예기치 않게 변화할 수 있는데<br>
   transform은 레이아웃 계산에 영향을 주지 않으므로 크기나 위치가 예기치 않게 변하는 문제를 피할 수 있다
<br><br><br>

### 2. 슬라이더 중앙 정렬 with bxslider

❎ bxslider는 슬라이드를 중앙정렬하는 기본 옵션이 없음으로 직접 구현 필요
<br><br>
<img width="700" alt="image" src="https://github.com/user-attachments/assets/bd193daa-744c-41f1-8547-e52c546fe66c" />
<br><br>

#### 해결
1️⃣ bx-viewport, bx-wrapper 사이즈를 슬라이드 하나의 크기와 동일하게 설정 후 중앙 정렬<br>
2️⃣ overflow: visible; 로 설정해서 활성화된 슬라이드 외 전,후 슬라이드가 보이도록 설정<br>
3️⃣ 보이는 슬라이드 개수 1로 설정<br>
<br>

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
❗️ onSlideAfter콜백함수에서 현재 활성화된 슬라이드를 가리키는 매개변수는 $slideElement 이다
<br><br>

**[ 구현 과정에서 시도한 방식 ]**
<br>
🆖 뷰포트 너비에서 슬라이드 너비를 뺀 후 2로 나눈 지점에 슬라이드를 포지셔닝 시키는 setCenterSlide함수를 <br>
   onSliderLoad, onSlideAfter의 콜백함수로 설정<br>
=> 처음에는 잘 작동하지만 슬라이드 전환 후 무너지는 현상 발생<br>

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
