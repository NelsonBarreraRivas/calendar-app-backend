import express from "express";
import { Event } from "../models/Event.js";
import mongoose from "mongoose";

// INFO GET
const getEvents = async (req = express.request, res = express.response) => {

    const events =
        await Event
            .find({ user:  req.user.id})
            .populate('user', 'name email')

    res.json({
        ok: true,
        msg: 'getEventos',
        events
    })

}
// INFO = POST
const createEvent = async (req = express.request, res = express.response) => {

    const event = new Event(req.body)

    event.user = req.user._id

    try {

        await event.save()

        res.json({
            ok: true,
            event,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquese con el Administrador'
        })
    }

}

// INFO = PUT
const updateEvent = async (req = express.request, res = express.response) => {

    const eventId = req.params.id

    const isValid = mongoose.Types.ObjectId.isValid(eventId)

    if (!isValid) {
        
        return res.status(404).json({
            ok: false,
            msg: 'Algo salio mal, intentelo más tarde'        
        })
    }

    try {

        const event =
            await Event
                .findById(eventId)

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
            })
        }

        if (event.user.toString() !== req.user.id) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const newEvent = {
            ...req.body,
            user: req.user.id
        }

        const update = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })

        res.json({
            ok: true,
            event: update
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquese con el Administrador'
        })
    }
}

// INFO = DELETE
const deleteEvent = async (req = express.request, res = express.response) => {


    const eventId = req.params.id

    const isValid = mongoose.Types.ObjectId.isValid(eventId)

    if (!isValid) {
        
        return res.status(404).json({
            ok: false,
            msg: 'Algo salio mal, intentelo más tarde'
        })
    }

    try {

        const event =
            await Event
                .findById(eventId)

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
            })
        }

        if (event.user.toString() !== req.user.id) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para eliminar este evento'
            })
        }

        await Event.findByIdAndDelete( eventId )

        res.json({
            ok: true
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquese con el Administrador'
        })
    }

}



export {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}