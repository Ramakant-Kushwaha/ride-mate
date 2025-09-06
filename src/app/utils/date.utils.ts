/**
 * Date Utility Class
 * Helper functions for date and time operations
 */
export class DateUtils {
  /**
   * Get current date in YYYY-MM-DD format
   */
  public static getCurrentDate(): string {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }

  public static getMinTime(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  /**
   * Format date for display
   */
  //   static formatDate(date: any) {
  //     const options = {
  //       weekday: 'long',
  //       year: 'numeric',
  //       month: 'long',
  //       day: 'numeric',
  //     };
  //     return new Date(date).toLocaleDateString('en-US', options);
  //   }

  /**
   * Format time for display (12-hour format)
   */
  //   static formatTime(time) {
  //     const [hours, minutes] = time.split(':');
  //     const hour12 = hours % 12 || 12;
  //     const ampm = hours < 12 ? 'AM' : 'PM';
  //     return `${hour12}:${minutes} ${ampm}`;
  //   }

  /**
   * Convert time string to minutes for comparison
   */
  //   static timeToMinutes(timeString) {
  //     const [hours, minutes] = timeString.split(':').map(Number);
  //     return hours * 60 + minutes;
  //   }

  /**
   * Check if a date is today
   */
  static isToday(date: Date) {
    const today = new Date();
    const checkDate = new Date(date);

    return (
      today.getDate() === checkDate.getDate() &&
      today.getMonth() === checkDate.getMonth() &&
      today.getFullYear() === checkDate.getFullYear()
    );
  }

  /**
   * Get time difference in minutes
   */
  //   static getTimeDifferenceInMinutes(time1, time2) {
  //     const minutes1 = this.timeToMinutes(time1);
  //     const minutes2 = this.timeToMinutes(time2);
  //     return Math.abs(minutes1 - minutes2);
  //   }
}
