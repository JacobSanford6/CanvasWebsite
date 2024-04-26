import mysql from 'mysql2'
import { QueryError, QueryResult, FieldPacket, RowDataPacket } from 'mysql2'
import User from '../interfaces/User';
import dbPassword from './dbSecrets.json'
import { randomInt } from 'crypto';
import { Prepare } from 'mysql2/typings/mysql/lib/protocol/sequences/Prepare';
import { Query } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';
import { resourceUsage } from 'process';
import { addCookieForUser } from './cookieRepo';



export async function getUserFromCredentials(username: string, password: string): Promise<User | null> {
    const promise: Promise<User | null> = new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: "mysql-158ed1ed-plieax.a.aivencloud.com",
            user: "avnadmin",
            password: dbPassword.dbPassword,
            port: 27481,
            database: "theworks"
        });

        let user: User = null;
    
        try{
            con.query<User[]>(
                "select idnodeUser, username, password, age from nodeUser where username= ? and password= ? limit 1",
                [username, password],
                (_err, result: User[]) => {
                    if (result.length > 0){
                        user = result[0];
                        let newCookie: string = result[0].username + " " + randomInt(0, 9999999999).toString() +randomInt(1000000000, 9999999999).toString() + randomInt(1000000000, 9999999999).toString() + randomInt(1000000000, 9999999999).toString();
                        
                        addCookieForUser(user.idnodeUser, newCookie).then(res =>{
                            result[0].cookie = newCookie
                            resolve(result[0]);
                        })
                        .catch(e =>{
                            reject(e);
                        })

                    }else{
                        resolve(null);
                    }
                    
                }
            );
        }catch(err){
            reject("Database error in loginRepo getUserFromCredentials");
        }
        con.end();
    });

    return promise;
}

