import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const LoadingScreen = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const barRef = useRef(null);
  const barFillRef = useRef(null);
  const percentRef = useRef(null);
  const taglineRef = useRef(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // fade in loader
    tl.fromTo(
      loaderRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" },
    )
      // upzy text drops in
      .fromTo(
        textRef.current,
        { y: 60, opacity: 0, skewY: 6 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, ease: "expo.out" },
        "-=0.1",
      )
      // tagline fades
      .fromTo(
        taglineRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.5",
      )
      // bar appears
      .fromTo(
        barRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.3",
      );

    // progress counter
    let count = { val: 0 };
    gsap.to(count, {
      val: 100,
      duration: 2.2,
      ease: "power1.inOut",
      delay: 0.9,
      onUpdate: () => {
        const v = Math.round(count.val);
        setPercent(v);
        if (barFillRef.current) {
          barFillRef.current.style.width = v + "%";
        }
      },
      onComplete: () => {
        // exit animation
        const exitTl = gsap.timeline({
          onComplete: () => onComplete && onComplete(),
        });
        exitTl
          .to(taglineRef.current, { opacity: 0, y: -10, duration: 0.3 })
          .to(barRef.current, { opacity: 0, duration: 0.25 }, "-=0.2")
          .to(percentRef.current, { opacity: 0, duration: 0.2 }, "-=0.2")
          .to(
            textRef.current,
            {
              y: -80,
              opacity: 0,
              skewY: -4,
              duration: 0.7,
              ease: "expo.in",
            },
            "-=0.1",
          )
          .to(
            loaderRef.current,
            {
              yPercent: -105,
              duration: 0.85,
              ease: "expo.inOut",
            },
            "-=0.3",
          );
      },
    });

    return () => gsap.killTweensOf("*");
  }, []);

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#0a0a0a",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
      }}
    >
      {/* upzy big text */}
      <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
        <h1
          ref={textRef}
          style={{
            fontSize: "clamp(4rem, 16vw, 11rem)",
            fontWeight: 800,
            color: "#FBE4D8",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            margin: 0,
            opacity: 0,
          }}
        >
          Upzy
        </h1>
      </div>

      {/* tagline */}
      <p
        ref={taglineRef}
        style={{
          color: "rgba(251,228,216,0.4)",
          fontSize: "clamp(0.75rem, 1.5vw, 0.95rem)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          marginBottom: "3rem",
          opacity: 0,
        }}
      >
        Website Monitoring Platform
      </p>

      {/* progress bar */}
      <div
        ref={barRef}
        style={{
          width: "clamp(200px, 30vw, 320px)",
          opacity: 0,
          transformOrigin: "left center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              color: "rgba(251,228,216,0.3)",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Loading
          </span>
          <span
            ref={percentRef}
            style={{
              color: "#FBE4D8",
              fontSize: "13px",
              fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {percent}%
          </span>
        </div>

        {/* track */}
        <div
          style={{
            height: "2px",
            backgroundColor: "rgba(251,228,216,0.12)",
            borderRadius: "99px",
            overflow: "hidden",
          }}
        >
          {/* fill */}
          <div
            ref={barFillRef}
            style={{
              height: "100%",
              width: "0%",
              backgroundColor: "#FBE4D8",
              borderRadius: "99px",
              transition: "width 0.05s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
