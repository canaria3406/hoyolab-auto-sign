/** 进入hoyolab签到页面，按F12进入console，粘贴以下程序代码后执行即可取得token **/
/** https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481 **/

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
let token = 'ltoken=' + getCookie('ltoken') + '; ltuid=' + getCookie('ltuid') + ';';
let ask = confirm(token + '\n\n按下确定，并将取得的token粘贴至Google Apps Script编辑器中');
if (ask == true) {
  copy(token);
  msg = token;
} else {
  msg = 'Cancel';
}
