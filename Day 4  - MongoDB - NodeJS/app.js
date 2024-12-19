const { MongoClient } = require("mongodb");

async function connectToDatabase(url = "mongodb://localhost:27017") {
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB.");
        return client.db("ordersDB");
    } 
    catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);  
    }
}

async function insertOrders(collection) {
    const orders = [
        { "order_id": "o1", "order_year": 2020, "payment_status": "Y", "cost_details": { "price": 30, "currency": "NOK" }, "order_items": [{ "product_id": "p1", "colors": ["blue", "black"], "quantity": 15 }], "delivery_time": 5 },
        { "order_id": "o2", "order_year": 2020, "payment_status": "Y", "cost_details": { "price": 13, "currency": "EUR" }, "order_items": [{ "product_id": "p2", "colors": ["white"], "quantity": 4 }, { "product_id": "p3", "colors": ["white", "black"], "quantity": 1 }], "delivery_time": 4 },
        { "order_id": "o3", "order_year": 2018, "payment_status": "N", "cost_details": { "price": 33, "currency": "EUR" }, "order_items": [{ "product_id": "p3", "colors": ["blue", "black"], "quantity": 4 }], "delivery_time": 4 },
        { "order_id": "o4", "order_year": 2017, "payment_status": "Y", "cost_details": { "price": 17, "currency": "NOK" }, "order_items": [{ "product_id": "p2", "colors": ["pink", "black"], "quantity": 14 }, { "product_id": "p4", "colors": ["white"], "quantity": 1 }], "delivery_time": 2 },
        { "order_id": "o5", "order_year": 2020, "payment_status": "Y", "cost_details": { "price": 19, "currency": "NOK" }, "order_items": [{ "product_id": "p1", "quantity": 15 }], "delivery_time": 3 },
        { "order_id": "o6", "order_year": 2020, "payment_status": "Y", "cost_details": { "price": 19, "currency": "NOK" }, "order_items": [{ "product_id": "p1", "quantity": 15 }], "delivery_time": 3}
    ];

    try {
        const result = await collection.insertMany(orders);
        console.log(`${result.insertedCount} orders inserted.`);
    } 
    catch (err) {
        console.error("Error inserting orders:", err);
    }
}

async function queries(collection) {
    try {
        console.log("\nRetreving all orders:");
        const orders = await collection.find().toArray();
        console.log(orders);

        console.log("\nRetrieving documents with a limit of 5, skipping the first 3:");
        const documents = await collection.find().skip(3).limit(5).toArray();
        console.log(documents);

        console.log("\nRetreving paid orders:");
        const paidOrders = await collection.find({ payment_status: "Y" }).toArray();
        console.log(paidOrders);

        console.log("\nRetreving orders from 2019 with payment status 'Y':");
        const paidOrders2019 = await collection.find({ payment_status: "Y", order_year: 2019 }).toArray();
        console.log(paidOrders2019);

        console.log("\nRetreving  unpaid or orders before 2019:");
        const unpaidOrPastOrders= await collection.find({ $or: [{ payment_status: "N" }, { order_year: { $lt: 2019 } }] }).toArray();
        console.log(unpaidOrPastOrders);

        console.log("\nRetreving  orders with 'NOK' currency:");
        const nokOrders = await collection.find({ "cost_details.currency": "NOK" }).toArray();
        console.log(nokOrders);

        console.log("\nRetreving  orders with price 18 NOK:");
        const price18Orders = await collection.find({ "cost_details.price": 18, "cost_details.currency": "NOK" }).toArray();
        console.log(price18Orders);

        console.log("\nUpdating orders with product 'p2' to increment price by 7...");
        const updateResult = await collection.updateMany({ "order_items.product_id": "p2" }, { $inc: { "cost_details.price": 7 } });
        console.log(`${updateResult.modifiedCount} orders updated.`);

        console.log("\nDeleting orders with products having quantity of 4...");
        const deleteResult = await collection.deleteMany({ "order_items.quantity": 4 });
        console.log(`${deleteResult.deletedCount} orders deleted.`);

        console.log("\nRetreving  orders with first color 'blue':");
        const blueOrders = await collection.find({ "order_items.colors.0": "blue" }).toArray();
        console.log(blueOrders);

    } catch (err) {
        console.error("Error performing queries:", err);
    }
}

async function run() {
    const database = await connectToDatabase();
    const orders = database.collection("orders");

    const ordersSize = await orders.countDocuments();
    console.log(ordersSize);
    if (ordersSize === 0) {
        await insertOrders(orders);
    }
    await queries(orders);
}

run();