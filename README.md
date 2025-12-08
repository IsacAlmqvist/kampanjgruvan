# KampanjGruvan

The web app is for searching for on-sale items among the grocery stores close to you in Sweden, compare them by price, and to plan your shopping accordingly!

So far we have an app than can scrape the sale pages of the grocery stores (so far only for ICA), make an LLM categorize the items for easier search and sorting, display all the items of the stores you have liked, and you are able to add them to your shopping list. The app supports authentication through google which persists your liked stores and your shopping list, the data each user has scraped stays public on firestore. We have the basic UI structure in place for the app.

Moving forward we will implement:
- the filter and search system for items which we only have UI for right now.
- more stores, as well as scraping of other web sites than ICA
- some default items displayed before you have selected any favourite stores
- a better visual for each item with more information
- suspense and better error handling for api calls
- a way to query the Gemini api based on your shopping list (recipe, cheapest store etc.)

File structure:
src/
  components/
    horizontalScroll.jsx

  presenters/
    articlesPresenter.jsx
    CartPresenter.jsx
    FilterPresenter.jsx
    HeaderPresenter.jsx
    loginPagePresenter.jsx

  views/
    articlesView.jsx
    CartView.jsx
    FilterView.jsx
    HeaderView.jsx
    LikedStoresView.jsx
    loginPageView.jsx
    StoreSearchResultsView.jsx

  AppModel.js
  constData.js
  firebaseConfig.js
  firestoreModel.js
  gemini.js
  index.css
  index.jsx
  mobxReactiveModel.js
  root.jsx
  utilities.js
  webScraping.js

The root of the soruce file consists of our model, the api functions (scrapingBee and Gemini), the reactive model setup, the root of the app, and some utility functions and constant data. The app is divided into a few differnt presenters, each one responsible for one or a couple different views. 
