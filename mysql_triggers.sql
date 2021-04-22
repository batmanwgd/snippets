-- a trigger that adjusts the total number of published posts for a category when a row is updated in the posts table.
DELIMITER \$\$
    CREATE TRIGGER `blog_database`.`on_post_update`
    AFTER UPDATE ON `posts` FOR EACH ROW
    BEGIN
      IF OLD.published = 1 AND NEW.published != 1 THEN
        UPDATE `category` SET category.total_published = category.total_published - 1 WHERE category.id = NEW.category;
      ELSEIF OLD.published != 1 AND NEW.published = 1 THEN
        UPDATE `category` SET category.total_published = category.total_published + 1 WHERE category.id = NEW.category;
      END IF;
    END
END;
