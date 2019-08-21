/* need to ALTER the table before it can remove the TYPE. */

ALTER TABLE blogful_articles DROP COLUMN IF EXISTS style;

DROP TYPE IF EXISTS article_category;

