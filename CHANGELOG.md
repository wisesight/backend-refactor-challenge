# Changelog

All changes to this project will be documented in this file.

### Changed

- Break down the monolithic API into domain microservices. Each microservice has it's own database: User Service, Product Service and Order Service.
- Microservices communicate with each other using api requests. 
- Restructure all service structure to follow Clean Architecture principles.
- Apply SOLID principles, dependency injection, making it easier to test and extend.
- Enable api versioning support.

### Added

- New endpoint to Product Service: Get product details.
- New endpoint to Product Service: Update product details.
- New endpoint to Order Service: Search all orders.
- HTTP request logger middleware.
- Unit tests.
- New postman request collection to support new endpoint.
- Environment variables, making it easier to run app locally.


## 📌 API Endpoints Summary

### 🛠 User Routes 

Users **register** and can later view their **past orders**.

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| POST   | /users/register   | Register a new user |
| GET    | /users/:id/orders | Get user orders     |

### 🛒 Product Routes

Products represent the **items available for sale**.

| Method | Endpoint       | Description             |
| ------ | ---------------| ----------------------- |
| GET    | /products      | Get all products        |
| GET    | /products/:id  | Get product details :sparkles:    | 
| PUT    | /products/:id  | Update product details :sparkles: |

### 📦 Order Routes

Orders **handle the purchasing process**.

| Method | Endpoint    | Description        |
| ------ | ----------- | ------------------ |
| POST   | /orders     | Place an order     |
| GET    | /orders/:id | Get order details  |
| GET    | /orders     | Search all orders :sparkles: |

 :sparkles: new endpoint