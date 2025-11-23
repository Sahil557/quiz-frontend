📝 Quiz Application

A complete Quiz Application that allows Admin to create questions and Users to take quizzes, submit answers, and view final results.
Built with Next.js (App Router) + Redux Toolkit + TailwindCSS on the frontend and Node.js + Express + MySql on the backend.

🚀 Features
👤 Authentication

User Login & Register

JWT Token-based Authentication

Protected Routes

🛠 Admin Features

Create Question

Add 4 Options (First 2 required)

Add correct answer

Save questions

Validation included

🧩 Quiz (User Side)

Fetch questions page by page

Stepper with active → completed → pending states

Circle options (A, B, C, D)

Correct / Wrong answer coloring:

🟢 Green = Correct

🔴 Red = Wrong

Auto-lock options after choosing

📤 Submit Answer

API: POST /quiz/submit

Stores chosen answer

Returns { success, correctAnswer }

📊 Quiz Result

API are in store 

Returns { total, correct }

Shown after completing all questions

🏗 Tech Stack
Frontend

Next.js 14

Redux Toolkit

Axios

TailwindCSS

Custom reusable components (Input, Button, Typography, Divider, Stepper)

Backend

Node.js + Express

MySql

JWT authentication

Modular routing & controllers