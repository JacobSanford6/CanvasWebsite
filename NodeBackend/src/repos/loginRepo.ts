import mysql from 'mysql2'
import { QueryError, QueryResult, FieldPacket } from 'mysql2'
import User from '../interfaces/User';
import dbPassword from './dbSecrets.json'



export function checkCredentials(username: string, password: string) {
    let con: mysql.Connection = mysql.createConnection({
        host: "mysql-158ed1ed-plieax.a.aivencloud.com",
        user: "avnadmin",
        password: dbPassword.dbPassword,
        port: 27481,
        database: "theworks"
    });

    con.connect(function (err) {
        const sql: string = `select idnodeUser, username, password, age from nodeUser where username='${username}' and password='${password}' limit 1`;

        con.query<User[]>(sql, (errR: QueryError, result) => {
            const user: User = result[0];

            console.log(user?.username)
            console.log(result)
            console.log(errR);
            con.end();
        })


    });




    //con.end()
}

