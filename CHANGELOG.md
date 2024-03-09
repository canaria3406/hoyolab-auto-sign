# Changelog for Hoyolab-Auto-SignIn

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<details>
<summary><b>[1.1.0] - 2024-03-09</b></summary>

### Added
- New logic for handling daily check-ins more efficiently.
- Enhanced notification configuration options for both Discord and Telegram.
- Detailed instructions for manually copying cookies due to HoYoLAB's HttpOnly cookie policy change.

### Changed
- Updated the notification system to allow users to configure notifications more flexibly through Discord or Telegram.
- Revised token acquisition process to comply with HoYoLAB's updated rules for tokens on July 2023, switching from "ltoken" and "ltuid" to "ltoken_v2" and "ltuid_v2".

### Fixed
- Various bug fixes and performance improvements to ensure smoother operation and user experience.
</details>

<details>
<summary><b>[1.0.0] - 2024-02-02</b></summary>

### Added
- Support for multiple HoYoLAB accounts.
- Discord and Telegram notification in one code.
- Improved readability and maintainability.

### Changed
- Updated token acquisition process due to HoYoLAB's HttpOnly cookie policy.

### Fixed
- Minor bug fixes and performance improvements.
</details>

<details>
<summary><b>[0.1.0] - 2023-05-12</b></summary>

### Added
- Telegram notification support.
- Updated get token process.
</details>

<details>
<summary><b>[0.0.1] - 2022-12-30</b></summary>

### Added
- Project launched.
- Initial support for Genshin Impact, Honkai Impact 3rd, and Honkai: Star Rail.
</details>
