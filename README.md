# Website front-end

Just a simple website (readme not complete)

## Tech Stack

- Node
- React
- MUI

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_API_URL` : the url of the api

## Run Locally

Clone the project and go to the project directory

```zsh
  git clone git@github.com:bde-polytech-montpellier/bde-website-front.git
```

Go to the project directory

```zsh
  cd bde-website-front
```

Install dependencies

```zsh
  npm install
```

Start the server (dev run)

```zsh
  npm run start-dev
```

## API Reference

To interact with the API, you can use this pattern for `Clubs, Partner, Events, Goodies` :
| Resource | Keyword | Description |
| :-------- | :------- | :------------------------- |
| `/api/entity` | `GET` | Fetch every entities |
| `/api/entity` | `POST` | Create a entity |
| `/api/entity/:id`| `GET` | Fetch a specific entity |
| `/api/entity/:id`| `PUT` | Update a entity |
| `/api/entity/:id`| `DELETE` | Delete a entity |

## Deployment

This project is hosted on polytech's dokku cluster. When a feature is complete, merge it with master and it'll soon be deployed

## Contributing

First, look at the WIP issues to check if what you are thinking about is not already in progress.

Otherwise, you should develop your feature on a new branch and then open a pull-request

## Roadmap

- Keep refactoring for better comprehension and readability
- Add UI tests (look for [Cypress](https://www.cypress.io/))
- Email confirmation & password recovery
