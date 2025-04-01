# 스타벅스 웹사이트 클론코딩
<br>
메인페이지, 서브페이지, 로그인페이지를 반응형으로 제작
<br><br>
link: 
<br><br>
<img src="https://github.com/user-attachments/assets/a97529a1-d576-4982-b6bb-ca7c2d5eca6f" height="250">
<img src="https://github.com/user-attachments/assets/88b35970-a907-48a2-8fd9-47c771172bd6" height="250">
<img src="https://github.com/user-attachments/assets/0f1c349c-587c-4c04-ad16-2ed308ac2130" height="200">

<br><br>
## 사용기술
- HTML
- CSS
- JAVASCRIPT
- JQUERY
- BXSLIDER

  <br><br>

## 주요 기능

### 1.메인페이지의 공지사항, 서브페이지의 보도자료 내용 롤링효과
<br>
<img width="700" alt="image" src="https://github.com/user-attachments/assets/566463a0-06be-4fc3-890f-52ece6c3a807" />
<br><br>
[관련 코드]<br>

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
[구현 과정에서 시도한 다른 접근 방식]
<br>

```js
function slideUp() {
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
setInterval(slideUp, 4000);
```

<br><br><br>
<img width="700" alt="image" src="https://github.com/user-attachments/assets/bd193daa-744c-41f1-8547-e52c546fe66c" />
