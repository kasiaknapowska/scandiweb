# Entry React developer test assignment (Scandiweb)

## Overview

The goal of this task was to create a shop website with a basic functionalities implemented exactly as-per-design provided by Scandiweb ([Figma project](https://www.figma.com/file/MSyCAqVy1UgNap0pvqH6H3/Junior-Frontend-Test-Designs-(Public)?node-id=150%3A747)). Products data had to be fetched from GraphQL endpoint.

The task have not required responsiveness, however basic RWD was implemented.

## Tech stack requirements

### Required
1. React [Create React App](https://github.com/facebook/create-react-app)
2. Class Components
3. Any GraphQL client
4. Less 3rd party libraries as possible

### Allowed
1. State management libraries (e.g. Redux)
2. Styled components, CSS preprocessors (e.g. SCSS)

### Prohibited
1. UI libraries (e.g. Tailwind, Material UI, Ant Design)
2. Functional components

## Functionalities required

- PLP - product listing page, a.k.a. category page
- PDP - product description page, a.k.a. product page
- Cart page + Cart overlay (minicart)

## Details

- Ability to add/remove products and change their amounts in cart - on the cart page itself, PLP and PDP should be provided.
- For products that have various options (attributes) - the options should be selected.
- The selected options of added to cart products should be visible in cart overlay and in cart page.
- If an attribute is a swatch attribute (type = swatch), a representation of the value should be rendered on PDP and PLP, rather than text description (e.g. the color itself, not "Blue" or "0000FF")
- Filtering products by category name for all of the categories from BE
- The descriptions provided in HTML format should be parsed and presented as HTML, not as plain text
- Ability to change the currency of the store to one of the available currencies

## Tech stack used

1. [Create React App](https://github.com/facebook/create-react-app)
2. [SCSS](https://sass-lang.com/)
3. [Apollo Client](https://www.apollographql.com/docs/react/)
4. [Redux toolkit](https://redux-toolkit.js.org/introduction/getting-started)
5. [createAsyncThunk Redux Toolkit](https://redux-toolkit.js.org/api/createAsyncThunk)
6. [React Router](https://reactrouter.com/en/main)
7. [HOC](https://legacy.reactjs.org/docs/higher-order-components)

## How to start app

### Endpoint
1. Fork and clone [junior-react-endpoint](https://github.com/scandiweb/junior-react-endpoint) provided by Scandiweb.
2. In the endpoint directory install dependencies - yarn install
3. Build the project - yarn build
4. Start the project - yarn start

### React App
1. Fork and clone this repository
2. In the project directory install dependencies - npm install
3. Run the app in development mode - npm start
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser