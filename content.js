function pauseVideo() {
  const video = document.querySelector('video');
  if (video && !video.paused) {
    video.pause();
  }
}

function checkVisibility() {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pauseVideo();
    }
  });

  window.addEventListener('blur', pauseVideo);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'pauseVideo') {
    pauseVideo();
  } else if (request.action === 'checkVisibility') {
    checkVisibility();
  }
});
