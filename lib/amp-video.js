// this code works but not recommended.
// how to install just add css from ../lib/amp-video.css

var ampVIDEO = [].slice.call(document.querySelectorAll("amp-video"));
ampVIDEO.forEach((data)=>{
    var video = document.createElement("video");
    if(data.getAttribute("class")){video.setAttribute("class",data.getAttribute("class"))};
    if(data.getAttribute("muted")){video.setAttribute("muted","");video.muted = true;};
    if(data.getAttribute("loop")){video.setAttribute("loop","");video.loop  = true;};
    if(data.getAttribute("crossorigin")){video.setAttribute("crossorigin","")};
    if(data.getAttribute("noaudio")){video.setAttribute("noaudio","");video.muted = true;};
    video.setAttribute("preload","none");
    video.setAttribute("height",data.getAttribute("height"));
    video.setAttribute("width",data.getAttribute("width"));
    video.pause();
    video.currentTime = 0;
    // video.muted = true;
    // video.volume = 0.1;
    var checkVideo = data.querySelector("video"),
        checkControls = data.querySelector(".controls");
    data.appendChild(video);
    var controller = ()=>{
        var controls = document.createElement("div"),
            play = document.createElement("button"),
            replay = document.createElement("button"),
            rewind = document.createElement("button"),
            forward = document.createElement("button"),
            fullscreen = document.createElement("button"),
            player = document.createElement("div"),
            text = document.createElement("div"),
            time = document.createElement("span"),
            slash = document.createElement("span"),
            duration = document.createElement("span"),
            progress = document.createElement("div"),
            bar = document.createElement("div");
            controls.setAttribute("class","controls");
            data.appendChild(controls);
            player.setAttribute("class","player");
            controls.appendChild(player);
            play.setAttribute("aria-label","Play");
            play.setAttribute("class","play");
            player.appendChild(play);
            text.setAttribute("class","text");
            player.appendChild(text);
                time.setAttribute("class","time");
                time.textContent = "00:00";
                text.appendChild(time);
                slash.setAttribute("class","slash");
                slash.textContent = "/";
                text.appendChild(slash);
                duration.setAttribute("class","duration");
                text.appendChild(duration);
            replay.setAttribute("aria-label","Replay");
            replay.setAttribute("class","replay");
            controls.appendChild(replay);
            rewind.setAttribute("aria-label","Rewind");
            rewind.setAttribute("class","rewind");
            controls.appendChild(rewind);
            forward.setAttribute("aria-label","Forward");
            forward.setAttribute("class","forward");
            controls.appendChild(forward);
            fullscreen.setAttribute("aria-label","Fullscreen");
            fullscreen.setAttribute("class","fullscreen");
            controls.appendChild(fullscreen);
            progress.setAttribute("class","progress");
            controls.appendChild(progress);
                bar.setAttribute("class","bar");
                bar.style.width = "0";
                progress.appendChild(bar);
        var onPlay = (event)=>{
            if(video.paused){
                video.play();
                data.setAttribute("data-video","played");
                play.setAttribute("data-video","play");
                play.setAttribute("aria-label","Pause");
            }
            else{
                video.pause();
                data.setAttribute("data-video","paused");
                play.setAttribute("data-video","pause");
                play.setAttribute("aria-label","Play");
            };
            rewind.setAttribute("data-video","min-5");
            forward.setAttribute("data-video","plus-5");
            rewind.addEventListener("click",onRewind,false);
            rewind.addEventListener("dblclick",onRewindDbl,false);
            forward.addEventListener("click",onForward,false);
            forward.addEventListener("dblclick",onForwardDbl,false);
        };
        var onReplay = (event)=>{
            video.play();
            video.currentTime = 0;
            data.setAttribute("data-video","played");
            play.setAttribute("data-video","play");
            play.setAttribute("aria-label","Pause");
            rewind.removeEventListener("click",onRewind,false);
            rewind.removeEventListener("dblclick",onRewindDbl,false);
            forward.removeEventListener("click",onForward,false);
            forward.removeEventListener("dblclick",onForwardDbl,false);
        };
        var onRewind = (event)=>{
            video.currentTime -= 5;
            rewind.setAttribute("data-video","min-5");
        };
        var onRewindDbl = (event)=>{
            video.currentTime -= 10;
            rewind.setAttribute("data-video","min-10");
            setTimeout(() => {
                rewind.setAttribute("data-video","plus-5");
            }, 500);
        };
        var checkDuration = (event)=>{
            if(video.currentTime >= video.duration || video.paused) {
                video.pause();
                video.currentTime = 0;
                play.setAttribute("aria-label","Play");
            }
        };
        var onForward = (event)=>{
            checkDuration();
            video.currentTime += 5;
            forward.setAttribute("data-video","plus-5");
        };
        var onForwardDbl = (event)=>{
            checkDuration();
            video.currentTime += 10;
            forward.setAttribute("data-video","plus-10");
            setTimeout(() => {
                forward.setAttribute("data-video","plus-5");
            }, 500);
        };
        var onFullScreen = (event)=>{
            if(!document.fullscreenElement){
                data.requestFullscreen().catch((error)=>{
                    console.log(error)
                });
                data.classList.add("fullscreen");
                fullscreen.classList.add("exit");
                fullscreen.setAttribute("aria-label","Exit Fullscreen");
            }
            else{
                document.exitFullscreen();
                data.classList.remove("fullscreen");
                fullscreen.classList.remove("exit");
                fullscreen.setAttribute("aria-label","Fullscreen");
            }
        };
        var onEnded = (event)=>{
            video.pause();
            video.currentTime = 0;
            data.setAttribute("data-video","ended");
            play.setAttribute("data-video","end");
            play.setAttribute("aria-label","Ended");
        };
        var onCalculate = (partial, total)=>{
            return Math.round((partial / total) * 100);
        };
        var onTime = (target,player)=>{
            var minutes = Math.floor(player / 60);
            var seconds = Math.floor(player - minutes * 60);
            var minuteValue;
            var secondValue;
            if(minutes<10){minuteValue = "0" + minutes}
            else{minuteValue = minutes;};
            if(seconds<10) {secondValue = "0" + seconds}
            else{secondValue = seconds};
            var mediaTime = minuteValue + ":" + secondValue;
            return target.textContent = mediaTime;
        };
        var onTimeUpdate = (event)=>{
            onTime(time,video.currentTime);
            var timeCurrent = time.textContent.replace(":","."),
            timeData = duration.textContent.replace(":",".");
            bar.style.width = onCalculate(timeCurrent,timeData) + "%";                    
        };
        var onTimeChange = (event)=>{
            if(video.readyState){
                onTime(duration,video.duration);
                video.addEventListener("timeupdate",onTimeUpdate,false)
            }
        };
        var playerReady = (event)=>{
            play.addEventListener("click",onPlay,false);
            replay.addEventListener("click",onReplay,false);
            video.addEventListener("ended",onEnded,false);
            video.addEventListener("durationchange",onTimeChange,false);
            video.addEventListener("fullscreenchange",onFullScreen,false);
            fullscreen.addEventListener("click",onFullScreen,false);
        };
        video.addEventListener("loadstart",playerReady,false);
    };
    var sources = [].slice.call(data.querySelectorAll("source"));
    sources.forEach((src)=>{
        if(!checkVideo){data.removeChild(src)}
        else{
            data.removeChild(checkVideo);
            data.removeAttribute("data-video");
            data.removeAttribute("data-status");
            data.setAttribute("data-load","preloaded");
        };
        if(checkControls){checkControls.remove()};
        var source = document.createElement("source");
        source.setAttribute("type",src.getAttribute("type"));
        video.appendChild(source);
        var spinner = document.createElement("div");
        spinner.setAttribute("class","spinner");
        spinner.innerHTML = "<svg viewBox='0 0 100 100'><circle cx='50' cy='50' r='20'/></svg>";
        if("IntersectionObserver" in window){
            var observer = new IntersectionObserver((entries, observer)=>{
                entries.forEach((entry)=>{
                    if(entry.isIntersecting){
                        video.setAttribute("poster",data.getAttribute("poster"));
                        data.appendChild(spinner);
                        var timer = setInterval(() => {
                            data.removeChild(spinner);
                            data.removeAttribute("data-load");
                            data.setAttribute("data-status","ready");
                            source.setAttribute("src",src.getAttribute("src"));
                            video.load();
                            controller();
                            clearInterval(timer);
                        }, 5*1000);
                        observer.unobserve(data);
                    }
                });
            });
            observer.observe(data);
        }
        else{
            data.setAttribute("data-status","ready");
            source.setAttribute("src",src.getAttribute("src"));
            video.load();
            controller();
        }
    })
})
