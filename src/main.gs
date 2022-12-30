/** token 必填，請參考說明獲取token，並將token貼到"括號"內，請注意分號;也要貼到 **/
const token = "ltoken=gBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxCY; ltuid=26XXXXX20;"

/** discord ID 選填，請參考說明獲取discord ID，並將ID貼到"括號"內 **/
const myDiscordID = "22xxxxxxxxxxxxxx50"

/** discord webhook 選填，請參考說明建立webhook連結，並將連接貼到"括號"內 **/
const discordWebhook = "https://discord.com/api/webhooks/10xxxxxxxxxxxxxxx60/6aXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXnB"



function main(){

  let hoyolabResp = JSON.parse(autoSignFunction());
  let discordPostData;

  if(myDiscordID){
    discordPostData = "<@" + myDiscordID + ">, " +　hoyolabResp.message;
  }
  else{
    discordPostData = "未知使用者, " +　hoyolabResp.message;
  }

  if(discordWebhook){
    postWebhook(discordPostData);
  }

}

function autoSignFunction() {

  const signurl = "https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=zh-tw&act_id=e202102251931481"

  const header = {
    Cookie: token
  };

  const options = {
    method: 'POST',
    headers: header,
    muteHttpExceptions: true,
  };

  let hoyolabResponse = UrlFetchApp.fetch(signurl,options);

  return hoyolabResponse;
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
