# Futebol Clube ⚽️
Futebol Clube is an informative website about football matches and rankings! This was a project made for study purpose and it was my first time using OPP with Sequelize.
### In this project I:
- I developed an API through sequelize and OOP (using the TDD method) and also integrated - with docker-compose - the applications (the backend I developed and the frontend already provided in the project) so that they work using the database.
- an authentication for the login was also developed with the help of JWT.

### The application endpoints
#### Teams:
- GET /teams - to search all teams;
- GET /teams/:id -  to search a specific team;

#### Login:
- POST /login - to make login into the aplication;
```
// example of the body that need to be send:
 {
   "email": "user@user.com",
   "password": "secret_user"
 }
```
- /login/role - to see your role (need to send in the header a valide token);

#### Matches:
- GET /matches - to search all maches;
- GET /matches?inProgress=true - you can also use this inProgress query to filter the matches;
- PATCH /matches/:id/finish - to finish a matche (need to send in the header a valide token);
- PATCH /matches/:id - to update matches in progress (need to send in the header a valide token);
```
// example of the body that need to be send:
 {
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```
- POST /matches - to create a new matche;
```
// example of the body that need to be send:
 {
  "homeTeamId": 16, 
  "awayTeamId": 8, 
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}
```

#### Leaderboard:
- GET /leaderboard/home - return home team performance information;
- GET /leaderboard/away - return away team performance information;
- GET /leaderboard - return overall ranking of teams;
  
### Main technologies:
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

## Contributors: 
I made the backend part of the project and the Dockerfiles, the frontend and the other files were made by Trybe.
