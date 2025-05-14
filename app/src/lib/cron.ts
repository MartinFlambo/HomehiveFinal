import { CronJob } from "cron";
import https from "https";

const job = new CronJob("*/14 * * * *", function(){
    const url = process.env.API_URL;
    if(!url){
        console.error("API_URL is not defined");
        return;
    }
    https.get(url, (res)=>{
        if(res.statusCode === 200)
            console.log ("Cron job executed successfully");
        else
            console.log ("Error executing cron job", res.statusCode);
    }).on("error", (err)=> console.error("Error while sending request", err));
})

export default job