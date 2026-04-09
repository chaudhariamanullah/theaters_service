import type { Request, Response } from "express";
import theaterService from "../service/service.theatres.js";
import { addTheaterSchema } from "../schemas/theaters/inputTheatre.schema.js";
import { editTheaterSchema } from "../schemas/theaters/editTheatre.schema.js";
import { ZodError } from "zod";

const theaterController = {

    async findOne(req:Request,res:Response){
        try{

            const theater_public_id = req.params.theater_public_id;

            if(!theater_public_id){
                return res.status(400).json({message:"Missing theater Id"})
            }

            const theater = await theaterService.findOne(theater_public_id);
            return res.status(200).json(theater);

        } catch(err){
            return res.status(500).json({error:err});
        }
    },

    async findAllByCity(req:Request,res:Response){
        try{
            
            const city = req.query.city as string;
            
            if(!city)
                return res.status(400).json({message:"Missing Parans"});

            const theaters = await theaterService.findAllByCity(city);
            return res.status(200).json(theaters);
        } catch(err){
            return res.status(500).json({error:err})
        }
    },

    async findAll(req:Request,res:Response){
        try{

            const limit = Number(req.query.limit);
            const offset = Number(req.query.offset);

            if (isNaN(limit) || isNaN(offset)) {
                return res.status(400).json({ message: "Invalid params" });
            }

            const theaters = await theaterService.findAll(limit,offset);
            return res.status(200).json(theaters);
        }catch(err){
            console.log(err)
            return res.status(500).json({error:err})
        }
    },

    async add(req:Request,res:Response){
        try{
            const theater = addTheaterSchema.parse(req.body);

            if(!req.file)
                return res.status(400).json({message:"Theater Image Missing"});

            await theaterService.add(theater,req.file);
            return res.status(201).json({message:"theater Added"});
        } catch(err){
            if ( err instanceof ZodError){
                return res.status(400).json({error:err});
            }
            return res.status(500).json({error:err})
        }
    },

    async edit(req:Request,res:Response){
        try{
            const theater = editTheaterSchema.parse(req.body);
            const theater_public_id = req.params.theater_public_id;

            if(!theater_public_id){
                return res.status(400).json({message:"No Theater Found"})
            }


            await theaterService.edit(theater,theater_public_id,req.file);
            return res.status(200).json({message:"theater Updated"});
        } catch(err){
            console.log(err);
            if ( err instanceof ZodError){
                return res.status(400).json({error:err});
            }
            return res.status(500).json({error:err})
        }
    }, 

    async remove(req:Request,res:Response){
        try{
            const theater_public_id = req.params.theater_public_id;

            if(!theater_public_id){
                return res.status(400).json({message:"theater Id Is Required"});
            }
            await theaterService.remove(theater_public_id);
            return res.status(200).json({message:`theater ${theater_public_id} Deleted`});
        } catch(err){
             return res.status(500).json({error:err})
        }
    }
}

export default theaterController;