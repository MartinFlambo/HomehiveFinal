import { CronJob } from "cron";
import https from "https";

const job = new CronJob("*/13 * * * *", function(){
    const url = process.env.API_URL_PING;
    if(!url){
        console.error("API_URL is not defined");
        return;
    }
    https.get(url, (res)=>{
        console.log("Sending request to:", url);
        if(res.statusCode === 200)
            console.log ("Cron job executed successfully");
        else
            console.log ("Error executing cron job", res.statusCode);
    }).on("error", (err)=> console.error("Error while sending request", err));
})

export default job