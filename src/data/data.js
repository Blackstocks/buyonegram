import {
    moong, kalaChanna, kaliMasoor, moongDal, uradSabut, arharDal, moongMogar, channaDal, mothSabut,
    whiteMatar, sabudana, uradChilka, chitraRajma, cholaMogar, mishriCutting, mixDal, jhamboRajma, kabuliChanna,
    lobiya, masoorDal, mufliDana,
  } from "../assets/index";

  const productsData = [
    {
      "product": "Arhar Dal",
      "image": arharDal,
      "500gm": 61.83,
      "1kg": 122.65,
      "5kg": 598.25,
      "30kg": 3390.00
    },
    {
      "product": "Bura",
      "image": mishriCutting,
      "500gm": 28.23,
      "1kg": 55.45,
      "5kg": 262.25,
      "30kg": 1470.00
    },
    {
      "product": "Channa Dal",
      "image": channaDal,
      "500gm": 41.35,
      "1kg": 81.70,
      "5kg": 393.50,
      "30kg": 2220.00
    },
    {
      "product": "Cholla Mogar",
      "image": cholaMogar,
      "500gm": 48.70,
      "1kg": 96.40,
      "5kg": 467.00,
      "30kg": 2640.00
    },
    {
      "product": "Kabuli Channa",
      "image": kabuliChanna,
      "500gm": 49.75,
      "1kg": 98.50,
      "5kg": 477.50,
      "30kg": 2700.00
    },
    {
      "product": "Kabuli Dollar",
      "image": kabuliChanna,
      "500gm": 69.70,
      "1kg": 138.40,
      "5kg": 677.00,
      "30kg": 3840.00
    },
    {
      "product": "Kala Channa",
      "image": kalaChanna,
      "500gm": 38.20,
      "1kg": 75.40,
      "5kg": 362.00,
      "30kg": 2040.00
    },
    {
      "product": "Lobiya",
      "image": lobiya,
      "500gm": 49.23,
      "1kg": 97.45,
      "5kg": 472.25,
      "30kg": 2670.00
    },
    {
      "product": "Masoor Dal",
      "image": masoorDal,
      "500gm": 44.50,
      "1kg": 88.00,
      "5kg": 425.00,
      "30kg": 2400.00
    },
    {
      "product": "Masoor Kali",
      "image": kaliMasoor,
      "500gm": 41.88,
      "1kg": 82.75,
      "5kg": 398.75,
      "30kg": 2250.00
    },
    {
      "product": "Masoor Malka",
      "image": masoorDal,
      "500gm": 43.98,
      "1kg": 86.95,
      "5kg": 419.75,
      "30kg": 2370.00
    },
    {
      "product": "Matar Green",
      "image": whiteMatar,
      "500gm": 47.65,
      "1kg": 0,
      "5kg": 456.50,
      "30kg": 2580.00
    },
    {
      "product": "Matar Safed",
      "image": whiteMatar,
      "500gm": 28.23,
      "1kg": 55.45,
      "5kg": 262.25,
      "30kg": 1470.00
    },
    {
      "product": "Mishri Cutting",
      "image": mishriCutting,
      "500gm": 31.90,
      "1kg": 62.80,
      "5kg": 299.00,
      "30kg": 1680.00
    },
    {
      "product": "Mix Dal",
      "image": mixDal,
      "500gm": 57.10,
      "1kg": 113.20,
      "5kg": 551.00,
      "30kg": 3120.00
    },
    {
      "product": "Moofhli Dana (Desi)",
      "image": mufliDana,
      "500gm": 51.33,
      "1kg": 101.65,
      "5kg": 493.25,
      "30kg": 2790.00
    },
    {
      "product": "Moong Chilka",
      "image": moong,
      "500gm": 53.43,
      "1kg": 105.85,
      "5kg": 514.25,
      "30kg": 2910.00
    },
    {
      "product": "Moong Mogar (Bold)",
      "image": moongMogar,
      "500gm": 57.63,
      "1kg": 114.25,
      "5kg": 556.25,
      "30kg": 3150.00
    },
    {
      "product": "Moong Sabut",
      "image": moong,
      "500gm": 52.90,
      "1kg": 104.80,
      "5kg": 509.00,
      "30kg": 2880.00
    },
    {
      "product": "Moth Sabut",
      "image": mothSabut,
      "500gm": 42.93,
      "1kg": 0,
      "5kg": 409.25,
      "30kg": 2310.00
    },
    {
      "product": "Rajma Chitra",
      "image": chitraRajma,
      "500gm": 67.08,
      "1kg": 0,
      "5kg": 650.75,
      "30kg": 3690.00
    },
    {
      "product": "Rajma Jhambu",
      "image": jhamboRajma,
      "500gm": 55.53,
      "1kg": 0,
      "5kg": 535.25,
      "30kg": 3030.00
    },
    {
      "product": "Rajma Red",
      "image": jhamboRajma,
      "500gm": 60.78,
      "1kg": 120.55,
      "5kg": 587.75,
      "30kg": 3330.00
    },
    {
      "product": "Sabu Dana",
      "image": sabudana,
      "500gm": 41.88,
      "1kg": 82.75,
      "5kg": 398.75,
      "30kg": 2250.00
    },
    {
      "product": "Soyabean Dana",
      "image": mufliDana,
      "500gm": 31.90,
      "1kg": 0,
      "5kg": 299.00,
      "30kg": 1680.00
    },
    {
      "product": "Urad Chilka Daal",
      "image": uradChilka,
      "500gm": 57.63,
      "1kg": 0,
      "5kg": 556.25,
      "30kg": 3150.00
    },
    {
      "product": "Urad Mogar",
      "image": uradChilka,
      "500gm": 59.20,
      "1kg": 117.40,
      "5kg": 572.00,
      "30kg": 3240.00
    },
    {
      "product": "Urad Sabut",
      "image": uradSabut,
      "500gm": 53.95,
      "1kg": 0,
      "5kg": 519.50,
      "30kg": 2940.00
    }
  ];
  
  const featuredProducts = [
    {
      name: 'Kabuli Dollar',
      image: kabuliChanna,
      prices: {
        '500gm': 69.70,
        '1kg': 138.40,
        '5kg': 677.00,
        '30kg': 3840.00
      },
      description: 'Premium quality Kabuli Dollar, known for its superior size and cooking quality. Perfect for both home and commercial use.',
      features: [
        'Premium Grade',
        'Consistent Size',
        'High Protein Content',
        'No Chemical Processing'
      ]
    },
    {
      name: 'Masoor Dal',
      image: masoorDal,
      prices: {
        '500gm': 44.50,
        '1kg': 88.00,
        '5kg': 425.00,
        '30kg': 2400.00
      },
      description: 'High-quality Masoor Dal with perfect texture and rich nutritional value. Ideal for everyday cooking.',
      features: [
        'Natural Color',
        'Quick Cooking',
        'Rich in Protein',
        'Carefully Sorted'
      ]
    },
    {
      name: 'Urad Dal',
      image: uradChilka,
      prices: {
        '500gm': 57.63,
        '1kg': 114.25,
        '5kg': 556.25,
        '30kg': 3150.00
      },
      description: 'Premium Urad Dal, perfect for South Indian delicacies. Maintains its shape and texture after cooking.',
      features: [
        'Superior Quality',
        'Pure White Color',
        'High Nutrition',
        'Traditional Processing'
      ]
    },
    {
      name: 'Channa Dal',
      image: channaDal,
      prices: {
        '500gm': 41.35,
        '1kg': 81.70,
        '5kg': 393.50,
        '30kg': 2220.00
      },
      description: 'Premium quality Channa Dal with excellent taste and cooking properties. Perfect for various Indian dishes.',
      features: [
        'Golden Color',
        'Even Size',
        'High Fiber Content',
        'Quality Assured'
      ]
    },
    {
      name: 'Moong Dal',
      image: moongDal,
      prices: {
        '500gm': 57.63,
        '1kg': 114.25,
        '5kg': 556.25,
        '30kg': 3150.00
      },
      description: 'Superior quality Moong Dal, perfect for both everyday cooking and special dishes. Easy to digest.',
      features: [
        'Premium Selection',
        'Natural Processing',
        'Rich in Nutrients',
        'Uniform Size'
      ]
    }
  ];

  export {
    productsData,
    featuredProducts
  }