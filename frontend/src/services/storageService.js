import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  // Save feedback to local storage
  async saveFeedback(feedback) {
    try {
      const existingFeedback = await this.getFeedback();
      const newFeedback = {
        id: Date.now(),
        ...feedback,
        timestamp: new Date().toISOString(),
        synced: false
      };
      
      const updatedFeedback = [...existingFeedback, newFeedback];
      await AsyncStorage.setItem('feedback', JSON.stringify(updatedFeedback));
      return newFeedback;
    } catch (error) {
      console.error('Error saving feedback:', error);
      throw error;
    }
  }

  // Get all feedback from local storage
  async getFeedback() {
    try {
      const feedback = await AsyncStorage.getItem('feedback');
      return feedback ? JSON.parse(feedback) : [];
    } catch (error) {
      console.error('Error getting feedback:', error);
      return [];
    }
  }

  // Mark feedback as synced
  async markFeedbackSynced(feedbackId) {
    try {
      const feedback = await this.getFeedback();
      const updatedFeedback = feedback.map(item => 
        item.id === feedbackId ? { ...item, synced: true } : item
      );
      await AsyncStorage.setItem('feedback', JSON.stringify(updatedFeedback));
    } catch (error) {
      console.error('Error marking feedback as synced:', error);
    }
  }

  // Clear all feedback
  async clearFeedback() {
    try {
      await AsyncStorage.removeItem('feedback');
    } catch (error) {
      console.error('Error clearing feedback:', error);
    }
  }
}

export default new StorageService();