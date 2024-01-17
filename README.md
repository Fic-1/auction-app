# Auction-House-App

Auction-House-App is a web application created with intention of bidding in real-time.

Application allows users to create sign up, create products for bidding, with help of websocket technology allow users to see bid and see bids in real time, and upon auction time running allowing user to pay for their item with help of a Stripe checkout service.

Application also sends notifications through email.

This aplication is part of a final thesis on a Faculty of Organization and Informatics.

# 📁 Folder: API endpoints for - USERS

## End-point: Create user

### API Request Description

This endpoint allows users to sign up by creating a new account. The HTTP POST request should be made to `api/v1/users/signup`.

#### Request Body

- `name` (text): The name of the user.
- `email` (text): The email address of the user.
- `password` (text): The password for the user account.
- `passwordConfirm` (text): Confirmation of the password for the user account.

#### Response

Upon successful execution, the server responds with a status code of 201 and the following JSON data:

- `status` (string): The status of the response.
- `token` (string): The authentication token for the user.
- `data` (object):
  - `user` (object):
    - `name` (string): The name of the user.
    - `email` (string): The email address of the user.
    - `role` (string): The role of the user.
    - `photo` (string): The user's profile photo.
    - `active` (boolean): Indicates if the user account is active.
    - `_id` (string): The unique identifier of the user.
    - `__v` (number): Version control field.

### Method: POST

> ```
> api/v1/users/signup
> ```

### Body (**raw**)

```json
{
  "name": "New User",
  "email": "newUser@domain.com",
  "password": "{password}",
  "passwordConfirm": "{password}"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get all users

This endpoint makes an HTTP GET request to retrieve a list of users.

This endpoint supports sorting, limiting, selecting fields and pagination through query params.

The request does not require any specific payload or parameters.

The response will have a status code of 200, and the body will contain an object with:

- "status" field,
- "results" field,
- "data" field.

The "data" field will contain an array of user objects, each with:

- "\_id",
- "name",
- "email",
- "role",
- "photo"

### Method: GET

> ```
> api/v1/users
> ```

### Body (**raw**)

```json

```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get user by ID

This API endpoint makes an HTTP GET request to retrieve information about a specific user.

The request should be made to api/v1/users/\[USER_ID\]

will include the user's data, such as their ID, name, email, role, photo, and password change timestamp.

### Method: GET

> ```
> api/v1/users/657dc658b0597a5a87102af1
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Login

This API endpoint allows users to log in by sending a POST request to the specified URL. The request should include a JSON payload in the raw request body type with the user's email and password.

Authorization is done through JWT which is checked upon entering protected routes

### Request Body

- `email` (string): The user's email address.
- `password` (string): The user's password.

### Response

Upon successful execution, the API returns a status code of 200 along with a JSON response containing the following fields:

- `status` (string): Indicates the status of the response.
- `token` (string): A token for accessing protected routes.
- `data` (object): Contains user information including:
  - `user._id` (string): The user's unique identifier.
  - `user.name` (string): The user's name.
  - `user.email` (string): The user's email address.
  - `user.role` (string): The user's role or access level.
  - `user.photo` (string): URL of the user's profile photo.
  - `user.__v` (integer): Version number of the user data.
  - `user.passwordChangedAt` (string): Timestamp of the user's password change.

### Method: POST

> ```
> api/v1/users/login
> ```

### Body (**raw**)

```json
{
  "email": "gstevens@example.com",
  "password": ""
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Folder: bids

## End-point: Create bid

### Method: POST

> ```
> api/v1/bids
> ```

### Body (**raw**)

```json
{
  "product": "6554952b782ee1feaf1adab9",
  "bidder": "655380e17fde7c684ba8bf7b",
  "amount": "32000"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get all bids

### Method: GET

> ```
> api/v1/bids/
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Folder: API endpoints for - PRODUCTS

## End-point: Get all products

This endpoint makes an HTTP GET request to retrieve a list of all products. The request does not include a request body.

This endpoint supports sorting, limiting, selecting fields and pagination through query params.

### Response

Status: 200

Body:

- "staus"
- "results"
- "data":

"data":{"data":\[...\]}

- "data": \[
- "\_id":
- "name":
- "description":
- "startingBid":
- "seller": { }
- "endDate":
- "coverImage"
- "currentBid":
- "bids": \[ {} \]
- "photos":\[\]
- "emailSent":

"seller":

- { "\_id":
- "name":
- "photo": }

"bids":

- \[{"bidder": "",
- "amount":
- "\_id":}\]

The response includes a status, the number of results, and data for each product, including its ID, name, description, starting bid, seller information, end date, cover image, current bid, list of bids, photos, and an indication if an email has been sent.

### Method: GET

> ```
> api/v1/products
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Create product

### Add Product

This API endpoint allows you to add a new product to the system.

#### Request Body

- `name` (string, required): The name of the product.
- `description` (string, required): A brief description of the product.
- `seller` (string, required): The name of the seller.
- `startingBid` (number, required): The starting bid for the product.

#### Response

- Status: 201 Created
- `status` (string): The status of the response.
- `data` (object): The product data.
  - `name` (string): The name of the product.
  - `description` (string): A brief description of the product.
  - `startingBid` (number): The starting bid for the product.
  - `seller` (string): The name of the seller.
  - `endDate` (string): The end date of the product listing. - **Default: 3 days**
  - `coverImage` (string): URL of the cover image for the product.
  - `photos` (array): Array of URLs for additional photos of the product.
  - `emailSent` (boolean): Indicates whether an email notification has been sent. - **Default: false**
  - `_id` (string): The unique identifier of the product.
  - `currentBid` (number): The current highest bid for the product.
  - `bids` (array): Array of bids placed on the product.
  - `__v` (number): Version control field.

### Method: POST

> ```
> api/v1/products
> ```

### Body (**raw**)

```json
{
  "name": "New Product",
  "description": "Description of a new product",
  "seller": "657dc658b0597a5a87102af1",
  "startingBid": "1200"
}
```

### 🔑 Authentication bearer

| Param | value | Type   |
| ----- | ----- | ------ |
| token |       | string |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get one product by ID

This endpoint makes an HTTP GET request to retrieve details of a specific product identified by its ID. The response will include information such as the product name, description, starting bid, seller details, end date, cover image, photos, email status, current bid, and bids history.

The request does not require a request body, and the response will have a status code of 200 upon successful execution.

Example:

```json
{
  "status": 200,
  "data": {
    "data": {
      "_id": "65a7a15809091888ac3a0f53",
      "name": "Product Name",
      "description": "Product Description",
      "startingBid": 100,
      "seller": {
        "_id": "sellerID",
        "name": "Seller Name",
        "photo": "sellerPhotoURL"
      },
      "endDate": "2023-12-31",
      "coverImage": "coverImageURL",
      "photos": ["photo1URL", "photo2URL"],
      "emailSent": true,
      "currentBid": 150,
      "bids": [],
      "__v": 0
    }
  }
}
```

### Method: GET

> ```
> api/v1/products/655b5e5e98923d9c2a5314a4
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Folder: product/bid

## End-point: Add bid to a product

### Method: PATCH

> ```
> api/v1/products/655c7476d60616a2bb8abb4a/bids/
> ```

### Body (**raw**)

```json
{
  "amount": "350"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Folder: websocket

## End-point: api/v1/products/5-latest

This endpoint makes an HTTP GET request to retrieve informations about latest 5 products that were added to the database

### Method: GET

> ```
> api/v1/products/5-latest
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
