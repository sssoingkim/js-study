const tabItem = document.querySelectorAll(".btn_tab");
const tabPanel = document.querySelectorAll(".panel_item");

const ACTIVE_CLASS = "active";
const OPEN_CLASS = "open";

for(let i = 0; i < tabItem.length; i++) {
  /* 각 탭버튼에 클릭 이벤트 추가 */
  tabItem[i].addEventListener("click", function() {
    /* 클래스 초기화(?) */
    for(let j = 0; j < tabItem.length; j++) {
      tabItem[j].classList.remove(ACTIVE_CLASS);
      tabItem[j].ariaSelected = false;
      tabPanel[j].classList.remove(OPEN_CLASS);
    }
    
    /* 선택한 탭버튼에 클래스 추가 및 ARIA 속성 변경 */
    this.classList.add(ACTIVE_CLASS);
    this.ariaSelected = true;

    /* 선택한 탭버튼과 연결된 탭패널에 클래스 추가 */
    const tabId = this.parentNode.id;
    // parentNode VS parentElement
    document.getElementById(tabId + "_panel").classList.add(OPEN_CLASS);
  });
}