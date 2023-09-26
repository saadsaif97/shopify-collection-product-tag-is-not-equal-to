# Optimizing Shopify Collection Product Tag

![Shopify collection product tag is not equal to](./images/shopify-collection-product-tag-is-not-equal-to.webp)

Shopify doesn't allow creating product collections that exclude a specific tag, say "Winter". The workaround involves tagging the rest of your products manually with another tag, say "Summer". This becomes a tedious task when dealing with large product catalogs.

I've developed an automated script that helps you tag all your products conveniently. The script leverages Shopify's Admin REST API to apply logic and automatically tag thousands of products. You can also modify this script as per your specific requirements.

## Purpose:

This script aids in creating and tagging the products based on specific conditions. The operations are performed using [Shopify's Admin REST API](https://shopify.dev/docs/api/admin-rest/2023-07/resources/product).

## Instructions for Implementation:

1. **Clone the Repository**:  
   Use the following command to clone the repository to your local environment:
   ```bash
   git clone https://github.com/saadsaif97/shopify-collection-product-tag-is-not-equal-to.git
   ```
   
2. **Install Dependencies**:  
    Run the following command to install all necessary dependencies:
    ```bash
    yarn install
    ```

3. **Create a New App From Your Shopify Store**:  
Navigate through the menus `Settings > Apps and sales channels > Develop apps > Create an app`.

4. **Configure Admin API Scopes**:  
Assign rights to `read_products` and `write_products`.

5. **Install the App**:  
Go to the `API credentials` tab and initiate the app installation.

6. **Copy the API Credentials**:  
Obtain the `Admin API access token`, `API key`, and `Secret key` and input them into the script.

7. **Update the Tags**:  
Modify the tags according to your requirements.

8. **Run the Script**:  
To execute the script, run the following command:
    ```bash
    node index.js
    ```
