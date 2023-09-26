# Optimizing Shopify Collection Product Tag

![Shopify collection product tag is not equal to](./images/shopify-collection-product-tag-is-not-equal-to.webp)

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
