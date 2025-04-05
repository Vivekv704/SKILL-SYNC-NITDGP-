import { Router } from 'express';
import { facultyRegister, facultyLogin } from '../controllers/facultyAuthController.js';

const routerFaculty = Router();

// Route for faculty registration
routerFaculty.post('/register-faculty', facultyRegister);

routerFaculty.post('/login-faculty', facultyLogin);

export default routerFaculty;