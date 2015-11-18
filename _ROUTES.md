This file shows this project's routes.

The below information is structured thus:

```
Prefix
Verb    URI Pattern    controller.action
Verb    URI Pattern    controller.action
etc.
```

```
Index
GET  /
POST /signup
POST /login

Projects
GET  /api/projects/       projectsController.allProjects
GET  /api/projects/:id    projectsController.idToProject // TODO
POST /api/projects/create projectsController.newProject

Tasks
GET  /api/tasks/          tasksController.allTasks
GET  /api/tasks/:id       tasksController.idToTask
PUT  /api/tasks/:id       tasksController.updateTask
POST /api/tasks/          tasksController.newTask

Teams
GET  /api/teams/          teamsController.allTeams
GET  /api/teams/:id       teamsController.idToTeam
GET  /api/teams/exists    teamsController.doesTeamExist
POST /api/teams/create    teamsController.newTeam

Users
POST /api/users/destroy   usersController.destroyUser
```
