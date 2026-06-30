// قاعدة بيانات الردود باللغة الإيزيدية
const ezidiResponses = {
    "silav": "Silav û rêz! Tu çawa yî? Ez hêvî dikim tu her dem baş bî.",
    "roj baş": "Roj baş û her dem xweş! Xwedê û Tawisî Melek li te bin.",
    "çawa yî": "Ez fêm dikim û ez pir baş im, spas ji bo pirsiyara te! Tu çawa yî?",
    "spas": "Ser çavan, tu her dem silamat bî.",
    "xwedê": "Xwedê li we û li hemû dinyayê be, xêr û fedyletê bide we.",
    "tawisî melek": "Tawisî Melek rêber û parêzvanê me teva be.",
    "laleş": "Laleşa Nûranî cihê pîroz û qibleta dilê me ye. Her dem pîroz be.",
    "ezidi": "Êzîdîtî dînê aştî, ronahî û hezkirinê ye."
};

const defaultResponse = "Ez lêborîna xwe dixwazim, ez hîn fêr dibim. Lê ez tenê bi zimanê êzîdî yê pîroz dikarim bersivê bidim te.";

// قائمة الحروف الإيزيدية والكردية اللاتينية الخاصة والأساسية لتوليد الكيبورد
const ezidiLetters = [
    "A", "B", "C", "Ç", "D", "E", "Ê",
    "F", "G", "H", "I", "Î", "J", "K",
    "L", "M", "N", "O", "P", "Q", "R",
    "S", "Ş", "T", "U", "Û", "V", "W",
    "X", "Y", "Z", " ", "⌫" // مسافة ومسح
];

// توليد الكيبورد عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    const keyboardContainer = document.getElementById("ezidiKeyboard");
    
    ezidiLetters.forEach(letter => {
        const button = document.createElement("button");
        button.classList.add("key-btn");
        
        // تخصيص أزرار المسافة والمسح
        if (letter === " ") {
            button.innerText = "Spasî (Space)";
            button.classList.add("wide");
        } else if (letter === "⌫") {
            button.innerText = "Paqijkirin ⌫";
            button.classList.add("wide");
        } else {
            button.innerText = letter;
        }

        // حدث الضغط على أزرار الكيبورد
        button.onclick = () => handleKeyClick(letter);
        keyboardContainer.appendChild(button);
    });
});

// معالجة إدخال الحروف من الكيبورد الافتراضي
function handleKeyClick(letter) {
    const inputElement = document.getElementById("userInput");
    
    if (letter === "⌫") {
        // حذف آخر حرف
        inputElement.value = inputElement.value.slice(0, -1);
    } else {
        // إضافة الحرف المكبوس (بصيغة صغيرة متناسبة مع الكتابة العادية)
        inputElement.value += letter.toLowerCase();
    }
    inputElement.focus(); // إبقاء المؤشر داخل حقل الكتابة
}

// دالة إرسال الرسالة
function sendMessage() {
    const inputElement = document.getElementById("userInput");
    const messageText = inputElement.value.trim();

    if (messageText === "") return;

    appendMessage(messageText, "user-message");
    inputElement.value = ""; 

    setTimeout(() => {
        const botReply = getBotResponse(messageText);
        appendMessage(botReply, "bot-message");
    }, 1000);
}

function getBotResponse(text) {
    const lowerText = text.toLowerCase();
    for (let key in ezidiResponses) {
        if (lowerText.includes(key)) {
            return ezidiResponses[key];
        }
    }
    return defaultResponse;
}

function appendMessage(text, className) {
    const chatMessages = document.getElementById("chatMessages");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    messageDiv.innerText = text;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

