import React from 'react';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[500px] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32')" }}
      >
        <div className="absolute inset-0 hero-gradient flex items-center justify-center animate-fade-in duration-1000">
          <div className="text-center text-white">
            <h1 className="motion-reduce:animate-none text-4xl md:text-6xl font-bold mb-4 animate-slide-down-fade duration-1000 delay-500">
              Welcome to Photo Studio
            </h1>
            <p className="motion-reduce:animate-none text-lg md:text-2xl mb-6 animate-slide-up-fade duration-1000 delay-700">
              Capturing moments that matter
            </p>
            <a
              href="/portfolio"
              className="motion-reduce:animate-none bg-secondary text-white px-6 py-3 rounded-full hover:bg-opacity-80 animate-pulse-slow delay-1000 inline-block"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-12 bg-gray-100 animate-fade-in duration-1000 delay-200">
        <div className="container mx-auto text-center">
          <h2 className="motion-reduce:animate-none text-3xl font-bold mb-6 animate-slide-down-fade duration-1000 delay-400">
            About Us
          </h2>
          <p className="motion-reduce:animate-none text-lg text-gray-600 max-w-2xl mx-auto animate-slide-up-fade duration-1000 delay-600">
            We are passionate photographers capturing the beauty of life’s moments. From weddings to landscapes, we bring your memories to life.
          </p>
          <a
            href="/about"
            className="motion-reduce:animate-none mt-6 inline-block text-secondary hover:underline animate-pulse-slow delay-800"
          >
            Learn More
          </a>
        </div>
      </section>
    </div>
  );
}

export default Home;