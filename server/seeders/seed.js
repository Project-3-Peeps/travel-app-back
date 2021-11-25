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
          },
          {
            creator: "Kyle Bove",
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
          },
          {
            creator: "Sami Byers",
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
          },
          {
            creator: "JuanJo Ramirez",
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
          },
          {
            creator: "Chloe Harris",
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
          }
        ],
        purchased_itinerary: [],
    },
]

const itinerarySeed = [
  {
    creator: "Kyle Bove",
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
  },
  {
    creator: "JuanJo Ramirez",
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
  },
  {
    creator: "Sami Byers",
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
  },
  {
    creator: "Chloe Harris",
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
  },
  {
    creator: "Kyle Bove",
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
  },
  {
    creator: "JuanJo Ramirez",
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
  },
  {
    creator: "Sami Byers",
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
  },
  {
    creator: "Chloe Harris",
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
