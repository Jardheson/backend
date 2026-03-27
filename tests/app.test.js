process.env.NODE_ENV = "test";
process.env.DB_DIALECT = "sqlite";
process.env.DB_STORAGE = ":memory:";

const request = require("supertest");
const app = require("../src/app");
const { sequelize } = require("../src/models");

let authToken;
let userId;

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Usuário + Auth", () => {
  it("deve criar usuário (POST /v1/user)", async () => {
    const res = await request(app).post("/v1/user").send({
      firstname: "John",
      surname: "Doe",
      email: "john@example.com",
      password: "123@123",
      confirmPassword: "123@123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        firstname: "John",
        surname: "Doe",
        email: "john@example.com",
      }),
    );
    userId = res.body.id;
  });

  it("deve gerar token JWT (POST /v1/user/token)", async () => {
    const res = await request(app).post("/v1/user/token").send({
      email: "john@example.com",
      password: "123@123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeTruthy();
    authToken = res.body.token;
  });

  it("deve retornar usuário por id (GET /v1/user/:id)", async () => {
    const res = await request(app).get(`/v1/user/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: userId,
        firstname: "John",
        surname: "Doe",
        email: "john@example.com",
      }),
    );
  });

  it("deve atualizar usuário (PUT /v1/user/:id)", async () => {
    const res = await request(app)
      .put(`/v1/user/${userId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ firstname: "Jane", surname: "Doe", email: "jane@example.com" });

    expect(res.statusCode).toBe(204);

    const res2 = await request(app).get(`/v1/user/${userId}`);
    expect(res2.statusCode).toBe(200);
    expect(res2.body.email).toBe("jane@example.com");
  });

  it("deve deletar usuário (DELETE /v1/user/:id)", async () => {
    const res = await request(app)
      .delete(`/v1/user/${userId}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.statusCode).toBe(204);

    const res2 = await request(app).get(`/v1/user/${userId}`);
    expect(res2.statusCode).toBe(404);
  });
});

describe("Categorias CRUD", () => {
  let categoryId;

  it("deve criar categoria (POST /v1/category)", async () => {
    const res = await request(app)
      .post("/v1/category")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ name: "Shoes", slug: "shoes", use_in_menu: true });

    expect(res.statusCode).toBe(201);
    categoryId = res.body.id;
    expect(res.body.name).toBe("Shoes");
  });

  it("deve listar categorias (GET /v1/category/search)", async () => {
    const res = await request(app).get("/v1/category/search").query({ limit: -1, use_in_menu: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.some((item) => item.id === categoryId)).toBe(true);
  });

  it("deve buscar categoria por id (GET /v1/category/:id)", async () => {
    const res = await request(app).get(`/v1/category/${categoryId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.slug).toBe("shoes");
  });

  it("deve atualizar categoria (PUT /v1/category/:id)", async () => {
    const res = await request(app)
      .put(`/v1/category/${categoryId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ name: "Shoes Updated", slug: "shoes-updated", use_in_menu: false });

    expect(res.statusCode).toBe(204);

    const res2 = await request(app).get(`/v1/category/${categoryId}`);
    expect(res2.body.name).toBe("Shoes Updated");
    expect(res2.body.use_in_menu).toBe(false);
  });

  it("deve deletar categoria (DELETE /v1/category/:id)", async () => {
    const res = await request(app)
      .delete(`/v1/category/${categoryId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(204);

    const res2 = await request(app).get(`/v1/category/${categoryId}`);
    expect(res2.statusCode).toBe(404);
  });
});

describe("Produtos CRUD", () => {
  let productId;
  let categoryId;

  beforeAll(async () => {
    const category = await request(app)
      .post("/v1/category")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ name: "Sports", slug: "sports", use_in_menu: true });
    categoryId = category.body.id;
  });

  it("deve criar produto (POST /v1/product)", async () => {
    const res = await request(app)
      .post("/v1/product")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        enabled: true,
        name: "Product 1",
        slug: "product-1",
        stock: 10,
        description: "Product 1 desc",
        price: 100,
        price_with_discount: 90,
        category_ids: [categoryId],
        images: [{ content: "image1.png" }],
        options: [
          { title: "Tamanho", type: "text", values: ["P", "M"] },
          { title: "Cor", type: "color", values: ["#000", "#fff"] },
        ],
      });

    if (res.statusCode !== 201) {
      console.log('CREATE PRODUCT FAILURE', {
        status: res.statusCode,
        body: res.body,
      });
    }

    expect(res.statusCode).toBe(201);
    productId = res.body.id;
    expect(res.body.name).toBe("Product 1");
  });

  it("deve buscar produto por id (GET /v1/product/:id)", async () => {
    const res = await request(app).get(`/v1/product/${productId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Product 1");
    expect(res.body.images).toHaveLength(1);
    expect(res.body.options).toHaveLength(2);
  });

  it("deve pesquisar produtos (GET /v1/product/search)", async () => {
    const res = await request(app).get("/v1/product/search").query({ match: "Product" });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });

  it("deve atualizar produto (PUT /v1/product/:id)", async () => {
    const getRes = await request(app).get(`/v1/product/${productId}`);
    const existingImage = getRes.body.images[0];
    const existingOption = getRes.body.options[0];

    const res = await request(app)
      .put(`/v1/product/${productId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        enabled: false,
        name: "Product 1 Updated",
        slug: "product-1-updated",
        stock: 5,
        description: "Updated desc",
        price: 80,
        price_with_discount: 70,
        category_ids: [categoryId],
        images: [
          { id: existingImage.id, content: "image1-updated.png" },
          { content: "image2.png" },
        ],
        options: [
          { id: existingOption.id, deleted: true },
          { title: "Material", type: "text", values: ["Algodao"] },
        ],
      });

    expect(res.statusCode).toBe(204);

    const updated = await request(app).get(`/v1/product/${productId}`);
    expect(updated.statusCode).toBe(200);
    expect(updated.body.name).toBe("Product 1 Updated");
    expect(updated.body.images.length).toBe(2);
    expect(updated.body.options.length).toBe(2);
  });

  it("deve deletar produto (DELETE /v1/product/:id)", async () => {
    const res = await request(app)
      .delete(`/v1/product/${productId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(204);

    const res2 = await request(app).get(`/v1/product/${productId}`);
    expect(res2.statusCode).toBe(404);
  });
});
