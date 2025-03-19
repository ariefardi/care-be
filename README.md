## 🛠️ Getting Started

### Video Demo

For a visual guide, watch the [video demo](https://drive.google.com/file/d/1zHAz55FDOIOSiG36LbJm6zXgD2uwdU6Q/view?usp=sharing) to see the setup and running of the project.

### Step-by-Step Guide

#### Step 1: 🚀 Initial Setup

- Clone the repository: `git clone https://github.com/edwinhern/express-typescript-2024.git`
- Navigate: `cd ./krom-be`
- Install dependencies: `npm ci` or `npm i`

#### Step 2: ⚙️ Environment Configuration

- Create `.env`: Copy `.env.template` to `.env`
- Update `.env`: Fill in necessary environment variables
- Create your own database ex: `hr-dev`

#### Step 3: 🏃‍♂️ Prepare Database

- Run `npm run init` to migrate and seed the table
- Make sure configuration `.env` compatible

#### Step 4: 🏃‍♂️ Running the Project

- Development Mode: `npm run start`
- Building: `npm run build`
- Production Mode: Set `.env` to `NODE_ENV="production"` then `npm run build && npm run start`

## 📁 Folder Structure

```code
├── Dockerfile
├── README.md
├── biome.json
├── package-lock.json
├── package.json
├── docker-compose.yml
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
        └─── candidate
            ├── __tests__
                ├── candidateController.test.ts
                ├── candidateRepository.test.ts
                ├── candidateRouter.test.ts
                └── candidateService.test.ts
            ├── candidateController.ts
            ├── candidateModel.ts
            ├── candidateRepository.ts
            ├── candidateRouter.ts
            ├── candidateService.ts
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

14 directories, 31 files
```
