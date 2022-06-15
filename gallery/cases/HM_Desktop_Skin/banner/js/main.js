// "use strict";
var Premium = Premium || {};

Premium.creative = {
    init: function() {
        /* START OF CUSTOM JS */

        // Entrance animations -----------------------------------------------------
        var entranceAnimationEls = document.querySelectorAll(".jp-template-entrance-animation");
        var startPos = { opacity: 0 };
        var delay = .5;
        var totalDuration = .6;
        var numItems = entranceAnimationEls.length;
        switch (document.body.id) {
            case "body_top":
                startPos.y = -40;
                delay = 1.2;
                break;
            case "body_left":
                startPos.x = -100;
                break;
            case "body_right":
                startPos.x = 100;
                break;
        }
        var entranceAnim = gsap.timeline({ defaults: { ease: "back.out" } });
        for (var i = 0; i < entranceAnimationEls.length; i++) {
            var sp = entranceAnimationEls[i].getAttribute("data-jp-template") ? JSON.parse(entranceAnimationEls[i].getAttribute("data-jp-template")) : startPos;
            entranceAnim.set(entranceAnimationEls[i], sp);
        }
        entranceAnim.to(entranceAnimationEls, { delay: delay, duration: totalDuration, stagger: totalDuration / numItems, opacity: 1, x: 0, y: 0 })
        var ctaHoverEffectEls = document.querySelectorAll("*[class*='jp-template-hovereffect-']");
        for (var i = 0; i < ctaHoverEffectEls.length; i++) {
            var isScale = ctaHoverEffectEls[i].className.indexOf("jp-template-hovereffect-scale") > -1;
            ctaHoverEffectEls[i].addEventListener("mouseenter", function() {
                if (isScale) {
                    gsap.to(this, { scale: 1.05, duration: .3 })
                }
            })
            ctaHoverEffectEls[i].addEventListener("mouseleave", function() {
                if (isScale) {
                    gsap.to(this, { scale: .999, duration: .3 });
                }
            })
        }
        // Entrance animations END -------------------------------------------------

        switch (document.body.id) {
            case "body_top":
              break;

            case "body_left":
                var videoEl = document.querySelector("VIDEO");
                videoEl.volume = 0;
                PremiumJpControls.callOnClickFullScreen(function() {
                    Premium.expand.expand("expanded.html", "width:70vw;height:40vw;")
                });



                Premium.video.sync(videoEl, 1);
                Premium.video.switchOnScroll(document.querySelector(".jp-template-video-container"), 2, function(pos) {
                    if (pos === "down") {
                        gsap.timeline()
                            .set(".jp-template-video-container", { y: 50 })
                            .set(".jp-template-video-container .jp-controls-holder", { opacity: 0 })
                            .to(".jp-template-image", { duration: .5, opacity: 0, y: -50 }, 0)
                            .to(".jp-template-video-container", { duration: .5, opacity: 1, y: 0, onUpdate: PremiumJpControls.resizeAll }, 0.3)
                            .to(".jp-template-video-container .jp-controls-holder", { opacity: 1, duration: .5 })
                            videoEl.play();
                    } else {
                        gsap.timeline()
                            .set(".jp-template-image", { y: -50 })
                            .to(".jp-template-video-container", { duration: .5, opacity: 0, y: 50 }, 0)
                            .to(".jp-template-image", { duration: .5, opacity: 1, y: 0 }, 0.3)
                            videoEl.pause();
                    }
                });
                var prom = videoEl.play();
                if (prom) {
                    prom.catch(function() {})
                }
                break;

            case "body_right":

              break;

            case "body_back":
                // back panel code here

                break;

            case "body_expanded":
                var vidEl = document.querySelector("VIDEO");
                vidEl.volume = 0;
                Premium.video.sync(vidEl, undefined, Premium.video.SyncType_Get);
                vidEl.addEventListener("playing", function() {
                    document.body.style.display = "block";
                    document.body.style.opacity = 1;
                }, { once: true })

                break;
        }

        /* END OF CUSTOM JS */
    }
}
