import Axios from "axios";

export default class Avatar {
    private readonly url: string = "";

    constructor(userId: string)
    {
        this.url = "https://api-v2.stail.eu/avatar/" + userId
    }

    public getUrl(size: string|null = null): string
    {
        return size === null ?
            this.url
        : size === 'small' ?
            this.url + '?size=small'
        : size === 'medium' ?
            this.url + '?size=medium'
        : size === 'large' ?
            this.url + '?size=large'
        : this.url
    }

    public async getBase64(withDataUri: boolean = true, size: string|null = null): Promise<string>
    {
        return new Promise<string>((resolve) => {
            Axios.get(this.getUrl(size), {
                responseType: 'arraybuffer'
            }).then(response => {
                let base64 = Buffer.from(response.data, 'binary').toString('base64');
                resolve(withDataUri ? 'data:image/jpeg;base64,' + base64 : base64)
            })
        })
    }
}
