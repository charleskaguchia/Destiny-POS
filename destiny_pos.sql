create database destiny_pos;
use destiny_pos;
create table products
(ID INT not null primary key auto_increment,
 SKU varchar(50) not null,
 name VARCHAR(255) not null,
 retail_price DECIMAL(10,2) not null,
 tier_a_price DECIMAL(10,2) not null,
 tier_b_price DECIMAL(10,2) not null,
 tier_c_price DECIMAL(10,2) not null,
 case_qty INT not null,
 stock_level INT default 0,
 created_at DATETIME default current_timestamp
 );

 CREATE TABLE customers (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,

    customer_type ENUM('wholesale','loyalty','guest') NOT NULL,

    price_tier ENUM('Retail','Tier A','Tier B','Tier C') NOT NULL DEFAULT 'Retail',

    credit_limit DECIMAL(10,2) DEFAULT 0,
    current_balance DECIMAL(10,2) DEFAULT 0,

    loyalty_points INT DEFAULT 0,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE employees (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('cashier','manager','admin') NOT NULL DEFAULT 'cashier',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE transactions (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,

    customer_id INT,
    employee_id INT NOT NULL,

    total_amount DECIMAL(10,2) NOT NULL,
    payment_type ENUM('cash','card','account','points') NOT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);


CREATE TABLE credit_ledger (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,

    customer_id INT NOT NULL,
    transaction_id INT NULL,

    entry_type ENUM('Purchase','Payment','Adjustment') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,

    method ENUM('cash','check','transfer','account') NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (transaction_id) REFERENCES transactions(id)
);


CREATE TABLE loyalty_history (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,

    customer_id INT NOT NULL,

    points_changed INT NOT NULL,
    event_type ENUM('earn','redeem','adjust') NOT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id) REFERENCES customers(id)
);


CREATE TABLE audit_log (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,

    employee_id INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    old_value TEXT NULL,
    new_value TEXT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (employee_id) REFERENCES employees(id)
);


CREATE TABLE inventory_movements (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,

    product_id INT NOT NULL,
    change_qty INT NOT NULL,

    movement_type ENUM('sale', 'restock', 'return', 'adjustment') NOT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id) REFERENCES products(id)
);



