import dhakaImg from "../assets/areas/Dhaka.webp";
import chittagongImg from "../assets/areas/Chittagong.webp";
import barisalImg from "../assets/areas/Barisal.webp";
import bargunaImg from "../assets/areas/Barguna.webp";
import jessoreImg from "../assets/areas/Jessore.webp";
import bandarbanImg from "../assets/areas/Bandarban.webp";
import cumillaImg from "../assets/areas/cumilla.webp";
import khulnaImg from "../assets/areas/Khulna.webp";

export const restaurantsData = [
    {
        "id": 1,
        "name": "Pasta Palace",
        "cuisine": "Italian",
        "rating": 4.5,
        "image": dhakaImg,
        "foods": [
            { "id": 1, "name": "Spaghetti Carbonara", "price": 12.99, "image": "https://via.placeholder.com/150" },
            { "id": 2, "name": "Lasagna", "price": 14.99, "image": "https://via.placeholder.com/150" },
            { "id": 3, "name": "Margherita Pizza", "price": 10.99, "image": "https://via.placeholder.com/150" }
        ]
    },
    {
        "id": 2,
        "name": "Wok This Way",
        "cuisine": "Chinese",
        "rating": 4.7,
        "image": chittagongImg,
        "foods": [
            { "id": 4, "name": "Kung Pao Chicken", "price": 11.99, "image": "https://via.placeholder.com/150" },
            { "id": 5, "name": "Fried Rice", "price": 9.99, "image": "https://via.placeholder.com/150" },
            { "id": 6, "name": "Dumplings", "price": 7.99, "image": "https://via.placeholder.com/150" }
        ]
    },
    {
        "id": 3,
        "name": "Curry House",
        "cuisine": "Indian",
        "rating": 4.3,
        "image": barisalImg,
        "foods": [
            { "id": 7, "name": "Butter Chicken", "price": 13.99, "image": "https://via.placeholder.com/150" },
            { "id": 8, "name": "Biryani", "price": 12.99, "image": "https://via.placeholder.com/150" },
            { "id": 9, "name": "Paneer Tikka", "price": 10.99, "image": "https://via.placeholder.com/150" }
        ]
    },
    {
        "id": 4,
        "name": "Seafood Delight",
        "cuisine": "Seafood",
        "rating": 4.6,
        "image": bargunaImg,
        "foods": [
            { "id": 10, "name": "Grilled Salmon", "price": 18.99, "image": "https://via.placeholder.com/150" },
            { "id": 11, "name": "Shrimp Pasta", "price": 16.99, "image": "https://via.placeholder.com/150" },
            { "id": 12, "name": "Fish Tacos", "price": 12.99, "image": "https://via.placeholder.com/150" }
        ]
    },
    {
        "id": 5,
        "name": "BBQ Nation",
        "cuisine": "Barbecue",
        "rating": 4.8,
        "image": jessoreImg,
        "foods": [
            { "id": 13, "name": "Smoked Ribs", "price": 19.99, "image": "https://via.placeholder.com/150" },
            { "id": 14, "name": "Pulled Pork Sandwich", "price": 11.99, "image": "https://via.placeholder.com/150" },
            { "id": 15, "name": "Grilled Chicken", "price": 14.99, "image": "https://via.placeholder.com/150" }
        ]
    },
    {
        "id": 6,
        "name": "Sushi World",
        "cuisine": "Japanese",
        "rating": 4.4,
        "image": bandarbanImg,
        "foods": [
            { "id": 16, "name": "California Roll", "price": 8.99, "image": "https://via.placeholder.com/150" },
            { "id": 17, "name": "Spicy Tuna Roll", "price": 9.99, "image": "https://via.placeholder.com/150" },
            { "id": 18, "name": "Miso Soup", "price": 4.99, "image": "https://via.placeholder.com/150" }
        ]
    },
    {
        "id": 7,
        "name": "Burger Haven",
        "cuisine": "American",
        "rating": 4.2,
        "image": cumillaImg,
        "foods": [
            { "id": 19, "name": "Cheeseburger", "price": 10.99, "image": "https://via.placeholder.com/150" },
            { "id": 20, "name": "Bacon Burger", "price": 12.99, "image": "https://via.placeholder.com/150" },
            { "id": 21, "name": "Veggie Burger", "price": 9.99, "image": "https://via.placeholder.com/150" }
        ]
    },
    {
        "id": 8,
        "name": "Taco Fiesta",
        "cuisine": "Mexican",
        "rating": 4.5,
        "image": khulnaImg,
        "foods": [
            { "id": 22, "name": "Chicken Tacos", "price": 8.99, "image": "https://via.placeholder.com/150" },
            { "id": 23, "name": "Beef Burrito", "price": 10.99, "image": "https://via.placeholder.com/150" },
            { "id": 24, "name": "Nachos", "price": 7.99, "image": "https://via.placeholder.com/150" }
        ]
    },
    {
        "id": 9,
        "name": "Vegan Vibes",
        "cuisine": "Vegan",
        "rating": 4.3,
        "image": dhakaImg,
        "foods": [
            { "id": 25, "name": "Quinoa Salad", "price": 9.99, "image": "https://via.placeholder.com/150" },
            { "id": 26, "name": "Veggie Wrap", "price": 8.99, "image": "https://via.placeholder.com/150" },
            { "id": 27, "name": "Smoothie Bowl", "price": 7.99, "image": "https://via.placeholder.com/150" }
        ]
    },
    {
        "id": 10,
        "name": "Spice Route",
        "cuisine": "Thai",
        "rating": 4.4,
        "image": chittagongImg,
        "foods": [
            { "id": 28, "name": "Pad Thai", "price": 10.99, "image": "https://via.placeholder.com/150" },
            { "id": 29, "name": "Green Curry", "price": 12.99, "image": "https://via.placeholder.com/150" },
            { "id": 30, "name": "Spring Rolls", "price": 6.99, "image": "https://via.placeholder.com/150" }
        ]
    }
];
