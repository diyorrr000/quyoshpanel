-- Solar_OS Database Schema

CREATE DATABASE IF NOT EXISTS solar_os;
USE solar_os;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Devices Table
CREATE TABLE IF NOT EXISTS devices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    status ENUM('online', 'offline', 'maintenance') DEFAULT 'online',
    last_consumption FLOAT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Solar Panels Table
CREATE TABLE IF NOT EXISTS solar_panels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    panel_code VARCHAR(50) UNIQUE NOT NULL,
    efficiency FLOAT DEFAULT 0,
    voltage FLOAT DEFAULT 0,
    temperature FLOAT DEFAULT 0,
    status ENUM('online', 'offline', 'maintenance') DEFAULT 'online'
);

-- Statistics Table
CREATE TABLE IF NOT EXISTS statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_yield FLOAT,
    total_consumption FLOAT,
    grid_export FLOAT
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('info', 'warning', 'error', 'security') NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    theme VARCHAR(50) DEFAULT 'light',
    language VARCHAR(10) DEFAULT 'uz',
    font_size VARCHAR(20) DEFAULT 'medium',
    interface_scale VARCHAR(10) DEFAULT '100%',
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Reports Table
CREATE TABLE IF NOT EXISTS reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(50),
    file_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
