// Function for logging
const log = (message) => {
    Logger.log(message);
};

// User profiles
const profiles = [{
    token: "account_mid_v2=XXXXX; account_id_v2=XXXXX; ltoken_v2=XXXXX; ltmid_v2=XXXXX; ltuid_v2=XXXXX;",
    genshin: true,
    honkai_star_rail: true,
    honkai_3: true,
    accountName: "Your Name"
}];

// Notification configuration, Turn the notify to 'true' or 'false' depends what your needs
const notificationConfig = {
    discord: {
        notify: true,
        webhook: "XXXXXX"
    }
};

/** The above is the config. Please refer to the instructions on https://github.com/NatsumeAoii/hoyolab-auto-sign/ for configuration. **/
/** The following is the script code. Please DO NOT modify. **/

// URLs for different games
const urls = {
    genshin: 'https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us&act_id=e202102251931481',
    starRail: 'https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=en-us&act_id=e202303301540311',
    honkai3: 'https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us&act_id=e202110291205111'
};

// Function to handle HTTP requests
const fetchUrls = async (urls, token) => {
    log(`Starting HTTP requests`);
    try {
        const responses = await Promise.all(urls.map(url => UrlFetchApp.fetch(url, { method: 'POST', headers: { Cookie: token }, muteHttpExceptions: true })));
        log(`HTTP requests completed`);
        return responses.map(response => {
            const content = response.getContentText();
            try {
                return JSON.parse(content).message;
            } catch (error) {
                log(`Error parsing response: ${error}`);
                return "Error parsing response";
            }
        });
    } catch (error) {
        log(`Error occurred during HTTP requests: ${error}`);
        return Array(urls.length).fill("Error occurred during HTTP request");
    }
};

// Function to notify Discord
const notify = async (message) => {
    if (notificationConfig.discord.notify && notificationConfig.discord.webhook) {
        const discordPayload = JSON.stringify({ 'username': 'Hoyolab-AutoCheck-In', 'avatar_url': 'https://i.imgur.com/LI1D4hP.png', 'content': message });
        const discordOptions = { method: 'POST', contentType: 'application/json', payload: discordPayload, muteHttpExceptions: true };

        try {
            await UrlFetchApp.fetch(notificationConfig.discord.webhook, discordOptions);
            log(`Discord notification sent`);
        } catch (error) {
            log(`Error sending message to Discord: ${error}`);
        }
    } else {
        log(`Discord notification not sent: Configuration missing or disabled`);
    }
};

// Main function
const main = async () => {
    const startTime = new Date().getTime();
    log(`Starting main function`);

    const results = [];
    for (const profile of profiles) {
        log(`Processing profile: ${profile.accountName}`);
        const urlsToCheck = [];
        const gameNames = [];

        if (profile.genshin) { urlsToCheck.push(urls.genshin); gameNames.push("Genshin Impact"); }
        if (profile.honkai_star_rail) { urlsToCheck.push(urls.starRail); gameNames.push("Honkai Star Rail"); }
        if (profile.honkai_3) { urlsToCheck.push(urls.honkai3); gameNames.push("Honkai Impact 3"); }

        const responses = await fetchUrls(urlsToCheck, profile.token);
        
        // Check each response and customize the message accordingly
        const profileResult = gameNames.map((name, index) => {
            if (responses[index] === "OK") {
                return `${name}: Check-in Success!`;
            } else if (responses[index].includes("already checked in today")  || responses[index].includes("already signed in")) {
                return `${name}: Already Check-in for today!`;
            } else if (responses[index].includes("Not logged in") || responses[index].includes("Please log in to take part in the event")) {
                return `${name}: There's some issue with the cookie!`;
            } else {
                return `${name}: Unknown response: ${responses[index]}`;
            }
        }).join("\n");
        
        results.push(`Check-in completed for : ${profile.accountName}\n${profileResult}`);
    }

    const message = results.join('\n\n');
    await notify(message);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000; // Convert milliseconds to seconds
    log(`Finished main function. Execution time: ${executionTime} seconds`);
};
