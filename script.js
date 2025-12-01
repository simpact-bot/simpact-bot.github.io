document.addEventListener("DOMContentLoaded", function() {
    // Select all videos on the page
    const videos = document.querySelectorAll('video');

    videos.forEach(video => {
        // Attempt to play them (in case browser autoplay policy blocked them)
        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay started!
            })
            .catch(error => {
                // Autoplay was prevented.
                // This usually happens if the user hasn't interacted with the page 
                // or if the video is not muted.
                console.log("Autoplay prevented for video:", video);
            });
        }
    });
});
