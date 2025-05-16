function About() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">About Us</h1>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
            alt="Photographer"
            className="w-full md:w-1/2 rounded-2xl shadow-xl object-cover"
          />

          <div className="w-full md:w-1/2 text-gray-700">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Our Story</h2>
            <p className="mb-4 leading-relaxed">
              Founded in <strong>2020</strong>, <span className="text-blue-600 font-medium">Photo Studio</span> is passionate about capturing timeless moments. From candid smiles to breathtaking landscapes, our experienced photographers bring your stories to life through the lens.
            </p>
            <p className="leading-relaxed">
              Whether it's a <em>wedding</em>, a <em>portrait session</em>, or scenic <em>landscape photography</em>, we focus on creativity, detail, and emotion to deliver visuals that truly reflect your essence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
