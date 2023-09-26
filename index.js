import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION, Session } from "@shopify/shopify-api";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-07";
import fs from "fs";

const shopify = shopifyApi({
  apiKey: "", // <==== Update your apiKey
  apiSecretKey: "", // <==== Update your apiSecretKey
  apiVersion: LATEST_API_VERSION,
  isPrivateApp: true,
  scopes: [
    "read_products",
    "write_products",
  ],
  isEmbeddedApp: false,
  hostName: "yourstore.myshopify.com", // <==== Update your storeName
  // Mount REST resources.
  restResources,
});

// Create a sanitized, but fake 'not-a-real-session-id'.
const sessionId = shopify.session.getOfflineId("yourstore.myshopify.com"); // <==== Update your storeName
const session = new Session({
  id: sessionId,
  shop: "yourstore.myshopify.com", // <==== Update your storeName
  state: "state",
  isOnline: false,
  accessToken: "", // <==== Update your accessToken
});

async function writeAllProductsToFile() {
  let products = [];

  let params = {
    session: session,
    limit: 50, // ≤ 250 default 50
    fields: "id,tags,title",
  };

  while (true) {
    let response = await shopify.rest.Product.all(params);

    console.log("Page info:", response?.pageInfo?.nextPage?.query);

    let productsWithoutTag = response.data.filter(
      (product) => !product.tags.includes("Winter")
    );

    // Add current batch of products into our array
    products.push(...productsWithoutTag);

    // Check if there's a next page. If nextPageParameters is null, it means we reached the last page.
    if (!response?.pageInfo?.nextPage?.query) break;

    // Set up next round of parameters
    params = {
      ...params,
      ...response?.pageInfo?.nextPage?.query,
    };
  }

  // When done with all pages, convert JavaScript object to JSON string
  const dataString = JSON.stringify(products, null, 2);

  // Write the JSON string to a file
  fs.writeFile("allproducts.json", dataString, (err) => {
    // Error checking
    if (err) throw err;

    console.log("Data written to file");
  });
}

async function countAllProducts() {
  let count = await shopify.rest.Product.count({
    session: session,
  });
  console.log(count);

  fs.writeFile("count.json", JSON.stringify(count, null, 2), (err) => {
    // Error checking
    if (err) throw err;

    console.log("Count written to file");
  });
}

function updateProduct(product) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      // Append new tag to existing tags
      let currentTags = product.tags;
      let newTag = "Summer";
      if (currentTags.trim() === "") {
        product.tags = newTag;
      } else {
        product.tags = currentTags + ", " + newTag;
      }

      console.log(product.tags);

      // Update product in Shopify
      const updatedProduct = new shopify.rest.Product({ session: session });
      updatedProduct.id = product.id;
      updatedProduct.tags = product.tags; // Directly updating the tags here
      await updatedProduct.save({
        update: true,
      });

      resolve();
    }, 1000); // one second delay between each request
  });
}

function addNewTags() {
  let rawdata = fs.readFileSync("allproducts.json");
  let products = JSON.parse(rawdata);

  // Update tags in each product
  (async () => {
    for (const product of products) {
      await updateProduct(product);
    }
  })();
}

await writeAllProductsToFile();
await countAllProducts()
addNewTags();
