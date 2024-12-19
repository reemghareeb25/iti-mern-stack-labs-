const readline = require('readline');
const fs = require('fs');

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log("--- Choose an option: ---");

    console.log("1) Show products");
    console.log("2) Add a new product");
    console.log("3) Update a product");
    console.log("4) Delete a product");
    console.log("5) Exit");

    input.question("Enter your choice: ", Choise);
}

function Choise(data) {
    const choice = data.trim();
    switch (choice) {
        case "1":
            ShowAllProducts();
            break;
        case "2":
            addNewObject();
            break;
        case "3":
            updateProduct();
            break;
        case "4":
            deleteProduct();
            break;
        case "5":
            exit();
            break;
        default:
            console.log("Invalid choice, please select a valid option.");
            showMenu();
            break;
    }
}

function ShowAllProducts() {
    fs.readFile('./products.json', (err, data) => {
        if (err) {
            console.log(err);
            showMenu();
            return;
        }

        let productsDB = JSON.parse(data);
        productsDB.forEach((val, index) => {
            console.log(`${index + 1}. Name: ${val.name}, Color: ${val.color}, Price: ${val.price}.`);
        });

        showMenu();
    });
}

function addNewObject() {
    fs.readFile("./products.json", (err, data) => {
        if (err) {
            console.log(err);
            showMenu();
            return;
        }

        let productsDB = JSON.parse(data);
        input.question("Enter product name: ", (name) => {
            input.question("Enter product color: ", (color) => {
                input.question("Enter product price: ", (price) => {
                    if (isNaN(Number(price))) {
                        console.log("Enter a valid number for the price!");
                        showMenu();
                        return;
                    }

                    let newProduct = {
                        id: productsDB.length + 1,
                        name: name,
                        color: color,
                        price: Number(price),
                    };

                    productsDB.push(newProduct);
                    fs.writeFile('./products.json', JSON.stringify(productsDB), (err) => {
                        if (err) {
                            console.log(err);
                        }
                        showMenu();
                    });
                });
            });
        });
    });
}

function updateProduct() {
    input.question("Enter the index of the product you need to update: ", (index) => {
        fs.readFile("./products.json", (err, data) => {
            if (err) {
                console.log("Error reading file:", err);
                showMenu();
                return;
            }

            let productsDB = JSON.parse(data);
            index = parseInt(index);
            if (index > 0 && index <= productsDB.length) {
                input.question("Enter the number of the attribute to update (1) Name, (2) Color, (3) Price: ", (attribute) => {
                    if (attribute == 1 || attribute == 2 || attribute == 3) {
                        input.question("Enter the new value: ", (newData) => {
                            if (attribute == 1) {
                                productsDB[index - 1].name = newData;
                            } else if (attribute == 2) {
                                productsDB[index - 1].color = newData;
                            } else if (attribute == 3) {
                                if (isNaN(Number(newData))) {
                                    console.log("Enter a valid number for the price!");
                                    showMenu();
                                    return;
                                } else {
                                    productsDB[index - 1].price = Number(newData);
                                }
                            }

                            fs.writeFile('./products.json', JSON.stringify(productsDB), (err) => {
                                if (err) {
                                    console.log(err);
                                }
                                showMenu();
                            });
                        });
                    } else {
                        console.log("Invalid attribute choice, please select a valid option.");
                        showMenu();
                    }
                });
            } else {
                console.log("Enter a valid index!");
                showMenu();
            }
        });
    });
}

function deleteProduct() {
    input.question("Enter the index of the product you want to delete: ", (index) => {
        fs.readFile("./products.json", (err, data) => {
            if (err) {
                console.log(err);
                showMenu();
                return;
            }

            let productsDB = JSON.parse(data);
            index = parseInt(index);
            if (index > 0 && index <= productsDB.length) {
                productsDB.splice(index - 1, 1);

                fs.writeFile('./products.json', JSON.stringify(productsDB), (err) => {
                    if (err) {
                        console.log(err);
                    }
                    showMenu();
                });

            } else {
                console.log("Enter a valid index!");
                showMenu();
            }
        });
    });
}

function exit() {
    console.log("Bye!");
    input.close();
    return;  
}

showMenu();
