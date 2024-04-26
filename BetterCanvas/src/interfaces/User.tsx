export default interface User {
    success?: boolean,
    user: {
        username?: string,
        age?: number,
        idnodeUser?: number,
        password?: string,
        cookie?: string
    }
}