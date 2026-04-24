-- Registration form improvements migration
-- Safe to run multiple times.

USE defaultdb;

-- Prevent duplicate barangay rows per city.
SET @idx_exists := (
  SELECT COUNT(*)
  FROM information_schema.statistics
  WHERE table_schema = DATABASE()
    AND table_name = 'barangays'
    AND index_name = 'uq_barangay_city_name'
);
SET @sql_idx := IF(
  @idx_exists = 0,
  'ALTER TABLE barangays ADD UNIQUE KEY uq_barangay_city_name (city, barangay_name)',
  'SELECT 1'
);
PREPARE stmt_idx FROM @sql_idx;
EXECUTE stmt_idx;
DEALLOCATE PREPARE stmt_idx;

-- Ensure residents.street_address exists and is wide enough.
SET @street_exists := (
  SELECT COUNT(*)
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'residents'
    AND column_name = 'street_address'
);
SET @sql_street := IF(
  @street_exists = 0,
  'ALTER TABLE residents ADD COLUMN street_address VARCHAR(200) NULL',
  'ALTER TABLE residents MODIFY COLUMN street_address VARCHAR(200) NULL'
);
PREPARE stmt_street FROM @sql_street;
EXECUTE stmt_street;
DEALLOCATE PREPARE stmt_street;

-- Optional helper index for mobile uniqueness lookups.
SET @mob_idx_exists := (
  SELECT COUNT(*)
  FROM information_schema.statistics
  WHERE table_schema = DATABASE()
    AND table_name = 'residents'
    AND index_name = 'uq_residents_mobile_number'
);
SET @sql_mob_idx := IF(
  @mob_idx_exists = 0,
  'ALTER TABLE residents ADD UNIQUE KEY uq_residents_mobile_number (mobile_number)',
  'SELECT 1'
);
PREPARE stmt_mob_idx FROM @sql_mob_idx;
EXECUTE stmt_mob_idx;
DEALLOCATE PREPARE stmt_mob_idx;
