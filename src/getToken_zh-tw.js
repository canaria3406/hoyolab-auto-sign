/**
 * 在hoyolab簽到網頁使用此script以取得token。
 * 進入hoyolab簽到頁面，按F12進入console，貼上以下程式碼，執行即可。
 * 網址: https://www.hoyolab.com/circles
 * 
 * 2023-12-01 更新:
 * hoyolab 改用 HttpOnly Cookie，往後無法再透過 document.cookie 取得。
 * 本 script 失效，請改用手動複製 cookie 的方式取得 token。
 */

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

let token = 'Error';

if (document.cookie.includes('ltoken=')) {
  token = `ltoken=${getCookie('ltoken')}; ltuid=${getCookie('ltuid')};`;
} else if (document.cookie.includes('ltoken_v2=')) {
  token = `ltoken_v2=${getCookie('ltoken_v2')}; ltuid_v2=${getCookie('ltuid_v2')};`;
}

let ask = confirm(token + '\n\n按下確定，並將取得的token貼至Google Apps Script專案當中');

let msg = ask ? token : 'Cancel';
