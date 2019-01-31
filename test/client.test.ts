import Client from '../src/Client'

let config = {
    id: process.env.APP_ID === undefined ? '' : process.env.APP_ID,
    secret: process.env.APP_SECRET === undefined ? '' : process.env.APP_SECRET,
    redirectUri: 'https://example.org/authorize'
};

describe('client', () => {
    let client = new Client(config.id, config.secret);
    it('should return app id and app secret correctly', () => {
        expect(client.getAppId()).toBe(config.id);
        expect(client.getAppSecret()).toBe(config.secret)
    });
    it('should return login url', () => {
        let authorizeUrl = client.getAuthorizeUrl(config.redirectUri, [
            client.scope.readProfile,
            client.scope.readEmail
        ]);
        expect(authorizeUrl).toBeDefined();
        expect(authorizeUrl)
            .toBe(
                'https://user.stail.eu/authorize?client_id=' + config.id + '&scope=read-profile%20read-email&redirect_uri=' + config.redirectUri
            );
        console.log(authorizeUrl)
    })
});
