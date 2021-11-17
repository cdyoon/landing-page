const express = require('express');
const { google } = require('googleapis');

const app = express();
const port = 3000;

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const GOOGLE_PRIVATE_KEY="nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDxFyKaoVtcoWIx\nrOk+tuR0Qjltwl2QEwf1mBvyN4pHiuWrWBfz8et2h306pD/vElIl8fPfUsUZyqRm\nZegUsoCZ1lCvGn9FMpEoGGDZ9M9N7TEdxcmPw1L+69xr6TIGGFcdYfQSl7k7UlCI\nJ3WqoSCUNrvOTJE4J3GYLfL6EIkW7d72gl9Z0DgNMX+zUVxCut2JRdi9NP0IUCbM\nSKXNphkCVv+ZyvCjKA5id7/yHBZytuFN0vFabxZlVNgdRsWURozr0+0NlpAtqLf8\nNISTBzoGQbOLIP3KP5A5tKVckqRjNT7pYPSUdej7LdHGrsknMSXxReaX5RTmrZBM\n/IDkexyrAgMBAAECggEAA6vEaTiLjkmfMXFxrCfkKtVqHKU8Ga1ogbe7HGeP5MH7\nkeEJnSHLlSaMyuYYWrjbl/W34gHxIiqA17xPTQ1gwh1OZWddlVcNRcaFQJxZ+CF9\n9EQAN/7gSYubpufKM4FbkwUPgdiRYSyO/fVX220qDiFKBi/W4DuD68f7VKc7mlk/\nHimRJHjLGOvOU/WN9JRaskgmmq60tFanRwBgsz4V6g0j1mzHUB2rUCgy2mSy23Y0\n4DCEuprmdCX1M4OJQ/79BLCvHPc2otWvxEK+UHZdVlaiLvcfslDKcYRpOA+RWrZg\n2Yzc4CetJKWOFVHozzqYbfrXxZuyik51ZO4E4BwUPQKBgQD4tt6iwINxykBJtzrk\nmeIZ9mcnfTJpu4tzoTF0PD5E+ro2BxjM1guWjmWcaPNFNrhsLOWwqzxLTgzCNF2t\nBqAfVOUsDOCi0dExN6pKMPkMvewM3rlNPFvd0BvzzdgR8ESrgnhxB2q1vf5nP9/n\nWzQagbOcIWYbsYI/oTtyXKe81wKBgQD4Jxe+BoZgFBJeZgRgsMwFKVFX1nepvFJ8\nGdzbNjxA3qEZn0MZpMmzhKtKMr5xgRbRsFVZ8ohIWKucI125RD2Tt3yedbyfVT43\n8mgQQgTj6WWnShj3u9AowHJOXHnroH4eLp7UTgZGbBS6eHGfZRBY1wPSVp24U/rU\nQKvkF3kwTQKBgApfLeehmZmsMoQgdP9Ff41PnjuiV/Da1lTrGvHa9UnRHuTT5O/d\n2TvdElW0drijMIuqT6XPbkNBrPyITIPDq/fChZARtWh00YF47cwMQMaMQQTEYPvc\nkYQtgoznP6R33ZU9aqJkCcoscyiBHGg8gG6+i+vt5KExBNp8ccsyG/ifAoGBAMz+\nplthUoJuMlpvFjC1/GRLJJpWXlYGb3F7f/pLDG1ePGFJMootmj5FW6cY0kA7rpkc\nfPWoKDLzpRiAEr2ohOHRUw4oHuDU72gSRSshDp8kQMh4qrWEHkp76DGZrVIcK/NM\n+gJSTlbAlEMSmnJdb6qkPND2oqYSIgRTRGxRg9iFAoGBAMBmyEWek1H9dg6jnlGW\nPG3w6ndP6Xp1jKrzmtUb1AVQj4J5K9GZlXiv7jcplmKUW35jnmARJsUSjDRhuDXN\nlMuAIGzsxsCPRWnML/HSXjblwuix8buIODa+KpCV4S8H5XUeBY2jGNMC/hZDOdgH\nD9nbiR3JEWpUU/PGjKPzIO8z";
const GOOGLE_CLIENT_EMAIL = "christopherdyoon@landing-page-332416.iam.gserviceaccount.com"
const GOOGLE_PROJECT_NUMBER = "859828445854"
const GOOGLE_CALENDAR_ID = "ucsd.edu_0sshe25dtrt3ppdikn6shegchs@group.calendar.google.com"

app.get('/', (req, res) => {
  const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES
  );

  const calendar = google.calendar({
    version: 'v3',
    project: GOOGLE_PROJECT_NUMBER,
    auth: jwtClient
  });

  calendar.events.list({
    calendarId: GOOGLE_CALENDAR_ID,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (error, result) => {
    if (error) {
      res.send(JSON.stringify({ error: error }));
    } else {
      if (result.data.items.length) {
        res.send(JSON.stringify({ events: result.data.items }));
      } else {
        res.send(JSON.stringify({ message: 'No upcoming events found.' }));
      }
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));