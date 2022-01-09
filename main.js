console.clear();
console.log('************************************');

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const menus = [
  {
    id: '1',
    name: 'Coke',
    quantity: 20,
    category: 'drinks',
    prices: [2, 3],
    sizes: ['small', 'medium'],
  },
  {
    id: '2',
    name: 'water',
    quantity: 40,
    category: 'drinks',
    prices: [1, 3],
    sizes: ['small', 'medium'],
  },
  {
    id: '3',
    name: 'hamburger',
    quantity: 20,
    category: 'junk food',
    prices: [8, 14],
    sizes: ['small', 'medium'],
  },
  {
    id: '4',
    name: 'fries',
    quantity: 5,
    category: 'junk food',
    prices: [2, 4, 8],
    sizes: ['small', 'medium', 'large'],
  },
  {
    id: '5',
    name: 'pizza',
    quantity: 15,
    category: 'junk food',
    prices: [8, 10, 15],
    sizes: ['small', 'medium', 'large'],
  },
];

function filterJunkFood(menus) {
  return menus.filter(menu => menu.category === 'junk food');
}

function filterLargeFood(size) {
  return menus => menus.filter(menu => menu.sizes.filter(s => s === size).length > 0);
}

function filterPrices(prices, price) {
  return prices.filter(p => p < price);
}

function haveCheapFoodAvaliable(price) {
  return menus => menus
    .filter(menu => filterPrices(menu.prices, price).length > 0)
    .map(menu => {
      const cheaperPrices = menu.prices.filter(p => p < price);
      return {
        ...menu,
        prices: filterPrices(menu.prices, price),
        sizes: cheaperPrices.map((_, index) => menu.sizes[index]),
      };
    });
}

const orderFood = pipe(
  filterLargeFood('small'),
  haveCheapFoodAvaliable(5)
);

console.log(orderFood(menus));
