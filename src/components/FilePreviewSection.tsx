import React, { useState, useEffect } from 'react';
import { FileText, Download, Trash2, Eye, Calendar, User, Tag, HardDrive, Upload, X } from 'lucide-react';
import { database, UploadedFile } from '../utils/database';
import { useAuth } from '../context/AuthContext';

// CHICOS ACA ES SECCION DE PREVIEWS DE ARCHIVOS
// SE PUEDE MEJORAR, PERO ES UNA BASE PARA EMPEZAR
// --- IGNORE ---
const FilePreviewSection: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadFiles();
    }
  }, [user]);

  const loadFiles = () => {
    if (user) {
      const files = database.getFiles(user.id);
      setUploadedFiles(files);
    }
  };

  const handleFileUpload = async (files: FileList) => {
    if (!user || files.length === 0) return;

    setIsUploading(true);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Convertir archivo a base64 para almacenamiento
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData: UploadedFile = {
          id: Date.now().toString() + i,
          userId: user.id,
          name: file.name,
          type: file.type,
          size: file.size,
          url: e.target?.result as string,
          uploadedAt: new Date(),
          category: getFileCategory(file.type)
        };
        
        database.saveFile(fileData);
        loadFiles();
      };
      reader.readAsDataURL(file);
    }
    
    setIsUploading(false);
    
    // Notificación de éxito
    showNotification('Archivos subidos exitosamente', 'success');
  };

  const getFileCategory = (mimeType: string): string => {
    if (mimeType.includes('image')) return 'Imagen';
    if (mimeType.includes('pdf')) return 'PDF';
    if (mimeType.includes('word') || mimeType.includes('document')) return 'Documento';
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'Hoja de Cálculo';
    if (mimeType.includes('video')) return 'Video';
    if (mimeType.includes('audio')) return 'Audio';
    return 'Archivo';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownload = (file: UploadedFile) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification(`${file.name} descargado`, 'success');
  };

  const handleDelete = (fileId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este archivo?')) {
      database.deleteFile(fileId);
      loadFiles();
      setSelectedFile(null);
      showNotification('Archivo eliminado', 'success');
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
      type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Upload className="w-5 h-5 mr-2" />
          Subir Archivos
        </h3>
        
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            dragOver
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 hover:border-red-400 hover:bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            Arrastra archivos aquí o haz clic para seleccionar
          </p>
          <input
            type="file"
            multiple
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="bg-red-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-red-700 transition-colors"
          >
            Seleccionar Archivos
          </label>
          {isUploading && (
            <div className="mt-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600 mx-auto"></div>
              <p className="text-sm text-gray-600 mt-2">Subiendo archivos...</p>
            </div>
          )}
        </div>
      </div>

      {/* Files Grid */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Archivos Subidos ({uploadedFiles.length})
          </h3>
          {uploadedFiles.length > 0 && (
            <button
              onClick={() => {
                uploadedFiles.forEach(file => handleDownload(file));
              }}
              className="text-red-600 hover:text-red-700 font-medium flex items-center"
            >
              <Download className="w-4 h-4 mr-1" />
              Descargar Todos
            </button>
          )}
        </div>

        {uploadedFiles.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No has subido ningún archivo aún</p>
            <p className="text-gray-500 text-sm">Los archivos que subas aparecerán aquí</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedFile(file)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="bg-red-50 p-2 rounded-lg mr-3">
                      <FileText className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 truncate max-w-32">
                        {file.name}
                      </h4>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {file.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(file);
                      }}
                      className="text-gray-400 hover:text-green-600 p-1"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(file.id);
                      }}
                      className="text-gray-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-1 text-xs text-gray-600">
                  <div className="flex items-center">
                    <HardDrive className="w-3 h-3 mr-1" />
                    <span>{formatFileSize(file.size)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{new Date(file.uploadedAt).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* File Detail Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Detalles del Archivo</h3>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* File Preview */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <div className="bg-red-50 p-3 rounded-lg mr-4">
                      <FileText className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{selectedFile.name}</h4>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {selectedFile.category}
                      </span>
                    </div>
                  </div>

                  {/* File Preview Content */}
                  {selectedFile.type.includes('image') && (
                    <div className="mb-4">
                      <img
                        src={selectedFile.url}
                        alt={selectedFile.name}
                        className="max-w-full h-auto rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                </div>

                {/* File Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <HardDrive className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Tamaño:</span>
                      <span className="text-sm font-medium text-gray-900 ml-2">
                        {formatFileSize(selectedFile.size)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Subido:</span>
                      <span className="text-sm font-medium text-gray-900 ml-2">
                        {new Date(selectedFile.uploadedAt).toLocaleString('es-ES')}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Tipo:</span>
                      <span className="text-sm font-medium text-gray-900 ml-2">
                        {selectedFile.type}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Subido por:</span>
                      <span className="text-sm font-medium text-gray-900 ml-2">
                        {user?.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleDownload(selectedFile)}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </button>
                  <button
                    onClick={() => handleDelete(selectedFile.id)}
                    className="flex-1 border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilePreviewSection;