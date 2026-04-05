# AI-Powered Security & Monitoring Mobile Application

**Graduation Thesis (2025)

**Publication:** https://zenodo.org/records/17795540

---

Overview

This project presents an **AI-powered mobile security and monitoring system** designed to provide real-time alerts and intelligent threat detection. The application leverages machine learning, geolocation tracking, and scalable backend infrastructure to enhance situational awareness and user safety.

---

##  Key Features

 **Real-Time Alerts:** Instant notifications for detected suspicious activities
 **Geolocation Tracking:** Live location monitoring using map integration
 **AI-Based Detection:** Machine learning model identifies abnormal or risky behavior
 **Live Communication:** WebSocket-based real-time data exchange
 **Scalable Backend:** Designed for performance and extensibility
 **Containerized Deployment:** Easy setup and deployment using Docker

---

## System Architecture

### Mobile Application

* Built with **React Native**
* Provides user interface for monitoring, alerts, and tracking
* Integrates mapping services for real-time visualization

## Backend Server

* Developed using **FastAPI (Python)**
* Uses **WebSockets** for real-time communication
* Handles data processing, alert generation, and API requests

## Machine Learning Model

* Implemented using **XGBoost**
* Trained to detect suspicious activity patterns
* Integrated into backend for inference

## Database

* **PostgreSQL** used for data storage
* Stores user data, logs, and event records

## Map Integration

* Integrated with **Yandex Maps API** for geolocation and visualization

---

## Tech Stack

* **Frontend:** React Native
* **Backend:** FastAPI, Python
* **Machine Learning:** XGBoost
* **Database:** PostgreSQL
* **Real-Time Communication:** WebSockets
* **DevOps:** Docker

---

##  Installation & Setup

### Prerequisites

* Node.js & npm
* Python 3.9+
* Docker & Docker Compose
* PostgreSQL

## Clone the Repository

```bash
git clone https://github.com/Valentina14142000
cd https://github.com/Valentina14142000/AIDangerMonitor
```

## Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## Frontend Setup

```bash
cd AI_Danger_monitor
npm install
npm start
```

## Docker Deployment

```bash
docker-compose up --build
```

---

##  Usage

1. Launch the mobile application
2. Register or log in
3. Enable location services
4. Monitor real-time alerts and activity on the map
5. Receive notifications when suspicious behavior is detected

---

##  Model Details

* Algorithm: **XGBoost Classifier**
* Purpose: Detect suspicious or anomalous activity
* Input: Behavioral and location-based features
* Output: Risk classification / alert trigger

---

##  Future Improvements

* Enhanced model accuracy with larger datasets
* Integration with additional sensors (e.g., IoT devices)
* Advanced analytics dashboard
* Multi-user collaboration features

---

##  Author

Valentina Yuda Kiyungi

Graduation Thesis Project – 2025

---

##  License

This project is for academic and research purposes but can also be enhanced in the future for the real-time usage. Please refer to the publication for citation and usage guidelines.

---

##  Acknowledgements

* Open-source community
* Academic supervisors and mentors
* Contributors and testers

---
