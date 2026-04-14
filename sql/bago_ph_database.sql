-- BAGO.PH — MySQL/MariaDB schema, sample data, and example queries
-- Encoding: UTF-8

-- =============================================================================
-- 1. CREATE DATABASE
-- =============================================================================

CREATE DATABASE IF NOT EXISTS bago_ph;

-- =============================================================================
-- 2. USE DATABASE
-- =============================================================================

USE bago_ph;

-- =============================================================================
-- 3. CREATE TABLE (all tables)
-- =============================================================================

CREATE TABLE barangays (
    barangay_id       INT AUTO_INCREMENT PRIMARY KEY,
    barangay_name     VARCHAR(100) NOT NULL,
    city              VARCHAR(100) NOT NULL DEFAULT 'Lipa City',
    province          VARCHAR(100) NOT NULL DEFAULT 'Batangas',
    registered_households INT DEFAULT 0,
    compliance_rate   DECIMAL(5,2) DEFAULT 0.00,
    status            ENUM('On Track','Monitor','Urgent')
                      DEFAULT 'On Track',
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
        REFERENCES barangays(barangay_id)
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
        REFERENCES lgu_admins(admin_id)
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
        REFERENCES collectors(collector_id)
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
        REFERENCES residents(resident_id)
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
        REFERENCES lgu_admins(admin_id)
);

-- =============================================================================
-- 4. INSERT INTO (sample data for all tables)
-- =============================================================================

INSERT INTO barangays
    (barangay_name, city, province,
     registered_households, compliance_rate, status)
VALUES
    ('Marawoy',      'Lipa City', 'Batangas', 342, 89.50, 'On Track'),
    ('San Sebastian','Lipa City', 'Batangas', 278, 74.20, 'Monitor'),
    ('Balintawak',   'Lipa City', 'Batangas', 195, 93.10, 'On Track'),
    ('Tambo',        'Lipa City', 'Batangas', 412, 61.80, 'Urgent'),
    ('Dagatan',      'Lipa City', 'Batangas', 223, 85.00, 'On Track');

INSERT INTO lgu_admins
    (full_name, position, email, barangay_id)
VALUES
    ('Engr. Juan dela Cruz',
     'CENRO Chief', 'jdelacruz@lipa.gov.ph', NULL),
    ('Maria Reyes',
     'Barangay Captain', 'mreyes@marawoy.lipa.gov.ph', 1),
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
     'hashed_pin_1', 240, 'Eco-Saver',  '2025-01-10'),

    ('BAGO-MARA-2025-00002',
     'Jose dela Cruz',   '09181234502', 1,
     '45 Mabini Street, Purok 1',
     'hashed_pin_2', 85,  'Seedling',   '2025-01-15'),

    ('BAGO-SEBA-2025-00001',
     'Ana Reyes',        '09181234503', 2,
     '7 Bonifacio Ave, Purok 2',
     'hashed_pin_3', 310, 'Green Guardian', '2025-01-20'),

    ('BAGO-BALI-2025-00001',
     'Liza Mendoza',     '09181234504', 3,
     '23 Luna Street, Purok 4',
     'hashed_pin_4', 620, 'Eco-Champion','2025-02-01'),

    ('BAGO-TAMB-2025-00001',
     'Roberto Garcia',   '09181234505', 4,
     '89 Quezon Street, Purok 5',
     'hashed_pin_5', 50,  'Seedling',   '2025-02-10');

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
-- 5. SELECT queries
-- =============================================================================

-- 1. Get all scheduled collections for Barangay Marawoy
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
WHERE b.barangay_name = 'Marawoy'
ORDER BY cs.collection_date ASC;

-- 2. Get all open waste reports with resident details
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

-- 3. Top 5 residents by eco-points (leaderboard)
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

-- 4. Get compliance rate per barangay
SELECT
    barangay_name,
    compliance_rate,
    status
FROM barangays
ORDER BY compliance_rate DESC;

-- 5. Get eco-points transaction history for one resident
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
-- 6. INSERT queries
-- =============================================================================

-- 1. Add a new waste report
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

-- 2. Add an eco-points transaction after QR scan
INSERT INTO eco_points_transactions
    (resident_id, action_type,
     points_change, balance_after, notes)
VALUES
    (2, 'Segregation Mission', +10, 95,
     'Collector COL-LIPA-001 QR scan confirmed');

-- 3. Register a new resident
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
-- 7. UPDATE queries
-- =============================================================================

-- 1. Resolve a waste report
UPDATE waste_reports
SET
    status      = 'Resolved',
    resolved_at = NOW()
WHERE reference_number = 'RPT-2025-00142';

-- 2. Add eco-points and update tier for a resident
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

-- 3. Update a collection schedule status
UPDATE collection_schedules
SET status = 'Cancelled'
WHERE schedule_id = 5;

-- 4. Deactivate a collector
UPDATE collectors
SET is_active = FALSE
WHERE collector_code = 'COL-LIPA-003';

-- 5. Invalidate an old QR token
UPDATE qr_codes
SET status = 'Invalidated'
WHERE secure_token = 'BAGO-A7F2K9';

-- =============================================================================
-- 8. DELETE queries
-- =============================================================================

-- 1. Delete a cancelled schedule entry
DELETE FROM collection_schedules
WHERE schedule_id = 5
  AND status = 'Cancelled';

-- 2. Delete a rejected waste report
DELETE FROM waste_reports
WHERE reference_number = 'RPT-2025-00146'
  AND status = 'Rejected';

-- 3. Delete an invalidated QR code record
DELETE FROM qr_codes
WHERE status = 'Invalidated'
  AND qr_type = 'Redemption';
