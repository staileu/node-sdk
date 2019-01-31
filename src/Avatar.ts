import Axios from "axios";

export default class Avatar {
    private url: string = "";

    constructor(userId: string)
    {
        this.url = "https://api-v2.stail.eu/avatar/" + userId
    }

    public getUrl(): string
    {
        return this.url
    }

    public async getBase64Uri(): Promise<string>
    {
        return new Promise<string>((resolve) => {
            Axios.get(this.url, {
                responseType: 'arraybuffer' 
            }).then(response => {
                let u8 = new Uint8Array(response.data)
                let b64encoded = btoa([].reduce.call(
                    new Uint8Array(response.data),
                    (p,c) => {
                        return p + String.fromCharCode(c)
                    }, ''))
                let mimetype = "image/jpeg"
                resolve("data:" + mimetype + ";base64,"+ b64encoded)
            })
        })
    }
}