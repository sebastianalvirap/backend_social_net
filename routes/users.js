import { Router } from "express";
import { testUser, register, login, profile, listUsers, updateUser, uploadavatar, avatar } from "../controllers/user.js";
import { ensureAuth } from '../middlewares/auth.js';
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;

// Configuración de ña subida de archivos en Cloudinary
const storage = new CloudinaryStorage ({
    cloudinary: cloudinary,
    params: {
        folder: 'avatars',
        allowedFormats: ['jpg', 'png', 'jpeg', 'gift'], //formatos permitidos
        public_id: (req,file) => 'avatar-' + Date.now()
    }
});

// Configurara multer, con limites de tamaño de archivos
const uploads = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 } //limitar tamaño a 1MB
});

const router = Router();

// Definir rutas de user
router.get('/test-user', ensureAuth, testUser);
router.post('/register', register);
router.post('/login', login);
router.get('/profile/:id', ensureAuth, profile);
router.get('/list/:page?', ensureAuth, listUsers);
router.put('/update', ensureAuth, updateUser);
router.post('/upload-avatar', ensureAuth, uploads.single("file0"), uploadavatar);
router.get('/avatar/:id', avatar);

//Exportar el Router
export default router;