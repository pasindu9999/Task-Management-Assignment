Backend Setup (task-manager-api)

Prerequisites:

*   Java Development Kit (JDK) 17 or higher.
*   Apache Maven.

How to Run:

1. Navigate to the `task-manager-api` directory:
  
2. Build and run the application using Maven:
    mvn spring-boot:run
   
Alternatively, you can build the JAR file (`mvn clean install`) and then run it (`java -jar target/task-manager-api-0.0.1-SNAPSHOT.jar`).

API Port:

The backend API will be available at `http://localhost:8080`.

Alternative Option: Using IntelliJ IDEA or Another Java IDE
1. Open the project in IntelliJ IDEA:

2. Choose File > Open and select the task-manager-api directory.

3. Let IntelliJ import the Maven project and resolve dependencies.

4. Open the TaskManagerApiApplication.java file located in:src/main/java/com/yourpackage/TaskManagerApiApplication.java Right-click on the file and choose Run 'TaskManagerApiApplication'.


Frontend Setup (task-manager-ui)

The frontend is an Angular application that provides the user interface for interacting with the Task Manager.

Prerequisites:

Node.js (which includes npm). Yarn can also be used.
Angular CLI (`@angular/cli`) installed globally or locally (via `npx`).

How to Run:

1.  Navigate to the `task-manager-ui` directory:
    
2.  Install project dependencies:
     npm install
   
3.  Serve the application (the development server will typically use port 4200 by default):
    
    ng serve -o
  
UI Port

The frontend application will be accessible at `http://localhost:4200` (or another port if 4200 is in use and you choose a different one).

Database Setup

Database:MongoDB

Instructions:

1.  Install MongoDB:
    Download and install MongoDB Community Server from the official website: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
    Follow the installation instructions specific to your operating system.

2.  Ensure MongoDB is running:
    Start the MongoDB service. By default, it runs on port `27017`.

3.  Database Configuration:
    The backend application is configured to connect to a MongoDB instance at `mongodb://localhost:27017` and will use a database named `taskdb`. If your `application.properties` file (located in `task-manager-api/src/main/resources/`) specifies a different database name or connection string, please adjust accordingly. Typically, Spring Boot Data MongoDB will use `test` as the database name if not specified, or the name provided in the `spring.data.mongodb.uri` or `spring.data.mongodb.database` properties. For this project, it defaults to `taskdb` if not overridden.
