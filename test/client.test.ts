import Client from '../src/Client'
import Index from '../src/index'

let config = {
    id: process.env.APP_ID === undefined ? '' : process.env.APP_ID,
    secret: process.env.APP_SECRET === undefined ? '' : process.env.APP_SECRET,
    oAuthCode: process.env.OAUTH_CODE === undefined ? '' : process.env.OAUTH_CODE,
    redirectUri: 'https://example.org/authorize'
};

function getClient() {
    return new Client(config.id, config.secret);
}

describe('package', () => {
    it('should return the client', () => {
        expect(Index).toBe(Client)
    })
});

describe('client', () => {
    let client = getClient()
    it('should configure user and api endpoint', () => {
        expect(client.getApiEndpoint()).toBe("https://api-v2.stail.eu")
        expect(client.getUserEndpoint()).toBe("https://user.stail.eu")
        expect(client.setApiEndpoint('https://api.example.org')).toBeInstanceOf(Client)
        expect(client.setUserEndpoint('https://user.example.org')).toBeInstanceOf(Client)
        expect(client.setApiEndpoint('http://localhost:8000')).toBeInstanceOf(Client)
        expect(client.setUserEndpoint('http://localhost:8000')).toBeInstanceOf(Client)
        client.setApiEndpoint('https://api-v2.stail.eu')
        client.setUserEndpoint('https://user.stail.eu')
    });
    it('should return app id and app secret', () => {
        expect(client.getAppId()).toBe(config.id);
        expect(client.getAppSecret()).toBe(config.secret)
    });
    if (config.oAuthCode === '') {
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
            console.log("authorize url received:", authorizeUrl)
        });
    } else {
        it('should verify the oauth code', () => {
            let code = config.oAuthCode;
            return client.verify(code).then(isValid => {
                expect(isValid).toBeTruthy();
            })
        });
        it('should fetch the user and return it', () => {
            return client.fetchOAuthUser().then(user => {
                expect(user).toBeDefined();
                console.log("user received: ", user);
                expect(user.id).toBeDefined()
                expect(user.username).toBeDefined()
                if (user.avatar !== null) {
                    console.log(user.avatar.getUrl())
                }
            })
        });
        it('should fetch the avatar and return base64', () => {
            let user = client.getOAuthUser();
            if (user.avatar !== null) {
                return user.avatar.getBase64(true).then(base64DataUri => {
                    expect(base64DataUri).toBeDefined();
                    console.log(base64DataUri)
                })
            }
        })
    }
});
