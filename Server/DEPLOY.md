Deployment steps (Server)

1. Environment
- Copy `.env.example` to `.env` and set real values (MONGO_URI, JWT_SECRET, SMTP credentials).

2. Using Render (recommended)
- Create a new Web Service, connect your Git repo branch `main`.
- Set the build command to `cd Server && npm install` (or leave default if you want root install).
- Set the start command to `node server.js`.
- Add environment variables in the Render dashboard matching your `.env` keys.

3. What the repository does at deploy
- `Server/package.json` includes a `postinstall` script that runs `cd ../client && npm install && npm run build` to build the React client into `client/dist`.
- Server serves files from `../client/dist` when `NODE_ENV=production`.

4. Local testing
- From repository root, run:

```bash
cd Server
npm install
npm run dev
```

- Or to simulate production (build client first):

```bash
cd client
npm install
npm run build
cd ../Server
npm install
NODE_ENV=production node server.js
```

5. Notes
- Keep secrets out of git. Use your hosting provider's secret store or environment variables.
- If your hosting provider runs `npm install` at the repo root, ensure it runs the Server `postinstall` by using the Server folder as the service root or adjust build commands accordingly.
