# KampanjGruvan

The web app is for searching for on-sale items among the grocery stores close to you in Sweden, compare them by price, and to plan your shopping accordingly!

The app than can scrape the sale pages of the grocery stores (only for ICA, Hemköp, Coop and Willys), display all the items of the stores you have liked (you can filtered by category & search for an atricle), and you are able to add them to your shopping list. The app supports authentication through google which persists your liked stores and your shopping list, the data each user has scraped stays public on firestore. We have the basic UI structure in place for the app.


File structure:
```
src/
  components/
    Scroll.jsx

  presenters/
    CartPresenter.jsx
    articlesPresenter.jsx
    FilterPresenter.jsx
    HeaderPresenter.jsx
    loginPagePresenter.jsx
    LikedStoresPresenter.jsx

  views/
    StorearticlesView.jsx
    ShoppingCartView.jsx
    FilterView.jsx
    HeaderView.jsx
    LikedStoresView.jsx
    loginView.jsx
    StoreSearchResultsView.jsx

  AppModel.js
  constData.js
  fetchingEntry.js
  firebaseConfig.js
  firestoreModel.js
  index.css
  index.jsx
  mobxReactiveModel.js
  root.jsx
  tailwind.config.js
  utilities.js
```

The root of the soruce file consists of our model, the api functions (scrapingBee and Gemini), the reactive model setup, the root of the app, and some utility functions and constant data. The app is divided into a few differnt presenters, each one responsible for one or a couple different views. 
