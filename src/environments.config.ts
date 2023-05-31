import * as dotenv from "dotenv";

dotenv.config({ path: "./src/.env", debug: true });

export default {
    GUILD_ID: process.env.GUILD_ID,
    CLIENT_ID: process.env.CLIENT_ID,
    MODE: process.env.MODE,
    TOKEN: process.env.TOKEN,
}
