# Simple Ecommerce Application

A simple ecommerce application built with Node.js, Express, and vanilla JavaScript. Features product listing, shopping cart functionality, and checkout process with full CI/CD pipeline.

## Features

- 🛍️ Product catalog with 6 sample products
- 🛒 Shopping cart with add/remove/update quantity
- 💳 Checkout process with order confirmation
- 🧪 Comprehensive unit tests with Jest
- 🐳 Docker containerization
- 🚀 CI/CD pipeline with GitHub Actions
- 🔒 Security scanning with Trivy

## Project Structure

```
simple-ecommerce/
├── server.js              # Express server and API routes
├── package.json           # Dependencies and scripts
├── Dockerfile             # Docker container configuration
├── public/                # Frontend static files
│   ├── index.html         # Main HTML page
│   ├── script.js          # Frontend JavaScript
│   └── style.css          # CSS styling
├── tests/                 # Unit tests
│   └── server.test.js     # API tests with Jest
├── .github/workflows/     # GitHub Actions CI/CD
│   └── ci-cd.yml          # CI/CD pipeline configuration
└── README.md              # This file
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/:userId` - Add item to cart
- `PUT /api/cart/:userId/:itemId` - Update item quantity
- `DELETE /api/cart/:userId/:itemId` - Remove item from cart
- `DELETE /api/cart/:userId` - Clear cart

### Checkout
- `POST /api/checkout/:userId` - Process checkout

### Health
- `GET /api/health` - Health check endpoint

## Local Development

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd simple-ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Docker

### Build and Run with Docker

```bash
# Build the image
docker build -t simple-ecommerce .

# Run the container
docker run -p 3000:3000 simple-ecommerce
```

### Docker Compose

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in background
docker-compose up -d --build

# Stop the application
docker-compose down
```

Then run:
```bash
docker-compose up
```

## CI/CD Pipeline

The project includes a comprehensive CI/CD pipeline using GitHub Actions with the following stages:

1. **Test**: Runs tests on multiple Node.js versions (16.x, 18.x, 20.x)
2. **Build & Push**: Builds Docker image and pushes to Docker Hub (on main branch)
3. **Deploy**: Placeholder for deployment steps
4. **Security Scan**: Runs Trivy vulnerability scanner

### Setting up CI/CD

1. Create a GitHub repository
2. Push this code to the repository
3. Go to Settings > Secrets and add:
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub password/token
4. The pipeline will run automatically on pushes to main/develop branches

## Testing the Application

### Manual Testing

1. Start the server: `npm start`
2. Open `http://localhost:3000` in your browser
3. Browse products and add items to cart
4. Update quantities and remove items
5. Proceed to checkout

### API Testing with curl

```bash
# Health check
curl http://localhost:3000/api/health

# Get products
curl http://localhost:3000/api/products

# Add to cart
curl -X POST http://localhost:3000/api/cart/user123 \
  -H "Content-Type: application/json" \
  -d '{"productId": "1", "quantity": 2}'

# Get cart
curl http://localhost:3000/api/cart/user123

# Checkout
curl -X POST http://localhost:3000/api/checkout/user123
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Testing**: Jest, Supertest
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Security**: Trivy

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and add tests
4. Run tests: `npm test`
5. Commit your changes: `git commit -am 'Add your feature'`
6. Push to the branch: `git push origin feature/your-feature`
7. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- [ ] User authentication and registration
- [ ] Product search and filtering
- [ ] Product categories
- [ ] Order history
- [ ] Payment integration (Stripe, PayPal)
- [ ] Database integration (MongoDB, PostgreSQL)
- [ ] Admin panel for product management
- [ ] Email notifications
- [ ] Product reviews and ratings
