"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Header = ({ delay = 2 }) => {
  const headerRef = useRef<any>(null); // Ref per l'header

  const [time, setTime] = useState("");
  const [status, setStatus] = useState({ text: "", colorClass: "" });

  useEffect(() => {
    const updateTimeAndStatus = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("it-IT", {
        timeZone: "Europe/Rome",
        hour: "2-digit",
        minute: "2-digit",
        second: undefined,
        timeZoneName: "short",
      });

      setTime(formattedTime);

      // Controlla se l'orario è tra le 9 e le 19
      const hour = now.getHours();
      if (hour >= 9 && hour < 19) {
        setStatus({ text: "Available", colorClass: "bg-success" });
      } else {
        setStatus({ text: "Unavailable", colorClass: "bg-error" });
      }
    };

    updateTimeAndStatus();
    const intervalId = setInterval(updateTimeAndStatus, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useGSAP(() => {
    // Assicurati che l'headerRef.current non sia null
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        opacity: 1,
        ease: "power2.inOut",
        delay: delay,
        duration: 0.3,
      });
      gsap.fromTo(
        headerRef.current.children,
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          delay: delay,
          stagger: 0.5,
          ease: "power2.inOut",
        }
      );
    }
  }, [delay]);

  return (
    <header className="w-full absolute top-0 left-0 z-10 overflow-hidden">
      <div
        className="container flex items-center sm:items-start gap-6 justify-between leading-none select-none text-sm border-b border-b-white/30 py-4 lg:py-6 opacity-0 group"
        ref={headerRef}>
        <div className="flex flex-col gap-1 font-clashDisplay overflow-hidden relative hover-target">
          <div className="">Edoardo</div>
          <div className="overflow-hidden h-[15px]">
            <div className="w-full h-full transition-transform duration-500 ease-in-out transform group-hover:-translate-y-full text-primary">
              Baravaglio
            </div>
            <div className="w-full h-full transition-transform duration-500 ease-in-out transform translate-y-full group-hover:-translate-y-full text-primary">
              Devsigner
            </div>
          </div>
        </div>
        <div className="lg:flex flex-col gap-1 hidden">
          <div>Based in</div>
          <div className="font-clashDisplay">
            Turin, <span className="text-primary font-medium">Italy</span>
          </div>
        </div>
        <div className="sm:flex flex-col gap-1 hidden">
          <div>Local time</div>
          <div className="font-clashDisplay">{time}</div>
        </div>
        <div className="md:flex flex-col gap-1 hidden">
          <div>Current status</div>
          <div className="flex items-center gap-1 font-clashDisplay">
            <div
              className={`${status.colorClass} ${
                status.text === "Available" ? "available" : "unavailable"
              } w-2 aspect-square rounded-full inline-flex relative items-center before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:opacity-50 header-status`}
            />
            {status.text}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <a
            href="mailto:edo.baravaglio@gmail.com"
            className="font-clashDisplay">
            edo.baravaglio@gmail.com
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
