# meta-learning
Repository for SNU HCI team project. (Meta-Learning)

How to start?

0. Install NodeJS with yarn
1. Start Client
    1. Move to client/web
    2. `yarn`
    3. `yarn start`
    4. client will be started with port 3000
2. Start Server
    1. Move to server
    2. `yarn`
    3. add .env file (TODO: add script for creating .env file)
       ```
        GCP_CLIENT_KEY=
        GCP_PROJECT_ID=
        OPEN_AI_API_KEY=
        OPEN_AI_ORGANIZATION=
        EMAIL_RECEIVERS=[]
        GMAIL_ID=
        GMAIL_PASSWORD=
       ```
    4. `yarn start`
    5. server will be started with port 5555
