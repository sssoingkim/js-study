const accordionItem = document.querySelectorAll(".book_item");

for(let i = 0; i < accordionItem.length; i++) {
  /* 각 아코디언버튼에 클릭 이벤트 추가 */
  accordionItem[i].firstElementChild.addEventListener("click", function() {
    const accordionIcon = this.lastElementChild;
    const accordionContent = this.parentNode.lastElementChild;
    let checkExpanded = this.ariaExpanded;

    /* 선택한 아코디언버튼의 ARIA 속성 및 아이콘 변경 / 콘텐츠 노출 토글 */
    if(checkExpanded === "false") {
      checkExpanded = "true;"
      accordionIcon.innerText = "▲";
      accordionContent.classList.add(OPEN_CLASS);
    } else {
      checkExpanded = "false";
      accordionIcon.innerText = "▼";
      accordionContent.classList.remove(OPEN_CLASS);
    }
    this.ariaExpanded = checkExpanded;
  });
}
