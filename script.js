document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Set first item as active by default
    faqItems[0].classList.add('active');
    
    // Add click event to each FAQ item
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // If the clicked item is already active, close it
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            } else {
                // Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Open the clicked item
                item.classList.add('active');
            }
        });
    });
    
    // Add keyboard accessibility
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
        
        // Make question focusable
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', item.classList.contains('active'));
        
        // Update aria-expanded attribute when item state changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isActive = item.classList.contains('active');
                    question.setAttribute('aria-expanded', isActive);
                }
            });
        });
        
        observer.observe(item, { attributes: true });
    });
    
    // Function to open a specific FAQ item by index
    window.openFAQ = function(index) {
        if (index >= 0 && index < faqItems.length) {
            faqItems.forEach(item => {
                item.classList.remove('active');
            });
            faqItems[index].classList.add('active');
        }
    };
    
    // Function to close all FAQ items
    window.closeAllFAQ = function() {
        faqItems.forEach(item => {
            item.classList.remove('active');
        });
    };
    
    // Function to toggle a specific FAQ item
    window.toggleFAQ = function(index) {
        if (index >= 0 && index < faqItems.length) {
            const item = faqItems[index];
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        }
    };
});