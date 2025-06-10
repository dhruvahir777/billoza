/**
 * Utility functions for formatting data
 */

/**
 * Formats file size from bytes to human-readable format
 * @param {number} sizeInBytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (sizeInBytes) => {
  if (!sizeInBytes || isNaN(sizeInBytes)) return "Unknown";
  const kb = sizeInBytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(2)} KB`;
  } else {
    const mb = kb / 1024;
    return `${mb.toFixed(2)} MB`;
  }
};

/**
 * Formats date to localized string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  if (!date) return "Unknown";
  try {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    return "Unknown";
  }
};
