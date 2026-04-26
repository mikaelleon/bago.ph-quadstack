CREATE TABLE IF NOT EXISTS eco_points_ledger (
  ledger_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  resident_id INT NOT NULL,
  points_delta INT NOT NULL,
  source_type ENUM('QR_SCAN','REPORT_VALIDATION','REDEMPTION','RECONCILE') NOT NULL,
  reference_id VARCHAR(64) NULL,
  idempotency_key VARCHAR(128) NOT NULL,
  notes VARCHAR(255) NULL,
  created_by_identity_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_eco_ledger_idempotency (idempotency_key),
  KEY idx_eco_ledger_resident_created (resident_id, created_at),
  CONSTRAINT fk_eco_ledger_resident
    FOREIGN KEY (resident_id) REFERENCES residents(resident_id)
);
