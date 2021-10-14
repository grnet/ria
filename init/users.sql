CREATE TABLE IF NOT EXISTS `user`(
    id INTEGER AUTO_INCREMENT,
    fname VARCHAR(100),
    lname VARCHAR(100),
    username VARCHAR(100),
    password VARCHAR(100),
    rolos VARCHAR(200),
    dikaiwmata_diaxeirisis VARCHAR(100),
    ypoyrgeio VARCHAR(100),
    createdAt VARCHAR(100),
    updatedAt VARCHAR(100),
    PRIMARY KEY (id)
)ENGINE=InnoDB;

INSERT INTO user VALUES 
(1,'Αρμόδιος','Αρμόδιος','armodios', '$2b$10$zkUv4I8gnII5tOIwmpWmR.wptJ8Nw693muLKbmrxK7aJG5Lxm2VgC', 'Αρμόδιος επισπεύδοντος Υπουργείου και άλλων συναρμόδιων Υπουργείων', '', 'Υπουργείο1', NOW(), NOW()),
(2,'Βουλευτής','Βουλευτής','vouleftis', '$2b$10$IYVkUmog9ng484WKP/.r5.36ul68SoRzs/PA2qqdc2zByBqge186O', 'Βουλευτής', '', 'Βουλή', NOW(), NOW()),
(3,'Βουλή','Βουλή','vouli', '$2b$10$rai7cAqFGvlDS2V0hPxHheoVjnRB1bxLvqOKhLqCaIhAhzDgKsocC', 'Βουλή', '', 'Βουλή', NOW(), NOW()),
(4,'Γενικό Λογιστήριο','Κράτους','genikolog', '$2b$10$9lpXKwKompF8ZHAjEt/vxeeChFz71NwpMW/bAwBJzPZ7MeITZfmo6', 'Γενικό Λογιστήριο του Κράτους', '', 'Υπουργείο1', NOW(), NOW()),
(5,'Γενικός Γραμματέας Νομικών','Κοινοβουλευτικών Θεμάτων','gengramnomikwn', '$2b$10$9USzrzTtgC51fjdMqoMnueetStr92mlwTH4.PTLLwpJqiPlbSpPkC', 'Γενικός Γραμματέας Νομικών και Κοινοβουλευτικών Θεμάτων', '1', 'Υπουργείο1', NOW(), NOW()),
(6,'Διεύθυνση Νομοπαρασκευαστικής','Διαδικασίας','dieuthinsinomopar', '$2b$10$8VYE0HkAqU7LRgCb3rma6e9j8YJarDPYO/6oUTuSy6IjKKgJKFRM.', 'Διεύθυνση Νομοπαρασκευαστικής Διαδικασίας (ΓΓΝΚΘ)', '', 'Υπουργείο1', NOW(), NOW()),
(7,'Επιτροπή Αξιολόγησης','Ποιότητας','epitropiaksiolog', '$2b$10$UEumY1R6HWawQ6HGxUT0UeTruB0VtKMRAoTHoQmtg8uyJj.0LP.2K', 'Επιτροπή Αξιολόγησης Ποιότητας της Νομοπαρασκευαστικής Διαδικασίας (ΓΓΝΚΘ)', '', 'Υπουργείο1', NOW(), NOW()),
(8,'Καλή Νομοθέτηση','Καλή Νομοθέτηση','kalinomothetisi', '$2b$10$xbn8eBWw0pq49yRzsGc4sOBfV0HAvnyN6LRLGZakJGO03sReNx6SS', 'Γραφείο Καλής Νομοθέτησης (ΓΓΝΚΘ)', '', 'Υπουργείο1', NOW(), NOW()),
(9,'Νομοπαρασκευαστική','Επιτροπή','nomoparaskeuastiki', '$2b$10$62YscmFbslJs7rwae8peh.ZR4fqQayEkOT/d6Ap0k37gT7.0xlQSq', 'Νομοπαρασκευαστική Επιτροπή (ΓΓΝΚΘ)', '1', 'Υπουργείο1', NOW(), NOW()),
(10,'Συντάκτης','Συντάκτης','syntaktis', '$2b$10$hcDOjbHxGWaTypEG24kPV.QXQYsi1wepufmT95aYkzIuxLUkZhp4K', 'Συντάκτης επισπεύδοντος Υπουργείου', '', 'Υπουργείο1', NOW(), NOW());