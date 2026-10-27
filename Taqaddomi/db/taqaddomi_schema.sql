CREATE DATABASE IF NOT EXISTS taqaddomi
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE taqaddomi;

-- USERS AND CATEGORIES
CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  email_verified_at TIMESTAMP NULL DEFAULT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user','admin') NOT NULL DEFAULT 'user',
  avatar_key VARCHAR(500) NULL,
  bio VARCHAR(500) NULL,
  timezone VARCHAR(64) NOT NULL DEFAULT 'UTC',
  locale VARCHAR(5) NOT NULL DEFAULT 'en',
  theme VARCHAR(10) NOT NULL DEFAULT 'system',
  followers_count INT NOT NULL DEFAULT 0,
  following_count INT NOT NULL DEFAULT 0,
  remember_token VARCHAR(100) NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  deleted_at TIMESTAMP NULL DEFAULT NULL
) ENGINE=InnoDB;

CREATE TABLE categories (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  parent_id BIGINT UNSIGNED NULL,
  name_en VARCHAR(100) NOT NULL,
  name_ar VARCHAR(100) NOT NULL,
  slug VARCHAR(120) NOT NULL UNIQUE,
  icon VARCHAR(60) NULL,
  sort_order SMALLINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  CONSTRAINT fk_categories_parent FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- TRACKERS AND ENTRIES
CREATE TABLE trackers (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  category_id BIGINT UNSIGNED NOT NULL,
  type ENUM('journey','habit') NOT NULL,
  counter_label ENUM('day','attempt','session','update') NOT NULL DEFAULT 'day',
  title VARCHAR(150) NOT NULL,
  description TEXT NULL,
  cover_image_key VARCHAR(500) NULL,
  visibility ENUM('public','private') NOT NULL DEFAULT 'private',
  status ENUM('active','completed','archived') NOT NULL DEFAULT 'active',
  start_date DATE NOT NULL,
  target_date DATE NULL,
  completed_at TIMESTAMP NULL DEFAULT NULL,
  completion_source VARCHAR(20) NULL,
  streak_unit ENUM('day','week','none') NOT NULL DEFAULT 'day',
  current_streak INT NOT NULL DEFAULT 0,
  best_streak INT NOT NULL DEFAULT 0,
  last_entry_date DATE NULL,
  entries_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  INDEX idx_trackers_user_status (user_id, status),
  INDEX idx_trackers_status_target (status, target_date),
  INDEX idx_trackers_discovery (visibility, status, category_id, created_at),
  CONSTRAINT fk_trackers_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_trackers_category FOREIGN KEY (category_id) REFERENCES categories(id)
) ENGINE=InnoDB;

CREATE TABLE tracker_habits (
  tracker_id BIGINT UNSIGNED PRIMARY KEY,
  target_type ENUM('none','weekdays','frequency') NOT NULL DEFAULT 'none',
  weekdays JSON NULL,
  frequency_count SMALLINT NULL,
  frequency_period ENUM('day','week','month') NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  CONSTRAINT fk_tracker_habits_tracker FOREIGN KEY (tracker_id) REFERENCES trackers(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE progress_entries (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tracker_id BIGINT UNSIGNED NOT NULL,
  entry_number INT NOT NULL,
  entry_date DATE NOT NULL,
  title VARCHAR(150) NULL,
  note TEXT NULL,
  duration_minutes SMALLINT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  INDEX idx_progress_entries_tracker_date (tracker_id, entry_date),
  CONSTRAINT fk_progress_entries_tracker FOREIGN KEY (tracker_id) REFERENCES trackers(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE progress_media (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  progress_entry_id BIGINT UNSIGNED NOT NULL,
  type ENUM('image','video','link') NOT NULL,
  storage_disk VARCHAR(50) NULL,
  storage_key VARCHAR(500) NULL,
  external_url VARCHAR(2048) NULL,
  mime_type VARCHAR(100) NULL,
  size_bytes BIGINT NULL,
  caption VARCHAR(500) NULL,
  sort_order SMALLINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NULL DEFAULT NULL,
  INDEX idx_progress_media_entry_sort (progress_entry_id, sort_order),
  CONSTRAINT fk_progress_media_entry FOREIGN KEY (progress_entry_id) REFERENCES progress_entries(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- COMMUNITY
CREATE TABLE posts (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  progress_entry_id BIGINT UNSIGNED NOT NULL UNIQUE,
  user_id BIGINT UNSIGNED NOT NULL,
  tracker_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(150) NULL,
  content TEXT NULL,
  reactions_count INT NOT NULL DEFAULT 0,
  comments_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  INDEX idx_posts_created_at (created_at),
  INDEX idx_posts_user_created (user_id, created_at),
  INDEX idx_posts_tracker_created (tracker_id, created_at),
  CONSTRAINT fk_posts_entry FOREIGN KEY (progress_entry_id) REFERENCES progress_entries(id) ON DELETE CASCADE,
  CONSTRAINT fk_posts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_posts_tracker FOREIGN KEY (tracker_id) REFERENCES trackers(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE follows (
  follower_id BIGINT UNSIGNED NOT NULL,
  following_id BIGINT UNSIGNED NOT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (follower_id, following_id),
  INDEX idx_follows_following_created (following_id, created_at),
  CONSTRAINT fk_follows_follower FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_follows_following FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE reactions (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  post_id BIGINT UNSIGNED NOT NULL,
  type VARCHAR(20) NOT NULL COMMENT 'like | love | cheer | applaud | idea | sad',
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  UNIQUE KEY uq_reactions_user_post (user_id, post_id),
  INDEX idx_reactions_post_type (post_id, type),
  CONSTRAINT fk_reactions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_reactions_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE comments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  post_id BIGINT UNSIGNED NOT NULL,
  parent_id BIGINT UNSIGNED NULL,
  content TEXT NOT NULL,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  INDEX idx_comments_post_created (post_id, created_at),
  INDEX idx_comments_parent (parent_id),
  CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_comments_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  CONSTRAINT fk_comments_parent FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE blocks (
  blocker_id BIGINT UNSIGNED NOT NULL,
  blocked_id BIGINT UNSIGNED NOT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (blocker_id, blocked_id),
  CONSTRAINT fk_blocks_blocker FOREIGN KEY (blocker_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_blocks_blocked FOREIGN KEY (blocked_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE reports (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  reporter_id BIGINT UNSIGNED NOT NULL,
  target_type ENUM('post','comment','tracker','user') NOT NULL,
  target_id BIGINT UNSIGNED NOT NULL,
  reason ENUM('spam','inappropriate','harassment','other') NOT NULL,
  details VARCHAR(500) NULL,
  status ENUM('open','reviewed','dismissed') NOT NULL DEFAULT 'open',
  handled_by BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  INDEX idx_reports_status_created (status, created_at),
  INDEX idx_reports_target (target_type, target_id),
  CONSTRAINT fk_reports_reporter FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_reports_handler FOREIGN KEY (handled_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE notifications (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  actor_id BIGINT UNSIGNED NULL,
  type VARCHAR(30) NOT NULL COMMENT 'follow | reaction | comment | reply | deadline_soon | tracker_completed | streak_at_risk | recap_ready',
  reference_type VARCHAR(50) NULL,
  reference_id BIGINT UNSIGNED NULL,
  read_at TIMESTAMP NULL DEFAULT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  INDEX idx_notifications_user_read_created (user_id, read_at, created_at),
  INDEX idx_notifications_reference (reference_type, reference_id),
  CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_notifications_actor FOREIGN KEY (actor_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- AI AND SUBSCRIPTIONS
CREATE TABLE ai_summaries (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  tracker_id BIGINT UNSIGNED NULL,
  type ENUM('monthly_recap','progress_analysis') NOT NULL,
  period_start DATE NULL,
  period_end DATE NULL,
  content JSON NOT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  INDEX idx_ai_summaries_user_type_period (user_id, type, period_start),
  CONSTRAINT fk_ai_summaries_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_ai_summaries_tracker FOREIGN KEY (tracker_id) REFERENCES trackers(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE ai_usage (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  feature ENUM('writing_helper','recap','analysis','recommendations') NOT NULL,
  tokens INT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  INDEX idx_ai_usage_user_created (user_id, created_at),
  CONSTRAINT fk_ai_usage_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE subscriptions (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  plan ENUM('free','premium') NOT NULL DEFAULT 'free',
  status ENUM('active','cancelled','expired') NOT NULL DEFAULT 'active',
  started_at TIMESTAMP NULL DEFAULT NULL,
  expires_at TIMESTAMP NULL DEFAULT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  INDEX idx_subscriptions_user_status (user_id, status),
  CONSTRAINT fk_subscriptions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
