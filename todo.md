# TODO
- [ ] Design the article boxes

- [ ] Do something with the model.ready thing

- [X] Make each erticale have and id (maybe firebase auto id?) for array rendering

- [ ] Scrape the correct name for each store that includes ÅÄÖ, (maybe a logo as well)

- [ ] The app starts scraping as soon as you add the store to your list and show suspense
    - [X] some async work, spam protection, show loading
    - [ ] make sure there is no double scraping or interrupt 

- [ ] Search function for the items

- [X] Send the new store info to GPT after scraping
    - [X] Set up the api
    - [X] Query for categories and keyworks for all articles

- [ ] User data (maybe only selected stores and keep scraped info public to save credits)
    - [ ] Google authentication
    - [ ] To let all users update the scraped data, use cloudflare worker to run scraping safely on backend
    - [ ] Also use cloudflare worker for LLM calls

- [ ] Category selection and sorting

- [ ] Add the appropriate navigation

- [ ] Think about how we want the final app to look
    - [ ] Intuitive first use
    - [ ] Not too much at the screen
    - [ ] decent mobile experience?