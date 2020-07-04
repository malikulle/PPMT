
# Getting started

- Clone this repo
- `npm install` to install all required dependencies in ppmtool_fronten
- `npm run start` to start frontend
- `Inside ppmtool_backend` set your MySql URL 
- Start Backend In Port `8080`

# Code Overview

## Backend
- `controllers` Project Api
- `domain` Project Entities
- `exception` Project Exception Handler
- `payload` For Login and Register Model
- `repositories` Project Repositories by helping `CrudRepository Interface`
- `security` Spring Security SetUp
- `services` Service Layer to connect reporsitories and controllers
- `validator` Project Validator.

## Frontend

- `components` project pages
- `actions` redux actions
- `reducers` redux reducers for global states.
- `securityUtils`  For Route Secure.
- `App.js` router handling.

## Project Pictures

### Main Dashboard
<a href="https://resimyukle.xyz/i/MyySb7"><img src="https://i.resimyukle.xyz/MyySb7.png" /></a>

### Register Page
<a href="https://resimyukle.xyz/i/RbCWQe"><img src="https://i.resimyukle.xyz/RbCWQe.png" /></a>

### Login Page
<a href="https://resimyukle.xyz/i/2BW64O"><img src="https://i.resimyukle.xyz/2BW64O.png" /></a>

### Your Personel Project Board
<a href="https://resimyukle.xyz/i/1OP3Vz"><img src="https://i.resimyukle.xyz/1OP3Vz.png" /></a>

### Project Tasks Board
<a href="https://resimyukle.xyz/i/O8a5IU"><img src="https://i.resimyukle.xyz/O8a5IU.png" /></a>

### Adding or updatig project task page
<a href="https://resimyukle.xyz/i/CLeNCC"><img src="https://i.resimyukle.xyz/CLeNCC.png" /></a>

## Models
#### User
- username
  * type : String
  * @Email(message = "Username needs to be an email")
  * @NotBlank(message = "username is required")
  * @Column(unique = true)
- fullName
  * type : String
  * @NotBlank(message = "Please enter your full name")
- password
  * type : String
  * @NotBlank(message = "Password required")
- confirmPassword
  * type : String
- createdAt
  * type : Date
- updatedAt
  * type : Date
- projects 
  * @OneToMany(cascade = CascadeType.REFRESH , fetch = FetchType.EAGER , mappedBy = "user" , orphanRemoval = true)
  * type : List

#### Project

- projectName
  * @NotBlank(message = "Project name is required")
  * @NotNull(message = "Project name is required")
  * type : String
- projectIdentifier 
  * @NotBlank(message = "Project Identifier is required")
  * @NotNull(message = "Project Identifier is required")
  * @Size(min = 4,max = 5,message = "Please use 4 to 5 characters")
  * @Column(updatable = false,unique = true)
  * type : String
- description
  * @NotBlank(message = "Project description required")
  * @NotNull(message = "Project description required")
  * type : String
  - startDate
  * type : Date
- endDate
  * type : Date
- createdAt
  * type : Date
- updatedAt
  * type : Date
- backlog
  * @OneToOne(fetch = FetchType.EAGER , cascade = CascadeType.ALL,mappedBy = "project")
- user
  * @ManyToOne(fetch = FetchType.LAZY)
- projectName
  * type : String

#### Backlog
- PtSequence
  * type : Integer
- project
  * @OneToOne(fetch = FetchType.EAGER)
  * @JoinColumn(name = "project_id",nullable = false)
  * type : project
- projectTasks
  * List

#### ProjectTask

- projectSequence
  * @Column(updatable = false,unique = true)
  * type : String
- summary
  * @NotBlank(message = "Please include a project summary")
  * @NotNull(message = "Please include a project summary")
  * type : String
- acceptanceCriteria
  * type : String
- status
  * type : String
- priority
  * type : String
- dueDate
  * type : Date
- projectIdentifier
  * @Column(updatable = false)
  * type : String
- backlog
  * type : Backlog
- createdAt
  * type : Date
- updatedAt
  * type : Date
