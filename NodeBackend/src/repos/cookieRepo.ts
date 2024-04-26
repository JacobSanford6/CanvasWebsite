import mysql from 'mysql2'
import { QueryError, QueryResult, FieldPacket, RowDataPacket } from 'mysql2'
import User from '../interfaces/User';
import dbPassword from './dbSecrets.json'
import { randomInt } from 'crypto';
import { Prepare } from 'mysql2/typings/mysql/lib/protocol/sequences/Prepare';
import { Query } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';
import { resourceUsage } from 'process';



export async function addCookieForUser(userId: number, cookie: string): Promise<boolean> {
    const promise: Promise<boolean> = new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: "mysql-158ed1ed-plieax.a.aivencloud.com",
            user: "avnadmin",
            password: dbPassword.dbPassword,
            port: 27481,
            database: "theworks"
        });

        try{
            con.execute(
                "delete from nodeCookies where cookieValue = ?",
                [cookie],
                (_err) => {
                    if (_err?.errno){
                        reject("Database error in cookieRepo addCookieForUser: " + _err.message);
                    }
                }
            );

            con.execute(
                "insert into nodeCookies ( fkNodeUserId, cookieValue) values ( ? , ? )",
                [userId, cookie],
                (_err) =>{
                    if (!_err?.errno){
                        resolve(true);
                    }else{
                        reject("Database error in cookieRepo addCookieForUser: " + _err.message);
                    }
                }
            )
        }catch(err){
            reject("Database error in cookieRepo addCookieForUser: " + err)
        }
        con.end();
    });

    return promise;
}

export async function getUserFromCookie(cookie: string): Promise<User | null> {
    const promise = new Promise<User | null>((resolve, reject) => {
        const con = mysql.createConnection({
            host: "mysql-158ed1ed-plieax.a.aivencloud.com",
            user: "avnadmin",
            password: dbPassword.dbPassword,
            port: 27481,
            database: "theworks"
        });

        try{
            con.query<User[]>(
                "select * from nodeUser where idnodeUser = (select fkNodeUserId from nodeCookies where cookieValue = ?)",
                [cookie],
                (_err, result: User[]) => {
                    if (!_err?.errno){
                        result[0].cookie = cookie;
                        resolve(result[0]);
                    }else{
                        reject("Database error in cookieRepo getUserFromCookie: " + _err.message);
                    }
                }
            );
        }catch(err){
            reject("Database error in cookieRepo getUserFromCookie: " + err)
        }
        con.end
    });

    return promise;
}