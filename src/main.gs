const token = "ltoken=gBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxCY; ltuid=26XXXXX20;"

const genshin = true
const honkai_star_rail = true
const honkai_3 = false

const discord_notify = true
const myDiscordID = ""
const myDiscordName = "使用者名稱"
const discordWebhook = "https://discord.com/api/webhooks/10xxxxxxxxxxxxxxx60/6aXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXnB"

/** 以上為設定檔，請參考 https://github.com/canaria3406/hoyolab-auto-sign 之說明進行設定**/
/** 以下為程式碼，請勿更動 **/

function main(){

  let hoyolabResp = autoSignFunction();

  if(discord_notify == true){

    let discordPostData = "";

    if(myDiscordID){
      discordPostData += "<@" + myDiscordID + ">, " +　hoyolabResp;
    }
    else{
      discordPostData += myDiscordName + ", " +　hoyolabResp;
    }

    if(discordWebhook){
      postWebhook(discordPostData);
    }

  }

}

function autoSignFunction() {

  const signurl_gs = "https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=zh-tw&act_id=e202102251931481"
  const signurl_hsr = "https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=zh-tw&act_id=e202303301540311"
  const signurl_bh3 = "https://sg-public-api.hoyolab.com/event/mani/sign?lang=zh-tw&act_id=e202110291205111"

  const header = {
    Cookie: token
  };

  const options = {
    method: 'POST',
    headers: header,
    muteHttpExceptions: true,
  };

  let response = "";

  if(genshin == true){
    let hoyolabResponse_gs = UrlFetchApp.fetch(signurl_gs,options);
    response += "\n" + JSON.parse(hoyolabResponse_gs).message;
  }

  if(honkai_star_rail == true){
    let hoyolabResponse_hsr = UrlFetchApp.fetch(signurl_hsr,options);
    response += "\n" + JSON.parse(hoyolabResponse_hsr).message;
  }

  if(honkai_3 == true){
    let hoyolabResponse_bh3 = UrlFetchApp.fetch(signurl_bh3,options);
    response += "\n" + JSON.parse(hoyolabResponse_bh3).message;
  }

  return response;
}

function postWebhook(data) {

  let payload = JSON.stringify({
    "username": "自動簽到",
    "avatar_url": "https://i.imgur.com/L7yYQN7.png",
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
