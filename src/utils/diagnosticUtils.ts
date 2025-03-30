
// Utility functions for diagnostic tools

/**
 * Get diagnostic user data from localStorage
 */
export const getDiagnosticUserData = () => {
  try {
    const storedData = localStorage.getItem('diagnosticUserData');
    if (storedData) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error('Error retrieving diagnostic user data:', error);
  }
  return null;
};

/**
 * Check if the user has already provided their information
 */
export const hasUserProvidedInfo = () => {
  return !!getDiagnosticUserData();
};

/**
 * Clear diagnostic user data
 */
export const clearDiagnosticUserData = () => {
  try {
    localStorage.removeItem('diagnosticUserData');
  } catch (error) {
    console.error('Error clearing diagnostic user data:', error);
  }
};
