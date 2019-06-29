import Axios, { AxiosError, AxiosResponse } from 'axios'
import UserInterface from './Interfaces/UserInterface'
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

    private apiEndpoint = 'https://api-v2.stail.eu';

    private userEndpoint = 'https://user.stail.eu';

    private oauthAccessToken = "";

    private oAuthUser: UserInterface = {
        id: '',
        username: '',
        email: null,
        firstName: null,
        lastName: null,
        birthday: null,
        avatar: null
    };

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

    public setApiEndpoint(apiEndpoint: string): Client {
        this.apiEndpoint = apiEndpoint;
        return this;
    }

    public setUserEndpoint(userEndpoint: string): Client {
        this.userEndpoint = userEndpoint
        return this;
    }

    public getApiEndpoint(): string {
        return this.apiEndpoint;
    }

    public getUserEndpoint(): string {
        return this.userEndpoint;
    }

    /**
     * Get the STAIL.EU authorize url to redirect the user on.
     */
    public getAuthorizeUrl(redirectUri: String, scope: String[] = [this.scope.readProfile]): string {
        return (
            this.userEndpoint +
            '/authorize?client_id=' + this.appId +
            '&scope=' + scope.join('%20') +
            '&redirect_uri=' + redirectUri
        )
    }

    /**
     * Verify the OAuth redirection code and get the oauth access token in the same time
     */
    public async verify(authCode: String): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            Axios.post(this.apiEndpoint + '/oauth/token', {
                client_secret: this.appSecret,
                code: authCode
            }).then((response: AxiosResponse) => {
                this.oauthAccessToken = response.data.data.auth.token;
                resolve(true)
            }).catch(error => {
                // if (error.response != undefined) {
                //     console.log(error.response.status);
                //     console.log(error.response.data)
                // }
                reject(error)
            })
        })
    }

    public async fetchOAuthUser(): Promise<UserInterface> {
        return new Promise<UserInterface>((resolve, reject) => {
            Axios.get(this.apiEndpoint + '/user/self', {
                headers: {
                    'Authorization': 'Bearer ' + this.oauthAccessToken
                }
            }).then(response => {
                this.oAuthUser = {
                    id: response.data.data.user.id,
                    username: response.data.data.user.username,
                    email: response.data.data.user.email,
                    firstName: response.data.data.user.first_name,
                    lastName: response.data.data.user.last_name,
                    birthday: response.data.data.user.birthday,
                    avatar: new Avatar(response.data.data.user.id, this.apiEndpoint)
                };
                resolve(this.oAuthUser)
            }).catch((error: AxiosError) => {
                // if (error.response != undefined) {
                //     console.log(error.response.status);
                //     console.log(error.response.data)
                // }
                reject(error)
            })
        })
    }

    public getOAuthUser(): UserInterface {
        return this.oAuthUser
    }
}
