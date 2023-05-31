import Client from "../Client";
import { ClientEvents } from "discord.js";

interface Run {
    ( client: Client, ...args: Array<any> )
}

export interface Event {
    name: keyof ClientEvents;
    exe: Run
}
