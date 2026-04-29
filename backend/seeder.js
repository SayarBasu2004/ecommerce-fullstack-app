import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/productModel.js";

dotenv.config();
connectDB();

const products = [
  {
    name: "iPhone 14",
    price: 79999,
    image: "https://www.apple.com/newsroom/images/product/iphone/geo/Apple-iPhone-14-iPhone-14-Plus-hero-220907-geo_Full-Bleed-Image.jpg.xlarge_2x.jpg",
    category: "Smartphone",
    description: "Apple flagship smartphone",
  },
  {
    name: "Samsung s26",
    price: 79999,
    image:"https://images.samsung.com/is/image/samsung/p6pim/in/sm-s921bzvbins/gallery/in-galaxy-s24-492654-492654-sm-s921bzvbins-541169493?imbypass=true",
    category: "Smartphone", 
    description: "Samsung flagship smartphone",
  },
  {
    name: "Asus TUF gaming A14",
    price: 215000,
    image:"https://in.store.asus.com/media/catalog/product/f/a/fa401ea-rg020ws_1_.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:",
    category:"Laptop",
    description: "Asus flagship gaming laptop",
  },
  {
    name: "Bose QuiteComfort Headphones",
    price: 25000,
    image:"https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQbUNAVuKIp31P2GjUX5HY-F3Mff25HBSMXrmMjRn4TlSm-DIXCvMwRsPTRzAYhbOtIC7vNca24YSyls3Vp0u3Yl7ONRgB-rroihnwG0wXxhTblwIWlUB0IP_w",
    category:"Headphones",
    description: "Premium soundquality with noise cancelling",
  },
  
  {
    name: "MacBook Air M2",
    price: 119999,
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/macbook-air-size-unselect-202601-gallery-1?wid=5120&hei=3280&fmt=webp&qlt=90&.v=YTFkSnBPS2tMZFdhaFNRRkx6VnJZaUd4WmthcldkemtncUgvMzhXenFEVkJtY3lja2FvNzhqZzhFY0x4NDFzYkE0ZWxMVGt3djRUV0FHWk92REs5YjAxSlgrVWMrMzU1OXo2c2JyNjJZTGpEUE90ekhYc3dvRnFSbFQ0NEVuaVQ&traceId=1",
    category: "Laptop",
    description: "Lightweight powerful laptop",
  },
  {
    name: "Sony WH-1000XM5",
    price: 29999,
    image: "https://www.sony.co.in/image/ce0f6885ec1d1701f08d7b522e4f4ca3?fmt=png-alpha&wid=1578&hei=1050&bgcolor=F6F9FF",
    category: "Headphones",
    description: "Noise cancelling headphones",
  },
  {
    name: "Apple 20W USB-C Power Adapter",
    price: 1400,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSDAex4Zph3Ik2TkROXFL4L1BcIpRh_CLAA8e3V5ud3Ip8L1OCQqyz-YADZsKZ_NthzKeufCSWmFvF2karHNjnsdPh63ZIaTnGAqq7Xh4xpoYT69yd0z6yf",
    category: "Accessories",
    description: "Compatible with any usb-c enabled device",
  },
  {
    name:"Samsung 45W Adapter",
    price: 700,
    image:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSLVFAbXy3g_JGzxOiuP-JJaQUaCvaQzCwsKwK8Fvww3p0V-Gsy-kYvWELMhICfMQXRTtEhA8zcOCd-pWZsqZqz1iwyi-MQmdQmR-TI17SiP0qFXnWZVgHr",
    category: "Acessories",
    description: "Compatible with any usb-c enabled device",
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log(" Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();