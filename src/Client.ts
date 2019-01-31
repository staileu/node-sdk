export default class Client {
    private readonly appId: String = '';

    private readonly appSecret: String = '';

    public readonly scope = {
        readProfile: 'read-profile',
        readEmail: 'read-email',
        readBirthday: 'read-birthday',
        readRealName: 'read-real-name'
    };

    // private readonly apiEndpoint = 'https://api-v2.stail.eu';

    private readonly userEndpoint = 'https://user.stail.eu';

    public constructor(appId: String, appSecret: String) {
        this.appId = appId;
        this.appSecret = appSecret;
    }

    public getAppId(): String {
        return this.appId
    }

    public getAppSecret(): String {
        return this.appSecret
    }

    /**
     * Get the STAIL.EU authorize url to redirect the user on.
     *
     * @param redirectUri
     * @param scope
     */
    public getAuthorizeUrl(redirectUri: String, scope: String[] = [this.scope.readProfile]): string {
        return this.userEndpoint + '/authorize?client_id=' + this.appId + '&scope=' + scope.join('%20') + '&redirect_uri=' + redirectUri
    }
}
