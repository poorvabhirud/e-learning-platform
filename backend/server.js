import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";  
import courseRoutes from "./src/routes/courseRoutes.js"; 
import Enrollment from "./src/models/Enrollment.js"; 
import Course from "./src/models/Course.js";


dotenv.config();
const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json()); 
app.use("/api/auth", authRoutes);

const allCourses = [
  // 1. Node.js
  { title: "Node.js Backend Masterclass", slug: "node-backend", description: "Complete nodejs course", price: 49, category: "nodejs", difficulty: "intermediate", thumbnail: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", lessons: [
  { title: "1. Express Setup", contentHtml: "<p>Routes, middleware, error handling.</p>", order: 1 },
  { title: "2. MongoDB Mongoose", contentHtml: "<p>Schemas, queries, aggregation.</p>", order: 2 },
  { title: "3. Authentication", contentHtml: "<p>JWT, bcrypt, protected routes.</p>", order: 3 }
]},
  // 2. JavaScript
  { title: "JS Fundamentals", slug: "js-basics", description: "intermediate js course", price: 49, category: "javascript", difficulty: "intermediate", thumbnail: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", lessons: [
  { title: "1. Closures & Scope", contentHtml: "<p>Closure patterns, module pattern, IIFE.</p>", order: 1 },
  { title: "2. Async Patterns", contentHtml: "<p>Promises, async/await, error handling.</p>", order: 2 },
  { title: "3. Prototypes", contentHtml: "<p>Prototype chain, ES6 classes, inheritance.</p>", order: 3 }
] },
  // 3. React
  { title: "React Masterclass", slug: "react-masterclass", description: "Complete React course", price: 49, category: "react", difficulty: "intermediate", thumbnail: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", lessons: [
  { title: "1. React Introduction", contentHtml: "<p>Welcome to React! Learn JSX, components, and props.</p>", order: 1 },
  { title: "2. React Components", contentHtml: "<p>Functional vs Class components. Props drilling explained.</p>", order: 2 },
  { title: "3. Hooks", contentHtml: "<h3>useState & useEffect</h3><p>State management and side effects.</p>", order: 3 }
] },
  // 4. Advanced React
  { title: "Advanced React Patterns", slug: "adv-react", description: "Master Hooks and Performance", price: 69, category: "react", difficulty: "advanced", thumbnail: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg", lessons: [
  { title: "1. Context API", contentHtml: "<p>Global state without Redux, useContext.</p>", order: 1 },
  { title: "2. Custom Hooks", contentHtml: "<p>useFetch, useLocalStorage, useDebounce.</p>", order: 2 },
  { title: "3. Performance", contentHtml: "<p>React.memo, useCallback, useMemo.</p>", order: 3 }
]
 },
  // 5. Python
  { title: "Python for Data Science", slug: "python-ds", description: "Pandas and NumPy", price: 59, category: "python", difficulty: "intermediate", thumbnail: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", lessons: [
  { title: "1. NumPy Pandas", contentHtml: "<p>Arrays, dataframes, data cleaning.</p>", order: 1 },
  { title: "2. Visualization", contentHtml: "<p>Matplotlib, Seaborn, Plotly charts.</p>", order: 2 },
  { title: "3. ML Pipelines", contentHtml: "<p>Scikit-learn preprocessing, modeling.</p>", order: 3 }
] },
  // 6. TypeScript
  { title: "TypeScript Essentials", slug: "ts-basics", description: "Static typing for JS", price: 39, category: "typescript", difficulty: "beginner", thumbnail: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", lessons: [
  { title: "1. Types & Interfaces", contentHtml: "<p>Type aliases, interfaces, union types.</p>", order: 1 },
  { title: "2. Generics", contentHtml: "<p>Generic functions, constraints, utility types.</p>", order: 2 },
  { title: "3. React + TS", contentHtml: "<p>Props typing, hooks typing, HOCs.</p>", order: 3 }
]
 },
  // 7. AWS
  { title: "AWS Cloud Practitioner", slug: "aws-cloud", description: "Cloud fundamentals", price: 99, category: "cloud", difficulty: "beginner", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", lessons: [
  { title: "1. EC2 S3", contentHtml: "<p>Virtual machines, object storage.</p>", order: 1 },
  { title: "2. Lambda RDS", contentHtml: "<p>Serverless, managed databases.</p>", order: 2 },
  { title: "3. CI/CD", contentHtml: "<p>CodePipeline, CloudFormation.</p>", order: 3 }
] },
  // 8. Docker
  { title: "DevOps with Docker", slug: "devops-mastery", description: "Containers and K8s", price: 89, category: "devops", difficulty: "advanced", thumbnail: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", lessons: [
  { title: "1. Docker Basics", contentHtml: "<p>Dockerfile, containers, images.</p>", order: 1 },
  { title: "2. Docker Compose", contentHtml: "<p>Multi-container apps, networks.</p>", order: 2 },
  { title: "3. Kubernetes", contentHtml: "<p>Pods, deployments, services.</p>", order: 3 }
] },
  // 9. Next.js
  { title: "Full Stack Next.js 14", slug: "nextjs-fullstack", description: "Server Actions", price: 79, category: "react", difficulty: "advanced", thumbnail: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", lessons: [
  { title: "1. SSR & SSG", contentHtml: "<p>getStaticProps, getServerSideProps.</p>", order: 1 },
  { title: "2. API Routes", contentHtml: "<p>/pages/api, middleware, Vercel deploy.</p>", order: 2 },
  { title: "3. App Router", contentHtml: "<p>Next 13+, server components, streaming.</p>", order: 3 }
]
 },
  // 10. MongoDB
  { title: "MongoDB Database Design", slug: "mongodb-design", description: "NoSQL Schemas", price: 49, category: "database", difficulty: "intermediate", thumbnail: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", lessons: [
  { title: "1. CRUD Operations", contentHtml: "<p>find, insert, update, delete with Mongoose.</p>", order: 1 },
  { title: "2. Aggregation", contentHtml: "<p>$match, $group, $lookup pipelines.</p>", order: 2 },
  { title: "3. Indexing", contentHtml: "<p>Performance optimization, compound indexes.</p>", order: 3 }
]
 },
  // 11. Figma
  { title: "UI/UX with Figma", slug: "uiux-figma", description: "Modern interface design", price: 29, category: "design", difficulty: "beginner", thumbnail: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", lessons: [
  { title: "1. Interface Basics", contentHtml: "<p>Frames, auto-layout, components.</p>", order: 1 },
  { title: "2. Prototyping", contentHtml: "<p>Interactions, transitions, variants.</p>", order: 2 },
  { title: "3. Design Systems", contentHtml: "<p>Tokens, libraries, collaboration.</p>", order: 3 }
]
 },
  // 12. GraphQL
  { title: "GraphQL API Dev", slug: "graphql-api", description: "Apollo and Queries", price: 59, category: "nodejs", difficulty: "intermediate", thumbnail: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg", lessons: [
  { title: "1. Schema & Resolvers", contentHtml: "<p>GraphQL schema, Apollo Server setup.</p>", order: 1 },
  { title: "2. Queries Mutations", contentHtml: "<p>Client queries, mutations, subscriptions.</p>", order: 2 },
  { title: "3. Apollo Client", contentHtml: "<p>useQuery, useMutation, cache management.</p>", order: 3 }
]
 },
  // 13. Security
  { title: "Cyber Security Basics", slug: "cyber-sec", description: "Protecting web apps", price: 89, category: "security", difficulty: "beginner", thumbnail: "https://cdn-icons-png.flaticon.com/512/2092/2092663.png", lessons: [
  { title: "1. OWASP Top 10", contentHtml: "<p>SQL injection, XSS, CSRF prevention.</p>", order: 1 },
  { title: "2. JWT Security", contentHtml: "<p>Token validation, refresh tokens, blacklisting.</p>", order: 2 },
  { title: "3. Encryption", contentHtml: "<p>Bcrypt, AES, HTTPS best practices.</p>", order: 3 }
]
 },
  // 14. Tailwind
  { title: "Tailwind CSS Mastery", slug: "tailwind-css", description: "Utility-first styling", price: 19, category: "css", difficulty: "beginner", thumbnail: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", lessons: [
  { title: "1. Utility Classes", contentHtml: "<p>Spacing, colors, typography utilities.</p>", order: 1 },
  { title: "2. Responsive", contentHtml: "<p>sm:, md:, lg: breakpoints, mobile-first.</p>", order: 2 },
  { title: "3. Components", contentHtml: "<p>Headless UI, DaisyUI, custom configs.</p>", order: 3 }
]
 },
  // 15. Java/Spring
  { title: "Spring Boot Microservices", slug: "java-spring", description: "Scalable backends", price: 79, category: "java", difficulty: "advanced", thumbnail: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", lessons: [
  { title: "1. Spring Boot", contentHtml: "<p>REST APIs, @Controller, dependency injection.</p>", order: 1 },
  { title: "2. JPA Hibernate", contentHtml: "<p>Database entities, repositories, CRUD.</p>", order: 2 },
  { title: "3. Spring Security", contentHtml: "<p>JWT auth, role-based access.</p>", order: 3 }
] },
  // 16. Machine Learning
  { title: "Machine Learning A-Z", slug: "ml-az", description: "Build AI models", price: 99, category: "python", difficulty: "advanced", thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop", lessons: [
  { title: "1. ML Fundamentals", contentHtml: "<p>Supervised vs unsupervised learning. Regression basics.</p>", order: 1 },
  { title: "2. Classification", contentHtml: "<p>Logistic regression, decision trees, SVM.</p>", order: 2 },
  { title: "3. Neural Networks", contentHtml: "<p>Deep learning intro, TensorFlow basics.</p>", order: 3 }
] },
  // 17. Vue
  { title: "Vue.js 3 Fundamentals", slug: "vue-basics", description: "Modern JS framework", price: 39, category: "javascript", difficulty: "intermediate", thumbnail: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", lessons: [
  { title: "1. Vue Basics", contentHtml: "<p>Vue instance, directives (v-if, v-for), data binding.</p>", order: 1 },
  { title: "2. Components", contentHtml: "<p>Single File Components, props, emit events.</p>", order: 2 },
  { title: "3. Vuex State", contentHtml: "<p>Centralized state management with Vuex.</p>", order: 3 }
] },
  // 18. React Native
  { title: "React Native Apps", slug: "react-native", description: "iOS and Android apps", price: 69, category: "react", difficulty: "intermediate", thumbnail: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", lessons: [
  { title: "1. Expo Setup", contentHtml: "<p>Install Expo CLI, create first app, run on device.</p>", order: 1 },
  { title: "2. Navigation", contentHtml: "<p>React Navigation setup (Stack, Tab navigators).</p>", order: 2 },
  { title: "3. Native APIs", contentHtml: "<p>Camera, GPS, push notifications.</p>", order: 3 }
] }
];
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");
    const Course = mongoose.model("Course");

    const shouldForceSeed = process.env.FORCE_SEED === "true";

    const count = await Course.countDocuments();
    if (shouldForceSeed || count === 0) {
      console.log("🌱 Seeding database...");
      await Course.deleteMany({});
      await Course.insertMany(allCourses);
      console.log("✅ Seeding completed.");
    } else {
      console.log(`✅ Database already has ${count} courses. Skipping seed.`);
    }
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });



app.post('/api/courses/enrollments', async (req, res) => {
  const { userId, courseId } = req.body;
  
  console.log(`NEW ENROLLMENT: User ${userId} enrolled in Course ${courseId}`);
  
  const enrollment = new Enrollment({ userId, courseId });
  await enrollment.save();
  res.json(enrollment);
});

app.get('/api/enrollments/me', async (req, res) => {
  res.json([]); 
});

app.get('/api/courses/enrollments/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const enrollments = await Enrollment.find({ userId: userId }).populate('courseId');
    
    console.log(`Found ${enrollments.length} enrollments for user ${userId}`);
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error('GET /api/courses ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});



app.post('/api/courses', async (req, res) => {
  try {
    const newCourse = new Course(req.body); 
    await newCourse.save();
    console.log(`✅ Admin added course: ${newCourse.title}`);
    res.json(newCourse);
  } catch (err) {
    res.status(500).json({ error: "Failed to add course" });
  }
});

app.delete('/api/courses/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    console.log(`🗑️ Admin deleted course ID: ${req.params.id}`);
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete course" });
  }
});

app.use("/api/auth", authRoutes);      
app.use("/api/courses", courseRoutes); 

app.listen(5000, () => console.log(`Server running on port 5000`));

