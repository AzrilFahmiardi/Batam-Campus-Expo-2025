import React, { Fragment } from 'react';
import logo from "../assets/images/bacampex.png"

const TokoComingSoon = () => {
  return (
    <Fragment>
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-footer-gradient p-6">
        {/* Animated decorative elements */}
        <div className="absolute left-4 top-10 w-12 h-12 animate-bounce sm:left-10 sm:w-20 sm:h-20">
          <div className="w-full h-full rounded-full bg-yellow-400/20" />
        </div>
        <div className="absolute right-4 top-40 w-12 h-12 animate-bounce delay-300 sm:right-10 sm:w-20 sm:h-20">
          <div className="w-full h-full rounded-full bg-blue-400/20" />
        </div>
        
        {/* Main content */}
        <div className="flex flex-col items-center justify-center gap-8 text-center max-w-4xl mx-auto">
          {/* Logo placeholder */}
          <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center animate-pulse lg:w-64 lg:h-64">
            {/* <span className="font-pixelify text-2xl text-white">BCE</span> */}
            <img src={logo} alt="" />
          </div>
          
          {/* Coming soon text */}
          <h1 className="font-pixelify text-4xl text-white animate-pulse md:text-6xl">
            Coming Soon
          </h1>
          
          {/* Description */}
          <p className="text-white/80 text-lg max-w-md mx-auto md:text-xl">
            Our merchandise store is under construction. Get ready for amazing items!
          </p>
          
          {/* Store preview text */}
          <div className="mt-8 space-y-2">
            <p className="text-white/70 text-base md:text-lg">
              Featured items will include:
            </p>
            <p className="text-white/90 font-pixelify text-sm md:text-base">
              Jersey BCE • Sticker Packs • Keychains • etc
            </p>
          </div>
          
          {/* Social links */}
          <div className="flex gap-6 mt-12">
            <a href="https://www.instagram.com/batamcampusexpo/" target='blank' className="text-white/80 hover:text-white transition-colors font-pixelify text-sm md:text-base">
              Instagram
            </a>
            <a href="https://www.tiktok.com/@batamcampusexpo" target='blank' className="text-white/80 hover:text-white transition-colors font-pixelify text-sm md:text-base">
              Tik Tok
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TokoComingSoon;