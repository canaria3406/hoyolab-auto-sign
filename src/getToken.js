/** Enter the hoyolab check-in page, press F12 to enter the console, paste the following code and run it to get the token. **/
/** https://www.hoyolab.com/circles **/

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
let token = 'ltoken=' + getCookie('ltoken') + '; ltuid=' + getCookie('ltuid') + ';';
let ask = confirm(token + '\n\nPress enter, then paste the token into your Google Apps Script Project');
if (ask == true) {
  copy(token);
  msg = token;
} else {
  msg = 'Cancel';
}