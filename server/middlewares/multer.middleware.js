import multer from 'multer';

const storge = multer.memoryStorage();

export const upload = multer({storge});

