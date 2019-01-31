import axios, { AxiosResponse } from 'axios'
import UserInterface from './Interfaces/UserInterface'
import User from './User';
import Avatar from './Avatar';

export default class Client {
    private readonly appId: String = '';

    private readonly appSecret: String = '';

    public readonly scope = {
        readProfile: 'read-profile',
        readEmail: 'read-email',
        readBirthday: 'read-birthday',
        readRealName: 'read-real-name'
    };

    private readonly apiEndpoint = 'https://api-v2.stail.eu';

    private readonly userEndpoint = 'https://user.stail.eu';

    private oauthAccessToken = "";

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

    public async verify(authCode: String): Promise<boolean>
    {
        return new Promise<boolean>((resolve, reject) => {
            axios.post(this.apiEndpoint + '/oauth/token', {client_secret: this.appSecret, code: authCode}).then((response: AxiosResponse) => {
                this.oauthAccessToken = response.data.auth.token
                resolve(true)
            }).catch(error => {
                reject(error)
            })
        })
    }

    public async fetchOAuthUser(): Promise<User>
    {
        this.oauthAccessToken
        return new Promise<User>((resolve, reject) => {
            axios.get(this.apiEndpoint + '/user/self', {
                headers: {
                    'Authorization': 'Bearer ' + this.oauthAccessToken
                }
            }).then(response => {
                let user = new User();
                user.id = response.data.user.id
                user.username = response.data.user.username
                user.email = response.data.user.email
                user.firstName = response.data.user.firstName
                user.lastName = response.data.user.lastName
                user.birthday = response.data.user.birthday
                user.avatar = new Avatar(user.id)
                
                resolve(user)
            })
        })
    }
}
