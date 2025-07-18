// aca presentamos  una implementación de una base de datos local simple usando localStorage
interface UserProfile {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UploadedFile {
  id: string;
  userId: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: Date;
  category: string;
}

class LocalDatabase {
  private readonly USERS_KEY = 'segurmax_users'; //readonly es una buena práctica para constantes 
  private readonly FILES_KEY = 'segurmax_files'; // Claves para almacenar datos en localStorage
  private readonly PROFILE_IMAGES_KEY = 'segurmax_profile_images';   // Clave para almacenar imágenes de perfil

  // Usuarios
  saveUser(user: UserProfile): void { 
    const users = this.getUsers();
    const existingIndex = users.findIndex(u => u.id === user.id);
    
    if (existingIndex >= 0) {
      users[existingIndex] = { ...user, updatedAt: new Date() };
    } else {
      users.push({ ...user, createdAt: new Date(), updatedAt: new Date() });
    }
    
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  getUser(id: string): UserProfile | null {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  }

  getUsers(): UserProfile[] {
    const data = localStorage.getItem(this.USERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  // Archivos subidos
  saveFile(file: UploadedFile): void {
    const files = this.getFiles();
    files.push({ ...file, uploadedAt: new Date() });
    localStorage.setItem(this.FILES_KEY, JSON.stringify(files));
  }

  getFiles(userId?: string): UploadedFile[] {
    const data = localStorage.getItem(this.FILES_KEY);
    const files = data ? JSON.parse(data) : [];
    return userId ? files.filter((f: UploadedFile) => f.userId === userId) : files;
  }

  deleteFile(fileId: string): void {
    const files = this.getFiles();
    const updatedFiles = files.filter(f => f.id !== fileId);
    localStorage.setItem(this.FILES_KEY, JSON.stringify(updatedFiles));
  }

  // Imágenes de perfil
  saveProfileImage(userId: string, imageData: string): void {
    const images = this.getProfileImages();
    images[userId] = {
      data: imageData,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(this.PROFILE_IMAGES_KEY, JSON.stringify(images));
  }

  getProfileImage(userId: string): string | null {
    const images = this.getProfileImages();
    return images[userId]?.data || null;
  }

  private getProfileImages(): Record<string, { data: string; savedAt: string }> {
    const data = localStorage.getItem(this.PROFILE_IMAGES_KEY);
    return data ? JSON.parse(data) : {};
  }

  // Limpiar datos (para desarrollo)
  clearAll(): void {
    localStorage.removeItem(this.USERS_KEY);
    localStorage.removeItem(this.FILES_KEY);
    localStorage.removeItem(this.PROFILE_IMAGES_KEY);
  }
}

export const database = new LocalDatabase();
export type { UserProfile, UploadedFile };