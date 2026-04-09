import pool from "../config/db.js";
import type { AddScreen } from "../types/screens/addScreen.type.js";
import type { edittheaterScreenInput } from "../schemas/screens/editScreen.schema.js";
import type { RowDataPacket } from "mysql2";

const theaterScreenModel = {
    async fetchOne(theater_public_id:string, theater_screen_public_id:string){
        const sql = `SELECT * FROM theaters_screen WHERE theater_public_id = ? AND theater_screen_public_id = ?`;
        const [row] = await pool.execute<RowDataPacket[]>(sql,[theater_public_id,theater_screen_public_id]);
        return row[0] ?? null;
    },

    async fetchAll(theater_public_id:string){
        const sql = `SELECT * FROM theaters_screen WHERE theater_public_id = ?`;
        const [rows] = await pool.execute(sql,[theater_public_id]);
        return rows;
    },

    async insert(screenDetails:AddScreen,theater_public_id:string){
        const sql = `INSERT INTO theater_screen
                    (scree_public_id, theater_id, screen_number,screen_type, capacity)
                    SELECT 
                    ?, t.theater_id, ?, ?, ?
                    FROM theaters t
                    WHERE t.theater_public_id = ?`;

        return await pool.execute(sql, [
            screenDetails.screen_public_id,
            screenDetails.screen_number,
            screenDetails.screen_type,
            screenDetails.capacity,
            theater_public_id
        ]);
    },

    async update(screenDetails:edittheaterScreenInput,theater_public_id:string){
        const keys = Object.keys(screenDetails);
        const fields = keys.map( k=> `${k} = ?`).join(",");
        const values = keys.map(k => (screenDetails as any)[k]);

        const sql =`UPDATE theater_screen sc
                    JOIN theaters t ON t.theater_id = sc.theater_id
                    SET ${fields}
                    WHERE t.theater_public_id = ?;`

        return await pool.execute(sql,[...values,theater_public_id]);
    },

    async delete(theater_public_id:string, theater_screen_public_id:string){
        const sql = 'DELETE FROM theaters_screen WHERE theater_public_id = ? AND theater_screen_public_id = ?';
        return await pool.execute(sql,[theater_public_id,theater_screen_public_id])
    }
}

export default theaterScreenModel;