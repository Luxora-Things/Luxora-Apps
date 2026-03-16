/**
 * Luxora Apps - Main JavaScript
 * Handles interactivity and dynamic features
 */

// Share Website Function
function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: 'Luxora Apps',
            text: 'Check out Luxora Apps - a magical app development company!',
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Website link copied to clipboard!');
        });
    }
}
