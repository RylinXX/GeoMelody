/**
 * Share & Deep Linking utilities for GeoMelody
 */

export const shareUtil = {
  // Generate deep link for a specific spot
  getSpotShareUrl(spotId) {
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('spot', spotId);
    return url.toString();
  },

  // Parse spot from current URL query / hash
  getInitialSpotId() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('spot')) {
      return params.get('spot');
    }
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('spot-')) {
      return hash.replace('spot-', '');
    }
    return null;
  },

  // Update browser URL silently without page reload
  updateUrl(spotId) {
    const url = new URL(window.location.href);
    if (spotId) {
      url.searchParams.set('spot', spotId);
    } else {
      url.searchParams.delete('spot');
    }
    window.history.replaceState({}, '', url.toString());
  },

  // Copy link with clipboard API & fallback
  async copyToClipboard(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (e) {}

    // Fallback
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    } catch (err) {
      return false;
    }
  }
};
