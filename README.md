## JONATHAN ROMERO APPLY DIGITAL TEST

This repo has the source code for the apply digital React Native challenge. I'll post each of the features present on the application that successfully complies with the requirements needed in the challenge.

In order to run this project, you need to have properly installed the environment for react native development, you can look it up a guide for your OS here:

https://reactnative.dev/docs/environment-setup

**Remember to have a emulator or physical device installed for your testing purposes**

This project uses React Native without a framework so keep that in mind in order to select the appropiate install guide.

Next, you need to clone this project using git.

```bash
git clone git@github.com:reigncl/jonathan-romero-rn-test.git
```

Aftwerwards you need to do a npm install

```bash
npm install
```

Finally you have several options to run the project, in order to run a dev environment, you can run

```bash
npm start
```

and choose the OS of your preference. For this project given that it was developed on a Windows Machine, We recommend sticking to Android only.

If you need to run some unit tests, it's configured to show the code coverage already so you should not have any issues whatsoever:

```bash
npm test
```

If you need to update the snapshots, please run this command

```bash
npm test -- -u
```

Finally, if you need a fully fledged debug apk you need to run these commands

Step 1: Go to the root of the project in the terminal and run the below commands:

```bash
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

Step 2: Go to android directory:

```bash
cd android
```

Step 3: Now in this android folder, run this command

```bash
./gradlew assembleDebug
```

There! you’ll find the apk file in the following path:
yourProject/android/app/build/outputs/apk/debug/app-debug.apk

Below you will find all the developed features along some screenshots:

# Core Functionality

**Data Fetching**: Upon startup and on pull-to-refresh, the app should fetch articles related to Android or iOS from the Hacker News Algolia API: https://hn.algolia.com/api/v1/search_by_date?query=mobile.

_Something to note is that in order to only fetch articles, decided to update the API to query for tags using only stories_

**Offline Access**: The app must display articles downloaded during the last session when offline.
![Alt text](https://i.ibb.co/zbVxhnp/Captura-de-pantalla-2024-08-27-033656.png)

**Article Viewing**: Articles should be listed in a scrollable view, sorted by date. Tapping an article opens it in an in-app web view.

![Alt text](https://i.ibb.co/vQNJvH7/Captura-de-pantalla-2024-08-27-033832.png)

**Delete Functionality**: Users can swipe to delete articles from the list. Deleted articles should not reappear upon data refresh.

![Alt text](https://i.ibb.co/d4pg76x/Captura-de-pantalla-2024-08-27-031635.png)
![Alt text](https://i.ibb.co/2Yc9RsP/Captura-de-pantalla-2024-08-27-031656.png)

**Enhanced Features**
**Favorites**: Users can mark articles as favorites. These should be accessible from a dedicated favorites screen.

![Alt text](https://i.ibb.co/YLjX0TG/Captura-de-pantalla-2024-08-27-031618.png)
![Alt text](https://i.ibb.co/2jwTp4f/Captura-de-pantalla-2024-08-27-031648.png)

**Deleted Articles View**: Include a screen to view articles that have been deleted.
![Alt text](https://i.ibb.co/2Yc9RsP/Captura-de-pantalla-2024-08-27-031656.png)

**Feature: Push Notifications for New Article**

**Push Notification Permission**: On the first launch, the app should request permission from the user to send push notifications.
![Alt text](https://i.ibb.co/7XGzrLH/Captura-de-pantalla-2024-08-27-032633.png)
![Alt text](https://i.ibb.co/fGCCq7M/Captura-de-pantalla-2024-08-27-032648.png)

**User Preferences**: Allow users to set preferences for the types of articles they are interested in receiving notifications about. For instance, users could choose to receive notifications only for articles related to "Android" or "iOS".

**Background Fetch**: Implement a background process that periodically checks the Algolia API for new articles that match the user's preferences. If new articles are found, a push notification is sent to the user's device.
![Alt text](https://i.ibb.co/tsv14BK/Captura-de-pantalla-2024-08-26-232820.png)
![Alt text](https://i.ibb.co/0nhn1Tp/Captura-de-pantalla-2024-08-25-022114.png)

**Notification Interaction**: When a user taps on a notification, the app should open and display the article mentioned in the notification.

**Privacy and User Experience Considerations**
Clearly communicate to the user why push notification permission is being requested and how it will enhance their experience.
Provide users with full control over their notification preferences, including an option to disable notifications entirely.
![Alt text](https://i.ibb.co/7XGzrLH/Captura-de-pantalla-2024-08-27-032633.png)
![Alt text](https://i.ibb.co/fMBYGnc/Captura-de-pantalla-2024-08-27-031723.png)
![Alt text](https://i.ibb.co/xzcL2BY/Captura-de-pantalla-2024-08-27-031710.png)

---

---

# Leaving the original react native cli readme.md for additional info

---

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

# React Native Technical Test

Welcome to the React Native Technical Test! This test is designed to assess your knowledge and skills in react native development.

The detailed instructions and requirements for this test are defined in the `CHALLENGE.md` file. Please read it carefully before you start.

Good luck!
