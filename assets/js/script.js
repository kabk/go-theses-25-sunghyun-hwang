// 문서가 로드되었을 때 실행하는 함수
function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}

// 문서가 로드되면 실행
docReady(function () {
  const pageWrapper = document.querySelector(".page-wrapper");
  const topBar = document.querySelector(".top-bar");
  const header = document.querySelector("header");
  const info = document.querySelector(".info");
  const imageRoll = document.querySelector(".image-roll");
  const thisAbout = document.getElementById("thisabout"); // 변경된 요소
  const sections = document.querySelectorAll("h2, #inbetween, #blacksubtitle, #barrier, #however, #tiktoker, #inthepod, #mumble, #bug, #pensive, #chahak, #bib");
  const overlays = document.querySelectorAll(".overlay");
  const overlay = document.getElementById("loading-overlay");
  const loadingTexts = document.querySelectorAll("#loading-overlay .loading-text");
  let activeOverlay = null;
  let isScrolling;

  // 화면 크기에 따라 요소 숨기기
  function checkScreenSize() {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 340 && screenWidth <= 440) {
          if (info) info.style.display = "none";
          if (imageRoll) imageRoll.style.display = "none";
          if (thisAbout) thisAbout.style.display = "none"; // 변경된 부분
      } else {
          if (info) info.style.display = "";
          if (imageRoll) imageRoll.style.display = "";
          if (thisAbout) thisAbout.style.display = ""; // 변경된 부분
      }
  }

  // 로딩 오버레이의 텍스트 순차 표시 (마지막 P태그만 페이드 아웃)
  function showLoadingText(index = 0) {
      loadingTexts.forEach(text => {
          text.style.display = "none";
          text.style.opacity = "1";
      });

      if (index < loadingTexts.length) {
          loadingTexts[index].style.display = "block";

          setTimeout(() => {
              if (index === loadingTexts.length - 1) {
                  loadingTexts[index].style.transition = "opacity 1.5s ease-out";
                  loadingTexts[index].style.opacity = "0";

                  setTimeout(() => {
                      overlay.style.display = "none";
                  }, 1500);
              } else {
                  showLoadingText(index + 1);
              }
          }, 3200);
      }
  }

  setTimeout(() => {
      showLoadingText();
  }, 800);

  // 로딩 오버레이 효과 및 top-bar, page-wrapper 표시
  setTimeout(() => {
      overlay.style.display = "none";

      pageWrapper.style.zIndex = "10002";
      topBar.style.zIndex = "10003";
      document.querySelectorAll(".overlay").forEach(ov => {
          ov.style.zIndex = "10004";
      });

      setTimeout(() => {
          if (header) {
              header.style.zIndex = "10001";
          }
      }, 50);

      setTimeout(() => {
          topBar.style.opacity = "1";
          pageWrapper.style.opacity = "1";
      }, 10);
  }, 11000);

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
          }, 3700);
      }
  }

  pageWrapper.addEventListener("scroll", checkScroll);

  // 초기 실행 및 화면 크기 변경 시 체크
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);

  // 초기 설정으로 top-bar는 숨겨놓고, page-wrapper와 top-bar의 opacity를 0으로 설정
  topBar.style.opacity = "0";
  pageWrapper.style.opacity = "0";

  topBar.style.transition = "opacity 1s ease-in-out";
  pageWrapper.style.transition = "opacity 1s ease-in-out";

  topBar.style.zIndex = "10003";
  pageWrapper.style.zIndex = "10002";
});
