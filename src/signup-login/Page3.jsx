import React from "react";

const outlets = [
  {
    name: "An online store",
    desc: "Create a fully customizable website",
    link: "https://shopify-assets.shopifycdn.com/shopifycloud/shopify/assets/signup_questions/icons/online_store-9cef8f5f0d278a021a053e31e014135a9e2a8dee2468da0aa551fe3ebd943331.svg",
  },
  {
    name: "In person",
    desc: "Sell at retail stores, pop-ups, or other physical locations",
    link: "https://shopify-assets.shopifycdn.com/shopifycloud/shopify/assets/signup_questions/icons/in_person-9975fc2611c3b7bd9dc1cd6910e74bd0226f8710877bb0c663ace31386827c32.svg",
  },
  {
    name: "An existing website or blog",
    desc: "Add a Buy Button to your website",
    link: "https://shopify-assets.shopifycdn.com/shopifycloud/shopify/assets/signup_questions/icons/existing_website-aabae8c453ed8a6698b8e0c1d146eba3f5bfbf20bd2f9096457424141d05ec45.svg",
  },
  {
    name: "Social media",
    desc: "Reach customers on Facebook, Instagram, TikTok, and more",
    link: "https://shopify-assets.shopifycdn.com/shopifycloud/shopify/assets/signup_questions/icons/social_media-c69d79db54b878c150dceee2404efe68621839752e8d81857d59c0b616e823ea.svg",
  },
  {
    name: "Online marketplaces",
    desc: "List products on Etsy, Amazon, and more",
    link: "https://shopify-assets.shopifycdn.com/shopifycloud/shopify/assets/signup_questions/icons/online_marketplace-46dcc76a3945b8e06b1ceb84ed06552c074b3793b803a7f8f08397524094e2b7.svg",
  },
  {
    name: "I'm not sure",
    desc: "",
    link: null,
  },
];
function Page3() {
  return (
    <div>
      <h1 className="pt-3 font-bold text-xl text-[#303030]">
        Where would you like to sell?
      </h1>
      <span className="text-[0.875rem] text-[#616161]">
        Pick as many as you like – you can always change these later. We'll make
        sure you're set up to sell in these places.
      </span>
      <ul className="w-full my-4 grid grid-cols-2 gap-4 md:flex-row">
        {outlets.map((outlet, index) => {
          return (
            <li
              key={outlet.key}
              className="w-full border rounded-md hover:bg-[#f7f7f7]"
            >
              <Checkbox id={outlet.name} label={outlet.name} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Page3;

const Checkbox = ({ id, label }) => {
  return (
    <div className="checkbox-wrapper-4">
      <input className="inp-cbx" id={id} type="checkbox" />
      <label className="cbx" htmlFor={id}>
        <span>
          <svg width="12px" height="10px">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        </span>
        <span className="inline-block max-w-fit">
          <div className="text-sm font-semibold">{label}</div>
          <div className="font-light text-sm w-[80%]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem perferendis maxime saepe quam inventore sapiente.</div>
        </span>
      </label>
      <svg className="inline-svg" width="0" height="0">
        <defs>
          <symbol id="check-4" viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </symbol>
        </defs>
      </svg>
    </div>
  );
};
