# Google Sheets Integration Setup

This guide will help you set up Google Sheets integration for the registration form on your website.

## Prerequisites

- A Google account
- Access to Google Sheets and Google Apps Script

## Step-by-Step Setup

### 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Unibridge Registration Data"
4. The script will automatically create a "Leads" sheet with the proper headers

### 2. Set up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the content from `Code.gs` file in your project
4. Save the project with a meaningful name like "Unibridge Form Handler"

### 3. Configure the Script

In the `Code.gs` file, update the following variables:

```javascript
// Update these with your actual values
const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN'; // Optional
const TELEGRAM_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID';     // Optional
const SPREADSHEET_ID = 'YOUR_GOOGLE_SHEET_ID';        // Required
```

**To get your Google Sheet ID:**
- Open your Google Sheet
- Look at the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
- Copy the SHEET_ID_HERE part

### 4. Deploy the Web App

1. In Google Apps Script, click "Deploy" → "New deployment"
2. Choose type: "Web app"
3. Set the following options:
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
4. Click "Deploy"
5. **Important:** Copy the Web App URL that appears

### 5. Update Your Website Configuration

1. Open `src/config/googleSheets.js`
2. Replace the placeholder URL with your actual Web App URL:

```javascript
export const GOOGLE_SCRIPT_CONFIG = {
  // Replace with your actual deployment URL
  WEB_APP_URL: 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec',
  // ... rest of config
};
```

### 6. Test the Integration

1. Start your development server: `npm run dev`
2. Go to the registration page
3. Fill out and submit the form
4. Check your Google Sheet - you should see a new row with the form data

## Data Structure

The form will create the following columns in your Google Sheet:

| Column | Description | Example |
|--------|-------------|----------|
| Timestamp | When the form was submitted | 2024-01-15 14:30:25 |
| Fullname | User's full name | John Doe |
| Level | Education level (default: Bakalavr) | Bakalavr |
| Phone number | User's phone number | +998901234567 |
| Message | Additional message from user | Qo'shimcha ma'lumot yo'q |

## Optional: Telegram Notifications

If you want to receive Telegram notifications when someone submits the form:

1. Create a Telegram bot using [@BotFather](https://t.me/botfather)
2. Get your bot token
3. Get your chat ID (you can use [@userinfobot](https://t.me/userinfobot))
4. Update the `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in your `Code.gs` file

## Troubleshooting

### Common Issues:

1. **"Permission denied" error:**
   - Make sure you deployed the web app with "Execute as: Me"
   - Ensure "Who has access" is set to "Anyone"

2. **Form submission not working:**
   - Check the browser console for errors
   - Verify the Web App URL is correct in `googleSheets.js`
   - Make sure the Google Apps Script is deployed and not just saved

3. **Data not appearing in Google Sheets:**
   - Check the Google Apps Script execution logs
   - Verify the SPREADSHEET_ID is correct
   - Make sure your Google account has edit access to the sheet

### Testing the Google Apps Script:

You can test your script directly in Google Apps Script:

1. In the script editor, select the `testFunction` function
2. Click the "Run" button
3. Check the execution log for any errors

## Security Notes

- The Web App URL is public but only accepts POST requests with the expected data format
- No sensitive data should be stored in the client-side code
- Consider implementing additional validation in the Google Apps Script if needed

## Support

If you encounter issues:
1. Check the browser console for JavaScript errors
2. Check Google Apps Script execution logs
3. Verify all configuration values are correct
4. Test the Google Apps Script independently using the `testFunction`