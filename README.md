## 🛠️ Getting Started


### Step-by-Step Guide Running Locally

#### Step 1: 🚀 Initial Setup

- Clone the repository: `git clone https://github.com/ariefardi/care-be.git`
- Navigate: `cd ./care-be`
- Install dependencies: `yarn install`

#### Step 2: ⚙️ Environment Configuration

- Create `.env`: Copy `.env.local` to `.env`
- Update `.env`: Fill in necessary environment variables
- Create your own database ex: `rs-dev`

#### Step 3: 🏃‍♂️ Prepare Database

- Run `yarn init-dev` to migrate and seed the table
- Make sure configuration `.env` compatible

#### Step 4: 🏃‍♂️ Running the Project

- Development Mode: `yarn start`
- Building: `yarn build`
- Production Mode: Set `.env` to `NODE_ENV="production"` then `yarn build && yarn start`
