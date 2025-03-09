function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(function () {
  const pageWrapper = document.querySelector(".page-wrapper");
  const circleText = document.querySelector(".circle-text");
  const sections = document.querySelectorAll("h2, #inbetween, #blacksubtitle ,#barrier, #however, #tiktoker, #inthepod, #mumble, #bug, #pensive, #chahak"); // 감지할 요소 추가
  const overlays = document.querySelectorAll(".overlay");
  const overlay = document.getElementById("loading-overlay");
  let activeOverlay = null;
  let isScrolling;

  // ✅ 로딩 오버레이 효과
  setTimeout(() => {
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.style.display = "none";
      pageWrapper.style.zIndex = "10002";
      document.querySelectorAll(".overlay").forEach(ov => {
        ov.style.zIndex = "10003";
      });
      setTimeout(() => {
        pageWrapper.style.opacity = "1";
      }, 10);
    }, 1000);
  }, 1500);

  // ✅ `.circle-text`의 회전 속도 조절 함수
  function changeRotationSpeed(duration, transitionTime) {
    if (circleText) {
      circleText.style.transition = `animation-duration ${transitionTime}s ease-in-out`;
      circleText.style.animationDuration = `${duration}s`;
    }
  }

  // ✅ 특정 요소가 화면 중앙에 위치할 때 `.overlay` 표시
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

  // ✅ 스크롤 시 `.circle-text` 회전 속도 변경
  pageWrapper.addEventListener("scroll", () => {
    changeRotationSpeed(2, 10);
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      changeRotationSpeed(20, 5);
    }, 200);
  });

  pageWrapper.addEventListener("scroll", checkScroll);
});
