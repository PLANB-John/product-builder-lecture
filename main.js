const generateBtn = document.getElementById('generate-btn');
const numberElements = document.querySelectorAll('.lotto-numbers .number');
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Theme toggle logic
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
});

function updateThemeButton(theme) {
    themeToggle.textContent = theme === 'dark' ? '라이트 모드' : '다크 모드';
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeButton(savedTheme);

generateBtn.addEventListener('click', () => {
...
    // Clear previous numbers and add a generating effect
    let clearingInterval = setInterval(() => {
        numberElements.forEach((el, index) => {
            setTimeout(() => {
                el.textContent = '';
                el.style.transform = 'scale(0.8)';
                el.style.opacity = '0.5';
            }, index * 50);
        });
    }, 300);

    // Stop the clearing effect and generate new numbers
    setTimeout(() => {
        clearInterval(clearingInterval);
        generateAndDisplayNumbers();
    }, 1000); // Wait 1 second before showing new numbers
});

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function generateAndDisplayNumbers() {
    const lottoNumbers = generateLottoNumbers();
    numberElements.forEach((element, index) => {
        setTimeout(() => {
            element.textContent = lottoNumbers[index];
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
            setNumberColor(element, lottoNumbers[index]);
        }, index * 150); // Stagger the appearance of each number
    });
}

function setNumberColor(element, number) {
    let color = '';
    if (number <= 10) {
        color = '#fbc400'; // Yellow
    } else if (number <= 20) {
        color = '#69c8f2'; // Blue
    } else if (number <= 30) {
        color = '#ff7272'; // Red
    } else if (number <= 40) {
        color = '#aaa'; // Gray
    } else {
        color = '#b0d840'; // Green
    }
    element.style.borderColor = color;
    element.style.color = color;

    // Add a glowing shadow effect
    element.style.boxShadow = `0 0 15px ${color}`;
}

// Initial generation of numbers on page load for a nice first impression
window.addEventListener('load', () => {
    setTimeout(generateAndDisplayNumbers, 500);
});
