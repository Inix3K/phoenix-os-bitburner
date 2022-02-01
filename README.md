# PhoenixOS is an extensible, modular Bitburner starter kit for developers of all skill levels.

## Key functionalities:
- **Shared libraries (lib.*.so.js)** - slightly-opinionated data structuring. A concerted effort is always made to eliminate required imports in .so.js files, meaning they can be directly imported into your project to create a superstructure of callable objects.
- **Logic engine** - An extensible logic engine via the logic.*.js files allows you to dictate what strategies the engine should pursue at any time. Leveraging a weighted priority queue system, the HackStrategy engine can determine the most effective hacking strategies given your current abilities, resources, and goals. Likewise, the MoneyStrategy engine determines the most effective investment of your non-hacking resources.
- **Support for all major APIs** - Logic engines can be modified by having access to sourcefile4 (logic.singularity.js), crimes and corps (logic.crime.js, logic.corps.js), sleeves (logic.sleeve.js), and other end-game resources. In addition, the Coding Challenge engine automatically solves coding challenges. *No coding challenge solutions are provided. Write your own solutions; we'll make sure they work with automated tests and submit them on your behalf.*
- **NoSQL-like database** - The IndexedDB integration allows you to fetch, store, and query data about the game without requiring the convoluted and messy process of disk I/O.
- **Well-documented and feature-complete** - Clear TypeScript definitions for all major functions, classes, and objects allow you to work in strongly-typed code, which is better, because I said so.
- **Barebones starter script** - For the RAM-challenged, tucson.js is the _provably fastest_ strategy to progression. For best results on a brand new game, run tucson.js, wait until the script completes (at which point it will launch phoenix.js), but instead of continuing, do a soft reset. After Tucson, your RAM will be sizeable enough to handle all primary functions of PhoenixOS.

## Installation
- Clone this repo and use the Bitburner VSCode extension to add the cloned repository to your game. This is the preferred method of installation, as it allows you to selectively merge future updates in case our update conflicts with your custom modifications.
- Alternatively, copy and paste __install.js to your Bitburner terminal and run __install.js.

## Key areas for user customization
- strategy.*.js files, which execute hacking strategies
- logic.*.js files, which  control the logic engine
- home.*.js files, which is a reserved namespace for your modifications

## Troubleshooting
- Run usr.fixcommonbugs.js - the most common bugs are caused by scp failing to copy files to a remote terminal.
- Add a file called var.debug.txt to your home directory. Type anything into it, so it's not empty. Save it. This will enable debug mode.
- Increase the amount of reserved home ram in lib.server.so.js
- Kill all scripts via the Options menu. Unhandled promises floating around can cause the script to stall, crash, lag, etc; this will give you a fresh slate.