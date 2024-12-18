# README.md

## Setup Instructions
### Installation Steps

1. **Open Visual Studio Code**:
   - Launch Visual Studio Code and open the project directory.

2. **Install Dependencies**:
   - Open the terminal in Visual Studio Code (shortcut: ``Ctrl + ` `` on Windows/Linux or ``Cmd + ` `` on macOS).
   - Run the following command to install all necessary dependencies:
     ```bash
     npm install
     ```

3. **Run the Application**:
   - Once the dependencies are installed, execute the following command to start the application:
     ```bash
     node index.js
     ```

## API Endpoints

### 1. **Signup**
- **Endpoint**: `/api/signup`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "name": "Your Name",
    "email": "your.email@example.com",
    "password": "your_password"
  }
  ```
- **Response**:
  - Success: Returns a success message and user details.
  - Error: Returns an error message if signup fails.

### 2. **Login**
- **Endpoint**: `/api/login`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "email": "your.email@example.com",
    "password": "your_password"
  }
  ```
- **Response**:
  - Success: Returns a token for authentication.
  - Error: Returns an error message if login fails.

### 3. **Logout**
- **Endpoint**: `/api/logout`
- **Method**: POST
- **Request Body**: None
- **Response**:
  - Success: Logs the user out and invalidates the token.

### 4. **Refresh Token**
- **Endpoint**: `/api/refreshToken`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "accessToken": "your_access_token"
  }
  ```
