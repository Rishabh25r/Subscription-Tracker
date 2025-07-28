# Subscription-Tracker-API

A backend web application designed to help users track their subscriptions and receive automated reminder emails before upcoming renewal dates. This API makes it easy to stay informed about upcoming payments, so you can plan ahead or cancel a subscription before it renews.

The Subscription Tracker API provides:

=Automated scheduling of reminder emails for subscription renewals using Upstash Workflows.

-Rate-limiting, bot protection, and email validation using Arcjet.

-Secure JWT-based authentication for user accounts and subscription management.

-This backend helps you avoid missed payments, be aware of your upcoming charges, and gives you time to cancel subscriptions when needed.

____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


## Key Features:

👉 **Advanced Rate Limiting and Bot Protection**: with Arcjet that helps you secure the whole app.

👉 **Database Modeling**: Models and relationships using MongoDB & Mongoose.

👉 **JWT Authentication**: User CRUD operations and subscription management.

👉 **Global Error Handling**: Input validation and middleware integration.

👉 **Logging Mechanisms**: For better debugging and monitoring.

👉 **Email Reminders**: Automating smart email reminders with workflows using Upstash.

and many more, including code architecture and reusability

____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________

## Tech Stack:

🌐 Node.js / Express.js – Backend framework

🛢️ MongoDB / Mongoose – Database and ODM

🔐 JWT (JSON Web Token) – Authentication

🔄 Upstash – For serverless Redis, scheduling, and workflows

🛡️ Arcjet – Rate limiting, bot protection, email validation

✉︎ Nodemailer (or equivalent) – Sending reminder emails

____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________

## How Workflows Work:

The subscription reminder feature is powered by Upstash Workflows.

Workflow Steps:

### 1: Triggering the Workflow

Workflow starts whenever a user creates a new subscription.
The subscription id is passed to the workflow.
<br>
### 2: Retrieving Subscription Details

Workflow extracts the subscription ID from context.
Looks up the subscription in the database.
<br>

### 3: Validation Checks

If subscription does not exist → log error → terminate.
If subscription is inactive → log status → exit.
If subscription is active → verify the renewal date.
<br>
### 4: Renewal Date Evaluation

If renewal date has passed → log info → exit.
If renewal date is in the future → move to scheduling.
<br>
### 5: Reminder Scheduling

For each configured reminder (e.g., 7 days before, 1 day before):
Calculate reminder date.
Wait until the reminder date.
Send reminder email when the time arrives.
<br>
### 6: Completion

Workflow repeats for all reminders.
Once all reminders are sent, the workflow exits.
<br>
____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________

## Installation

### Clone the repository:
```
git clone https://github.com/your-username/subscription-tracker-api.git
cd subscription-tracker-api
```
### Environment Variables
Create a .env.development.local (or appropriate .env file) with the following keys:

```
PORT=5000
SERVER_URL=http://localhost:5000
NODE_ENV=development
DB_URI=mongodb+srv://<username>:<password>@cluster-url/dbname
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Arcjet keys
ARCJET_ENV=development
ARCJET_KEY=your_arcjet_key

# Upstash / QStash keys
QSTASH_URL=your_qstash_url
QSTASH_TOKEN=your_qstash_token

# Email credentials
EMAIL_PASSWORD=your_email_password
```
### Scripts

- Install dependencies:
```
npm install
```
- Start the development server:
```
npm start
```

____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________


## 🔗 API Routes

### After Installation – How to Use the API

After installing the packages and starting the server (npm start), open any HTTP client (e.g., Postman, Thunder Client, Insomnia, HTTPie, etc.) and use the following routes:

### -> Authentication Routes:
1. Register (Sign-up)
   
   POST `http://localhost:<port-number/api/v1/auth/sign-up` (replace <port-number> with your defined port numer)
```
    json:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

2. Login (Sign-in)
  
   POST  `http://localhost:<port-number/api/v1/auth/sign-up`
  ```
  json:
{
  "email": "john@example.com",
  "password": "123456"
}

```

### -> User Routes

Get a User by ID

GET `http://localhost:<port-number/api/v1/users/:id` 

   -Protected (requires Authorization: Bearer <token>
   -Replace id with User id
   -Returns details of a specific user.


### -> Subscription Routes

1. Create a Subscription
   POST  `http://localhost:<port-number/api/v1/subscriptions`

   ```
   json:
   {
    "name": "Netflix",
    "price": 500,
    "currency": "INR",
    "frequency": "monthly",
    "category": "entertainment",
    "paymentMethod": "UPI",
    "status": "active",
    "startDate": "2025-07-01T00:00:00.000Z",
    "renewalDate": "2025-08-01T00:00:00.000Z",
   }
   ```
2. Get Subscription for a User
   GET `http://localhost:<port-number/api/v1/subscriptions/user/:id`

  -Replace :id with the user’s ID.

  -Returns all subscriptions associated with that user.


