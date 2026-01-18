/* =========================================
   Silver Jewellery Brand - Main Logic
   ========================================= */

// --- 1. Mock Data ---
const PRODUCTS = [
    {
        id: 1,
        name: "Ethereal Silver Ring",
        price: "$120",
        image: "assets/images/cat_gold.png",
        category: "Rings",
        purity: "925 Sterling"
    },
    {
        id: 2,
        name: "Royal Gents Band",
        price: "$180",
        image: "assets/images/cat_pure.png",
        category: "Rings",
        purity: "925 Sterling"
    },
    {
        id: 3,
        name: "Luminary Chain Set",
        price: "$350",
        image: "assets/images/cat_modern.png",
        category: "Chains",
        purity: "950 Platinum Plated"
    },
    {
        id: 4,
        name: "Bridal Essence Set",
        price: "$550",
        image: "assets/images/cat_bridal.png",
        category: "Sets",
        purity: "925 Sterling"
    }
];

const CATEGORIES = [
    { code: 'BE', name: 'Bridal Elegance' },
    { code: 'PSL', name: 'Pure Silver Luxury' },
    { code: 'BMW', name: 'Modern Wear' },
    { code: 'BGL', name: 'Gold Layered' },
    { code: 'GBL', name: 'Gemstone Line' }
];

// --- 2. State Management ---
const state = {
    silverRate: 24.50,
    rateTrend: 'up' // 'up' or 'down'
};

// --- 3. DOM Elements ---
const rateValueEl = document.getElementById('rate-value');
const rateTrendEl = document.getElementById('rate-trend');
const productGridEl = document.getElementById('product-grid');
const headerEl = document.querySelector('.header');

// --- 4. Functions ---

// Initialize Live Rate Ticker
function initLiveRate() {
    // Simulate API fetch
    updateRateDisplay();

    // Simulate updates
    setInterval(() => {
        const change = (Math.random() - 0.5) * 0.1;
        state.silverRate += change;
        state.rateTrend = change >= 0 ? 'up' : 'down';
        updateRateDisplay();
    }, 5000);
}

function updateRateDisplay() {
    if (!rateValueEl) return;

    rateValueEl.textContent = `$${state.silverRate.toFixed(2)} / oz`;

    if (state.rateTrend === 'up') {
        rateTrendEl.innerHTML = '▲ +0.2%';
        rateTrendEl.style.color = '#4CAF50';
    } else {
        rateTrendEl.innerHTML = '▼ -0.1%';
        rateTrendEl.style.color = '#F44336';
    }
}

// Render Products
function renderProducts() {
    if (!productGridEl) return;

    productGridEl.innerHTML = PRODUCTS.map(product => `
        <div class="product-card">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-img">
            </div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">${product.price}</div>
            <div class="product-meta">${product.purity}</div>
            <button class="btn btn-outline" style="margin-top: 15px; padding: 8px 20px; font-size: 0.8rem;">View Details</button>
        </div>
    `).join('');
}

// Header Scroll Effect
function initScrollEffect() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            headerEl.classList.add('scrolled');
        } else {
            headerEl.classList.remove('scrolled');
        }
    });
}

// --- 5. Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initLiveRate();
    renderProducts();
    initScrollEffect();
    initVoiceGreeting(); // Initialize voice greeting
    console.log("Silver Jewellery App Initialized");
});

// Voice Greeting
function initVoiceGreeting() {
    const greetingText = "Assalam o Alaikum, your welcome to our silver buying and selling website";

    const playGreeting = () => {
        const utterance = new SpeechSynthesisUtterance(greetingText);
        utterance.rate = 1; // Normal speed
        utterance.pitch = 1; // Normal pitch
        window.speechSynthesis.speak(utterance);

        // Remove listeners after playing once
        document.removeEventListener('click', playGreeting);
        document.removeEventListener('keydown', playGreeting);
    };

    // Browsers require user interaction to play audio
    document.addEventListener('click', playGreeting);
    document.addEventListener('keydown', playGreeting);
}
