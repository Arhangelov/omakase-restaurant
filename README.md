# 🍣 Omakase Restaurant

Welcome to **Omakase Restaurant**! This is a web-based sushi restaurant application that allows customers to browse the menu, place orders, re-order previous orders, and manage their profile.

## 🚀 Features

- **Menu Browsing**: Explore a variety of sushi dishes with detailed descriptions and prices.
- **Order Placement**: Add items to the cart, customize your order, and securely place an order.
- **User Profile**: View order history.
- **Re-ordering**: Quickly re-order your favorite dishes from your profile page based on past orders.
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices.
- **Authentication**: You can **Sign Up** and **Sign In** (if you dont wont to register you can use pre-build user):
  - Username: testuser44@test.com
  - Password: @TestUser44 

## 🖥️ Tech Stack

- **Frontend**: ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- **State Management**: ![React Hooks](https://img.shields.io/badge/react%20hooks-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) (useState, useEffect, useContext)
- **Styling**: ![CSS3](https://img.shields.io/badge/css-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- **Backend**:  ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) (for storing orders and profiles)
- **Notifications**: React Hot Toast (for showing success messages)
- **Routing**: ![React Router](https://img.shields.io/badge/react%20router-%2320232a.svg?style=for-the-badge&logo=reactrouter&logoColor=%2361DAFB) (for navigating between pages)

## 📦 Installation

### 1. Clone the repository:

   ```bash
   git clone https://github.com/Arhangelov/omakase-restaurant.git
   ```

### 2. Navigate to the project directory:

   ```bash
   cd omakase-restaurant
   ```

### 3. Install the required dependencies:

   ```bash
   npm install
   ```

### 4. Run the development server (in terminal):

   ```bash
   cd server
   npm run dev
   ```

### 5. Run the client (in a separated terminal):

   ```bash
   cd client
   npm start
   ```


### 6. Open your browser and go to:

   ```
   http://localhost:3000
   ```

## 🛠️ Key Components

### 1. **Menu Page**
   - Displays a list of sushi dishes.
   - Users can view details and add items to their cart.

### 2. **Cart and Checkout**
   - View selected sushi items in the cart.
   - Adjust quantity and proceed to checkout.

### 3. **Profile Page**
   - View and manage user profile information (email, address).
   - View past orders and re-order them with a single click.

### 4. **Order History**
   - Accessible from the profile page, users can view all past orders.

## 🔧 Environment Variables

To run this project, you may need to set up environment variables for backend services like authentication or database connections. For example, in a `.env` file:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

We welcome contributions! Feel free to submit a pull request or create issues for any bugs or feature requests. Here's how you can contribute:

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.


## 🎞️ Screenshots
Include relevant screenshots of the UI for a better presentation of the project.

### 🏠 Home Page

https://github.com/user-attachments/assets/92e9004d-3aac-433e-915d-d874ba4716c5

### 🤷‍♂️ About Page

https://github.com/user-attachments/assets/eb5a0691-9d04-48a0-89e5-d52ffac7601b

### 📫 Contact Page

https://github.com/user-attachments/assets/bf1087b7-59d7-4e36-9745-ff3175dd01c3

### 🎫 Login Page

https://github.com/user-attachments/assets/ba1192d1-7aed-4ec1-bf03-b24fae15d953

### 📝 Sign up Page

https://github.com/user-attachments/assets/9f6fd872-5a91-4abd-ba5f-082ac08e76bd

### 📖 Menu Page

https://github.com/user-attachments/assets/be2eee65-c54f-409f-ba04-097f35d00e40

### 🛒 Cart Page

https://github.com/user-attachments/assets/419803e6-bae2-46f5-a2bd-183cd4427c77

### 🎉 Finished Order Page

https://github.com/user-attachments/assets/bd681012-3e46-47b3-ab27-18f631b7421c

### 👤 Profile Page

https://github.com/user-attachments/assets/4801e59f-94bb-4c8d-9a04-090df2b13f7c
