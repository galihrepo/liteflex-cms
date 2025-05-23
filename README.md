# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## TLDR
```
   # npx create-expo-app lite-flex-cms
   # cd lite-flex-cms
   # nvm use 20.18.3
   # npm run start
```

## EAS
```
   - enable hermes in app.json or app.config.js
   {
      "expo": {
         "jsEngine": "hermes"
      }
   }
   
   # yarn global add eas-cli
   # eas login -> register no account then register https://expo.dev/signup.
   # eas build --platform android
   # eas build --platform ios
```

## Firebase App Hosting (Test Local)
```
   # npm install -g firebase-tools
   # firebase login
   # firebase init
   
   Then select the following:
   - Hosting (use spacebar to select, then enter)
   - Choose "Use an existing project"
   - Select your Firebase project from the list
   - For "public directory", enter: web-build
   - Configure as a single-page app? → Yes
   - Set up automatic builds and deploys with GitHub? → No (we’ll do this manually with GitHub Actions)
   - Overwrite index.html? → No

   # npx expo export --platform web --output-dir web-public
   # firebase serve
```

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
