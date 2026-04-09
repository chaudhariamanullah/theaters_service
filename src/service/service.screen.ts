
import type { addtheaterScreenInput } from "../schemas/screens/addScreen.schema.js";
import type { edittheaterScreenInput } from "../schemas/screens/editScreen.schema.js";
import theaterScreenModel from "../model/model.screen.js";
import { v4 as uuidv4 } from "uuid";

const theaterScreenService = {
    async findOne(theater_public_id:string, theater_screen_public_id:string){
        return await theaterScreenModel.fetchOne(theater_public_id,theater_screen_public_id);
    },

    async findAll(theater_public_id:string){
        return await theaterScreenModel.fetchAll(theater_public_id);
    },

    async add(screen:addtheaterScreenInput,theater_public_id:string){
        const screen_public_id = uuidv4();
        const screenDetails = {
            screen_public_id,
            ...screen
        }
        return await theaterScreenModel.insert(screenDetails,theater_public_id);
    },

    async edit(screen:edittheaterScreenInput,theater_public_id:string){
        return await theaterScreenModel.update(screen,theater_public_id);
    },

    async remove(theater_public_id:string, theater_screen_public_id:string){
        return await theaterScreenModel.delete(theater_public_id,theater_screen_public_id);
    },
}

export default theaterScreenService;