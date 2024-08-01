import { useState } from "react";
import "./App.css";

const categories = [
  "Expert",
  "Fractional",
  "Demand Engagement",
  "Artificial Intelligence",
  "Entrepreneur",
  "Human Resource",
  "Data Science",
  "Finance",
  "Leadership",
  "Marketing",
  "Seasoned Entrepreneur",
];

function App() {
  return (
    <div className="bg-white border rounded-md shadow-md">
      <div className="font-semibold text-2xl p-4">Experts</div>
      <hr />
      <div className="p-4">
        <div className="font-semibold text-xl mb-2">Choose a category:</div>
        <div className="flex gap-4 overflow-x-scroll py-2">
          {categories.map((category) => (
            <button key={category} className="category-button">
              {category}
            </button>
          ))}
        </div>
      </div>
      <hr />
      {categories.map((category, index) => {
        return (
          <div key={category} className="p-4">
            <div className="font-semibold text-xl">{`${category}:`}</div>
            <div className="w-full overflow-x-scroll flex gap-6 py-4">
              <ExpertCard />
              <ExpertCard />
              <ExpertCard />
              <ExpertCard />
              <ExpertCard />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;

const ExpertCard = () => {
  return (
    <div className="border rounded-xl h-[35em] w-[20em] flex-shrink-0">
      <div className="mx-4 h-2/3 rounded-md mt-4 bg-[url(https://media.intro.co/avatars/149759i1SI98G3.jpg)] bg-cover bg-no-repeat bg-center"></div>
      <div className="mx-4 mt-4 font-light text-sm line-clamp-4">
        A seasoned individual with 25+ yrs. of diversified entrepreneurial and
        professional experience across varied industries like education, FMCG,
        jewellery, event management, and banking sectors. Building brands
        through strategic Branding, Digital Marketing and Growth Hacking
        efforts. Mentoring budding entrepreneurs to enable their start-up's
        growth and brand positioning.
      </div>
      <button className="px-4 text-sm">Learn More</button>
      <div className="flex gap-2 px-4 py-2">
        <button className="border-blue-800 border rounded-full px-4 text-sm text-blue-800 font-semibold">
          Leadership
        </button>
        <button className="border-blue-800 border rounded-full px-4 text-sm text-blue-800 font-semibold">
          Enterpreneur
        </button>
      </div>
    </div>
  );
};
