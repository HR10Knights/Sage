This file shows this project's routes.

The below information is structured thus:

```
Prefix
Verb    URI Pattern    controller#action
Verb    URI Pattern    controller#action
etc.
```

```
Index
GET  /       indexController#getIndex
POST /signup indexController#createUser
POST /login  indexController#loginUser

Projects
GET  /api/projects/       projectController#allProjects
POST /api/projects/create projectController#newProject

Tasks
GET     /api/tasks/          taskController#allTasks
POST    /api/tasks/          taskController#createTask
GET     /api/tasks/:id       taskController#idToTask
PUT     /api/tasks/:id       taskController#updateTask
DELETE  /api/tasks/:id       taskController#deleteTask
POST    /api/tasks/assign    taskController#assignTask

Teams
GET  /api/teams/          teamController#allTeams
GET  /api/teams/exists    teamController#exists
POST /api/teams/create    teamController#createTeam

Users
GET  /api/users/          userController#allUsers
POST /api/users/destroy   userController#destroyUser
```
