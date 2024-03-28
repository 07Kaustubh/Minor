const mongoose = require('mongoose');
const Category = require('./models/category');
const Product = require('./models/product');

// Connect to MongoDB
mongoose.connect('mongodb+srv://kaustubhbhargava0705:Ganesh123@cluster0.g0mlc96.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');

  try {
    // Create the fourth category (formal shoes)
    const fourthCategoryData = {
      name: 'Formal Shoes',
      description: 'Elegant and sophisticated formal shoes for men',
      image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with real image URL
    };

    const fourthCategory = await Category.create(fourthCategoryData);
    console.log('Fourth category inserted successfully');

    // Create the fifth category (slippers)
    const fifthCategoryData = {
      name: 'Slippers',
      description: 'Comfortable slippers for casual wear',
      image: 'https://images.unsplash.com/photo-1622920799137-86c891159e44?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2xpcHBlcnN8ZW58MHx8MHx8fDA%3D', // Replace with real image URL
    };

    const fifthCategory = await Category.create(fifthCategoryData);
    console.log('Fifth category inserted successfully');

    // Create 5 products for the fourth category (formal shoes)
    const formalShoesProducts = [
      {
        product_id: 16,
        name: 'ECCO Men\'s Helsinki Slip-On',
        price: 149.95,
        description: 'Classic slip-on shoes with a modern touch for formal occasions.',
        image: 'https://us.ecco.com/dw/image/v2/BCNL_PRD/on/demandware.static/-/Sites-ecco/default/dwb6ae08b2/catalogimages/500154-01001-o_eCom.png?sw=720&sh=900&sm=fit&q=75',
        variations: ['Size 7', 'Size 8', 'Size 9', 'Size 10', 'Size 11'],
        images: [
          'https://us.ecco.com/dw/image/v2/BCNL_PRD/on/demandware.static/-/Sites-ecco/default/dw5b434028/catalogimages/500154-01001-m_eCom.png?sw=720&sh=900&sm=fit&q=75',
          'https://us.ecco.com/dw/image/v2/BCNL_PRD/on/demandware.static/-/Sites-ecco/default/dw5b434028/catalogimages/500154-01001-m_eCom.png?sw=720&sh=900&sm=fit&q=75',
          'https://us.ecco.com/dw/image/v2/BCNL_PRD/on/demandware.static/-/Sites-ecco/default/dw36559c1e/catalogimages/500154-01001-b_eCom.png?sw=720&sh=900&sm=fit&q=75'
        ],
        relatedProducts: [
          // Related products for formal shoes...
          {
            id: 17,
            name: 'Dockers Men\'s Gordon Leather Oxford Dress Shoe',
            price: 49.99,
            image: 'https://m.media-amazon.com/images/I/51bt2lf5PpL._AC_SY395_.jpg',
          },
          {
            id: 18,
            name: 'Clarks Men\'s Tilden Cap Oxford Shoe',
            price: 49.99,
            image: 'https://m.media-amazon.com/images/I/81zqrHuWkZL._AC_SY500_.jpg',
          }
        ],
        category_name: fourthCategory.name,
      },
      // Add 4 more formal shoes products similarly...
      {
        product_id: 17,
        name: 'Dockers Men\'s Gordon Leather Oxford Dress Shoe',
        price: 49.99,
        description: 'Classic oxford dress shoes for formal occasions.',
        image: 'https://m.media-amazon.com/images/I/51bt2lf5PpL._AC_SY395_.jpg',
        variations: ['Size 7', 'Size 8', 'Size 9', 'Size 10', 'Size 11'],
        images: [
          'https://m.media-amazon.com/images/I/51Av5ENAHWL._AC_SY395_.jpg',
          'https://m.media-amazon.com/images/I/51Y2PABTYxL._AC_SY395_.jpg',
          'https://m.media-amazon.com/images/I/51-4IKrM1WL._AC_SY395_.jpg'
        ],
        relatedProducts: [
          // Related products for formal shoes...
          {
            id: 16,
            name: 'ECCO Men\'s Helsinki Slip-On',
            price: 149.95,
            image: 'https://us.ecco.com/dw/image/v2/BCNL_PRD/on/demandware.static/-/Sites-ecco/default/dwb6ae08b2/catalogimages/500154-01001-o_eCom.png?sw=720&sh=900&sm=fit&q=75',
          },
          {
            id: 18,
            name: 'Clarks Men\'s Tilden Cap Oxford Shoe',
            price: 49.99,
            image: 'https://m.media-amazon.com/images/I/81zqrHuWkZL._AC_SY500_.jpg',
          }
        ],
        category_name: fourthCategory.name,
      },
      {
        product_id: 18,
        name: 'Clarks Men\'s Tilden Cap Oxford Shoe',
        price: 49.99,
        description: 'Classic oxford dress shoes for formal occasions.',
        image: 'https://m.media-amazon.com/images/I/81zqrHuWkZL._AC_SY500_.jpg',
        variations: ['Size 7', 'Size 8', 'Size 9', 'Size 10', 'Size 11'],
        images: [
          'https://m.media-amazon.com/images/I/71CYdN-kvIL._AC_SY395_.jpg',
          'https://m.media-amazon.com/images/I/61z64LUf2YL._AC_SY395_.jpg',
          'https://m.media-amazon.com/images/I/81ieUM0mu-L._AC_SY395_.jpg'
        ],
        relatedProducts: [
          // Related products for formal shoes...
          {
            id: 16,
            name: 'ECCO Men\'s Helsinki Slip-On',
            price: 149.95,
            image: 'https://us.ecco.com/dw/image/v2/BCNL_PRD/on/demandware.static/-/Sites-ecco/default/dwb6ae08b2/catalogimages/500154-01001-o_eCom.png?sw=720&sh=900&sm=fit&q=75',
          },
          {
            id: 17,
            name: 'Dockers Men\'s Gordon Leather Oxford Dress Shoe',
            price: 49.99,
            image: 'https://m.media-amazon.com/images/I/51bt2lf5PpL._AC_SY395_.jpg',
          }
        ],
        category_name: fourthCategory.name,
      },
      {
        product_id: 19,
        name: 'Cole Haan Men\'s Grand Crosscourt II Sneaker',
        price: 49.99,
        description: 'Classic oxford dress shoes for formal occasions.',
        image: 'https://www.colehaan.com/on/demandware.static/-/Sites-itemmaster_colehaan/default/dw4a030057/images/C35816/large/GC%20MODERN%20PERF%20SNKR_e_A_C35816.jpg',
        variations: ['Size 7', 'Size 8', 'Size 9', 'Size 10', 'Size 11'],
        images: [
          'https://www.colehaan.com/on/demandware.static/-/Sites-itemmaster_colehaan/default/dw2db22516/images/C35816/large/GC%20MODERN%20PERF%20SNKR_e_F_C35816.jpg',
          'https://www.colehaan.com/on/demandware.static/-/Sites-itemmaster_colehaan/default/dwa0666171/images/C35816/large/GC%20MODERN%20PERF%20SNKR_e_E_C35816.jpg',
          'https://www.colehaan.com/on/demandware.static/-/Sites-itemmaster_colehaan/default/dwa0666171/images/C35816/large/GC%20MODERN%20PERF%20SNKR_e_E_C35816.jpg'
        ],
        relatedProducts: [
          // Related products for formal shoes...
          {
            id: 17,
            name: 'Dockers Men\'s Gordon Leather Oxford Dress Shoe',
            price: 49.99,
            image: 'https://m.media-amazon.com/images/I/51bt2lf5PpL._AC_SY395_.jpg',
          },
          {
            id: 18,
            name: 'Clarks Men\'s Tilden Cap Oxford Shoe',
            price: 49.99,
            image: 'https://m.media-amazon.com/images/I/81zqrHuWkZL._AC_SY500_.jpg',
          }
        ],
        category_name: fourthCategory.name,
      },
      {
        product_id: 20,
        name: 'Skechers Men\'s Classic Fit-Delson-Camden Sneaker',
        price: 49.99,
        description: 'Classic oxford dress shoes for formal occasions.',
        image: 'https://m.media-amazon.com/images/I/71y-7jzv9RL._AC_SX500_.jpg',
        variations: ['Size 7', 'Size 8', 'Size 9', 'Size 10', 'Size 11'],
        images: [
          'https://m.media-amazon.com/images/I/616ekQANnvL._AC_SX395_.jpg',
          'https://m.media-amazon.com/images/I/61ZyxuEEN+L._AC_SX395_.jpg',
          'https://m.media-amazon.com/images/I/71kNAUlF4dL._AC_SX395_.jpg'
        ],
        relatedProducts: [
          // Related products for formal shoes...
          {
            id: 17,
            name: 'Dockers Men\'s Gordon Leather Oxford Dress Shoe',
            price: 49.99,
            image: 'https://m.media-amazon.com/images/I/51bt2lf5PpL._AC_SY395_.jpg',
          },
          {
            id: 19,
            name: 'Cole Haan Men\'s Grand Crosscourt II Sneaker',
            price: 49.99,
            image: 'https://www.colehaan.com/on/demandware.static/-/Sites-itemmaster_colehaan/default/dw4a030057/images/C35816/large/GC%20MODERN%20PERF%20SNKR_e_A_C35816.jpg',
          }
        ],
        category_name: fourthCategory.name,
      },
    ];


    // Insert formal shoes products
    const insertedFormalShoesProducts = await Product.insertMany(formalShoesProducts);
    console.log('Formal shoes products inserted successfully:', insertedFormalShoesProducts);

    // Create 5 products for the fifth category (slippers)
    const slippersProducts = [
      {
        product_id: 21,
        name: 'Hanes Men\'s Moccasin Slipper House Shoe',
        price: 24.99,
        description: 'Cozy and warm moccasin-style slippers for indoor use.',
        image: 'https://i5.walmartimages.com/seo/Hanes-Men-s-Moccasin-Slipper-House-Shoe-With-Indoor-Outdoor-Memory-Foam-Sole-Fresh-IQ-Odor-Protection_1a7bc367-71d5-4381-be0d-77e92c8dfcaf.5260eef8954a5c25c518ca6e895f54f4.jpeg?odnHeight=117&odnWidth=117&odnBg=FFFFFF',
        variations: ['Size 7', 'Size 8', 'Size 9', 'Size 10', 'Size 11'],
        images: [
          'https://i5.walmartimages.com/asr/d7dcbf3b-1ef2-46f7-a211-560369589308.8ec0b859d903657dcf613abc0d905164.jpeg?odnHeight=117&odnWidth=117&odnBg=FFFFFF',
          'https://i5.walmartimages.com/asr/24187f0f-c6bf-4506-998b-eee70acefc18.afe783d7fe1fb55f622a4af57aff2611.jpeg?odnHeight=117&odnWidth=117&odnBg=FFFFFF',
          'https://i5.walmartimages.com/asr/c68cfeda-89b1-4f86-b5ea-9de60c2f11cf.a3cbd15f30d14bdf16843ab4de265413.jpeg?odnHeight=117&odnWidth=117&odnBg=FFFFFF'
        ],
        relatedProducts: [
          // Related products for slippers...
          {
            id: 22,
            name: 'RockDove Men\'s Original Two-Tone Memory Foam Slipper',
            price: 21.99,
            image: 'https://www.rockdovefootwear.com/cdn/shop/products/a1_1500x.jpg?v=1693886534',
          },
          {
            id: 23,
            name: 'ULTRAIDEAS Men\'s Cozy Memory Foam Slippers',
            price: 21.99,
            image: 'https://m.media-amazon.com/images/I/61rOBQCQMoL._AC_SY500_.jpg',
          }
        ],
        category_name: fifthCategory.name,
      },
      // Add 4 more slippers products similarly...
      {
        product_id: 22,
        name: 'RockDove Men\'s Original Two-Tone Memory Foam Slipper',
        price: 21.99,
        description: 'Comfortable memory foam slippers for indoor use.',
        image: 'https://www.rockdovefootwear.com/cdn/shop/products/a1_1500x.jpg?v=1693886534',
        variations: ['Size 7', 'Size 8', 'Size 9', 'Size 10', 'Size 11'],
        images: [
          'https://www.rockdovefootwear.com/cdn/shop/products/sole_1500x.jpg?v=1693886534',
          'https://www.rockdovefootwear.com/cdn/shop/products/6_11ad7f10-b359-4bb7-80e1-59a6f2047ea2_1600x.jpg?v=1693886534',
          'https://www.rockdovefootwear.com/cdn/shop/products/2_9a702639-f948-4ab0-87f1-1aa7e9ef618c_1600x.jpg?v=1693886534'
        ],
        relatedProducts: [
          // Related products for slippers...
          {
            id: 21,
            name: 'Hanes Men\'s Moccasin Slipper House Shoe',
            price: 24.99,
            image: 'https://i5.walmartimages.com/seo/Hanes-Men-s-Moccasin-Slipper-House-Shoe-With-Indoor-Outdoor-Memory-Foam-Sole-Fresh-IQ-Odor-Protection_1a7bc367-71d5-4381-be0d-77e92c8dfcaf.5260eef8954a5c25c518ca6e895f54f4.jpeg?odnHeight=117&odnWidth=117&odnBg=FFFFFF'
          },
          {
            id: 23,
            name: 'ULTRAIDEAS Men\'s Cozy Memory Foam Slippers',
            price: 21.99,
            image: 'https://m.media-amazon.com/images/I/61rOBQCQMoL._AC_SY500_.jpg',
          }
        ],
        category_name: fifthCategory.name,
      },
      {
        product_id: 23,
        name: 'ULTRAIDEAS Men\'s Cozy Memory Foam Slippers',
        price: 21.99,
        description: 'Comfortable memory foam slippers for indoor use.',
        image: 'https://m.media-amazon.com/images/I/61rOBQCQMoL._AC_SY500_.jpg',
        variations: ['Size 7', 'Size 8', 'Size 9', 'Size 10', 'Size 11'],
        images: [
          'https://m.media-amazon.com/images/I/71mhY-QPFmL._AC_SY395_.jpg',
          'https://m.media-amazon.com/images/I/71mhY-QPFmL._AC_SY395_.jpg',
          'https://m.media-amazon.com/images/I/61cXwSnCseL._AC_SY395_.jpg'
        ],
        relatedProducts: [
          // Related products for slippers...
          {
            id: 24,
            name: 'Lacoste Men\'s Fraisier Slides',
            price: 29.99,
            image: 'https://i5.walmartimages.com/asr/8a1cc291-fc56-43f9-8b70-770adf07e31a_1.d21e7e54ad0ad812726ad3690156cc0c.jpeg?odnHeight=117&odnWidth=117&odnBg=FFFFFF',
          },
          {
            id: 25,
            name: 'Under Armour Men\'s Ignite VI Slide Sandal',
            price: 34.99,
            image: 'https://underarmour.scene7.com/is/image/Underarmour/3022711-002_DEFAULT?rp=standard-30pad%7CpdpMainDesktop&scl=0.5&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=1836&hei=1950&size=850%2C850',
          }
        ],
        category_name: fifthCategory.name,
      },
      {
        product_id: 24,
        name: 'Lacoste Men\'s Fraisier Slides',
        price: 29.99, 
        description: 'Comfortable slides for casual wear.',
        image: 'https://i5.walmartimages.com/asr/8a1cc291-fc56-43f9-8b70-770adf07e31a_1.d21e7e54ad0ad812726ad3690156cc0c.jpeg?odnHeight=117&odnWidth=117&odnBg=FFFFFF',
        variations: ['Size 7', 'Size 8', 'Size 9', 'Size 10', 'Size 11'],
        images: [
          'https://i5.walmartimages.com/asr/ce303032-6556-417e-9d10-881bb191fa3a_1.e5efd16e82d642e0b22ccdadc120f15c.jpeg?odnHeight=117&odnWidth=117&odnBg=FFFFFF',
          'https://i5.walmartimages.com/asr/a053a2fd-617a-42a8-80cd-bd29a6097e82_1.100bd1116ff012d81df6e52cb993ce12.jpeg?odnHeight=117&odnWidth=117&odnBg=FFFFFF',
          'https://i5.walmartimages.com/asr/a1f4772c-7ada-4da2-883e-464bb2a19a49_1.d36f41fcc42233d93483d054b01db5e5.jpeg?odnHeight=117&odnWidth=117&odnBg=FFFFFF'
        ],
        relatedProducts: [
          // Related products for slippers...
          {
            id: 23,
            name: 'ULTRAIDEAS Men\'s Cozy Memory Foam Slippers',
            price: 21.99,
            image: 'https://m.media-amazon.com/images/I/61rOBQCQMoL._AC_SY500_.jpg',
          },
          {
            id: 25,
            name: 'Under Armour Men\'s Ignite VI Slide Sandal',
            price: 34.99,
            image: 'https://underarmour.scene7.com/is/image/Underarmour/3022711-002_DEFAULT?rp=standard-30pad%7CpdpMainDesktop&scl=0.5&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=1836&hei=1950&size=850%2C850',
          }
        ],
        category_name: fifthCategory.name,
      },
      {
        product_id: 25,
        name: 'Under Armour Men\'s Ignite VI Slide Sandal',
        price: 34.99,
        description: 'Comfortable slides for casual wear.',
        image: 'https://underarmour.scene7.com/is/image/Underarmour/3022711-002_DEFAULT?rp=standard-30pad%7CpdpMainDesktop&scl=0.5&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=1836&hei=1950&size=850%2C850',
        variations: ['Size 7', 'Size 8', 'Size 9', 'Size 10', 'Size 11'],
        images: [
          'https://underarmour.scene7.com/is/image/Underarmour/3022711-002_A?rp=standard-30pad%7CpdpMainDesktop&scl=0.5&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=1836&hei=1950&size=850%2C850',
          'https://underarmour.scene7.com/is/image/Underarmour/3022711-002_PAIR?rp=standard-30pad%7CpdpMainDesktop&scl=0.5&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=1836&hei=1950&size=850%2C850',
          'https://underarmour.scene7.com/is/image/Underarmour/3022711-002_SOLE?rp=standard-30pad%7CpdpMainDesktop&scl=0.5&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=1836&hei=1950&size=850%2C850'
        ],
        relatedProducts: [
          // Related products for slippers...
          {
            id: 24,
            name: 'Lacoste Men\'s Fraisier Slides',
            price: 29.99,
            image: 'https://i5.walmartimages.com/asr/8a1cc291-fc56-43f9-8b70-770adf07e31a_1.d21e7e54ad0ad812726ad3690156cc0c.jpeg?odnHeight=117&odnWidth=117&odnBg=FFFFFF',
          },
          {
            id: 23,
            name: 'ULTRAIDEAS Men\'s Cozy Memory Foam Slippers',
            price: 21.99,
            image: 'https://m.media-amazon.com/images/I/61rOBQCQMoL._AC_SY500_.jpg',
          }
        ],
        category_name: fifthCategory.name,
      }
    ];

    // Insert slippers products
    const insertedSlippersProducts = await Product.insertMany(slippersProducts);
    console.log('Slippers products inserted successfully:', insertedSlippersProducts);
  } catch (error) {
    console.error('Error:', error);
  }
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
