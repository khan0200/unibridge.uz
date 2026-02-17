// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = '7095162103:AAH2pItOeiOOOpXI6yeLYWZ76mCuVYyuKOs';
const TELEGRAM_CHAT_ID = '1426320861';

// Function to send Telegram notification
function sendTelegramNotification(data) {
  try {
    const message = `🔔 Yangi xabar keldi!\n\n` +
                   `👤 To'liq ism: ${data.fullname || 'Kiritilmagan'}\n` +
                   `📞 Telefon: ${data.phone || 'Kiritilmagan'}\n` +
                   `🎓 Ta'lim darajasi: ${data.level || 'Kiritilmagan'}\n` +
                   `💬 Xabar: ${data.message || 'Xabar yo\'q'}\n\n` +
                   `⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}`;
    
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const payload = {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    };
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify(payload)
    };
    
    const response = UrlFetchApp.fetch(telegramUrl, options);
    console.log('Telegram notification sent:', response.getContentText());
    
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
  }
}

function doPost(e) {
  try {
    // Log the incoming request for debugging
    console.log('Received POST request:', e);
    
    // Check if data exists (either postData for JSON or parameter for FormData)
    if (!e.postData && !e.parameter) {
      throw new Error('No data received in POST request');
    }
    
    // Get the active spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get or create the "Leads" sheet
    let sheet = ss.getSheetByName('Leads');
    if (!sheet) {
      sheet = ss.insertSheet('Leads');
      // Add headers if sheet is new
      sheet.getRange(1, 1, 1, 5).setValues([['Timestamp', 'Fullname', 'Level', 'Phone number', 'Message']]);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    }
    
    // Parse the form data (handle both JSON and FormData)
    let data;
    if (e.postData && e.postData.contents && e.postData.type === 'application/json') {
      data = JSON.parse(e.postData.contents);
    } else {
      // Handle FormData
      data = e.parameter || {};
    }
    console.log('Parsed data:', data);
    
    // Create timestamp
    const timestamp = new Date();
    
    // Prepare the row data
    const rowData = [
      timestamp,
      data.fullname || '',
      data.level || '',
      data.phone || '',
      data.message || ''
    ];
    
    console.log('Row data to insert:', rowData);
    
    // Insert new row at the top (row 2, after headers)
    sheet.insertRowAfter(1);
    sheet.getRange(2, 1, 1, 5).setValues([rowData]);
    
    // Format the timestamp column
    sheet.getRange(2, 1).setNumberFormat('dd/mm/yyyy hh:mm:ss');
    
    console.log('Data successfully saved to sheet');
    
    // Send Telegram notification
    sendTelegramNotification(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Data saved successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doPost:', error);
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({success: false, message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (required by Google Apps Script)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({message: 'Contact form API is working'}))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function to verify the script works
function testFunction() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        fullname: 'Test User',
        level: 'Bakalavr',
        phone: '+998901234567',
        message: 'Test message'
      })
    }
  };
  
  const result = doPost(testData);
  console.log(result.getContent());
}