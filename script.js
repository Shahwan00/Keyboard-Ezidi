let isUppercase = false;

// دالة كتابة الحروف والرموز
function pressKey(character) {
    const input = document.getElementById("keyboardInput");
    
    // تحويل الحرف لكبير إذا كان زر الشفت مفعلاً
    if (isUppercase && cardIsLetter(character)) {
        input.value += character.toUpperCase();
    } else {
        input.value += character;
    }
}

// دالة مسح الحرف الأخير (Backspace)
function pressBackspace() {
    const input = document.getElementById("keyboardInput");
    input.value = input.value.slice(0, -1);
}

// دالة كتابة الملصقات المخصصة (مثل علم إيزيدخان)
function pressSticker(type) {
    const input = document.getElementById("keyboardInput");
    if (type === 'ezidkhan') {
        input.value += " 🦚☀️(Êzîdxan) "; // نص أو إيموجي يمثل العلم عند الإرسال
    }
}

// التنقل بين شاشات الكيبورد (حروف، رموز، ملصقات)
function switchView(viewName) {
    // إخفاء كل الواجهات
    document.getElementById("view-letters").classList.remove("active");
    document.getElementById("view-symbols").classList.remove("active");
    document.getElementById("view-stickers").classList.remove("active");
    
    // إظهار الواجهة المطلوبة
    if (viewName === 'letters') {
        document.getElementById("view-letters").classList.add("active");
    } else if (viewName === 'symbols') {
        document.getElementById("view-symbols").classList.add("active");
    } else if (viewName === 'stickers') {
        document.getElementById("view-stickers").classList.add("active");
    }
}

// تفعيل وتعطيل الأحرف الكبيرة (Shift)
function toggleShift() {
    isUppercase = !isUppercase;
    const keys = document.querySelectorAll(".key");
    
    keys.forEach(key => {
        if (key.innerText.length === 1 && cardIsLetter(key.innerText)) {
            key.innerText = isUppercase ? key.innerText.toUpperCase() : key.innerText.toLowerCase();
        }
    });
}

// دالة مساعدة لمعرفة هل المدخل حرف أم رمز
function cardIsLetter(char) {
    return char.toLowerCase() !== char.toUpperCase() || "êîûçş".includes(char.toLowerCase());
}
