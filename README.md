## 🛠️ Getting Started

### Video Demo Local

For a visual guide, watch the [video demo](https://drive.google.com/file/d/1W91-0golMP8-3LHMZZMA7t8YMXzMm8ov/view?usp=sharing) to see the setup and running of the project.

### Step-by-Step Guide Running Locally

#### Step 1: 🚀 Initial Setup

- Clone the repository: `git clone https://github.com/ariefardi/krom-be.git`
- Navigate: `cd ./krom-be`
- Install dependencies: `yarn install`

#### Step 2: ⚙️ Environment Configuration

- Create `.env`: Copy `.env.local` to `.env`
- Update `.env`: Fill in necessary environment variables
- Create your own database ex: `hr-dev`

#### Step 3: 🏃‍♂️ Prepare Database

- Run `yarn init-dev` to migrate and seed the table
- Make sure configuration `.env` compatible

#### Step 4: 🏃‍♂️ Running the Project

- Development Mode: `yarn start`
- Building: `yarn build`
- Production Mode: Set `.env` to `NODE_ENV="production"` then `yarn build && yarn start`

### Video Demo Docker

For a visual guide, watch the [video demo](https://drive.google.com/file/d/1tpjNnMCLHq4aTBhwFKbacoBP-rQ5cP68/view?usp=sharing) to see the setup and running of the project.

### Running with Docker

#### Step 1:

- Create `.env`: Copy `.env.dev` to `.env`
- Create `docker-compose.yml`: Copy `docker-compose.dev.yml`
-

#### Step 2: Running the Project with Docker

-
- Use `docker compose up --build` to build latest image for docker
- Use `docker compose run --rm app yarn install` to install depedency (MacOs only)
- Use `docker compose exec app npx knex migrate:latest` to migrate table that created from migration knex
- Use `docker compose exec app npx knex seed:run` to seeding data

#### Step 2: Prepare Migration

- Use `docker compose exec app npx knex migrate:latest` to migrate table
- Use `docker compose exec app npx knex seed:run` to seeding data into table

## 📁 Folder Structure

```code
├── Dockerfile
├── README.md
├── biome.json
├── package-lock.json
├── package.json
├── docker-compose.yml
├── migrations
├── seeds
├── src
│   ├── api
│   │   ├── healthCheck
│   │   │   ├── __tests__
│   │   │   │   └── healthCheckRouter.test.ts
│   │   │   └── healthCheckRouter.ts
│   │   └── user
│   │   │   ├── __tests__
│   │   │   │   ├── userRouter.test.ts
│   │   │   │   └── userService.test.ts
│   │   │   ├── userController.ts
│   │   │   ├── userModel.ts
│   │   │   ├── userRepository.ts
│   │   │   ├── userRouter.ts
│   │   │   └── userService.ts
│   │   └─── candidate
│   │       ├── __tests__
│   │       │   ├── candidateController.test.ts
│   │       │   ├── candidateRepository.test.ts
│   │       │   ├── candidateRouter.test.ts
│   │       │   └── candidateService.test.ts
│   │       ├── candidateController.ts
│   │       ├── candidateModel.ts
│   │       ├── candidateRepository.ts
│   │       ├── candidateRouter.ts
│   │       └── candidateService.ts
│   ├── api-docs
│   │   ├── __tests__
│   │   │   └── openAPIRouter.test.ts
│   │   ├── openAPIDocumentGenerator.ts
│   │   ├── openAPIResponseBuilders.ts
│   │   └── openAPIRouter.ts
│   ├── common
│   │   ├── __tests__
│   │   │   ├── errorHandler.test.ts
│   │   │   └── requestLogger.test.ts
│   │   ├── middleware
│   │   │   ├── errorHandler.ts
│   │   │   ├── rateLimiter.ts
│   │   │   └── requestLogger.ts
│   │   ├── models
│   │   │   └── serviceResponse.ts
│   │   └── utils
│   │       ├── commonValidation.ts
│   │       ├── envConfig.ts
│   │       └── httpHandlers.ts
│   ├── index.ts
│   └── server.ts
├── tsconfig.json
└── vite.config.mts

```
