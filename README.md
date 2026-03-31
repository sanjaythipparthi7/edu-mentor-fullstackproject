# 🎓 EduMentor - Full-Stack Learning Management System

![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)

EduMentor is a modern, comprehensive Learning Management System (LMS) designed to bridge the gap between students, educators, and administrators. Built with a robust **Java Spring Boot backend** and a dynamic **React frontend**, it features role-based access control, real-time attendance tracking, dynamic course enrollment, and detailed administrative analytics.

## ✨ Key Features

### 🛡️ Role-Based Access Control
* **Admin Dashboard:** Full platform control. Manage active users, suspend accounts, create new courses, and view sitewide analytics (enrollment trends, platform health).
* **Teacher View:** Create and upload course materials, manage syllabus details, automatically calculate and track student attendance, and monitor class progress.
* **Student View:** Browse available courses, track personal attendance percentages, view newly published course materials, and check academic progress in real-time.

### 📊 Real-Time Student Analytics
* Dynamic visual progress dashboards using Redux state management.
* Complex backend aggregation queries in Spring Data JPA to evaluate attendance margins and warn students falling below the 75% threshold.

### 🔐 High Security & Authentication
* Fully secured APIs via **Spring Security** and **JSON Web Tokens (JWT)**.
* **BCrypt Password Hashing** protecting user credentials.
* Clean separation of concerns with strictly filtered endpoints explicitly tailored for Admin, Teacher, or Student network levels.

## 🛠️ Technology Stack

### Backend
* **Framework:** Java 21, Spring Boot 3
* **Security:** Spring Security, JWT (Bearer Token Auth)
* **Database:** MySQL, Hibernate / JPA for ORM
* **Architecture:** MVC Pattern, DTOs, Service Layer

### Frontend
* **Framework:** React.js
* **State Management:** Redux Toolkit, Redux Persist
* **Routing:** React Router v6 with Role-Protected Routes
* **Styling:** Custom CSS Design System, Glassmorphic UI

## 📂 Repository Structure

```text
📦 EduMentor
 ┣ 📂 edumentor-backend   # Spring Boot REST API & Database Models
 ┃ ┣ 📂 src/main/java     # Core Controllers, Services, Security, Repositories
 ┃ ┗ 📜 pom.xml           # Maven Dependencies
 ┗ 📂 edumentor-frontend  # React SPA
   ┣ 📂 src/api           # Axios API Interceptors
   ┣ 📂 src/pages         # Role-specific Dashboards & Authentication Views
   ┗ 📜 package.json      # NPM Dependencies
```

## 🚀 Getting Started

### Prerequisites
* Java Development Kit (JDK) 21
* Node.js & npm
* MySQL Server (Running on localhost:3306)

### 1. Backend Setup
```bash
cd edumentor-backend
# Update src/main/resources/application.properties with your MySQL username/password
mvn clean install
mvn spring-boot:run
```
*The API will start securely on `http://localhost:8080`*

### 2. Frontend Setup
```bash
cd edumentor-frontend
npm install
npm start
```
*The App will start beautifully on `http://localhost:3000`*

## 🤝 Contribution & License
This project is an open-source demonstration of full-stack capabilities, created by **Sanjay Thipparthi**. Feel free to fork, clone, and experiment with the codebase!
