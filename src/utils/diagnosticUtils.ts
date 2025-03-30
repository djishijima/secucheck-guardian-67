
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

/**
 * Save diagnostic request data
 * @param diagnosticType - The type of diagnostic service
 * @param data - The diagnostic data to save
 */
export const saveDiagnosticRequest = (diagnosticType: string, data: any) => {
  try {
    const requests = JSON.parse(localStorage.getItem('diagnosticRequests') || '[]');
    requests.push({
      type: diagnosticType,
      data,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('diagnosticRequests', JSON.stringify(requests));
    return true;
  } catch (error) {
    console.error('Error saving diagnostic request:', error);
    return false;
  }
};

/**
 * Get all diagnostic requests
 */
export const getDiagnosticRequests = () => {
  try {
    const requests = localStorage.getItem('diagnosticRequests');
    return requests ? JSON.parse(requests) : [];
  } catch (error) {
    console.error('Error retrieving diagnostic requests:', error);
    return [];
  }
};
