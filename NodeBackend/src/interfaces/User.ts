import { RowDataPacket } from "mysql2"

export default interface User extends RowDataPacket  {
    username?: string,
    age?: number,
    idnodeUser?: number,
    password?: string
}