/*We now want the blogful_articles table to have a new column called style 
that corresponds to an enum type we'll call article_category */



CREATE TYPE article_category AS ENUM (
    'Listicle',
    'How-to',
    'News',
    'Interview',
    'Story'
);

ALTER TABLE blogful_articles
  ADD COLUMN
    style article_category;