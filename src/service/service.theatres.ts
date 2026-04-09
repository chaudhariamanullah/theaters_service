import type { addTheaterInput } from "../schemas/theaters/inputTheatre.schema.js";
import type { editTheaterInput } from "../schemas/theaters/editTheatre.schema.js";
import { v4 as uuidv4 } from "uuid";
import theaterModel from "../model/model.theatres.js";
import { uploadTheaterPhoto } from "../config/uploadPhoto.js";

const theaterService = {
    async findOne(theater_public_id:string){
        return await theaterModel.fetchOne(theater_public_id);
    },

    async findAllByCity(city:string){
        return await theaterModel.fetchAllByCity(city);
    },

    async findAll(limit:number,offset:number){
        return await theaterModel.FetchAll(limit,offset)
    },

    async add(theater:addTheaterInput,file:Express.Multer.File){

        const theater_public_id = uuidv4();
        const theaterUrl = await uploadTheaterPhoto(file.buffer,"theaters");
        theater.theater_image = theaterUrl;
        
        const fulltheaterDetails = {
            theater_public_id,
            ...theater
        }

        return await theaterModel.insert(fulltheaterDetails);
    },

    async edit(theater:editTheaterInput,theater_public_id:string,file?:Express.Multer.File){

        if(!file)
            return await theaterModel.update(theater,theater_public_id);

        const theaterUrl = await uploadTheaterPhoto(file.buffer,"theaters");

        return await theaterModel.update({...theater,theater_image:theaterUrl},theater_public_id);
    },

    async remove(theater_public_id:string){
        return await theaterModel.deletetheater(theater_public_id);
    }
}

export default theaterService;