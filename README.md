#  [WIP] STAIL.EU Accouts node-sdk

(this library is not yet fully available for production usage, come back soon)

Use this library to integrate STAIL.EU Accounts in your Node.js back-end application.

## Installation

`npm install --save staileu`

## Usage

```js
let StaileuClient = require('staileu')
let client = new StaileuClient('MY_APP_ID', 'MY_APP_SECRET')

// get the authorize url and redirect the url on it. we will ask for "read profile" and "read email" permission
client.getAuthorizeUrl('https://example.org', [client.scope.readProfile, client.scope.readEmail])

```
