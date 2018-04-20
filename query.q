CREATE DATABASE internal_project;

USE internal_project;

CREATE TABLE users (
	id INT NOT NULL IDENTITY(1,1),
	userName NVARCHAR(50) NOT NULL,
	userEmail NVARCHAR(50) NOT NULL,
	userPassword NVARCHAR(50) NOT NULL,
	userRole INT NOT NULL,
	fullName NVARCHAR(50) NOT NULL,
	updatedAt DATETIME2 NULL,
	createdAt DATETIME2 NOT NULL,
	deleted BIT NULL
);


--

CREATE TABLE projects (
	id INT NOT NULL IDENTITY(1,1),
	projectName NVARCHAR(50) NOT NULL,
	projectStatus INT NOT NULL,
	updatedAt DATETIME2 NULL,
	createdAt DATETIME2 NOT NULL,
	deleted BIT NULL
);


--

CREATE TABLE project_status (
	id INT NOT NULL IDENTITY(1,1),
	description NVARCHAR(50) NOT NULL,
	updatedAt DATETIME2 NULL,
	createdAt DATETIME2 NOT NULL,
	deleted BIT NULL
);

CREATE TABLE user_roles (
	id INT NOT NULL IDENTITY(1,1),
	description NVARCHAR(50) NOT NULL,
	updatedAt DATETIME2 NULL,
	createdAt DATETIME2 NOT NULL,
	deleted BIT NULL
);

--

CREATE TABLE appointments (
	id INT NOT NULL IDENTITY(1,1),
	patient INT NOT NULL,
	startDate DATE,
	endDate DATE,
	appointmentTime TIME,
	updatedAt DATETIME2 NULL,
	createdAt DATETIME2 NOT NULL,
	deleted BIT NULL
);

CREATE TABLE patients (
	id INT NOT NULL IDENTITY(1,1),
	fullName NVARCHAR(50) NOT NULL,
	address NVARCHAR(50) NOT NULL,
	telephone NVARCHAR(50) NOT NULL,
	healthInsurance  INT NOT NULL,
	patientFile NVARCHAR(50) NOT NULL,
	updatedAt DATETIME2 NULL,
	createdAt DATETIME2 NOT NULL,
	deleted BIT NULL
);

CREATE TABLE health_insurances (
	id INT NOT NULL IDENTITY(1,1),
	fullName NVARCHAR(50) NOT NULL,
	address NVARCHAR(50) NOT NULL,
	telephone NVARCHAR(50) NOT NULL,
	updatedAt DATETIME2 NULL,
	createdAt DATETIME2 NOT NULL,
	deleted BIT NULL
);

--

ALTER TABLE projects ADD
CONSTRAINT def_val_deleted_projects DEFAULT 0 FOR deleted

ALTER TABLE projects ADD
CONSTRAINT	pk_projects PRIMARY KEY(id)

ALTER TABLE projects ADD
CONSTRAINT fk_projects_projectStatus
FOREIGN KEY (projectStatus) REFERENCES project_status(id)

--

ALTER TABLE user_roles ADD
CONSTRAINT def_val_deletd_roles DEFAULT 0 FOR deleted

ALTER TABLE user_roles ADD
CONSTRAINT pk_user_roles PRIMARY KEY(id)

--

ALTER TABLE users ADD
CONSTRAINT def_val_deletd_users DEFAULT 0 FOR deleted

ALTER TABLE users ADD
CONSTRAINT pk_users PRIMARY KEY(id)

ALTER TABLE users ADD
CONSTRAINT fk_users_userRoles
FOREIGN KEY (userRole) REFERENCES user_roles(id)

--

ALTER TABLE project_status ADD
CONSTRAINT def_val_deletd_projects_status DEFAULT 0 FOR deleted

ALTER TABLE project_status ADD
CONSTRAINT pk_projects_status PRIMARY KEY (id)

--

ALTER TABLE patients ADD
CONSTRAINT def_val_deleted_patients DEFAULT 0 FOR deleted

ALTER TABLE patients ADD
CONSTRAINT pk_patients PRIMARY KEY (id)

--

ALTER TABLE appointments ADD
CONSTRAINT def_val_deleted_appointments DEFAULT 0 FOR deleted

ALTER TABLE appointments ADD
CONSTRAINT pk_appointments PRIMARY KEY (id)

ALTER TABLE appointments ADD
CONSTRAINT fk_appointments_patients FOREIGN KEY (id) REFERENCES patients(id)

--

ALTER TABLE health_insurances ADD
CONSTRAINT def_val_deleted_health_insurances DEFAULT 0 FOR deleted

ALTER TABLE health_insurances ADD
CONSTRAINT pk_health_insurances PRIMARY KEY (id)

ALTER TABLE patients ADD
CONSTRAINT fk_health_insurances_patients FOREIGN KEY (healthInsurance) REFERENCES health_insurances(id)

-- INSERT

INSERT INTO internal_project.dbo.user_roles
(description, createdAt, deleted)
VALUES('Doctor', '20171102', ((0)));

INSERT INTO internal_project.dbo.user_roles
(description, createdAt, deleted)
VALUES('Secretaria', '20171102', ((0)));

--

INSERT INTO internal_project.dbo.users
(userName, userEmail, userPassword, fullName, userRole, createdAt, deleted)
VALUES('pepe', 'pepe@hotmail.com', '123', 'Pepe Gonzales', 1, '20171102', ((0)));

--

INSERT INTO internal_project.dbo.patients
(fullName, address, telephone, healthInsurance, patientFile, createdAt, deleted)
VALUES('juarez benitez', 'asdade r', '3242423', 1, '234222', '2017-11-10', ((0)));
