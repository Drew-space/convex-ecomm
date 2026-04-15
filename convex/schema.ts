import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(), // in kobo (₦5,000 = 500000)
    imageUrl: v.string(),
    images: v.array(v.string()), // multiple images for the gallery thumbnails
    // like in your screenshot (2 thumbnails on the left)
    category: v.union(v.literal("Men"), v.literal("Women"), v.literal("Teens")),
    stock: v.number(),
  }),
});

// {"name":"Nike Windrunner","description":"The Nike Windrunner is more than just a jacket; it's a symbol of enduring style and performance. With a design that has stood the test of time, this lightweight and versatile outerwear piece is your go-to choice for brisk mornings, breezy afternoons, and everything in between. Its distinctive chevron design on the chest pays homage to its heritage, while the modern materials and construction ensure it's ready for the demands of today.","price":15000,"imageUrl":"/image/male_category.png","images":["/image/male_category.png","/image/male2.png","/image/male3.png"],"category":"Men","stock":20}
// {"name":"Nike Air Force","description":"The Nike Air Force 1 '07 represents a legend in the world of sneakers. With a design that transcends generations, this classic silhouette has remained a symbol of street-style culture for over three decades. Its white leather upper and clean lines are a canvas for self-expression, allowing you to pair it with any outfit, from casual to chic.","price":8500,"imageUrl":"/image/white_shoe1.png","images":["/image/white_shoe1.png","/image/white_shoe2.png","/image/white_shoe2.png"],"category":"Teens","stock":12}
// {"name":"Nike Sportswear Phoenix Fleece","description":"Crafted with a blend of warmth and style, the Phoenix Fleece is a versatile addition to your wardrobe. Its soft and cozy fleece fabric offers a perfect balance of comfort and durability, making it ideal for cool days and relaxed outings. With a modern, sporty design and the iconic Nike Swoosh, this fleece adds a touch of urban flair to your look. Whether you're hitting the gym or hanging out with friends, the Nike Sportswear Phoenix Fleece keeps you both cozy and stylish. Elevate your everyday wear with this classic piece of Nike Sportswear.","price":3500,"imageUrl":"/image/lady_category.png","images":["/image/lady_category.png","/image/lady2.png"],"category":"Women","stock":18}
// {"name":"Nike Air VaporMax 2023 Flyknit","description":"Elevate your sneaker game to new heights with the latest evolution of the iconic Air VaporMax series. The 2023 Flyknit combines cutting-edge technology, exceptional comfort, and bold style. Its innovative Flyknit upper offers a second-skin fit, ensuring a snug yet breathable feel with every step. The renowned VaporMax sole unit delivers unparalleled cushioning and responsiveness, providing a smooth ride that's perfect for both athletic performance and street-style fashion.","price":42000,"imageUrl":"/image/men2_category.png","images":["/image/blackshoe.png","/image/blackshoe2.png"],"category":"Men","stock":200}
