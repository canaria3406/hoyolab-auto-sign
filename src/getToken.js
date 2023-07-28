/** Enter the hoyolab check-in page, press F12 to enter the console, paste the following code and run it to get the token. **/
/** https://www.hoyolab.com/circles **/

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
let token = 'account_mid_v2=' + getCookie('account_mid_v2') + '; account_id_v2=' + getCookie('account_id_v2') + '; ltoken_v2=' + getCookie('ltoken_v2') + '; ltmid_v2=' + getCookie('ltmid_v2') + '; ltuid_v2=' + getCookie('ltuid_v2') + ';';
let ask = confirm(token + '\n\nPress enter, then paste the token into your Google Apps Script Project');
if (ask == true) {
  copy(token);
  msg = token;
} else {
  msg = 'Cancel';
}