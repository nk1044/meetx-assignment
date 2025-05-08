
# MeetX Assignment

MeetX is a Node.js-based RESTful API for managing users and activities. It provides secure authentication, activity creation and participation, and user profile management using modern web development technologies.

---

## Tech Stack

* **Node.js** – JavaScript runtime
* **Express.js** – Web framework
* **TypeScript** – Type safety
* **MongoDB** – NoSQL database
* **Mongoose** – MongoDB ORM
* **JWT** – Authentication tokens
* **Bcrypt** – Password hashing
* **Express Validator** – Input validation


---

##  Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/nk1044/meetx-assignment.git

cd meetx-assignment

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Create `.env` File

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/meetx
JWT_TOKEN_SECRET=your_jwt_secret_key
JWT_TOKEN_EXPIRATION=7d

```

> Replace `your_jwt_secret_key` with a secure secret key.

### 4. Run the Server

#### In development mode:

```bash
npm run dev

```


Server will run at: `http://localhost:8002`

---

## API Endpoints

### User Routes

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/v1/user/register` | Register a new user   |
| POST   | `/api/v1/user/login`    | Authenticate user     |
| POST   | `/api/v1/user/book-activity?id=activityID`    | Book new activity     |
| POST   | `/api/v1/user/get-booked-activities`    | Get all booked activities     |


### Activity Routes

| Method | Endpoint                  | Description           |
| ------ | ------------------------- | --------------------- |
| POST   | `/api/v1/activity/create-activity`           | Create new activity   |
| GET    | `/api/v1/activity/get-activities`           | Get all activities    |

---

##  Authentication

* JWT-based authentication
* Token is sent cookies or `Authorization: Bearer <token>` header
* Use middleware to protect private routes


