import Avatar from './Avatar';

export default class User {
    public id: string;
    public username: string = "";
    public email: string = null;
    public birthday: string = null;
    public firstName: string = null;
    public lastName: string = null;
    public avatar: Avatar = null;
}