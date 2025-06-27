// DOM elements
const titleInput = document.getElementById("title");
const messageInput = document.getElementById("message");
const imageUrlInput = document.getElementById("image-url");
const appNameInput = document.getElementById("app-name");
const appIconSelect = document.getElementById("app-icon");
const notificationTimeInput = document.getElementById("notification-time");

// Preview elements
const previewTitle = document.getElementById("preview-title");
const previewMessage = document.getElementById("preview-message");
const previewImage = document.getElementById("preview-image");
const previewImageSrc = document.getElementById("preview-image-src");
const previewAppName = document.getElementById("preview-app-name");
const previewAppIcon = document.getElementById("preview-app-icon");
const previewTime = document.getElementById("preview-time");

// App icon mappings
const appIcons = {
  default: "📱",
  chat: "💬",
  email: "📧",
  news: "📰",
  shopping: "🛒",
};

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  // Set up event listeners
  titleInput.addEventListener("input", updatePreview);
  messageInput.addEventListener("input", updatePreview);
  imageUrlInput.addEventListener("input", updateImage);
  appNameInput.addEventListener("input", updatePreview);
  appIconSelect.addEventListener("change", updatePreview);
  notificationTimeInput.addEventListener("input", updatePreview);

  // Initialize with current time
  updateTime();

  // Update time every minute
  setInterval(updateTime, 60000);
});

// Update the notification preview
function updatePreview() {
  // Update title
  previewTitle.textContent = titleInput.value || "Notification Title";

  // Update message
  previewMessage.textContent = messageInput.value || "Notification message";

  // Update app name
  previewAppName.textContent = appNameInput.value || "MyApp";

  // Update app icon
  const selectedIcon = appIconSelect.value;
  previewAppIcon.textContent = appIcons[selectedIcon] || appIcons.default;

  // Update time
  previewTime.textContent = notificationTimeInput.value || "now";

  // Add animation effect
  const notificationItem = document.querySelector(".notification-item");
  notificationItem.style.animation = "none";
  notificationItem.offsetHeight; // Trigger reflow
  notificationItem.style.animation = "slideIn 0.3s ease-out";
}

// Update the notification image
function updateImage() {
  const imageUrl = imageUrlInput.value.trim();

  if (imageUrl) {
    // Test if the image loads successfully
    const img = new Image();
    img.onload = function () {
      previewImageSrc.src = imageUrl;
      previewImage.style.display = "block";
    };
    img.onerror = function () {
      previewImage.style.display = "none";
      showError("Failed to load image. Please check the URL.");
    };
    img.src = imageUrl;
  } else {
    previewImage.style.display = "none";
  }
}

// Update the current time
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Update status bar time
  const statusTime = document.querySelector(".status-bar .time");
  if (statusTime) {
    statusTime.textContent = timeString;
  }

  // Update notification time if it's set to "now"
  if (notificationTimeInput.value === "now" || !notificationTimeInput.value) {
    previewTime.textContent = "now";
  }
}

// Show error message
function showError(message) {
  // Create a temporary error notification
  const errorDiv = document.createElement("div");
  errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 0.9rem;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideInRight 0.3s ease-out;
    `;
  errorDiv.textContent = message;

  document.body.appendChild(errorDiv);

  // Remove after 3 seconds
  setTimeout(() => {
    errorDiv.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 300);
  }, 3000);
}

// Add CSS animations for error messages
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// Add some sample image URLs for testing
const sampleImages = [
  "https://picsum.photos/300/200?random=1",
  "https://picsum.photos/300/200?random=2",
  "https://picsum.photos/300/200?random=3",
];

// Add a button to test with sample images (for development)
function addSampleImageButton() {
  const formSection = document.querySelector(".form-section");
  const sampleButton = document.createElement("button");
  sampleButton.textContent = "Test with Sample Image";
  sampleButton.style.cssText = `
        background: #667eea;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        font-size: 0.9rem;
        cursor: pointer;
        margin-top: 8px;
        transition: background-color 0.2s ease;
    `;

  sampleButton.addEventListener("click", function () {
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    imageUrlInput.value = randomImage;
    updateImage();
  });

  sampleButton.addEventListener("mouseenter", function () {
    this.style.background = "#5a67d8";
  });

  sampleButton.addEventListener("mouseleave", function () {
    this.style.background = "#667eea";
  });

  // Add after the image URL input
  const imageUrlGroup = imageUrlInput.parentNode;
  imageUrlGroup.appendChild(sampleButton);
}

// Add the sample image button for testing
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(addSampleImageButton, 100);
});
