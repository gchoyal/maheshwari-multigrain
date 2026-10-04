/**
 * Maheshwari Food Processing Unit - Interactive Script
 * Handles: Weight selection (1kg, 5kg, 15kg), WhatsApp direct ordering,
 * Packaging preview modal, and smooth interactions.
 */

// WhatsApp business phone number (from card: 9713908087)
const WHATSAPP_NUMBER = '919713908087';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize weight selection buttons
  const weightButtons = document.querySelectorAll('.weight-btn');
  weightButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      // Find sibling buttons in this product's selector
      const parent = this.closest('.weight-options');
      if (parent) {
        parent.querySelectorAll('.weight-btn').forEach(b => b.classList.remove('active'));
      }
      this.classList.add('active');
    });
  });
});

/**
 * Handle WhatsApp ordering for a specific product card
 * @param {string} productName - Name of the product
 * @param {HTMLElement} btn - The clicked order button
 */
function orderOnWhatsApp(productName, btn) {
  const card = btn.closest('.product-card');
  let selectedWeight = '1 Kg'; // default
  
  if (card) {
    const activeWeightBtn = card.querySelector('.weight-btn.active');
    if (activeWeightBtn) {
      selectedWeight = activeWeightBtn.getAttribute('data-weight') || activeWeightBtn.textContent.trim();
    }
  }

  // Compose Hindi WhatsApp message
  const message = 
`नमस्ते! मुझे Maheshwari Food Processing Unit से ऑर्डर करना है:

🌾 उत्पाद (Product): ${productName}
⚖️ वज़न / पैक साइज़: ${selectedWeight}

कृपया इसका ताज़ा भाव (Price) और इंदौर में होम डिलीवरी / पिकअप की जानकारी दें।`;

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
}

/**
 * Handle quick inquiry form submission
 */
function handleQuickInquiry(event) {
  event.preventDefault();
  const name = document.getElementById('custName').value.trim();
  const product = document.getElementById('custProduct').value;
  const size = document.getElementById('custSize').value;

  const message = 
`नमस्ते! मेरा नाम ${name} है।
मुझे Maheshwari Food Processing Unit से जानकारी / ऑर्डर चाहिए:

🌾 उत्पाद: ${product}
⚖️ मात्रा: ${size}

कृपया रेट और डिलीवरी की जानकारी प्रदान करें। धन्यवाद!`;

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
}

/**
 * Modal Data and Controls for Packaging Preview
 */
const PACK_DATA = {
  multigrain: {
    title: 'मल्टीग्रेन आटा (Multigrain Flour) - ओरिजिनल पाउच',
    img: 'images/pouch_multigrain_pack.png',
    desc: 'प्रीमियम ब्लू स्टैंडअप जिपलॉक पाउच पैकिंग। 100% हाइजीनिक, एयरटाइट और नमी से सुरक्षित।',
    product: 'मल्टीग्रेन आटा (Multigrain Flour)'
  },
  makka: {
    title: 'मक्का आटा (Makka Flour) - रिटेल पैक',
    img: 'images/product1.jpg',
    desc: 'सुनहरे ताज़े मक्के का स्टोनलेस आटा, ग्लूटन-फ्री, 1 Kg, 5 Kg व 15 Kg में उपलब्ध। FSSAI प्रमाणित।',
    product: 'मक्का आटा (Makka Flour)'
  },
  multigrain_label: {
    title: 'मल्टीग्रेन आटा (Multigrain Flour) - पैक विवरण',
    img: 'images/product2.jpg',
    desc: 'फाइबर युक्त, स्टोनलेस ग्राइंडिंग, बिना किसी प्रिजर्वेटिव के शुद्ध स्वास्थ्यवर्धक आटा।',
    product: 'मल्टीग्रेन आटा (Multigrain Flour)'
  }
};

let currentModalProduct = 'मल्टीग्रेन आटा';

function openPackModal(type) {
  const modal = document.getElementById('packModal');
  const data = PACK_DATA[type];
  if (!data) return;

  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalImg').src = data.img;
  document.getElementById('modalDesc').textContent = data.desc;
  currentModalProduct = data.product;

  const orderBtn = document.getElementById('modalOrderBtn');
  orderBtn.onclick = function() {
    const msg = `नमस्ते! मुझे Maheshwari Food Processing Unit से ${currentModalProduct} का ऑर्डर करना है। कृपया उपलब्ध साइज़ (1kg/5kg/15kg) व रेट बताएं।`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  modal.classList.add('show');
}

function closePackModal() {
  const modal = document.getElementById('packModal');
  modal.classList.remove('show');
}

// Close modal on Escape key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePackModal();
  }
});
