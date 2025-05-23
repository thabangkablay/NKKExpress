// DOM Elements
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const quickBookingForm = document.getElementById('quickBookingForm');
const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const dateInput = document.getElementById('date');
const scrollToTopBtn = document.getElementById('scrollToTop');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close mobile menu when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Scroll to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 200) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Validation
quickBookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const from = fromSelect.value;
    const to = toSelect.value;
    const date = dateInput.value;
    
    if (from === to) {
        alert('Please select different cities for departure and destination.');
        return;
    }
    
    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
        alert('Please select a future date for travel.');
        return;
    }
    
    // Here you would typically send the form data to a server
    console.log('Booking form submitted:', { from, to, date });
    alert('Thank you for booking with NKK Express! We will contact you shortly with available buses.');
});

// Prevent selecting same city in both dropdowns
fromSelect.addEventListener('change', () => {
    Array.from(toSelect.options).forEach(option => {
        option.disabled = option.value === fromSelect.value && option.value !== '';
    });
});

toSelect.addEventListener('change', () => {
    Array.from(fromSelect.options).forEach(option => {
        option.disabled = option.value === toSelect.value && option.value !== '';
    });
});

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
        }
    });
});

// Intersection Observer for Animations
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

// Add animation to elements
document.querySelectorAll('.feature-card, .route-card').forEach(element => {
    animateOnScroll.observe(element);
});

// Add CSS class for animation
const style = document.createElement('style');
style.textContent = `
    .feature-card, .route-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .feature-card.animate, .route-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Add scroll styles
const headerStyle = document.createElement('style');
headerStyle.textContent = `
    .header {
        transition: transform 0.3s ease;
    }
    .header.scroll-down {
        transform: translateY(-100%);
    }
    .header.scroll-up {
        transform: translateY(0);
    }
`;
document.head.appendChild(headerStyle);

// Schedule Page Functionality
const routeTabs = document.querySelectorAll('.route-tab');
const routeContents = document.querySelectorAll('.route-content');
const scheduleSearchForm = document.getElementById('scheduleSearchForm');

if (routeTabs && routeContents) {
    routeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            routeTabs.forEach(t => t.classList.remove('active'));
            routeContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const route = tab.getAttribute('data-route');
            document.getElementById(route).classList.add('active');
        });
    });
}

if (scheduleSearchForm) {
    scheduleSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const from = document.getElementById('searchFrom').value;
        const to = document.getElementById('searchTo').value;
        const date = document.getElementById('searchDate').value;
        
        if (from === to) {
            alert('Please select different cities for departure and destination.');
            return;
        }
        
        const today = new Date().toISOString().split('T')[0];
        if (date < today) {
            alert('Please select a future date for travel.');
            return;
        }
        
        // Find the corresponding route tab
        const routeId = `${from}-${to}`;
        const routeTab = document.querySelector(`[data-route="${routeId}"]`);
        
        if (routeTab) {
            // If route exists, show it
            routeTabs.forEach(t => t.classList.remove('active'));
            routeContents.forEach(c => c.classList.remove('active'));
            
            routeTab.classList.add('active');
            document.getElementById(routeId).classList.add('active');
            
            // Scroll to the schedule
            document.querySelector('.schedule-routes').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            alert('No direct routes available for the selected cities. Please try different cities or contact us for custom booking.');
        }
    });
}

// Prevent selecting same city in search form
const searchFrom = document.getElementById('searchFrom');
const searchTo = document.getElementById('searchTo');

if (searchFrom && searchTo) {
    searchFrom.addEventListener('change', () => {
        Array.from(searchTo.options).forEach(option => {
            option.disabled = option.value === searchFrom.value && option.value !== '';
        });
    });

    searchTo.addEventListener('change', () => {
        Array.from(searchFrom.options).forEach(option => {
            option.disabled = option.value === searchTo.value && option.value !== '';
        });
    });
}

// Set minimum date to today for search form
const searchDate = document.getElementById('searchDate');
if (searchDate) {
    const today = new Date().toISOString().split('T')[0];
    searchDate.setAttribute('min', today);
}

// Booking Page Functionality
const bookingForm = document.getElementById('bookingForm');
const bookingSteps = document.querySelectorAll('.booking-step');
const progressSteps = document.querySelectorAll('.progress-step');
const nextButtons = document.querySelectorAll('.next-step');
const prevButtons = document.querySelectorAll('.prev-step');
const submitButton = document.querySelector('.submit-booking');

// Booking form fields
const bookFrom = document.getElementById('bookFrom');
const bookTo = document.getElementById('bookTo');
const bookDate = document.getElementById('bookDate');
const bookTime = document.getElementById('bookTime');
const passengerName = document.getElementById('passengerName');
const passengerEmail = document.getElementById('passengerEmail');
const passengerPhone = document.getElementById('passengerPhone');
const seats = document.querySelectorAll('.seat');

if (bookingForm) {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    bookDate.setAttribute('min', today);

    // Prevent selecting same city
    bookFrom.addEventListener('change', () => {
        Array.from(bookTo.options).forEach(option => {
            option.disabled = option.value === bookFrom.value && option.value !== '';
        });
    });

    bookTo.addEventListener('change', () => {
        Array.from(bookFrom.options).forEach(option => {
            option.disabled = option.value === bookTo.value && option.value !== '';
        });
    });

    // Handle step navigation
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = button.closest('.booking-step');
            const currentStepNumber = parseInt(currentStep.dataset.step);

            if (validateStep(currentStepNumber)) {
                currentStep.classList.remove('active');
                const nextStep = document.querySelector(`.booking-step[data-step="${currentStepNumber + 1}"]`);
                nextStep.classList.add('active');

                // Update progress bar
                progressSteps[currentStepNumber].classList.remove('active');
                progressSteps[currentStepNumber].classList.add('completed');
                progressSteps[currentStepNumber].querySelector('.step-number').innerHTML = '<i class="fas fa-check"></i>';
                progressSteps[currentStepNumber + 1].classList.add('active');

                // Update summary if moving to payment step
                if (currentStepNumber === 3) {
                    updateBookingSummary();
                }
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = button.closest('.booking-step');
            const currentStepNumber = parseInt(currentStep.dataset.step);

            currentStep.classList.remove('active');
            const prevStep = document.querySelector(`.booking-step[data-step="${currentStepNumber - 1}"]`);
            prevStep.classList.add('active');

            // Update progress bar
            progressSteps[currentStepNumber - 1].classList.add('active');
            progressSteps[currentStepNumber - 1].classList.remove('completed');
            progressSteps[currentStepNumber - 1].querySelector('.step-number').textContent = currentStepNumber;
            progressSteps[currentStepNumber].classList.remove('active');
        });
    });

    // Seat selection
    let selectedSeat = null;
    seats.forEach(seat => {
        if (!seat.classList.contains('occupied')) {
            seat.addEventListener('click', () => {
                if (selectedSeat) {
                    selectedSeat.classList.remove('selected');
                }
                seat.classList.add('selected');
                selectedSeat = seat;
            });
        }
    });

    // Form submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateStep(4)) {
            // Here you would typically send the booking data to a server
            alert('Booking successful! You will receive a confirmation email shortly.');
            window.location.href = 'index.html';
        }
    });
}

// Validation functions
function validateStep(step) {
    switch (step) {
        case 1:
            if (!bookFrom.value || !bookTo.value || !bookDate.value || !bookTime.value) {
                alert('Please fill in all route details.');
                return false;
            }
            return true;

        case 2:
            if (!passengerName.value || !passengerEmail.value || !passengerPhone.value) {
                alert('Please fill in all passenger details.');
                return false;
            }
            if (!validateEmail(passengerEmail.value)) {
                alert('Please enter a valid email address.');
                return false;
            }
            if (!validatePhone(passengerPhone.value)) {
                alert('Please enter a valid phone number.');
                return false;
            }
            return true;

        case 3:
            if (!selectedSeat) {
                alert('Please select a seat.');
                return false;
            }
            return true;

        case 4:
            const cardNumber = document.getElementById('cardNumber').value;
            const cardExpiry = document.getElementById('cardExpiry').value;
            const cardCVV = document.getElementById('cardCVV').value;

            if (!cardNumber || !cardExpiry || !cardCVV) {
                alert('Please fill in all payment details.');
                return false;
            }
            if (!validateCardNumber(cardNumber)) {
                alert('Please enter a valid card number.');
                return false;
            }
            if (!validateCardExpiry(cardExpiry)) {
                alert('Please enter a valid expiry date (MM/YY).');
                return false;
            }
            if (!validateCVV(cardCVV)) {
                alert('Please enter a valid CVV.');
                return false;
            }
            return true;
    }
    return true;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^\+?\d{10,}$/.test(phone.replace(/[\s-]/g, ''));
}

function validateCardNumber(number) {
    return /^\d{16}$/.test(number.replace(/[\s-]/g, ''));
}

function validateCardExpiry(expiry) {
    return /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiry);
}

function validateCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

function updateBookingSummary() {
    document.getElementById('summaryRoute').textContent = `${bookFrom.value} to ${bookTo.value}`;
    document.getElementById('summaryDateTime').textContent = `${formatDate(bookDate.value)} - ${bookTime.value}`;
    document.getElementById('summarySeat').textContent = selectedSeat.dataset.seat;
    document.getElementById('summaryPassenger').textContent = passengerName.value;
    
    // Calculate price based on route
    let price = 150; // Default price
    if (bookFrom.value === 'gaborone' && bookTo.value === 'maun' || 
        bookTo.value === 'gaborone' && bookFrom.value === 'maun') {
        price = 200;
    } else if (bookFrom.value === 'francistown' && bookTo.value === 'kasane' || 
               bookTo.value === 'francistown' && bookFrom.value === 'kasane') {
        price = 180;
    }
    document.getElementById('summaryAmount').textContent = `P${price}`;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        if (!validatePhone(phone)) {
            alert('Please enter a valid phone number.');
            return;
        }
        
        // Here you would typically send the form data to a server
        console.log('Contact form submitted:', { name, email, phone, subject, message });
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Items Click Handling
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = null;
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            // Handle answer height
            if (!isActive) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // FAQ Category Tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    const faqCategories = document.querySelectorAll('.faq-category');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');
            
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show selected category
            faqCategories.forEach(cat => {
                cat.classList.remove('active');
                if (cat.id === category) {
                    cat.classList.add('active');
                }
            });

            // Reset all accordions when switching categories
            faqItems.forEach(item => {
                item.classList.remove('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = null;
            });
        });
    });

    // FAQ Search Functionality
    const searchInput = document.getElementById('faqSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    // Show the category containing matching items
                    const category = item.closest('.faq-category');
                    if (category) {
                        categoryTabs.forEach(tab => {
                            if (tab.getAttribute('data-category') === category.id) {
                                tab.click();
                            }
                        });
                    }
                } else {
                    item.style.display = 'none';
                }
            });

            // If search is empty, reset to default view
            if (searchTerm === '') {
                faqItems.forEach(item => {
                    item.style.display = 'block';
                });
            }
        });
    }
}); 