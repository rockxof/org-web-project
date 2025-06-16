import { useEffect, useState } from "react";
import img1 from "../../assets/images/0001.avif";
import img2 from "../../assets/images/0002.avif";
import img3 from "../../assets/images/0003.avif";
import img4 from "../../assets/images/0004.avif";
import img5 from "../../assets/images/0005.avif";
import img6 from "../../assets/images/0006.avif";
import img7 from "../../assets/images/0007.avif";
import img8 from "../../assets/images/0008.avif";
import img9 from "../../assets/images/0009.avif";
import img10 from "../../assets/images/0010.avif";
import img11 from "../../assets/images/0011.avif";
import img12 from "../../assets/images/0012.avif";
import img13 from "../../assets/images/rm-cs-2.avif";
import img14 from "../../assets/images/rm-cs-6.avif";
import img15 from "../../assets/images/rm-cs-8.avif";


import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { IoIosCloseCircle } from "react-icons/io";
import "../../index.css";
import { useNavigate } from "react-router";

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15
];

const AboutUs = () => {
  const [currIndex, setCurrIndex] = useState(0);

  const prevSlide = () => {
    const prevIndex = currIndex === 0 ? images.length - 1 : currIndex - 1;

    setCurrIndex(prevIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currIndex + 1;

    setCurrIndex(newIndex);
  };

  let navigate = useNavigate();

  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => {
      clearInterval(autoSlide);
    };
  }, [currIndex]);

  return (
    <div
      /*style={{backgroundImage: `url(${images[currIndex]})`}}*/ className="h-svh w-svw m-auto py-2 px-4 relative group content-center no-scrollbar bg-[#f6f6f6] box-border"
    >
      <button
        onClick={() => navigate("/login")}
        aria-label="close about-us"
        className="absolute right-5 top-5 text-3xl hover:cursor-pointer z-10 sm:top-1.5 sm:right-3.5 sm:text-5xl text-[#909090] hover:text-red-500"
      >
        <IoIosCloseCircle />
      </button>

      <div className="flex overflow-hidden w-full sm:h-[90%] rounded-2xl">
        {images.map((url) => (
          <img
            style={{ translate: `${-100 * currIndex}%` }}
            className="rounded-2xl sm:h-full m-auto img-slider-img"
            key={url}
            src={url}
            alt=""
          />
        ))}
      </div>

      {/* left arrow */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="hidden group-hover:block absolute top-1/2 -translate-x-0 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer img-slider-btn"
      >
        <BsChevronCompactLeft size={30} />
      </button>

      {/* right arrow */}
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="hidden group-hover:block absolute top-1/2 -translate-x-0 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer img-slider-btn"
      >
        <BsChevronCompactRight size={30} />
      </button>

      <div className="flex top-4 justify-center py-2">
        {images.map((item, imgIdx) => (
          <div key={imgIdx} className="text-2xl cursor-pointer">
            <RxDotFilled onClick={() => setCurrIndex(imgIdx)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
