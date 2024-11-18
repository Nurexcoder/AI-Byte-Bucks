

# E-Wallet for AI SaaS Platform

This project is an e-wallet system designed to convert AI projects into a Software as a Service (SaaS) model. The e-wallet allows users to purchase and utilize tokens for accessing AI services, helping to reduce costs when users exceed predefined usage limits. The project is built using a TurboRepo monorepo structure, with an Express and MongoDB backend, and a Next.js frontend.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Schema Structure](#schema-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Project Status](#project-status)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure user authentication to manage access to the wallet and services.
- **Token Management**: Users can purchase tokens to use AI services. The wallet tracks token usage and replenishment.
- **Purchase and Payment History**: Track all purchases and payments made by users for transparency and auditing.
- **Usage Limits**: Implement limits on the usage of AI services, triggering token purchases when limits are exceeded.
- **Responsive UI**: A user-friendly web interface built with Next.js for managing the wallet and accessing AI services.

## Tech Stack

- **Backend**: Express.js, MongoDB
- **Frontend**: Next.js, React.js
- **Monorepo Management**: TurboRepo

## Schema Structure

The following schema structure is implemented in the MongoDB database:

- **Users**: 
  - `id` ( Primary Key)
  - `name` (string)
  - `email` (string)
  - `password` (string)
  - `wallet_id` ( Foreign Key)
  - `user_type` (string)

- **Wallet**: 
  - `id` ( Primary Key)
  - `purchase_ids` (array of int, Foreign Key)
  - `tokens` (int, default: 30)
  - `payment_ids` (array of int, Foreign Key)

- **Purchases**: 
  - `id` ( Primary Key)
  - `token_purchased` (int)
  - `total_amount` (int)
  - `purchases_date` (date)

- **Payment**: 
  - `id` ( Primary Key)
  - `app_name` (string)
  - `service_used` (string)
  - `tokens_used` (int)
  - `payment_date` (string)

## Installation

### Prerequisites

- Node.js
- MongoDB
- TurboRepo

### Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Nurexcoder/AI-Byte-Bucks
    ```

2. **Install dependencies**:
    ```bash
    cd your-repo
    npm install
    ```

3. **Setup environment variables**:
    - Create a `.env` file in the root of your project.
    - Use the `.env.example` provided to set up your environment variables.

4. **Run the development server**:
    ```bash
    npm run dev
    ```

## Usage

1. **Sign up/Login**: Users need to sign up or log in to access their wallet.
2. **Manage Tokens**: Users can purchase tokens to use AI services.
3. **Monitor Usage**: Users can monitor their token usage and view their purchase/payment history.
4. **AI Services**: Use tokens to access AI services. If the usage exceeds the set limits, additional tokens will be required.

## Environment Variables

The project uses environment variables to manage sensitive information and configuration. Below is an example of the `.env.example` file:

```bash
# Database Configuration
DATABASE_URL="postgres://your_postgres_connection_string"

# Redis Configuration
REDIS_URL="your_redis_url"
REDIS_PASSWORD="your_redis_password"
REDIS_PORT=6379

# Email Configuration
HOST_EMAIL="your_email@example.com"
HOST_PASS="your_email_password"

# MongoDB Configuration
MONGO_URI="your_mongo_uri"

# JWT Secret
JWT_SECRET="your_jwt_secret"

# Miscellaneous
SALT_ROUNDS="your_salt_rounds"
```

## Project Status

- **Current Progress**: 
  - Completed user creation functionality.
  - Implemented OTP storage using Redis (ioredis).
  - Set up email services using Nodemailer.
  - JWT authentication is in place.

- **Next Steps**:
  - Finalize the implementation of the e-wallet system.
  - Integrate the token purchasing and payment handling.
  - Develop the frontend with Next.js for a seamless user experience.

## Contributing

We welcome contributions to improve this project. Please fork the repository and create a pull request with your changes. Ensure your code follows the existing coding standards.

## License

This project is licensed under the MIT License.
