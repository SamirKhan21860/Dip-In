// Scroll reveal using IntersectionObserver
const revealEls = document.querySelectorAll("[data-reveal]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("active");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.3 }
);
revealEls.forEach((el) => observer.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Theme toggle functionality
const modeToggle = document.getElementById("modeToggle");
const themeIcon = document.getElementById("themeIcon");

const sunPath = `<path d="M12 4.75a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0 01.75-.75zm0 12.5a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0 01.75-.75zm7.25-5.5a.75.75 0 010 1.5h-1a.75.75 0 010-1.5h1zM5.75 12a.75.75 0 010 1.5h-1a.75.75 0 010-1.5h1zM17.03 7.03a.75.75 0 011.06 1.06l-.707.707a.75.75 0 01-1.06-1.06l.707-.707zM6.64 17.36a.75.75 0 011.06 1.06l-.707.707a.75.75 0 01-1.06-1.06l.707-.707zM6.64 6.64a.75.75 0 10-1.06 1.06l.707.707a.75.75 0 101.06-1.06L6.64 6.64zm10.39 10.39a.75.75 0 10-1.06 1.06l.707.707a.75.75 0 101.06-1.06l-.707-.707zM12 7a5 5 0 100 10 5 5 0 000-10z"/>`;

const moonPath = `<path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>`;

// Theme toggle event listener
if (modeToggle && themeIcon) {
  modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    themeIcon.innerHTML = isLight ? sunPath : moonPath;
    
    // Use sessionStorage instead of localStorage for Claude environment
    try {
      sessionStorage.setItem("dipMode", isLight ? "light" : "dark");
    } catch (e) {
      // Fallback if storage is not available
      console.log("Storage not available");
    }
  });

  // Initialize theme on load
  try {
    const savedMode = sessionStorage.getItem("dipMode");
    if (savedMode === "light") {
      document.body.classList.add("light");
      themeIcon.innerHTML = sunPath;
    } else {
      themeIcon.innerHTML = moonPath;
    }
  } catch (e) {
    // Default to dark mode if storage is not available
    themeIcon.innerHTML = moonPath;
  }
}

// Contact Form
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const response = document.getElementById("formResponse");
    
    if (nameInput && emailInput && messageInput && response) {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const msg = messageInput.value.trim();
      
      if (!name || !email || !msg) {
        response.textContent = "Please complete all fields.";
        response.style.color = "#f87171";
      } else {
        response.textContent = "Thanks! We'll reach out soon.";
        response.style.color = "#00e5ff";
        contactForm.reset();
      }
    }
  });
}

// Ebook Download Function
function downloadEbook(filename) {
  // Create sample PDF content (you would replace this with actual PDF files)
  const pdfContent = generateSamplePDF(filename);
  
  // Create blob and download
  const blob = new Blob([pdfContent], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
  
  // Show download notification
  showDownloadNotification(filename);
}

// Generate sample PDF content (replace with actual PDF files)
function generateSamplePDF(filename) {
  const title = filename.replace('.pdf', '').replace(/-/g, ' ').toUpperCase();
  
  // Simple PDF-like content (this is just a placeholder)
  return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 24 Tf
100 700 Td
(${title}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000125 00000 n 
0000000185 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
279
%%EOF`;
}

// Show download notification
function showDownloadNotification(filename) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, #00e5ff, #0091ea);
    color: #000;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    z-index: 10000;
    animation: slideIn 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 229, 255, 0.3);
  `;
  notification.textContent = `✓ ${filename} downloaded!`;
  
  // Add slide animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    }, 300);
  }, 3000);
}

// Button hover ripple effect
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("mouseenter", (e) => {
      const circle = document.createElement("span");
      const d = Math.max(btn.clientWidth, btn.clientHeight);
      circle.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        animation: ripple 0.6s linear;
        pointer-events: none;
        width: ${d}px;
        height: ${d}px;
        left: ${e.clientX - btn.getBoundingClientRect().left - d / 2}px;
        top: ${e.clientY - btn.getBoundingClientRect().top - d / 2}px;
      `;
      
      // Add ripple animation
      const rippleStyle = document.createElement('style');
      rippleStyle.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(rippleStyle);
      
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(circle);
      
      setTimeout(() => {
        if (circle.parentNode) {
          circle.parentNode.removeChild(circle);
        }
        if (rippleStyle.parentNode) {
          rippleStyle.parentNode.removeChild(rippleStyle);
        }
      }, 600);
    });
  });

  // Explore button scroll to about section
  const exploreBtn = document.getElementById('exploreBtn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});