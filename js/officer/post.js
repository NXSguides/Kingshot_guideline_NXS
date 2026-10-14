/* NXS officer page — post tab (loaded by officer-x7k2p9.html; registers OFFICER_PAGES.post) */
(function () {
const ROOT = document.getElementById('pg-post');
/* ===== settings ===== */
const KEY_PATH = "data/post-key.json";            // encrypted GitHub key (safe to be public)
const SOURCE_PATH = "data/announcements-source.md";
const PUB_PATH = "data/announcements.json";            // translated, what the site shows
const FIX_PATH = "data/announcements-fixes.json";      // one-language fixes made by hand
const CACHE_PATH = "data/announcements-cache.json";    // stored translations (the translator skips anything already here)
// repo is worked out from the site address (owner.github.io/repo/), with a fallback
const { owner: OWNER, name: REPO, branch: BRANCH } = OFFICER.repo;
const LS = "nxs-post-v1";

const T = { ko: {"title": "공지 올리기", "subtitle": "한 번만 작성하면 사이트가 12개 언어로 자동 번역해요.", "home": "홈", "unlockTitle": "간부 비밀번호를 입력하세요", "password": "비밀번호", "remember": "이 기기에서 기억하기", "unlock": "잠금 해제", "wrongPw": "비밀번호가 틀렸습니다. Sherry에게 간부 비밀번호를 요청하세요.", "setupTitle": "최초 설정 (사이트 관리자 전용)", "setupIntro": "한 번만 하면 됩니다. 그 후에는 간부들이 여기서 정한 비밀번호만 있으면 돼요.", "setupSteps": ["GitHub에서 Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token을 여세요.", "Resource owner: 사이트를 소유한 조직. Repository access: Only select repositories → 이 사이트의 저장소.", "Permissions → Repository permissions → Contents: Read and write. Expiration: 허용되는 가장 긴 기간. Generate를 누른 뒤 토큰을 복사하세요.", "아래에 토큰을 붙여넣고 간부 비밀번호를 정하세요 (10자 이상)."], "token": "GitHub 토큰", "newPw": "간부 비밀번호", "newPw2": "비밀번호 다시 입력", "setupGo": "설정 저장", "pwShort": "비밀번호는 10자 이상이어야 합니다.", "pwMismatch": "두 비밀번호가 서로 다릅니다.", "setupOk": "설정 저장 완료 ✅ 간부들에게 이 페이지 링크와 비밀번호를 알려 주세요.", "writeTitle": "작성", "fName": "이름", "fLang": "작성 언어", "fLangNote": "(자신의 언어로 쓰세요 — 자동으로 번역됩니다)", "fTitle": "제목", "fBody": "내용", "fBodyNote": "(**텍스트** = 굵게; 링크는 그대로 작동; 사진은 아래 버튼 사용)", "addImg": "사진 추가", "addImgNote": "내용에서 커서가 있는 위치에 들어갑니다.", "uploadingImg": "사진 업로드 중…", "fLink": "가이드 버튼", "fLinkNote": "(선택)", "noGuide": "— 없음 —", "fExp": "자동 삭제", "fExpNote": "(공지가 사이트에서 저절로 사라집니다)", "expNever": "안 함 — 내가 삭제할 때까지 유지", "expToday": "오늘이 끝날 때 (00:00 UTC)", "expTomorrow": "내일이 끝날 때 (00:00 UTC)", "expD": "{n}일 후", "expD1": "1일 후", "expPick": "날짜와 시간 선택 (UTC)…", "expAt": "→ {t} UTC", "expTag": "🗑️ {t} UTC 자동 삭제", "expPast": "미래의 시간을 선택하세요.", "preview": "미리보기", "publish": "📢 게시", "needAll": "이름, 제목, 내용을 모두 입력하세요.", "confirmPub": "지금 이 공지를 게시할까요?", "publishing": "전송 중…", "pubOk": "전송 완료 ✅ 약 2–3분 후 번역된 공지가 사이트에 표시됩니다.", "listTitle": "사이트에 올라간 공지", "reload": "새로고침", "listNote": "최신순입니다. 삭제하면 모든 언어에서 사이트에서 사라집니다.", "del": "삭제", "confirmDel": "모든 사람에게서 이 공지를 삭제할까요?", "deleting": "삭제 중…", "delOk": "삭제 완료 ✅ 약 2–3분 후 사이트에서 사라집니다.", "empty": "공지가 없습니다.", "img": "사진 포함", "errNet": "GitHub에 연결할 수 없습니다. 인터넷을 확인하고 다시 시도하세요.", "errAuth": "저장된 GitHub 키가 더 이상 작동하지 않습니다 (만료되었을 수 있어요). Sherry에게 설정을 다시 해 달라고 요청하세요.", "errBusy": "방금 다른 사람이 공지를 변경했습니다. 다시 시도하세요.", "adminMore": "더 보기", "adminMoreNote": "사이트 관리자용입니다.", "forget": "이 기기에서 비밀번호 지우기", "resetup": "설정 다시 하기 (새 토큰 / 새 비밀번호)", "dataKeyBtn": "🔐 간부 데이터 암호화", "dataKeyConfirm": "지금 데이터 키를 만들까요? 만든 직후 GitHub와 Cloudflare에 복사해 넣어야 합니다.", "dataKeyMade": "데이터 키 생성 완료 ✅ 아래 키를 복사해 안전한 곳에 따로 보관한 뒤:\n1. GitHub repo → Settings → Secrets and variables → Actions → New repository secret. 이름: DATA_KEY\n2. Cloudflare → 내 Worker → Settings → Variables and Secrets → Add → Secret. 이름: DATA_KEY\n3. GitHub → Actions → \"Encrypt Officer Data\" → Run workflow", "dataKeyShown": "암호화가 켜져 있습니다. 데이터 키는 다음과 같습니다 (DATA_KEY 시크릿과 같은 값):", "dataKeyNeedPw": "먼저 간부 비밀번호로 이 페이지의 잠금을 해제하세요.", "dataKeyRelock": "현재 비밀번호로 데이터 키를 열 수 없어 설정을 변경하지 않았습니다.", "yes": "예", "no": "취소", "edit": "수정", "editTitle": "공지 수정", "close": "닫기", "editWhat": "변경할 내용", "editAll": "모든 언어 — 원문을 수정하고 다시 번역", "editAllNote": "원문이 위의 작성 칸에 열립니다. 저장하면 12개 언어가 모두 다시 번역되며, 이 공지에서 언어별로 직접 고친 내용은 대체됩니다.", "editAllGo": "작성 칸에서 열기", "editLangNote": "이 언어만 변경됩니다. 다른 언어는 그대로 유지돼요.", "saveFix": "💾 이 언어 저장", "unfix": "자동 번역으로 되돌리기", "needFix": "이름, 제목, 내용을 모두 입력하세요.", "confirmFix": "모든 사람에게 이 언어 버전을 저장할까요?", "savingFix": "저장 중…", "fixOk": "저장 완료 ✅ 약 2–3분 후 사이트에 표시됩니다.", "confirmUnfix": "이 언어의 직접 수정본을 버리고 자동 번역으로 되돌릴까요?", "unfixOk": "완료 ✅ 약 2–3분 후 사이트에 자동 번역이 다시 표시됩니다.", "notYet": "이 공지는 아직 번역 중입니다. 몇 분 후 새로고침을 누르고 다시 시도하세요.", "fixedTip": "직접 수정됨", "translating": "번역 중…", "editing": "수정 중", "cancelEdit": "수정 취소", "saveEdit": "💾 변경 사항 저장", "confirmEdit": "변경 사항을 저장할까요? 모든 언어가 다시 번역되며, 이 공지에서 언어별로 직접 고친 내용은 대체됩니다.", "editOk": "저장 완료 ✅ 약 2–3분 후 사이트에 새 버전이 표시됩니다.", "gone": "그사이 이 공지가 변경되거나 삭제되었습니다. 새로고침을 누르고 다시 시도하세요.", "editPics": "사진만 추가 — 다시 번역하지 않음", "picNote": "사진이 모든 언어에 한 번에 추가됩니다. 텍스트는 그대로 유지되므로 (언어별 직접 수정본 포함) 다시 번역되지 않습니다.", "picWhere": "위치", "picEnd": "맨 아래", "picTop": "맨 위", "picSave": "💾 사진 추가", "picNone": "먼저 사진을 한 장 이상 선택하세요.", "confirmPics": "이 사진들을 모든 언어의 공지에 추가할까요?", "picOk": "추가 완료 ✅ 약 2–3분 후 사이트에 사진이 표시됩니다."},
 ar: {"title": "نشر إعلان", "subtitle": "اكتبه مرة واحدة — يترجمه الموقع تلقائيًا إلى 12 لغة.", "home": "الرئيسية", "unlockTitle": "أدخل كلمة مرور المسؤولين", "password": "كلمة المرور", "remember": "تذكّرها على هذا الجهاز", "unlock": "فتح", "wrongPw": "كلمة مرور خاطئة. اطلب كلمة مرور المسؤولين من Sherry.", "setupTitle": "الإعداد الأول (لمالك الموقع فقط)", "setupIntro": "يتم هذا مرة واحدة فقط. بعد ذلك يحتاج المسؤولون إلى كلمة المرور التي تختارها هنا فقط.", "setupSteps": ["في GitHub، افتح Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token.", "Resource owner: المنظمة التي تملك الموقع. Repository access: Only select repositories → مستودع هذا الموقع.", "Permissions → Repository permissions → Contents: Read and write. Expiration: أطول مدة مسموحة. اضغط Generate، ثم انسخ الرمز.", "الصق الرمز أدناه واختر كلمة مرور للمسؤولين (10 أحرف على الأقل)."], "token": "رمز GitHub", "newPw": "كلمة مرور المسؤولين", "newPw2": "أعد كتابة كلمة المرور", "setupGo": "حفظ الإعداد", "pwShort": "يجب أن تتكون كلمة المرور من 10 أحرف على الأقل.", "pwMismatch": "كلمتا المرور غير متطابقتين.", "setupOk": "تم حفظ الإعداد ✅ أعطِ المسؤولين رابط هذه الصفحة وكلمة المرور.", "writeTitle": "كتابة", "fName": "اسمك", "fLang": "اللغة التي تكتب بها", "fLangNote": "(اكتب بلغتك — ستتم ترجمتها)", "fTitle": "العنوان", "fBody": "الرسالة", "fBodyNote": "(**نص** = خط عريض؛ الروابط تعمل كالمعتاد؛ الصور: استخدم الزر أدناه)", "addImg": "إضافة صورة", "addImgNote": "تُدرَج في موضع المؤشر داخل الرسالة.", "uploadingImg": "جارٍ رفع الصور…", "fLink": "زر يؤدي إلى دليل", "fLinkNote": "(اختياري)", "noGuide": "— لا شيء —", "fExp": "حذف تلقائي", "fExpNote": "(يختفي الإعلان من الموقع تلقائيًا)", "expNever": "أبدًا — يبقى حتى أحذفه", "expToday": "عند نهاية اليوم (00:00 UTC)", "expTomorrow": "عند نهاية الغد (00:00 UTC)", "expD": "بعد {n} أيام", "expD1": "بعد يوم واحد", "expPick": "اختر التاريخ والوقت (UTC)…", "expAt": "→ {t} UTC", "expTag": "🗑️ حذف تلقائي {t} UTC", "expPast": "اختر وقتًا في المستقبل.", "preview": "معاينة", "publish": "📢 نشر", "needAll": "يرجى إدخال اسمك والعنوان والرسالة.", "confirmPub": "هل تريد نشر هذا الإعلان الآن؟", "publishing": "جارٍ الإرسال…", "pubOk": "تم الإرسال ✅ يظهر الإعلان المترجم على الموقع خلال 2–3 دقائق تقريبًا.", "listTitle": "الإعلانات على الموقع", "reload": "تحديث", "listNote": "الأحدث أولًا. الحذف يزيله من الموقع بجميع اللغات.", "del": "حذف", "confirmDel": "هل تريد حذف هذا الإعلان للجميع؟", "deleting": "جارٍ الحذف…", "delOk": "تم الحذف ✅ يختفي من الموقع خلال 2–3 دقائق تقريبًا.", "empty": "لا توجد إعلانات.", "img": "يحتوي على صور", "errNet": "تعذّر الاتصال بـ GitHub. تحقق من الإنترنت وحاول مرة أخرى.", "errAuth": "مفتاح GitHub المحفوظ لم يعد يعمل (ربما انتهت صلاحيته). اطلب من Sherry إعادة الإعداد.", "errBusy": "قام شخص آخر للتو بتعديل الإعلانات. يرجى المحاولة مرة أخرى.", "adminMore": "المزيد", "adminMoreNote": "لمالك الموقع.", "forget": "انسَ كلمة المرور على هذا الجهاز", "resetup": "إعادة الإعداد (رمز جديد / كلمة مرور جديدة)", "dataKeyBtn": "🔐 تشفير بيانات المسؤولين", "dataKeyConfirm": "هل تريد إنشاء مفتاح البيانات الآن؟ بعدها مباشرة ستنسخه إلى GitHub وCloudflare.", "dataKeyMade": "تم إنشاء مفتاح البيانات ✅ انسخ المفتاح أدناه واحتفظ بنسخة منه في مكان آمن، ثم:\n1. GitHub repo → Settings → Secrets and variables → Actions → New repository secret. الاسم: DATA_KEY\n2. Cloudflare → الـ Worker الخاص بك → Settings → Variables and Secrets → Add → Secret. الاسم: DATA_KEY\n3. GitHub → Actions → \"Encrypt Officer Data\" → Run workflow", "dataKeyShown": "التشفير مفعّل. هذا هو مفتاح البيانات (نفس قيمة أسرار DATA_KEY):", "dataKeyNeedPw": "افتح هذه الصفحة بكلمة مرور المسؤولين أولًا.", "dataKeyRelock": "تعذّر فتح مفتاح البيانات بكلمة المرور الحالية، لذلك لم يتم تغيير الإعداد.", "yes": "نعم", "no": "إلغاء", "edit": "تعديل", "editTitle": "تعديل إعلان", "close": "إغلاق", "editWhat": "ما الذي تريد تغييره", "editAll": "جميع اللغات — عدّل النص الأصلي وأعد الترجمة", "editAllNote": "يُفتح النص الأصلي في نموذج الكتابة أعلاه. عند الحفظ تُعاد ترجمة اللغات الـ 12 كلها، وتُستبدل أي تصحيحات يدوية للغات منفردة في هذا الإعلان.", "editAllGo": "فتح في نموذج الكتابة", "editLangNote": "تتغير هذه اللغة فقط. تبقى اللغات الأخرى كما هي.", "saveFix": "💾 حفظ هذه اللغة", "unfix": "استخدام الترجمة التلقائية مجددًا", "needFix": "يرجى إدخال اسمك والعنوان والرسالة.", "confirmFix": "هل تريد حفظ هذه اللغة للجميع؟", "savingFix": "جارٍ الحفظ…", "fixOk": "تم الحفظ ✅ يظهر على الموقع خلال 2–3 دقائق تقريبًا.", "confirmUnfix": "هل تريد تجاهل النسخة اليدوية لهذه اللغة واستخدام الترجمة التلقائية مجددًا؟", "unfixOk": "تم ✅ تعود الترجمة التلقائية إلى الموقع خلال 2–3 دقائق تقريبًا.", "notYet": "لا يزال هذا الإعلان قيد الترجمة. اضغط \"تحديث\" بعد بضع دقائق وحاول مرة أخرى.", "fixedTip": "عُدّل يدويًا", "translating": "جارٍ الترجمة…", "editing": "جارٍ التعديل", "cancelEdit": "إيقاف التعديل", "saveEdit": "💾 حفظ التغييرات", "confirmEdit": "هل تريد حفظ التغييرات؟ ستُعاد ترجمة جميع اللغات، وتُستبدل أي تصحيحات يدوية للغات منفردة في هذا الإعلان.", "editOk": "تم الحفظ ✅ تظهر النسخة الجديدة على الموقع خلال 2–3 دقائق تقريبًا.", "gone": "تم تغيير هذا الإعلان أو حذفه في هذه الأثناء. اضغط \"تحديث\" وحاول مرة أخرى.", "editPics": "إضافة صور فقط — دون ترجمة جديدة", "picNote": "تُضاف الصور إلى جميع اللغات دفعة واحدة. يبقى النص كما هو تمامًا (بما في ذلك التصحيحات اليدوية للغات منفردة)، فلا تُعاد أي ترجمة.", "picWhere": "الموضع", "picEnd": "في النهاية", "picTop": "في الأعلى", "picSave": "💾 إضافة الصور", "picNone": "اختر صورة واحدة على الأقل أولًا.", "confirmPics": "هل تريد إضافة هذه الصور إلى الإعلان بجميع اللغات؟", "picOk": "تمت الإضافة ✅ تظهر الصور على الموقع خلال 2–3 دقائق تقريبًا."},
 pt: {"title": "Publicar um anúncio", "subtitle": "Escreva uma vez — o site traduz automaticamente para os 12 idiomas.", "home": "Início", "unlockTitle": "Digite a senha dos oficiais", "password": "Senha", "remember": "Lembrar neste aparelho", "unlock": "Desbloquear", "wrongPw": "Senha errada. Peça a senha dos oficiais à Sherry.", "setupTitle": "Primeira configuração (só a dona do site)", "setupIntro": "Faça isso uma vez. Depois, os oficiais só precisam da senha que você escolher aqui.", "setupSteps": ["No GitHub, abra Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token.", "Resource owner: a organização dona do site. Repository access: Only select repositories → o repositório deste site.", "Permissions → Repository permissions → Contents: Read and write. Expiration: o maior prazo permitido. Gere e copie o token.", "Cole o token abaixo e escolha uma senha para os oficiais (pelo menos 10 caracteres)."], "token": "Token do GitHub", "newPw": "Senha dos oficiais", "newPw2": "Digite a senha de novo", "setupGo": "Salvar configuração", "pwShort": "A senha precisa de pelo menos 10 caracteres.", "pwMismatch": "As duas senhas são diferentes.", "setupOk": "Configuração salva ✅ Passe o link desta página e a senha para os oficiais.", "writeTitle": "Escrever", "fName": "Seu nome", "fLang": "Idioma em que você está escrevendo", "fLangNote": "(escreva no seu idioma — ele é traduzido)", "fTitle": "Título", "fBody": "Mensagem", "fBodyNote": "(**texto** = negrito; links funcionam normalmente; imagens: use o botão abaixo)", "addImg": "Adicionar imagem", "addImgNote": "Ela entra onde o cursor estiver na mensagem.", "uploadingImg": "Enviando imagens…", "fLink": "Botão para um guia", "fLinkNote": "(opcional)", "noGuide": "— nenhum —", "fExp": "Exclusão automática", "fExpNote": "(o anúncio some do site sozinho)", "expNever": "Nunca — manter até eu excluir", "expToday": "Quando hoje terminar (00:00 UTC)", "expTomorrow": "Quando amanhã terminar (00:00 UTC)", "expD": "Depois de {n} dias", "expD1": "Depois de 1 dia", "expPick": "Escolher data e hora (UTC)…", "expAt": "→ {t} UTC", "expTag": "🗑️ exclusão automática {t} UTC", "expPast": "Escolha um horário no futuro.", "preview": "Prévia", "publish": "📢 Publicar", "needAll": "Preencha seu nome, o título e a mensagem.", "confirmPub": "Publicar este anúncio agora?", "publishing": "Enviando…", "pubOk": "Enviado ✅ O anúncio traduzido aparece no site em cerca de 2–3 minutos.", "listTitle": "Anúncios no site", "reload": "Atualizar", "listNote": "Os mais novos primeiro. Excluir remove do site em todos os idiomas.", "del": "Excluir", "confirmDel": "Excluir este anúncio para todos?", "deleting": "Excluindo…", "delOk": "Excluído ✅ Some do site em cerca de 2–3 minutos.", "empty": "Nenhum anúncio.", "img": "tem imagens", "errNet": "Não foi possível conectar ao GitHub. Confira a internet e tente de novo.", "errAuth": "A chave do GitHub salva não funciona mais (pode ter expirado). Peça à Sherry para refazer a configuração.", "errBusy": "Outra pessoa acabou de mudar os anúncios. Tente de novo.", "adminMore": "Mais", "adminMoreNote": "Para a dona do site.", "forget": "Esquecer a senha neste aparelho", "resetup": "Refazer a configuração (novo token / nova senha)", "dataKeyBtn": "🔐 Criptografia dos dados dos oficiais", "dataKeyConfirm": "Criar a chave de dados agora? Logo depois você vai copiá-la no GitHub e no Cloudflare.", "dataKeyMade": "Chave de dados criada ✅ Copie a chave abaixo, guarde uma cópia num lugar seguro e depois:\n1. Repositório no GitHub → Settings → Secrets and variables → Actions → New repository secret. Nome: DATA_KEY\n2. Cloudflare → seu Worker → Settings → Variables and Secrets → Add → Secret. Nome: DATA_KEY\n3. GitHub → Actions → \"Encrypt Officer Data\" → Run workflow", "dataKeyShown": "A criptografia está ligada. Esta é a chave de dados (o mesmo valor dos secrets DATA_KEY):", "dataKeyNeedPw": "Desbloqueie esta página com a senha dos oficiais primeiro.", "dataKeyRelock": "Não foi possível abrir a chave de dados com a senha atual, então a configuração não foi alterada.", "yes": "Sim", "no": "Cancelar", "edit": "Editar", "editTitle": "Editar um anúncio", "close": "Fechar", "editWhat": "O que mudar", "editAll": "Todos os idiomas — mudar o original e traduzir de novo", "editAllNote": "O original abre no formulário Escrever acima. Ao salvar, os 12 idiomas são traduzidos de novo, e as correções feitas num só idioma neste anúncio são substituídas.", "editAllGo": "Abrir no formulário Escrever", "editLangNote": "Só este idioma muda. Os outros idiomas ficam como estão.", "saveFix": "💾 Salvar este idioma", "unfix": "Usar a tradução automática de novo", "needFix": "Preencha seu nome, o título e a mensagem.", "confirmFix": "Salvar este idioma para todos?", "savingFix": "Salvando…", "fixOk": "Salvo ✅ Aparece no site em cerca de 2–3 minutos.", "confirmUnfix": "Descartar a versão feita à mão deste idioma e usar a tradução automática de novo?", "unfixOk": "Pronto ✅ A tradução automática volta ao site em cerca de 2–3 minutos.", "notYet": "Este anúncio ainda está sendo traduzido. Toque em Atualizar daqui a alguns minutos e tente de novo.", "fixedTip": "editado à mão", "translating": "traduzindo…", "editing": "Editando", "cancelEdit": "Parar de editar", "saveEdit": "💾 Salvar mudanças", "confirmEdit": "Salvar as mudanças? Todos os idiomas são traduzidos de novo, e as correções feitas num só idioma neste anúncio são substituídas.", "editOk": "Salvo ✅ A nova versão aparece no site em cerca de 2–3 minutos.", "gone": "Este anúncio foi mudado ou excluído nesse meio-tempo. Toque em Atualizar e tente de novo.", "editPics": "Só adicionar imagens — sem nova tradução", "picNote": "As imagens entram em todos os idiomas de uma vez. O texto fica exatamente como está (inclusive as correções num só idioma), então nada é traduzido de novo.", "picWhere": "Onde", "picEnd": "No final", "picTop": "No início", "picSave": "💾 Adicionar as imagens", "picNone": "Escolha pelo menos uma imagem primeiro.", "confirmPics": "Adicionar estas imagens ao anúncio em todos os idiomas?", "picOk": "Adicionadas ✅ As imagens aparecem no site em cerca de 2–3 minutos."},

  en: {
    title: "Post an announcement", subtitle: "Write it once — the site translates it into all 12 languages automatically.",
    home: "Home",
    unlockTitle: "Enter the officer password", password: "Password", remember: "Remember on this device", unlock: "Unlock",
    wrongPw: "Wrong password. Ask Sherry for the officer password.",
    setupTitle: "First-time setup (site owner only)",
    setupIntro: "Do this once. After that, officers only need the password you choose here.",
    setupSteps: [
      "On GitHub, open Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token.",
      "Resource owner: the organization that owns the site. Repository access: Only select repositories → this site's repository.",
      "Permissions → Repository permissions → Contents: Read and write. Expiration: the longest allowed. Generate, then copy the token.",
      "Paste the token below and choose an officer password (at least 10 characters).",
    ],
    token: "GitHub token", newPw: "Officer password", newPw2: "Type the password again", setupGo: "Save setup",
    pwShort: "The password needs at least 10 characters.", pwMismatch: "The two passwords are different.",
    setupOk: "Setup saved ✅ Give the officers this page's link and the password.",
    writeTitle: "Write", fName: "Your name", fLang: "Language you're writing in",
    fLangNote: "(write in your own language — it gets translated)",
    fTitle: "Title", fBody: "Message",
    fBodyNote: "(**text** = bold; links work as normal; pictures: use the button below)",
    addImg: "Add picture", addImgNote: "It goes where the cursor is in the message.", uploadingImg: "Uploading pictures…",
    fLink: "Button to a guide", fLinkNote: "(optional)", noGuide: "— none —",
    fExp: "Auto-delete", fExpNote: "(the announcement disappears from the site by itself)",
    expNever: "Never — keep it until I delete it", expToday: "When today ends (00:00 UTC)", expTomorrow: "When tomorrow ends (00:00 UTC)", expD: "After {n} days", expD1: "After 1 day", expPick: "Pick a date & time (UTC)…",
    expAt: "→ {t} UTC", expTag: "🗑️ auto-delete {t} UTC", expPast: "Pick a time in the future.",
    preview: "Preview", publish: "📢 Publish",
    needAll: "Please fill in your name, the title and the message.",
    confirmPub: "Publish this announcement now?",
    publishing: "Sending…",
    pubOk: "Sent ✅ The translated announcement shows up on the site in about 2–3 minutes.",
    listTitle: "Announcements on the site", reload: "Refresh",
    listNote: "Newest first. Deleting removes it from the site in all languages.",
    del: "Delete", confirmDel: "Delete this announcement for everyone?", deleting: "Deleting…", delOk: "Deleted ✅ It disappears from the site in about 2–3 minutes.",
    empty: "No announcements.", img: "has pictures",
    errNet: "Couldn't reach GitHub. Check the internet and try again.",
    errAuth: "The saved GitHub key no longer works (it may have expired). Ask Sherry to redo the setup.",
    errBusy: "Someone else just changed the announcements. Please try again.",
    adminMore: "More", adminMoreNote: "For the site owner.",
    forget: "Forget the password on this device", resetup: "Redo the setup (new token / new password)",
    dataKeyBtn: "🔐 Officer data encryption",
    dataKeyConfirm: "Create the data key now? Right after, you'll copy it into GitHub and Cloudflare.",
    dataKeyMade: "Data key created ✅ Copy the key below, keep a copy somewhere safe, then:\n1. GitHub repo → Settings → Secrets and variables → Actions → New repository secret. Name: DATA_KEY\n2. Cloudflare → your Worker → Settings → Variables and Secrets → Add → Secret. Name: DATA_KEY\n3. GitHub → Actions → \"Encrypt Officer Data\" → Run workflow",
    dataKeyShown: "Encryption is on. This is the data key (same value as the DATA_KEY secrets):",
    dataKeyNeedPw: "Unlock this page with the officer password first.",
    dataKeyRelock: "The data key couldn't be opened with the current password, so the setup was not changed.",
    yes: "Yes", no: "Cancel",
    edit: "Edit", editTitle: "Edit an announcement", close: "Close", editWhat: "What to change",
    editAll: "All languages — change the original and translate again",
    editAllNote: "The original opens in the Write form above. When you save, all 12 languages are translated again, and any one-language fixes on this announcement are replaced.",
    editAllGo: "Open in the Write form",
    editLangNote: "Only this language changes. The other languages stay as they are.",
    saveFix: "💾 Save this language", unfix: "Use the automatic translation again",
    needFix: "Please fill in your name, the title and the message.",
    confirmFix: "Save this language for everyone?", savingFix: "Saving…",
    fixOk: "Saved ✅ It shows on the site in about 2–3 minutes.",
    confirmUnfix: "Throw away the hand-made version of this language and use the automatic translation again?",
    unfixOk: "Done ✅ The automatic translation is back on the site in about 2–3 minutes.",
    notYet: "This announcement is still being translated. Press Refresh in a few minutes and try again.",
    fixedTip: "edited by hand", translating: "translating…",
    editing: "Editing", cancelEdit: "Stop editing", saveEdit: "💾 Save changes",
    confirmEdit: "Save the changes? All languages are translated again, and any one-language fixes on this announcement are replaced.",
    editOk: "Saved ✅ The new version shows on the site in about 2–3 minutes.",
    gone: "This announcement was changed or deleted meanwhile. Press Refresh and try again.",
    editPics: "Add pictures only — no new translation",
    picNote: "The pictures go into every language at once. The text stays exactly as it is (one-language fixes too), so nothing is translated again.",
    picWhere: "Where", picEnd: "At the end", picTop: "At the top", picSave: "💾 Add the pictures",
    picNone: "Choose at least one picture first.", confirmPics: "Add these pictures to the announcement in all languages?",
    picOk: "Added ✅ The pictures show on the site in about 2–3 minutes.",
  },
  zh: {
    title: "發布公告", subtitle: "寫一次就好，網站會自動翻成 12 種語言。",
    home: "回主頁",
    unlockTitle: "輸入幹部密碼", password: "密碼", remember: "在這台裝置記住", unlock: "解鎖",
    wrongPw: "密碼錯誤。請向 Sherry 索取幹部密碼。",
    setupTitle: "第一次設定（只有網站管理者要做）",
    setupIntro: "只要做一次。之後幹部只需要你在這裡設定的密碼。",
    setupSteps: [
      "到 GitHub：Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token。",
      "Resource owner 選網站所屬的組織；Repository access 選 Only select repositories → 這個網站的專案。",
      "Permissions → Repository permissions → Contents 選 Read and write；Expiration 選最長。按 Generate，複製權杖。",
      "把權杖貼在下面，並設定一組幹部密碼（至少 10 個字）。",
    ],
    token: "GitHub 權杖", newPw: "幹部密碼", newPw2: "再輸入一次密碼", setupGo: "儲存設定",
    pwShort: "密碼至少要 10 個字。", pwMismatch: "兩次輸入的密碼不一樣。",
    setupOk: "設定完成 ✅ 把這頁的網址和密碼給幹部就可以了。",
    writeTitle: "撰寫", fName: "你的名字", fLang: "你用哪種語言寫",
    fLangNote: "（用你自己的語言寫就好，會自動翻譯）",
    fTitle: "標題", fBody: "內容",
    fBodyNote: "（**文字** = 粗體；網址會自動變成連結；圖片用下方按鈕加入）",
    addImg: "加入圖片", addImgNote: "圖片會插在內容裡游標所在的位置。", uploadingImg: "上傳圖片中…",
    fLink: "附上指南按鈕", fLinkNote: "（可不選）", noGuide: "— 不附 —",
    fExp: "自動刪除", fExpNote: "（時間到公告會自己從網站消失）",
    expNever: "不要 — 留到我手動刪除", expToday: "今天結束時（UTC 00:00）", expTomorrow: "明天結束時（UTC 00:00）", expD: "{n} 天後", expD1: "1 天後", expPick: "自己選日期和時間（UTC）…",
    expAt: "→ UTC {t}", expTag: "🗑️ UTC {t} 自動刪除", expPast: "請選一個未來的時間。",
    preview: "預覽", publish: "📢 發布",
    needAll: "請填寫名字、標題和內容。",
    confirmPub: "確定現在發布這則公告？",
    publishing: "傳送中…",
    pubOk: "已送出 ✅ 大約 2–3 分鐘後，翻譯好的公告就會出現在網站上。",
    listTitle: "網站上目前的公告", reload: "重新整理",
    listNote: "新的在最上面。刪除後，所有語言都會一起從網站上移除。",
    del: "刪除", confirmDel: "確定要刪除這則公告？", deleting: "刪除中…", delOk: "已刪除 ✅ 大約 2–3 分鐘後會從網站上消失。",
    empty: "目前沒有公告。", img: "含圖片",
    errNet: "連不上 GitHub，請檢查網路後再試一次。",
    errAuth: "存的 GitHub 權杖已經不能用了（可能過期）。請 Sherry 重新設定。",
    errBusy: "剛好有人也在改公告，請再試一次。",
    adminMore: "更多", adminMoreNote: "給網站管理者用。",
    forget: "忘記這台裝置上的密碼", resetup: "重新設定（新權杖／新密碼）",
    dataKeyBtn: "🔐 幹部資料加密",
    dataKeyConfirm: "現在建立資料金鑰？建立後要馬上把它貼到 GitHub 和 Cloudflare。",
    dataKeyMade: "資料金鑰已建立 ✅ 複製下面的金鑰，另外存一份在安全的地方，然後：\n1. GitHub repo → Settings → Secrets and variables → Actions → New repository secret，名稱 DATA_KEY\n2. Cloudflare → 你的 Worker → Settings → Variables and Secrets → Add → Secret，名稱 DATA_KEY\n3. GitHub → Actions →「Encrypt Officer Data」→ Run workflow",
    dataKeyShown: "加密已開啟。這是資料金鑰（和兩個 DATA_KEY secret 的值相同）：",
    dataKeyNeedPw: "請先用幹部密碼解鎖這一頁。",
    dataKeyRelock: "目前的密碼打不開資料金鑰，所以沒有變更設定。",
    yes: "確定", no: "取消",
    edit: "修改", editTitle: "修改公告", close: "關閉", editWhat: "要改什麼",
    editAll: "全部語言 — 改原文，再重新翻譯",
    editAllNote: "原文會放回上方的撰寫區。儲存後 12 種語言會全部重新翻譯，這則公告之前單獨修改過的語言也會被換掉。",
    editAllGo: "放到撰寫區修改",
    editLangNote: "只改這個語言，其他語言保持不變。",
    saveFix: "💾 儲存這個語言", unfix: "改回自動翻譯",
    needFix: "請填寫名字、標題和內容。",
    confirmFix: "確定儲存這個語言的版本？", savingFix: "儲存中…",
    fixOk: "已儲存 ✅ 大約 2–3 分鐘後會出現在網站上。",
    confirmUnfix: "確定丟掉這個語言的手動版本，改回自動翻譯？",
    unfixOk: "完成 ✅ 大約 2–3 分鐘後網站會換回自動翻譯。",
    notYet: "這則公告還在翻譯中，請過幾分鐘按「重新整理」再試。",
    fixedTip: "已手動修改", translating: "翻譯中…",
    editing: "正在修改", cancelEdit: "取消修改", saveEdit: "💾 儲存修改",
    confirmEdit: "確定儲存修改？所有語言會重新翻譯，這則公告之前單獨修改過的語言也會被換掉。",
    editOk: "已儲存 ✅ 大約 2–3 分鐘後網站上會換成新版本。",
    gone: "這則公告剛剛被改過或刪掉了，請按「重新整理」再試一次。",
    editPics: "只加圖片 — 不重新翻譯",
    picNote: "圖片會一次加進所有語言。文字完全不變（手動改過的語言也保留），所以不會重新翻譯。",
    picWhere: "放在哪裡", picEnd: "最後面", picTop: "最上面", picSave: "💾 加入圖片",
    picNone: "請先選至少一張圖片。", confirmPics: "確定把這些圖片加到這則公告的所有語言？",
    picOk: "已加入 ✅ 大約 2–3 分鐘後圖片會出現在網站上。",
  },
};

/* ===== helpers ===== */
const $ = (id) => ROOT.querySelector("#" + CSS.escape(id)) || document["getElementById"](id);
const store = (() => { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (e) { return {}; } })();
const save = () => { try { localStorage.setItem(LS, JSON.stringify(store)); } catch (e) {} };
window.addEventListener("nxs-officer-pw", (e) => { store.pw = e.detail; });   // saved by the shared password card
/* one language for all officer tabs (set from the main site when you enter, and by the language button on any tab) */
let ui = OFFICER.lang;
const tr = (k) => T[ui][k] ?? T.en[k] ?? k;
const esc = OFFICER.util.esc;
let TOKEN = null;
let OFFICER_PW = null;   // kept in memory only, to re-lock the data key when the password changes

function showMsg(id, kind, text) { const el = $(id); el.className = "msg " + kind; el.textContent = text; }
function askYesNo(text) {
  return new Promise((resolve) => {
    const m = document.createElement("div"); m.className = "modal";
    m.innerHTML = `<div class="card"><p style="margin-top:0">${esc(text)}</p><div class="row" style="justify-content:flex-end"><button class="btn" data-a="0">${esc(tr("no"))}</button><button class="btn primary" data-a="1">${esc(tr("yes"))}</button></div></div>`;
    m.onclick = (e) => { const a = e.target.dataset.a; if (a !== undefined || e.target === m) { m.remove(); resolve(a === "1"); } };
    ROOT.appendChild(m);
  });
}

/* UTF-8 <-> base64 */
const b64enc = (bytes) => { let s = ""; const u = new Uint8Array(bytes); for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode(...u.subarray(i, i + 0x8000)); return btoa(s); };
const b64dec = (b64) => Uint8Array.from(atob(b64.replace(/\s/g, "")), (c) => c.charCodeAt(0));
const utf8ToB64 = (str) => b64enc(new TextEncoder().encode(str));
const b64ToUtf8 = (b64) => new TextDecoder().decode(b64dec(b64));

/* password -> AES key (PBKDF2), token encrypted with AES-GCM */
const deriveKey = (pw, salt, iter) => OfficerData.pbkdf(pw, salt, iter, ["encrypt", "decrypt"]);   // shared + remembered across the officer tabs
async function encryptToken(token, pw) {
  const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12)), iter = 310000;
  const key = await deriveKey(pw, salt, iter);
  const data = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(token));
  return { v: 1, iter, salt: b64enc(salt), iv: b64enc(iv), data: b64enc(data) };
}
async function decryptToken(blob, pw) {
  const key = await deriveKey(pw, b64dec(blob.salt), blob.iter);
  const data = await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64dec(blob.iv) }, key, b64dec(blob.data));
  return new TextDecoder().decode(data);
}

/* GitHub contents API */
const gh = (method, path, body, token = TOKEN) => OFFICER.gh(method, path, body, token);   // shared (js/officer/core.js)
const errText = (e) => tr(e.message === "auth" ? "errAuth" : e.message === "busy" ? "errBusy" : "errNet");

/* read-modify-write of the source file, retried once if someone else changed it meanwhile */
async function editFile(path, change, message) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const f = await gh("GET", path);           // null if the file doesn't exist yet
    const next = change(f ? b64ToUtf8(f.content) : "");
    try { return await gh("PUT", path, { message, content: utf8ToB64(next), sha: f ? f.sha : undefined, branch: BRANCH }); }
    catch (e) { if (e.message !== "busy" || attempt) throw e; }
  }
}
const editSource = (change, message) => editFile(SOURCE_PATH, change, message);
/* a JSON file from the repo (fresh); files over 1 MB come back without content, then read the site's copy */
async function readJson(path) {
  const f = await gh("GET", path);
  if (!f) return null;
  let txt = f.content ? b64ToUtf8(f.content) : "";
  if (!txt.trim() && f.size) txt = await (await fetch(path + "?t=" + Date.now(), { cache: "no-store" })).text();
  try { return txt.trim() ? JSON.parse(txt) : null; } catch (e) { return null; }
}
/* same id the translator gives a block: first 10 hex of sha1(JSON of the parsed block) */
async function blockId(block) {
  const { expires, ...rest } = jsyaml.load(block) || {};   // the auto-delete time isn't part of the id (changing it doesn't re-translate)
  const h = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(JSON.stringify(rest)));
  return [...new Uint8Array(h)].map((x) => x.toString(16).padStart(2, "0")).join("").slice(0, 10);
}

/* ===== announcement blocks ===== */
const splitBlocks = (md) => md.replace(/\r/g, "").split(/^---$/m).map((s) => s.trim()).filter(Boolean);
const joinBlocks = (blocks) => "---\n" + blocks.join("\n---\n") + "\n";
function makeBlock({ author, lang, title, body, created, expires }) {
  const content = body.replace(/\r/g, "").replace(/\t/g, "  ").replace(/^\s*\n/, "").trimEnd();
  const lines = content.split("\n").map((l) => (l.trim() ? "  " + l : ""));
  return [
    `author: ${JSON.stringify(author.trim())}`,
    ...(created ? [`created: ${JSON.stringify(created)}`] : []),   // an edited announcement keeps its first date
    `lang: ${lang}`,
    `title: ${JSON.stringify(title.trim())}`,
    `images: []`,
    ...(expires ? [`expires: ${JSON.stringify(expires)}`] : []),   // auto-delete time (UTC); the hourly clean-up removes it after this
    `content: |`,
    ...lines,
  ].join("\n");
}
/* ---- auto-delete ---- */
const EXP_OPTS = ["never", "today", "tomorrow", "1", "2", "3", "7", "pick"];
function fillExp() {
  const keep = $("expSel").value || "never";
  $("expSel").innerHTML = EXP_OPTS.map((k) => `<option value="${k}">${esc(k === "never" ? tr("expNever") : k === "today" ? tr("expToday") : k === "tomorrow" ? tr("expTomorrow") : k === "pick" ? tr("expPick") : (k === "1" ? tr("expD1") : tr("expD").replace("{n}", k)))}</option>`).join("");
  $("expSel").value = keep;
  if (!$("expHour").options.length) $("expHour").innerHTML = Array.from({ length: 24 }, (_, h) => `<option value="${h}">${String(h).padStart(2, "0")}:00 UTC</option>`).join("");
  showExp();
}
const expFmt = (iso) => iso.slice(0, 16).replace("T", " ").slice(5).replace("-", "/");
/* the chosen auto-delete time as an ISO string ("" = never) */
function expValue() {
  const k = $("expSel").value, DAYMS = 864e5, today = Math.floor(Date.now() / DAYMS) * DAYMS;
  if (k === "never" || !k) return "";
  if (k === "today") return new Date(today + DAYMS).toISOString();
  if (k === "tomorrow") return new Date(today + 2 * DAYMS).toISOString();
  if (k === "pick") { const d = Date.parse($("expDate").value + "T00:00:00Z"); return isNaN(d) ? "" : new Date(d + (+$("expHour").value) * 36e5).toISOString(); }
  return new Date(Math.round((Date.now() + (+k) * DAYMS) / 36e5) * 36e5).toISOString();   // N days from now, on the hour
}
function showExp() {
  const pick = $("expSel").value === "pick";
  $("expDate").hidden = $("expHour").hidden = !pick;
  const v = expValue(); $("expWhen").textContent = v ? tr("expAt").replace("{t}", expFmt(v)) : "";
}
function setExp(iso) {   // editing: show the saved time
  if (!iso || isNaN(Date.parse(iso))) { $("expSel").value = "never"; return showExp(); }
  const d = new Date(iso); $("expSel").value = "pick"; $("expDate").value = d.toISOString().slice(0, 10); $("expHour").value = String(d.getUTCHours()); showExp();
}
["expSel", "expDate", "expHour"].forEach((id) => $(id).addEventListener("change", showExp));
function fullBody() {
  const g = $("guide").value;
  return $("body").value.trimEnd() + (g ? `\n\n[[link:${g}]]` : "");
}

/* preview: same look as the site (game terms, bold, guide buttons) */
function term(id, lang) { const m = GLOSSARY[id]; return m ? (m[lang] || m.en || id) : null; }
function markup(title, body, lang) {
  const html = esc(body)
    .replace(/\{(\w+)\}/g, (m, id) => (term(id, lang) ? esc(term(id, lang)) : m))
    .replace(/\[\[link:([\w-]+)\]\]/g, (m, id) => GUIDES[id] ? `<span class="chip">${GUIDES[id].emoji} ${esc(GUIDES[id].name[lang] || GUIDES[id].name.en)} ›</span>` : "")
    .replace(/\[\[img:([\w./-]+)\]\]/g, (m, src) => `<img src="${pendingImgs[src] ? pendingImgs[src].url : picImgs[src] ? picImgs[src].url : esc(src)}" alt="">`)
    .replace(/\[\[video:([\w./-]+\.mp4)\]\]/g, (m, src) => `<video src="${esc(src)}" controls playsinline preload="metadata" style="display:block;max-width:100%;max-height:50vh"></video>`)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  return (`<b>${esc(title)}</b>\n` + html).trim() || "…";
}
function renderPreview() { $("preview").innerHTML = markup($("annTitle").value, fullBody(), $("srcLang").value); }

/* ===== pictures: shrunk on the phone, given a safe automatic file name, uploaded when publishing ===== */
let pendingImgs = {};   // path -> { blob, url }
let imgCounter = 0;
function shrink(file, maxSide = 1600) {
  return new Promise((resolve, reject) => {
    const img = new Image(); const src = URL.createObjectURL(file);
    img.onload = () => {
      const k = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
      const c = document.createElement("canvas"); c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
      const g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(src);
      c.toBlob((b) => (b ? resolve(b) : reject(new Error("image"))), "image/jpeg", 0.88);
    };
    img.onerror = () => reject(new Error("image"));
    img.src = src;
  });
}
function insertAtCursor(text) {
  const ta = $("body"), a = ta.selectionStart ?? ta.value.length, b = ta.selectionEnd ?? a;
  const before = ta.value.slice(0, a), after = ta.value.slice(b);
  const pre = before && !before.endsWith("\n") ? "\n" : "", post = after.startsWith("\n") ? "" : "\n";
  ta.value = before + pre + text + post + after;
  const pos = (before + pre + text + post).length; ta.setSelectionRange(pos, pos); ta.focus();
}
$("imgPick").onchange = async (e) => {
  const files = [...e.target.files]; e.target.value = "";
  const d = new Date(), stamp = d.toISOString().slice(0, 19).replace(/[-:]/g, "").replace("T", "-");
  for (const f of files) {
    try {
      const blob = await shrink(f);
      const path = `figures/ann/${stamp}-${++imgCounter}.jpg`;
      pendingImgs[path] = { blob, url: URL.createObjectURL(blob) };
      insertAtCursor(`[[img:${path}]]`);
    } catch (err) { showMsg("pubMsg", "err", "⚠️ " + f.name); }
  }
  renderPreview();
};

/* picture handed over from the Ranking tab ("Use in a new announcement") */
async function takeCarriedImage() {
  let url = null; try { url = sessionStorage.getItem("nxs-carry-img"); sessionStorage.removeItem("nxs-carry-img"); } catch (e) {}
  if (!url) return;
  const blob = await (await fetch(url)).blob();
  const f = new File([blob], "table.png", { type: blob.type });
  const shrunk = await shrink(f, 2000);
  const stamp = new Date().toISOString().slice(0, 19).replace(/[-:]/g, "").replace("T", "-");
  const path = `figures/ann/${stamp}-${++imgCounter}.jpg`;
  pendingImgs[path] = { blob: shrunk, url: URL.createObjectURL(shrunk) };
  insertAtCursor(`[[img:${path}]]`); renderPreview();
}

/* ===== list ===== */
let shownBlocks = [], shownIds = [], pubById = {}, fixes = {};
const langLabel = (code) => (LANGS.find((l) => l.code === code) || { label: code }).label;
async function loadList() {
  $("po_list").innerHTML = `<p class="muted">…</p>`;
  try {
    const [f, pub, fx] = await Promise.all([gh("GET", SOURCE_PATH), readJson(PUB_PATH), readJson(FIX_PATH)]);
    const blocks = splitBlocks(b64ToUtf8(f.content));
    shownBlocks = blocks;
    shownIds = await Promise.all(blocks.map((b) => blockId(b).catch(() => "")));
    pubById = {}; (Array.isArray(pub) ? pub : []).forEach((a) => { pubById[a.id] = a; });
    fixes = fx && typeof fx === "object" ? fx : {};
    const rows = blocks.map((b, i) => { let d = {}; try { d = jsyaml.load(b) || {}; } catch (e) {} return { i, d, id: shownIds[i] }; }).reverse();
    $("po_list").innerHTML = rows.length ? rows.map(({ i, d, id }) => `
      <div class="ann"><div><b dir="auto">${esc(d.title || "—")}</b>
        <span class="muted">${esc(d.author || "")}${(d.images || []).length ? " · 🖼️ " + esc(tr("img")) : ""}${pubById[id] ? "" : " · ⏳ " + esc(tr("translating"))}${d.expires && !isNaN(Date.parse(d.expires)) ? " · " + esc(tr("expTag").replace("{t}", expFmt(new Date(d.expires).toISOString()))) : ""}</span>
        ${Object.keys(fixes[id] || {}).map((l) => `<span class="badge" title="${esc(tr("fixedTip"))}">✏️ ${esc(langLabel(l))}</span>`).join("")}</div>
        <div class="acts"><button class="btn" data-edit="${i}">${esc(tr("edit"))}</button>
        <button class="btn danger" data-del="${i}">${esc(tr("del"))}</button></div></div>`).join("")
      : `<p class="muted">${esc(tr("empty"))}</p>`;
    if (!$("editCard").hidden && cur) fillEditLang();
  } catch (e) { $("po_list").innerHTML = ""; showMsg("listMsg", "err", errText(e)); }
}
async function deleteBlock(i) {
  const target = shownBlocks[i];
  if (!(await askYesNo(tr("confirmDel")))) return;
  showMsg("listMsg", "info", tr("deleting"));
  try {
    await editSource((md) => {
      const b = splitBlocks(md); const at = b.indexOf(target);
      if (at < 0) throw new Error("busy"); // the list changed meanwhile — refresh and try again
      b.splice(at, 1); return joinBlocks(b);
    },
      "Delete announcement via post page");
    showMsg("listMsg", "ok", tr("delOk")); loadList();
  } catch (e) { showMsg("listMsg", "err", errText(e)); }
}

/* ===== edit ===== */
let cur = null;        // the announcement open in the Edit card: { i, id, block, d }
let editing = null;    // whole-announcement edit in the Write form: { block, created, title }
function fillEditLang() {
  const keep = $("editLang").value || store.fixLang || "all";
  $("editLang").innerHTML = `<option value="all">${esc(tr("editAll"))}</option><option value="pics">🖼️ ${esc(tr("editPics"))}</option>` +
    LANGS.map((l) => `<option value="${l.code}">${esc(l.label)}${fixes[cur.id] && fixes[cur.id][l.code] ? " ✏️" : ""}</option>`).join("");
  $("editLang").value = keep;
}
function openEdit(i) {
  const block = shownBlocks[i]; let d = {}; try { d = jsyaml.load(block) || {}; } catch (e) {}
  cur = { i, id: shownIds[i], block, d };
  $("editWhich").textContent = d.title || "—";
  $("fixBy").value = store.author || "";
  $("editMsg").className = "msg";
  fillEditLang(); showEditLang();
  $("editCard").hidden = false; $("editCard").scrollIntoView({ behavior: "smooth", block: "start" });
}
function showEditLang() {
  const lang = $("editLang").value, all = lang === "all", pics = lang === "pics";
  $("editAllBox").hidden = !all; $("editOneBox").hidden = all || pics; $("editPicBox").hidden = !pics; $("editMsg").className = "msg";
  if (pics) { if (!pubById[cur.id]) { $("editPicBox").hidden = true; showMsg("editMsg", "info", tr("notYet")); } else renderPicPreview(); return; }
  if (all) return;
  const a = pubById[cur.id];
  if (!a || !a.title) { $("editOneBox").hidden = true; showMsg("editMsg", "info", tr("notYet")); return; }
  const fx = fixes[cur.id] && fixes[cur.id][lang];
  $("fixTitle").value = (fx && fx.title) ?? (a.title[lang] || "");
  $("fixBody").value = (fx && fx.content) ?? ((a.content || {})[lang] || "");
  $("fixUndo").hidden = !fx;
  $("fixTitle").dir = $("fixBody").dir = lang === "ar" ? "rtl" : "auto";
  renderFixPreview();
}
function renderFixPreview() { $("fixPreview").innerHTML = markup($("fixTitle").value, $("fixBody").value, $("editLang").value); }
/* change one language's entry in the fixes file (value null = remove it); also drops fixes of announcements that no longer exist */
async function writeFix(id, lang, value, message) {
  const live = new Set(shownIds);
  await editFile(FIX_PATH, (txt) => {
    let o = {}; try { o = txt.trim() ? JSON.parse(txt) : {}; } catch (e) { o = {}; }
    for (const k of Object.keys(o)) if (!live.has(k) && k !== id) delete o[k];
    o[id] = o[id] || {};
    if (value) o[id][lang] = value; else delete o[id][lang];
    if (!Object.keys(o[id]).length) delete o[id];
    return JSON.stringify(o, null, 1) + "\n";
  }, message);
}
/* check the announcement is still the same in the source before changing it */
async function stillThere(block) {
  const f = await gh("GET", SOURCE_PATH);
  return splitBlocks(b64ToUtf8(f.content)).includes(block);
}
$("editLang").onchange = () => { if (!["all", "pics"].includes($("editLang").value)) { store.fixLang = $("editLang").value; save(); } showEditLang(); };
$("editClose").onclick = () => { $("editCard").hidden = true; cur = null; };
["fixTitle", "fixBody"].forEach((id) => $(id).addEventListener("input", renderFixPreview));
$("fixSave").onclick = async () => {
  const lang = $("editLang").value, by = $("fixBy").value.trim(), title = $("fixTitle").value.trim(), content = $("fixBody").value.replace(/\r/g, "").trimEnd();
  if (!by || !title || !content.trim()) { showMsg("editMsg", "err", tr("needFix")); return; }
  if (!(await askYesNo(tr("confirmFix")))) return;
  store.author = store.author || by; save();
  const btn = $("fixSave"); btn.disabled = true; showMsg("editMsg", "info", tr("savingFix"));
  try {
    if (!(await stillThere(cur.block))) { showMsg("editMsg", "err", tr("gone")); btn.disabled = false; return; }
    await writeFix(cur.id, lang, { title, content, by, at: new Date().toISOString() }, `Fix ${lang} of announcement: ${cur.d.title || ""}`.slice(0, 120));
    showMsg("editMsg", "ok", tr("fixOk"));
    fixes[cur.id] = fixes[cur.id] || {}; fixes[cur.id][lang] = { title, content, by };
    $("fixUndo").hidden = false; loadList();
  } catch (e) { showMsg("editMsg", "err", errText(e)); }
  btn.disabled = false;
};
$("fixUndo").onclick = async () => {
  const lang = $("editLang").value;
  if (!(await askYesNo(tr("confirmUnfix")))) return;
  showMsg("editMsg", "info", tr("savingFix"));
  try {
    await writeFix(cur.id, lang, null, `Undo ${lang} fix of announcement: ${cur.d.title || ""}`.slice(0, 120));
    if (fixes[cur.id]) delete fixes[cur.id][lang];
    showEditLang(); showMsg("editMsg", "ok", tr("unfixOk")); loadList();
  } catch (e) { showMsg("editMsg", "err", errText(e)); }
};
/* whole announcement: put the original back into the Write form */
$("editAllGo").onclick = () => {
  const d = cur.d; let body = String(d.content || "").replace(/\s+$/, ""), g = "";
  const m = body.match(/\n*\[\[link:([\w-]+)\]\]$/);
  if (m && GUIDES[m[1]]) { g = m[1]; body = body.slice(0, m.index); }
  editing = { block: cur.block, created: d.created || (pubById[cur.id] && pubById[cur.id].createdAt) || "", title: d.title || "", author: d.author || "" };
  $("author").value = d.author || ""; $("srcLang").value = d.lang || "en";
  $("annTitle").value = d.title || ""; $("body").value = body; $("guide").value = g; setExp(d.expires);
  $("editCard").hidden = true; cur = null;
  showEditing(); renderPreview();
  $("annTitle").scrollIntoView({ behavior: "smooth", block: "center" });
};
function showEditing() {
  $("editBanner").hidden = !editing;
  if (editing) $("editBannerTitle").textContent = editing.title;
  $("publishBtn").textContent = tr(editing ? "saveEdit" : "publish");
}
$("cancelEdit").onclick = () => {
  editing = null; $("annTitle").value = ""; $("body").value = ""; $("guide").value = ""; setExp("");
  $("author").value = store.author || ""; $("srcLang").value = store.lang || "en";
  showEditing(); renderPreview();
};

/* ===== add pictures only: one commit changes the original + the stored translations, so nothing is translated again ===== */
let picImgs = {};      // path -> { blob, url } waiting to be added
const picPos = () => (ROOT.querySelector('input[name="picPos"]:checked') || {}).value || "end";
/* put the picture lines at the top or the end (before a trailing guide button) of one text */
function withPics(text, paths, pos) {
  const lines = paths.map((p) => `[[img:${p}]]`).join("\n");
  let t = String(text || "").replace(/\s+$/, "");
  if (pos === "top") return lines + "\n\n" + t;
  const m = t.match(/\n*(\[\[link:[\w-]+\]\])$/);
  if (m) return t.slice(0, m.index) + "\n\n" + lines + "\n\n" + m[1];
  return t + "\n\n" + lines;
}
function renderPicPreview() {
  const a = pubById[cur.id]; if (!a) return;
  const l = a.title && a.title[ui] != null ? ui : (cur.d.lang || "en");
  $("picPreview").innerHTML = markup(a.title[l] || "", withPics((a.content || {})[l] || "", Object.keys(picImgs), picPos()), l);
}
$("picPick").onchange = async (e) => {
  const files = [...e.target.files]; e.target.value = "";
  const stamp = new Date().toISOString().slice(0, 19).replace(/[-:]/g, "").replace("T", "-");
  for (const f of files) {
    try { const blob = await shrink(f); const path = `figures/ann/${stamp}-${++imgCounter}.jpg`; picImgs[path] = { blob, url: URL.createObjectURL(blob) }; }
    catch (err) { showMsg("editMsg", "err", "⚠️ " + f.name); }
  }
  renderPicPreview();
};
ROOT.querySelectorAll('input[name="picPos"]').forEach((r) => r.addEventListener("change", renderPicPreview));
/* GitHub git-data API (several files in ONE commit) */
async function git(method, path, body) {
  let res;
  try {
    res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/git/${path}`, {
      method, headers: { Authorization: `Bearer ${TOKEN}`, Accept: "application/vnd.github+json" },
      body: body ? JSON.stringify(body) : undefined, cache: "no-store",
    });
  } catch (e) { throw new Error("net"); }
  if (res.status === 401 || res.status === 403) throw new Error("auth");
  if (res.status === 409 || res.status === 422) throw new Error("busy");
  if (!res.ok) throw new Error("net");
  return res.json();
}
async function readText(path) {   // a text file from the repo ("" if missing); files over 1 MB come from the site's copy
  const f = await gh("GET", path);
  if (!f) return "";
  if (f.content) return b64ToUtf8(f.content);
  return f.size ? await (await fetch(path + "?t=" + Date.now(), { cache: "no-store" })).text() : "";
}
$("picSave").onclick = async () => {
  const paths = Object.keys(picImgs);
  if (!paths.length) { showMsg("editMsg", "err", tr("picNone")); return; }
  if (!(await askYesNo(tr("confirmPics")))) return;
  const pos = picPos(), btn = $("picSave"); btn.disabled = true; showMsg("editMsg", "info", tr("uploadingImg"));
  try {
    // the pictures become blobs first (they don't change anything until the commit)
    const imgShas = {};
    for (const p of paths) imgShas[p] = (await git("POST", "blobs", { content: b64enc(await picImgs[p].blob.arrayBuffer()), encoding: "base64" })).sha;
    showMsg("editMsg", "info", tr("savingFix"));
    let done = false;
    for (let attempt = 0; attempt < 3 && !done; attempt++) {
      const ref = await git("GET", "ref/heads/" + BRANCH);
      const head = ref.object.sha;
      const commit = await git("GET", "commits/" + head);
      const [srcF, cacheTxt, fixTxt] = await Promise.all([gh("GET", SOURCE_PATH), readText(CACHE_PATH), readText(FIX_PATH)]);
      const blocks = splitBlocks(b64ToUtf8(srcF.content));
      const at = blocks.indexOf(cur.block);
      if (at < 0) throw new Error("gone");
      const cache = cacheTxt.trim() ? JSON.parse(cacheTxt) : {};
      const old = cache[cur.id];
      if (!old || !old.content) throw new Error("notYet");
      const d = cur.d;
      const block = makeBlock({ author: d.author || "", lang: d.lang || "en", title: d.title || "", body: withPics(d.content, paths, pos), created: d.created || old.createdAt || "" });
      const newId = await blockId(block);
      blocks[at] = block;
      const entry = JSON.parse(JSON.stringify(old));
      for (const l of Object.keys(entry.content)) entry.content[l] = withPics(entry.content[l], paths, pos);
      entry.images = [...(entry.images || [])];
      const nextCache = {}; for (const [k, v] of Object.entries(cache)) nextCache[k === cur.id ? newId : k] = k === cur.id ? entry : v;
      const files = [
        { path: SOURCE_PATH, content: joinBlocks(blocks) },
        { path: CACHE_PATH, content: JSON.stringify(nextCache, null, 2) },
      ];
      if (fixTxt.trim()) {
        const fx = JSON.parse(fixTxt);
        if (fx[cur.id]) {
          const moved = JSON.parse(JSON.stringify(fx[cur.id]));
          for (const v of Object.values(moved)) if (v && typeof v.content === "string") v.content = withPics(v.content, paths, pos);
          delete fx[cur.id]; fx[newId] = moved;
          files.push({ path: FIX_PATH, content: JSON.stringify(fx, null, 1) + "\n" });
        }
      }
      const tree = await git("POST", "trees", { base_tree: commit.tree.sha, tree: [
        ...files.map((f) => ({ path: f.path, mode: "100644", type: "blob", content: f.content })),
        ...paths.map((p) => ({ path: p, mode: "100644", type: "blob", sha: imgShas[p] })),
      ] });
      const c = await git("POST", "commits", { message: `Add pictures to announcement: ${d.title || ""}`.slice(0, 120), tree: tree.sha, parents: [head] });
      try { await git("PATCH", "refs/heads/" + BRANCH, { sha: c.sha }); done = true; }
      catch (e) { if (e.message !== "busy") throw e; }   // someone else committed meanwhile: start again from the new state
    }
    if (!done) throw new Error("busy");
    Object.values(picImgs).forEach((x) => URL.revokeObjectURL(x.url)); picImgs = {};
    showMsg("editMsg", "ok", tr("picOk")); $("editPicBox").hidden = true; loadList();
  } catch (e) { showMsg("editMsg", "err", e.message === "gone" ? tr("gone") : e.message === "notYet" ? tr("notYet") : errText(e)); }
  btn.disabled = false;
};

/* ===== screens ===== */
let keyBlob = null;
function applyTexts() {
  if (typeof GUIDES === "undefined") return;
  document.documentElement.lang = HTML_LANG(ui);
  ROOT.querySelectorAll("[data-t]").forEach((el) => {
    const v = tr(el.dataset.t);
    el.textContent = v;
  });
  fillExp();
  $("setupSteps").innerHTML = tr("setupSteps").map((s) => `<li>${esc(s)}</li>`).join("");
  const g = $("guide").value;
  $("guide").innerHTML = `<option value="">${esc(tr("noGuide"))}</option>` + Object.keys(GUIDES).filter((k) => !GUIDES[k].hidden)
    .map((k) => `<option value="${k}">${GUIDES[k].emoji} ${esc(GUIDES[k].name[ui] || GUIDES[k].name.en)}</option>`).join("");
  $("guide").value = g;
  if (typeof showEditing === "function") showEditing();
  if (cur) fillEditLang();
}
function showApp() { $("setupCard").hidden = true; $("po_app").hidden = false; renderPreview(); loadList(); takeCarriedImage(); }

async function tryUnlock(pw, silent, retried) {
  try { TOKEN = await decryptToken(keyBlob, pw); }
  catch (e) {
    // the key file remembered in this tab may be outdated (password changed) → try a fresh copy once
    if (!retried) { const fresh = await OfficerData.postKey(true); if (fresh && JSON.stringify(fresh) !== JSON.stringify(keyBlob)) { keyBlob = fresh; return tryUnlock(pw, silent, true); } }
    if (!silent) showMsg("lockMsg", "err", tr("wrongPw")); return false;
  }
  OFFICER_PW = pw; await OfficerData.unlock(pw);
  if ($("remember").checked || silent) { store.pw = pw; save(); }
  showApp(); return true;
}

async function init() {
  applyTexts();
  $("srcLang").innerHTML = LANGS.map((l) => `<option value="${l.code}">${l.label}</option>`).join("");
  $("srcLang").value = store.lang || "en";
  $("author").value = store.author || "";
  keyBlob = await OfficerData.postKey();
  if (!keyBlob) { $("setupCard").hidden = false; return; }   // first-time setup (no key file yet)
  TOKEN = OFFICER.token; OFFICER_PW = OFFICER.pw;   // the shared password card already opened the key file
  showApp();
}

/* ===== events ===== */
function setLang(l) { ui = l; store.ui = ui; save(); applyTexts(); if (!$("po_app").hidden) { renderPreview(); loadList(); } };
["annTitle", "body", "guide", "srcLang"].forEach((id) => $(id).addEventListener("input", renderPreview));
$("srcLang").onchange = () => { if (!editing) { store.lang = $("srcLang").value; save(); } renderPreview(); };
$("author").onchange = () => { if (!editing) { store.author = $("author").value.trim(); save(); } };
$("reloadBtn").onclick = loadList;
$("po_list").onclick = (e) => {
  const b = e.target.closest("[data-del]"); if (b) return deleteBlock(Number(b.dataset.del));
  const ed = e.target.closest("[data-edit]"); if (ed) openEdit(Number(ed.dataset.edit));
};

$("publishBtn").onclick = async () => {
  const author = $("author").value.trim(), title = $("annTitle").value.trim(), body = $("body").value.trim();
  if (!author || !title || !body) { showMsg("pubMsg", "err", tr("needAll")); return; }
  const expires = expValue();
  if ($("expSel").value !== "never" && (!expires || Date.parse(expires) <= Date.now())) { showMsg("pubMsg", "err", tr("expPast")); return; }
  if (!(await askYesNo(tr(editing ? "confirmEdit" : "confirmPub")))) return;
  if (!editing) { store.author = author; save(); }
  const btn = $("publishBtn"); btn.disabled = true; showMsg("pubMsg", "info", tr("publishing"));
  try {
    // 1) upload the pictures that are still in the message
    const used = Object.keys(pendingImgs).filter((path) => fullBody().includes(`[[img:${path}]]`));
    if (used.length) {
      showMsg("pubMsg", "info", tr("uploadingImg"));
      for (const path of used) {
        const b64 = b64enc(await pendingImgs[path].blob.arrayBuffer());
        await gh("PUT", path, { message: `Add picture for announcement: ${title}`.slice(0, 120), content: b64, branch: BRANCH });
      }
    }
    // 2) add the announcement
    const block = makeBlock({ author, lang: $("srcLang").value, title, body: fullBody(), created: editing ? editing.created : "", expires });
    jsyaml.load(block); // safety check: must be valid before it reaches the site
    if (editing) {
      // replace the old block in place, so it keeps its spot in the list
      const old = editing.block;
      await editSource((md) => {
        const b = splitBlocks(md); const at = b.indexOf(old);
        if (at < 0) throw new Error("gone");
        b[at] = block; return joinBlocks(b);
      }, `Edit announcement: ${title}`.slice(0, 120));
      editing = null; $("author").value = store.author || ""; $("srcLang").value = store.lang || "en"; showEditing();
      showMsg("pubMsg", "ok", tr("editOk"));
    } else {
      await editSource((md) => md.replace(/\r/g, "").trimEnd().replace(/\n?---$/, "") + "\n---\n" + block + "\n", `New announcement: ${title}`.slice(0, 120));
      showMsg("pubMsg", "ok", tr("pubOk"));
    }
    $("annTitle").value = ""; $("body").value = ""; $("guide").value = ""; setExp("");
    Object.values(pendingImgs).forEach((x) => URL.revokeObjectURL(x.url)); pendingImgs = {};
    renderPreview(); loadList();
  } catch (e) { showMsg("pubMsg", "err", e.message === "gone" ? tr("gone") : e.message === "net" || e.message === "auth" || e.message === "busy" ? errText(e) : String(e.message || e)); }
  btn.disabled = false;
};

$("setupBtn").onclick = async () => {
  const tok = $("tok").value.trim(), p1 = $("pw1").value, p2 = $("pw2").value;
  if (p1.length < 10) return showMsg("setupMsg", "err", tr("pwShort"));
  if (p1 !== p2) return showMsg("setupMsg", "err", tr("pwMismatch"));
  try {
    await gh("GET", SOURCE_PATH, null, tok); // checks the token can read the repo
    // officer data key: re-lock it with the new password (before switching passwords)
    const dk = await OfficerData.fetchKeyFile();
    if (dk) {
      const raw = OFFICER_PW ? await OfficerData.unwrap(dk, OFFICER_PW) : null;
      if (!raw) return showMsg("setupMsg", "err", tr("dataKeyRelock"));
      const oldDk = await gh("GET", OfficerData.KEY_FILE, null, tok);
      await gh("PUT", OfficerData.KEY_FILE, { message: "Re-lock officer data key with the new password", content: utf8ToB64(JSON.stringify(await OfficerData.wrap(raw, p1), null, 1) + "\n"), sha: oldDk ? oldDk.sha : undefined, branch: BRANCH }, tok);
    }
    const blob = await encryptToken(tok, p1);
    const old = await gh("GET", KEY_PATH, null, tok);
    await gh("PUT", KEY_PATH, { message: "Set up announcement posting", content: utf8ToB64(JSON.stringify(blob, null, 1) + "\n"), sha: old ? old.sha : undefined, branch: BRANCH }, tok);
    keyBlob = blob; TOKEN = tok; store.pw = p1; save(); OFFICER_PW = p1; await OfficerData.unlock(p1);
    showMsg("setupMsg", "ok", tr("setupOk"));
    setTimeout(showApp, 1500);
  } catch (e) { showMsg("setupMsg", "err", errText(e)); }
};
$("forgetBtn").onclick = () => { delete store.pw; save(); location.reload(); };
$("resetupBtn").onclick = () => { $("po_app").hidden = true; $("setupCard").hidden = false; };
$("dataKeyBtn").onclick = async () => {
  const out = $("dataKeyOut"); out.hidden = true;
  if (!OFFICER_PW || !TOKEN) return showMsg("dataKeyMsg", "err", tr("dataKeyNeedPw"));
  try {
    const dk = await OfficerData.fetchKeyFile();
    if (dk) {                                     // already on → show the key again
      const raw = await OfficerData.unwrap(dk, OFFICER_PW);
      if (!raw) return showMsg("dataKeyMsg", "err", tr("dataKeyRelock"));
      showMsg("dataKeyMsg", "ok", tr("dataKeyShown")); out.textContent = OfficerData.enc(raw); out.hidden = false; return;
    }
    if (!(await askYesNo(tr("dataKeyConfirm")))) return;
    const raw = crypto.getRandomValues(new Uint8Array(32));
    await gh("PUT", OfficerData.KEY_FILE, { message: "Turn on officer data encryption", content: utf8ToB64(JSON.stringify(await OfficerData.wrap(raw, OFFICER_PW), null, 1) + "\n"), branch: BRANCH });
    await OfficerData.unlock(OFFICER_PW);
    showMsg("dataKeyMsg", "ok", tr("dataKeyMade")); out.textContent = OfficerData.enc(raw); out.hidden = false;
  } catch (e) { showMsg("dataKeyMsg", "err", errText(e)); }
};



OFFICER_PAGES.post = { init: () => loadScripts(["data/content.js", "https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js"]).then(init), applyTexts, setLang, onShow: () => { if (!$("po_app").hidden) takeCarriedImage(); } };

})();
