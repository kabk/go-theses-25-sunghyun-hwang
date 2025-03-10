function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(function () {
  const pageWrapper = document.querySelector(".page-wrapper");
  const topBar = document.querySelector(".top-bar");
  const header = document.querySelector("header");
  const info = document.querySelector(".info");
  const imageRoll = document.querySelector(".image-roll");
  const sections = document.querySelectorAll("h2, #inbetween, #blacksubtitle ,#barrier, #however, #tiktoker, #inthepod, #mumble, #bug, #pensive, #chahak, #bib");
  const overlays = document.querySelectorAll(".overlay");
  const overlay = document.getElementById("loading-overlay");
  let activeOverlay = null;

  let isScrolling;

  // 화면 크기에 따라 요소 숨기기
  function checkScreenSize() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 340 && screenWidth <= 440) {
      if (info) info.style.display = "none";
      if (imageRoll) imageRoll.style.display = "none";
    } else {
      if (info) info.style.display = "";
      if (imageRoll) imageRoll.style.display = "";
    }
  }

  // 로딩 오버레이 효과 및 top-bar, page-wrapper 표시
  setTimeout(() => {
    overlay.style.opacity = "0";

    setTimeout(() => {
      overlay.style.display = "none";  // #loading-overlay 숨기기

      // z-index 업데이트
      pageWrapper.style.zIndex = "10002";
      topBar.style.zIndex = "10003";
      document.querySelectorAll(".overlay").forEach(ov => {
        ov.style.zIndex = "10004";
      });

      // ✅ header를 가장 아래로 배치
      setTimeout(() => {
        if (header) {
          header.style.zIndex = "10001";  // header를 top-bar, page-wrapper보다 아래로 설정
        }
      }, 50);

      // page-wrapper와 top-bar를 서서히 보이게 설정
      setTimeout(() => {
        topBar.style.opacity = "1";
        pageWrapper.style.opacity = "1";
      }, 10);
    }, 1000); // overlay opacity 전환 후 1초 뒤에 display: none 적용
  }, 3000); // 페이지 로딩 후 3초 후 실행

  // 특정 요소가 화면 중앙에 위치할 때 `.overlay` 표시
  function checkScroll() {
    sections.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const centerY = window.innerHeight / 2;

      if (rect.top <= centerY && rect.bottom >= centerY) {
        const sectionId = element.id;
        showOverlay(sectionId);
      }
    });
  }

  function showOverlay(sectionId) {
    overlays.forEach((overlay) => {
      overlay.classList.remove("active");
    });

    const targetOverlay = document.querySelector(`.overlay[data-id="${sectionId}"]`);
    if (targetOverlay) {
      targetOverlay.classList.add("active");
      activeOverlay = targetOverlay;

      setTimeout(() => {
        if (activeOverlay === targetOverlay) {
          targetOverlay.classList.remove("active");
          activeOverlay = null;
        }
      }, 3000);
    }
  }

  pageWrapper.addEventListener("scroll", checkScroll);

  // 초기 실행 및 화면 크기 변경 시 체크
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);

  // 초기 설정으로 top-bar는 숨겨놓고, page-wrapper와 top-bar의 opacity를 0으로 설정
  topBar.style.opacity = "0";  // 처음에 보이지 않음
  pageWrapper.style.opacity = "0";  // 처음에 보이지 않음

  // page-wrapper와 top-bar가 화면에 나타날 때 동시에 나타나게 처리
  topBar.style.transition = "opacity 1s ease-in-out";  // opacity 전환 효과
  pageWrapper.style.transition = "opacity 1s ease-in-out";  // opacity 전환 효과

  // top-bar가 page-wrapper 위에 위치하도록 z-index 설정
  topBar.style.zIndex = "10003";  // top-bar가 page-wrapper보다 위에 있도록 설정
  pageWrapper.style.zIndex = "10002";  // page-wrapper의 z-index는 top-bar보다 낮게 설정
});
