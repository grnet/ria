CREATE TABLE IF NOT EXISTS `indexes`(    
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(300),
    indexTableId INTEGER,
    createdAt VARCHAR(100),
    updatedAt VARCHAR(100),
    PRIMARY KEY (id)
)ENGINE=InnoDB;

INSERT INTO indexes VALUES 
(1,'Ποσοστό αποφοίτων γ ́βαθμιας εκπαίδευσης που βρίσκουν εργασία στον τομέα των σπουδών τους εντός 6 μηνών από την έναρξη αναζήτησης',1,NOW(), NOW()),
(2,'Αριθμός πιστοποιημένων Πανεπιστημιακών σχολών (ISO κλπ)',1,NOW(), NOW()),
(3,'Αριθμός συμμετοχών σε προγράμματα Έρευνας, Τεχνολογίας & Καινοτομίας (διεθνή & εθνικά), ανά Πανεπιστημιακή Σχολή',1,NOW(), NOW()),
(4,'Αριθμός έργων/μελετών που έχουν ανατεθεί από τον ιδιωτικό τομέα, ανά Πανεπιστημιακή / Τεχνολογική Σχολή',1,NOW(), NOW()),
(5,'Δαπάνη ανά φοιτητή τριτοβάθμιας εκπαίδευσης ανά ΑΕΙ',1,NOW(), NOW()),
(6,'Ποσοστό ενηλίκων (στο σύνολο του ενεργού πληθυσμού) που συμμετέχουν σε προγράμματα δια βίου εκπαίδευσης',1,NOW(), NOW()),
(7,'Ποσοστό αναλφάβητων/σύνολο πληθυσμού',1,NOW(), NOW()),
(8,'Αριθμός ατόμων που εγκαταλείπουν το σχολείο πριν την ολοκλήρωση της β’ βάθμιας και α’ βάθμιας εκπαίδευσης / έτος',1,NOW(), NOW()),
(9,'Αριθμός δια-πολιτισμικών σχολείων ανά Περιφέρεια (ποσοστό μαθητών στο σύνολο των μαθητών) που φοιτούν σε διαπολιτισμικά σχολεία',1,NOW(), NOW()),
(10,'Ποσοστό αλλοδαπών μαθητών στο σύνολο (των μαθητών) – Κατανομή ανά περιφέρεια',1,NOW(), NOW()),
(11,'Αριθμός ολοήμερων / απογευματινών σχολείων και αριθμός μαθητών που φοιτούν σε αυτά',1,NOW(), NOW()),
(12,'Μέσος όρος καθηγητών / σύνολο μαθητών',1,NOW(), NOW()),
(13,'Μέσος όρος Η/Υ / σύνολο μαθητών',1,NOW(), NOW()),
(14,'Αριθμός μαθητών που επωφελούνται από προγράμματα ενισχυτικής εκπαίδευσης / έτος',1,NOW(), NOW()),
(15,'Δαπάνη ανά μαθητή ανά βαθμίδα (Αθμια, Βθμια) εκπαίδευσης',1,NOW(), NOW()),
(16,'Πραγματοποιηθείσες ανασκαφές, κατά είδος και αποτελέσματα, και αριθμός ευρημάτων',2,NOW(), NOW()),
(17,'Χρηματοδοτήσεις ανασκαφών, κατά φορέα, και ποσά που διατέθηκαν',2,NOW(), NOW()),
(18,'Χρηματοδοτήσεις ανασκαφών, κατά φορέα, και ποσά που διατέθηκαν',2,NOW(), NOW()),
(19,'Κήρυξη αρχαιολογικών χώρων, μνημείων, παραδοσιακών και ιστορικών οικισμών',2,NOW(), NOW()),
(20,'Πραγματοποιηθείσες απαλλοτριώσεις και καταβληθείσες αποζημιώσεις, για ακίνητα αρχαιολογικού ενδιαφέροντος',2,NOW(), NOW()),
(21,'Δαπάνες έργων που έχουν εκτελεσθεί σε μνημεία και αρχαιολογικούς χώρους, και δαπάνες έργων που βρίσκονται σε εξέλιξη',2,NOW(), NOW()),
(22,'Δαπάνες έργων που έχουν εκτελεσθεί σε μουσεία και λοιπά κτίρια και δαπάνες έργων που βρίσκονται σε εξέλιξη',2,NOW(), NOW()),
(23,'Αριθμός βιβλιοθηκών κατά νομική μορφή και είδος βιβλιοθήκης, ανάλογα με το θέμα, κατά γεωγραφικό διαμέρισμα',2,NOW(), NOW()),
(24,'Ακαθάριστο εγχώριο προϊόν σε αγοραίες τιμές (δισ.)',3,NOW(), NOW()),
(25,'Ρυθμός μεταβολής ΑΕΠ σε σταθερές τιμές',3,NOW(), NOW()),
(26,'Ισοζύγιο τρεχουσών συναλλαγών (% ΑΕΠ)',3,NOW(), NOW()),
(27,'Ισοζύγιο γενικής κυβέρνησης (χωρίς τις τράπεζες, % ΑΕΠ)',3,NOW(), NOW()),
(28,'Χρέος γενικής κυβέρνησης (κατά Μάαστριχτ, % ΑΕΠ)',3,NOW(), NOW()),
(29,'Πρωτογενές πλεόνασμα (ως % ΑΕΠ)',3,NOW(), NOW()),
(30,'Εναρμονισμένος Δείκτης Τιμών Καταναλωτή',3,NOW(), NOW()),
(31,'Φορολογικά έσοδα ως ποσοστό του ΑΕΠ',4,NOW(), NOW()),
(32,'Αναλογία άμεσης και έμμεσης φορολογίας',4,NOW(), NOW()),
(33,'Ποσά που εισπράττονται μέχρι σήμερα από τον φόρο ή τους φόρους στους οποίους αφορούν οι διατάξεις του νομοσχεδίου',4,NOW(), NOW()),
(34,'Ποσά που εισπράχθηκαν από φορολογικούς ελέγχους',4,NOW(), NOW()),
(35,'Ποσοστό πράξεων διοικητικού προσδιορισμού φόρου ή επιβολής προστίμων που ακυρώθηκαν εν μέρει ή εν όλω από τα δικαστήρια',4,NOW(), NOW()),
(36,'Αριθμός επιχειρησιακών, κλαδικών και ομοιοεπαγγελματικών συμβάσεων (και ε.γ.σ.σ.ε. εάν συνήφθη το συγκεκριμένο έτος) και αριθμός/ποσοστό εργαζομένων που καλύπτονται από αυτές',5,NOW(), NOW()),
(37,'Αριθμός/ποσοστό σ.σ.ε. που συνήφθησαν χωρίς προσφυγή σε διαμεσολάβηση',5,NOW(), NOW()),
(38,'Αριθμός/ποσοστό σ.σ.ε. που συνήφθησαν χωρίς προσφυγή σε διαιτησία',5,NOW(), NOW()),
(39,'Μέσος χρόνος ολοκλήρωσης διαδικασίας μεσολάβησης',5,NOW(), NOW()),
(40,'Μέσος χρόνος ολοκλήρωσης διαδικασίας διαιτησίας',5,NOW(), NOW()),
(41,'Μέση διάρκεια σ.σ.ε. (προβλεπόμενη στα σχετικά κείμενα αλλά και πραγματική με την έννοια της παράτασης μετά τη συμβατική τους λήξη)',5,NOW(), NOW()),
(42,'Ώρες εργασίας ανά ημέρα, εβδομάδα και ανά κλάδο οικονομίας',5,NOW(), NOW()),
(43,'Αριθμός αμειβόμενων υπερωριών (που δηλώθηκαν) ανά εργαζόμενο και κλάδο οικονομίας',5,NOW(), NOW()),
(44,'Αριθμός ατυχημάτων ανά κλάδο οικονομίας και αριθμός/ποσοστό ατυχημάτων που προκάλεσαν θάνατο ή αναπηρία',5,NOW(), NOW()),
(45,'Ποσοστό ανεργίας',6,NOW(), NOW()),
(46,'Ποσοστό μακροχρόνια ανέργων',6,NOW(), NOW()),
(47,'Ποσοστό ανεργίας νέων',6,NOW(), NOW()),
(48,'Ποσοστό ανεργίας γυναικών',6,NOW(), NOW()),
(49,'Ποσοστό ανεργίας ανά γεωγραφική περιφέρεια',6,NOW(), NOW()),
(50,'Ποσοστό ανεργίας βάσει μορφωτικού επιπέδου',6,NOW(), NOW()),
(51,'Δείκτης απασχόλησης / Δείκτης ωρών εργασίας / Δείκτης αμοιβών (ανά βασικό τομέα της οικονομίας π.χ. μεταποίηση, κατασκευές κ.λπ.)',6,NOW(), NOW()),
(52,'Μερική απασχόληση ως ποσοστό της συνολικής απασχόλησης (στο σύνολο του πληθυσμού και ειδικότερα για νέους)',6,NOW(), NOW()),
(53,'Ποσοστό απασχολουμένων με σύμβαση ορισμένου χρόνου (στο σύνολο του πληθυσμού και ειδικότερα για νέους)',6,NOW(), NOW()),
(54,'Πραγματικό ύψος συντάξεων ανά ασφαλιστική ομάδα (μισθωτοί του ιδιωτικού τομέα, δημόσιοι υπάλληλοι, επαγγελματίες και έμποροι, αγρότες) και ανά έτη συνολικής ασφάλισης και αντίστοιχες δαπάνες',7,NOW(), NOW()),
(55,'Ύψος ασφαλιστικών εισφορών ανά ασφαλιστική ομάδα (μισθωτοί του ιδιωτικού τομέα, δημόσιοι υπάλληλοι, επαγγελματίες και έμποροι, αγρότες) και αντίστοιχα έσοδα του ΕΦΚΑ<',7,NOW(), NOW()),
(56,'Ηλικία (πραγματική) συνταξιοδότησης ανά πληθυσμιακή ομάδα και έτη συνολικής ασφάλισης',7,NOW(), NOW()),
(57,'Μέσος χρόνος απονομής σύνταξης',7,NOW(), NOW()),
(58,'Ποσοστό συνταξιοδοτικής δαπάνης επί του ΑΕΠ',7,NOW(), NOW()),
(59,'Ποσοστό προσφυγών σχετικά με την απονομή σύνταξης που γίνονται εν μέρει ή εν όλω δεκτές',7,NOW(), NOW()),
(60,'Ποσοστό πληθυσμού σε καθεστώς φτώχειας, σε κίνδυνο φτώχειας ή σε κοινωνικό αποκλεισμό',8,NOW(), NOW()),
(61,'Ποσοστό υλικής στέρησης σε τέσσερα ή περισσότερα βασικά αγαθά ή υπηρεσίες',8,NOW(), NOW()),
(62,'Ποσοστό νοικοκυριών στο σύνολο του πληθυσμού που αντιμετωπίζουν δυσκολία αντιμετώπισης έκτακτων αναγκών',8,NOW(), NOW()),
(63,'Ποσοστό πληθυσμού που λαμβάνει επιδόματα και η αντίστοιχη κρατική δαπάνη (συνολικά και ανά επίδομα)',8,NOW(), NOW()),
(64,'Αριθμός παιδιών σε ορφανοτροφεία',8,NOW(), NOW()),
(65,'Αριθμός αστέγων (εκτίμηση) που σιτίζονται από δήμους και άλλες υπηρεσίες',8,NOW(), NOW()),
(66,'Ποσοστό πληθυσμού που μένει σε προσωρινή μορφή κατοικίας λόγω κρίσης (π.χ. σεισμός, πυρκαγιά)',8,NOW(), NOW()),
(67,'Κόστος κατ’ άτομο ανά πρόγραμμα φροντίδας (μητρότητας, δυσκολίες μάθησης κλπ)',8,NOW(), NOW()),
(68,'Αριθμός εσωτερικών / εξωτερικών ασθενών ανά έτος',9,NOW(), NOW()),
(69,'Ποσοστά παιδικής θνησιμότητας',9,NOW(), NOW()),
(70,'Συνολικές δαπάνες υγείας κατά κεφαλή',9,NOW(), NOW()),
(71,'Δαπάνες φαρμάκων κατά κεφαλή',9,NOW(), NOW()),
(72,'Αριθμός ιατρών ανά 1000 κατοίκους',9,NOW(), NOW()),
(73,'Αριθμός νοσοκομειακών κλινών ανά 1000 κατοίκους',9,NOW(), NOW()),
(74,'Μέση διάρκεια επείγουσας νοσηλείας',9,NOW(), NOW()),
(75,'Ειδικές νοσηλευτικές υπηρεσίες: εσωτερικοί ασθενείς (απόλυτος αριθμός και ανά διαθέσιμο κρεβάτι), μέση παραμονή, περίθαλψη εξωτερικών ασθενών (εξωτερικά ιατρεία και επείγοντα περιστατικά)',9,NOW(), NOW()),
(76,'Αριθμός νοσηλειών ανά 1000 κατοίκους',9,NOW(), NOW()),
(77,'Αριθμός κλινών ανά νοσηλευτική υπηρεσία',9,NOW(), NOW()),
(78,'Ποσοστό απασχόλησης ανά φύλο συνολικά',10,NOW(), NOW()),
(79,'Ποσοστό απασχόλησης ανά φύλο ανά περιφέρεια',10,NOW(), NOW()),
(80,'Ποσοστό απασχόλησης ανά φύλο ανά κλάδο οικονομίας',10,NOW(), NOW()),
(81,'Ποσοστό απασχόλησης ανά φύλο ανά ηλικιακή ομάδα',10,NOW(), NOW()),
(82,'Ποσοστό ανεργίας ανά φύλο συνολικά',10,NOW(), NOW()),
(83,'Ποσοστό ανεργίας ανά φύλο ανά περιφέρεια',10,NOW(), NOW()),
(84,'Ποσοστό ανεργίας ανά φύλο ανά κλάδο οικονομίας',10,NOW(), NOW()),
(85,'Ποσοστό ανεργίας ανά φύλο ανά ηλικιακή ομάδα',10,NOW(), NOW()),
(86,'Ποσοστό αυτοαπασχολούμενων ανά φύλο',10,NOW(), NOW()),
(87,'Ποσοστό εργοδοτών ανά φύλο',10,NOW(), NOW()),
(88,'Ποσοστό μελών Δ.Σ. εταιρειών ανά φύλο',10,NOW(), NOW()),
(89,'Ποσοστό μελών Κοινοβουλίου, περιφερειακών και δημοτικών συμβουλίων ανά φύλο',10,NOW(), NOW()),
(90,'Αιτήματα ασύλου – Ποσοστό αποδοχής – Μέσος χρόνος έκδοσης αποφάσεων',11,NOW(), NOW()),
(91,'Μεταναστευτικές ροές ανά πύλη εισόδου/χώρα προέλευσης/ ηλικιακή ομάδα/φύλο',11,NOW(), NOW()),
(92,'Αριθμός απελάσεων ανά χώρα προέλευσης των απελαυνομένων/αιτία απέλασης',11,NOW(), NOW()),
(93,'Μονάδες φιλοξενίας μεταναστών (σχέση δυναμικότητας και πραγματικού αριθμού φιλοξενουμένων)',11,NOW(), NOW()),
(94,'Περιστατικά φιλοξενίας και είδος παραβατικότητας ανά μονάδα',11,NOW(), NOW()),
(95,'Αριθμός δημοσίων υπαλλήλων',12,NOW(), NOW()),
(96,'Αριθμός/ποσοστό α) μονίμων/ιδαχ β) ιδοχ και γ) μετακλητών υπαλλήλων',12,NOW(), NOW()),
(97,'Αναλογία υπαλλήλων ανά τμήμα, διεύθυνση, γενική διεύθυνση',12,NOW(), NOW()),
(98,'Ποσοστό υπαλλήλων με πρόσβαση στο INTERNET',12,NOW(), NOW()),
(99,'Αριθμός υπηρεσιών με εσωτερική δικτύωση (intranet)',12,NOW(), NOW()),
(100,'Αναλογία Η/Υ ανά θέση εργασίας',12,NOW(), NOW()),
(101,'Αριθμός ιστοσελίδων δημόσιων υπηρεσιών και φορέων/ σύνολο δημοσίων υπηρεσιών και φορέων',12,NOW(), NOW()),
(102,'Αριθμός κέντρων πληροφόρησης πολιτών, σε κεντρικό, περιφερειακό, νομαρχιακό και τοπικό επίπεδο καθώς και σε επίπεδο νομικών προσώπων, οργανισμών κλπ',12,NOW(), NOW()),
(103,'Αριθμός ατόμων που εξυπηρετούνται από τις δημόσιες υπηρεσίες ανά έτος και ανά υπηρεσία',12,NOW(), NOW()),
(104,'Κόστος προσωπικού (δαπάνες μισθοδοσίας και πρόσθετες δαπάνες ως ποσοστό επί της συνολικής δαπάνης ανά υπουργείο)',12,NOW(), NOW()),
(105,'Κόστος διαχείρισης θεμάτων προσωπικού: δαπάνες μονάδων προσωπικού ως ποσοστό της συνολικής δαπάνης ανά υπουργείο',12,NOW(), NOW()),
(106,'Διαπραχθέντα αδικήματα, δράστες αδικημάτων και αναλογία ανά 100.000 κατοίκους',13,NOW(), NOW()),
(107,'Αδικήματα Ποινικού Κώδικα κατά κατηγορίες και κατά γεωγραφική περιοχή',13,NOW(), NOW()),
(108,'Διαπραχθέντα αδικήματα και θεωρούμενοι ως δράστες αυτών κατά εθνικότητα, φύλο και τάξεις ηλικιών',13,NOW(), NOW()),
(109,'Ετήσια στατιστική απεικόνιση των αδικημάτων και αξιόποινων συμπεριφορών που προκαλούν το κοινό αίσθημα (ανθρωποκτονίες, ληστείες, κλοπές – διαρρήξεις)',13,NOW(), NOW()),
(110,'Αδικήματα που αφορούν στην παράνομη είσοδο και παραμονή στη χώρα',13,NOW(), NOW()),
(111,'Συχνότητα εγκλημάτων ανά τύπο εγκλήματος',13,NOW(), NOW()),
(112,'Ποσοστό εγκληματικών περιπτώσεων που εξιχνιάστηκαν στο σύνολο των εγκλημάτων',13,NOW(), NOW()),
(113,'Σύνολο εργαζομένων στη δημόσια ασφάλεια',13,NOW(), NOW()),
(114,'Αριθμός κατοίκων ανά αστυνομικό, ανά αστυνομικό τμήμα και ανά περιοχή αστυνόμευσης',13,NOW(), NOW()),
(115,'Αναλογία αστυνομικών ανά 1000 κατοίκους – αναλογία κατοίκων ανά αστυνομικό τμήμα και περιοχή αστυνόμευσης',13,NOW(), NOW()),
(116,'Κατά κεφαλή καθαρές δαπάνες για αστυνομικές υπηρεσίες',13,NOW(), NOW()),
(117,'Κατανομή πόρων για την αντιμετώπιση της παραβατικής συμπεριφοράς ανά τομείς (π.χ. εγκλήματα βίας, οικονομικά εγκλήματα, ναρκωτικά, τροχαία, κλοπές, τρομοκρατία)',13,NOW(), NOW()),
(118,'Αριθμός εισερχόμενων αστικών, εργατικών και εμπορικών διαφορών',14,NOW(), NOW()),
(119,'Αριθμός εισερχόμενων διοικητικών περιπτώσεων',14,NOW(), NOW()),
(120,'Συνολικός χρόνος που απαιτείται για την επίλυση αστικών, εμπορικών, εργατικών, διοικητικών και άλλων υποθέσεων',14,NOW(), NOW()),
(121,'Μέσος χρόνος έκδοσης δικαστικών αποφάσεων (Ειρηνοδικεία, Πρωτοδικεία, Εφετεία, Άρειος Πάγος/Συμβούλιο Επικρατείας)',14,NOW(), NOW()),
(122,'Μέσος όρος των υποθέσεων ανά δικαστή (ποινικά, πολιτικά και διοικητικά δικαστήρια)',14,NOW(), NOW()),
(123,'Ποσοστό δικαστικών αποφάσεων που ακυρώνονται μετά από έφεση ή αναίρεση',14,NOW(), NOW()),
(124,'Αριθμός υποθέσεων που επιλύονται με το σύστημα του εξωδικαστικού συμβιβασμού',14,NOW(), NOW()),
(125,'Αξιοποίηση εναλλακτικών μεθόδων επίλυσης διαφορών, πχ. διαμεσολάβηση',14,NOW(), NOW()),
(126,'Στήριξη των ατόμων που χρήζουν προστασίας αλλά δεν διαθέτουν πόρους (νομική προστασία)',14,NOW(), NOW()),
(127,'Κόστος προσφυγής στη δικαιοσύνη',14,NOW(), NOW()),
(128,'Ποσοστό ηλεκτρονικής υποβολής δικογράφων',14,NOW(), NOW()),
(129,'Ποσοστό διεκπεραιουμένων κατ’ έτος υποθέσεων έναντι εκκρεμών (σε ετήσια και συνολική βάση εκκρεμοτήτων)',14,NOW(), NOW()),
(130,'Ποσοστό ποινικών υποθέσεων, σε ετήσια βάση, για τις οποίες επιβλήθηκαν ποινές μετατρέψιμες σε χρήμα',14,NOW(), NOW()),
(131,'Μέσο κόστος σωφρονιστικού συστήματος ανά κρατούμενο',14,NOW(), NOW()),
(132,'Αναλογία προσωπικού φύλαξης (φυλάκων) ανά κρατούμενο',14,NOW(), NOW()),
(133,'Δείκτης παγκόσμιας ανταγωνιστικότητας',15,NOW(), NOW()),
(134,'Επενδύσεις ως % ΑΕΠ',15,NOW(), NOW()),
(135,'Άμεσες ξένες επενδύσεις ως % ΑΕΠ',15,NOW(), NOW()),
(136,'Αριθμός επιχειρήσεων που ανοίγουν ανά κλάδο και περιφέρεια και αντίστοιχος αριθμός απασχολουμένων σε αυτές',15,NOW(), NOW()),
(137,'Αριθμός επιχειρήσεων που κλείνουν ανά κλάδο και περιφέρεια και αντίστοιχος αριθμός απασχολουμένων σε αυτές',15,NOW(), NOW()),
(138,'Διοικητικό κόστος σύστασης επιχειρήσεων',15,NOW(), NOW()),
(139,'Μέσος χρόνος σύστασης επιχειρήσεων',15,NOW(), NOW()),
(140,'Μονάδες - Ετήσιες εκπομπές αερίων ατμοσφαιρικής ρύπανσης κατά κεφαλή',16,NOW(), NOW()),
(141,'Ποσοστό του πληθυσμού που εξυπηρετείται από βιολογικούς καθαρισμούς',16,NOW(), NOW()),
(142,'Ποσοστό των ακτών που κρίνονται κατάλληλες για κολύμβηση σε σχέση με το σύνολο των δυνάμενων να χρησιμοποιηθούν ακτών',16,NOW(), NOW()),
(143,'Αριθμός ελέγχων καταλληλότητας δικτύου ύδρευσης κατ’ έτος',16,NOW(), NOW()),
(144,'Ποσοστό οικιακών & βιομηχανικών απορριμμάτων που διατέθηκαν σε άλλες χρήσεις (π.χ. ανακύκλωση, παραγωγή ενέργειας, λιπασματοποίηση)',16,NOW(), NOW()),
(145,'Ποσοστό διατιθέμενων απορριμμάτων σε ΧΥΤΑ',16,NOW(), NOW()),
(146,'Ποσοστό δασικών εκτάσεων που καταστράφηκαν από πυρκαγιά / σύνολο δασικών εκτάσεων',16,NOW(), NOW()),
(147,'Ποσοστό αναδασωθεισών (με φυσικό ή τεχνητό τρόπο) εκτάσεων / σύνολο κατεστραμμένων δασών από πυρκαγιές',16,NOW(), NOW()),
(148,'Ποσοστό προστατευόμενων περιοχών σε σχέση με την συνολική έκταση της χώρας',16,NOW(), NOW()),
(149,'Ποσοστό του προϋπολογισμού που διατίθεται για θέματα προστασίας περιβάλλοντος',16,NOW(), NOW()),
(150,'Κατανάλωση ενέργειας κατά κεφαλή',16,NOW(), NOW()),
(151,'Κατανάλωση ενέργειας ανά μορφή ενέργειας',16,NOW(), NOW()),
(152,'Κατανάλωση ενέργειας από ανανεώσιμες πηγές ενέργειας κατά κεφαλή',16,NOW(), NOW()),
(153,'Ποσοστά μείωσης εκπομπών αερίων θερμοκηπίου ανά τριετία',16,NOW(), NOW());