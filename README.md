# About SpikeAlert

SpikeAlert is an app designed to expose clear, real-time financial data to Magic: The Gathering collectors and enthusiasts. It allows users to save their collection, track metrics across foil/nonfoil/premium printings, view percent change over specified timeframes, and alerts users of price spikes via the [Twilio](https://www.twilio.com/) API. If you're a user (or developer) interested in suggesting new features, please feel free to reach out!

## Getting Started

Clone both this repo and the [spike-alert-api](https://github.com/jaikamat/spike-alert-api) repo to your local machine

#### Frontend (this repo)

Run `npm start` to initialize the react app. Open [http://localhost:3000](http://localhost:3000) to view the frontend in the browser. The react app will reload if you make edits, and you will also see any linting errors in the console. It should connect to the backend when running locally.

#### Backend/API ([spike-alert-api](https://github.com/jaikamat/spike-alert-api))

Run `node database/seed_script.js` to seed the api database with local data, which can be collected at various intervals by manually running `npm run scrape`. I've been collecting this data daily (sometimes twice per day or so), but you could probably write a service to do this for you at various intervals. Initialize the API by running `npm start`. This app uses MongoDB - remember to get a local instance running on your machine first or you'll get errors thrown at you.

You should also get some keys from Twilio to use their API, and store them in a `.env` file. Global variable names picked up by the `dotenv` npm module can be viewed in the code.

## Deployment

...Coming soon!

## Created with

-   [MongoDB](https://www.mongodb.com/)
-   [Express-Generator](https://www.npmjs.com/package/express-generator)
-   [Create React App](https://github.com/facebook/create-react-app)
-   [NodeJS](https://nodejs.org/en/)
-   [Twilio API](https://www.twilio.com/docs/usage/api)
