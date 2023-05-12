const profiles = [
  { token: "ltoken=gBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxCY; ltuid=26XXXXX20;", genshin: true, honkai_star_rail: true, honkai_3: false, accountName: "YOUR NICKNAME" }
  // For each profile, copy the above code onto a new line, separating profiles with a comma at the end of each line except for the last one.
  // Each profile should have a different token, which is obtained in the same way but the browser must be logged into the desired Hoyolab account for the check-in.
];

const discord_notify = true

const discordWebhook = "https://discord.com/api/webhooks/10xxxxxxxxxxxxxxx60/6aXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXnB";
const myDiscordID = "";

/** The above is the config. Please refer to the instructions on https://github.com/canaria3406/hoyolab-auto-sign for configuration. **/
/** The following is the script code. Please DO NOT modify. **/

// Dictionary-like object that makes it easy to change the URLs if necessary.
const urlDict = {
  Genshin: "https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us&act_id=e202102251931481",
  Star_Rail: "https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=en-us&act_id=e202303301540311",
  Honkai_3: "https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us&act_id=e202110291205111"
}

function main() {

  // Add discord ping to start of hoyolabResp if desired, otherwise initializes hoyolabResp to empty string.
  let hoyolabResp = discordPing();

  // Loop through each profile and perform the auto sign-in.
  profiles.forEach(profile => {
    hoyolabResp += autoSignFunction(profile) + "\n\n";
  });

  if(discord_notify == true) {
    if(discordWebhook) {
      postWebhook(hoyolabResp);
    }
  }

}

function discordPing() {
  if(discord_notify && myDiscordID) {
    return `<@${myDiscordID}>\n`;
  } else {
    return "";
  }
}

function autoSignFunction({ token, genshin, honkai_star_rail, honkai_3, accountName }) {

  const urls = [];

  // Dynamically generate the URLs to check-in based on the profile configuration instead of having repeated if statement later.
  if (genshin) urls.push(urlDict.Genshin);
  if (honkai_star_rail) urls.push(urlDict.Star_Rail);
  if (honkai_3) urls.push(urlDict.Honkai_3);

  const header = {
    Cookie: token
  };

  const options = {
    method: 'POST',
    headers: header,
    muteHttpExceptions: true,
  };

  let response = `Check-in completed for ${accountName}`;

  // Loop through all the URLs in URLs array to check-in to all desired games.
  urls.forEach(url => {
    let hoyolabResponse_gs = UrlFetchApp.fetch(url,options);
    const serverResponse = JSON.parse(hoyolabResponse_gs).message;

  // Determine the game name based on the URL of the check-in request, replacing underscores with spaces.
  const gameName = Object.keys(urlDict).find(key => urlDict[key] === url)?.replace(/_/g, " ");

  // Determine the result of the check-in based on the server response.
  const checkInResult = serverResponse === "OK" // If the server response is 'OK'
    ? "Success!" // Then the check-in was successful
    : serverResponse; // Otherwise, the check-in failed with the error message in the server response.

    response += `\n${gameName}: ${checkInResult}`;
  });

  return response;
}

function postWebhook(data) {

  let payload = JSON.stringify({
    "username": "auto-sign",
    "avatar_url": "https://i.imgur.com/LI1D4hP.png",
    "content": data
  });

  const options = {
    method: 'POST',
    contentType: 'application/json',
    payload: payload,
    muteHttpExceptions: true,
  };

  UrlFetchApp.fetch(discordWebhook, options);
}