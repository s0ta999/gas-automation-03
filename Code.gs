function cleanupOldYoutubeMails() {

  // 🔍 検索条件（件名は必要に応じて調整）
  const query = 'subject:(YouTube新着動画通知)';
  const threads = GmailApp.search(query);

  const now = new Date();
  const ONE_DAY = 1 * 24 * 60 * 60 * 1000;

  let deletedCount = 0;

  threads.forEach(thread => {
    const messages = thread.getMessages();

    messages.forEach(message => {

      // ★スター付きは保護
      if (message.isStarred()) return;

      const messageDate = message.getDate();
      const diff = now - messageDate;

      // ⏰ 1日以上前
      if (diff >= ONE_DAY) {
        message.moveToTrash();
        deletedCount++;
      }
    });
  });

  Logger.log(`削除完了: ${deletedCount} 件`);
}
