import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v0.0.1",
    title: "Dokumentasi API Acara",
    description: "Dokumentasi API Acara",
  },
  servers: [
    {
      url: "http://localhost:4000/api",
      description: "Local Server",
    },
    {
      url: "https://back-end-acara-flame.vercel.app/api",
      description: "Deploy Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      LoginRequest: {
        identifier: "AQodS",
        password: "123456",
      },
      RegisterRequest: {
        fullName: "Boni Ngerkekek",
        username: "boni",
        email: "boni@yopmail.com",
        password: "Boni123",
        confirmPassword: "Boni123",
      },
      ActivationRequest: {
        code: "abcdef",
      },
      CreateCategoryRequest: {
        name: "",
        description: "",
        icon: "",
      },
      CreateEventRequest: {
        name: "",
        banner: "fileUrl",
        category: "category ObjectID",
        description: "",
        startDate: "yyyy-mm-dd hh:mm:ss",
        endDate: "yyyy-mm-dd hh:mm:ss",
        location: {
          region: "region id",
          coordinates: [0, 0],
          address: "",
        },
        isOnline: false,
        isFeatured: false,
        isPublish: false,
      },
      RemoveMediaRequest: {
        fileUrl: "",
      },
      CreateBannerRequest: {
        title: "Banner Title",
        image:
          "https://res.cloudinary.com/ddrqq1dv7/image/upload/v1742315482/clfuens7gtqrfcmhlvwd.png",
        isShow: false,
      },
      CreateTicketRequest: {
        price: 1000,
        name: "Ticket name",
        events: "67d96ad5353a8ac7f49791b9",
        description: "Ticket description",
        quantity: 100,
      },
    },
  },
};
const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
