#  [WIP] STAIL.EU Accouts node-sdk

(this library is not yet fully available for production usage, come back soon)

Use this library to integrate STAIL.EU Accounts in your Node.js back-end application.

## Installation

`npm install --save staileu`

## Usage

```js
let client = new require('staileu')('MY_APP_ID', 'MY_APP_SECRET')

// get the authorize url and redirect the url on it. we will ask for "read profile" and "read email" permission
client.getAuthorizeUrl('https://example.org', [client.scope.readProfile, client.scope.readEmail]) // return a string

// verify the oauth code
client.verify('XXX').then(() => {
  // the oauth is valid
}).catch(() => {
  // something went wrong
})

// fetch the user
client.fetchOAuthUser().then(user => {
  // access to the user interface
  console.log(user)
})

```
