import Client from "./Client";

new Client({
    allowedMentions: { 
        parse: ['users', 'roles'],
        repliedUser: true       
    },
    intents: 1415
}).init();
