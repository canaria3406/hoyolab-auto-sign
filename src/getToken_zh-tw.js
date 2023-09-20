/** 進入hoyolab簽到頁面，按F12進入console，貼上以下程式碼後執行即可取得token **/
/** https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481 **/

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
let token = 'Error';
if (document.cookie.includes('ltoken=')) {
  token = `ltoken=${getCookie('ltoken')}; ltuid=${getCookie('ltuid')};`;
} else if (document.cookie.includes('ltoken_v2=')) {
  token = `account_mid_v2=${getCookie('account_mid_v2')}; account_id_v2=${getCookie('account_id_v2')}; ltoken_v2=${getCookie('ltoken_v2')}; ltmid_v2=${getCookie('ltmid_v2')}; ltuid_v2=${getCookie('ltuid_v2')};`;
}
let ask = confirm(token + '\n\n按下確定，並將取得的token貼至Google Apps Script專案當中');
if (ask) {
  copy(token);
  msg = token;
} else {
  msg = 'Cancel';
}