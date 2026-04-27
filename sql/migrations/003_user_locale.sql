ALTER TABLE app_identity
  ADD COLUMN locale ENUM('en','tl') NOT NULL DEFAULT 'en' AFTER lgu_admin_id;

UPDATE app_identity
SET locale = 'en'
WHERE locale IS NULL OR locale NOT IN ('en','tl');
