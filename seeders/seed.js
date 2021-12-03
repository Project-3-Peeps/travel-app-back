const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect('mongodb://localhost/triptinerary-db', {
  useNewUrlParser: true,
//   useFindAndModify: true,
  useUnifiedTopology: true,
});

const userSeed = [
    {
        username: "Kyle Bove",
        email: "kyle@kyle.kyle",
        password: "Password",
        points: 500,
        saved_itinerary: [{
            creator: "Kyle Bove",
            title: "Pig Beach Day",
            description: "A trip to pig beach",
            price: 30,
            days: [
              {
                day_number: 1,
                activities: [{
                    where: "pig beach",
                    what: "swimming with the piggies",
                    cost: 400
                }],
                city: 'pig beach'
              },
            ],
            image: 'https://allthatsinteresting.com/wordpress/wp-content/uploads/2016/11/feeding-the-pig.jpg',
            ratings: []
          },
          {
            creator: "Kyle Bove",
            title: "Fall in Scandinavia",
            description: "Experience Denmark and Germany the way you're supposed to",
            price: 70,
            days: [
              {
                day_number: 1,
                activities: [{
                    where: "Cristiana",
                    what: "Checking out the 'totally legal' farmer's market",
                    cost: 70
                }],
                city: 'Copenhagen, DK'
              },
              {
                day_number: 2,
                activities: [{
                    where: "Downtown Munich",
                    what: "Partying like a filthy animal at oktoberfest",
                    cost: 150
                }],
                city: 'Munich, GER'
              },
            ],
            image: 'https://cdn.theatlantic.com/thumbor/hWK65e6IG44dg7BUiFOLjZ2nkzY=/0x23:1247x792/640x400/media/img/photo/2014/09/opening-weekend-of-oktoberfest-2014/o01_14560857-1/original.jpg',
            ratings: []
          }
        ],
        purchased_itinerary: [],
    },
    {
        username: "Sami Byers",
        email: "sami@sami.sami",
        password: "Password",
        points: 500,
        saved_itinerary: [{
            creator: "Sami Byers",
            title: "The Lone Star Experience",
            description: "Going to a good old fashion texas rodeo",
            price: 40,
            days: [
              {
                day_number: 1,
                activities: [{
                    where: "Fort Worth Stockyards",
                    what: "Beers, brisket, and bulls",
                    cost: 100
                }],
                city: 'Fort Worth, TX'
              },
            ],
            image: "https://nationalwestern.com/wp-content/uploads/2020/01/barrel-web.jpg",
            ratings: []
          },
          {
            creator: "Sami Byers",
            title: "Ireland IRL",
            description: "Pub crawl through Ireland",
            price: 90,
            days: [
              {
                day_number: 1,
                activities: [{
                    where: "The Temple Bar",
                    what: "Trying to catch a leprachaun",
                    cost: 100
                }],
                city: 'Dublin, IRE'
              },
              {
                day_number: 2,
                activities: [{
                    where: "Crosskeys Inn",
                    what: "fighting off the hangover",
                    cost: 100
                }],
                city: 'Antrim, IRE'
              },
            ],
            image: "https://i2.wp.com/wandereroftheworld.co.uk/wp-content/uploads/2017/06/Why-is-The-Temple-Bar-in-Dublin-famous.jpg?fit=650%2C400&ssl=1",
            ratings: []
          }
        ],
        purchased_itinerary: [],
    },    {
        username: "JuanJo Ramirez",
        email: "juanjo@juanjo.juanjo",
        password: "Password",
        points: 500,
        saved_itinerary: [{
            creator: "JuanJo Ramirez",
            title: "Seafood in Seatown",
            description: "A quest to find the best seafood in Seattle",
            price: 20,
            days: [
              {
                day_number: 1,
                activities: [{
                    where: "Palisade",
                    what: "Wining and dining",
                    cost: 300
                }],
                city: 'Seattle, WA'
              },
            ],
            image: "https://img.dtcn.com/image/themanual/seattle-washington-travel-city-guide.jpg",
            ratings: []
          },
          {
            creator: "JuanJo Ramirez",
            title: "East Asian Excursion",
            description: "East Asia in two days",
            price: 80,
            days: [
              {
                day_number: 1,
                activities: [{
                    where: "elephanta caves",
                    what: "Visiting a historic landmark",
                    cost: 50
                }],
                city: 'Mumbai, IND'
              },
              {
                day_number: 2,
                activities: [{
                    where: "Hong Kong",
                    what: "Hong Kong Cyclathon",
                    cost: 100
                }],
                city: 'Hong Kong, HK'
              },
            ],
            image: "https://www.business.hsbc.com/-/media/cmb/international-business-guide/hk/images/doing-business-hongkong.jpg?h=961&w=1440&la=en-GB&hash=58C2D49B6CB7D83991A7B683E4D802CC",
            ratings: []
          }
        ],
        purchased_itinerary: [],
    },    {
        username: "Chloe Harris",
        email: "chloe@chloe.chloe",
        password: "Password",
        points: 500,
        saved_itinerary: [  {
            creator: "Chloe Harris",
            title: "New York in Style",
            description: "Travel New York in fashion",
            price: 50,
            days: [
              {
                day_number: 1,
                activities: [{
                    where: "the Garment district",
                    what: "finding the most fabulous fabrics",
                    cost: 200
                }],
                city: 'New York City, NY'
              },
            ],
            image: "https://garmentdistrict.nyc/sites/default/files/styles/max_2600x2600/public/2021-02/NeighborhoodAbout.jpg?itok=Ke6ZwmxO",
            ratings: []
          },
          {
            creator: "Chloe Harris",
            title: "Two Days in Japan",
            description: "Blinding lights and city nights in Japan",
            price: 100,
            days: [
              {
                day_number: 1,
                activities: [{
                    where: "Harajuku",
                    what: "The chic capital of Japan",
                    cost: 100
                }],
                city: 'Tokyo, JPN'
              },
              {
                day_number: 2,
                activities: [{
                    where: "Mt. Moiwa",
                    what: "View of the Hokkaido region at night",
                    cost: 100
                }],
                city: 'Sapporo, JPN'
              },
            ],
            image: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/499000/499996-sapporo-and-vicinity.jpg",
            ratings: []
          }
        ],
        purchased_itinerary: [],
    },
]

const itinerarySeed = [
  {
    creator: "Kyle Bove",
    title: "Pig Beach Day",
    description: "A trip to pig beach",
    price: 30,
    days: [
      {
        day_number: 1,
        activities: [{
            where: "pig beach",
            what: "swimming with the piggies",
            cost: 400
        }],
        city: 'pig beach'
      },
    ],
    image: 'https://allthatsinteresting.com/wordpress/wp-content/uploads/2016/11/feeding-the-pig.jpg',
    ratings: []
  },
  {
    creator: "JuanJo Ramirez",
    title: "Seafood in Seatown",
    description: "A quest to find the best seafood in Seattle",
    price: 20,
    days: [
      {
        day_number: 1,
        activities: [{
            where: "Palisade",
            what: "Wining and dining",
            cost: 300
        }],
        city: 'Seattle, WA'
      },
    ],
    image: "https://img.dtcn.com/image/themanual/seattle-washington-travel-city-guide.jpg",
    ratings: []
  },
  {
    creator: "Sami Byers",
    title: "The Lone Star Experience",
    description: "Going to a good old fashion texas rodeo",
    price: 40,
    days: [
      {
        day_number: 1,
        activities: [{
            where: "Fort Worth Stockyards",
            what: "Beers, brisket, and bulls",
            cost: 100
        }],
        city: 'Fort Worth, TX'
      },
    ],
    image: "https://nationalwestern.com/wp-content/uploads/2020/01/barrel-web.jpg",
    ratings: []
  },
  {
    creator: "Chloe Harris",
    title: "New York in Style",
    description: "Travel New York in fashion",
    price: 50,
    days: [
      {
        day_number: 1,
        activities: [{
            where: "the Garment district",
            what: "finding the most fabulous fabrics",
            cost: 200
        }],
        city: 'New York City, NY'
      },
    ],
    image: "https://garmentdistrict.nyc/sites/default/files/styles/max_2600x2600/public/2021-02/NeighborhoodAbout.jpg?itok=Ke6ZwmxO",
    ratings: []
  },
  {
    creator: "Kyle Bove",
    title: "Fall in Scandinavia",
    description: "Experience Denmark and Germany the way you're supposed to",
    price: 70,
    days: [
      {
        day_number: 1,
        activities: [{
            where: "Cristiana",
            what: "Checking out the 'totally legal' farmer's market",
            cost: 70
        }],
        city: 'Copenhagen, DK'
      },
      {
        day_number: 2,
        activities: [{
            where: "Downtown Munich",
            what: "Partying like a filthy animal at oktoberfest",
            cost: 150
        }],
        city: 'Munich, GER'
      },
    ],
    image: "https://cdn.theatlantic.com/thumbor/hWK65e6IG44dg7BUiFOLjZ2nkzY=/0x23:1247x792/640x400/media/img/photo/2014/09/opening-weekend-of-oktoberfest-2014/o01_14560857-1/original.jpg",
    ratings: []
  },
  {
    creator: "JuanJo Ramirez",
    title: "East Asian Excursion",
    description: "East Asia in two days",
    price: 80,
    days: [
      {
        day_number: 1,
        activities: [{
            where: "elephanta caves",
            what: "Visiting a historic landmark",
            cost: 50
        }],
        city: 'Mumbai, IND'
      },
      {
        day_number: 2,
        activities: [{
            where: "Hong Kong",
            what: "Hong Kong Cyclathon",
            cost: 100
        }],
        city: 'Hong Kong, HK'
      },
    ],
    image: "https://www.business.hsbc.com/-/media/cmb/international-business-guide/hk/images/doing-business-hongkong.jpg?h=961&w=1440&la=en-GB&hash=58C2D49B6CB7D83991A7B683E4D802CC",
    ratings: []
  },
  {
    creator: "Sami Byers",
    title: "Ireland IRL",
    description: "Pub crawl through Ireland",
    price: 90,
    days: [
      {
        day_number: 1,
        activities: [{
            where: "The Temple Bar",
            what: "Trying to catch a leprachaun",
            cost: 100
        }],
        city: 'Dublin, IRE'
      },
      {
        day_number: 2,
        activities: [{
            where: "Crosskeys Inn",
            what: "fighting off the hangover",
            cost: 100
        }],
        city: 'Antrim, IRE'
      },
    ],
    image: "https://i2.wp.com/wandereroftheworld.co.uk/wp-content/uploads/2017/06/Why-is-The-Temple-Bar-in-Dublin-famous.jpg?fit=650%2C400&ssl=1",
    ratings: []
  },
  {
    creator: "Chloe Harris",
    title: "Two Days in Japan",
    description: "Blinding lights and city nights in Japan",
    price: 100,
    days: [
      {
        day_number: 1,
        activities: [{
            where: "Harajuku",
            what: "The chic capital of Japan",
            cost: 100
        }],
        city: 'Tokyo, JPN'
      },
      {
        day_number: 2,
        activities: [{
            where: "Mt. Moiwa",
            what: "View of the Hokkaido region at night",
            cost: 100
        }],
        city: 'Sapporo, JPN'
      },
    ],
    image: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/499000/499996-sapporo-and-vicinity.jpg",
    ratings: []
  },
];

db.User.deleteMany({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then((data) => {
    console.log(data.insertedCount + ' records inserted!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

db.Itinerary.deleteMany({})
  .then(() => db.Itinerary.collection.insertMany(itinerarySeed))
  .then((data) => {
    console.log(data.insertedCount + ' records inserted!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
