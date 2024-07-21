
<style>
  body {
    margin: 0;
    padding: 0;
  }

  .background-image {
    background-image: url('resource/CryptoSheildLogo.png');
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top center;
  }

  .content-box {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 10px;
    border-radius: 5px;
    opacity: 0.7;
  }
</style>

<div class="background-image"></div>

# CryptoShield

## Table of Contents

- [Introduction](#introduction)
- [File Structure](#file-structure)
- [Tech Stack UML](#tech-stack)
- [Installation](#installation)
- [License](#license)
- [Team](#team)
- [Contributing](#contributing)

## Introduction

CryptoShield is a project aimed at providing robust infometrics for cryptocurrency transactions. This README provides an overview of the project, including the file structure, tech stack UML diagram, and team roles.

## File Structure

<div class="content-box">

```plaintext
CryptoShield/
├── client/
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── ...
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── ...
├── resource/
│   ├── CryptoSheildLogo.png
│   ├── IMG_3495.jpg
│   └── ...
├── .gitignore
├── README.md
└── package.json
```
</div>

<br>

## Tech Stack UML
<div class="content-box">

```plaintext
+-------------------+
|    CryptoShield   |
+--------+----------+
         |
         +-> Frontend
         |    |
         |    +-> React Components
         |    +-> State Management
         |    +-> UI/UX
         |
         +-> Backend
         |    |
         |    +-> Express Server
         |    +-> PostgreSQL Database Models
         |    +-> API Endpoints
         |
         +-> Data Visualization
         |    |
         |    +-> Plotly.js Charts and Graphs
         |    +-> Real-time Data
         |
         +-> DevOps
              |
              +-> CI/CD Pipeline
              +-> Deployment
              +-> Monitoring
```
</div>


## Installation

#### Requirements
- Node.js (version 14.x or higher)
- npm (version 6.x or higher)

### **Follow these steps to set up CryptoShield locally:**
#### 1. Clone the repository

<div class="content-box">

```bash
mkdir CryptoShield
cd CryptoShield
git clone https://github.com/BlippyFish/CryptoShield.git
```
</div>

#### 2. Install Dependencies

<div class="content-box">

```bash
npm install
```
</div>

#### 3. Run
<div class="content-box">

```bash
# start the server
npm start
```
</div>

#### 4. Open (http://localhost:3000) to view the page

## License 
This project is licensed under the MIT license. See the [LICENSE](LICENSE.md) file to learn more.

## Team

## Team

**Follow us on `GitHub`:**
<div style="opacity: 0.7; background-color: #d3d3d3; padding: 15px; border-radius: 5px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19);">
  <p><strong style="color: #36454F;">Front End Developers:</strong> <span style="font-size: 1.2em; color: #0073e6;"><a href="https://github.com/alazaraklilu" style="color: #0073e6;">Alazar Aklilu</a>, <a href="https://github.com/MZiegler96" style="color: #0073e6;">Micah Ziegler</a></span></p>
  <p><strong style="color: #36454F;">Back End Developers:</strong> <span style="font-size: 1.2em; color: #0073e6;"><a href="https://github.com/austinbfraser" style="color: #0073e6;">Austin Fraser</a>, <a href="https://github.com/JulieHoaglandSorensen" style="color: #0073e6;">Julie Hoagland-Sorensen</a></span></p>
  <p><strong style="color: #36454F;">Data Visualizations and DevOps Engineer:</strong> <span style="font-size: 1.2em; color: #0073e6;"><a href="https://github.com/winjolu" style="color: #0073e6;">Winston Ludlam</a></span></p>
</div>



## Contributing
We welcome contributions to CryptoShield! If you have an idea or a bug fix, or if you are just dipping your toes into open source development for the first time, we want to hear from you.

1. Fork the repository.
2. Create a new branch **`git checkout -b feature-branch`**
3. Make your changes and commit them **`git commit -m 'Cool thing you did'`**
4. Push to your branch **`git push origin feature-branch`**
5. Create a new Pull Request

Please make sure to update tests appropriately. For major changes, please open an issue first tp discuss what ypou would like to change.

**THANK YOU for supporting Free Open Source Software!** 