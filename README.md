# JMatch

AI-powered resume analysis and application tracking platform built with React, FastAPI, and PostgreSQL.

## Overview

JMatch helps students and job seekers improve their resumes by providing AI-driven feedback, resume scoring, and personalized recommendations. The platform also includes an internship application tracker to help users manage their job search process in one place.

## Features

### Authentication

* User registration
* Secure login and logout
* JWT-based authentication
* Protected dashboard routes

### Resume Analysis

* Upload resumes in PDF format
* AI-powered resume evaluation
* Resume scoring system
* Skills and keyword analysis
* Improvement recommendations

### Internship Tracker

* Track internship applications
* Monitor application status
* Store company information
* Organize job search activities

### Dashboard

* Resume analysis history
* Application tracking overview
* User activity summary

## Tech Stack

### Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS

### Backend

* FastAPI
* SQLAlchemy
* JWT Authentication
* Passlib

### Database

* PostgreSQL

## Project Structure

```text
JMatch/
├── frontend/
├── backend/
├── .gitignore
└── README.md
```

## Getting Started

### Clone Repository

```bash
git clone https://github.com/legaspijeremy/JMatch.git
cd JMatch
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

## Roadmap

### Week 1

* Project setup
* Authentication system
* Protected routes
* Database connection

### Week 2

* Resume upload functionality
* File storage
* Resume parsing

### Week 3

* AI resume analysis
* Resume scoring engine
* Feedback generation

### Week 4

* Internship tracker
* Dashboard analytics
* UI improvements

### Week 5

* Testing
* Deployment
* Documentation

## Author

Norman Jeremy Legaspi

Computer Science Student | Aspiring Software Engineer

LinkedIn: Add your LinkedIn profile here

Portfolio: Add your portfolio website here
