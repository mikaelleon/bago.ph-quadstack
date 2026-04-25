-- Upgrade existing DBs from mobile-only LGU rows to gov_email + password_hash.
-- Fresh installs: use sql/bago_ph_database.sql only (already includes this shape).
-- Safe to run once after backup.

USE defaultdb;

ALTER TABLE app_identity
  MODIFY mobile_number VARCHAR(20) NULL,
  MODIFY pin_hash VARCHAR(255) NULL;

SET @col_ge := (
  SELECT COUNT(*) FROM information_schema.columns
  WHERE table_schema = DATABASE() AND table_name = 'app_identity' AND column_name = 'gov_email'
);
SET @sql_ge := IF(@col_ge = 0,
  'ALTER TABLE app_identity ADD COLUMN gov_email VARCHAR(150) NULL AFTER pin_hash',
  'SELECT 1');
PREPARE s_ge FROM @sql_ge; EXECUTE s_ge; DEALLOCATE PREPARE s_ge;

SET @col_ph := (
  SELECT COUNT(*) FROM information_schema.columns
  WHERE table_schema = DATABASE() AND table_name = 'app_identity' AND column_name = 'password_hash'
);
SET @sql_ph := IF(@col_ph = 0,
  'ALTER TABLE app_identity ADD COLUMN password_hash VARCHAR(255) NULL AFTER gov_email',
  'SELECT 1');
PREPARE s_ph FROM @sql_ph; EXECUTE s_ph; DEALLOCATE PREPARE s_ph;

SET @uq_ge := (
  SELECT COUNT(*) FROM information_schema.statistics
  WHERE table_schema = DATABASE() AND table_name = 'app_identity' AND index_name = 'uq_identity_gov_email'
);
SET @sql_uq_ge := IF(@uq_ge = 0,
  'ALTER TABLE app_identity ADD UNIQUE KEY uq_identity_gov_email (gov_email)',
  'SELECT 1');
PREPARE s_uq_ge FROM @sql_uq_ge; EXECUTE s_uq_ge; DEALLOCATE PREPARE s_uq_ge;

-- Optional: remove old seed LGU rows (synthetic mobiles 09230000001–09230000005) after adding the
-- email-based identity from a fresh sql/bago_ph_database.sql import or manual INSERT.
