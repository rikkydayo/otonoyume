import { createClient } from "microcms-js-sdk"; 

export const client = createClient ({
    serviceDomain:'9l39mwdgok',
    apiKey:process.env.API_KEY,
});