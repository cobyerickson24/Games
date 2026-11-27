# Pips

A five-dice scoring game (Yahtzee-style) with real 3D physics dice, built as a single-page web app that installs on a phone like a native app.

**Play it:** https://cobyerickson24.github.io/pips/

## Features

- **3D physics dice.** Dice tumble and settle in a wooden tray with a physics engine (three.js + cannon.js); tap a die to move it to the hold shelf.
- **Play a friend online, phone to phone.** One player shares an invite link; the phones connect directly over WebRTC (PeerJS is used only to find each other). Both phones keep a copy of the game, send a heartbeat, and reconnect automatically if either one closes the app or drops off Wi-Fi.
- **Computer opponent** that weighs each scoring box against its expected value.
- **Solo and pass-and-play** for up to 4 players on one device.
- **Installable and offline.** Add it to the home screen on iPhone or Android; a service worker loads the newest version when online and the saved copy when offline. Games in progress survive closing the app.
- **Stats** for high scores, averages, Yahtzees and record against the computer.

## Rules in brief

Thirteen rounds, up to three throws a turn. Hold any dice between throws, then score the result in one empty box.

- **Upper section:** Ones through Sixes score the sum of that number. 63 or more earns a +35 bonus.
- **Lower section:** 3 and 4 of a kind (sum of all dice), Full house 25, Small straight 30, Large straight 40, Yahtzee 50, Chance (any sum).
- **Extra Yahtzees** score +100 each once the Yahtzee box holds 50, and act as a joker.

## How it's built

Everything is in one file, [`index.html`](index.html): plain HTML, CSS and JavaScript with no build step. Libraries load from a CDN: three.js for rendering, cannon.js for physics, and PeerJS for online play. [`sw.js`](sw.js) is the service worker and [`manifest.webmanifest`](manifest.webmanifest) makes it installable.

To run it locally, serve the folder with any static server (for example `python3 -m http.server`) and open `http://localhost:8000`.
