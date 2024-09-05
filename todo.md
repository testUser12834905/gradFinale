# TODO

## Backend

- Have some sort of authentication
- Use probably express
- WS:
  - Figure out how to use current ws implementation with it, OR
  - Migrate to and express WS solution
- Endpoints:
  - login -> should serve a refresh token
  - refresh -> should provide a new access token
- Protect the WS endpoint
- Have a DB layer set up for the websocket
- Make a docker container out of this?

## Frontend

### Screens

- Login
- Chat

### Features

- authentication
  - store refresh and access token (cookie or local storage?)
  - if access token is expired user should get a new refresh token automatically
