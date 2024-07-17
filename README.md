# Job Application Management Tool (JAMT)

## Description
The Job Application Management Tool (JAMT) is designed to help developers efficiently manage their job applications and interview schedules. With JAMT, you can keep track of all the companies you’ve applied to, monitor the status of each application, and set reminders for upcoming interview dates. This tool aims to streamline the job application process, ensuring you never miss an important date and stay organized throughout your job search journey.

Note: This project is still under development. Some features may not be fully implemented or may change over time.



## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation
Step-by-step instructions on how to get your project running.

### Prerequisites
+ [Node.js](https://nodejs.org/en) installed on your local machine.
+ npm (Node Package Manager) comes with [Node.js](https://nodejs.org/en)
+ [MongoDB](https://www.mongodb.com/) cluster (local or cloud-based)
+ API Client Testing Tool (Optional)
    + [Postman](https://www.postman.com/)
    + [Insomnia](https://insomnia.rest/)
    + [Thunder Client](https://www.thunderclient.com/) (VScode Extension)

### Initial Setup
Clone the repository
```bash
git clone https://github.com/KJJack/JAMT.git
```

### Backend Setup
1. Navigate to the backend
    ```bash
    cd JAMT/backend
    ```
    
2. Install dependencies
    ```bash
    npm install
    ```
    
3. MongoDB Cluster Setup
    + If you don't already have a MongoDB Cluster you can create one using [MongoDB](https://www.mongodb.com/products/platform/atlas-database)
    + Follow along with the instructions on how to setup your cluster and then get your connection string (e.g `mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority`)


4. Environment Variables
    + Create a .env file inside the src directory the file path should be `JAMT/backend/src`
    + Setup the .env
        ```env
        PORT=4723
        MONGODB=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
        NODE_ENV=development
        SECRET=`Input any string you would like to be the secret`
        ```
        
5. Run the Backend
    ```bash
    npm run dev
    ```
