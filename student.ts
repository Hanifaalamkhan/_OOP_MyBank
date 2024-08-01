// app.ts

import inquirer from 'inquirer';

// Define the Student class
class Student {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

// Define the Person class
class Person {
    students: Student[] = [];

    addStudent(student: Student) {
        this.students.push(student);
    }
}

// Initialize the Person instance
const personManager = new Person();

// Function to start the program
const startProgram = async () => {
    while (true) {
        console.log("Welcome to MyBank Console App!");

        const { select } = await inquirer.prompt({
            name: "select",
            type: "list",
            message: "Who would you like to interact with?",
            choices: ["staff", "student", "exit"]
        });

        if (select === "staff") {
            console.log("You approach the staff room. Feel free to ask any question.");

        } else if (select === "student") {
            const { studentName } = await inquirer.prompt({
                name: "studentName",
                type: "input",
                message: "Enter the student's name you wish to engage with:"
            });

            const existingStudent = personManager.students.find(s => s.name === studentName);

            if (!existingStudent) {
                const newStudent = new Student(studentName);
                personManager.addStudent(newStudent);
                console.log(`Hello, I'm ${newStudent.name}. Nice to meet you!`);
                console.log("New student added.");
            } else {
                console.log(`Hello, I'm ${existingStudent.name}. Nice to meet you!`);
            }

            console.log("Current student list:");
            console.log(personManager.students);

        } else if (select === "exit") {
            console.log("Exiting the program...");
            process.exit();
        }
    }
};

// Start the application
startProgram();
