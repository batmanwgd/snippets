DELIMITER //
    CREATE FUNCTION REWARDS(purchase_amount INT, customer_age INT)
      RETURNS INT(1)
      BEGIN
        DECLARE points INT(1);

        IF customer_age IS NULL OR purchase_amount < 1 THEN SET points = 2;
        ELSEIF purchase_amount < 100 THEN SET points = 5;
        ELSEIF purchase_amount >= 1000 AND customer_age < 5 THEN SET points = 20;
        ELSEIF purchase_amount >= 1000 AND customer_age >= 5 THEN SET points = 25;
        ELSEIF purchase_amount < 1000 AND customer_age >= 5 THEN SET points = 15;
        ELSE SET points = 10;
        END IF;

        RETURN points;
      END //
    DELIMITER ;
END;
