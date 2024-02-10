import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Preloader = () => {
  const loaderContainerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  const phrases = [
    "Nel mezzo del cammin di nostra vita mi ritrovai",
    "Per una selva oscura, ché la diritta via era smarrita",
    "Ahi quanto a dir qual era è cosa dura, esta selva",
    "E così avvegnach'io fossi al cominciar d'una",
    "Tanto gentile e tanto onesta pare la donna mia",
    "Amor, ch'a nullo amato amar perdona, mi prese",
    "Fatti non foste a viver come bruti, ma per seguir",
    "Nessun maggior dolore che ricordarsi del tempo",
    "E la sua volontade è nostra pace: essa è quel mare",
    "Lasciate ogne speranza, voi ch'intrate, diceva",
    "Così discesi del cerchio primaio giù nel secondo",
    "Ma per trattar del ben ch'i' vi trovai, dirò de l'alt",
    "E quindi uscimmo a riveder le stelle, fuor ché la",
    "La bocca sollevò dal fiero pasto quel peccator",
    "E io, ch'avea d'error la testa cinta, dissi: 'Maestro",
  ];

  useGSAP(
    () => {
      if (loaderContainerRef.current) {
        const texts = loaderContainerRef.current.querySelectorAll(".text");
        const textWrapper =
          loaderContainerRef.current.querySelector(".text-wrapper");
        const headerLetters =
          loaderContainerRef.current.querySelectorAll(".hero-text span");

        /* gsap.to(texts, {
          x: 500,
          ease: "expo.out",
          delay: 0.5,
          stagger: 0.1,
          duration: 1,
        }); */
        gsap.to(textWrapper, {
          y: -600,
          scale: 4.5,
          rotate: -90,
          ease: "expo.out",
          delay: 0.5,
          duration: 6,
        });
        gsap.to(texts, {
          opacity: 1,
          ease: "expo.out",
          delay: 0.5,
          duration: 3,
        });
        gsap.to(texts, {
          x: -3500,
          ease: "expo.out",
          delay: 0.5,
          stagger: 0.05,
          duration: 5,
        });
        gsap.to(".text-container", {
          bottom: "-100%",
          ease: "expo.out",
          delay: 4.5,
          duration: 2,
        });
        gsap.to(".hero-text", {
          gap: "6px",
          ease: "expo.out",
          delay: 6,
          duration: 1,
        });
        gsap.to(heroTextRef.current, {
          opacity: 1,
          ease: "power4.inOut",
          delay: 4,
          duration: 2,
          onComplete: () => {
            // Animazione del peso del font
            gsap.to(heroTextRef.current, {
              fontWeight: 300,
              duration: 1,
              ease: "power1.inOut",
              onComplete: () => {
                gsap.to(heroTextRef.current, {
                  fontWeight: 700,
                  duration: 1,
                  ease: "power1.inOut",
                });
                gsap.to(headerLetters, {
                  y: 200,
                  duration: 1,
                  delay: 0.5,
                  stagger: -0.05,
                  ease: "power2.inOut",
                });
              },
            });
          },
        });

        gsap.fromTo(
          headerLetters,
          { opacity: 0, y: 200 },
          {
            opacity: 1,
            y: 0,
            ease: "power4.inOut",
            delay: 4.5,
            stagger: 0.05,
            duration: 2,
          }
        );
      }
    },
    { scope: loaderContainerRef }
  );
  return (
    <div
      ref={loaderContainerRef}
      className="relative h-screen w-screen overflow-hidden pointer-events-none">
      <div className="text-container absolute w-full h-full bg-primary z-[0]"></div>
      <div className="text-wrapper absolute w-full h-full flex flex-col justify-center items-center left-[-50%] text-black z-[1] select-none">
        {phrases.map((phrase, index) => (
          <div
            key={index}
            className="text text-[15vw] lg:text-[5vw] whitespace-nowrap uppercase font-bold opacity-30 text-black leading-none font-clashDisplay">
            {Array(5).fill(phrase).join(" ")}
          </div>
        ))}
      </div>
      <div
        ref={heroTextRef}
        className="hero-text absolute top-0 left-0 right-0 bottom-0 m-auto w-full flex justify-center items-center z-[2] text-white text-8xl font-clashDisplay h-fit font-black overflow-hidden">
        {Array.from("Welcome").map((letter, index) => (
          <span
            key={index}
            className={`${index === 0 ? "uppercase" : ""} letter select-none`}
            style={{ opacity: 0 }}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Preloader;
