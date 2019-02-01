import Avatar from "../Avatar";

export default interface UserInterface {
    id: string,
    username: string,
    email: string|null,
    avatar: Avatar|null,
    firstName: string|null,
    lastName: string|null,
    birthday: string|null
}
