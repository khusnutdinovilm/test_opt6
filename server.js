module.exports = () => {
  const data = {
    products: [
      {
        id: Math.random(),
        unit_title: "Мраморный щебень",
        property: "фр. 2-5 мм, 25кг",
        product_title: "Мраморный щебень фр. 2-5 мм",
        weight: 25,
        price: Math.round(Math.random() * (10000 - 1000) + 1000, 0), // генерация случайной цены
      },
      {
        id: Math.random(),
        unit_title: "Мраморный щебень",
        property: "фр. 2-5 мм, 25кг (белый)",
        product_title: "Мраморный щебень фр. 2-5 мм",
        weight: 25, // вес товара
        price: Math.round(Math.random() * (10000 - 1000) + 1000), // генерация случайной цены
      },
      {
        id: Math.random(),
        unit_title: "Мраморный щебень",
        property: "фр. 2-5 мм, 25кг (вайт)",
        product_title: "Мраморный щебень фр. 2-5 мм",
        weight: 25, // вес товара
        price: Math.round(Math.random() * (10000 - 1000) + 1000), // генерация случайной цены
      },
      {
        id: Math.random(),
        unit_title: "Мраморный щебень",
        property: "фр. 2-5 мм, 25кг, возврат",
        product_title: "Мраморный щебень фр. 2-5 мм",
        weight: 25, // вес товара
        price: Math.round(Math.random() * (10000 - 1000) + 1000), // генерация случайной цены
      },
      {
        id: Math.random(),
        unit_title: "Мраморный щебень",
        property: "фр. 2-5 мм, 1т",
        product_title: "Мраморный щебень фр. 2-5 мм",
        weight: 1000, // вес товара
        price: Math.round(Math.random() * (10000 - 1000) + 1000), // генерация случайной цены
      },
    ],
    orders: [],
  };

  let unit_titles = data.products.map((pr) => ({
    product_title: pr.title,
    unit_title: pr.unit_title,
    property: pr.property,
    price: pr.price,
    weight: pr.weight,
  }));

  for (let i = 0; i < 3; i++) {
    let random = Math.floor(Math.random() * unit_titles.length);
    let count = 12;
    let total = unit_titles[random].price * count;
    data.orders.push({
      id: Math.random(),
      unit_title: `${unit_titles[random].unit_title} ${unit_titles[random].property}`,
      price: unit_titles[random].price,
      count,
      weight: unit_titles[random].weight,
      product_title: "Мраморный щебень фр. 2-5 мм",
      total,
    });
  }

  return data;
};
