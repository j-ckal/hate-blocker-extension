# hate-blocker-extension
Developed as part of dissertation project, an extension that integrates with a server to limit exposure to hateful content online. 

Requires [hate-blocker-server](https://github.com/j-ckal/hate-blocker-server/) running in order to process elements

## Setup Instructions
1. Configure and run the Flask server, using the `README` included with [hate-blocker-server](https://github.com/j-ckal/hate-blocker-server/)
2. In Google Chrome, open the extension manager by naviating to `chrome://extensions/`
3. In the top right, enable Developer mode
4. After the developer menu pops up, select Load unpacked, navigating to the folder containing this `README` file
5. The extension should now be installed and accessible via the jigsaw icon in the top right of the browser. The extension can be activated by clicking the icon and navigating to `old.reddit.com`