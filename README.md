# Scholar-Space (Study Notion)

Live: https://scholar-space-two.vercel.app/

## Short description

Scholar-Space (Study Notion) is a full-stack online learning platform where instructors can create courses (organized in sections and subsections) and students can enroll, watch course content, track progress, and leave reviews. The frontend is built with React + Redux Toolkit and Tailwind CSS; the backend is Node.js + Express with MongoDB for storage and Cloudinary for media.

## Key features

- **User auth:** Registration, login, email verification and password reset with JWT-based auth and role-based access (Student / Instructor / Admin).
- **Course management:** Instructors can create courses with sections and subsections, upload media, set pricing and publish content.
- **Payments:** Razorpay integration for paid courses and enrollment.
- **Media:** Cloudinary-powered uploads for images/videos and streaming-friendly delivery.
- **Progress tracking:** Persisted course progress for each student.
- **Ratings & reviews:** Students can rate and review courses.
- **Dashboards:** Separate instructor & student dashboards and profile management.

## Tech stack

- Frontend: React, Redux Toolkit, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Media: Cloudinary
- Payments: Razorpay
- Auth: JWT

## Repository structure (important folders)

- `/server` — Backend: routes, controllers, models, middlewares, configurations
- `/src` — Frontend: components, pages, services, slices (Redux)
- `build/` and `public/` — Production frontend artifacts

## Environment variables

Create a `.env` file in the project root for the frontend (if needed) and in `/server` for the backend. Example values below (replace with your real secrets):

Server (`/server/.env`)

```
PORT=4000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.example.mongodb.net/scholar-space
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLIENT_URL=http://localhost:3000
```

Frontend (`.env` at project root or in client build system)

```
REACT_APP_API_URL=http://localhost:4000/api
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset  # optional
```

## Run locally (development)

1. Install frontend deps (project root):

```bash
npm install
```

2. Install backend deps and run server:

```bash
cd server
npm install
npm start
```

3. Start frontend dev server (in project root):

```bash
npm start
```

## Default ports

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:4000` (may vary if `PORT` is changed)

## Build & deploy

- Frontend production build:

```bash
npm run build
```

- Backend: ensure `NODE_ENV=production` and proper env vars, then run with a process manager (pm2) or host provider.

## Notes & troubleshooting

- If you see warnings about missing `useEffect` dependencies in the frontend, review the hooks and add the missing dependencies or use stable refs.
- If uploads fail, verify your Cloudinary credentials and upload preset.
- For payment issues, ensure Razorpay keys are correct and webhook endpoints (if used) are reachable.

## Contributing

Feel free to open issues or pull requests. Follow code style used in the repo and document any API changes.

## Contact

Project author: Ankul Raja

--
This README provides the essential information to run and understand Scholar-Space locally and deploy it. For specific implementation details, see `/server` for backend logic and `/src` for frontend pages and components.

# Scholar-Space
