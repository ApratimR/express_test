async function generateSessionToken(length = 32) {
    try {
      const buffer = await randomBytes(length);
      return buffer.toString('hex');
    } catch (error) {
      console.error('Error generating session token:', error);
      throw error;
    }
}

module.exports = {generateSessionToken}