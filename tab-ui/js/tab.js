const tabItem = document.querySelectorAll(".btn_tab");
const tabPanel = document.querySelectorAll(".panel_item");

const ACTIVE_CLASS = "active";
const OPEN_CLASS = "open";

// for(let i = 0; i < tabItem.length; i++) {
//   tabItem[i].addEventListener("click", function() {
//     for(let j = 0; j < tabItem.length; j++) {
//       tabItem[j].classList.remove(ACTIVE_CLASS);
//       tabItem[j].ariaSelected = false;
//       tabPanel[j].classList.remove(OPEN_CLASS);
//     }
    
//     this.classList.add(ACTIVE_CLASS);
//     this.ariaSelected = true;

//     const tabId = this.parentNode.id;
//     document.getElementById(tabId + "_panel").classList.add(OPEN_CLASS);
//   });
// }

const resetTab = () => {
  tabItem.forEach((item) => {
    item.classList.remove(ACTIVE_CLASS);
    item.ariaSelected = false;
  })
  tabPanel.forEach((item) => {
    item.classList.remove(OPEN_CLASS);
  })
}

const onClickTab = (e) => {
  resetTab();

  e.currentTarget.classList.add(ACTIVE_CLASS);
  e.currentTarget.ariaSelected = true;

  const tabId = e.currentTarget.parentNode.id;
  document.getElementById(`${tabId}_panel`).classList.add(OPEN_CLASS);
}

tabItem.forEach((item) => {
  item.addEventListener("click", onClickTab);
  //onClickTab(매개변수)가 들어갈 경우 함수를 실행시키게 됨.
})