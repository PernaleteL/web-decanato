const express = require('express');
const router = express.Router();
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, deleteDoc, setDoc, updateDoc } = require("firebase/firestore");
const { v4: uuidv4 } = require('uuid');
const multer  = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const firebaseConfig = {
    apiKey: "AIzaSyDc00TcReFTGUnYZvBNUN9njTsekCJxwxg",
    authDomain: "decanato-f66d0.firebaseapp.com",
    projectId: "decanato-f66d0",
    storageBucket: "decanato-f66d0.appspot.com",
    messagingSenderId: "311238481768",
    appId: "1:311238481768:web:2a1f92c841bbf3c00768dd"
  };

const { app } = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

//registrar profesor  
router.post('/registar-profesor', upload.single('img'),async (req, res) => {
  const { nombre, correo,codigoMateria1,codigoMateria2,codigoMateria3,codigoMateria4, materia1, materia2, materia3, materia4, sobreMi, roll } = req.body;
  const img = req.file;
  console.log(nombre, correo, materia1, materia2,materia3, materia4, codigoMateria1, codigoMateria2, codigoMateria3, codigoMateria4, sobreMi, roll, img);
  
  try {
    //subir imagen
    const uniqueFileName = uuidv4(); // Generar un UUID v4 para el nombre del archivo
    const storageRef = ref(storage, 'img-profesores/' + uniqueFileName);
    const metadata = {
      contentType: img.mimetype,
    }
    const snapshot = await uploadBytesResumable(storageRef, img.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Crear objeto del profesor
    const profesor = {
      nombre,
        correo,
        codigoMateria1,
        codigoMateria2,
        codigoMateria3,
        codigoMateria4,
        materia1,
        materia2,
        materia3,
        materia4,
        sobreMi,
        roll,
      img: downloadURL,
    };
    // Agregar el profesor a la colección 'profesores'
    const coleccionProfesores = collection(db, 'profesores');
    const docRef = await addDoc(coleccionProfesores, profesor);
    console.log('ID asignado al profesor:', docRef.id);
    res.send({
      message: 'Profesor registrado exitosamente',
      data: profesor
    });
    console.log(profesor,img);
  } catch (error) {
    throw error
  }
});

  //Cargar profesores
  router.get('/profesores', async (req, res) => {
    try {
      const coleccionProfesores = collection(db, 'profesores');
      const querySnapshot = await getDocs(coleccionProfesores);
  
      let profesores = [];
      querySnapshot.forEach((doc) => {
        profesores.push({
          id: doc.id,
          data: doc.data()
        });
      });
  
      res.json(profesores);
    } catch (error) {
      console.error('Error al obtener los profesores: ', error);
      res.status(500).send('Error al obtener los profesores');
    }
  });

  //eliminar profesores
  router.delete('/profesores/:id', async (req, res) => {
    const idProfesor = req.params.id;
    
    try {
        await deleteDoc(doc(db, 'profesores', idProfesor));
        console.log('Profesor eliminado correctamente');
        res.status(200).send('Profesor eliminado correctamente');
        console.log(idProfesor);
    } catch (error) {
        console.error('Error al eliminar el profesor:', error);
        res.status(500).send('Error al eliminar el profesor');
    }
});

// EDITAR PROFESOR
router.put('/edit-profesor/:id',upload.single('img'), async (req, res) => {
  const { id } = req.params;
  const { nombre, correo,codigoMateria1,codigoMateria2,codigoMateria3,codigoMateria4, materia1, materia2, materia3, materia4, sobreMi, roll  } = req.body;
  const img = req.file;
  console.log(nombre, correo,codigoMateria1,codigoMateria2,codigoMateria3,codigoMateria4, materia1, materia2, materia3, materia4, sobreMi, roll  );
  console.log(id);
  
  try {
      const profesorRef = doc(db, 'profesores', id);
      const profesorSnapshot = await getDoc(profesorRef);
      let currentImgURL
      let snapshot
      
      if (profesorSnapshot.exists()) {
          // El documento existe, proceder con la actualización
          //subir imagen
          const uniqueFileName = uuidv4(); // Generar un UUID v4 para el nombre del archivo
          const storageRef = ref(storage, 'img-profesores/' + uniqueFileName);
       if (img) {
        const metadata = {
          contentType: img.mimetype,
        }
         snapshot = await uploadBytesResumable(storageRef, img.buffer, metadata);
       } else {
        const existingData = profesorSnapshot.data();
        currentImgURL = existingData.img;
       }
        //const downloadURL = await getDownloadURL(snapshot.ref);
         const downloadURL = img ? await getDownloadURL(snapshot.ref) : currentImgURL;
          await setDoc(profesorRef, {
              nombre,
              correo,
              codigoMateria1,
              codigoMateria2,
              codigoMateria3,
              codigoMateria4,
              materia1,
              materia2,
              materia3,
              materia4,
              sobreMi,
              roll,
              img:downloadURL
          }, { merge: true });
          
          console.log('Profesor actualizado correctamente');
          res.status(200).send('Profesor actualizado correctamente');
      } else {
          // El documento no fue encontrado
          console.error('El profesor con el ID proporcionado no fue encontrado');
          res.status(404).send('El profesor con el ID proporcionado no fue encontrado');
      }
  } catch (error) {
      console.error('Error al actualizar el profesor:', error);
      res.status(500).send('Error al actualizar el profesor');
  }
});

//Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)

  try {
    const credenciales = await signInWithEmailAndPassword(auth, email, password);
    // Obtener el token de autenticación del usuario actual
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      // Enviar el token como parte de la respuesta
      res.status(200).json({ token });
    } else {
      res.status(401).send('No se pudo obtener el token de autenticación');
    }
  } catch (error) {
    // Manejo de errores: enviar un mensaje de error al cliente
    console.log(error);
    res.status(401).send('Credenciales inválidas o error en la autenticación');
  }
});

//Crear materia
router.post('/registar-materia', async (req, res) => {
  const { semestre, asignatura, codigo, uc, descripcion, profesores,idProfesores, prelacion } = req.body;
  console.log(semestre, asignatura, codigo, uc, descripcion, profesores,idProfesores, prelacion);
  
  try {
    const materia = {
      semestre,
      asignatura,
      codigo,
      uc,
      descripcion,
      profesores,
      idProfesores,
      prelacion
    };
    const docRef = await addDoc(collection(db, 'materias-telematica'), materia);
    const docId = docRef.id;
    const docRef2 = doc(db, 'materias-telematica', docId);
    const docSnap = await getDoc(docRef2);
    if (docSnap.exists()) {
      const data = docSnap.data();
      res.status(200).json(data);
    }
    console.log('Materia registrada correctamente', docRef.id);
  } catch (error) {
    throw error;
  }
});
//Cargar materias
router.get('/materias-telematica', async (req, res) => {
  try {
    const coleccionMaterias = collection(db, 'materias-telematica');
    const querySnapshot = await getDocs(coleccionMaterias);

    let materias = [];
    querySnapshot.forEach((doc) => {
      materias.push({
        id: doc.id,
        data: doc.data()
      });
    });

    res.json(materias);
  } catch (error) {
    console.error('Error al obtener los materias: ', error);
    res.status(500).send('Error al obtener los materias');
  }
});

//editar materias por id
router.put('/edit-materia-telematica/:id',async (req, res) => {
  const { id } = req.params;
  const { semestre, asignatura, codigo, uc, descripcion, profesores, idProfesores, prelacion } = req.body;
  console.log(semestre, asignatura, codigo, uc, descripcion, profesores, idProfesores, prelacion);
  console.log(id);
  
  try {
      const materiaRef = doc(db, 'materias-telematica', id);
      const materiaSnapshot = await getDoc(materiaRef);
      
      if (materiaSnapshot.exists()) {
        //const downloadURL = await getDownloadURL(snapshot.ref);
          await setDoc(materiaRef, {
              semestre,
              asignatura,
              codigo,
              uc,
              descripcion,
              profesores,
              idProfesores,
              prelacion
          }, { merge: true });
          console.log('materia actualizado correctamente');
          res.status(200).send('materia actualizado correctamente');
      } else {
          // El documento no fue encontrado
          console.error('La materia con el ID proporcionado no fue encontrado');
          res.status(404).send('La materia con el ID proporcionado no fue encontrado');
      }
  } catch (error) {
      console.error('Error al actualizar la materia:', error);
      res.status(500).send('Error al actualizar la materia');
  }
});

// Consulta de profesores con rol de Director o Subdirector
router.get('/autoridades', async (req, res) => {
  try {
    const coleccionProfesores = collection(db, 'profesores');
    const querySnapshot = await getDocs(query(coleccionProfesores, where('roll', 'in', ['Director', 'Subdirector'])));

    let profesoresConRol = [];
    querySnapshot.forEach((doc) => {
      profesoresConRol.push({
        id: doc.id,
        data: doc.data()
      });
    });

    res.json(profesoresConRol);
  } catch (error) {
    console.error('Error al obtener los profesores con rol: ', error);
    res.status(500).send('Error al obtener los profesores con rol');
  }
});

// obtener profesor por id
router.get('/profesor-telematica', async (req, res) => {
  const { id } = req.query; // Obtener los IDs de la consulta como parámetros de consulta
  console.log(id);

  try {
    const coleccionProfesores = collection(db, 'profesores');
    const querySnapshot = await getDocs(query(coleccionProfesores, where('__name__', '==', id)));
   
    const profesorData = querySnapshot.docs[0].data();

    // Enviar el resultado al frontend como JSON
    res.json({ data: profesorData });

    console.log('Profesor encontrado:', profesorData);
  } catch (error) {
    console.error('Error al obtener el profesor:', error);
    res.status(500).send('Error al obtener el profesor');
  }
});



  module.exports = router;