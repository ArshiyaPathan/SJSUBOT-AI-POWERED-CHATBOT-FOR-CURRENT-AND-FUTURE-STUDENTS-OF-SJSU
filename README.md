# Project-Team-3 SJSUBOT 

## SJSUBOT - AI POWERED CHATBOT FOR CURRENT AND FUTURE STUDENTS OF SJSU


A Customized AI  powered  chatbot  is  designed to help prospective students of SJSU facing difficulties while filling up application forms. Aspiring students will be able to chat with  this  bot  in  natural language  to  get  their  queries  resolved. Currently enrolled students can also use the Bot to help them with Course and academics related queries.  NLP  and  Machine  Learning capabilities  of  api.ai  are utilized  to  create  this  conversational  agent. This ensures that students will not be misguided and will be able to get queries resolved.

### Introduction Video  https://www.youtube.com/watch?v=LVzr7M0cfKg

### Problem Statement 

Universities have a plethora of information and it’s a challenge to get this across to a prospective student on demand basis. For any Undergraduate or Graduate Programs, the applicant knows the process of researching university programs is a time-consuming and complicated process. An enormous amount of research is required to find the information they need to get into the right university. As students have many queries regarding university as well as course requirements, the applicant has to contact various individuals and departments and spend lot of time in browsing the internet to look for information they need. They have to go through lot of pages to find out information for financial aid, courses, programs, credits. Universities have a way to solve this problem using Chatbots. Chatbot understands what the student is saying (natural language understanding) and replies to the student in a logical way (natural language processing). There are some scenarios where chatbot can advise a student on appropriate courses, assist a student in filling up an application form, assist a new student on Campus. 
The purpose of this Project is to create a Chatbot where the students can get instant replies anywhere, anytime.

### Architecture Diagram
![image](https://github.com/SJSU272LabF17/Project-Team-3/blob/master/Architecture%20Diagram.png)

### Current Students 

This Bot serves as file cabinet and communication tool for Current students. Students will get to enjoy the personalized space here like Canvas. Admin registers the student to access this Current Students section. Students can request to know their grades, Upcoming Assignments, Quizzes. Information of a Student will be taken from MLab Database with Intents from api.ai 

### Future Students

Any Questions related to Application Process will be answered by the bot. Unlike Facebook Messenger App or Slack, the students do not require any account to access the Bot. It is available for everyone.

### Technologies used:

- api.ai (DialogFlow)
- REST Framework
- node.js
- express
- MongoDB
- Heroku
- Socket.io
- Handlebars
- Bootstrap

### SJSUBot app is deployed to Heroku. https://sjsubot.herokuapp.com/

#### Steps to run the code:

1. Clone the Github (https://github.com/SJSU272LabF17/Project-Team-3.git)
2. Install all node dependencies & MongodB
3. Start Mongo & node app.js in the terminal
4. Open localhost:3000 in your browser

Screenshot of the Bot

![image](https://github.com/SJSU272LabF17/Project-Team-3/blob/master/Screenshot1.png)

### Solution

In this Project, we have implemented Short-Text Conversations where the goal is to create a single response to a single input. Using the artificially intelligent Chatbot, it will serve aspiring students with the instant answers to all the queries related to application process and also for the current students with the quick reply for checking grades and due assignments. Continuously training the bot with more questions can help to make the bot reply efficiently. By applying advanced Machine-Learning Techniques, like the Generative model, the Chatbot will become smarter and it can plausibly engage the user in certain conversation. This technique has a feedback loop which helps the bot to learn new things when engaging with the user. 

### Contributors

* Saranya Soundar Rajan https://github.com/saranyavsr
* Arshiya Pathan https://github.com/ArshiyaPathan
* Zeeshan Ali
* Vasu Bansal
