/**
 * @param {boolean} status
 * @param {string} message
 * @param {array} data
 * @returns {object}
 */
export const response = (status, message, data) => {
  return {
    status,
    message,
    data,
  }
}
