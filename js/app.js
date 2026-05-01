// // --- STATE -----------------------------------------------
var isDark=false, tab='clients', lang='sr';
var eCid=null, eRcid=null, ePid=null, eGid=null, eSlotId=null;
var sPid=null, rPid=null, pkgTy='p', rStat='active';
var gColor='#cc2200', sltCid=null, filterGrp='', finPer='mesec';
var calY=new Date().getFullYear(), calM=new Date().getMonth(), weekOff=0;

var pkgs=[], clients=[], sessions=[], groups=[], slots=[];
var GCOLS=['#cc2200','#1a7a2e','#1a56db','#9333ea','#059669','#d97706','#0891b2','#be185d','#374151'];
var HOURS=['06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'];
var DEFAULT_WA='Zdravo {ime}! 👋\n\nPodsetnik: paket *{paket}* ističe za *{dani} dana* ({datum}).\n\nCena produžetka: *€{cena}*\n\nJavi se! 💪\n– StamenicFitt';

var TL={p:'Personalni',s:'Polu-pers.',g:'Grupni'};
var TC={p:'tcp',s:'tcs',g:'tcg'};
var DAYS_SR=['Pon','Uto','Sre','Čet','Pet','Sub','Ned'];
var DAYS_EN=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
var DAYS_RU=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];

// // --- TRANSLATIONS -----------------------------------------
var TR={
  sr:{
    clients:'Klijenti',packages:'Paketi',groups:'Grupe',schedule:'Raspored',
    finance:'Finansije',whatsapp:'WhatsApp',archive:'Arhiva',settings:'Podešavanja',
    today:'Danas',active:'Aktivni',search:'🔍 Pretraži...',
    renew:'Produži',edit:'Izmeni',archiveBtn:'Arhiviraj',activate:'✓ Aktiviraj',delForever:'Obriši trajno',
    noPackage:'Bez paketa',sessions:'treninga',
    expToday:'Paket ističe DANAS!',expTomorrow:'Paket ističe sutra!',expDays:'Paket ističe za ',days:' dana',
    doneMsg:'🎉 Svi termini iskorišćeni! Produži paket.',
    trainedAt:'✓ Trenirao u ',trainRemoved:'Trening uklonjen',
    renewed:'✓ Produženo ',
    statusActive:'Aktivan',statusDue:'Dospelo',statusOverdue:'Kasni',statusPaused:'Pauza',statusArch:'Arhiviran',
    noClients:'Nema klijenata.\nDodaj prvog klijenta!',
    noPackages:'Nema paketa. Dodaj prvi!',
    noGroups:'Nema grupa. Napravi prvu!',
    noArchived:'Nema arhiviranih klijenata.',
    archDesc:'Arhivirani klijenti su sačuvani. Možeš ih aktivirati u bilo kom trenutku.',
    expiringSoon:'⚠️ Paketi ističu uskoro',completedPkgs:'✅ Iskorišćeni paketi',expiredTitle:'❌ Istekla članarina',
    thisWeek:'Danas',prevWeek:'← Prethodna',nextWeek:'Sledeća →',
    addSlot:'Dodaj termin',editSlot:'Izmeni termin',slotSaved:'Termin sačuvan!',slotDeleted:'Termin obrisan.',
    noSlotClient:'Izaberi klijenta!',confirmSlot:'Obrisati termin?',
    finTitle:'Finansije',monthRev:'Prihod ovog meseca',avgMonth:'Prosek / mesec',
    totalPeriod:'Ukupno u periodu',yearProj:'Godišnja projekcija',
    revPerMonth:'Prihod po mesecu',revPerClient:'Prihod po klijentu',revPerPkg:'Prihod po paketu',
    activeClients:' aktivnih klijenata',noData:'Nema podataka.',
    per1:'1 mesec',per3:'3 meseca',per6:'6 meseci',perY:'Godina',
    waTitle:'WhatsApp',waExpiring:'Klijenti kojima ističe paket u 14 dana:',waAll:'Poruke za sve klijente:',
    noWaClients:'Nema klijenata sa aktivnim paketima.',openWA:'📲 Otvori WhatsApp',copy:'Kopiraj',copied:'✓ Kopirano!',
    darkMode:'Tamni mod',darkSub:'Crna pozadina, crveni akcenti',
    trainerName:'Naziv trenera',trainerSub:'Prikazuje se u WhatsApp porukama',
    langLabel:'Jezik / Language',waTplLabel:'WhatsApp šablon',waTplSub:'Prilagodi tekst',
    notifLabel:'Notifikacije',notifSub:'Upozorenje kad paket ističe',enable:'Uključi',
    clearData:'Obriši sve podatke',clearSub:'Briše sve klijente i treninge',del:'Obriši',
    version:'StamenicFitt Tracker v4.0',verSub:'Podaci sačuvani lokalno na telefonu',
    signedInAs:'Prijavljen kao',signOutBtn:'Odjavi se',
    trainingLogged:'Trening unesen!',emptyText:'Upiši tekst!',syncedFromDevice:'🔄 Sinhronizovano sa drugog uređaja',
    saved:'Sačuvano!',groupSaved:'Grupa sačuvana!',groupDel:'Grupa obrisana.',clientRemoved:'Klijent uklonjen iz grupe.',
    pkgSaved:'Paket sačuvan!',pkgDel:'Paket obrisan.',pkgActive:'Paket je aktivan!',
    clientAdded:'Klijent dodat! ✓',clientEdited:'Izmenjeno!',clientArch:'Klijent arhiviran 📦',clientAct:'Klijent aktiviran ✓',clientDel:'Obrisan.',
    renewedOk:'✓ Članarina produžena!',
    tplSaved:'Šablon sačuvan!',
    enterName:'Unesi ime!',enterPkg:'Izaberi paket!',enterDate:'Izaberi datum!',enterSessions:'Unesi broj treninga i cenu!',
    notifOn:'Notifikacije uključene!',notifOff:'Odbijena.',notifNo:'Nije podržano.',
    confirmDel:'Trajno obrisati?',confirmPkg:'Obrisati paket?',confirmAll:'Obrisati SVE podatke?',allCleared:'Obrisano.',confirmTest:'Obrisati ovo testiranje?',
    allClients:'Svi klijenti',trainedTotal:' treninga ukupno',
    notesSaved:'Beleška sačuvana! 📝',lastSession:'Poslednji trening',nextSlot:'Sledeći termin',
    testing:'Izometrija Testiranje',addTest:'+ Sačuvaj testiranje',testHistory:'Istorija testiranja',noTests:'Nema testiranja. Dodaj prvo!',
    testSaved:'Testiranje sačuvano! 🧪',testDeleted:'Testiranje obrisano.',enterTest:'Unesi bar jednu vrednost!',testNote:'Napomena',date:'Datum',
    notScheduled:'Nije zakazan',clientSince:'Klijent od',thisMonth:'Ovog meseca',totalSessions:'Ukupno treninga',
    last5:'Poslednjih 5 treninga',notes:'Beleške',notesPh:'Napomene — ciljevi, povrede, ishrana...',
    usedSessions:'Iskorišćeno',renewPkg:'Produži paket',editData:'Izmeni podatke',
    profPkg:'Paket',finNoData:'Nema podataka.',inDays:'za ',
    joinDate:' dana',today2:'DANAS',tomorrow:'sutra',
    profStats:'Statistike',sessUsed:' od ',sessLabel:' termina iskorišćeno',
    completedJust:'🎉 Svi termini iskorišćeni!',
    waTplEdit:'✏️ Uredi šablon',forPeriod:'za izabrani period',months:' meseci',basedOn:'na osnovu ovog meseca',
    fmsTest:'FMS Testiranje',fmsDesc:'Functional Movement Screen — 7 testova, ocena 0–3. Maksimum: 21.',
    fmsDeepSquat:'Duboki čučanj',fmsHurdle:'Korak preko prepone',fmsLunge:'Iskorak u liniji',
    fmsShoulder:'Mobilnost ramena',fmsASLR:'Podizanje noge',fmsPushup:'Stabilnost trupa',fmsRotary:'Rotatorna stabilnost',
    fmsScore0:'Bol',fmsScore1:'Ne izvodi',fmsScore2:'Kompenzacija',fmsScore3:'Savršeno',
    fmsTotal:'Ukupno',fmsMax:'/21',fmsExcellent:'Odličan',fmsGood:'Dobar',fmsAverage:'Prosečan',fmsNeedsWork:'Korekcija',
    fmsSave:'+ Sačuvaj FMS test',fmsHistory:'FMS Istorija',fmsNoTests:'Nema FMS testiranja.',
    fmsSaved:'FMS test sačuvan! 🏋️',fmsDeleted:'FMS test obrisan.',fmsCurrent:'Trenutno',fmsPrevious:'Prethodno',
    fmsProgress:'Progres',fmsEnterOne:'Oceni bar jedan test!',
    profTabInfo:'Profil',profTabTests:'Testiranja',
    rufTest:'Ruffier Test',rufDesc:'Kardiovaskularni test — 30 čučnjeva za 45s. Meri se puls pre, posle i nakon 1 min odmora.',
    rufP1:'P1 — Mirovanje',rufP1sub:'puls pre testa',rufP2:'P2 — Posle',rufP2sub:'odmah posle čučnjeva',rufP3:'P3 — Oporavak',rufP3sub:'posle 1 min odmora',
    rufIndex:'Ruffier indeks',rufFormula:'(P1 + P2 + P3 - 200) / 10',
    rufExcellent:'Odličan',rufGood:'Dobar',rufAverage:'Prosečan',rufBelowAvg:'Ispod proseka',rufPoor:'Slab',
    rufSave:'+ Sačuvaj Ruffier test',rufHistory:'Ruffier Istorija',rufNoTests:'Nema Ruffier testiranja.',
    rufSaved:'Ruffier test sačuvan! ❤️',rufDeleted:'Ruffier test obrisan.',rufEnter:'Unesi sva tri pulsa!',
    rufBpm:'otk/min',rufProgress:'Progres indeksa',
    ttIso:'Izometrija',ttFMS:'FMS',ttRuf:'Ruffier',tt1RM:'1RM',
    rmTest:'1RM Testiranje',rmDesc:'Procenjeni One Rep Max — prosek 3 formule (Brzycki + Epley + Lombardi). Unesi težinu i broj ponavljanja (2-10 rep).',
    rmBench:'Bench Press',rmSquat:'Čučanj',rmDeadlift:'Mrtvo dizanje',rmOHP:'Vojnički potisak',rmRow:'Veslanje šipkom',
    rmBenchM:'grudi, triceps',rmSquatM:'kvadriceps, gluteus',rmDeadliftM:'zadnji lanac',rmOHPM:'ramena, triceps',rmRowM:'leđa, biceps',
    rmWeight:'Težina (kg)',rmReps:'Ponavljanja',rmEstimated:'Procena 1RM',
    rmSave:'+ Sačuvaj 1RM test',rmHistory:'1RM Istorija',rmNoTests:'Nema 1RM testiranja.',
    rmSaved:'1RM test sačuvan! 🏆',rmDeleted:'1RM test obrisan.',rmEnter:'Unesi bar jednu vežbu!',
    rmProgress:'Progres 1RM',rmTotal:'Ukupan 1RM',rmBW:'Telesna težina',rmRatio:'BW Ratio',
    rmBeginner:'Početnik',rmNovice:'Srednji',rmIntermediate:'Napredan',rmAdvanced:'Iskusan',rmElite:'Elitni',
    rmEnterBW:'Unesi težinu klijenta za BW ratio',rmKg:'kg',
    // ISO test UI
    isoDesc:'Izometrija — 3 pokušaja po vežbi, pozicija 6 sec. Vrednosti u kg.',
    isoEx_vp:'Vertical Pull',isoEx_kp:'Kvadriceps Pull',isoEx_zl:'Zadnja Loza',
    isoEx_pr:'Prednje Rame',isoEx_bi:'Biceps',isoEx_sq:'Čučanj sa Pojasom',isoEx_sk:'Sklek',
    sideR:'D',sideL:'L',
    colExercise:'Vežba',colAvg:'Avg',colMax:'Max',optional:'opciono...',
    disbHeader:'⚖️ Analiza disbalansa D / L',
    disbExcellent:'Odlično',disbOK:'OK',disbModerate:'Umereni disbalans',disbSignificant:'Značajan disbalans',
    disbDiff:'Razlika',disbStronger:'jača',
    editBtn:'✏️ Izmeni',isoEditing:'✏️ Izmena testa od',
    cancelBtn:'Otkaži',saveEdit:'✓ Sačuvaj izmene',isoEditSaved:'Izmene sačuvane! ✏️',
    // FMS auto-comment
    fmsAcExcellent:'✅ Odličan rezultat',fmsAcGood:'👍 Dobar rezultat',fmsAcAverage:'⚠️ Prosečan rezultat',fmsAcNeeds:'🔴 Korekcija neophodna',
    fmsAcExcellentDesc:'održavaj postignuti nivo, dodaj funkcionalne i sportski-specifične treninge.',
    fmsAcGoodDesc:'fokus na pojedinačne testove ispod ocene 3.',
    fmsAcAverageDesc:'preporuka: korektivni rad PRE povećanja intenziteta treninga.',
    fmsAcNeedsDesc:'fokus isključivo na korektivne vežbe, izbegavati visoki intenzitet.',
    fmsAcPainAlert:'🚨 PAŽNJA: bol detektovan u',fmsAcPainTests1:'testu',fmsAcPainTests2:'testa',
    fmsAcPainAdvice:'— obavezna konsultacija sa lekarom/fizioterapeutom pre nastavka.',
    fmsAcCorrections:'📋 Korektivne preporuke:',
    fmsAcAllPerfect:'🎯 Sve vežbe ocenjene maksimalnom ocenom 3 — odlična funkcionalna sposobnost!'
  }
};

// English
TR.en={
  clients:'Clients',packages:'Packages',groups:'Groups',schedule:'Schedule',
  finance:'Finance',whatsapp:'WhatsApp',archive:'Archive',settings:'Settings',
  today:'Today',active:'Active',search:'🔍 Search...',
  renew:'Renew',edit:'Edit',archiveBtn:'Archive',activate:'✓ Activate',delForever:'Delete forever',
  noPackage:'No package',sessions:'sessions',
  expToday:'Package expires TODAY!',expTomorrow:'Package expires tomorrow!',expDays:'Package expires in ',days:' days',
  doneMsg:'🎉 All sessions used! Renew package.',
  trainedAt:'✓ Trained at ',trainRemoved:'Session removed',
  renewed:'✓ Renewed ',
  statusActive:'Active',statusDue:'Due',statusOverdue:'Overdue',statusPaused:'Paused',statusArch:'Archived',
  noClients:'No clients.\nAdd first client!',
  noPackages:'No packages. Add first!',
  noGroups:'No groups. Create first!',
  noArchived:'No archived clients.',
  archDesc:'Archived clients are saved. Activate them at any time.',
  expiringSoon:'⚠️ Packages expiring soon',completedPkgs:'✅ Completed packages',expiredTitle:'❌ Expired memberships',
  thisWeek:'Today',prevWeek:'← Previous',nextWeek:'Next →',
  addSlot:'Add session',editSlot:'Edit session',slotSaved:'Session saved!',slotDeleted:'Session deleted.',
  noSlotClient:'Select client!',confirmSlot:'Delete this session?',
  finTitle:'Finance',monthRev:'This month revenue',avgMonth:'Average / month',
  totalPeriod:'Total in period',yearProj:'Annual projection',
  revPerMonth:'Revenue per month',revPerClient:'Revenue per client',revPerPkg:'Revenue per package',
  activeClients:' active clients',noData:'No data.',
  per1:'1 month',per3:'3 months',per6:'6 months',perY:'Year',
  waTitle:'WhatsApp',waExpiring:'Clients with packages expiring in 14 days:',waAll:'Messages for all clients:',
  noWaClients:'No clients with active packages.',openWA:'📲 Open WhatsApp',copy:'Copy',copied:'✓ Copied!',
  darkMode:'Dark mode',darkSub:'Black background, red accents',
  trainerName:'Trainer name',trainerSub:'Shown in WhatsApp messages',
  langLabel:'Language / Jezik',waTplLabel:'WhatsApp template',waTplSub:'Customize text',
  notifLabel:'Notifications',notifSub:'Alert when package expires',enable:'Enable',
  clearData:'Clear all data',clearSub:'Deletes all clients and sessions',del:'Delete',
  version:'StamenicFitt Tracker v4.0',verSub:'Data saved locally on device',
  signedInAs:'Signed in as',signOutBtn:'Sign out',
  trainingLogged:'Session logged!',emptyText:'Enter text!',syncedFromDevice:'🔄 Synced from another device',
  saved:'Saved!',groupSaved:'Group saved!',groupDel:'Group deleted.',clientRemoved:'Client removed from group.',
  pkgSaved:'Package saved!',pkgDel:'Deleted.',pkgActive:'Package is active!',
  clientAdded:'Client added! ✓',clientEdited:'Updated!',clientArch:'Client archived 📦',clientAct:'Client activated ✓',clientDel:'Deleted.',
  renewedOk:'✓ Membership renewed!',
  tplSaved:'Template saved!',
  enterName:'Enter name!',enterPkg:'Select package!',enterDate:'Select date!',enterSessions:'Enter sessions and price!',
  notifOn:'Notifications enabled!',notifOff:'Denied.',notifNo:'Not supported.',
  confirmDel:'Delete permanently?',confirmPkg:'Delete package?',confirmAll:'Delete ALL data?',allCleared:'Cleared.',confirmTest:'Delete this test?',
  allClients:'All clients',trainedTotal:' sessions total',
  notesSaved:'Note saved! 📝',lastSession:'Last session',nextSlot:'Next appointment',
  testing:'Isometric Testing',addTest:'+ Save test',testHistory:'Test history',noTests:'No tests. Add first!',
  testSaved:'Test saved! 🧪',testDeleted:'Test deleted.',enterTest:'Enter at least one value!',testNote:'Note',date:'Date',
  notScheduled:'Not scheduled',clientSince:'Client since',thisMonth:'This month',totalSessions:'Total sessions',
  last5:'Last 5 sessions',notes:'Notes',notesPh:'Notes — goals, injuries, nutrition...',
  usedSessions:'Used',renewPkg:'Renew package',editData:'Edit data',
  profPkg:'Package',finNoData:'No data.',inDays:'in ',
  joinDate:' days',today2:'TODAY',tomorrow:'tomorrow',
  profStats:'Statistics',sessUsed:' of ',sessLabel:' sessions used',
  completedJust:'🎉 All sessions used!',
  waTplEdit:'✏️ Edit template',forPeriod:'for selected period',months:' months',basedOn:'based on this month',
  fmsTest:'FMS Testing',fmsDesc:'Functional Movement Screen — 7 tests, score 0–3. Maximum: 21.',
  fmsDeepSquat:'Deep Squat',fmsHurdle:'Hurdle Step',fmsLunge:'Inline Lunge',
  fmsShoulder:'Shoulder Mobility',fmsASLR:'Leg Raise',fmsPushup:'Trunk Stability',fmsRotary:'Rotary Stability',
  fmsScore0:'Pain',fmsScore1:'Cannot',fmsScore2:'Compensated',fmsScore3:'Perfect',
  fmsTotal:'Total',fmsMax:'/21',fmsExcellent:'Excellent',fmsGood:'Good',fmsAverage:'Average',fmsNeedsWork:'Needs work',
  fmsSave:'+ Save FMS test',fmsHistory:'FMS History',fmsNoTests:'No FMS tests.',
  fmsSaved:'FMS test saved! 🏋️',fmsDeleted:'FMS test deleted.',fmsCurrent:'Current',fmsPrevious:'Previous',
  fmsProgress:'Progress',fmsEnterOne:'Score at least one test!',
  profTabInfo:'Profile',profTabTests:'Testing',
  rufTest:'Ruffier Test',rufDesc:'Cardiovascular test — 30 squats in 45s. Measure pulse before, after, and after 1 min rest.',
  rufP1:'P1 — Resting',rufP1sub:'pulse before test',rufP2:'P2 — After',rufP2sub:'right after squats',rufP3:'P3 — Recovery',rufP3sub:'after 1 min rest',
  rufIndex:'Ruffier index',rufFormula:'(P1 + P2 + P3 - 200) / 10',
  rufExcellent:'Excellent',rufGood:'Good',rufAverage:'Average',rufBelowAvg:'Below avg',rufPoor:'Poor',
  rufSave:'+ Save Ruffier test',rufHistory:'Ruffier History',rufNoTests:'No Ruffier tests.',
  rufSaved:'Ruffier test saved! ❤️',rufDeleted:'Ruffier test deleted.',rufEnter:'Enter all three pulse values!',
  rufBpm:'bpm',rufProgress:'Index progress',
  ttIso:'Isometric',ttFMS:'FMS',ttRuf:'Ruffier',tt1RM:'1RM',
  rmTest:'1RM Testing',rmDesc:'Estimated One Rep Max — average of 3 formulas (Brzycki + Epley + Lombardi). Enter weight and reps (2-10 rep).',
  rmBench:'Bench Press',rmSquat:'Squat',rmDeadlift:'Deadlift',rmOHP:'Overhead Press',rmRow:'Barbell Row',
  rmBenchM:'chest, triceps',rmSquatM:'quads, glutes',rmDeadliftM:'posterior chain',rmOHPM:'shoulders, triceps',rmRowM:'back, biceps',
  rmWeight:'Weight (kg)',rmReps:'Reps',rmEstimated:'Estimated 1RM',
  rmSave:'+ Save 1RM test',rmHistory:'1RM History',rmNoTests:'No 1RM tests.',
  rmSaved:'1RM test saved! 🏆',rmDeleted:'1RM test deleted.',rmEnter:'Enter at least one exercise!',
  rmProgress:'1RM Progress',rmTotal:'Total 1RM',rmBW:'Body weight',rmRatio:'BW Ratio',
  rmBeginner:'Beginner',rmNovice:'Novice',rmIntermediate:'Intermediate',rmAdvanced:'Advanced',rmElite:'Elite',
  rmEnterBW:'Enter client weight for BW ratio',rmKg:'kg',
  isoDesc:'Isometric — 3 attempts per exercise, hold 6 sec. Values in kg.',
  isoEx_vp:'Vertical Pull',isoEx_kp:'Quadriceps Pull',isoEx_zl:'Hamstring Pull',
  isoEx_pr:'Front Shoulder',isoEx_bi:'Biceps',isoEx_sq:'Belt Squat',isoEx_sk:'Push-up',
  sideR:'R',sideL:'L',
  colExercise:'Exercise',colAvg:'Avg',colMax:'Max',optional:'optional...',
  disbHeader:'⚖️ Imbalance analysis R / L',
  disbExcellent:'Excellent',disbOK:'OK',disbModerate:'Moderate imbalance',disbSignificant:'Significant imbalance',
  disbDiff:'Difference',disbStronger:'stronger',
  editBtn:'✏️ Edit',isoEditing:'✏️ Editing test from',
  cancelBtn:'Cancel',saveEdit:'✓ Save changes',isoEditSaved:'Changes saved! ✏️',
  fmsAcExcellent:'✅ Excellent result',fmsAcGood:'👍 Good result',fmsAcAverage:'⚠️ Average result',fmsAcNeeds:'🔴 Correction needed',
  fmsAcExcellentDesc:'maintain current level, add functional and sport-specific training.',
  fmsAcGoodDesc:'focus on individual tests below score 3.',
  fmsAcAverageDesc:'recommendation: corrective work BEFORE increasing training intensity.',
  fmsAcNeedsDesc:'focus exclusively on corrective exercises, avoid high intensity.',
  fmsAcPainAlert:'🚨 ATTENTION: pain detected in',fmsAcPainTests1:'test',fmsAcPainTests2:'tests',
  fmsAcPainAdvice:'— mandatory consultation with doctor/physiotherapist before continuing.',
  fmsAcCorrections:'📋 Corrective recommendations:',
  fmsAcAllPerfect:'🎯 All exercises scored 3 — excellent functional capacity!'
};

// Russian
TR.ru={
  clients:'Клиенты',packages:'Пакеты',groups:'Группы',schedule:'Расписание',
  finance:'Финансы',whatsapp:'WhatsApp',archive:'Архив',settings:'Настройки',
  today:'Сегодня',active:'Активные',search:'🔍 Поиск...',
  renew:'Продлить',edit:'Изменить',archiveBtn:'Архивировать',activate:'✓ Активировать',delForever:'Удалить навсегда',
  noPackage:'Без пакета',sessions:'тренировок',
  expToday:'Пакет истекает СЕГОДНЯ!',expTomorrow:'Пакет истекает завтра!',expDays:'Пакет истекает через ',days:' дней',
  doneMsg:'🎉 Все тренировки использованы! Продлите пакет.',
  trainedAt:'✓ Тренировался в ',trainRemoved:'Тренировка удалена',
  renewed:'✓ Продлено ',
  statusActive:'Активен',statusDue:'Просрочено',statusOverdue:'Задолжал',statusPaused:'Пауза',statusArch:'Архив',
  noClients:'Нет клиентов.\nДобавьте первого!',
  noPackages:'Нет пакетов. Добавьте первый!',
  noGroups:'Нет групп. Создайте первую!',
  noArchived:'Нет архивированных клиентов.',
  archDesc:'Архивированные клиенты сохранены. Активируйте в любое время.',
  expiringSoon:'⚠️ Пакеты скоро истекают',completedPkgs:'✅ Использованные пакеты',expiredTitle:'❌ Истекшие членства',
  thisWeek:'Сегодня',prevWeek:'← Пред.',nextWeek:'След. →',
  addSlot:'Добавить',editSlot:'Изменить',slotSaved:'Сохранено!',slotDeleted:'Удалено.',
  noSlotClient:'Выберите клиента!',confirmSlot:'Удалить сеанс?',
  finTitle:'Финансы',monthRev:'Доход за месяц',avgMonth:'Среднее / месяц',
  totalPeriod:'Итого за период',yearProj:'Годовой прогноз',
  revPerMonth:'Доход по месяцам',revPerClient:'Доход по клиенту',revPerPkg:'Доход по пакету',
  activeClients:' активных клиентов',noData:'Нет данных.',
  per1:'1 месяц',per3:'3 месяца',per6:'6 месяцев',perY:'Год',
  waTitle:'WhatsApp',waExpiring:'Клиенты с истекающим пакетом (14 дней):',waAll:'Сообщения для всех клиентов:',
  noWaClients:'Нет клиентов с активными пакетами.',openWA:'📲 Открыть WhatsApp',copy:'Копировать',copied:'✓ Скопировано!',
  darkMode:'Тёмный режим',darkSub:'Чёрный фон, красные акценты',
  trainerName:'Имя тренера',trainerSub:'Отображается в сообщениях',
  langLabel:'Язык / Jezik',waTplLabel:'Шаблон WhatsApp',waTplSub:'Настроить текст',
  notifLabel:'Уведомления',notifSub:'Оповещение когда пакет истекает',enable:'Включить',
  clearData:'Удалить все данные',clearSub:'Удаляет всех клиентов и тренировки',del:'Удалить',
  version:'StamenicFitt Tracker v4.0',verSub:'Данные сохранены локально',
  signedInAs:'Вы вошли как',signOutBtn:'Выйти',
  trainingLogged:'Тренировка добавлена!',emptyText:'Введите текст!',syncedFromDevice:'🔄 Синхронизировано с другого устройства',
  saved:'Сохранено!',groupSaved:'Группа сохранена!',groupDel:'Группа удалена.',clientRemoved:'Клиент удалён из группы.',
  pkgSaved:'Пакет сохранён!',pkgDel:'Удалено.',pkgActive:'Пакет активен!',
  clientAdded:'Клиент добавлен! ✓',clientEdited:'Изменено!',clientArch:'Клиент архивирован 📦',clientAct:'Клиент активирован ✓',clientDel:'Удалено.',
  renewedOk:'✓ Членство продлено!',
  tplSaved:'Шаблон сохранён!',
  enterName:'Введите имя!',enterPkg:'Выберите пакет!',enterDate:'Выберите дату!',enterSessions:'Введите тренировки и цену!',
  notifOn:'Уведомления включены!',notifOff:'Отказано.',notifNo:'Не поддерживается.',
  confirmDel:'Удалить навсегда?',confirmPkg:'Удалить пакет?',confirmAll:'Удалить ВСЕ данные?',allCleared:'Очищено.',confirmTest:'Удалить этот тест?',
  allClients:'Все клиенты',trainedTotal:' тренировок всего',
  notesSaved:'Заметка сохранена! 📝',lastSession:'Последняя тренировка',nextSlot:'Следующая встреча',
  testing:'Изометрическое тестирование',addTest:'+ Сохранить тест',testHistory:'История тестов',noTests:'Нет тестов. Добавьте первый!',
  testSaved:'Тест сохранён! 🧪',testDeleted:'Тест удалён.',enterTest:'Введите хотя бы одно значение!',testNote:'Заметка',date:'Дата',
  notScheduled:'Не запланировано',clientSince:'Клиент с',thisMonth:'В этом месяце',totalSessions:'Всего тренировок',
  last5:'Последние 5 тренировок',notes:'Заметки',notesPh:'Заметки — цели, травмы, питание...',
  usedSessions:'Использовано',renewPkg:'Продлить пакет',editData:'Изменить данные',
  profPkg:'Пакет',finNoData:'Нет данных.',inDays:'через ',
  joinDate:' дней',today2:'СЕГОДНЯ',tomorrow:'завтра',
  profStats:'Статистика',sessUsed:' из ',sessLabel:' тренировок использовано',
  completedJust:'🎉 Все тренировки использованы!',
  waTplEdit:'✏️ Изменить шаблон',forPeriod:'за выбранный период',months:' месяцев',basedOn:'на основе этого месяца',
  fmsTest:'FMS Тестирование',fmsDesc:'Functional Movement Screen — 7 тестов, оценка 0–3. Максимум: 21.',
  fmsDeepSquat:'Глубокий присед',fmsHurdle:'Шаг через барьер',fmsLunge:'Выпад в линию',
  fmsShoulder:'Подвижность плеч',fmsASLR:'Подъём ноги',fmsPushup:'Стабильность торса',fmsRotary:'Вращательная стаб.',
  fmsScore0:'Боль',fmsScore1:'Не может',fmsScore2:'Компенсация',fmsScore3:'Идеально',
  fmsTotal:'Итого',fmsMax:'/21',fmsExcellent:'Отлично',fmsGood:'Хорошо',fmsAverage:'Средне',fmsNeedsWork:'Коррекция',
  fmsSave:'+ Сохранить FMS тест',fmsHistory:'FMS История',fmsNoTests:'Нет FMS тестов.',
  fmsSaved:'FMS тест сохранён! 🏋️',fmsDeleted:'FMS тест удалён.',fmsCurrent:'Текущий',fmsPrevious:'Предыдущий',
  fmsProgress:'Прогресс',fmsEnterOne:'Оцените хотя бы один тест!',
  profTabInfo:'Профиль',profTabTests:'Тестирование',
  rufTest:'Тест Руфье',rufDesc:'Кардиотест — 30 приседаний за 45с. Измеряется пульс до, после и через 1 мин отдыха.',
  rufP1:'P1 — Покой',rufP1sub:'пульс до теста',rufP2:'P2 — После',rufP2sub:'сразу после приседаний',rufP3:'P3 — Восстановление',rufP3sub:'через 1 мин отдыха',
  rufIndex:'Индекс Руфье',rufFormula:'(P1 + P2 + P3 - 200) / 10',
  rufExcellent:'Отлично',rufGood:'Хорошо',rufAverage:'Средне',rufBelowAvg:'Ниже среднего',rufPoor:'Плохо',
  rufSave:'+ Сохранить тест Руфье',rufHistory:'История Руфье',rufNoTests:'Нет тестов Руфье.',
  rufSaved:'Тест Руфье сохранён! ❤️',rufDeleted:'Тест Руфье удалён.',rufEnter:'Введите все три значения пульса!',
  rufBpm:'уд/мин',rufProgress:'Прогресс индекса',
  ttIso:'Изометрия',ttFMS:'FMS',ttRuf:'Руфье',tt1RM:'1ПМ',
  rmTest:'Тест 1ПМ',rmDesc:'Оценка одноповторного максимума — среднее 3 формул (Brzycki + Epley + Lombardi). Вес и повторения (2-10).',
  rmBench:'Жим лёжа',rmSquat:'Присед',rmDeadlift:'Становая тяга',rmOHP:'Жим стоя',rmRow:'Тяга штанги',
  rmBenchM:'грудь, трицепс',rmSquatM:'квадрицепс, ягодицы',rmDeadliftM:'задняя цепь',rmOHPM:'плечи, трицепс',rmRowM:'спина, бицепс',
  rmWeight:'Вес (кг)',rmReps:'Повторения',rmEstimated:'Оценка 1ПМ',
  rmSave:'+ Сохранить тест 1ПМ',rmHistory:'История 1ПМ',rmNoTests:'Нет тестов 1ПМ.',
  rmSaved:'Тест 1ПМ сохранён! 🏆',rmDeleted:'Тест 1ПМ удалён.',rmEnter:'Введите хотя бы одно упражнение!',
  rmProgress:'Прогресс 1ПМ',rmTotal:'Общий 1ПМ',rmBW:'Масса тела',rmRatio:'Коэфф. к массе',
  rmBeginner:'Начинающий',rmNovice:'Средний',rmIntermediate:'Продвинутый',rmAdvanced:'Опытный',rmElite:'Элитный',
  rmEnterBW:'Укажите вес клиента для расчёта',rmKg:'кг',
  isoDesc:'Изометрия — 3 попытки на упражнение, удержание 6 сек. Значения в кг.',
  isoEx_vp:'Вертикальная тяга',isoEx_kp:'Квадрицепс тяга',isoEx_zl:'Задняя поверхность бедра',
  isoEx_pr:'Переднее плечо',isoEx_bi:'Бицепс',isoEx_sq:'Присед с поясом',isoEx_sk:'Отжимание',
  sideR:'П',sideL:'Л',
  colExercise:'Упражнение',colAvg:'Сред.',colMax:'Макс',optional:'необязательно...',
  disbHeader:'⚖️ Анализ дисбаланса П / Л',
  disbExcellent:'Отлично',disbOK:'OK',disbModerate:'Умеренный дисбаланс',disbSignificant:'Значительный дисбаланс',
  disbDiff:'Разница',disbStronger:'сильнее',
  editBtn:'✏️ Изменить',isoEditing:'✏️ Изменение теста от',
  cancelBtn:'Отмена',saveEdit:'✓ Сохранить изменения',isoEditSaved:'Изменения сохранены! ✏️',
  fmsAcExcellent:'✅ Отличный результат',fmsAcGood:'👍 Хороший результат',fmsAcAverage:'⚠️ Средний результат',fmsAcNeeds:'🔴 Требуется коррекция',
  fmsAcExcellentDesc:'поддерживайте достигнутый уровень, добавьте функциональные и спортивно-специфические тренировки.',
  fmsAcGoodDesc:'сосредоточьтесь на отдельных тестах ниже оценки 3.',
  fmsAcAverageDesc:'рекомендация: корректирующая работа ДО увеличения интенсивности тренировок.',
  fmsAcNeedsDesc:'фокус исключительно на корректирующих упражнениях, избегайте высокой интенсивности.',
  fmsAcPainAlert:'🚨 ВНИМАНИЕ: боль обнаружена в',fmsAcPainTests1:'тесте',fmsAcPainTests2:'тестах',
  fmsAcPainAdvice:'— обязательная консультация с врачом/физиотерапевтом перед продолжением.',
  fmsAcCorrections:'📋 Корректирующие рекомендации:',
  fmsAcAllPerfect:'🎯 Все упражнения оценены на 3 — отличные функциональные способности!'
};

function t(k){return (TR[lang]&&TR[lang][k])||TR.sr[k]||k;}
function getDays(){return lang==='en'?DAYS_EN:lang==='ru'?DAYS_RU:DAYS_SR;}

// // --- PERSIST ----------------------------------------------
window.getState = function(){
  return {
    pkgs:pkgs,clients:clients,sessions:sessions,groups:groups,slots:slots,
    settings:{
      isDark:isDark,lang:lang,
      trainerName:localStorage.getItem('pt_tname')||'StamenicFitt',
      waTpl:localStorage.getItem('pt_watpl')||''
    }
  };
};
function getState(){return window.getState();}
function applyState(s){
  if(!s)return;
  pkgs=s.pkgs||[];clients=s.clients||[];sessions=s.sessions||[];
  groups=s.groups||[];slots=s.slots||[];
  if(s.settings){
    isDark=!!s.settings.isDark;
    if(s.settings.lang)lang=s.settings.lang;
    if(s.settings.trainerName)localStorage.setItem('pt_tname',s.settings.trainerName);
    if(s.settings.waTpl!==undefined&&s.settings.waTpl!=='')localStorage.setItem('pt_watpl',s.settings.waTpl);
  }
}
function sv(){
  try{
    var wa=document.getElementById('watpl');
    if(wa)localStorage.setItem('pt_watpl',wa.value);
    var st=getState();
    localStorage.setItem('pt_state',JSON.stringify(st));
    if(typeof window.dbPush==='function')window.dbPush(st);
    // legacy keys (backward compat)
    localStorage.setItem('pt_pkgs',JSON.stringify(pkgs));
    localStorage.setItem('pt_clients',JSON.stringify(clients));
    localStorage.setItem('pt_sessions',JSON.stringify(sessions));
    localStorage.setItem('pt_groups',JSON.stringify(groups));
    localStorage.setItem('pt_slots',JSON.stringify(slots));
    localStorage.setItem('pt_dark',isDark?'1':'0');
    localStorage.setItem('pt_lang',lang);
  }catch(e){}
}
function ld(){
  // 1) Pokušaj unified pt_state ključ
  try{
    var blob=localStorage.getItem('pt_state');
    if(blob){applyState(JSON.parse(blob));return;}
  }catch(e){}
  // 2) Fallback na stare ključeve
  try{
    var a=localStorage.getItem('pt_pkgs'),b=localStorage.getItem('pt_clients'),
        c=localStorage.getItem('pt_sessions'),g=localStorage.getItem('pt_groups'),
        sl=localStorage.getItem('pt_slots'),dk=localStorage.getItem('pt_dark'),
        ln=localStorage.getItem('pt_lang');
    if(a)pkgs=JSON.parse(a);
    if(b)clients=JSON.parse(b);
    if(c)sessions=JSON.parse(c);
    if(g)groups=JSON.parse(g);
    if(sl)slots=JSON.parse(sl);
    if(dk)isDark=dk==='1';
    if(ln)lang=ln;
  }catch(e){}
}
function getWaTpl(){return localStorage.getItem('pt_watpl')||DEFAULT_WA;}
ld();

// // --- HELPERS ----------------------------------------------
function now2(){
  var n=new Date();
  return{
    date:n.getFullYear()+'-'+pad(n.getMonth()+1)+'-'+pad(n.getDate()),
    time:pad(n.getHours())+':'+pad(n.getMinutes())
  };
}
function pad(x){return String(x).padStart(2,'0');}
function today(){return now2().date;}
function du(d){var a=new Date();a.setHours(0,0,0,0);var b=new Date(d);b.setHours(0,0,0,0);return Math.round((b-a)/86400000);}
function pkgExp(c){
  if(!c.pstart)return null;
  var pkg=c.pid?pgb(c.pid):null;
  var dur=(pkg&&pkg.d)?pkg.d:30;
  var d=new Date(c.pstart);d.setDate(d.getDate()+dur);
  return d.toISOString().split('T')[0];
}
function pgb(id){return pkgs.find(function(p){return p.id===id;});}
function cob(id){return clients.find(function(c){return c.id===id;});}
function ini(n){return n.split(' ').map(function(w){return w[0];}).join('').toUpperCase().slice(0,2);}
function fmtD(d){if(!d)return '—';var a=d.split('-');return a[2]+'/'+a[1]+'/'+a[0];}
function bc(s){return{active:'ba',due:'bd',overdue:'bo',paused:'bp'}[s]||'bp';}
function bl(s){return{active:t('statusActive'),due:t('statusDue'),overdue:t('statusOverdue'),paused:t('statusPaused')}[s]||s;}

// "Istekla pre X dana" — formatirano po jeziku
function expFmt(n){
  if(lang==='en')return 'Expired '+n+' day'+(n!==1?'s':'')+' ago';
  if(lang==='ru')return 'Истекла '+n+' дн. назад';
  return 'Istekla pre '+n+' dan'+(n===1?'':n%10>=2&&n%10<=4&&(n<10||n>20)?'a':'a');
}

// Auto-update statusa za istekle članarine
// active → due (1-14 dana isteka), due → overdue (>14 dana isteka)
// paused i overdue ostaju kao što jesu
function autoUpdateExpiredStatuses(){
  var changed=false;
  clients.forEach(function(c){
    if(c.arch||c.st==='paused'||!c.pid)return;
    var e=pkgExp(c);if(!e)return;
    var dl=du(e);
    if(dl>=0)return; // još nije istekla
    var daysOver=Math.abs(dl);
    if(c.st==='active'&&daysOver>=1){c.st='due';changed=true;}
    else if(c.st==='due'&&daysOver>=15){c.st='overdue';changed=true;}
  });
  if(changed)sv();
}
function cCol(cid){var C=['#cc2200','#1a56db','#1a7a2e','#9333ea','#059669','#d97706','#0891b2','#be185d'];return C[cid%C.length];}
function toast(m){var el=document.getElementById('toast');el.textContent=m;el.classList.add('on');setTimeout(function(){el.classList.remove('on');},2400);}
function om(id){document.getElementById(id).classList.add('on');}
function cm(id){document.getElementById(id).classList.remove('on');}
function theme(){
  document.getElementById('app').className=isDark?'dark':'';
  var b=document.getElementById('darkBtn');
  if(b)b.textContent=isDark?'🌙':'☀️';
}

// // --- NAV --------------------------------------------------
var TABS=[
  {id:'clients',lk:'clients',ic:'<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'},
  {id:'paketi',lk:'packages',ic:'<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>'},
  {id:'grupe',lk:'groups',ic:'<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M21 21v-2a4 4 0 0 0-3-3.87"/></svg>'},
  {id:'raspored',lk:'schedule',ic:'<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'},
  {id:'finansije',lk:'finance',ic:'<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>'},
  {id:'whatsapp',lk:'whatsapp',ic:'<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'},
  {id:'arhiva',lk:'archive',ic:'<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>'},
  {id:'settings',lk:'settings',ic:'<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'}
];

function renderNav(){
  var h='';
  for(var i=0;i<TABS.length;i++){
    var tb=TABS[i];
    h+='<button class="ni'+(tab===tb.id?' on':'')+'" data-tab="'+tb.id+'">'+tb.ic+'<span>'+t(tb.lk)+'</span></button>';
  }
  document.getElementById('bnav').innerHTML=h;
}
document.getElementById('bnav').addEventListener('click',function(e){
  var btn=e.target.closest('[data-tab]');
  if(btn){tab=btn.getAttribute('data-tab');renderNav();renderPage();}
});
function setTab(id){tab=id;renderNav();renderPage();}

function renderPage(){
  var c=document.getElementById('content');
  if(tab==='clients')c.innerHTML=pgClients();
  else if(tab==='paketi')c.innerHTML=pgPaketi();
  else if(tab==='grupe')c.innerHTML=pgGrupe();
  else if(tab==='raspored')c.innerHTML=pgRaspored();
  else if(tab==='finansije')c.innerHTML=pgFin();
  else if(tab==='whatsapp')c.innerHTML=pgWA();
  else if(tab==='arhiva')c.innerHTML=pgArhiva();
  else if(tab==='settings')c.innerHTML=pgSettings();
}

// // --- CLIENT TYPE / RENEW STATUS ---------------------------
function selTy(ty){
  pkgTy=ty;
  ['p','s','g'].forEach(function(x){
    var el=document.getElementById('ty'+x);
    if(el)el.className='tyopt'+(x===ty?' s'+ty:'');
  });
}
function selRS(s){
  rStat=s;
  var a=document.getElementById('rsa'),d=document.getElementById('rsd');
  if(a)a.className='rsopt'+(s==='active'?' on':'');
  if(d)d.className='rsopt'+(s==='due'?' on':'');
}

// // --- CLIENTS PAGE -----------------------------------------
function pgClients(){
  autoUpdateExpiredStatuses();
  var ac=clients.filter(function(c){return !c.arch;});
  var expired=ac.filter(function(c){var e=pkgExp(c);return e&&c.st!=='paused'&&du(e)<0;});
  var expiring=ac.filter(function(c){var e=pkgExp(c);return e&&c.st!=='paused'&&du(e)>=0&&du(e)<=7;});
  var completed=ac.filter(function(c){var p=c.pid?pgb(c.pid):null;return p&&(c.pused||0)>=p.s&&c.st!=='paused';});
  var td=sessions.filter(function(s){return s.date===today();}).length;
  var arc=clients.filter(function(c){return c.arch;}).length;

  var notifExpired=expired.length ? buildNotif(expired,'expired') : '';
  var notifExp=expiring.length ? buildNotif(expiring,false) : '';
  var notifDone=completed.length ? buildNotif(completed,true) : '';

  var filterChips='';
  if(groups.length){
    filterChips='<div class="frow" id="grpfilter"></div>';
  }

  var displayList=filterGrp ? ac.filter(function(c){
    var g=groups.find(function(gr){return String(gr.id)===String(filterGrp);});
    return g&&g.members&&g.members.indexOf(c.id)>-1;
  }) : ac;

  return notifExpired+notifExp+notifDone+
    '<div class="topbar"><div class="ptitle">'+t('clients')+'</div><button class="btn btnp" onclick="openCM()">+ Novi</button></div>'+
    '<div class="sgrid" style="grid-template-columns:1fr 1fr">'+
      '<div class="sc"><div class="sl">'+t('active')+'</div><div class="sv">'+ac.length+'</div></div>'+
      '<div class="sc"><div class="sl">'+t('today')+'</div><div class="sv">'+td+'</div></div>'+
    '</div>'+
    filterChips+
    '<div class="sw"><input placeholder="'+t('search')+'" oninput="filterClients(this.value)"/></div>'+
    '<div class="clist" id="clist">'+renderCards(displayList)+'</div>'+
    (arc?'<div style="text-align:center;margin-top:14px"><button class="btn btnsm" onclick="setTab(\'arhiva\')">📦 '+t('archive')+' ('+arc+')</button></div>':'');
}

function buildNotif(list,mode){
  // mode: 'expired' (red), true (green/done), false (default amber)
  var col=mode==='expired'?'red':mode===true?'green':'';
  var title=mode==='expired'?t('expiredTitle'):mode===true?t('completedPkgs'):t('expiringSoon');
  var items=list.map(function(c){
    var d=pkgExp(c)?du(pkgExp(c)):0;
    var when;
    if(mode==='expired'){when=expFmt(Math.abs(d));}
    else if(mode===true){when=t('completedJust');}
    else{when=d===0?t('today2'):d===1?t('tomorrow'):t('inDays')+d+t('days');}
    return '<div class="nitem '+col+'">'+c.name+' — '+when+'</div>';
  }).join('');
  return '<div class="notif on '+col+'"><div class="ntitle '+col+'">'+title+'</div>'+items+'</div>';
}

function renderCards(list){
  if(!list.length)return '<div class="empty">'+t('noClients')+'</div>';
  return list.map(function(c){
    var p=c.pid?pgb(c.pid):null;
    var e=pkgExp(c),dl=e?du(e):null;
    var used=c.pused||0,total=p?p.s:0;
    var pct=total?Math.min(100,Math.round(used/total*100)):0;
    var isDone=total>0&&used>=total;
    var chk=sessions.some(function(s){return s.cid===c.id&&s.date===today();});
    var ts=sessions.find(function(s){return s.cid===c.id&&s.date===today();});
    var isExpired=!isDone&&dl!==null&&dl<0&&c.st!=='paused';
    var warn=(!isDone&&dl!==null&&dl>=0&&dl<=7&&c.st!=='paused')?(dl===0?t('expToday'):dl===1?t('expTomorrow'):t('expDays')+dl+t('days')):'';
    var expiredText=isExpired?'❌ '+expFmt(Math.abs(dl)):'';
    var renewed=c.rat&&du(c.rat)>=-3&&du(c.rat)<=0;
    var cgs=groups.filter(function(g){return g.members&&g.members.indexOf(c.id)>-1;});

    var cls='cc'+(chk?' trained':'')+(isDone?' completed':isExpired?' expired':warn?' expiring':'');

    // Boja progress bara: zelena → narandžasta → crvena prema iskoristećenosti / blizini isteka
    var barColor='var(--green)';
    if(p&&!isDone){
      var dayDanger=0;
      if(dl!==null&&dl!==undefined){
        if(dl<=3)dayDanger=95;
        else if(dl<=7)dayDanger=80;
        else if(dl<=14)dayDanger=55;
        else dayDanger=25;
      }
      var danger=Math.max(pct,dayDanger);
      barColor=danger>=85?'var(--red)':danger>=60?'#ff9500':'var(--green)';
    }

    return '<div class="'+cls+'">'+
      '<div class="ctop">'+
        '<div class="chk'+(chk?' on':'')+'" data-train="'+c.id+'">'+
          '<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><polyline points="2,6.5 5,9.5 11,3" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'+
        '</div>'+
        '<div class="av">'+ini(c.name)+'</div>'+
        '<div class="ci">'+
          '<div class="cn" data-prof="'+c.id+'">'+c.name+'</div>'+
          '<div class="cmeta">'+
            (p?'<span class="tchip '+TC[p.t]+'">'+TL[p.t]+'</span>':'')+
            (p?'<span>'+p.s+' '+t('sessions')+' · €'+p.p+'</span>':'<span style="color:var(--text3)">'+t('noPackage')+'</span>')+
            (e?'<span>· '+fmtD(e)+'</span>':'')+
            cgs.map(function(g){return '<span class="grpchip" style="background:'+g.color+'22;color:'+g.color+';border-color:'+g.color+'44">'+g.name+'</span>';}).join('')+
          '</div>'+
          (ts?'<div class="cstamp">'+t('trainedAt')+ts.time+'</div>':'')+
          (isDone?'<div class="cdone">'+t('doneMsg')+'</div>':isExpired?'<div class="cexp">'+expiredText+'</div>':warn?'<div class="cwarn">'+warn+'</div>':
            (p&&total>0?'<div style="font-size:11px;color:var(--text3);margin-top:2px">'+used+t('sessUsed')+total+t('sessLabel')+'</div>':''))+
          (renewed?'<div class="crenew">'+t('renewed')+fmtD(c.rat)+(c.rn?' · '+c.rn:'')+'</div>':'')+
        '</div>'+
        '<div class="cr">'+
          '<span class="bdg '+bc(c.st)+'">'+bl(c.st)+'</span>'+
          (p?'<span class="ptag'+(isDone?' style="background:var(--gbg);color:var(--green)"':'')+'">'+used+'/'+total+'</span>':'')+
        '</div>'+
      '</div>'+
      (p?'<div class="prow"><div class="pbar"><div class="pfill" style="width:'+pct+'%;background:'+barColor+'"></div></div><span class="plbl" style="color:'+barColor+';font-weight:600">'+pct+'%</span></div>':'')+
    '</div>';
  }).join('');
}

function filterClients(q){
  var el=document.getElementById('clist');
  if(!el)return;
  var ac=clients.filter(function(c){return !c.arch;});
  el.innerHTML=renderCards(ac.filter(function(c){return c.name.toLowerCase().indexOf(q.toLowerCase())>-1;}));
}

// Event delegation for client list
document.getElementById('content').addEventListener('click',function(e){
  var train=e.target.closest('[data-train]');
  if(train){togTrain(Number(train.getAttribute('data-train')));return;}
  var prof=e.target.closest('[data-prof]');
  if(prof){openProf(Number(prof.getAttribute('data-prof')));return;}
  var renew=e.target.closest('[data-renew]');
  if(renew){openRenew(Number(renew.getAttribute('data-renew')));return;}
  var edit=e.target.closest('[data-edit]');
  if(edit){openCM(Number(edit.getAttribute('data-edit')));return;}
  var arch=e.target.closest('[data-arch]');
  if(arch){archC(Number(arch.getAttribute('data-arch')));return;}
  var actv=e.target.closest('[data-actv]');
  if(actv){actC(Number(actv.getAttribute('data-actv')));return;}
  var delc=e.target.closest('[data-delc]');
  if(delc){delC(Number(delc.getAttribute('data-delc')));return;}
  var delp=e.target.closest('[data-delp]');
  if(delp){delPkg(Number(delp.getAttribute('data-delp')));return;}
  var editp=e.target.closest('[data-editp]');
  if(editp){openPkgM(Number(editp.getAttribute('data-editp')));return;}
  var editg=e.target.closest('[data-editg]');
  if(editg){openGrpM(Number(editg.getAttribute('data-editg')));return;}
  var delg=e.target.closest('[data-delg]');
  if(delg){delGrp(Number(delg.getAttribute('data-delg')));return;}
  var rmem=e.target.closest('[data-rmem]');
  if(rmem){var parts=rmem.getAttribute('data-rmem').split('_');removeFromGroup(Number(parts[0]),Number(parts[1]));return;}
  var gfbtn=e.target.closest('[data-gf]');
  if(gfbtn){setGF(gfbtn.getAttribute('data-gf'));return;}
  var editslot=e.target.closest('[data-eslot]');
  if(editslot){openSlotEdit(Number(editslot.getAttribute('data-eslot')));return;}
  var newslot=e.target.closest('[data-nslot]');
  if(newslot){openSlotNew(newslot.getAttribute('data-date'),newslot.getAttribute('data-hour'));return;}
  var fp=e.target.closest('[data-fper]');
  if(fp){finPer=fp.getAttribute('data-fper');renderPage();return;}
});

// Group filter chips - rendered after page load
function buildGrpFilter(){
  var el=document.getElementById('grpfilter');
  if(!el)return;
  var h='<button class="fbtn'+(filterGrp===''?' on':'')+'" data-gf="">'+t('allClients')+'</button>';
  groups.forEach(function(g){
    h+='<button class="fbtn'+(String(filterGrp)===String(g.id)?' on':'')+'" data-gf="'+g.id+'" style="'+(String(filterGrp)===String(g.id)?'border-color:'+g.color+';color:'+g.color+';background:'+g.color+'22':'')+'">'+g.name+'</button>';
  });
  el.innerHTML=h;
}
function setGF(id){filterGrp=id;renderPage();setTimeout(buildGrpFilter,10);}

// // --- TRAIN TOGGLE -----------------------------------------
function togTrain(cid){
  var d=now2(),c=cob(cid),ex=sessions.find(function(s){return s.cid===cid&&s.date===d.date;});
  if(ex){
    sessions=sessions.filter(function(s){return !(s.cid===cid&&s.date===d.date);});
    if(c&&c.pused>0)c.pused--;
    // Remove matching slot from schedule
    slots=slots.filter(function(s){return !(s.cid===cid&&s.date===d.date&&s.auto);});
    sv();renderPage();toast(t('trainRemoved'));
  } else {
    sessions.push({id:Date.now(),cid:cid,date:d.date,time:d.time,dur:60,type:'Kombinirano',note:'Brzi unos'});
    if(c)c.pused=(c.pused||0)+1;
    // Also add to schedule as auto-slot
    var roundedTime=pad(Math.min(21,Math.max(6,parseInt(d.time.split(':')[0]))))+':'+( parseInt(d.time.split(':')[1])>=30?'30':'00');
    slots.push({id:Date.now()+1,cid:cid,date:d.date,time:roundedTime,dur:60,note:'',auto:true});
    var p=c&&c.pid?pgb(c.pid):null;
    var justDone=p&&(c.pused||0)>=p.s;
    sv();renderPage();
    toast(justDone?'🎉 '+c.name.split(' ')[0]+' — '+t('completedJust'):t('trainedAt')+d.time);
  }
}

// // --- ARCHIVE ----------------------------------------------
function archC(id){var i=clients.findIndex(function(c){return c.id===id;});if(i>-1){clients[i].arch=true;sv();renderPage();toast(t('clientArch'));}}
function actC(id){var i=clients.findIndex(function(c){return c.id===id;});if(i>-1){clients[i].arch=false;sv();renderPage();toast(t('clientAct'));}}
function delC(id){
  if(!confirm(t('confirmDel')))return;
  clients=clients.filter(function(c){return c.id!==id;});
  sessions=sessions.filter(function(s){return s.cid!==id;});
  sv();renderPage();toast(t('clientDel'));
}

// // --- CLIENT MODAL -----------------------------------------
function buildPkgSel(gid,curId,prefix){
  var el=document.getElementById(gid);
  if(!el)return;
  if(!pkgs.length){el.innerHTML='<div style="font-size:12px;color:var(--text3)">Dodaj pakete u Paketi tabu.</div>';return;}
  el.innerHTML=pkgs.map(function(p){
    return '<div class="psopt'+(p.id===curId?' on':'')+'" data-psel="'+p.id+'" data-pgrid="'+gid+'" data-pprefix="'+prefix+'">'+
      '<div class="pn">'+p.s+'</div><div class="pl">'+t('sessions')+'</div><div class="pp">€'+p.p+'</div>'+
      '<div style="margin-top:3px"><span class="tchip '+TC[p.t]+'" style="font-size:9px">'+TL[p.t]+'</span></div>'+
    '</div>';
  }).join('');
}
document.addEventListener('click',function(e){
  var ps=e.target.closest('[data-psel]');
  if(ps){
    var id=Number(ps.getAttribute('data-psel'));
    var grid=ps.getAttribute('data-pgrid');
    var prefix=ps.getAttribute('data-pprefix');
    if(prefix==='fp'){sPid=(sPid===id?null:id);buildPkgSel(grid,sPid,'fp');}
    else if(prefix==='rp'){rPid=id;buildPkgSel(grid,rPid,'rp');}
  }
  var cprow=e.target.closest('[data-cpick]');
  if(cprow){
    sltCid=Number(cprow.getAttribute('data-cpick'));
    document.querySelectorAll('.cprow').forEach(function(el){el.classList.remove('on');});
    cprow.classList.add('on');
  }
  var mchk=e.target.closest('[data-mchk]');
  if(mchk){
    mchk.classList.toggle('on');
    mchk.innerHTML=mchk.classList.contains('on')?'<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polyline points="1.5,5 4,7.5 8.5,2" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>':'';
  }
  var tyopt=e.target.closest('[data-tyopt]');
  if(tyopt){selTy(tyopt.getAttribute('data-tyopt'));}
  var coldot=e.target.closest('[data-col]');
  if(coldot){
    gColor=coldot.getAttribute('data-col');
    document.querySelectorAll('.coldot').forEach(function(d){d.classList.remove('on');});
    coldot.classList.add('on');
  }
  var rsopt=e.target.closest('[data-rs]');
  if(rsopt){selRS(rsopt.getAttribute('data-rs'));}
});

function openCM(id){
  eCid=id||null;sPid=null;
  document.getElementById('mCt').textContent=id?t('edit')+' klijenta':'Novi klijent';
  if(id){
    var c=clients.find(function(x){return x.id===id;});
    if(!c)return;
    document.getElementById('fn').value=c.name;
    document.getElementById('fstart').value=c.pstart||'';
    document.getElementById('fst').value=c.st;
    sPid=c.pid||null;
  } else {
    document.getElementById('fn').value='';
    document.getElementById('fstart').value=today();
    document.getElementById('fst').value='active';
  }
  buildPkgSel('fpg',sPid,'fp');
  om('mC');
}
function saveC(){
  var name=document.getElementById('fn').value.trim();
  if(!name){toast(t('enterName'));return;}
  var data={name:name,pid:sPid,pstart:document.getElementById('fstart').value,st:document.getElementById('fst').value};
  if(eCid){var i=clients.findIndex(function(c){return c.id===eCid;});clients[i]=Object.assign({},clients[i],data);}
  else clients.push(Object.assign({id:Date.now(),pused:0,rat:null,rn:'',arch:false,note:''},data));
  sv();cm('mC');renderPage();toast(eCid?t('clientEdited'):t('clientAdded'));
}

// // --- RENEW ------------------------------------------------
function openRenew(cid){
  eRcid=cid;rStat='active';
  var c=cob(cid),p=c.pid?pgb(c.pid):null;
  document.getElementById('mRent').textContent='Produži — '+c.name.split(' ')[0];
  document.getElementById('mReni').innerHTML=p?
    '<div style="font-size:11px;color:var(--text3);margin-bottom:5px">Trenutni paket</div>'+
    '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">'+
    '<span class="tchip '+TC[p.t]+'">'+TL[p.t]+'</span>'+
    '<strong style="font-size:15px">'+p.s+' '+t('sessions')+' · €'+p.p+'</strong></div>'+
    '<div style="margin-top:5px;font-size:12px;color:var(--text3)">Ističe: '+fmtD(pkgExp(c))+' · Iskorišćeno: '+(c.pused||0)+'/'+p.s+'</div>':
    '<div style="font-size:13px;color:var(--text3)">Nema aktivnog paketa.</div>';
  rPid=c.pid||null;
  buildPkgSel('rpg',rPid,'rp');
  var e=pkgExp(c),nd=new Date(e||today());nd.setDate(nd.getDate()+1);
  document.getElementById('rstart').value=nd.toISOString().split('T')[0];
  document.getElementById('rnote').value='';
  selRS('active');
  om('mRen');
}
function doRenew(){
  if(!rPid){toast(t('enterPkg'));return;}
  var sd=document.getElementById('rstart').value;
  if(!sd){toast(t('enterDate'));return;}
  var note=document.getElementById('rnote').value.trim();
  var i=clients.findIndex(function(c){return c.id===eRcid;});
  clients[i]=Object.assign({},clients[i],{pid:rPid,pstart:sd,pused:0,st:rStat,rat:today(),rn:note});
  sv();cm('mRen');renderPage();toast(t('renewedOk'));
}

// // --- CLIENT PROFILE ---------------------------------------
function openProf(cid){
  fmsScores={};
  var c=cob(cid);
  if(!c)return;
  var p=c.pid?pgb(c.pid):null;
  var e=pkgExp(c),dl=e?du(e):null;
  var used=c.pused||0,total=p?p.s:0;
  var pct=total?Math.min(100,Math.round(used/total*100)):0;
  var isDone=total>0&&used>=total;
  var allSess=sessions.filter(function(s){return s.cid===cid;}).sort(function(a,b){return b.date.localeCompare(a.date);});
  var mth=new Date();
  var thisMo=allSess.filter(function(s){var a=s.date.split('-').map(Number);return a[0]===mth.getFullYear()&&a[1]===mth.getMonth()+1;});
  var last=allSess[0];
  var nxt=slots.filter(function(s){return s.cid===cid&&s.date>=today();}).sort(function(a,b){return a.date.localeCompare(b.date)||a.time.localeCompare(b.time);});
  var cgs=groups.filter(function(g){return g.members&&g.members.indexOf(cid)>-1;});

  var dots='';
  if(total>0){for(var i=0;i<total;i++)dots+='<div class="sdot'+(i>=used?' empty':'')+'" title="Termin '+(i+1)+'"></div>';}

  var recent=allSess.slice(0,5).map(function(s){
    return '<div class="profrow"><div class="proflbl">'+fmtD(s.date)+(s.time?' u '+s.time:'')+' · '+s.type+'</div><div class="profval">'+s.dur+'min</div></div>';
  }).join('');

  var html='<div class="profhdr">'+
    '<div class="profav">'+ini(c.name)+'</div>'+
    '<div>'+
      '<div class="profname">'+c.name+'</div>'+
      '<div class="profsub">'+
        (p?'<span class="tchip '+TC[p.t]+'">'+TL[p.t]+'</span> ':'')+
        '<span class="bdg '+bc(c.st)+'">'+bl(c.st)+'</span>'+
      '</div>'+
      (cgs.length?'<div style="margin-top:5px">'+cgs.map(function(g){return '<span class="grpchip" style="background:'+g.color+'22;color:'+g.color+';border-color:'+g.color+'44">'+g.name+'</span>';}).join(' ')+'</div>':'')+
    '</div>'+
  '</div>'+

  // TAB BAR
  '<div class="ptabs">'+
    '<button class="ptab on" onclick="switchProfTab(\'info\','+cid+')"><span style="margin-right:4px">📋</span>'+t('profTabInfo')+'</button>'+
    '<button class="ptab" onclick="switchProfTab(\'tests\','+cid+')"><span style="margin-right:4px">🧪</span>'+t('profTabTests')+'</button>'+
  '</div>'+

  // INFO TAB
  '<div class="ptab-body on" id="ptab_info">'+

  '<div class="profsec">'+
    '<div class="profsect">📦 '+t('profPkg')+'</div>'+
    (p?
      '<div class="profrow"><div class="proflbl">Paket</div><div class="profval">'+(p.n||p.s+' '+t('sessions'))+'</div></div>'+
      '<div class="profrow"><div class="proflbl">Cena</div><div class="profval red">€'+p.p+'</div></div>'+
      '<div class="profrow"><div class="proflbl">Termini</div><div class="profval '+(isDone?'green':'')+'">'+used+' / '+total+(isDone?' 🎉':'')+'</div></div>'+
      '<div class="profrow"><div class="proflbl">Ističe</div><div class="profval '+(dl!==null&&dl<=7&&!isDone?'amber':'')+'">'+fmtD(e)+(dl!==null?' ('+( dl===0?t('today2'):dl===1?t('tomorrow'):t('inDays')+dl+t('days') )+')':'' )+'</div></div>'+
      (total>0?'<div style="margin-top:8px"><div style="font-size:11px;color:var(--text3);margin-bottom:5px">'+t('usedSessions')+'</div><div class="sdots">'+dots+'</div></div>':'')+
      '<div style="margin-top:8px"><div class="pbar"><div class="pfill'+(isDone?' full':'')+'" style="width:'+pct+'%"></div></div><div style="font-size:11px;color:var(--text3);margin-top:4px">'+pct+'% '+t('usedSessions').toLowerCase()+'</div></div>'
    :'<div style="font-size:13px;color:var(--text3)">Nema aktivnog paketa.</div>')+
  '</div>'+

  '<div class="profsec">'+
    '<div class="profsect">📊 '+t('profStats')+'</div>'+
    '<div class="profrow"><div class="proflbl">'+t('totalSessions')+'</div><div class="profval">'+allSess.length+'</div></div>'+
    '<div class="profrow"><div class="proflbl">'+t('thisMonth')+'</div><div class="profval">'+thisMo.length+'</div></div>'+
    '<div class="profrow"><div class="proflbl">'+t('lastSession')+'</div><div class="profval">'+(last?fmtD(last.date):'—')+'</div></div>'+
    '<div class="profrow"><div class="proflbl">'+t('nextSlot')+'</div><div class="profval">'+(nxt[0]?fmtD(nxt[0].date)+' '+nxt[0].time:t('notScheduled'))+'</div></div>'+
    (c.pstart?'<div class="profrow"><div class="proflbl">'+t('clientSince')+'</div><div class="profval">'+fmtD(c.pstart)+'</div></div>':'')+
  '</div>'+

  (recent?'<div class="profsec"><div class="profsect">🏋️ '+t('last5')+'</div>'+recent+'</div>':'')+

  '<div class="profsec">'+
    '<div class="profsect">📝 '+t('notes')+'</div>'+
    '<textarea class="notarea" id="profnote" placeholder="'+t('notesPh')+'">'+( c.note||'')+'</textarea>'+
    '<div style="margin-top:8px"><button class="btn btng btnsm" onclick="saveNote('+cid+')">Sačuvaj beleške</button></div>'+
  '</div>'+

  '<div style="display:flex;gap:8px;margin-top:4px;flex-wrap:wrap">'+
    '<button class="btn btnp btnsm" onclick="cm(\'mProf\');openRenew('+cid+')">'+t('renewPkg')+'</button>'+
    '<button class="btn btnsm" onclick="cm(\'mProf\');openCM('+cid+')">'+t('editData')+'</button>'+
    '<button class="btn btnsm btna" onclick="cm(\'mProf\');archC('+cid+')">'+t('archiveBtn')+'</button>'+
    '<button class="btn btnsm btnr" onclick="cm(\'mProf\');delC('+cid+')">'+t('delForever')+'</button>'+
  '</div>'+

  '</div>'+ // end info tab

  // TESTING TAB
  '<div class="ptab-body" id="ptab_tests">'+

    // Sub-tab selector
    '<div class="ttabs">'+
      '<button class="ttab on" onclick="switchTestTab(\'iso\','+cid+')"><span class="ttab-icon">💪</span>'+t('ttIso')+'</button>'+
      '<button class="ttab" onclick="switchTestTab(\'fms\','+cid+')"><span class="ttab-icon">🏋️</span>'+t('ttFMS')+'</button>'+
      '<button class="ttab" onclick="switchTestTab(\'ruf\','+cid+')"><span class="ttab-icon">❤️</span>'+t('ttRuf')+'</button>'+
      '<button class="ttab" onclick="switchTestTab(\'1rm\','+cid+')"><span class="ttab-icon">🏆</span>'+t('tt1RM')+'</button>'+
    '</div>'+

    // Sub-tab bodies
    '<div class="ttab-body on" id="tt_iso">'+buildTestSection(cid)+'</div>'+
    '<div class="ttab-body" id="tt_fms">'+buildFMSSection(cid)+'</div>'+
    '<div class="ttab-body" id="tt_ruf">'+buildRuffierSection(cid)+'</div>'+
    '<div class="ttab-body" id="tt_1rm">'+build1RMSection(cid)+'</div>'+

  '</div>'; // end testing tab

  document.getElementById('profbody').innerHTML=html;
  om('mProf');
}
function saveNote(cid){
  var i=clients.findIndex(function(c){return c.id===cid;});
  if(i===-1)return;
  clients[i].note=document.getElementById('profnote').value;
  sv();toast(t('notesSaved'));
}

function switchProfTab(tabId,cid){
  // Toggle tab buttons
  var tabs=document.querySelectorAll('.ptab');
  tabs.forEach(function(tb){tb.classList.remove('on');});
  var bodies=document.querySelectorAll('.ptab-body');
  bodies.forEach(function(b){b.classList.remove('on');});

  if(tabId==='info'){
    if(tabs[0])tabs[0].classList.add('on');
    var el=document.getElementById('ptab_info');
    if(el)el.classList.add('on');
  } else {
    if(tabs[1])tabs[1].classList.add('on');
    var el=document.getElementById('ptab_tests');
    if(el)el.classList.add('on');
  }

  // Scroll to top of modal
  var modal=document.querySelector('#mProf .modal');
  if(modal)modal.scrollTop=0;
}

var activeTestTab='iso';
function switchTestTab(tabId,cid){
  activeTestTab=tabId;
  // Toggle sub-tab buttons
  var btns=document.querySelectorAll('.ttab');
  btns.forEach(function(b){b.classList.remove('on');});
  var bodies=document.querySelectorAll('.ttab-body');
  bodies.forEach(function(b){b.classList.remove('on');});

  var tabMap={iso:0,fms:1,ruf:2,'1rm':3};
  var idx=tabMap[tabId]||0;
  if(btns[idx])btns[idx].classList.add('on');

  var el=document.getElementById('tt_'+tabId);
  if(el)el.classList.add('on');
}

// // --- CLIENT TESTING ----------------------------------------
var editingIsoIdx=null; // {cid,idx} kad se izmena testa

function getTests(cid){
  var c=cob(cid);
  return (c&&c.isoTests)?c.isoTests:[];
}

window.editIsoTest=function(cid,idx){
  editingIsoIdx={cid:cid,idx:idx};
  openProf(cid);
  setTimeout(function(){
    switchProfTab('tests',cid);switchTestTab('iso',cid);
    var tests=getTests(cid),te=tests[idx];
    if(!te)return;
    ISO_EXERCISES.forEach(function(ex){
      var d=te.data&&te.data[ex.key];
      var e1=document.getElementById('iso_'+ex.key+'_1');
      var e2=document.getElementById('iso_'+ex.key+'_2');
      var e3=document.getElementById('iso_'+ex.key+'_3');
      if(e1)e1.value=d&&d.v1?d.v1:'';
      if(e2)e2.value=d&&d.v2?d.v2:'';
      if(e3)e3.value=d&&d.v3?d.v3:'';
    });
    var dEl=document.getElementById('iso_date');if(dEl)dEl.value=te.date||today();
    var nEl=document.getElementById('iso_note');if(nEl)nEl.value=te.note||'';
    if(dEl)dEl.scrollIntoView({behavior:'smooth',block:'center'});
  },120);
};

window.cancelIsoEdit=function(cid){
  editingIsoIdx=null;
  openProf(cid);
  setTimeout(function(){switchProfTab('tests',cid);switchTestTab('iso',cid);},50);
};

var ISO_EXERCISES=[
  {key:'vp',name:'Vertical Pull',icon:'🔼',sides:false},
  {key:'kpR',name:'Kvadriceps Pull (D)',icon:'🦵',sides:false},
  {key:'kpL',name:'Kvadriceps Pull (L)',icon:'🦵',sides:false},
  {key:'zlR',name:'Zadnja Loza (D)',icon:'🦿',sides:false},
  {key:'zlL',name:'Zadnja Loza (L)',icon:'🦿',sides:false},
  {key:'pr',name:'Prednje Rame',icon:'🏋️',sides:false},
  {key:'bi',name:'Biceps',icon:'💪',sides:false},
  {key:'sq',name:'Čučanj sa Pojasom',icon:'🏋️',sides:false},
  {key:'sk',name:'Sklek',icon:'👐',sides:false}
];

function isoExName(ex){
  var k=ex.key;
  if(k==='vp')return t('isoEx_vp');
  if(k==='pr')return t('isoEx_pr');
  if(k==='bi')return t('isoEx_bi');
  if(k==='sq')return t('isoEx_sq');
  if(k==='sk')return t('isoEx_sk');
  if(k==='kpR')return t('isoEx_kp')+' ('+t('sideR')+')';
  if(k==='kpL')return t('isoEx_kp')+' ('+t('sideL')+')';
  if(k==='zlR')return t('isoEx_zl')+' ('+t('sideR')+')';
  if(k==='zlL')return t('isoEx_zl')+' ('+t('sideL')+')';
  return ex.name||k;
}

function isoPairLabel(key){
  if(key==='kp')return t('isoEx_kp');
  if(key==='zl')return t('isoEx_zl');
  return key;
}

function buildTestSection(cid){
  var tests=getTests(cid);

  // FORM: each exercise has 3 attempts
  var formRows=ISO_EXERCISES.map(function(ex){
    var exNm=isoExName(ex);
    return '<div style="display:flex;align-items:center;gap:5px;margin-bottom:5px">'+
      '<div style="font-size:11px;font-weight:600;color:var(--text);width:100px;flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="'+exNm+'">'+ex.icon+' '+exNm+'</div>'+
      '<input id="iso_'+ex.key+'_1" type="number" step="any" inputmode="decimal" placeholder="1." style="flex:1;min-width:0;padding:6px 2px;font-size:13px;border:1px solid var(--border2);border-radius:4px;background:var(--bg2);color:var(--text);font-family:inherit;text-align:center"/>'+
      '<input id="iso_'+ex.key+'_2" type="number" step="any" inputmode="decimal" placeholder="2." style="flex:1;min-width:0;padding:6px 2px;font-size:13px;border:1px solid var(--border2);border-radius:4px;background:var(--bg2);color:var(--text);font-family:inherit;text-align:center"/>'+
      '<input id="iso_'+ex.key+'_3" type="number" step="any" inputmode="decimal" placeholder="3." style="flex:1;min-width:0;padding:6px 2px;font-size:13px;border:1px solid var(--border2);border-radius:4px;background:var(--bg2);color:var(--text);font-family:inherit;text-align:center"/>'+
    '</div>';
  }).join('');

  // HISTORY
  var history='';
  if(tests.length){
    history=tests.slice().reverse().map(function(te,idx){
      var realIdx=tests.length-1-idx;

      // --- RESULTS TABLE (Avg + Max per exercise) ---
      var tableRows=ISO_EXERCISES.map(function(ex){
        var d=te.data&&te.data[ex.key];
        if(!d)return '';
        var avg=d.avg||0;
        var maxV=Math.max(d.v1||0,d.v2||0,d.v3||0);
        return '<tr>'+
          '<td style="padding:5px 6px;font-size:12px;color:var(--text);white-space:nowrap">'+ex.icon+' '+isoExName(ex)+'</td>'+
          '<td style="padding:5px 4px;font-size:11px;color:var(--text3);text-align:center">'+(d.v1||'—')+'</td>'+
          '<td style="padding:5px 4px;font-size:11px;color:var(--text3);text-align:center">'+(d.v2||'—')+'</td>'+
          '<td style="padding:5px 4px;font-size:11px;color:var(--text3);text-align:center">'+(d.v3||'—')+'</td>'+
          '<td style="padding:5px 6px;font-size:12px;font-weight:700;color:var(--red);text-align:center">'+avg.toFixed(1)+'</td>'+
          '<td style="padding:5px 6px;font-size:12px;font-weight:700;color:var(--green);text-align:center">'+maxV+'</td>'+
        '</tr>';
      }).filter(function(r){return r;}).join('');

      var resultsTable='<div style="overflow-x:auto;margin-bottom:12px">'+
        '<table style="width:100%;border-collapse:collapse;border:1px solid var(--border);border-radius:var(--rs);overflow:hidden;font-family:inherit">'+
          '<thead><tr style="background:var(--bg2)">'+
            '<th style="padding:6px;font-size:11px;color:var(--text2);text-align:left;font-weight:700">'+t('colExercise')+'</th>'+
            '<th style="padding:6px;font-size:10px;color:var(--text3);text-align:center;font-weight:600">1.</th>'+
            '<th style="padding:6px;font-size:10px;color:var(--text3);text-align:center;font-weight:600">2.</th>'+
            '<th style="padding:6px;font-size:10px;color:var(--text3);text-align:center;font-weight:600">3.</th>'+
            '<th style="padding:6px;font-size:11px;color:var(--red);text-align:center;font-weight:700">'+t('colAvg')+'</th>'+
            '<th style="padding:6px;font-size:11px;color:var(--green);text-align:center;font-weight:700">'+t('colMax')+'</th>'+
          '</tr></thead>'+
          '<tbody>'+tableRows+'</tbody>'+
        '</table>'+
      '</div>';

      // --- DISBALANCE ANALYSIS (D vs L) ---
      var pairs=[
        {nameR:'kpR',nameL:'kpL',pairKey:'kp'},
        {nameR:'zlR',nameL:'zlL',pairKey:'zl'}
      ];
      var disbalanceRows=pairs.map(function(pair){
        var dR=te.data&&te.data[pair.nameR];
        var dL=te.data&&te.data[pair.nameL];
        if(!dR&&!dL)return '';
        var avgR=dR?dR.avg:0;
        var avgL=dL?dL.avg:0;
        var maxR=dR?Math.max(dR.v1||0,dR.v2||0,dR.v3||0):0;
        var maxL=dL?Math.max(dL.v1||0,dL.v2||0,dL.v3||0):0;
        var bigger=avgR>=avgL?t('sideR'):t('sideL');
        var diff=Math.abs(avgR-avgL);
        var maxAvg=Math.max(avgR,avgL);
        var pct=maxAvg>0?Math.round(diff/maxAvg*100):0;
        var barR=maxAvg>0?Math.round(avgR/maxAvg*100):0;
        var barL=maxAvg>0?Math.round(avgL/maxAvg*100):0;
        var status=pct<=5?t('disbExcellent'):pct<=10?t('disbOK'):pct<=15?t('disbModerate'):t('disbSignificant');
        var statusCol=pct<=5?'var(--green)':pct<=10?'var(--amber)':pct<=15?'#e65100':'var(--red)';
        var statusBg=pct<=5?'var(--gbg)':pct<=10?'var(--abg)':pct<=15?'#fff3e0':'var(--redbg)';

        return '<div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--rs);padding:10px 12px;margin-bottom:8px">'+
          '<div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:8px">'+isoPairLabel(pair.pairKey)+'</div>'+
          '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'+
            '<div style="width:24px;font-size:11px;font-weight:700;color:var(--text2)">'+t('sideR')+'</div>'+
            '<div style="flex:1;height:20px;background:var(--bg3);border-radius:4px;overflow:hidden;position:relative">'+
              '<div style="height:100%;width:'+barR+'%;background:var(--red);border-radius:4px;transition:width .3s"></div>'+
            '</div>'+
            '<div style="width:55px;font-size:13px;font-weight:700;color:var(--text);text-align:right">'+avgR.toFixed(1)+' kg</div>'+
          '</div>'+
          '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">'+
            '<div style="width:24px;font-size:11px;font-weight:700;color:var(--text2)">'+t('sideL')+'</div>'+
            '<div style="flex:1;height:20px;background:var(--bg3);border-radius:4px;overflow:hidden;position:relative">'+
              '<div style="height:100%;width:'+barL+'%;background:#1a56db;border-radius:4px;transition:width .3s"></div>'+
            '</div>'+
            '<div style="width:55px;font-size:13px;font-weight:700;color:var(--text);text-align:right">'+avgL.toFixed(1)+' kg</div>'+
          '</div>'+
          '<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 10px;background:'+statusBg+';border-radius:var(--rs)">'+
            '<div style="font-size:12px;color:'+statusCol+';font-weight:600">'+status+'</div>'+
            '<div style="font-size:12px;color:'+statusCol+'">'+t('disbDiff')+': '+diff.toFixed(1)+' kg ('+pct+'%) — '+bigger+' '+t('disbStronger')+'</div>'+
          '</div>'+
        '</div>';
      }).filter(function(r){return r;}).join('');

      var disbalanceSection=disbalanceRows?
        '<div style="margin-top:4px;margin-bottom:4px">'+
          '<div style="font-size:12px;font-weight:700;color:var(--text2);margin-bottom:8px">'+t('disbHeader')+'</div>'+
          disbalanceRows+
        '</div>':'';

      return '<div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--rs);padding:12px;margin-bottom:12px">'+
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">'+
          '<div><div style="font-size:14px;font-weight:700;color:var(--text)">'+fmtD(te.date)+'</div>'+
          (te.note?'<div style="font-size:11px;color:var(--text3);margin-top:2px">'+te.note+'</div>':'')+
          '</div>'+
          '<div style="display:flex;gap:6px">'+
            '<button class="btn btnsm" style="padding:3px 8px;font-size:11px" onclick="window.editIsoTest('+cid+','+realIdx+');event.stopPropagation();">'+t('editBtn')+'</button>'+
            '<button class="btn btnsm btnr" style="padding:3px 8px;font-size:11px" onclick="window.delTestNow('+cid+','+realIdx+');event.stopPropagation();">×</button>'+
          '</div>'+
        '</div>'+
        resultsTable+
        disbalanceSection+
      '</div>';
    }).join('');
  } else {
    history='<div style="font-size:13px;color:var(--text3);text-align:center;padding:16px 0">'+t('noTests')+'</div>';
  }

  return '<div class="profsec">'+
    '<div class="profsect">🧪 '+t('testing')+'</div>'+
    '<div style="font-size:12px;color:var(--text3);margin-bottom:10px">'+t('isoDesc')+'</div>'+
    formRows+
    '<div style="display:flex;gap:8px;margin-bottom:6px">'+
      '<div style="flex:1"><div style="font-size:11px;color:var(--text2);margin-bottom:4px">📅 '+t('date')+'</div><input id="iso_date" type="date" value="'+today()+'" style="width:100%;padding:8px;font-size:13px;border:1px solid var(--border2);border-radius:var(--rs);background:var(--bg2);color:var(--text);font-family:inherit;-webkit-appearance:none"/></div>'+
      '<div style="flex:1"><div style="font-size:11px;color:var(--text2);margin-bottom:4px">📝 '+t('testNote')+'</div><input id="iso_note" placeholder="'+t('optional')+'" style="width:100%;padding:8px;font-size:13px;border:1px solid var(--border2);border-radius:var(--rs);background:var(--bg2);color:var(--text);font-family:inherit"/></div>'+
    '</div>'+
    (editingIsoIdx&&editingIsoIdx.cid===cid?
      '<div style="background:var(--abg);border:1px solid var(--amber);border-radius:var(--rs);padding:8px 12px;margin-top:6px;font-size:12px;color:var(--amber);font-weight:600;text-align:center">'+t('isoEditing')+' '+(getTests(cid)[editingIsoIdx.idx]?fmtD(getTests(cid)[editingIsoIdx.idx].date):'')+'</div>'+
      '<div style="display:flex;gap:6px;margin-top:6px">'+
        '<button class="btn btnsm" style="flex:1;padding:10px" onclick="window.cancelIsoEdit('+cid+')">'+t('cancelBtn')+'</button>'+
        '<button class="btn btnp btnsm" style="flex:2;padding:10px" onclick="addTest('+cid+')">'+t('saveEdit')+'</button>'+
      '</div>'
    :
      '<button class="btn btnp btnsm" style="width:100%;padding:10px;margin-top:6px" onclick="addTest('+cid+')">'+t('addTest')+'</button>'
    )+
    '<div style="font-size:13px;font-weight:700;color:var(--text2);margin:16px 0 10px">'+t('testHistory')+'</div>'+
    history+
  '</div>';
}

function addTest(cid){
  var i=clients.findIndex(function(c){return c.id===cid;});
  if(i===-1)return;
  if(!clients[i].isoTests)clients[i].isoTests=[];
  var data={};
  var hasVal=false;
  ISO_EXERCISES.forEach(function(ex){
    var v1=Number(document.getElementById('iso_'+ex.key+'_1').value)||0;
    var v2=Number(document.getElementById('iso_'+ex.key+'_2').value)||0;
    var v3=Number(document.getElementById('iso_'+ex.key+'_3').value)||0;
    if(v1||v2||v3){
      var cnt=(v1?1:0)+(v2?1:0)+(v3?1:0);
      var avg=cnt?(v1+v2+v3)/cnt:0;
      data[ex.key]={v1:v1,v2:v2,v3:v3,avg:avg};
      hasVal=true;
    }
  });
  if(!hasVal){toast(t('enterTest'));return;}
  var date=document.getElementById('iso_date').value||today();
  var note=(document.getElementById('iso_note').value||'').trim();
  var isEditing=editingIsoIdx&&editingIsoIdx.cid===cid&&clients[i].isoTests[editingIsoIdx.idx];
  if(isEditing){
    clients[i].isoTests[editingIsoIdx.idx]={date:date,data:data,note:note};
    editingIsoIdx=null;
  } else {
    clients[i].isoTests.push({date:date,data:data,note:note});
  }
  sv();
  openProf(cid);
  setTimeout(function(){switchProfTab('tests',cid);switchTestTab('iso',cid);},50);
  toast(isEditing?t('isoEditSaved'):t('testSaved'));
}

// // --- FMS TEST -----------------------------------------------
var FMS_DATA=[
  {key:'deep_squat',icon:'⬇️',nameKey:'fmsDeepSquat',desc:'Bilateralna mobilnost kukova, kolena, skočnih zglobova'},
  {key:'hurdle_step',icon:'🦵',nameKey:'fmsHurdle',desc:'Bilateralna mobilnost i stabilnost tokom koraka'},
  {key:'inline_lunge',icon:'🏃',nameKey:'fmsLunge',desc:'Mobilnost i stabilnost trupa i donjih ekstremiteta'},
  {key:'shoulder_mob',icon:'💪',nameKey:'fmsShoulder',desc:'Bilateralna mobilnost ramenog pojasa'},
  {key:'aslr',icon:'🦿',nameKey:'fmsASLR',desc:'Fleksibilnost hamstringsa uz stabilnu karlicu'},
  {key:'trunk_pushup',icon:'🫸',nameKey:'fmsPushup',desc:'Stabilnost trupa u sagitalnoj ravni'},
  {key:'rotary_stab',icon:'🔄',nameKey:'fmsRotary',desc:'Stabilnost trupa u više ravni'}
];

var FMS_SCORE_COLORS={
  0:{border:'var(--red)',bg:'var(--redbg)',cls:'s0'},
  1:{border:'#ff6b35',bg:'#fff3e0',cls:'s1'},
  2:{border:'var(--amber)',bg:'var(--abg)',cls:'s2'},
  3:{border:'var(--green)',bg:'var(--gbg)',cls:'s3'}
};
var FMS_SCORE_KEYS=['fmsScore0','fmsScore1','fmsScore2','fmsScore3'];

// Korektivne preporuke po jeziku, testu i oceni (0=bol, 1=ne izvodi, 2=kompenzacija)
var FMS_CORRECTIONS={
  sr:{
    deep_squat:{0:'⚠️ Duboki čučanj — BOL: prekini test i uputi klijenta specijalisti.',1:'Duboki čučanj: mobilnost skočnih (dorzifleksija), kukova i torakalne kičme. Vežbe: ankle wall test, hip 90/90, foam roll T-spine.',2:'Duboki čučanj: stretching kukova i lista, goblet squat sa peticom podignutom (3–5°), heel elevated squat.'},
    hurdle_step:{0:'⚠️ Korak preko prepone — BOL: uputi specijalisti.',1:'Korak preko prepone: stabilnost na jednoj nozi, jačanje gluteus medius. Vežbe: single leg balance, side-lying clamshell, monster walks.',2:'Korak preko prepone: single leg deadlift, hip flexor stretch (kneeling), step-up sa kontrolom karlice.'},
    inline_lunge:{0:'⚠️ Iskorak u liniji — BOL: uputi specijalisti.',1:'Iskorak u liniji: mobilnost skočnih, hip flexor stretch, anti-rotacija core-a. Vežbe: half-kneeling Pallof press, kneeling hip flexor stretch.',2:'Iskorak u liniji: statički iskorak (split squat hold), torakalna rotacija (open book), reverse lunge progresija.'},
    shoulder_mob:{0:'⚠️ Mobilnost ramena — BOL: uputi specijalisti (impingement test).',1:'Mobilnost ramena: torakalna mobilnost, sleeper stretch, pec minor stretch. Vežbe: foam roll T-spine, doorway pec stretch, cross-body stretch.',2:'Mobilnost ramena: skapularna mobilnost (wall slides), lat stretching, band dislocates.'},
    aslr:{0:'⚠️ Podizanje noge — BOL: uputi specijalisti.',1:'ASLR: mobilnost hamstringsa, aktivna stabilnost karlice. Vežbe: supine hamstring stretch (band), dead bug, posterior pelvic tilt.',2:'ASLR: hamstring stretching (PNF), dead bug progresija, hip flexor mobilnost (couch stretch).'},
    trunk_pushup:{0:'⚠️ Stabilnost trupa — BOL: uputi specijalisti (LBP screening).',1:'Stabilnost trupa: plank progresije, anti-ekstenzioni rad core-a. Vežbe: plank with knee, modified push-up, dead bug.',2:'Stabilnost trupa: hollow body hold, izdržljivost trupa, full plank → push-up progresija.'},
    rotary_stab:{0:'⚠️ Rotatorna stabilnost — BOL: uputi specijalisti.',1:'Rotatorna stabilnost: bird dog, dead bug, anti-rotacioni rad. Vežbe: bird dog (3×8 po strani), Pallof press, side plank.',2:'Rotatorna stabilnost: Pallof press progresija, dijagonalni patterns (chop/lift), kneeling cable rotation.'}
  },
  en:{
    deep_squat:{0:'⚠️ Deep Squat — PAIN: stop test and refer client to specialist.',1:'Deep Squat: ankle (dorsiflexion), hip and thoracic spine mobility. Exercises: ankle wall test, hip 90/90, foam roll T-spine.',2:'Deep Squat: hip and calf stretching, goblet squat with heel raised (3–5°), heel elevated squat.'},
    hurdle_step:{0:'⚠️ Hurdle Step — PAIN: refer to specialist.',1:'Hurdle Step: single-leg stability, gluteus medius strengthening. Exercises: single leg balance, side-lying clamshell, monster walks.',2:'Hurdle Step: single leg deadlift, kneeling hip flexor stretch, step-up with pelvic control.'},
    inline_lunge:{0:'⚠️ Inline Lunge — PAIN: refer to specialist.',1:'Inline Lunge: ankle mobility, hip flexor stretch, anti-rotation core. Exercises: half-kneeling Pallof press, kneeling hip flexor stretch.',2:'Inline Lunge: static lunge (split squat hold), thoracic rotation (open book), reverse lunge progression.'},
    shoulder_mob:{0:'⚠️ Shoulder Mobility — PAIN: refer to specialist (impingement test).',1:'Shoulder Mobility: thoracic mobility, sleeper stretch, pec minor stretch. Exercises: foam roll T-spine, doorway pec stretch, cross-body stretch.',2:'Shoulder Mobility: scapular mobility (wall slides), lat stretching, band dislocates.'},
    aslr:{0:'⚠️ Active Leg Raise — PAIN: refer to specialist.',1:'ASLR: hamstring mobility, active pelvic stability. Exercises: supine hamstring stretch (band), dead bug, posterior pelvic tilt.',2:'ASLR: hamstring stretching (PNF), dead bug progression, hip flexor mobility (couch stretch).'},
    trunk_pushup:{0:'⚠️ Trunk Stability — PAIN: refer to specialist (LBP screening).',1:'Trunk Stability: plank progressions, anti-extension core work. Exercises: plank with knee, modified push-up, dead bug.',2:'Trunk Stability: hollow body hold, trunk endurance, full plank → push-up progression.'},
    rotary_stab:{0:'⚠️ Rotary Stability — PAIN: refer to specialist.',1:'Rotary Stability: bird dog, dead bug, anti-rotation work. Exercises: bird dog (3×8 per side), Pallof press, side plank.',2:'Rotary Stability: Pallof press progression, diagonal patterns (chop/lift), kneeling cable rotation.'}
  },
  ru:{
    deep_squat:{0:'⚠️ Глубокий присед — БОЛЬ: прекратите тест и направьте клиента к специалисту.',1:'Глубокий присед: подвижность голеностопов (дорсифлексия), бёдер и грудного отдела. Упражнения: ankle wall test, hip 90/90, foam roll T-spine.',2:'Глубокий присед: растяжка бёдер и икр, goblet squat с поднятой пяткой (3–5°), heel elevated squat.'},
    hurdle_step:{0:'⚠️ Шаг через барьер — БОЛЬ: направьте к специалисту.',1:'Шаг через барьер: стабильность на одной ноге, укрепление средней ягодичной. Упражнения: single leg balance, side-lying clamshell, monster walks.',2:'Шаг через барьер: single leg deadlift, kneeling hip flexor stretch, step-up с контролем таза.'},
    inline_lunge:{0:'⚠️ Выпад в линию — БОЛЬ: направьте к специалисту.',1:'Выпад в линию: подвижность голеностопов, растяжка hip flexor, антиротация кора. Упражнения: half-kneeling Pallof press, kneeling hip flexor stretch.',2:'Выпад в линию: статический выпад (split squat hold), грудная ротация (open book), прогрессия reverse lunge.'},
    shoulder_mob:{0:'⚠️ Подвижность плеч — БОЛЬ: направьте к специалисту (impingement test).',1:'Подвижность плеч: подвижность грудного отдела, sleeper stretch, pec minor stretch. Упражнения: foam roll T-spine, doorway pec stretch, cross-body stretch.',2:'Подвижность плеч: подвижность лопаток (wall slides), растяжка lat, band dislocates.'},
    aslr:{0:'⚠️ Подъём ноги — БОЛЬ: направьте к специалисту.',1:'ASLR: подвижность подколенных, активная стабильность таза. Упражнения: supine hamstring stretch (band), dead bug, posterior pelvic tilt.',2:'ASLR: растяжка подколенных (PNF), прогрессия dead bug, подвижность hip flexor (couch stretch).'},
    trunk_pushup:{0:'⚠️ Стабильность торса — БОЛЬ: направьте к специалисту (LBP screening).',1:'Стабильность торса: прогрессии планки, антиэкстензионная работа кора. Упражнения: plank with knee, modified push-up, dead bug.',2:'Стабильность торса: hollow body hold, выносливость торса, полная планка → push-up прогрессия.'},
    rotary_stab:{0:'⚠️ Вращательная стабильность — БОЛЬ: направьте к специалисту.',1:'Вращательная стабильность: bird dog, dead bug, антиротационная работа. Упражнения: bird dog (3×8 на сторону), Pallof press, side plank.',2:'Вращательная стабильность: прогрессия Pallof press, диагональные паттерны (chop/lift), kneeling cable rotation.'}
  }
};

function generateFMSAutoComment(scores,total){
  var lines=[];
  var corr=FMS_CORRECTIONS[lang]||FMS_CORRECTIONS.sr;

  // Ukupna ocena
  if(total>=18) lines.push(t('fmsAcExcellent')+' ('+total+'/21) — '+t('fmsAcExcellentDesc'));
  else if(total>=15) lines.push(t('fmsAcGood')+' ('+total+'/21) — '+t('fmsAcGoodDesc'));
  else if(total>=11) lines.push(t('fmsAcAverage')+' ('+total+'/21) — '+t('fmsAcAverageDesc'));
  else lines.push(t('fmsAcNeeds')+' ('+total+'/21) — '+t('fmsAcNeedsDesc'));

  // Detekcija bola
  var painTests=[];
  FMS_DATA.forEach(function(ex){if(scores[ex.key]===0)painTests.push(ex.key);});
  if(painTests.length>0){
    lines.push('');
    var tw=painTests.length>1?t('fmsAcPainTests2'):t('fmsAcPainTests1');
    lines.push(t('fmsAcPainAlert')+' '+painTests.length+' '+tw+' '+t('fmsAcPainAdvice'));
  }

  // Specifične preporuke po testu
  var hasCorrections=false;
  var corrections=[];
  FMS_DATA.forEach(function(ex){
    var v=scores[ex.key];
    if(v===undefined||v===3)return;
    var rec=corr[ex.key]&&corr[ex.key][v];
    if(rec){corrections.push('• '+rec);hasCorrections=true;}
  });

  if(hasCorrections){
    lines.push('');
    lines.push(t('fmsAcCorrections'));
    lines=lines.concat(corrections);
  } else {
    lines.push('');
    lines.push(t('fmsAcAllPerfect'));
  }

  return lines.join('\n');
}

function getFMSTests(cid){var c=cob(cid);return(c&&c.fmsTests)?c.fmsTests:[];}

function fmsCat(total){
  if(total>=18)return{label:'fmsExcellent',color:'var(--green)',bg:'var(--gbg)'};
  if(total>=15)return{label:'fmsGood',color:'var(--amber)',bg:'var(--abg)'};
  if(total>=11)return{label:'fmsAverage',color:'#ff6b35',bg:'#fff3e0'};
  return{label:'fmsNeedsWork',color:'var(--red)',bg:'var(--redbg)'};
}

function buildFMSRadar(scores,prevScores,size){
  size=size||240;
  var cx=size/2,cy=size/2,R=size/2-32,n=7;
  function pt(i,val){var a=Math.PI*2*i/n-Math.PI/2;var r=val/3*R;return{x:cx+r*Math.cos(a),y:cy+r*Math.sin(a)};}
  function lpt(i){var a=Math.PI*2*i/n-Math.PI/2;var r=R+18;return{x:cx+r*Math.cos(a),y:cy+r*Math.sin(a)};}

  var grid='';
  for(var lv=1;lv<=3;lv++){
    var pts=[];for(var j=0;j<n;j++){var p=pt(j,lv);pts.push(p.x+','+p.y);}
    grid+='<polygon points="'+pts.join(' ')+'" fill="none" stroke="var(--border)" stroke-width="0.7" opacity=".5"/>';
  }
  var axes='';
  for(var j=0;j<n;j++){var p=pt(j,3);axes+='<line x1="'+cx+'" y1="'+cy+'" x2="'+p.x+'" y2="'+p.y+'" stroke="var(--border)" stroke-width="0.5" opacity=".4"/>';}

  // Previous polygon
  var prevPoly='';
  if(prevScores){
    var ppts=[];for(var j=0;j<n;j++){var k=FMS_DATA[j].key;var v=prevScores[k]||0;var p=pt(j,v);ppts.push(p.x+','+p.y);}
    prevPoly='<polygon points="'+ppts.join(' ')+'" fill="rgba(255,107,53,0.08)" stroke="#ff6b35" stroke-width="1.5" stroke-dasharray="5 3" opacity=".6"/>';
  }

  // Current polygon
  var cpts=[],dots='';
  for(var j=0;j<n;j++){
    var k=FMS_DATA[j].key;var v=scores[k];
    if(v===undefined)v=0;
    var p=pt(j,v);cpts.push(p.x+','+p.y);
    var sc=FMS_SCORE_COLORS[v]||FMS_SCORE_COLORS[0];
    dots+='<circle cx="'+p.x+'" cy="'+p.y+'" r="4" fill="'+sc.border+'" stroke="var(--bg)" stroke-width="1.5"/>';
  }
  var curPoly='<polygon points="'+cpts.join(' ')+'" fill="rgba(204,34,0,0.1)" stroke="var(--red)" stroke-width="2"/>';

  // Labels
  var labels='';
  var shortNames=lang==='en'?['Squat','Hurdle','Lunge','Shoulder','ASLR','Push','Rotary']:
    lang==='ru'?['Присед','Барьер','Выпад','Плечо','ASLR','Стаб.','Ротация']:
    ['Čučanj','Prepona','Iskorak','Rame','ASLR','Sklek','Rotacija'];
  for(var j=0;j<n;j++){
    var lp=lpt(j);
    labels+='<text x="'+lp.x+'" y="'+lp.y+'" text-anchor="middle" dominant-baseline="middle" fill="var(--text3)" font-size="8" font-family="inherit">'+shortNames[j]+'</text>';
  }

  return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size+'" style="overflow:visible">'+grid+axes+prevPoly+curPoly+dots+labels+'</svg>';
}

function buildFMSProgressChart(history){
  if(history.length<2)return '';
  var W=320,H=120,pl=30,pr=15,pt2=18,pb=22;
  var cw=W-pl-pr,ch=H-pt2-pb;
  var mx=21;

  var gridLines='';
  [0,7,14,21].forEach(function(v){
    var y=pt2+ch-(v/mx)*ch;
    gridLines+='<line x1="'+pl+'" y1="'+y+'" x2="'+(W-pr)+'" y2="'+y+'" stroke="var(--border)" stroke-width="0.5" opacity=".5"/>';
    gridLines+='<text x="'+(pl-5)+'" y="'+(y+3)+'" text-anchor="end" fill="var(--text3)" font-size="9" font-family="inherit">'+v+'</text>';
  });

  var points=history.map(function(h,i){
    var x=pl+(history.length===1?cw/2:(i/(history.length-1))*cw);
    var y=pt2+ch-(h.total/mx)*ch;
    return{x:x,y:y,total:h.total,date:h.date};
  });

  var line=points.map(function(p,i){return(i===0?'M':'L')+' '+p.x+' '+p.y;}).join(' ');
  var area=line+' L '+points[points.length-1].x+' '+(pt2+ch)+' L '+points[0].x+' '+(pt2+ch)+' Z';

  var dotsSvg=points.map(function(p){
    var cat=fmsCat(p.total);
    return '<circle cx="'+p.x+'" cy="'+p.y+'" r="4" fill="var(--red)" stroke="var(--bg)" stroke-width="1.5"/>'+
      '<text x="'+p.x+'" y="'+(p.y-9)+'" text-anchor="middle" fill="var(--red)" font-size="10" font-weight="700" font-family="inherit">'+p.total+'</text>'+
      '<text x="'+p.x+'" y="'+(pt2+ch+14)+'" text-anchor="middle" fill="var(--text3)" font-size="8" font-family="inherit">'+p.date.slice(5)+'</text>';
  }).join('');

  return '<div style="overflow-x:auto;margin:8px 0"><svg width="100%" viewBox="0 0 '+W+' '+H+'" style="overflow:visible;min-width:280px">'+
    '<defs><linearGradient id="fmsFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--red)" stop-opacity=".15"/><stop offset="100%" stop-color="var(--red)" stop-opacity="0"/></linearGradient></defs>'+
    gridLines+
    '<path d="'+area+'" fill="url(#fmsFill)"/>'+
    '<path d="'+line+'" fill="none" stroke="var(--red)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'+
    dotsSvg+
  '</svg></div>';
}

function buildFMSSection(cid){
  var tests=getFMSTests(cid);
  var lastTest=tests.length?tests[tests.length-1]:null;

  // FORM ROWS
  var formRows=FMS_DATA.map(function(ex){
    var btns='<div class="fms-scores">';
    for(var v=0;v<=3;v++){
      btns+='<button class="fms-sb" id="fms_'+ex.key+'_'+v+'" onclick="selFMS(\''+ex.key+'\','+v+','+cid+')">'+v+'</button>';
    }
    btns+='</div>';
    return '<div class="fms-test-row">'+
      '<div class="fms-icon">'+ex.icon+'</div>'+
      '<div class="fms-info"><div class="fms-name">'+t(ex.nameKey)+'</div><div class="fms-desc">'+ex.desc+'</div></div>'+
      btns+
    '</div>';
  }).join('');

  // TOTAL DISPLAY
  var totalRow='<div class="fms-total"><div><div class="fms-total-num" id="fms_total_num">0</div><div class="fms-total-lbl">'+t('fmsTotal')+' '+t('fmsMax')+'</div></div><div id="fms_cat_badge"></div></div>';

  // RADAR (hidden initially)
  var radarSection='<div class="fms-radar-wrap" id="fms_radar" style="display:none"></div>';
  var legendSection='<div class="fms-legend" id="fms_legend" style="display:none"><span><i style="background:var(--red)"></i>'+t('fmsCurrent')+'</span>'+(lastTest?'<span><i style="background:#ff6b35;opacity:.6"></i>'+t('fmsPrevious')+'</span>':'')+'</div>';

  // DATE + NOTE
  var dateNote='<div style="display:flex;gap:8px;margin:8px 0">'+
    '<div style="flex:1"><div style="font-size:11px;color:var(--text2);margin-bottom:4px">📅 '+t('date')+'</div><input id="fms_date" type="date" value="'+today()+'" style="width:100%;padding:8px;font-size:13px;border:1px solid var(--border2);border-radius:var(--rs);background:var(--bg2);color:var(--text);font-family:inherit;-webkit-appearance:none"/></div>'+
    '<div style="flex:1"><div style="font-size:11px;color:var(--text2);margin-bottom:4px">📝 '+t('testNote')+'</div><input id="fms_note" placeholder="'+t('optional')+'" style="width:100%;padding:8px;font-size:13px;border:1px solid var(--border2);border-radius:var(--rs);background:var(--bg2);color:var(--text);font-family:inherit"/></div>'+
  '</div>';

  // SAVE BUTTON
  var saveBtn='<button class="btn btnp btnsm" style="width:100%;padding:10px;margin-top:4px" onclick="addFMSTest('+cid+')">'+t('fmsSave')+'</button>';

  // PROGRESS CHART
  var progressChart=tests.length>=2?'<div style="margin-top:12px"><div style="font-size:12px;font-weight:700;color:var(--text2);margin-bottom:4px">📈 '+t('fmsProgress')+'</div>'+buildFMSProgressChart(tests)+'</div>':'';

  // HISTORY
  var history='';
  if(tests.length){
    history=tests.slice().reverse().map(function(te,idx){
      var realIdx=tests.length-1-idx;
      var cat=fmsCat(te.total);

      // Mini radar for history entry
      var prevTest=realIdx>0?tests[realIdx-1]:null;
      var miniRadar=buildFMSRadar(te.scores,prevTest?prevTest.scores:null,180);

      // Score chips
      var chips=FMS_DATA.map(function(ex){
        var v=te.scores[ex.key];
        if(v===undefined)v=0;
        var sc=FMS_SCORE_COLORS[v];
        return '<div class="fms-hist-chip" style="background:'+sc.bg+';color:'+sc.border+'" title="'+t(ex.nameKey)+': '+v+'">'+v+'</div>';
      }).join('');

      // Comparison with previous
      var diffStr='';
      if(prevTest){
        var diff=te.total-prevTest.total;
        if(diff>0)diffStr='<span style="font-size:11px;color:var(--green);font-weight:600"> ↑+'+diff+'</span>';
        else if(diff<0)diffStr='<span style="font-size:11px;color:var(--red);font-weight:600"> ↓'+diff+'</span>';
        else diffStr='<span style="font-size:11px;color:var(--text3)"> =</span>';
      }

      return '<div class="fms-hist-entry">'+
        '<div class="fms-hist-hdr">'+
          '<div><div class="fms-hist-date">'+fmtD(te.date)+diffStr+'</div>'+
          (te.note?'<div style="font-size:11px;color:var(--text3);margin-top:2px">'+te.note+'</div>':'')+
          '</div>'+
          '<div style="display:flex;align-items:center;gap:8px">'+
            '<div class="fms-hist-total" style="color:'+cat.color+'">'+te.total+'<span style="font-size:12px;color:var(--text3)">/21</span></div>'+
            '<button class="btn btnsm btnr" style="padding:3px 8px;font-size:11px" onclick="window.delFMSNow('+cid+','+realIdx+');event.stopPropagation();">×</button>'+
          '</div>'+
        '</div>'+
        '<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px"><span class="fms-cat" style="background:'+cat.bg+';color:'+cat.color+'">'+t(cat.label)+'</span></div>'+
        '<div class="fms-hist-grid" style="margin-bottom:8px">'+chips+'</div>'+
        '<div style="display:flex;justify-content:center">'+miniRadar+'</div>'+
        '<div style="margin-top:10px;padding:10px 12px;background:var(--bg2);border:1px solid var(--border);border-left:3px solid '+cat.color+';border-radius:var(--rs);font-size:11.5px;line-height:1.55;color:var(--text);white-space:pre-wrap">'+generateFMSAutoComment(te.scores,te.total)+'</div>'+
      '</div>';
    }).join('');
  } else {
    history='<div style="font-size:13px;color:var(--text3);text-align:center;padding:16px 0">'+t('fmsNoTests')+'</div>';
  }

  // SCORE LEGEND
  var legend='<div style="display:flex;justify-content:space-around;padding:8px;margin-top:6px;background:var(--bg);border:1px solid var(--border);border-radius:var(--rs)">'+
    [0,1,2,3].map(function(v){var sc=FMS_SCORE_COLORS[v];return '<div style="display:flex;align-items:center;gap:4px"><div style="width:8px;height:8px;border-radius:50%;background:'+sc.border+'"></div><span style="font-size:10px;color:var(--text3)">'+v+' '+t(FMS_SCORE_KEYS[v])+'</span></div>';}).join('')+
  '</div>';

  return '<div class="profsec">'+
    '<div class="profsect">🏋️ '+t('fmsTest')+'</div>'+
    '<div style="font-size:12px;color:var(--text3);margin-bottom:10px">'+t('fmsDesc')+'</div>'+
    formRows+
    totalRow+
    radarSection+
    legendSection+
    legend+
    dateNote+
    saveBtn+
    progressChart+
    '<div style="font-size:13px;font-weight:700;color:var(--text2);margin:16px 0 10px">'+t('fmsHistory')+'</div>'+
    history+
  '</div>';
}

// Track current FMS selections per test
var fmsScores={};
function selFMS(key,val,cid){
  // Toggle off if same value
  if(fmsScores[key]===val){delete fmsScores[key];}
  else{fmsScores[key]=val;}

  // Update button states
  for(var v=0;v<=3;v++){
    var el=document.getElementById('fms_'+key+'_'+v);
    if(el){
      el.className='fms-sb'+(fmsScores[key]===v?' '+FMS_SCORE_COLORS[v].cls:'');
    }
  }

  // Update total
  var total=0,cnt=0;
  FMS_DATA.forEach(function(ex){if(fmsScores[ex.key]!==undefined){total+=fmsScores[ex.key];cnt++;}});
  var el=document.getElementById('fms_total_num');
  if(el)el.textContent=total;

  var badge=document.getElementById('fms_cat_badge');
  if(badge&&cnt>0){
    var cat=fmsCat(total);
    badge.innerHTML='<span class="fms-cat" style="background:'+cat.bg+';color:'+cat.color+'">'+t(cat.label)+'</span>';
  }

  // Update radar
  if(cnt>0){
    var radarEl=document.getElementById('fms_radar');
    var legEl=document.getElementById('fms_legend');
    if(radarEl){
      var tests=getFMSTests(cid);
      var lastTest=tests.length?tests[tests.length-1]:null;
      radarEl.innerHTML=buildFMSRadar(fmsScores,lastTest?lastTest.scores:null,240);
      radarEl.style.display='flex';
    }
    if(legEl)legEl.style.display='flex';
  }
}

function addFMSTest(cid){
  var i=clients.findIndex(function(c){return c.id===cid;});
  if(i===-1)return;
  if(!clients[i].fmsTests)clients[i].fmsTests=[];

  var hasVal=false;
  FMS_DATA.forEach(function(ex){if(fmsScores[ex.key]!==undefined)hasVal=true;});
  if(!hasVal){toast(t('fmsEnterOne'));return;}

  var total=0;
  var scoresCopy={};
  FMS_DATA.forEach(function(ex){
    var v=fmsScores[ex.key];
    if(v!==undefined){scoresCopy[ex.key]=v;total+=v;}
    else{scoresCopy[ex.key]=0;}
  });

  var date=document.getElementById('fms_date').value||today();
  var note=(document.getElementById('fms_note').value||'').trim();

  var autoComment=generateFMSAutoComment(scoresCopy,total);
  clients[i].fmsTests.push({date:date,scores:scoresCopy,total:total,note:note,autoComment:autoComment});
  fmsScores={};
  sv();
  openProf(cid);
  setTimeout(function(){switchProfTab('tests',cid);switchTestTab('fms',cid);},50);
  toast(t('fmsSaved'));
}

window.delFMSNow=function(cid,idx){
  if(!confirm(t('confirmTest')))return;
  var ci=clients.findIndex(function(c){return c.id===cid;});
  if(ci>-1&&clients[ci].fmsTests){
    clients[ci].fmsTests.splice(idx,1);
    sv();
    openProf(cid);
    setTimeout(function(){switchProfTab('tests',cid);switchTestTab('fms',cid);},50);
    toast(t('fmsDeleted'));
  }
};

// // --- RUFFIER TEST -------------------------------------------
function getRufTests(cid){var c=cob(cid);return(c&&c.rufTests)?c.rufTests:[];}

function rufCat(idx){
  if(idx<=0)return{label:'rufExcellent',color:'var(--green)',bg:'var(--gbg)',pct:100};
  if(idx<=5)return{label:'rufGood',color:'#1a7a2e',bg:'var(--gbg)',pct:80};
  if(idx<=10)return{label:'rufAverage',color:'var(--amber)',bg:'var(--abg)',pct:60};
  if(idx<=15)return{label:'rufBelowAvg',color:'#ff6b35',bg:'#fff3e0',pct:40};
  return{label:'rufPoor',color:'var(--red)',bg:'var(--redbg)',pct:20};
}

function rufCalc(p1,p2,p3){return((p1+p2+p3-200)/10);}

function buildRufProgressChart(history){
  if(history.length<2)return '';
  var W=320,H=120,pl=35,pr=15,pt2=18,pb=22;
  var cw=W-pl-pr,ch=H-pt2-pb;
  // Index can range from -5 to ~25, normalize
  var vals=history.map(function(h){return h.index;});
  var mn=Math.min.apply(null,vals.concat([0]));
  var mx=Math.max.apply(null,vals.concat([20]));
  if(mx===mn)mx=mn+10;

  var gridLines='';
  [0,5,10,15,20].forEach(function(v){
    if(v<mn-2||v>mx+2)return;
    var y=pt2+ch-((v-mn)/(mx-mn))*ch;
    gridLines+='<line x1="'+pl+'" y1="'+y+'" x2="'+(W-pr)+'" y2="'+y+'" stroke="var(--border)" stroke-width="0.5" opacity=".5"/>';
    gridLines+='<text x="'+(pl-5)+'" y="'+(y+3)+'" text-anchor="end" fill="var(--text3)" font-size="9" font-family="inherit">'+v+'</text>';
  });

  // Good zone (0-5) highlight
  var y5=pt2+ch-((5-mn)/(mx-mn))*ch;
  var y0=pt2+ch-((0-mn)/(mx-mn))*ch;
  gridLines+='<rect x="'+pl+'" y="'+Math.min(y5,y0)+'" width="'+cw+'" height="'+Math.abs(y5-y0)+'" fill="var(--green)" opacity=".06" rx="3"/>';

  var points=history.map(function(h,i){
    var x=pl+(history.length===1?cw/2:(i/(history.length-1))*cw);
    var y=pt2+ch-((h.index-mn)/(mx-mn))*ch;
    return{x:x,y:y,index:h.index,date:h.date};
  });

  var line=points.map(function(p,i){return(i===0?'M':'L')+' '+p.x+' '+p.y;}).join(' ');
  var area=line+' L '+points[points.length-1].x+' '+(pt2+ch)+' L '+points[0].x+' '+(pt2+ch)+' Z';

  var dotsSvg=points.map(function(p){
    var cat=rufCat(p.index);
    return '<circle cx="'+p.x+'" cy="'+p.y+'" r="4" fill="'+cat.color+'" stroke="var(--bg)" stroke-width="1.5"/>'+
      '<text x="'+p.x+'" y="'+(p.y-9)+'" text-anchor="middle" fill="'+cat.color+'" font-size="10" font-weight="700" font-family="inherit">'+p.index.toFixed(1)+'</text>'+
      '<text x="'+p.x+'" y="'+(pt2+ch+14)+'" text-anchor="middle" fill="var(--text3)" font-size="8" font-family="inherit">'+p.date.slice(5)+'</text>';
  }).join('');

  return '<div style="overflow-x:auto;margin:8px 0"><svg width="100%" viewBox="0 0 '+W+' '+H+'" style="overflow:visible;min-width:280px">'+
    '<defs><linearGradient id="rufFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--red)" stop-opacity=".12"/><stop offset="100%" stop-color="var(--red)" stop-opacity="0"/></linearGradient></defs>'+
    gridLines+
    '<path d="'+area+'" fill="url(#rufFill)"/>'+
    '<path d="'+line+'" fill="none" stroke="var(--red)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'+
    dotsSvg+
  '</svg></div>';
}

function buildRuffierSection(cid){
  var tests=getRufTests(cid);
  var lastTest=tests.length?tests[tests.length-1]:null;

  // INPUT FORM
  var form='<div class="ruf-inputs">'+
    '<div class="ruf-input-wrap">'+
      '<label>'+t('rufP1')+'</label>'+
      '<input id="ruf_p1" type="number" inputmode="numeric" placeholder="70" oninput="rufLiveCalc()"/>'+
      '<div class="ruf-sub">'+t('rufP1sub')+'</div>'+
    '</div>'+
    '<div class="ruf-input-wrap">'+
      '<label>'+t('rufP2')+'</label>'+
      '<input id="ruf_p2" type="number" inputmode="numeric" placeholder="130" oninput="rufLiveCalc()"/>'+
      '<div class="ruf-sub">'+t('rufP2sub')+'</div>'+
    '</div>'+
    '<div class="ruf-input-wrap">'+
      '<label>'+t('rufP3')+'</label>'+
      '<input id="ruf_p3" type="number" inputmode="numeric" placeholder="80" oninput="rufLiveCalc()"/>'+
      '<div class="ruf-sub">'+t('rufP3sub')+'</div>'+
    '</div>'+
  '</div>';

  // LIVE RESULT
  var resultRow='<div class="ruf-result" id="ruf_result" style="display:none">'+
    '<div><div class="ruf-idx" id="ruf_idx_val" style="color:var(--text3)">—</div><div class="ruf-idx-lbl">'+t('rufIndex')+'</div></div>'+
    '<div id="ruf_cat_badge"></div>'+
  '</div>';

  // FORMULA
  var formula='<div style="text-align:center;padding:6px;font-size:11px;color:var(--text3);background:var(--bg2);border-radius:var(--rs);margin-bottom:8px">'+
    '📐 '+t('rufFormula')+
  '</div>';

  // DATE + NOTE
  var dateNote='<div style="display:flex;gap:8px;margin:8px 0">'+
    '<div style="flex:1"><div style="font-size:11px;color:var(--text2);margin-bottom:4px">📅 '+t('date')+'</div><input id="ruf_date" type="date" value="'+today()+'" style="width:100%;padding:8px;font-size:13px;border:1px solid var(--border2);border-radius:var(--rs);background:var(--bg2);color:var(--text);font-family:inherit;-webkit-appearance:none"/></div>'+
    '<div style="flex:1"><div style="font-size:11px;color:var(--text2);margin-bottom:4px">📝 '+t('testNote')+'</div><input id="ruf_note" placeholder="'+t('optional')+'" style="width:100%;padding:8px;font-size:13px;border:1px solid var(--border2);border-radius:var(--rs);background:var(--bg2);color:var(--text);font-family:inherit"/></div>'+
  '</div>';

  // SAVE
  var saveBtn='<button class="btn btnp btnsm" style="width:100%;padding:10px;margin-top:4px" onclick="addRufTest('+cid+')">'+t('rufSave')+'</button>';

  // PROGRESS CHART
  var progressChart=tests.length>=2?'<div style="margin-top:12px"><div style="font-size:12px;font-weight:700;color:var(--text2);margin-bottom:4px">📈 '+t('rufProgress')+'</div>'+buildRufProgressChart(tests)+'</div>':'';

  // SCALE LEGEND
  var scaleLegend='<div style="margin-top:10px;padding:10px;background:var(--bg);border:1px solid var(--border);border-radius:var(--rs)">'+
    '<div style="font-size:10px;font-weight:700;color:var(--text3);margin-bottom:8px;text-transform:uppercase;letter-spacing:.3px">'+t('rufIndex')+' — Skala</div>'+
    [{min:'≤ 0',k:'rufExcellent',c:'var(--green)'},{min:'0.1 – 5',k:'rufGood',c:'#1a7a2e'},{min:'5.1 – 10',k:'rufAverage',c:'var(--amber)'},{min:'10.1 – 15',k:'rufBelowAvg',c:'#ff6b35'},{min:'> 15',k:'rufPoor',c:'var(--red)'}].map(function(r){
      return '<div style="display:flex;align-items:center;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border)">'+
        '<div style="display:flex;align-items:center;gap:6px"><div style="width:8px;height:8px;border-radius:50%;background:'+r.c+'"></div><span style="font-size:12px;color:var(--text)">'+t(r.k)+'</span></div>'+
        '<span style="font-size:11px;color:var(--text3);font-weight:600">'+r.min+'</span>'+
      '</div>';
    }).join('')+
  '</div>';

  // HISTORY
  var history='';
  if(tests.length){
    history=tests.slice().reverse().map(function(te,idx){
      var realIdx=tests.length-1-idx;
      var cat=rufCat(te.index);
      var prevTest=realIdx>0?tests[realIdx-1]:null;

      var diffStr='';
      if(prevTest){
        var diff=te.index-prevTest.index;
        // Lower is better for Ruffier
        if(diff<0)diffStr='<span style="font-size:11px;color:var(--green);font-weight:600"> ↓'+diff.toFixed(1)+' ✓</span>';
        else if(diff>0)diffStr='<span style="font-size:11px;color:var(--red);font-weight:600"> ↑+'+diff.toFixed(1)+'</span>';
        else diffStr='<span style="font-size:11px;color:var(--text3)"> =</span>';
      }

      // Meter bar (lower = better, so invert)
      var meterPct=Math.max(0,Math.min(100,100-te.index*5));

      return '<div class="ruf-hist">'+
        '<div class="ruf-hist-hdr">'+
          '<div><div style="font-size:14px;font-weight:700;color:var(--text)">'+fmtD(te.date)+diffStr+'</div>'+
          (te.note?'<div style="font-size:11px;color:var(--text3);margin-top:2px">'+te.note+'</div>':'')+
          '</div>'+
          '<div style="display:flex;align-items:center;gap:8px">'+
            '<div style="text-align:right"><div style="font-size:20px;font-weight:800;color:'+cat.color+'">'+te.index.toFixed(1)+'</div><span class="ruf-cat-bdg" style="background:'+cat.bg+';color:'+cat.color+'">'+t(cat.label)+'</span></div>'+
            '<button class="btn btnsm btnr" style="padding:3px 8px;font-size:11px" onclick="window.delRufNow('+cid+','+realIdx+');event.stopPropagation();">×</button>'+
          '</div>'+
        '</div>'+
        '<div class="ruf-meter"><div class="ruf-meter-fill" style="width:'+meterPct+'%;background:'+cat.color+'"></div></div>'+
        '<div class="ruf-vals">'+
          '<div class="ruf-val-chip"><div class="rv-lbl">P1</div><div class="rv-num">'+te.p1+'</div></div>'+
          '<div class="ruf-val-chip"><div class="rv-lbl">P2</div><div class="rv-num">'+te.p2+'</div></div>'+
          '<div class="ruf-val-chip"><div class="rv-lbl">P3</div><div class="rv-num">'+te.p3+'</div></div>'+
        '</div>'+
      '</div>';
    }).join('');
  } else {
    history='<div style="font-size:13px;color:var(--text3);text-align:center;padding:16px 0">'+t('rufNoTests')+'</div>';
  }

  return '<div class="profsec">'+
    '<div class="profsect">❤️ '+t('rufTest')+'</div>'+
    '<div style="font-size:12px;color:var(--text3);margin-bottom:10px">'+t('rufDesc')+'</div>'+
    form+
    formula+
    resultRow+
    dateNote+
    saveBtn+
    scaleLegend+
    progressChart+
    '<div style="font-size:13px;font-weight:700;color:var(--text2);margin:16px 0 10px">'+t('rufHistory')+'</div>'+
    history+
  '</div>';
}

// Live calculation as user types
function rufLiveCalc(){
  var p1=Number(document.getElementById('ruf_p1').value)||0;
  var p2=Number(document.getElementById('ruf_p2').value)||0;
  var p3=Number(document.getElementById('ruf_p3').value)||0;
  var resEl=document.getElementById('ruf_result');
  var idxEl=document.getElementById('ruf_idx_val');
  var catEl=document.getElementById('ruf_cat_badge');

  if(p1>0&&p2>0&&p3>0){
    var idx=rufCalc(p1,p2,p3);
    var cat=rufCat(idx);
    resEl.style.display='flex';
    resEl.style.borderColor=cat.color;
    idxEl.textContent=idx.toFixed(1);
    idxEl.style.color=cat.color;
    catEl.innerHTML='<span class="ruf-cat-bdg" style="background:'+cat.bg+';color:'+cat.color+'">'+t(cat.label)+'</span>';
  } else {
    resEl.style.display='none';
  }
}

function addRufTest(cid){
  var p1=Number(document.getElementById('ruf_p1').value)||0;
  var p2=Number(document.getElementById('ruf_p2').value)||0;
  var p3=Number(document.getElementById('ruf_p3').value)||0;
  if(!p1||!p2||!p3){toast(t('rufEnter'));return;}

  var i=clients.findIndex(function(c){return c.id===cid;});
  if(i===-1)return;
  if(!clients[i].rufTests)clients[i].rufTests=[];

  var idx=rufCalc(p1,p2,p3);
  var date=document.getElementById('ruf_date').value||today();
  var note=(document.getElementById('ruf_note').value||'').trim();

  clients[i].rufTests.push({date:date,p1:p1,p2:p2,p3:p3,index:idx,note:note});
  sv();
  openProf(cid);
  setTimeout(function(){switchProfTab('tests',cid);switchTestTab('ruf',cid);},50);
  toast(t('rufSaved'));
}

window.delRufNow=function(cid,idx){
  if(!confirm(t('confirmTest')))return;
  var ci=clients.findIndex(function(c){return c.id===cid;});
  if(ci>-1&&clients[ci].rufTests){
    clients[ci].rufTests.splice(idx,1);
    sv();
    openProf(cid);
    setTimeout(function(){switchProfTab('tests',cid);switchTestTab('ruf',cid);},50);
    toast(t('rufDeleted'));
  }
};

// // --- 1RM TEST -----------------------------------------------
var RM_EXERCISES=[
  {key:'bench',icon:'🏋️',nameKey:'rmBench',muscleKey:'rmBenchM'},
  {key:'squat',icon:'⬇️',nameKey:'rmSquat',muscleKey:'rmSquatM'},
  {key:'deadlift',icon:'🔥',nameKey:'rmDeadlift',muscleKey:'rmDeadliftM'},
  {key:'ohp',icon:'🙌',nameKey:'rmOHP',muscleKey:'rmOHPM'},
  {key:'row',icon:'🚣',nameKey:'rmRow',muscleKey:'rmRowM'}
];

function get1RMTests(cid){var c=cob(cid);return(c&&c.rmTests)?c.rmTests:[];}

// 1RM = prosek 3 formule (Brzycki + Epley + Lombardi)
function brzycki(w,r){
  if(r<=0||w<=0)return 0;
  if(r===1)return w;
  if(r>10)r=10;
  var b=w*(36/(37-r));            // Brzycki
  var e=w*(1+r/30);                // Epley
  var l=w*Math.pow(r,0.10);        // Lombardi
  return Math.round(((b+e+l)/3)*10)/10;
}

// BW ratio categories for each exercise
function rmCatForExercise(key,ratio){
  // Approximate strength standards (male, BW ratio)
  var standards={
    bench: [0.5,0.75,1.0,1.25,1.5],
    squat: [0.75,1.0,1.25,1.5,2.0],
    deadlift:[0.75,1.0,1.5,2.0,2.5],
    ohp:   [0.3,0.45,0.6,0.75,1.0],
    row:   [0.4,0.6,0.8,1.0,1.25]
  };
  var s=standards[key]||[0.5,0.75,1.0,1.25,1.5];
  if(ratio>=s[4])return{label:'rmElite',color:'#9c27b0',bg:'#f3e5f5'};
  if(ratio>=s[3])return{label:'rmAdvanced',color:'var(--green)',bg:'var(--gbg)'};
  if(ratio>=s[2])return{label:'rmIntermediate',color:'#1a7a2e',bg:'var(--gbg)'};
  if(ratio>=s[1])return{label:'rmNovice',color:'var(--amber)',bg:'var(--abg)'};
  return{label:'rmBeginner',color:'#ff6b35',bg:'#fff3e0'};
}

function build1RMProgressChart(history,exKey){
  var vals=history.filter(function(h){return h.results[exKey];}).map(function(h){return{date:h.date,val:h.results[exKey].rm};});
  if(vals.length<2)return '';
  var W=320,H=110,pl=35,pr=15,pt2=16,pb=22;
  var cw=W-pl-pr,ch=H-pt2-pb;
  var mn=Math.min.apply(null,vals.map(function(v){return v.val;}));
  var mx=Math.max.apply(null,vals.map(function(v){return v.val;}));
  if(mx===mn){mx=mn+20;mn=Math.max(0,mn-10);}
  else{var pad=(mx-mn)*0.15;mn=Math.max(0,mn-pad);mx=mx+pad;}

  var points=vals.map(function(v,i){
    var x=pl+(vals.length===1?cw/2:(i/(vals.length-1))*cw);
    var y=pt2+ch-((v.val-mn)/(mx-mn))*ch;
    return{x:x,y:y,val:v.val,date:v.date};
  });

  var line=points.map(function(p,i){return(i===0?'M':'L')+' '+p.x+' '+p.y;}).join(' ');
  var area=line+' L '+points[points.length-1].x+' '+(pt2+ch)+' L '+points[0].x+' '+(pt2+ch)+' Z';

  var dots=points.map(function(p){
    return '<circle cx="'+p.x+'" cy="'+p.y+'" r="3.5" fill="var(--red)" stroke="var(--bg)" stroke-width="1.5"/>'+
      '<text x="'+p.x+'" y="'+(p.y-8)+'" text-anchor="middle" fill="var(--red)" font-size="9" font-weight="700" font-family="inherit">'+p.val+'</text>'+
      '<text x="'+p.x+'" y="'+(pt2+ch+13)+'" text-anchor="middle" fill="var(--text3)" font-size="7" font-family="inherit">'+p.date.slice(5)+'</text>';
  }).join('');

  return '<svg width="100%" viewBox="0 0 '+W+' '+H+'" style="overflow:visible;min-width:260px">'+
    '<defs><linearGradient id="rmFill_'+exKey+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--red)" stop-opacity=".12"/><stop offset="100%" stop-color="var(--red)" stop-opacity="0"/></linearGradient></defs>'+
    '<path d="'+area+'" fill="url(#rmFill_'+exKey+')"/>'+
    '<path d="'+line+'" fill="none" stroke="var(--red)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'+
    dots+
  '</svg>';
}

function build1RMSection(cid){
  var tests=get1RMTests(cid);
  var lastTest=tests.length?tests[tests.length-1]:null;
  var c=cob(cid);

  // EXERCISE FORM ROWS
  var formRows=RM_EXERCISES.map(function(ex){
    var prevRM=lastTest&&lastTest.results[ex.key]?lastTest.results[ex.key].rm:null;
    return '<div class="rm-ex-row">'+
      '<div class="rm-ex-hdr">'+
        '<div class="rm-ex-icon">'+ex.icon+'</div>'+
        '<div><div class="rm-ex-name">'+t(ex.nameKey)+'</div><div class="rm-ex-muscle">'+t(ex.muscleKey)+'</div></div>'+
        (prevRM?'<div style="margin-left:auto;font-size:11px;color:var(--text3)">Prethodni: <strong style="color:var(--text)">'+prevRM+'kg</strong></div>':'')+
      '</div>'+
      '<div class="rm-ex-inputs">'+
        '<div><label>'+t('rmWeight')+'</label><input id="rm_w_'+ex.key+'" type="number" inputmode="decimal" placeholder="0" oninput="rmLiveCalc(\''+ex.key+'\')"/></div>'+
        '<div><label>'+t('rmReps')+'</label><input id="rm_r_'+ex.key+'" type="number" inputmode="numeric" placeholder="0" min="1" max="10" oninput="rmLiveCalc(\''+ex.key+'\')"/></div>'+
        '<div class="rm-ex-result" id="rm_res_'+ex.key+'"><div class="rm-val">—</div><div class="rm-lbl">'+t('rmEstimated')+'</div></div>'+
      '</div>'+
    '</div>';
  }).join('');

  // BODY WEIGHT INPUT
  var bwInput='<div style="display:flex;align-items:center;gap:8px;margin:10px 0;padding:10px 12px;background:var(--bg);border:1px solid var(--border);border-radius:var(--rs)">'+
    '<span style="font-size:16px">⚖️</span>'+
    '<div style="flex:1"><div style="font-size:11px;color:var(--text3);margin-bottom:3px">'+t('rmBW')+' (kg)</div>'+
    '<input id="rm_bw" type="number" inputmode="decimal" placeholder="80" style="width:100%;padding:6px;font-size:14px;font-weight:700;border:1.5px solid var(--border2);border-radius:var(--rs);background:var(--bg2);color:var(--text);font-family:inherit" oninput="rmUpdateSummary()"/></div>'+
  '</div>';

  // LIVE SUMMARY (hidden initially)
  var summary='<div class="rm-summary" id="rm_summary" style="display:none">'+
    '<div class="rm-summary-title">📊 '+t('rmTotal')+'</div>'+
    '<div id="rm_sum_rows"></div>'+
    '<div id="rm_total_row" style="margin-top:8px;padding-top:8px;border-top:2px solid var(--border);display:flex;justify-content:space-between;align-items:center">'+
      '<span style="font-weight:700;color:var(--text)">'+t('rmTotal')+'</span>'+
      '<span id="rm_total_val" style="font-size:22px;font-weight:800;color:var(--red)">0 kg</span>'+
    '</div>'+
  '</div>';

  // DATE + NOTE
  var dateNote='<div style="display:flex;gap:8px;margin:8px 0">'+
    '<div style="flex:1"><div style="font-size:11px;color:var(--text2);margin-bottom:4px">📅 '+t('date')+'</div><input id="rm_date" type="date" value="'+today()+'" style="width:100%;padding:8px;font-size:13px;border:1px solid var(--border2);border-radius:var(--rs);background:var(--bg2);color:var(--text);font-family:inherit;-webkit-appearance:none"/></div>'+
    '<div style="flex:1"><div style="font-size:11px;color:var(--text2);margin-bottom:4px">📝 '+t('testNote')+'</div><input id="rm_note" placeholder="'+t('optional')+'" style="width:100%;padding:8px;font-size:13px;border:1px solid var(--border2);border-radius:var(--rs);background:var(--bg2);color:var(--text);font-family:inherit"/></div>'+
  '</div>';

  // SAVE
  var saveBtn='<button class="btn btnp btnsm" style="width:100%;padding:10px;margin-top:4px" onclick="add1RMTest('+cid+')">'+t('rmSave')+'</button>';

  // PROGRESS CHARTS per exercise
  var progressCharts='';
  if(tests.length>=2){
    progressCharts='<div style="margin-top:14px"><div style="font-size:12px;font-weight:700;color:var(--text2);margin-bottom:8px">📈 '+t('rmProgress')+'</div>';
    RM_EXERCISES.forEach(function(ex){
      var hasData=tests.filter(function(te){return te.results[ex.key];}).length>=2;
      if(hasData){
        progressCharts+='<div style="margin-bottom:12px"><div style="font-size:11px;font-weight:600;color:var(--text3);margin-bottom:4px">'+ex.icon+' '+t(ex.nameKey)+'</div>'+
          '<div style="overflow-x:auto">'+build1RMProgressChart(tests,ex.key)+'</div></div>';
      }
    });
    progressCharts+='</div>';
  }

  // HISTORY
  var history='';
  if(tests.length){
    history=tests.slice().reverse().map(function(te,idx){
      var realIdx=tests.length-1-idx;
      var prevTest=realIdx>0?tests[realIdx-1]:null;

      var totalRM=0;
      var chips=RM_EXERCISES.map(function(ex){
        var r=te.results[ex.key];
        if(!r)return '';
        totalRM+=r.rm;
        var prevRM=prevTest&&prevTest.results[ex.key]?prevTest.results[ex.key].rm:null;
        var diff='';
        if(prevRM){
          var d=r.rm-prevRM;
          if(d>0)diff='<span style="font-size:9px;color:var(--green)"> +'+d+'</span>';
          else if(d<0)diff='<span style="font-size:9px;color:var(--red)"> '+d+'</span>';
        }
        return '<div class="rm-hist-chip"><div class="rm-hc-name">'+ex.icon+' '+t(ex.nameKey)+'</div><div class="rm-hc-val">'+r.rm+'kg'+diff+'</div></div>';
      }).join('');

      return '<div class="rm-hist">'+
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">'+
          '<div><div style="font-size:14px;font-weight:700;color:var(--text)">'+fmtD(te.date)+'</div>'+
          (te.note?'<div style="font-size:11px;color:var(--text3);margin-top:2px">'+te.note+'</div>':'')+
          (te.bw?'<div style="font-size:11px;color:var(--text3)">⚖️ '+te.bw+'kg</div>':'')+
          '</div>'+
          '<div style="display:flex;align-items:center;gap:8px">'+
            '<div style="text-align:right"><div style="font-size:20px;font-weight:800;color:var(--red)">'+totalRM+'<span style="font-size:12px;color:var(--text3)">kg</span></div><div style="font-size:10px;color:var(--text3)">'+t('rmTotal')+'</div></div>'+
            '<button class="btn btnsm btnr" style="padding:3px 8px;font-size:11px" onclick="window.del1RMNow('+cid+','+realIdx+');event.stopPropagation();">×</button>'+
          '</div>'+
        '</div>'+
        '<div class="rm-hist-exercises">'+chips+'</div>'+
      '</div>';
    }).join('');
  } else {
    history='<div style="font-size:13px;color:var(--text3);text-align:center;padding:16px 0">'+t('rmNoTests')+'</div>';
  }

  return '<div class="profsec">'+
    '<div class="profsect">🏆 '+t('rmTest')+'</div>'+
    '<div style="font-size:12px;color:var(--text3);margin-bottom:10px">'+t('rmDesc')+'</div>'+
    formRows+
    bwInput+
    summary+
    dateNote+
    saveBtn+
    progressCharts+
    '<div style="font-size:13px;font-weight:700;color:var(--text2);margin:16px 0 10px">'+t('rmHistory')+'</div>'+
    history+
  '</div>';
}

// Live calculation per exercise
function rmLiveCalc(key){
  var w=Number(document.getElementById('rm_w_'+key).value)||0;
  var r=Number(document.getElementById('rm_r_'+key).value)||0;
  var resEl=document.getElementById('rm_res_'+key);

  if(w>0&&r>0){
    var rm=brzycki(w,r);
    resEl.innerHTML='<div class="rm-val" style="color:var(--red)">'+rm+'</div><div class="rm-lbl">'+t('rmEstimated')+'</div>';
  } else {
    resEl.innerHTML='<div class="rm-val">—</div><div class="rm-lbl">'+t('rmEstimated')+'</div>';
  }
  rmUpdateSummary();
}

function rmUpdateSummary(){
  var bw=Number(document.getElementById('rm_bw').value)||0;
  var total=0,cnt=0,rows='';

  RM_EXERCISES.forEach(function(ex){
    var w=Number(document.getElementById('rm_w_'+ex.key).value)||0;
    var r=Number(document.getElementById('rm_r_'+ex.key).value)||0;
    if(w>0&&r>0){
      var rm=brzycki(w,r);
      total+=rm;cnt++;
      var ratio=bw>0?(rm/bw):0;
      var cat=bw>0?rmCatForExercise(ex.key,ratio):null;
      rows+='<div class="rm-sum-row">'+
        '<div style="display:flex;align-items:center;gap:6px"><span>'+ex.icon+'</span><span style="font-size:12px;font-weight:600;color:var(--text)">'+t(ex.nameKey)+'</span></div>'+
        '<div style="display:flex;align-items:center;gap:8px">'+
          '<span style="font-size:14px;font-weight:800;color:var(--red)">'+rm+'kg</span>'+
          (cat?'<span class="rm-cat-chip" style="background:'+cat.bg+';color:'+cat.color+'">'+t(cat.label)+(bw>0?' · '+ratio.toFixed(2)+'x':'')+'</span>':'')+
        '</div>'+
      '</div>';
    }
  });

  var sumEl=document.getElementById('rm_summary');
  var rowsEl=document.getElementById('rm_sum_rows');
  var totalEl=document.getElementById('rm_total_val');
  if(cnt>0){
    sumEl.style.display='block';
    rowsEl.innerHTML=rows;
    totalEl.textContent=total+' kg';
  } else {
    sumEl.style.display='none';
  }
}

function add1RMTest(cid){
  var i=clients.findIndex(function(c){return c.id===cid;});
  if(i===-1)return;
  if(!clients[i].rmTests)clients[i].rmTests=[];

  var results={},hasVal=false;
  RM_EXERCISES.forEach(function(ex){
    var w=Number(document.getElementById('rm_w_'+ex.key).value)||0;
    var r=Number(document.getElementById('rm_r_'+ex.key).value)||0;
    if(w>0&&r>0){
      results[ex.key]={weight:w,reps:r,rm:brzycki(w,r)};
      hasVal=true;
    }
  });
  if(!hasVal){toast(t('rmEnter'));return;}

  var date=document.getElementById('rm_date').value||today();
  var note=(document.getElementById('rm_note').value||'').trim();
  var bw=Number(document.getElementById('rm_bw').value)||0;

  clients[i].rmTests.push({date:date,results:results,bw:bw||null,note:note});
  sv();
  openProf(cid);
  setTimeout(function(){switchProfTab('tests',cid);switchTestTab('1rm',cid);},50);
  toast(t('rmSaved'));
}

window.del1RMNow=function(cid,idx){
  if(!confirm(t('confirmTest')))return;
  var ci=clients.findIndex(function(c){return c.id===cid;});
  if(ci>-1&&clients[ci].rmTests){
    clients[ci].rmTests.splice(idx,1);
    sv();
    openProf(cid);
    setTimeout(function(){switchProfTab('tests',cid);switchTestTab('1rm',cid);},50);
    toast(t('rmDeleted'));
  }
};

// // --- PAKETI PAGE ------------------------------------------
function pgPaketi(){
  var cards=pkgs.length?pkgs.map(function(p){
    var dur=p.d||30;
    return '<div class="pkc">'+
      '<div class="pkhdr">'+
        '<span class="tchip '+TC[p.t]+'">'+TL[p.t]+'</span>'+
        '<div class="pkacts">'+
          '<button class="btn btnsm" data-editp="'+p.id+'">'+t('edit')+'</button>'+
          '<button class="btn btnsm btnr" data-delp="'+p.id+'" style="padding:5px 8px">×</button>'+
        '</div>'+
      '</div>'+
      '<div class="pkbody">'+
        '<div class="pkn">'+p.s+'</div>'+
        '<div class="pks">'+t('sessions')+' / '+dur+' dana</div>'+
        '<div class="pkp">€'+p.p+'</div>'+
      '</div>'+
      (p.n?'<div class="pknm">'+p.n+'</div>':'')+
    '</div>';
  }).join(''):'<div class="empty">'+t('noPackages')+'</div>';
  return '<div class="topbar"><div class="ptitle">'+t('packages')+'</div><button class="btn btnp" onclick="openPkgM()">+ Novi paket</button></div>'+
    '<div class="pkgrid">'+cards+'</div>'+
    '<div style="font-size:12px;color:var(--text3)">Broj treninga i trajanje (dana) podešavaš za svaki paket posebno.</div>';
}
function openPkgM(id){
  ePid=id||null;pkgTy='p';
  document.getElementById('mPkgt').textContent=id?t('edit')+' paket':'Novi paket';
  if(id){
    var p=pgb(id);
    document.getElementById('pses').value=p.s;
    document.getElementById('pprc').value=p.p;
    document.getElementById('pnam').value=p.n||'';
    document.getElementById('pdur').value=p.d||30;
    pkgTy=p.t||'p';
  } else {
    document.getElementById('pses').value='';
    document.getElementById('pprc').value='';
    document.getElementById('pnam').value='';
    document.getElementById('pdur').value=30;
  }
  setTimeout(function(){selTy(pkgTy);},20);
  om('mPkg');
}
function savePkg(){
  var s=Number(document.getElementById('pses').value),pr=Number(document.getElementById('pprc').value);
  if(!s||!pr){toast(t('enterSessions'));return;}
  var d=Number(document.getElementById('pdur').value)||30;
  if(d<1)d=30;
  var n=document.getElementById('pnam').value.trim();
  if(ePid){var i=pkgs.findIndex(function(p){return p.id===ePid;});pkgs[i]=Object.assign({},pkgs[i],{s:s,p:pr,n:n,t:pkgTy,d:d});}
  else pkgs.push({id:Date.now(),s:s,p:pr,n:n,t:pkgTy,d:d});
  sv();cm('mPkg');renderPage();toast(t('pkgSaved'));
}
function delPkg(id){
  if(clients.some(function(c){return c.pid===id;})){toast(t('pkgActive'));return;}
  if(!confirm(t('confirmPkg')))return;
  pkgs=pkgs.filter(function(p){return p.id!==id;});
  sv();renderPage();toast(t('pkgDel'));
}

// // --- GRUPE PAGE -------------------------------------------
function pgGrupe(){
  var cards=groups.length?groups.map(function(g){
    var mems=clients.filter(function(c){return !c.arch&&g.members&&g.members.indexOf(c.id)>-1;});
    var mlist=mems.length?mems.map(function(c){return '<div class="mrow" style="display:flex;align-items:center;justify-content:space-between"><span class="mname">'+ini(c.name)+' '+c.name+'</span><button class="btn btnsm btnr" style="padding:2px 7px;font-size:11px;min-width:0" data-rmem="'+g.id+'_'+c.id+'">×</button></div>';}).join(''):'<div style="font-size:12px;color:var(--text3);margin-top:4px">Nema klijenata.</div>';
    return '<div class="grpcard" style="border-left:4px solid '+g.color+'">'+
      '<div class="grphdr">'+
        '<div class="grpname"><span style="width:12px;height:12px;border-radius:50%;background:'+g.color+';display:inline-block;flex-shrink:0"></span>'+g.name+'</div>'+
        '<div style="display:flex;align-items:center;gap:6px">'+
          '<span class="tchip" style="background:'+g.color+'22;color:'+g.color+'">'+mems.length+' klijenata</span>'+
          '<button class="btn btnsm" data-editg="'+g.id+'">'+t('edit')+'</button>'+
          '<button class="btn btnsm btnr" data-delg="'+g.id+'" style="padding:5px 8px">×</button>'+
        '</div>'+
      '</div>'+
      mlist+
    '</div>';
  }).join(''):'<div class="empty">'+t('noGroups')+'</div>';
  return '<div class="topbar"><div class="ptitle">'+t('groups')+'</div><button class="btn btnp" onclick="openGrpM()">+ Nova grupa</button></div>'+
    '<div style="font-size:13px;color:var(--text3);margin-bottom:14px">Grupiši klijente i filtriraj ih na glavnoj strani.</div>'+
    cards;
}
function openGrpM(id){
  eGid=id||null;gColor='#cc2200';
  var existing=[];
  document.getElementById('mGrpt').textContent=id?t('edit')+' grupu':'Nova grupa';
  if(id){var g=groups.find(function(x){return x.id===id;});if(!g)return;document.getElementById('gnam').value=g.name;gColor=g.color;existing=g.members||[];}
  else{document.getElementById('gnam').value='';}
  document.getElementById('gcolrow').innerHTML=GCOLS.map(function(col){
    return '<div class="coldot'+(col===gColor?' on':'')+'" data-col="'+col+'" style="background:'+col+'"></div>';
  }).join('');
  var ac=clients.filter(function(c){return !c.arch;});
  document.getElementById('gmembers').innerHTML='<div style="display:flex;flex-direction:column;gap:5px;margin-top:5px">'+ac.map(function(c){
    var on=existing.indexOf(c.id)>-1;
    return '<div class="mrow">'+
      '<span class="mname">'+ini(c.name)+' '+c.name+'</span>'+
      '<div class="mchk'+(on?' on':'')+'" data-mchk="'+c.id+'">'+
        (on?'<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polyline points="1.5,5 4,7.5 8.5,2" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>':'')+
      '</div>'+
    '</div>';
  }).join('')+'</div>';
  om('mGrp');
}
function saveGrp(){
  var name=document.getElementById('gnam').value.trim();
  if(!name){toast(t('enterName'));return;}
  var members=[];
  clients.filter(function(c){return !c.arch;}).forEach(function(c){
    var el=document.querySelector('[data-mchk="'+c.id+'"]');
    if(el&&el.classList.contains('on'))members.push(c.id);
  });
  if(eGid){var i=groups.findIndex(function(g){return g.id===eGid;});groups[i]=Object.assign({},groups[i],{name:name,color:gColor,members:members});}
  else groups.push({id:Date.now(),name:name,color:gColor,members:members});
  sv();cm('mGrp');renderPage();toast(t('groupSaved'));
}
function delGrp(id){
  groups=groups.filter(function(g){return g.id!==id;});
  sv();renderPage();toast(t('groupDel'));
}
function removeFromGroup(gid,cid){
  var g=groups.find(function(x){return x.id===gid;});
  if(!g||!g.members)return;
  var idx=g.members.indexOf(cid);
  if(idx>-1){
    g.members.splice(idx,1);
    sv();renderPage();toast(t('clientRemoved'));
  }
}

// // --- RASPORED PAGE ----------------------------------------
function getWeekStart(off){
  var d=new Date(),dy=d.getDay();
  var diff=d.getDate()-(dy===0?6:dy-1);
  var mon=new Date(d);mon.setDate(diff+off*7);mon.setHours(0,0,0,0);
  return mon;
}
function ds(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());}

function pgRaspored(){
  var ws=getWeekStart(weekOff);
  var wdays=[];
  for(var i=0;i<7;i++){var d=new Date(ws);d.setDate(d.getDate()+i);wdays.push(d);}
  var td=today();
  var days=getDays();
  var wlabel=fmtD(ds(wdays[0]))+' – '+fmtD(ds(wdays[6]));

  var head='<div class="shead"><div class="shc" style="font-size:9px">⏰</div>'+
    wdays.map(function(d,i){var dstr=ds(d);var isTd=dstr===td;return '<div class="shc'+(isTd?' td':'')+'">'+days[i]+'<div style="font-size:13px;font-weight:'+(isTd?'800':'600')+'">'+d.getDate()+'</div></div>';}).join('')+'</div>';

  var rows=HOURS.map(function(hr){
    var cells=wdays.map(function(d,di){
      var dstr=ds(d),isTd=dstr===td;
      var dslots=slots.filter(function(s){return s.date===dstr&&s.time===hr;});
      var dots=dslots.map(function(s){var c=cob(s.cid);var col=c?cCol(c.id):'#888';var nm=c?c.name.split(' ')[0]:'?';
        return '<div class="slot" data-eslot="'+s.id+'" style="background:'+col+'22;color:'+col+';border-left:3px solid '+col+'">'+nm+(s.note?'<div style="font-size:9px;opacity:.8">'+s.note+'</div>':'')+'<div style="font-size:9px;opacity:.7">'+s.dur+'m</div></div>';
      }).join('');
      return '<div class="scell'+(isTd?' td':'')+'" data-nslot="1" data-date="'+dstr+'" data-hour="'+hr+'">'+dots+'</div>';
    }).join('');
    return '<div class="srow"><div class="stime">'+hr+'</div>'+cells+'</div>';
  }).join('');

  var usedCids=[];
  slots.forEach(function(s){var sd=new Date(s.date);if(sd>=ws&&sd<=wdays[6]&&usedCids.indexOf(s.cid)===-1)usedCids.push(s.cid);});
  var leg=usedCids.length?'<div class="sleg">'+usedCids.map(function(cid){var c=cob(cid);if(!c)return'';var col=cCol(cid);return '<div class="sleg-item"><div class="sleg-dot" style="background:'+col+'"></div>'+c.name+'</div>';}).join('')+'</div>':'';

  return '<div class="wnav">'+
    '<button class="btn btnsm" onclick="chgWk(-1)">'+t('prevWeek')+'</button>'+
    '<div style="text-align:center"><div class="wlbl">'+t('schedule')+'</div><div style="font-size:11px;color:var(--text3)">'+wlabel+'</div></div>'+
    '<button class="btn btnsm" onclick="chgWk(1)">'+t('nextWeek')+'</button>'+
  '</div>'+
  (weekOff!==0?'<div style="text-align:center;margin-bottom:10px"><button class="btn btnsm" onclick="chgWk(0,1)">'+t('thisWeek')+'</button></div>':'')+
  '<div style="font-size:12px;color:var(--text3);margin-bottom:10px">Klikni na polje da dodaš termin. Klikni na termin da ga izmeniš.</div>'+
  '<div class="swrap"><div class="stable">'+head+rows+'</div></div>'+leg;
}
function chgWk(d,reset){weekOff=reset?0:weekOff+d;renderPage();}

function buildTimeOpts(sel){
  var times=[],h,m;
  for(h=6;h<=21;h++){for(m=0;m<60;m+=30)times.push(pad(h)+':'+pad(m));}
  return times.map(function(t2){return '<option value="'+t2+'"'+(t2===sel?' selected':'')+'>'+t2+'</option>';}).join('');
}
function buildCPick(selCid){
  var ac=clients.filter(function(c){return !c.arch;});
  return ac.map(function(c){var col=cCol(c.id);var p=c.pid?pgb(c.pid):null;
    return '<div class="cprow'+(c.id===selCid?' on':'')+'" data-cpick="'+c.id+'">'+
      '<div class="cpav" style="background:'+col+'22;color:'+col+'">'+ini(c.name)+'</div>'+
      '<div><div style="font-size:13px;font-weight:500;color:var(--text)">'+c.name+'</div>'+
      '<div style="font-size:11px;color:var(--text3)">'+(p?p.s+' '+t('sessions')+' · €'+p.p:'Bez paketa')+'</div></div>'+
    '</div>';
  }).join('');
}

function openSlotNew(date,hour){
  eSlotId=null;sltCid=null;
  document.getElementById('mSlott').textContent=t('addSlot');
  document.getElementById('mSlott').setAttribute('data-date',date);
  document.getElementById('sltdelbtn').style.display='none';
  document.getElementById('sltnote').value='';
  document.getElementById('slttime').innerHTML=buildTimeOpts(hour||'09:00');
  document.getElementById('sltdur').value='60';
  document.getElementById('sltcp').innerHTML=buildCPick(null);
  om('mSlot');
}
function openSlotEdit(id){
  var s=slots.find(function(x){return x.id===id;});if(!s)return;
  eSlotId=id;sltCid=s.cid;
  document.getElementById('mSlott').textContent=t('editSlot');
  document.getElementById('mSlott').setAttribute('data-date',s.date);
  document.getElementById('sltdelbtn').style.display='block';
  document.getElementById('sltnote').value=s.note||'';
  document.getElementById('slttime').innerHTML=buildTimeOpts(s.time);
  document.getElementById('sltdur').value=s.dur;
  document.getElementById('sltcp').innerHTML=buildCPick(s.cid);
  om('mSlot');
}
function saveSlot(){
  if(!sltCid){toast(t('noSlotClient'));return;}
  var date=document.getElementById('mSlott').getAttribute('data-date')||today();
  var time=document.getElementById('slttime').value;
  var dur=Number(document.getElementById('sltdur').value);
  var note=document.getElementById('sltnote').value.trim();
  if(eSlotId){var i=slots.findIndex(function(s){return s.id===eSlotId;});slots[i]=Object.assign({},slots[i],{cid:sltCid,time:time,dur:dur,note:note});}
  else slots.push({id:Date.now(),cid:sltCid,date:date,time:time,dur:dur,note:note});
  sv();cm('mSlot');renderPage();toast(t('slotSaved'));
}
function delSlot(){
  if(!eSlotId)return;
  if(!confirm(t('confirmSlot')))return;
  slots=slots.filter(function(s){return s.id!==eSlotId;});
  sv();cm('mSlot');renderPage();toast(t('slotDeleted'));
}

// // --- KALENDAR LOG -----------------------------------------
function openLogM(){
  var ac=clients.filter(function(c){return !c.arch;});
  document.getElementById('lc').innerHTML=ac.map(function(c){return '<option value="'+c.id+'">'+c.name+'</option>';}).join('');
  document.getElementById('ld').value=today();
  document.getElementById('ldur').value=60;
  document.getElementById('lnote').value='';
  om('mLog');
}
function saveLog(){
  var cid=Number(document.getElementById('lc').value);
  var date=document.getElementById('ld').value;
  if(!date){toast(t('enterDate'));return;}
  sessions.push({id:Date.now(),cid:cid,date:date,time:now2().time,dur:Number(document.getElementById('ldur').value)||60,type:document.getElementById('lty').value,note:document.getElementById('lnote').value.trim()});
  var c=cob(cid);if(c)c.pused=(c.pused||0)+1;
  sv();cm('mLog');renderPage();toast(t('trainingLogged'));
}

// // --- FINANSIJE PAGE ---------------------------------------
function getFinData(per){
  var n=new Date(),nM={'mesec':1,'3meseca':3,'6meseci':6,'godina':12}[per]||1;
  var months=[],labels=[];
  for(var i=nM-1;i>=0;i--){
    var d=new Date(n.getFullYear(),n.getMonth()-i,1);
    months.push({y:d.getFullYear(),m:d.getMonth()+1});
    labels.push(d.toLocaleString('sr-Latn',{month:'short'})+(nM>6?' '+String(d.getFullYear()).slice(2):''));
  }
  var rev=months.map(function(mo){
    return sessions.filter(function(s){var a=s.date.split('-').map(Number);return a[0]===mo.y&&a[1]===mo.m;})
      .reduce(function(sum,s){var c=cob(s.cid);var p=c&&c.pid?pgb(c.pid):null;return sum+(p?Math.round(p.p/p.s):0);},0);
  });
  return{labels:labels,rev:rev};
}
function pgFin(){
  var ac=clients.filter(function(c){return !c.arch;});
  var monthRev=ac.filter(function(c){return c.st==='active'&&c.pid;}).reduce(function(s,c){var p=pgb(c.pid);return s+(p?p.p:0);},0);
  var fd=getFinData(finPer);
  var tot=fd.rev.reduce(function(a,b){return a+b;},0);
  var avg=fd.rev.length?Math.round(tot/fd.rev.length):0;
  var mx=Math.max.apply(null,fd.rev.concat([1]));

  var bars=fd.rev.map(function(v,i){
    return '<div class="bcol"><div class="bv">€'+v+'</div><div class="br" style="height:'+( Math.round(v/mx*95)+4)+'px"></div><div class="bl">'+fd.labels[i]+'</div></div>';
  }).join('');

  var perBtns=['mesec','3meseca','6meseci','godina'].map(function(p){
    var lbl={mesec:t('per1'),'3meseca':t('per3'),'6meseci':t('per6'),godina:t('perY')}[p];
    return '<button class="'+(finPer===p?'on':'')+'" data-fper="'+p+'">'+lbl+'</button>';
  }).join('');

  var topC=ac.map(function(c){var p=c.pid?pgb(c.pid):null;return{name:c.name,rev:p?p.p:0};}).sort(function(a,b){return b.rev-a.rev;}).slice(0,5);
  var mxC=Math.max.apply(null,topC.map(function(x){return x.rev;}).concat([1]));
  var cbars=topC.map(function(x){var pct=Math.round(x.rev/mxC*100);return '<div class="cbrow"><div class="cbn">'+x.name.split(' ')[0]+' '+((x.name.split(' ')[1]||'')[0]||'')+'.</div><div class="cbt"><div class="cbf" style="width:'+pct+'%"></div></div><div class="cbc" style="color:var(--red);font-weight:600">€'+x.rev+'</div></div>';}).join('');

  var pkgRows=pkgs.map(function(p){var cnt=ac.filter(function(c){return c.pid===p.id&&c.st==='active';}).length;return cnt?'<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border)"><div><div style="font-size:13px;font-weight:600;color:var(--text)">'+(p.n||p.s+' '+t('sessions'))+'</div><div style="font-size:11px;color:var(--text3)">'+cnt+t('activeClients')+'</div></div><div style="font-size:15px;font-weight:700;color:var(--red)">€'+(cnt*p.p)+'/mes.</div></div>':'';}).join('');

  return '<div class="topbar"><div class="ptitle">'+t('finTitle')+'</div></div>'+
    '<div class="fin2">'+
      '<div class="fincard accent"><div class="finlbl">'+t('monthRev')+'</div><div class="finval">€'+monthRev+'</div><div class="finsub">'+ac.filter(function(c){return c.st==='active';}).length+t('activeClients')+'</div></div>'+
      '<div class="fincard"><div class="finlbl">'+t('avgMonth')+'</div><div class="finval">€'+avg+'</div><div class="finsub">'+t('forPeriod')+'</div></div>'+
      '<div class="fincard"><div class="finlbl">'+t('totalPeriod')+'</div><div class="finval">€'+tot+'</div><div class="finsub">'+fd.labels.length+t('months')+'</div></div>'+
      '<div class="fincard"><div class="finlbl">'+t('yearProj')+'</div><div class="finval">€'+monthRev*12+'</div><div class="finsub">'+t('basedOn')+'</div></div>'+
    '</div>'+
    '<div class="periods">'+perBtns+'</div>'+
    '<div class="secc"><div class="sectl">'+t('revPerMonth')+'</div><div class="bwrap">'+bars+'</div></div>'+
    '<div class="secc"><div class="sectl">'+t('revPerClient')+'</div>'+cbars+'</div>'+
    (pkgRows?'<div class="secc"><div class="sectl">'+t('revPerPkg')+'</div>'+pkgRows+'</div>':'');
}

// // --- WHATSAPP PAGE ----------------------------------------
function buildWAMsg(c){
  var p=c.pid?pgb(c.pid):null,e=pkgExp(c),d=e?du(e):0;
  return getWaTpl()
    .replace(/{ime}/g,c.name.split(' ')[0])
    .replace(/{dani}/g,String(d))
    .replace(/{datum}/g,fmtD(e)||'—')
    .replace(/{paket}/g,p?(p.n||p.s+' '+t('sessions')):'paket')
    .replace(/{cena}/g,p?String(p.p):'—');
}
function pgWA(){
  var ac=clients.filter(function(c){return !c.arch;});
  var expiring=ac.filter(function(c){var e=pkgExp(c);return e&&c.st!=='paused'&&du(e)>=0&&du(e)<=14;}).sort(function(a,b){return du(pkgExp(a))-du(pkgExp(b));});
  var shown=expiring.length?expiring:ac.filter(function(c){return c.pid;});
  var cards=shown.map(function(c){
    var e=pkgExp(c),d=e?du(e):null;
    var msg=buildWAMsg(c);
    var walink='https://wa.me/?text='+encodeURIComponent(msg);
    return '<div class="wacard" style="'+(d!==null&&d<=7?'border-color:var(--amber)':'')+'">'+
      '<div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:3px">'+c.name+
        (d!==null?'<span style="font-size:11px;font-weight:400;color:'+(d<=3?'var(--red)':'var(--amber)')+'"> — '+(d===0?t('today2'):d===1?t('tomorrow'):t('inDays')+d+t('days'))+'</span>':'')+
      '</div>'+
      (c.pid&&pgb(c.pid)?'<div style="font-size:12px;color:var(--text3);margin-bottom:6px">'+pgb(c.pid).s+' '+t('sessions')+' · €'+pgb(c.pid).p+(e?' · do '+fmtD(e):'')+'</div>':'')+
      '<div class="wamsg">'+msg+'</div>'+
      '<div style="display:flex;gap:8px;flex-wrap:wrap">'+
        '<a href="'+walink+'" target="_blank" style="text-decoration:none"><button class="btn btnsm" style="background:#25D366;color:#fff;border-color:#25D366;font-weight:600">'+t('openWA')+'</button></a>'+
        '<button class="btn btnsm" onclick="copyWA(this,\''+encodeURIComponent(msg)+'\')">'+t('copy')+'</button>'+
      '</div>'+
    '</div>';
  }).join('');
  return '<div class="topbar"><div class="ptitle">'+t('waTitle')+'</div><button class="btn btnsm" onclick="openWAM()">'+t('waTplEdit')+'</button></div>'+
    '<div style="font-size:13px;color:var(--text3);margin-bottom:14px">'+(expiring.length?t('waExpiring'):t('waAll'))+'</div>'+
    (shown.length?cards:'<div class="empty">'+t('noWaClients')+'</div>');
}
function copyWA(btn,enc){
  var msg=decodeURIComponent(enc);
  if(navigator.clipboard){navigator.clipboard.writeText(msg).then(function(){btn.textContent=t('copied');setTimeout(function(){btn.textContent=t('copy');},1800);});}
  else toast(t('copied'));
}
function openWAM(){document.getElementById('watpl').value=getWaTpl();om('mWA');}
function saveWaTpl(){
  var v=document.getElementById('watpl').value.trim();
  if(!v){toast(t('emptyText'));return;}
  localStorage.setItem('pt_watpl',v);
  sv();
  cm('mWA');renderPage();toast(t('tplSaved'));
}

// // --- ARHIVA PAGE ------------------------------------------
function pgArhiva(){
  var arc=clients.filter(function(c){return c.arch;});
  var cards=arc.length?arc.map(function(c){
    var p=c.pid?pgb(c.pid):null;
    var cnt=sessions.filter(function(s){return s.cid===c.id;}).length;
    return '<div class="cc" style="opacity:.75;border-style:dashed">'+
      '<div class="ctop">'+
        '<div class="av" style="opacity:.6">'+ini(c.name)+'</div>'+
        '<div class="ci">'+
          '<div style="font-size:15px;font-weight:600;color:var(--text2)">'+c.name+'</div>'+
          '<div class="cmeta">'+(p?'<span class="tchip '+TC[p.t]+'">'+TL[p.t]+'</span>':'')+' '+(p?'<span>'+p.s+' '+t('sessions')+'</span>':'')+'</div>'+
          '<div style="font-size:11px;color:var(--text3);margin-top:2px">'+cnt+t('trainedTotal')+'</div>'+
        '</div>'+
        '<div class="cr"><span class="bdg bar2">'+t('statusArch')+'</span></div>'+
      '</div>'+
      '<div class="cact">'+
        '<button class="btn btng btnsm" data-actv="'+c.id+'">'+t('activate')+'</button>'+
        '<button class="btn btnsm btnr" data-delc="'+c.id+'">'+t('delForever')+'</button>'+
      '</div>'+
    '</div>';
  }).join(''):'<div class="empty">'+t('noArchived')+'</div>';
  return '<div class="topbar"><div class="ptitle">'+t('archive')+'</div></div>'+
    '<div style="font-size:13px;color:var(--text3);margin-bottom:14px">'+t('archDesc')+'</div>'+
    '<div class="clist">'+cards+'</div>';
}

// // --- SETTINGS PAGE ----------------------------------------
function pgSettings(){
  var langs=[{c:'sr',f:'🇷🇸',n:'Srpski'},{c:'en',f:'🇬🇧',n:'English'},{c:'ru',f:'🇷🇺',n:'Русский'}];
  var langBtns=langs.map(function(l){return '<button class="langbtn'+(lang===l.c?' on':'')+'" onclick="setLang(\''+l.c+'\')"><span style="font-size:18px">'+l.f+'</span>'+l.n+'</button>';}).join('');
  return '<div class="topbar"><div class="ptitle">'+t('settings')+'</div></div>'+
    '<div class="setrow"><div><div class="setlbl">'+t('langLabel')+'</div></div><div class="langbtns">'+langBtns+'</div></div>'+
    '<div class="setrow"><div><div class="setlbl">'+t('darkMode')+'</div><div class="setsub">'+t('darkSub')+'</div></div><div class="tog'+(isDark?' on':'')+'" onclick="togDark()"><div class="togk"></div></div></div>'+
    '<div class="setrow"><div><div class="setlbl">'+t('trainerName')+'</div><div class="setsub">'+t('trainerSub')+'</div></div><input value="'+(localStorage.getItem('pt_tname')||'StamenicFitt')+'" onchange="localStorage.setItem(\'pt_tname\',this.value);sv();toast(t(\'saved\'))" style="padding:6px 10px;font-size:14px;border:1px solid var(--border2);border-radius:var(--rs);background:var(--bg2);color:var(--text);font-family:inherit;width:140px"/></div>'+
    '<div class="setrow"><div><div class="setlbl">'+t('waTplLabel')+'</div><div class="setsub">'+t('waTplSub')+'</div></div><button class="btn btnsm" onclick="openWAM()">'+t('edit')+'</button></div>'+
    '<div class="setrow"><div><div class="setlbl">'+t('notifLabel')+'</div><div class="setsub">'+t('notifSub')+'</div></div><button class="btn btnsm" onclick="reqNotif()">'+t('enable')+'</button></div>'+
    '<div class="setrow"><div><div class="setlbl">'+t('clearData')+'</div><div class="setsub">'+t('clearSub')+'</div></div><button class="btn btnsm btnr" onclick="clearAll()">'+t('del')+'</button></div>'+
    (window.currentUser?'<div class="setrow"><div><div class="setlbl">'+t('signedInAs')+'</div><div class="setsub">'+(window.currentUser.email||'')+'</div></div><button class="btn btnsm btnr" onclick="signOut()">'+t('signOutBtn')+'</button></div>':'')+
    '<div class="setrow"><div><div class="setlbl">'+t('version')+'</div><div class="setsub">'+t('verSub')+'</div></div></div>';
}
function setLang(l){lang=l;sv();renderNav();renderPage();}
function togDark(){isDark=!isDark;sv();theme();renderPage();}
function reqNotif(){if(!('Notification' in window)){toast(t('notifNo'));return;}Notification.requestPermission().then(function(p){toast(p==='granted'?t('notifOn'):t('notifOff'));});}
function clearAll(){if(!confirm(t('confirmAll')))return;clients=[];sessions=[];pkgs=[];groups=[];slots=[];sv();renderPage();toast(t('allCleared'));}

// Demo data uklonjen — svaki novi nalog kreće od praznog stanja.

// Close modals on background click
['mC','mRen','mPkg','mLog','mGrp','mSlot','mWA','mProf'].forEach(function(id){
  document.getElementById(id).addEventListener('click',function(e){if(e.target===e.currentTarget)cm(id);});
});

// Direct function for deleting tests from profile modal
window.delTestNow=function(cid,idx){
  if(!confirm(t('confirmTest')))return;
  var ci=clients.findIndex(function(c){return c.id===cid;});
  if(ci>-1&&clients[ci].isoTests){
    clients[ci].isoTests.splice(idx,1);
    sv();
    openProf(cid);
    setTimeout(function(){switchProfTab('tests',cid);switchTestTab('iso',cid);},50);
    toast(t('testDeleted'));
  }
};

// // --- SYNC STATUS INDICATOR --------------------------------
function updateSyncStatus(){
  var el=document.getElementById('syncStatus');
  if(!el)return;
  var online = (typeof navigator==='undefined') || navigator.onLine!==false;
  var dirty = localStorage.getItem('pt_state_dirty')==='1';
  if(!online){
    el.className='sync-status sync-offline';
    el.title='Offline — promene se čuvaju lokalno';
  } else if(dirty){
    el.className='sync-status sync-pending';
    el.title='Sinhronizacija u toku...';
  } else {
    el.className='sync-status sync-online';
    el.title='Sinhronizovano';
  }
}
window.addEventListener('syncStatusChange', updateSyncStatus);
window.addEventListener('online', updateSyncStatus);
window.addEventListener('offline', updateSyncStatus);

// // --- INIT -------------------------------------------------
// Bootstrap se pokreće iz auth.js nakon uspešne prijave
window.initApp = async function(){
  // 1) Render odmah iz localStorage cache-a (instant UI)
  theme();
  renderNav();
  renderPage();
  setTimeout(buildGrpFilter,50);
  updateSyncStatus();

  // 2) Povuci sveže podatke iz cloud-a u pozadini
  try{
    if(typeof window.dbPull==='function'){
      var cloudData = await window.dbPull();
      if(cloudData){
        applyState(cloudData);
        try{localStorage.setItem('pt_state',JSON.stringify(getState()));}catch(e){}
        theme();renderNav();renderPage();
        setTimeout(buildGrpFilter,50);
      } else {
        // Prvi login — nema podataka u cloud-u, čistimo lokalni cache
        pkgs=[];clients=[];sessions=[];groups=[];slots=[];
        sv();
        renderNav();renderPage();
      }
    }
  }catch(e){
    console.error('Cloud sync failed:', e);
  }

  // 3) Real-time pretplata — promene sa drugih uređaja stižu odmah
  if(typeof window.dbSubscribe==='function'){
    window.dbSubscribe(function(remoteState){
      // Sačuvaj koji modal je otvoren da ga ne uništimo
      var openModal = document.querySelector('.mbg.on');
      var modalId = openModal ? openModal.id : null;
      applyState(remoteState);
      try{localStorage.setItem('pt_state',JSON.stringify(getState()));}catch(e){}
      theme();renderNav();renderPage();
      setTimeout(buildGrpFilter,50);
      // Vrati otvoreni modal
      if(modalId){
        var m = document.getElementById(modalId);
        if(m)m.classList.add('on');
      }
      try{toast(t('syncedFromDevice'));}catch(e){}
    });
  }
};
