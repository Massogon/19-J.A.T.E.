# Just Another Text Editor (J.A.T.E.)

## Description

**Just Another Text Editor** is a simple and intuitive progressive web application (PWA) that allows developers to create and save notes or code snippets both online and offline. This app is designed as a single-page application that meets the PWA criteria, ensuring data persistence across browser sessions using IndexedDB, and offers offline functionality with service workers.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

To install and run this application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <https://github.com/Massogon/19-J.A.T.E.>
   ```
2. Navigate to the project directory:
   ```bash
   cd client
   ```

3. Install dependencies for both the client and server:
   ```bash
   npm install
   ```

4. Build the application:
   ```bash
   npm run build
   ```

5. Start the development server:
   ```bash
   npm start
   ```

This will start the server on `http://localhost:3000/`.

## Usage

Once the app is loaded, you can begin typing text or code in the editor. The text editor automatically saves your work to IndexedDB and localStorage. You can close and reopen the app, and your previous work will be loaded.

You can also install the app as a Progressive Web App (PWA) by clicking the "Install!" button at the top of the page, allowing you to use it offline.

## Features

- **PWA Compatibility**: Installable and works offline.
- **IndexedDB Integration**: Stores user data in the browser for persistence across sessions.
- **Service Worker**: Implements caching for offline access.
- **Monokai-Themed Text Editor**: Features line numbering, syntax highlighting for JavaScript, and code indentation using CodeMirror.
- **Automatic Save**: Content is automatically saved to the database as you type.

## Deployment

This app is deployed using **Render** and can be accessed at the following URL:

[Deployed Application](https://one9-j-a-t-e-1.onrender.com)

### GitHub Repository

The source code is available on GitHub:

[GitHub Repository](<Your GitHub Repo URL>)

## Technologies Used

- **Node.js**
- **Express.js**
- **Webpack** (for bundling)
- **Workbox** (for service worker generation and caching)
- **IndexedDB** (using `idb` library for local database management)
- **CodeMirror** (for the text editor)
- **HTML5 & CSS3**
- **JavaScript (ES6)**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! To contribute to this project:

1. Fork the repository
2. Create a new feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## Questions

For questions or support, feel free to reach out via:

- GitHub: [Massogon](https://github.com/Massogon)