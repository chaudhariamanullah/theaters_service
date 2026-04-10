import pool from "../config/db.js";
import type { AddTheaterInput } from "../types/theaters/addTheatre.type.js";
import type { EditTheaterInput } from "../types/theaters/editTheatre.type.js";
import type { RowDataPacket } from "mysql2/promise";

const theaterModel = {

    async fetchOne(theater_public_id:string){
        const sql = "SELECT * FROM theaters WHERE theater_public_id = ?";
        const [row] = await pool.execute<RowDataPacket[]>(sql,[theater_public_id]);
        return row ?? null;
    },

    async FetchAll(limit:number,offset:number){

        const sql = `SELECT
                    theater_public_id,
                    theater_name,
                    theater_status 
                    FROM theaters
                    LIMIT ${limit} OFFSET ${offset}`;
                    
        const [rows] = await pool.execute<RowDataPacket[]>(sql);
        return rows;
    },

    async fetchAllByCity(city:string){
        const sql = `SELECT 
                     theater_public_id,theater_name,theater_image,theater_country,theater_address
                     FROM theaters WHERE 
                     theater_city = ?
                     AND theater_status = 1`;
                     
        const [rows] = await pool.execute(sql,[city]);
        return rows;
    },

    async insert(theaterDetails:AddTheaterInput){
        const sql = `INSERT INTO 
                     theaters(theater_public_id, theater_name, theater_image, theater_country, theater_city, theater_address, theater_status)
                     VALUES(?,?,?,?,?,?,?)`;    

        return await pool.execute(sql,[
            theaterDetails.theater_public_id,
            theaterDetails.theater_name,
            theaterDetails.theater_image,
            theaterDetails.theater_country,
            theaterDetails.theater_city,
            theaterDetails.theater_address,
            Number(theaterDetails.theater_status)
        ]);
    },

    async update(theater:EditTheaterInput,theater_public_id:string){
        const keys = Object.keys(theater);

        const fields = keys.map(k =>`${k} = ?`).join(",");
        const values = keys.map(k => (theater as any)[k]);

        const sql = `UPDATE theaters set ${fields} WHERE theater_public_id = ?`;
        return await pool.execute(sql,[...values,theater_public_id]);

    },

    async deletetheater(theater_public_id:string){
        const sql = "DELETE FROM theaters WHERE theater_public_id = ?";
        return await pool.execute(sql,[theater_public_id]);
    }
}

export default theaterModel;
