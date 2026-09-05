import 'dotenv/config'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const products = [
  {
    name: 'Remera Oversize Negra',
    description: 'Remera de algodón 100%, corte oversize, ideal para uso diario.',
    category: 'remeras',
    price: 15999,
    stock: 12,
    image: 'https://picsum.photos/seed/remera1/400/400',
  },
  {
    name: 'Remera Estampada Blanca',
    description: 'Remera con estampa gráfica, tela premium.',
    category: 'remeras',
    price: 14500,
    stock: 8,
    image: 'https://picsum.photos/seed/remera2/400/400',
  },
  {
    name: 'Remera Básica Gris',
    description: 'Remera lisa color gris melange, corte clásico.',
    category: 'remeras',
    price: 12999,
    stock: 0,
    image: 'https://picsum.photos/seed/remera3/400/400',
  },
  {
    name: 'Jean Slim Fit Azul',
    description: 'Pantalón de jean elastizado, calce slim.',
    category: 'pantalones',
    price: 32999,
    stock: 10,
    image: 'https://picsum.photos/seed/pantalon1/400/400',
  },
  {
    name: 'Pantalón Cargo Verde',
    description: 'Pantalón cargo con bolsillos laterales, tela resistente.',
    category: 'pantalones',
    price: 28999,
    stock: 6,
    image: 'https://picsum.photos/seed/pantalon2/400/400',
  },
  {
    name: 'Jogger Negro',
    description: 'Pantalón jogger deportivo, puño elastizado.',
    category: 'pantalones',
    price: 21999,
    stock: 15,
    image: 'https://picsum.photos/seed/pantalon3/400/400',
  },
  {
    name: 'Zapatillas Urbanas Blancas',
    description: 'Zapatillas de cuero sintético, suela de goma antideslizante.',
    category: 'calzado',
    price: 45999,
    stock: 7,
    image: 'https://picsum.photos/seed/calzado1/400/400',
  },
  {
    name: 'Zapatillas Running Grises',
    description: 'Zapatillas livianas para running, amortiguación EVA.',
    category: 'calzado',
    price: 52999,
    stock: 5,
    image: 'https://picsum.photos/seed/calzado2/400/400',
  },
  {
    name: 'Botas de Cuero Marrón',
    description: 'Botas de cuero genuino, ideales para invierno.',
    category: 'calzado',
    price: 61999,
    stock: 0,
    image: 'https://picsum.photos/seed/calzado3/400/400',
  },
  {
    name: 'Gorra Negra Bordada',
    description: 'Gorra ajustable con logo bordado.',
    category: 'accesorios',
    price: 9999,
    stock: 20,
    image: 'https://picsum.photos/seed/accesorio1/400/400',
  },
  {
    name: 'Mochila Urbana',
    description: 'Mochila resistente al agua, compartimento para notebook.',
    category: 'accesorios',
    price: 38999,
    stock: 9,
    image: 'https://picsum.photos/seed/accesorio2/400/400',
  },
  {
    name: 'Cinturón de Cuero',
    description: 'Cinturón de cuero genuino con hebilla metálica.',
    category: 'accesorios',
    price: 13999,
    stock: 14,
    image: 'https://picsum.photos/seed/accesorio3/400/400',
  },
]

const seedProducts = async () => {
  const productsCollection = collection(db, 'products')

  for (const product of products) {
    const docRef = await addDoc(productsCollection, product)
    console.log(`Producto creado: ${product.name} (${docRef.id})`)
  }

  console.log('Carga de productos finalizada.')
  process.exit(0)
}

seedProducts().catch((error) => {
  console.error('Error al cargar productos:', error)
  process.exit(1)
})
