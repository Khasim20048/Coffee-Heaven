document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('payments.html')) {
        const paymentCard = document.querySelector('.payment-card');
        if (paymentCard) paymentCard.classList.add('fade-in');
        const form = document.querySelector('.payment-form');
        const phoneInput = document.getElementById('phone');
        const payBtn = form.querySelector('.btn-primary');
        // Payment method logic
        const methodUpi = document.getElementById('method-upi');
        const methodCard = document.getElementById('method-card');
        const upiFields = document.getElementById('upi-fields');
        const cardFields = document.getElementById('card-fields');
        // Default: UPI selected
        methodUpi.classList.add('selected');
        upiFields.style.display = '';
        cardFields.style.display = 'none';
        methodUpi.addEventListener('click', selectUpi);
        methodUpi.addEventListener('keydown', function(e){if(e.key==='Enter'||e.key===' '){selectUpi();}});
        methodCard.addEventListener('click', selectCard);
        methodCard.addEventListener('keydown', function(e){if(e.key==='Enter'||e.key===' '){selectCard();}});
        function selectUpi() {
            methodUpi.classList.add('selected');
            methodCard.classList.remove('selected');
            upiFields.style.display = '';
            cardFields.style.display = 'none';
        }
        function selectCard() {
            methodCard.classList.add('selected');
            methodUpi.classList.remove('selected');
            upiFields.style.display = 'none';
            cardFields.style.display = '';
        }
        // Highlight Paytm button on focus
        payBtn.addEventListener('focus', function() {
            payBtn.style.boxShadow = '0 0 0 3px #00b9f555';
        });
        payBtn.addEventListener('blur', function() {
            payBtn.style.boxShadow = '';
        });
        // Simple phone validation
        form.addEventListener('submit', function(e) {
            const phone = phoneInput.value.trim();
            if (!/^([6-9][0-9]{9})$/.test(phone)) {
                e.preventDefault();
                showToast('Please enter a valid 10-digit Paytm phone number.');
                phoneInput.focus();
                return false;
            }
        });
    }
});

function showToast(message) {
    let toast = document.createElement('div');
    toast.className = 'paytm-toast';
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.top = '24px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = '#00b9f5';
    toast.style.color = '#fff';
    toast.style.padding = '14px 32px';
    toast.style.borderRadius = '8px';
    toast.style.fontSize = '16px';
    toast.style.boxShadow = '0 2px 8px rgba(0,185,245,0.15)';
    toast.style.zIndex = '9999';
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 2200);
} 