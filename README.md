<div align="center">

# Wishlist

A simple, local-first place to keep track of the things you want.

![Expo SDK 54](https://img.shields.io/badge/Expo-54-000020?logo=expo&logoColor=white)
![React Native 0.81](https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react&logoColor=111827)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS%20%7C%20Web-6B7280)

</div>

Wishlist is a minimalist Expo app for saving products and ideas without creating an
account. Add the useful details, set a priority, and move an item to **Done** when the
wish comes true. Wishes and preferences stay on the device.

## Features

- Create, edit, and delete wishes.
- Save a title, price, product link, notes, image, and low/medium/high priority.
- Open product links in the browser and get warned when the same link is already saved.
- Mark wishes as complete, then restore or permanently delete them from the **Done** tab.
- Choose between USD, RUB, AMD, and EUR display symbols.
- Switch between light, dark, and system themes.
- Keep wishes, currency, and theme preferences in local storage.
- Run the same project on Android, iOS, and the web.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 24.18.0, as pinned in `.nvmrc`.
  [Expo SDK 54](https://docs.expo.dev/versions/v54.0.0/) requires Node.js 20.19.x
  or newer.
- [pnpm](https://pnpm.io/installation) 11.
- For native emulators: Android Studio for Android, or macOS with Xcode for iOS.

### Install and run

```bash
git clone https://github.com/DavidBalishyan/wishlist.git
cd wishlist

nvm install
nvm use

corepack enable
corepack prepare pnpm@11.13.0 --activate

pnpm install --frozen-lockfile
pnpm start
```

The Expo terminal UI will display a QR code and platform shortcuts. Press `a` for
Android, `i` for iOS, or `w` for the web.

If the development device cannot reach the local server over Wi-Fi, start Expo through
a tunnel:

```bash
pnpm dev
```

If nvm is not installed yet, the included bootstrap script can install it and Node.js:

```bash
bash ./setup-nvm.sh
```

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm start` | Start the Expo development server |
| `pnpm dev` | Start Expo using a tunnel connection |
| `pnpm android` | Start Expo and open the Android target |
| `pnpm ios` | Start Expo and open the iOS target |
| `pnpm web` | Start Expo and open the web app |
| `pnpm lint` | Run the Expo ESLint configuration |
| `pnpm exec tsc --noEmit` | Type-check the project without emitting files |

## Tech stack

- Expo SDK 54 and Expo Router 6
- React 19 and React Native 0.81
- TypeScript 5.9
- NativeWind 4 and Tailwind CSS
- AsyncStorage for local persistence
- React Native Reanimated for animation
- Expo Image Picker, Web Browser, and Checkbox

## Local data and current scope

There is no backend, login, analytics service, or cloud sync. Wishlist data is stored
locally with AsyncStorage, which is persistent but unencrypted. Clearing the app's data
or the browser's site storage will remove saved wishes and preferences.

Currency selection changes the displayed symbol; it does not convert prices. Selected
images are stored as local URI references and are currently previewed in the wish editor
rather than displayed on wishlist cards.
