<h1 align="center">
    <img width="150" height="150" src="pic/logo.svg" alt=""><br>
    Hoyolab-Auto-SignIn
</h1>

<p align="center">
    <img src="https://img.shields.io/github/license/canaria3406/hoyolab-auto-sign?style=flat-square">
    <img src="https://img.shields.io/github/stars/canaria3406/hoyolab-auto-sign?style=flat-square">
    <br><a href="/README_zh-tw.md">繁體中文</a>　<b>English</b>　<a href="/README_ru-ru.md">Русский</a>
</p>

A lightweight, secure, and free script designed to automatically collect HoYoLAB daily check-in rewards. This script supports multiple accounts for Genshin Impact, Honkai Impact 3rd, and Honkai: Star Rail.

## Features

- **Lightweight:** Minimal configuration required, approximately 110 lines of code.
- **Secure:** Can be self-deployed to Google Apps Script, ensuring data privacy.
- **Free:** Utilizes Google Apps Script, a free service.
- **Simple:** Operates without a browser and notifies users via Discord or Telegram.

## Getting Started

1. Navigate to [Google Apps Script](https://script.google.com/home/start) and create a new project with a custom name.
2. Choose the editor and paste the code from one of the following versions:
   - [Discord version](https://github.com/NatsumeAoii/hoyolab-auto-sign/blob/main/src/main-discord.gs)
   - [Telegram version](https://github.com/NatsumeAoii/hoyolab-auto-sign/blob/main/src/main-telegram.gs)
   - [Experimental version](https://github.com/NatsumeAoii/hoyolab-auto-sign/blob/main/src/main-discord-telegram.gs)
3. Follow the instructions to configure the config file and save it.

4. Select "main" and click the "Run" button. Grant the necessary permissions and confirm the configuration is correct.

   ![image](https://github.com/NatsumeAoii/hoyolab-auto-sign/blob/main/pic/E04.png)

5. Grant the necessary permissions and confirm that the configuration is correct (Execution started > completed).
6. Click the `Trigger` button on the left side / left tab and add a new trigger on `Add Trigger` button at bottom right.  
   Select the function to run: main  
   Select the event source: Time-driven  
   Select the type of time based trigger: Day timer  
   Select the time of day: recommended to choose any off-peak time between 09:00 to 15:00 or 09:00 AM to 03:00 PM.

## Notification Settings
   You can turn it into 'true' or 'false', its depends on your needs.
```javascript
  const notificationConfig = {
      discord: {
          notify: true,
          webhook: "XXXXXX"
      },
      telegram: {
          notify: true,
          botToken: "XXXXXX",
          chatID: "XXXXX"
      }
  };
```

## Token Acquisition

> [!IMPORTANT]
> HoYoLAB has updated their cookie policy to HttpOnly cookies. As a result, it is no longer possible to use the getToken.js code to read the cookies.  
> You must manually copy the cookie to obtain the `account_mid_v2`, `account_id_v2`, `ltoken_v2`, `ltmid_v2`, and `ltuid_v2`.

<details>
<summary><b>HoYoLAB Cookie Acquisition Instructions</b></summary>

To manually acquire your HoYoLAB cookies, follow these steps:

1. Visit [HoYoLAB](https://www.hoyolab.com/) and log into your account.
2. Navigate to your profile page.
3. Open developer tools by pressing F12 or Ctrl+Shift+I.
4. Switch to the "Network" tab.
5. Enable "Preserve Log" or "Persist Logs" to keep the network log upon navigation.
   
   ![image](https://github.com/NatsumeAoii/hoyolab-auto-sign/blob/main/pic/E05.png)
   
6. Refresh the page to capture network requests.
7. Look for the "getGameRecordCard" request with the "GET" method, which should contain your HoYoLAB UID.
   
   ![image](https://github.com/NatsumeAoii/hoyolab-auto-sign/blob/main/pic/E06.png)
   
8. Click on the request and go to the "Cookies" tab within the details pane.
9. Copy the values for `account_mid_v2`, `account_id_v2`, `ltoken_v2`, `ltmid_v2`, and `ltuid_v2`.

   ![image](https://github.com/NatsumeAoii/hoyolab-auto-sign/blob/main/pic/E07.png)

</details>

## Examples

<details>
<summary><b>Single Account with Discord Notification</b></summary>

  ```javascript
    const profiles = [{
        token: "account_mid_v2=XXXXX; account_id_v2=XXXXX; ltoken_v2=XXXXX; ltmid_v2=XXXXX; ltuid_v2=XXXXX;",
        genshin: true,
        honkai_star_rail: true,
        honkai_3: true,
        accountName: "Your Name"
    }];

    // Notification configuration, Turn the notify to 'true' or 'false' depends what your needs
    const notificationConfig = {
        discord: {
            notify: true,
            webhook: "XXXXXX"
        },
        telegram: {
            notify: false,
            botToken: "XXXXXX",
            chatID: "XXXXX"
        }
    };
  ```

  ![image](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/pic/E02.png)

</details>

<details>
<summary><b>Multiple Accounts with Telegram Notification</b></summary>

  ```javascript
    const profiles = [{
        token: "account_mid_v2=XXXXX; account_id_v2=XXXXX; ltoken_v2=XXXXX; ltmid_v2=XXXXX; ltuid_v2=XXXXX;",
        genshin: true,
        honkai_star_rail: true,
        honkai_3: true,
        accountName: "Your Name 1"
    },
    {
        token: "account_mid_v2=XXXXX; account_id_v2=XXXXX; ltoken_v2=XXXXX; ltmid_v2=XXXXX; ltuid_v2=XXXXX;",
        genshin: true,
        honkai_star_rail: true,
        honkai_3: true,
        accountName: "Your Name 2"
    }];

    // Notification configuration, Turn the notify to 'true' or 'false' depends what your needs
    const notificationConfig = {
        discord: {
            notify: false,
            webhook: "XXXXXX"
        },
        telegram: {
            notify: true,
            botToken: "XXXXXX",
            chatID: "XXXXX"
        }
    };
  ```

  ![image](https://github.com/canaria3406/hoyolab-auto-sign/blob/main/pic/E03.png)

</details>

## Updates

- **2022-12-30:** Project launched.
- **2023-04-27:** Added support for Honkai Impact 3rd, and Honkai: Star Rail.
- **2023-05-12:** Updated token acquisition process and added Telegram notification support.
- **2024-02-02:** Improved readability and maintainability. Added an experimental version with both Discord and Telegram notifications.
- **2024-03-09:** Improved overall logic and notification config

## Other Documentation
- [Contributing](/CONTRIBUTING.md)
- [Changelog](/CHANGELOG.md)
