CREATE TABLE IF NOT EXISTS `user`(
    id INTEGER AUTO_INCREMENT,
    taxId VARCHAR(100),
    fname VARCHAR(100),
    lname VARCHAR(100),
    username VARCHAR(100),
    password VARCHAR(100),
    role VARCHAR(200),
    isAdmin VARCHAR(100),
    agency VARCHAR(100),
    createdAt VARCHAR(100),
    updatedAt VARCHAR(100),
    PRIMARY KEY (id)
)ENGINE=InnoDB;

INSERT INTO user VALUES 
(1,'000000001','Αρμόδιος','Αρμόδιος','armodios', '$2b$10$zkUv4I8gnII5tOIwmpWmR.wptJ8Nw693muLKbmrxK7aJG5Lxm2VgC', 'Αρμόδιος επισπεύδοντος Υπουργείου και άλλων συναρμόδιων Υπουργείων', '', 'ΥΠΟΥΡΓΕΙΟ ΟΙΚΟΝΟΜΙΚΩΝ', NOW(), NOW()),
(2,'000000002','Βουλευτής','Βουλευτής','vouleftis', '$2b$10$IYVkUmog9ng484WKP/.r5.36ul68SoRzs/PA2qqdc2zByBqge186O', 'Βουλευτής', '', 'Βουλή', NOW(), NOW()),
(3,'000000003','Βουλή','Βουλή','vouli', '$2b$10$rai7cAqFGvlDS2V0hPxHheoVjnRB1bxLvqOKhLqCaIhAhzDgKsocC', 'Βουλή', '', 'Βουλή', NOW(), NOW()),
(4,'000000004','Γενικό Λογιστήριο','Κράτους','genikolog', '$2b$10$9lpXKwKompF8ZHAjEt/vxeeChFz71NwpMW/bAwBJzPZ7MeITZfmo6', 'Γενικό Λογιστήριο του Κράτους', '', 'ΥΠΟΥΡΓΕΙΟ ΟΙΚΟΝΟΜΙΚΩΝ', NOW(), NOW()),
(5,'000000005','Γενικός Γραμματέας Νομικών','Κοινοβουλευτικών Θεμάτων','gengramnomikwn', '$2b$10$9USzrzTtgC51fjdMqoMnueetStr92mlwTH4.PTLLwpJqiPlbSpPkC', 'Γενικός Γραμματέας Νομικών και Κοινοβουλευτικών Θεμάτων', 'on', 'ΥΠΟΥΡΓΕΙΟ ΟΙΚΟΝΟΜΙΚΩΝ', NOW(), NOW()),
(6,'000000006','Διεύθυνση Νομοπαρασκευαστικής','Διαδικασίας','dieuthinsinomopar', '$2b$10$8VYE0HkAqU7LRgCb3rma6e9j8YJarDPYO/6oUTuSy6IjKKgJKFRM.', 'Διεύθυνση Νομοπαρασκευαστικής Διαδικασίας (ΓΓΝΚΘ)', '', 'ΥΠΟΥΡΓΕΙΟ ΟΙΚΟΝΟΜΙΚΩΝ', NOW(), NOW()),
(7,'000000007','Επιτροπή Αξιολόγησης','Ποιότητας','epitropiaksiolog', '$2b$10$xAevSzdETvNydjzsgK37.OBlSVmAZha4FIETwBTzk5A93kFHHdOPe', 'Επιτροπή Αξιολόγησης Ποιότητας της Νομοπαρασκευαστικής Διαδικασίας (ΓΓΝΚΘ)', '', 'ΥΠΟΥΡΓΕΙΟ ΟΙΚΟΝΟΜΙΚΩΝ', NOW(), NOW()),
(8,'000000008','Καλή Νομοθέτηση','Καλή Νομοθέτηση','kalinomothetisi', '$2b$10$xbn8eBWw0pq49yRzsGc4sOBfV0HAvnyN6LRLGZakJGO03sReNx6SS', 'Γραφείο Καλής Νομοθέτησης (ΓΓΝΚΘ)', '', 'ΥΠΟΥΡΓΕΙΟ ΟΙΚΟΝΟΜΙΚΩΝ', NOW(), NOW()),
(9,'000000009','Νομοπαρασκευαστική','Επιτροπή','nomoparaskeuastiki', '$2b$10$62YscmFbslJs7rwae8peh.ZR4fqQayEkOT/d6Ap0k37gT7.0xlQSq', 'Νομοπαρασκευαστική Επιτροπή (ΓΓΝΚΘ)', 'on', 'ΥΠΟΥΡΓΕΙΟ ΟΙΚΟΝΟΜΙΚΩΝ', NOW(), NOW()),
(10,'000000010','Συντάκτης','Συντάκτης','syntaktis', '$2b$10$hcDOjbHxGWaTypEG24kPV.QXQYsi1wepufmT95aYkzIuxLUkZhp4K', 'Συντάκτης επισπεύδοντος Υπουργείου', '', 'ΥΠΟΥΡΓΕΙΟ ΟΙΚΟΝΟΜΙΚΩΝ', NOW(), NOW()),
(11,'100365110','Βουλευτής','Βουλευτής (oauth2)','100365110', '$2b$10$hcDOjbHxGWaTypEG24kPV.QXQYsi1wepufmT95aYkzIuxLUkZhp4K', 'Βουλευτής', '', 'Βουλή', NOW(), NOW()),
(12,'660074100','Διεύθυνση Νομοπαρασκευαστικής','Διαδικασίας (oauth2)','660074100', '$2b$10$hcDOjbHxGWaTypEG24kPV.QXQYsi1wepufmT95aYkzIuxLUkZhp4K', 'Διεύθυνση Νομοπαρασκευαστικής Διαδικασίας (ΓΓΝΚΘ)', '', 'ΥΠΟΥΡΓΕΙΟ ΟΙΚΟΝΟΜΙΚΩΝ', NOW(), NOW()),
(13,'660074111','Συντάκτης','Συντάκτης (oauth2)','660074111', '$2b$10$hcDOjbHxGWaTypEG24kPV.QXQYsi1wepufmT95aYkzIuxLUkZhp4K', 'Συντάκτης επισπεύδοντος Υπουργείου', '', 'ΥΠΟΥΡΓΕΙΟ ΟΙΚΟΝΟΜΙΚΩΝ', NOW(), NOW());
