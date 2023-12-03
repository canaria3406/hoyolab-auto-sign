/**
 * This function retrieves the token from the hoyolab check-in page.
 * To use this function, open the hoyolab check-in page, press F12 to enter the console, paste the code, and run it.
 * Visit: https://www.hoyolab.com/circles
 * 
 * Update on 2023-12-01:
 * hoyolab uses HttpOnly Cookie, which can no longer be obtained through document.cookie.
 * This script is invalid, please use the method of manually copying the cookie to obtain the token.
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

let ask = confirm(token + '\n\nPress enter, then paste the token into your Google Apps Script Project');

let msg = ask ? token : 'Cancel';
