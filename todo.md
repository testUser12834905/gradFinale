# TODO

## Back-end

- Have some sort of authentication
  - password encryption & validation
  - token encryption & validation
  - EXTRAS:
    - token blacklisting
- Use probably express
- WS:
  - Figure out how to use current ws implementation with express
  - Migrate to an express WS solution
- Endpoints:
  - login -> should serve a refresh token
  - refresh -> should provide a new access token
- Protect the WS endpoint
- Have a DB layer set up for the websocket
- Make a docker container out of this?

## Front-end

### Screens

- Login
- Chat

### Features

- authentication
  - store refresh and access token (cookie or local storage?)
  - if access token is expired user should get a new refresh token automatically
