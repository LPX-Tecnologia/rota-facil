// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCSIqmF0zoF3eT97wl4g9SPjWS0NN1JdTU",
  authDomain: "rota-facil-a85c4.firebaseapp.com",
  projectId: "rota-facil-a85c4",
  storageBucket: "rota-facil-a85c4.firebasestorage.app",
  messagingSenderId: "389132734380",
  appId: "1:389132734380:web:f5095698430bcf389ef409",
  measurementId: "G-WSWBGV68NK"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Atalhos
const auth = firebase.auth();
const db = firebase.firestore();

// Habilitar persistência offline (opcional)
db.enablePersistence()
  .catch(err => console.error("Erro ao habilitar persistência:", err));
