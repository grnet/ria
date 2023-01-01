CREATE TABLE IF NOT EXISTS `index_tables`(    
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(100),
    createdAt VARCHAR(100),
    updatedAt VARCHAR(100),
    PRIMARY KEY (id)
)ENGINE=InnoDB;

INSERT INTO index_tables VALUES 
(1,'ΕΚΠΑΙΔΕΥΣΗ',NOW(), NOW()),
(2,'ΠΟΛΙΤΙΣΜΟΣ',NOW(), NOW()),
(3,'ΟΙΚΟΝΟΜΙΑ',NOW(), NOW()),
(4,'ΦΟΡΟΛΟΓΙΑ',NOW(), NOW()),
(5,'ΕΡΓΑΣΙΑΚΕΣ ΣΧΕΣΕΙΣ',NOW(), NOW()),
(6,'ΑΠΑΣΧΟΛΗΣΗ',NOW(), NOW()),
(7,'ΚΟΙΝΩΝΙΚΗ ΑΣΦΑΛΙΣΗ',NOW(), NOW()),
(8,'ΚΟΙΝΩΝΙΚΗ ΠΡΟΝΟΙΑ',NOW(), NOW()),
(9,'ΥΓΕΙΑ',NOW(), NOW()),
(10,'ΙΣΟΤΗΤΑ ΦΥΛΩΝ',NOW(), NOW()),
(11,'ΜΕΤΑΝΑΣΤΕΥΤΙΚΗ-ΠΡΟΣΦΥΓΙΚΗ ΠΟΛΙΤΙΚΗ',NOW(), NOW()),
(12,'ΔΗΜΟΣΙΑ ΔΙΟΙΚΗΣΗ',NOW(), NOW()),
(13,'ΔΗΜΟΣΙΑ ΑΣΦΑΛΕΙΑ',NOW(), NOW()),
(14,'ΔΙΚΑΙΟΣΥΝΗ',NOW(), NOW()),
(15,'ΕΠΙΧΕΙΡΗΜΑΤΙΚΗ/ΕΠΕΝΔΥΤΙΚΗ ΔΡΑΣΤΗΡΙΟΤΗΤΑ',NOW(), NOW()),
(16,'ΠΕΡΙΒΑΛΛΟΝ – ΕΝΕΡΓΕΙΑ',NOW(), NOW());

