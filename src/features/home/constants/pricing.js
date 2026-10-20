// Office prices shown on the landing page. Anything left as null stays hidden,
// so the site never shows a placeholder price. Prices are monthly, in AED.
export const pricing = {
  // Hero badge: "Offices from AED 2,500 / month". Example: "2,500".
  startingPrice: null,
  // Hero line: "Only 3 offices available this month". Example: 3.
  officesLeft: null,
  // "Choose your office" section: only plans with a price are shown, and the
  // section appears once at least one plan has a price.
  plans: [
    {
      name: "Flexi Desk",
      price: null,
      description: "For freelancers and solo founders.",
    },
    {
      name: "Private Office",
      price: null,
      description: "A lockable private office for your team.",
      popular: true,
    },
    {
      name: "Shared Office",
      price: null,
      description: "An affordable seat in a shared workspace.",
    },
    {
      name: "Executive Office",
      price: null,
      description: "A larger premium office for growing teams.",
    },
  ],
};

export const pricedPlans = pricing.plans.filter((plan) => plan.price);
