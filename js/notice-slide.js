//a를 배열로
//각 a의 현재 인덱스를 저장
//첫번째 인덱스 tY값이 0임을 확인. 각 a의 값 확인
//첫번째 인덱스 요소가 아니면 3초 뒤 위로 이동
//첫번째 인덱스면 3+1초 후 맨 밑으로 이동
//tY값이 0이면 index 0 // 이동 후 인덱스 - , index가 0이었으면 마지막 인덱스(.length-1)

let linkContainer = document.querySelector('.notice-contents-ani');
let links = document.querySelectorAll('.notice-contents-ani a');
const linksArr = Array.from(links);
const countLinks = links.length;
const linkHeight = linkContainer.clientHeight / links.length;
const lastLinkPos = linkHeight * (links.length - 1); //마지막 요소의 Y위치

// function slideUp(){
//     for(let i = 0; i < links.length; i++){
//         if(i > 0){ //첫 요소가 아닌 경우
//             setInterval(()=>{ // 첫 요소를 제외한 나머지 위치를 올림
//                 links[i].style.transform = `translateY(-${linkHeight}px)`;
//                 links[i].style.transition = `transform 0.3s ease-in`;
//                 setTimeout(()=>{ 
//                     links[0].style.transform = `translateY(${lastLinkPos}px)`; //첫 요소인 경우 마지막 포지션으로
//                 }, 500);
//             }, 2000);
//         } 
//     }
// }

/////////////////////

// function slideUp(){

//     links.forEach((link, index)=>{
//         if(index === 0){
//             setTimeout(()=>{
//                 linkContainer.appendChild(link);
//                 // link.style.transform = `translateY(${linkHeight}px)`;
//             }, 500)
            
//         } else {
//             link.style.transform = `translateY(-${linkHeight}px)`;
//             link.style.transition = `transform 0.3s ease-in`;
//         }
//         links = document.querySelectorAll('.notice-contents-ani a'); // 다시 저장하는거 중요
//     })
// }

//찐찐찐임
function slideUp() {
    // links를 배열로 변환하여 업데이트합니다.
    const linksArray = Array.from(document.querySelectorAll('.notice-contents-ani a'));

    linksArray.forEach((link, index) => {
        // 첫 번째 요소가 아닌 경우
        if(index > 0) {
            // 첫 번째 요소가 아닌 경우, 요소를 위로 이동시킵니다.
            link.style.transform = `translateY(-${linkHeight}px)`;
            link.style.transition = `transform 0.3s ease-in`;
            setTimeout(() => {
                link.style.transform = 'translateY(0px)'; //올라온 링크들의 위치를 0으로 잡아줌
                linkContainer.appendChild(link); 
            }, 500);
        }

    });

    // 링크 배열이 업데이트되었으므로, 다음 애니메이션 준비
    setTimeout(() => {
        // 첫 번째 링크가 맨 아래로 이동한 후, 애니메이션 초기화
        const firstLink = linksArray.shift(); // 첫 번째 요소를 제거
        linkContainer.appendChild(firstLink); // 링크 컨테이너에 다시 추가
        linksArray.push(firstLink); // 링크 배열에 다시 추가
        // 모든 링크의 위치를 초기화
        linksArray.forEach(link => {
            link.style.transform = 'translateY(0)';
        });
    }, 500); // 800ms: 애니메이션 시간 + 지연 시간
} 

// slideUp();
setInterval(slideUp, 4000);
