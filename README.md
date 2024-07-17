# Job Application Management Tool (JAMT)

## Description
The Job Application Management Tool (JAMT) is designed to help developers efficiently manage their job applications and interview schedules. With JAMT, you can keep track of all the companies you’ve applied to, monitor the status of each application, and set reminders for upcoming interview dates. This tool aims to streamline the job application process, ensuring you never miss an important date and stay organized throughout your job search journey.

Note: This project is still under development. Some features may not be fully implemented or may change over time.



## Table of Contents
- [Installation](#installation)
- [Dependencies](#dependencies)
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
        
### Frontend Setup
1. Navigate to `frontend/jamt-app`
    ```bash
    cd frontend/jamt-app
    ```
2. Install Dependencies
    ```bash
    npm install
    ```
## Dependencies
+ Backend
    + [express](https://www.npmjs.com/package/express): `^4.19.2`
    + [cors](https://www.npmjs.com/package/cors): `^2.8.5`
    + [dotenv](https://www.npmjs.com/package/dotenv): `^16.4.5`
    + [mongoose](https://www.npmjs.com/package/mongoose): `^8.4.0`
    + [nodemon](https://www.npmjs.com/package/nodemon): `^3.1.0`
    + [winston](https://www.npmjs.com/package/winston): `^3.13.0`
    + [bcryptjs](https://www.npmjs.com/package/bcryptjs): `^2.4.3`
    + [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): `^9.0.2`
+ Frontend
    + [react](https://www.npmjs.com/package/react): `^18.2.0`
    + [react-dom](https://www.npmjs.com/package/react-dom): `^18.2.0`
    + [react-router-dom](https://www.npmjs.com/package/react-router-dom): `^6.23.1`
    + [axios](https://www.npmjs.com/package/axios): `^1.7.2`
    + [jwt-decode](https://www.npmjs.com/package/jwt-decode): `^4.0.0`
    + [fontawesome](https://fontawesome.com/): `^6.5.2`
 
## Usage
How to run and use the application

Note: It is important to have two terminals open one for the backend and one for the frontend
    
### Running the Backend
1. Navigate to the backend
    ```bash
    cd JAMT/backend
    ```
    
2. Start the server:
    ```bash
    npm run dev
    ```
    
3. The server should now be running on the default port `4723` or the port that you had specified within the `.env` file.

### Running the Frontend
1. Navigate to the frontend
    ```bash
    cd JAMT/frontend/jamt-app
    ```
    
2. IMPORTANT! if you changed the PORT within the `.env` file make sure to naviate to the `JAMT/frontend/jamt-app/api/api.js` file
   and change the server port to the port corespending to the `.env`
   ```javascript
   const API_URL = 'http://localhost:.env PORT';
   ```

3. Start the server:
    ```bash
    npm run dev
    ```
### API Client

Creating user:
`POST` `http://localhost:4723/users/`
```json
{
  "email": "johndoe1@doe.com",
  "firstname": "John",
  "lastname": "Doe",
  "password": "johndoe123"
}
```

Creating Application for user:
`POST` `http://localhost:4723/application/user._id`
```json
{
  "company": 
  "position": 
  "location": 
  "prereqs": ["python, java, c++, etc"],
  "contacted": 
}
```

## License
This project is licensed under the ISC License - see the LICENSE file for details.

## Contributing
This project is currently not accepting any contributions.

## Contact
`kevinjackson7590@gmail.com`
