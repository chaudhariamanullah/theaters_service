import type { Request, Response} from "express";
import { ZodError } from "zod";
import { addScreenSchema } from "../schemas/screens/addScreen.schema.js";
import { editScreenSchema } from "../schemas/screens/editScreen.schema.js";
import theaterScreenService from "../service/service.screen.js";

const theaterScreenController = {
    async findOne(req:Request, res:Response){
        try{
            const theater_screen_public_id = req.params.theater_screen_public_id;
            const theater_public_id = req.params.theater_public_id;

            if ( !theater_screen_public_id || !theater_public_id){
                return res.status(400).json({message:"theater Or Screen Id Missing"});
            }

            const screen = await theaterScreenService.findOne(theater_public_id,theater_screen_public_id);
            return res.status(200).json(screen);

        }catch(err){
            return res.status(500).json({error:err});
        }
    },

    async findAll(req:Request, res:Response){
        try{
            const theater_public_id = req.params.theater_public_id;

            if (!theater_public_id){
                return res.status(400).json({message:"theater Or Screen Id Missing"});
            }

            const screens = await theaterScreenService.findAll(theater_public_id);
            return res.status(200).json(screens);

        }catch(err){
            return res.status(500).json({error:err});
        }
    },

    async add(req:Request, res:Response){
        try{
            const screen = addScreenSchema.parse(req.body);
            const theater_public_id = req.params.theater_public_id;

            if (!theater_public_id){
                return res.status(400).json({message:"theater Id Not Found"});
            }
            await theaterScreenService.add(screen,theater_public_id);

            return res.status(201).json({message:"theater Screen Added"});
        }catch(err){
            if ( err instanceof ZodError){
                return res.status(400).json({error:err});
            }

            return res.status(500).json({error:err});
        }
    },

    async edit(req:Request, res:Response){
        try{
            const screenValues = editScreenSchema.parse(req.body);
            const theater_public_id = req.params.theater_public_id;

            if(!theater_public_id){
                return res.status(400).json({message:"No theater Id Found"});
            }

            await theaterScreenService.edit(screenValues,theater_public_id);
            return res.status(201).json({message:"theater Screen Edited"});
            
        }catch(err){
             if ( err instanceof ZodError){
                return res.status(400).json({error:err});
            }

            return res.status(500).json({error:err});
        }
    },

    async remove(req:Request, res:Response){
        try{
            const theater_screen_public_id = req.params.theater_screen_public_id;
            const theater_public_id = req.params.theater_public_id;

            if ( !theater_screen_public_id || !theater_public_id){
                return res.status(400).json({message:"theater Or Screen Id Missing"});
            }

            await theaterScreenService.remove(theater_public_id,theater_screen_public_id);
            return res.status(200).json({message:`${theater_screen_public_id} Deleted`});
        }catch(err){
            return res.status(500).json({error:err});
        }
    }
}

export default theaterScreenController;