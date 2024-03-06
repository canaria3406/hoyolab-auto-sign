<<<<<<< HEAD
// Function for logging
const log = (message) => {
    Logger.log(message);
};

// User profiles
const profiles = [{
    token: "account_mid_v2=XXXXX; account_id_v2=XXXXX; ltoken_v2=XXXXX; ltmid_v2=XXXXX; ltuid_v2=XXXXX;",
=======
/** ================================================================================================================================= **/
// User profiles and Discord settings
// You can change from 'true' or 'false' depends what you need
const profiles = [
  {
    token: "account_mid_v2=1l9XXXXXXXXXX; account_id_v2=28XXXXXXX; ltoken_v2=v2_CANARIAXXXXXXXXXXXXXXX; ltmid_v2=1lXXXXXXX_XX; ltuid_v2=28XXXXXX;",
>>>>>>> fa531ba76ed674b1b76abcbb1f1e08be34ab61c8
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

<<<<<<< HEAD
/** The above is the config. Please refer to the instructions on https://github.com/NatsumeAoii/hoyolab-auto-sign/ for configuration. **/
=======
/** The above is the config. Please refer to the instructions on https://github.com/canaria3406/hoyolab-auto-sign/ for configuration. **/
/** ================================================================================================================================= **/
>>>>>>> fa531ba76ed674b1b76abcbb1f1e08be34ab61c8
/** The following is the script code. Please DO NOT modify. **/

// URLs for different games
const urls = {
    genshin: 'https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us&act_id=e202102251931481',
    starRail: 'https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=en-us&act_id=e202303301540311',
    honkai3: 'https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us&act_id=e202110291205111'
};

<<<<<<< HEAD
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
=======
// Function to ping a user on Discord
const discordPing = (myDiscordID) => myDiscordID ? `<@${myDiscordID}> ` : '';

// Function to sign in for each user profile
const autoSignFunction = (profile, urlDict) => {
  Logger.log(`Starting autoSignFunction for ${profile.accountName}`);
  const urls = [];

  if (profile.genshin) urls.push(urlDict.Genshin);
  if (profile.honkai_star_rail) urls.push(urlDict.Star_Rail);
  if (profile.honkai_3) urls.push(urlDict.Honkai_3);

  // Initialize response variable
  let response = `Check-in success for ${profile.accountName}`;

  const options = {
    method: 'POST',
    headers: {
      Cookie: profile.token,
      'Accept': 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'x-rpc-app_version': '2.34.1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      'x-rpc-client_type': '4',
      'Referer': 'https://act.hoyolab.com/',
      'Origin': 'https://act.hoyolab.com'
    },
    muteHttpExceptions: true,
  };

  const httpResponses = UrlFetchApp.fetchAll(urls.map(url => ({ url, ...options })));

  for (const [i, hoyolabResponse] of httpResponses.entries()) {
    try {
      const responseJson = JSON.parse(hoyolabResponse);
      const checkInResult = responseJson.message;
      const gameName = Object.keys(urlDict).find(key => urlDict[key] === urls[i])?.replace(/_/g, ' ');
      const isError = checkInResult != "Success!";
      const bannedCheck = responseJson.data?.gt_result?.is_risk;

      if (bannedCheck) {
        response += `\n${gameName}: ${discordPing(myDiscordID)} Auto check-in failed due to CAPTCHA blocking.`;
      } else {
        response += `\n${gameName}: ${isError ? discordPing(myDiscordID) : ""}${checkInResult}`;
      }
    } catch (error) {
      Logger.log(`Error parsing response for ${gameName}: ${error}`);
>>>>>>> fa531ba76ed674b1b76abcbb1f1e08be34ab61c8
    }
};

// Function to notify Discord
const notify = async (message) => {
    if (notificationConfig.discord.notify && notificationConfig.discord.webhook) {
        const discordPayload = JSON.stringify({ 'username': 'Hoyolab-AutoCheck-In', 'avatar_url': 'https://i.imgur.com/LI1D4hP.png', 'content': message });
        const discordOptions = { method: 'POST', contentType: 'application/json', payload: discordPayload, muteHttpExceptions: true };

<<<<<<< HEAD
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
=======
// Function to send a message to Discord
const postWebhook = (data, discordWebhook) => {
  Logger.log('Starting postWebhook function');
  let payload = JSON.stringify({
    'username': 'Hoyolab-AutoSign-in',
    'avatar_url': 'https://i.imgur.com/LI1D4hP.png',
    'content': data
  });

  const options = {
    method: 'POST',
    contentType: 'application/json',
    payload: payload,
    muteHttpExceptions: true
  };

  UrlFetchApp.fetch(discordWebhook, options);
  Logger.log('Finished postWebhook function');
}

// Main function
const main = () => {
  Logger.log('Starting main function');
  
  const messages = profiles.map(profile => autoSignFunction(profile, urlDict));
  const hoyolabResp = messages.join('\n\n');

  if (discord_notify && discordWebhook) {
    Logger.log('Sending message to Discord');
    postWebhook(hoyolabResp, discordWebhook);
  }
  
  Logger.log('Finished main function');
}
>>>>>>> fa531ba76ed674b1b76abcbb1f1e08be34ab61c8
