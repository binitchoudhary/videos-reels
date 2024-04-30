document.addEventListener('DOMContentLoaded', function () {
  const videos = document.querySelectorAll('.youtube-video');
  const speakerBtns = document.querySelectorAll('.speaker-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const videoContainer = document.querySelector('.video-carousel');
  let currentIndex = 0;
  const maxVisibleVideos = 5;
  let videoWidth;

  // Hide the previous button initially since the first video is visible
  prevBtn.style.display = 'none';

  // Hide or show carousel buttons based on current index
  function updateButtons() {
    if (currentIndex === 0) {
      prevBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'block';
    }

    if (currentIndex >= videos.length - maxVisibleVideos) {
      nextBtn.style.display = 'none';
    } else {
      nextBtn.style.display = 'block';
    }
  }

  // Adjust width of video container dynamically
  function adjustVideoContainerWidth() {
    videoWidth = videos[0].offsetWidth;
    const containerWidth = maxVisibleVideos * videoWidth;
    videoContainer.style.width = containerWidth + 'px';
  }

  // Update buttons initially
  updateButtons();

  // Handle click event for previous button
  prevBtn.addEventListener('click', function () {
    if (currentIndex > 0) {
      currentIndex--;
      videoContainer.style.transform = `translateX(-${currentIndex * videoWidth}px)`;
      updateButtons();
    }
  });

  // Handle click event for next button
  nextBtn.addEventListener('click', function () {
    if (currentIndex < videos.length - maxVisibleVideos) {
      currentIndex++;
      videoContainer.style.transform = `translateX(-${currentIndex * videoWidth}px)`;
      updateButtons();
    }
  });

  // Add event listeners for speaker buttons
  speakerBtns.forEach((btn, index) => {
    btn.addEventListener('click', function () {
      const video = videos[index];
      video.muted = !video.muted;
      if (video.muted) {
        btn.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Muted speaker icon
      } else {
        btn.innerHTML = '<i class="fas fa-volume-up"></i>'; // Active speaker icon
      }
    });
  });

  // Add event listeners for hover to play/pause videos
  videos.forEach(video => {
    video.addEventListener('mouseenter', function () {
      this.play();
    });
    video.addEventListener('mouseleave', function () {
      this.pause();
    });
  });

  // Adjust video container width when window is resized
  window.addEventListener('resize', adjustVideoContainerWidth);

  // Initial adjustment of video container width
  adjustVideoContainerWidth();
});
