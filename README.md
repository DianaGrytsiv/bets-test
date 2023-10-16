### Review App (Netlify)
https://delicate-kataifi-5ce939.netlify.app/

### Summary

**Hi, Smarkets team!**

I decided to build a sports match app that displays upcoming matches for different sports, including "CS GO," "Cricket," "Baseball," and "Boxing." I made several choices and faced some challenges throughout the project

### Challenges & technical decisions
1. **Sport Selection Tabs**: I chose to use sport selection tabs to provide a clear and organized way for users to choose their preferred sport
2. **API Endpoints**: I used four API endpoints - "GET events," "GET markets," "GET contracts," and "GET last_executed_price" - to fetch data about the matches. I encountered a challenge where the "last_executed_price" often returned as 0. This may be due to test data, and I assumed it was a temporary issue.
3. **CSS Styling**: I opted not to use a CSS component library for this small React app. Instead, I used StyledComponents to style React components. This choice allows for easy customization and maintains a lightweight codebase, which is suitable for a small project like this.
4. **CORS Proxy Service**: I noticed that the CORS proxy service, https://cors-anywhere.herokuapp.com, had some limitations. To overcome this challenge, I switched to https://corsproxy.io/, a different free service to handle cross-origin requests. This decision ensured seamless data fetching from external APIs.

### Improvements
If I had additional time on the frontend task, I would consider the following improvements:
1. **Dynamic Match Volumes**: Instead of hardcoding match volumes, I would add another backend call to fetch the real-time match volumes. This would provide users with up-to-date information.
2. **Loading State Indicator**: I would implement a loading state indicator, such as a spinner, to give users feedback when waiting for backend data to load. This improves user experience by preventing confusion during data retrieval.
3. **Date Formatting Library**: To make the app more user-friendly, I would use a date formatting library to display match dates in a more human-readable format. This ensures that users can quickly and easily understand when the matches are scheduled without having to interpret raw date data from the backend.
