const accordionItem = document.querySelectorAll(".book_item");

// for(let i = 0; i < accordionItem.length; i++) {
//   각 아코디언버튼에 클릭 이벤트 추가
//   accordionItem[i].firstElementChild.addEventListener("click", function() {
//     const accordionIcon = this.lastElementChild;
//     const accordionContent = this.parentNode.lastElementChild;
//     let checkExpanded = this.ariaExpanded;

//     선택한 아코디언버튼의 ARIA 속성 및 아이콘 변경 / 콘텐츠 노출 토글
//     if(checkExpanded === "false") {
//       checkExpanded = "true;"
//       accordionIcon.innerText = "▲";
//       accordionContent.classList.add(OPEN_CLASS);
//     } else {
//       checkExpanded = "false";
//       accordionIcon.innerText = "▼";
//       accordionContent.classList.remove(OPEN_CLASS);
//     }
//     this.ariaExpanded = checkExpanded;
//   });
// }

const hideContent = (check, icon, content) => {
  check = "false";
  icon.innerText = "▼";
  content.classList.remove(OPEN_CLASS);
}

const openContent = (check, icon, content) => {
  check = "true;"
  icon.innerText = "▲";
  content.classList.add(OPEN_CLASS);
}

const resetContent = () => {
  accordionItem.forEach((item) => {
    const accordionButton = item.firstElementChild;
    hideContent(accordionButton.ariaExpanded, accordionButton.lastElementChild, accordionButton.parentNode.lastElementChild);
  })
}

const onClickAccordion = (e) => {
  let checkExpanded = e.currentTarget.ariaExpanded;
  const accordionIcon = e.currentTarget.lastElementChild;
  const accordionContent = e.currentTarget.parentNode.lastElementChild;

  if(checkExpanded === "false") {
    resetContent();
    openContent(checkExpanded, accordionIcon, accordionContent);
  } else {
    hideContent(checkExpanded, accordionIcon, accordionContent);
  }
  this.ariaExpanded = checkExpanded;
}

accordionItem.forEach((item) => {
  item.firstElementChild.addEventListener("click", onClickAccordion)
})