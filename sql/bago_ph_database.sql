-- =============================================================================
-- BAGO.PH — MySQL / MariaDB: DDL + DML
-- Encoding: UTF-8
--
-- Structure:
--   A. DDL     — database + tables (CREATE)
--   B. DML     — seed data (INSERT)
--   C. DML     — example SELECT (read)
--   D. DML     — example INSERT / UPDATE / DELETE (write)
--
-- Run A then B for a working schema with sample rows. Section C–D are teaching
-- examples; run them in order. Some DELETE/UPDATE examples assume prior INSERT
-- rows exist (see comments).
-- =============================================================================


-- =============================================================================
-- A. DDL — CREATE DATABASE & TABLES
-- =============================================================================

CREATE DATABASE IF NOT EXISTS bago_ph
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE bago_ph;

-- Optional: wipe and recreate (uncomment for clean reinstall — destroys data)
-- SET FOREIGN_KEY_CHECKS = 0;
-- DROP TABLE IF EXISTS eco_points_transactions;
-- DROP TABLE IF EXISTS waste_reports;
-- DROP TABLE IF EXISTS collection_schedules;
-- DROP TABLE IF EXISTS qr_codes;
-- DROP TABLE IF EXISTS residents;
-- DROP TABLE IF EXISTS collectors;
-- DROP TABLE IF EXISTS lgu_admins;
-- DROP TABLE IF EXISTS barangays;
-- SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE barangays (
    barangay_id             INT AUTO_INCREMENT PRIMARY KEY,
    barangay_name           VARCHAR(100) NOT NULL,
    city                    VARCHAR(100) NOT NULL DEFAULT 'Lipa City',
    province                VARCHAR(100) NOT NULL DEFAULT 'Batangas',
    registered_households   INT DEFAULT 0,
    compliance_rate         DECIMAL(5,2) DEFAULT 0.00,
    status                  ENUM('On Track','Monitor','Urgent')
                            DEFAULT 'On Track',
    created_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_barangay_name (barangay_name)
);

CREATE TABLE residents (
    resident_id       INT AUTO_INCREMENT PRIMARY KEY,
    household_id      VARCHAR(30) UNIQUE NOT NULL,
    full_name         VARCHAR(100) NOT NULL,
    mobile_number     VARCHAR(15) UNIQUE NOT NULL,
    barangay_id       INT NOT NULL,
    street_address    VARCHAR(200),
    pin_hash          VARCHAR(255) NOT NULL,
    eco_points        INT DEFAULT 0,
    tier              ENUM('Seedling','Eco-Saver',
                          'Green Guardian','Eco-Champion')
                      DEFAULT 'Seedling',
    is_active         BOOLEAN DEFAULT TRUE,
    registration_date DATE NOT NULL,
    FOREIGN KEY (barangay_id)
        REFERENCES barangays(barangay_id),
    INDEX idx_residents_barangay (barangay_id)
);

CREATE TABLE lgu_admins (
    admin_id          INT AUTO_INCREMENT PRIMARY KEY,
    full_name         VARCHAR(100) NOT NULL,
    position          VARCHAR(100) NOT NULL,
    email             VARCHAR(150) UNIQUE NOT NULL,
    barangay_id       INT,
    is_active         BOOLEAN DEFAULT TRUE,
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (barangay_id)
        REFERENCES barangays(barangay_id)
);

CREATE TABLE collectors (
    collector_id      INT AUTO_INCREMENT PRIMARY KEY,
    collector_code    VARCHAR(20) UNIQUE NOT NULL,
    full_name         VARCHAR(100) NOT NULL,
    mobile_number     VARCHAR(15) UNIQUE NOT NULL,
    assigned_barangay INT NOT NULL,
    is_active         BOOLEAN DEFAULT TRUE,
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_barangay)
        REFERENCES barangays(barangay_id)
);

CREATE TABLE collection_schedules (
    schedule_id       INT AUTO_INCREMENT PRIMARY KEY,
    barangay_id       INT NOT NULL,
    waste_type        ENUM('Biodegradable','Non-Biodegradable',
                          'Recyclable','Residual') NOT NULL,
    collection_date   DATE NOT NULL,
    time_start        TIME NOT NULL,
    time_end          TIME NOT NULL,
    status            ENUM('Scheduled','Updated','Cancelled')
                      DEFAULT 'Scheduled',
    created_by        INT NOT NULL,
    updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                      ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (barangay_id)
        REFERENCES barangays(barangay_id),
    FOREIGN KEY (created_by)
        REFERENCES lgu_admins(admin_id),
    INDEX idx_schedules_barangay_date (barangay_id, collection_date)
);

CREATE TABLE waste_reports (
    report_id         INT AUTO_INCREMENT PRIMARY KEY,
    reference_number  VARCHAR(20) UNIQUE NOT NULL,
    resident_id       INT NOT NULL,
    barangay_id       INT NOT NULL,
    issue_type        ENUM('Missed Pickup','Overflowing Bin',
                          'Illegal Dumping','Blocked Road',
                          'Other') NOT NULL,
    description       TEXT,
    street_address    VARCHAR(200),
    gps_latitude      DECIMAL(10,8),
    gps_longitude     DECIMAL(11,8),
    status            ENUM('Open','Acknowledged',
                          'In Progress','Resolved',
                          'Rejected') DEFAULT 'Open',
    assigned_to       INT,
    submitted_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at       TIMESTAMP NULL,
    FOREIGN KEY (resident_id)
        REFERENCES residents(resident_id),
    FOREIGN KEY (barangay_id)
        REFERENCES barangays(barangay_id),
    FOREIGN KEY (assigned_to)
        REFERENCES collectors(collector_id),
    INDEX idx_reports_status (status)
);

CREATE TABLE eco_points_transactions (
    transaction_id    INT AUTO_INCREMENT PRIMARY KEY,
    resident_id       INT NOT NULL,
    action_type       ENUM('Segregation Mission',
                          'Photo Report',
                          'Streak Bonus',
                          'Referral',
                          'Onboarding',
                          'Community Mission',
                          'Redemption') NOT NULL,
    points_change     INT NOT NULL,
    balance_after     INT NOT NULL,
    transaction_date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes             VARCHAR(255),
    FOREIGN KEY (resident_id)
        REFERENCES residents(resident_id),
    INDEX idx_eco_resident (resident_id)
);

CREATE TABLE qr_codes (
    qr_id             INT AUTO_INCREMENT PRIMARY KEY,
    household_id      VARCHAR(30) NOT NULL,
    secure_token      VARCHAR(20) UNIQUE NOT NULL,
    qr_type           ENUM('Household','Redemption',
                          'Compliance') NOT NULL,
    status            ENUM('Active','Invalidated',
                          'Expired','Redeemed')
                      DEFAULT 'Active',
    issued_date       DATE NOT NULL,
    expiry_date       DATE NULL,
    issued_by         INT,
    FOREIGN KEY (issued_by)
        REFERENCES lgu_admins(admin_id),
    INDEX idx_qr_token (secure_token)
);

-- Auth bridge: mobile + PIN (bcrypt) maps to resident, collector, or LGU admin row.
CREATE TABLE app_identity (
    identity_id       INT AUTO_INCREMENT PRIMARY KEY,
    mobile_number     VARCHAR(15) NOT NULL UNIQUE,
    pin_hash          VARCHAR(255) NOT NULL,
    role              ENUM('user','collector','lgu_officer') NOT NULL,
    resident_id       INT NULL,
    collector_id      INT NULL,
    lgu_admin_id      INT NULL,
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (resident_id)
        REFERENCES residents(resident_id)
        ON DELETE CASCADE,
    FOREIGN KEY (collector_id)
        REFERENCES collectors(collector_id)
        ON DELETE CASCADE,
    FOREIGN KEY (lgu_admin_id)
        REFERENCES lgu_admins(admin_id)
        ON DELETE CASCADE,
    INDEX idx_identity_mobile (mobile_number)
);


-- =============================================================================
-- B. DML — SEED DATA (INSERT)
-- =============================================================================

INSERT INTO barangays
    (barangay_name, city, province,
     registered_households, compliance_rate, status)
VALUES
    ('Marauoy',         'Lipa City', 'Batangas', 342, 89.50, 'On Track'),
    ('San Sebastian (Balagbag)', 'Lipa City', 'Batangas', 278, 74.20, 'Monitor'),
    ('Balintawak',      'Lipa City', 'Batangas', 195, 93.10, 'On Track'),
    ('Tambo',           'Lipa City', 'Batangas', 412, 61.80, 'Urgent'),
    ('Dagatan',         'Lipa City', 'Batangas', 223, 85.00, 'On Track');

INSERT INTO lgu_admins
    (full_name, position, email, barangay_id)
VALUES
    ('Engr. Juan dela Cruz',
     'CENRO Chief', 'jdelacruz@lipa.gov.ph', NULL),
    ('Maria Reyes',
     'Barangay Captain', 'mreyes@marauoy.lipa.gov.ph', 1),
    ('Jose Santos',
     'Barangay Captain', 'jsantos@sanseb.lipa.gov.ph', 2),
    ('Ana Mendoza',
     'Barangay Captain', 'amendoza@balintawak.lipa.gov.ph', 3),
    ('Pedro Lim',
     'Environment Officer', 'plim@lipa.gov.ph', NULL);

INSERT INTO collectors
    (collector_code, full_name, mobile_number,
     assigned_barangay)
VALUES
    ('COL-LIPA-001', 'Roberto Garcia',   '09171111001', 1),
    ('COL-LIPA-002', 'Carlo Reyes',      '09171111002', 2),
    ('COL-LIPA-003', 'Danny Flores',     '09171111003', 3),
    ('COL-LIPA-004', 'Pedro Mangubat',   '09171111004', 4),
    ('COL-LIPA-005', 'Ernesto Villanueva','09171111005', 5);

INSERT INTO residents
    (household_id, full_name, mobile_number,
     barangay_id, street_address, pin_hash,
     eco_points, tier, registration_date)
VALUES
    ('BAGO-MARA-2025-00001',
     'Maria Santos',     '09181234501', 1,
     '12 Rizal Street, Purok 3',
     '$2b$10$7OD1i59oyW7L5aJejHlQKepMo2laeUKhqK4h47W0DrP8PXz0Z5zaG',
     240, 'Eco-Saver',  '2025-01-10'),

    ('BAGO-MARA-2025-00002',
     'Jose dela Cruz',   '09181234502', 1,
     '45 Mabini Street, Purok 1',
     '$2b$10$7OD1i59oyW7L5aJejHlQKepMo2laeUKhqK4h47W0DrP8PXz0Z5zaG',
     85,  'Seedling',   '2025-01-15'),

    ('BAGO-SEBA-2025-00001',
     'Ana Reyes',        '09181234503', 2,
     '7 Bonifacio Ave, Purok 2',
     '$2b$10$7OD1i59oyW7L5aJejHlQKepMo2laeUKhqK4h47W0DrP8PXz0Z5zaG',
     310, 'Green Guardian', '2025-01-20'),

    ('BAGO-BALI-2025-00001',
     'Liza Mendoza',     '09181234504', 3,
     '23 Luna Street, Purok 4',
     '$2b$10$7OD1i59oyW7L5aJejHlQKepMo2laeUKhqK4h47W0DrP8PXz0Z5zaG',
     620, 'Eco-Champion','2025-02-01'),

    ('BAGO-TAMB-2025-00001',
     'Roberto Garcia',   '09181234505', 4,
     '89 Quezon Street, Purok 5',
     '$2b$10$7OD1i59oyW7L5aJejHlQKepMo2laeUKhqK4h47W0DrP8PXz0Z5zaG',
     50,  'Seedling',   '2025-02-10');

-- Demo logins (PIN for all: 1234) — mobile maps to role + linked row.
INSERT INTO app_identity
    (mobile_number, pin_hash, role, resident_id, collector_id, lgu_admin_id)
VALUES
    ('09181234501',
     '$2b$10$7OD1i59oyW7L5aJejHlQKepMo2laeUKhqK4h47W0DrP8PXz0Z5zaG',
     'user', 1, NULL, NULL),
    ('09181234502',
     '$2b$10$7OD1i59oyW7L5aJejHlQKepMo2laeUKhqK4h47W0DrP8PXz0Z5zaG',
     'user', 2, NULL, NULL),
    ('09181234503',
     '$2b$10$7OD1i59oyW7L5aJejHlQKepMo2laeUKhqK4h47W0DrP8PXz0Z5zaG',
     'user', 3, NULL, NULL),
    ('09181234504',
     '$2b$10$7OD1i59oyW7L5aJejHlQKepMo2laeUKhqK4h47W0DrP8PXz0Z5zaG',
     'user', 4, NULL, NULL),
    ('09181234505',
     '$2b$10$7OD1i59oyW7L5aJejHlQKepMo2laeUKhqK4h47W0DrP8PXz0Z5zaG',
     'user', 5, NULL, NULL),
    ('09171111001',
     '$2b$10$7OD1i59oyW7L5aJejHlQKepMo2laeUKhqK4h47W0DrP8PXz0Z5zaG',
     'collector', NULL, 1, NULL),
    ('09171111002',
     '$2b$10$7OD1i59oyW7L5aJejHlQKepMo2laeUKhqK4h47W0DrP8PXz0Z5zaG',
     'collector', NULL, 2, NULL),
    ('09171111003',
     '$2b$10$7OD1i59oyW7L5aJejHlQKepMo2laeUKhqK4h47W0DrP8PXz0Z5zaG',
     'collector', NULL, 3, NULL),
    ('09171111004',
     '$2b$10$7OD1i59oyW7L5aJejHlQKepMo2laeUKhqK4h47W0DrP8PXz0Z5zaG',
     'collector', NULL, 4, NULL),
    ('09171111005',
     '$2b$10$7OD1i59oyW7L5aJejHlQKepMo2laeUKhqK4h47W0DrP8PXz0Z5zaG',
     'collector', NULL, 5, NULL),
    ('09230000001',
     '$2b$10$7OD1i59oyW7L5aJejHlQKepMo2laeUKhqK4h47W0DrP8PXz0Z5zaG',
     'lgu_officer', NULL, NULL, 1),
    ('09230000002',
     '$2b$10$7OD1i59oyW7L5aJejHlQKepMo2laeUKhqK4h47W0DrP8PXz0Z5zaG',
     'lgu_officer', NULL, NULL, 2),
    ('09230000003',
     '$2b$10$7OD1i59oyW7L5aJejHlQKepMo2laeUKhqK4h47W0DrP8PXz0Z5zaG',
     'lgu_officer', NULL, NULL, 3),
    ('09230000004',
     '$2b$10$7OD1i59oyW7L5aJejHlQKepMo2laeUKhqK4h47W0DrP8PXz0Z5zaG',
     'lgu_officer', NULL, NULL, 4),
    ('09230000005',
     '$2b$10$7OD1i59oyW7L5aJejHlQKepMo2laeUKhqK4h47W0DrP8PXz0Z5zaG',
     'lgu_officer', NULL, NULL, 5);

INSERT INTO collection_schedules
    (barangay_id, waste_type, collection_date,
     time_start, time_end, status, created_by)
VALUES
    (1, 'Biodegradable',     '2025-04-07',
     '06:00:00', '10:00:00', 'Scheduled', 2),

    (1, 'Non-Biodegradable', '2025-04-09',
     '07:00:00', '11:00:00', 'Updated',   2),

    (1, 'Recyclable',        '2025-04-11',
     '06:00:00', '10:00:00', 'Scheduled', 2),

    (2, 'Biodegradable',     '2025-04-08',
     '06:00:00', '10:00:00', 'Scheduled', 3),

    (2, 'Non-Biodegradable', '2025-04-10',
     '07:00:00', '11:00:00', 'Cancelled', 3);

INSERT INTO waste_reports
    (reference_number, resident_id, barangay_id,
     issue_type, description, street_address,
     gps_latitude, gps_longitude, status, assigned_to)
VALUES
    ('RPT-2025-00142', 1, 1,
     'Overflowing Bin',
     'Bin on Rizal Street has not been collected in 3 days.',
     '12 Rizal Street, Purok 3',
     13.94120000, 121.16340000, 'In Progress', 1),

    ('RPT-2025-00143', 2, 1,
     'Missed Pickup',
     'Thursday collection was skipped with no notice.',
     '45 Mabini Street, Purok 1',
     13.94150000, 121.16370000, 'Open', NULL),

    ('RPT-2025-00144', 3, 2,
     'Illegal Dumping',
     'Construction debris dumped along the creek.',
     '7 Bonifacio Ave, Purok 2',
     13.93980000, 121.16200000, 'Acknowledged', 2),

    ('RPT-2025-00145', 4, 3,
     'Blocked Road',
     'Garbage truck blocking main road for over 2 hours.',
     '23 Luna Street, Purok 4',
     13.94300000, 121.16500000, 'Resolved', 3),

    ('RPT-2025-00146', 5, 4,
     'Overflowing Bin',
     'Communal bin at end of Quezon Street is full.',
     '89 Quezon Street, Purok 5',
     13.94050000, 121.16250000, 'Open', NULL);

INSERT INTO eco_points_transactions
    (resident_id, action_type, points_change,
     balance_after, notes)
VALUES
    (1, 'Segregation Mission', +10, 10,
     'Collector COL-LIPA-001 confirmed segregation'),
    (1, 'Photo Report',        +15, 25,
     'Report RPT-2025-00142 validated by LGU'),
    (1, 'Streak Bonus',        +25, 50,
     '3-week segregation streak achieved'),
    (1, 'Referral',            +20, 70,
     'Neighbor BAGO-MARA-2025-00002 registered'),
    (1, 'Redemption',          -30, 40,
     'GCash P25 credit redeemed');

INSERT INTO qr_codes
    (household_id, secure_token, qr_type,
     status, issued_date, expiry_date, issued_by)
VALUES
    ('BAGO-MARA-2025-00001',
     'BAGO-A7F2K9', 'Household',
     'Active', '2025-01-10', NULL, 2),

    ('BAGO-MARA-2025-00002',
     'BAGO-B3G4L1', 'Household',
     'Active', '2025-01-15', NULL, 2),

    ('BAGO-MARA-2025-00001',
     'BAGO-RX-C9D2E5', 'Redemption',
     'Redeemed', '2025-04-05', '2025-04-06', NULL),

    ('BAGO-SEBA-2025-00001',
     'BAGO-F1H7J3', 'Household',
     'Active', '2025-01-20', NULL, 3),

    ('BAGO-BALI-2025-00001',
     'BAGO-K8M2N6', 'Household',
     'Active', '2025-02-01', NULL, 4);


-- =============================================================================
-- C. DML — READ (SELECT)
-- =============================================================================

-- Read: scheduled collections for Barangay Marauoy
SELECT
    cs.schedule_id,
    b.barangay_name,
    cs.waste_type,
    cs.collection_date,
    cs.time_start,
    cs.time_end,
    cs.status
FROM collection_schedules cs
JOIN barangays b
    ON cs.barangay_id = b.barangay_id
WHERE b.barangay_name = 'Marauoy'
ORDER BY cs.collection_date ASC;

-- Read: open waste reports with resident + barangay
SELECT
    wr.reference_number,
    r.full_name       AS resident,
    b.barangay_name,
    wr.issue_type,
    wr.status,
    wr.submitted_at
FROM waste_reports wr
JOIN residents r
    ON wr.resident_id = r.resident_id
JOIN barangays b
    ON wr.barangay_id = b.barangay_id
WHERE wr.status = 'Open'
ORDER BY wr.submitted_at DESC;

-- Read: top residents by eco-points
SELECT
    r.full_name,
    b.barangay_name,
    r.eco_points,
    r.tier
FROM residents r
JOIN barangays b
    ON r.barangay_id = b.barangay_id
ORDER BY r.eco_points DESC
LIMIT 5;

-- Read: compliance by barangay
SELECT
    barangay_name,
    compliance_rate,
    status
FROM barangays
ORDER BY compliance_rate DESC;

-- Read: eco-points history for resident_id = 1
SELECT
    action_type,
    points_change,
    balance_after,
    transaction_date,
    notes
FROM eco_points_transactions
WHERE resident_id = 1
ORDER BY transaction_date DESC;


-- =============================================================================
-- D. DML — WRITE: INSERT (additional examples)
-- =============================================================================

-- Insert: new waste report
INSERT INTO waste_reports
    (reference_number, resident_id, barangay_id,
     issue_type, description, street_address,
     gps_latitude, gps_longitude, status)
VALUES
    ('RPT-2025-00147', 2, 1,
     'Missed Pickup',
     'Monday collection skipped with no notification.',
     '45 Mabini Street, Purok 1',
     13.94150000, 121.16370000, 'Open');

-- Insert: eco-points line after activity
INSERT INTO eco_points_transactions
    (resident_id, action_type,
     points_change, balance_after, notes)
VALUES
    (2, 'Segregation Mission', +10, 95,
     'Collector COL-LIPA-001 QR scan confirmed');

-- Insert: new resident
INSERT INTO residents
    (household_id, full_name, mobile_number,
     barangay_id, street_address, pin_hash,
     eco_points, tier, registration_date)
VALUES
    ('BAGO-MARA-2025-00006',
     'Carmen Villanueva', '09181234510', 1,
     '3 Aguinaldo Street, Purok 2',
     'hashed_pin_6', 0, 'Seedling', CURDATE());


-- =============================================================================
-- D. DML — WRITE: UPDATE
-- =============================================================================

-- Update: resolve a report
UPDATE waste_reports
SET
    status      = 'Resolved',
    resolved_at = NOW()
WHERE reference_number = 'RPT-2025-00142';

-- Update: bump eco-points and tier for a resident
UPDATE residents
SET
    eco_points = eco_points + 10,
    tier = CASE
        WHEN eco_points + 10 >= 600
            THEN 'Eco-Champion'
        WHEN eco_points + 10 >= 300
            THEN 'Green Guardian'
        WHEN eco_points + 10 >= 100
            THEN 'Eco-Saver'
        ELSE 'Seedling'
    END
WHERE household_id = 'BAGO-MARA-2025-00002';

-- Update: mark schedule cancelled
UPDATE collection_schedules
SET status = 'Cancelled'
WHERE schedule_id = 5;

-- Update: deactivate collector
UPDATE collectors
SET is_active = FALSE
WHERE collector_code = 'COL-LIPA-003';

-- Update: invalidate QR token
UPDATE qr_codes
SET status = 'Invalidated'
WHERE secure_token = 'BAGO-A7F2K9';


-- =============================================================================
-- D. DML — WRITE: DELETE
-- =============================================================================

-- Delete: remove cancelled schedule row (after UPDATE above, schedule 5 is Cancelled)
DELETE FROM collection_schedules
WHERE schedule_id = 5
  AND status = 'Cancelled';

-- Delete: remove demo report inserted as RPT-2025-00147 (from INSERT examples)
DELETE FROM waste_reports
WHERE reference_number = 'RPT-2025-00147';

-- Delete: remove demo resident BAGO-MARA-2025-00006 (eco rows first, then resident)
SET @demo_resident_id := (
    SELECT resident_id FROM residents
    WHERE household_id = 'BAGO-MARA-2025-00006'
    LIMIT 1
);
DELETE FROM eco_points_transactions
WHERE resident_id <=> @demo_resident_id;
DELETE FROM residents
WHERE household_id = 'BAGO-MARA-2025-00006';

-- Delete: one redeemed redemption QR row (demo cleanup)
DELETE FROM qr_codes
WHERE secure_token = 'BAGO-RX-C9D2E5'
  AND qr_type = 'Redemption';
