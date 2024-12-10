// script.js

// Smooth Scroll for header links
document.addEventListener('DOMContentLoaded', function () {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth',
                });
            }
        });
    });
});

// Fade-in animation trigger on scroll
const internships = document.querySelectorAll('.internship');

function revealOnScroll() {
    internships.forEach(internship => {
        const rect = internship.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            internship.style.opacity = '1';
            internship.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

document.querySelectorAll('.hover-effect').forEach((element) => {
    let text = element.innerText;
    let spanText = text.split('').map((char) => `<span data-text="${char}">${char}</span>`).join('');
    element.innerHTML = spanText;
});
