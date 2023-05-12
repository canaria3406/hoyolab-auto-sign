/** 進入hoyolab簽到頁面，按F12進入console，貼上以下程式碼後執行即可取得token **/
/** https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481 **/

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
let token = 'ltoken=' + getCookie('ltoken') + '; ltuid=' + getCookie('ltuid') + ';'
let ask = confirm(token + '\n\n按下確定，並將取得的token貼至Google Apps Script專案當中');
if (ask == true) {
  copy(token);
  msg = token;
} else {
  msg = 'Cancel';
}