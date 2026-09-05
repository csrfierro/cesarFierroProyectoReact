# CF Store — E-commerce SPA (React + Firebase)

SPA de e-commerce desarrollada con React, React Router y Firestore (Firebase) como base de datos.

## Stack

- React + Vite
- React Router DOM (navegación SPA)
- Context API (estado global del carrito)
- Firebase Firestore (productos y órdenes)
- Bootstrap 5 (estilos)

## Estructura de componentes

```
App
 ├── NavBar
 │    └── CartWidget
 ├── ItemListContainer
 │    └── ItemList
 │         └── Item
 ├── ItemDetailContainer
 │    └── ItemDetail
 │         └── ItemCount
 ├── Cart
 │    └── CartItem
 └── CheckoutForm
```

## Configuración

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/) y habilitar **Firestore Database**.

3. Copiar `.env.example` a `.env` y completar con las credenciales del proyecto de Firebase (Configuración del proyecto → General → Tus apps → SDK setup and configuration):

   ```bash
   cp .env.example .env
   ```

4. Reglas de Firestore sugeridas para el desarrollo (lectura pública de productos, escritura de órdenes abierta):

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /products/{productId} {
         allow read: if true;
         allow write: if false;
       }
       match /orders/{orderId} {
         allow read: if false;
         allow create: if true;
       }
     }
   }
   ```

5. Cargar productos de ejemplo en la colección `products`:

   ```bash
   npm run seed
   ```

6. Ejecutar la aplicación:

   ```bash
   npm run dev
   ```

## Colecciones de Firestore

- **products**: `name`, `description`, `category`, `price`, `stock`, `image`.
- **orders**: `buyer` (name, email, phone), `items` (id, name, price, quantity), `total`, `date`. Se generan automáticamente al confirmar una compra en el checkout.
